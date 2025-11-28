// src/Yubi/Cart/CartContext.js
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";

import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{id, name, price, quantity}]
  const [userId, setUserId] = useState(null);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  // ---------- figure out who is logged in & load their cart ----------
  useEffect(() => {
    const init = async () => {
      const userFromAuth = auth.currentUser;
      const customerFromStorage = JSON.parse(
        localStorage.getItem("currentCustomer") || "null"
      );

      const uid = userFromAuth?.uid || customerFromStorage?.uid;

      if (!uid) {
        console.warn("No logged-in user; cart will be in-memory only.");
        setIsLoadingCart(false);
        return;
      }

      setUserId(uid);

      try {
        // 🔹 customers/{uid}/cart/current
        const cartRef = doc(db, "customers", uid, "cart", "current");
        const snap = await getDoc(cartRef);

        if (snap.exists()) {
          const data = snap.data();
          setItems(Array.isArray(data.items) ? data.items : []);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error("Error loading cart from Firestore:", err);
      } finally {
        setIsLoadingCart(false);
      }
    };

    init();
  }, []);

  // ---------- sync cart to Firestore whenever items change ----------
  useEffect(() => {
    if (!userId) return;
    if (isLoadingCart) return;

    const syncCart = async () => {
      try {
        const cartRef = doc(db, "customers", userId, "cart", "current");
        await setDoc(
          cartRef,
          {
            items,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (err) {
        console.error("Error syncing cart to Firestore:", err);
      }
    };

    syncCart();
  }, [items, userId, isLoadingCart]);

  // ---------- cart operations ----------
  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setItems([]);

  const updateQuantity = (id, quantity) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p
      )
    );
  };

  const value = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const taxRate = 0.1;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      subtotal,
      tax,
      total,
      totalItems,
      isLoadingCart,
    };
  }, [items, isLoadingCart]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return ctx;
}












