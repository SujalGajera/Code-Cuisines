// src/Yubi/Menu/CustomerMenu.js
import React, { useMemo, useState, useEffect } from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import "./CustomerMenu.css";
import { useCart } from "../Cart/CartContext";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

// Map each menu item id to an image URL (GUARANTEED TO LOAD)
const IMAGE_MAP = {
  capuccino:
    "https://cdn.pixabay.com/photo/2016/08/09/13/21/coffee-1580595_1280.jpg",
  croissant:
    "https://images.pexels.com/photos/4038314/pexels-photo-4038314.jpeg?auto=compress&cs=tinysrgb&w=800",
  "avocado-toast":
    "https://images.pexels.com/photos/573722/pexels-photo-573722.jpeg?auto=compress&cs=tinysrgb&w=800",
  "fresh-lemonade":
    "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800",
  espresso:
    "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
  "blueberry-muffin":
    "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800",
};

// Default image for menu items without specific image
const DEFAULT_IMAGE = "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800";

function CustomerMenu() {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState("All Items");
  const [toast, setToast] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  // Real-time listener for menu items from Firebase
  useEffect(() => {
    // Removed orderBy to avoid "Missing Index" error until index is created
    const q = query(
      collection(db, "menu"),
      where("availability", "==", "Available")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.item || data.name || "Unknown Item",
          category: data.category || "Mains",
          price: parseFloat(data.price?.toString().replace(/[^0-9.]/g, '') || 0),
          description: data.description || `Delicious ${data.item || 'dish'}`,
        };
      });
      setMenuItems(items);
    });

    return () => unsubscribe();
  }, []);

  // Dynamic filters based on available items
  const filters = useMemo(() => {
    const categories = new Set(menuItems.map(i => i.category));
    return ["All Items", ...Array.from(categories).sort()];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All Items") return menuItems;
    return menuItems.filter((item) => item.category === activeFilter);
  }, [menuItems, activeFilter]);

  const handleAdd = (item) => {
    addToCart({ id: item.id, name: item.name, price: item.price });
    setToast(`${item.name} added to cart`);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <CustomerLayout>
      <div className="cc-menu-page">
        <div className="cc-menu-header">
          <div>
            <h1 className="cc-page-title">Menu</h1>
            <p className="cc-page-subtitle">Browse our delicious offerings.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="cc-menu-filters">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`cc-menu-filter-btn ${activeFilter === f ? "cc-menu-filter-btn-active" : ""
                }`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="cc-menu-grid">
          {filteredItems.map((item) => {
            const imgSrc = IMAGE_MAP[item.id] || DEFAULT_IMAGE;

            return (
              <article key={item.id} className="cc-card cc-menu-card">
                <div
                  className="cc-menu-card-image"
                  style={{ backgroundImage: `url(${imgSrc})` }}
                  aria-hidden="true"
                />
                <div className="cc-menu-card-body">
                  <div className="cc-menu-card-top">
                    <h3 className="cc-menu-card-title">{item.name}</h3>
                    <span className="cc-menu-card-price">
                      ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                    </span>
                  </div>
                  <p className="cc-menu-card-desc">{item.description}</p>
                  <button
                    type="button"
                    className="cc-menu-add-btn"
                    onClick={() => handleAdd(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {toast && <div className="cc-menu-toast">{toast}</div>}
      </div>
    </CustomerLayout>
  );
}

export default CustomerMenu;
