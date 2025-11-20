// src/Yubi/Menu/CustomerMenu.js
import React, { useState, useMemo } from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import "./CustomerMenu.css";

const ITEMS = [
  {
    id: 1,
    name: "Cappuccino",
    description: "Rich espresso with steamed milk",
    price: 4.5,
    category: "Coffee",
  },
  {
    id: 2,
    name: "Croissant",
    description: "Buttery, flaky French pastry",
    price: 3.5,
    category: "Pastry",
  },
  {
    id: 3,
    name: "Avocado Toast",
    description: "Fresh avocado on sourdough",
    price: 8.5,
    category: "Snacks",
  },
  {
    id: 4,
    name: "Fresh Lemonade",
    description: "Refreshing house-made lemonade",
    price: 3.0,
    category: "Drinks",
  },
  {
    id: 5,
    name: "Espresso",
    description: "Classic, intense espresso shot",
    price: 3.0,
    category: "Coffee",
  },
  {
    id: 6,
    name: "Blueberry Muffin",
    description: "Soft muffin with fresh blueberries",
    price: 4.0,
    category: "Pastry",
  },
];

const CATEGORIES = ["All Items", "Coffee", "Pastry", "Snacks", "Drinks"];

function CustomerMenu() {
  const [activeCategory, setActiveCategory] = useState("All Items");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All Items") return ITEMS;
    return ITEMS.filter((i) => i.category === activeCategory);
  }, [activeCategory]);

  const handleAddToCart = (item) => {
    alert(`Added ${item.name} to cart (mock only).`);
  };

  return (
    <CustomerLayout>
      <div className="cc-menu-page">
        <header className="cc-menu-header">
          <h1 className="cc-page-title">Menu</h1>
          <p className="cc-page-subtitle">
            Browse our delicious offerings and add them to your cart.
          </p>
        </header>

        <div className="cc-menu-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cc-menu-tab ${
                activeCategory === cat ? "cc-menu-tab-active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <section className="cc-menu-grid">
          {filteredItems.map((item) => (
            <article key={item.id} className="cc-card cc-menu-card">
              <div className="cc-menu-image-placeholder" />
              <div className="cc-menu-main">
                <div className="cc-menu-header-row">
                  <h2 className="cc-menu-item-name">{item.name}</h2>
                  <span className="cc-menu-price">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="cc-menu-desc">{item.description}</p>
              </div>

              <button
                className="cc-menu-add-btn"
                type="button"
                onClick={() => handleAddToCart(item)}
              >
                <span className="cc-menu-add-icon">🛒</span>
                <span>Add to Cart</span>
              </button>
            </article>
          ))}
        </section>
      </div>
    </CustomerLayout>
  );
}

export default CustomerMenu;
