// src/Yubi/Menu/CustomerMenu.js
import React, { useMemo, useState, useEffect } from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import "./CustomerMenu.css";
import { useCart } from "../Cart/CartContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

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

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log("Menu item data:", doc.id, data); // Debug log
          return {
            id: doc.id,
            name: data.item || data.name || "Unknown Item",
            category: data.category || "Mains",
            price: parseFloat(data.price?.toString().replace(/[^0-9.]/g, '') || 0),
            description: data.description || `Delicious ${data.item || 'dish'}`,
            imageUrl: data.imageUrl || DEFAULT_IMAGE,
          };
        });
        console.log("Processed menu items:", items); // Debug log
        setMenuItems(items);
      },
      (error) => {
        console.error("Error syncing menuItems:", error);
        console.error("Full error details:", error.message, error.code);
      }
    );

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
            return (
              <article key={item.id} className="cc-card cc-menu-card">
                <div
                  className="cc-menu-card-image"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
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
