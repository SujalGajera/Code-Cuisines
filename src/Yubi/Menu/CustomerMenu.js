// src/Yubi/Menu/CustomerMenu.js
import React, { useMemo, useState } from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import "./CustomerMenu.css";
import { useCart } from "../Cart/CartContext";

// Map each menu item id to an image URL.
// You can replace these URLs with your own images later.
const IMAGE_MAP = {
  capuccino:
    "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
  croissant:
    "https://images.pexels.com/photos/2135/bread-food-restaurant-people.jpg?auto=compress&cs=tinysrgb&w=800",
  "avocado-toast":
    "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
  "fresh-lemonade":
    "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800",
  espresso:
    "https://images.pexels.com/photos/748741/pexels-photo-748741.jpeg?auto=compress&cs=tinysrgb&w=800",
  "blueberry-muffin":
    "https://images.pexels.com/photos/2903167/pexels-photo-2903167.jpeg?auto=compress&cs=tinysrgb&w=800",
};

const MENU_ITEMS = [
  {
    id: "capuccino",
    name: "Cappuccino",
    category: "Coffee",
    price: 4.5,
    description: "Rich espresso with steamed milk",
  },
  {
    id: "croissant",
    name: "Croissant",
    category: "Pastry",
    price: 3.5,
    description: "Buttery, flaky French pastry",
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    category: "Snacks",
    price: 8.5,
    description: "Fresh avocado on sourdough",
  },
  {
    id: "fresh-lemonade",
    name: "Fresh Lemonade",
    category: "Drinks",
    price: 3.0,
    description: "Refreshing lemon drink",
  },
  {
    id: "espresso",
    name: "Espresso",
    category: "Coffee",
    price: 3.0,
    description: "Strong and bold shot",
  },
  {
    id: "blueberry-muffin",
    name: "Blueberry Muffin",
    category: "Pastry",
    price: 4.0,
    description: "Soft muffin with blueberries",
  },
];

const FILTERS = ["All Items", "Coffee", "Pastry", "Snacks", "Drinks"];

function CustomerMenu() {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState("All Items");
  const [toast, setToast] = useState("");

  const filteredItems = useMemo(() => {
    if (activeFilter === "All Items") return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

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
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`cc-menu-filter-btn ${
                activeFilter === f ? "cc-menu-filter-btn-active" : ""
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
            const imgSrc = IMAGE_MAP[item.id];

            return (
              <article key={item.id} className="cc-card cc-menu-card">
                <div
                  className="cc-menu-card-image"
                  style={
                    imgSrc
                      ? { backgroundImage: `url(${imgSrc})` }
                      : undefined
                  }
                  aria-hidden="true"
                />
                <div className="cc-menu-card-body">
                  <div className="cc-menu-card-top">
                    <h3 className="cc-menu-card-title">{item.name}</h3>
                    <span className="cc-menu-card-price">
                      ${item.price.toFixed(2)}
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
