import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerMenu.css";

function CustomerMenu() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Appetizers");

  // ✅ Each section has its own dishes
  const menuItems = {
    Appetizers: [
      {
        name: "Bruschetta",
        price: "$8.99",
        desc: "Toasted bread topped with fresh tomatoes, basil, garlic, and olive oil.",
      },
      {
        name: "Garlic Bread",
        price: "$5.49",
        desc: "Crispy garlic bread with butter and herbs.",
      },
      {
        name: "Stuffed Mushrooms",
        price: "$7.99",
        desc: "Mushrooms stuffed with cheese and herbs, baked to perfection.",
      },
    ],
    "Main Courses": [
      {
        name: "Grilled Chicken",
        price: "$15.99",
        desc: "Served with mashed potatoes, veggies, and mushroom sauce.",
      },
      {
        name: "Beef Steak",
        price: "$18.99",
        desc: "Juicy grilled steak with peppercorn sauce and fries.",
      },
      {
        name: "Pasta Alfredo",
        price: "$13.49",
        desc: "Creamy Alfredo pasta with mushrooms and parmesan cheese.",
      },
    ],
    Desserts: [
      {
        name: "Chocolate Lava Cake",
        price: "$7.99",
        desc: "Warm chocolate cake with a molten center and vanilla ice cream.",
      },
      {
        name: "Cheesecake",
        price: "$6.99",
        desc: "Classic New York cheesecake with strawberry syrup.",
      },
      {
        name: "Brownie Delight",
        price: "$6.49",
        desc: "Rich chocolate brownie served with hot fudge sauce.",
      },
    ],
    Beverages: [
      {
        name: "Cappuccino",
        price: "$4.99",
        desc: "Freshly brewed Italian coffee with milk foam.",
      },
      {
        name: "Iced Latte",
        price: "$5.49",
        desc: "Smooth cold coffee with creamy milk and ice.",
      },
      {
        name: "Lemonade",
        price: "$3.99",
        desc: "Refreshing lemon drink with mint and ice.",
      },
    ],
  };

  return (
    <div className="menu-container">
      <div className="menu-box">
        <h2>🍽️ Our Delicious Menu</h2>
        <p className="subtitle">
          Select a category to explore our best dishes.
        </p>

        {/* Tabs */}
        <div className="menu-tabs">
          {Object.keys(menuItems).map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Items Section */}
        <div className="menu-grid">
          {menuItems[selectedCategory].map((item, index) => (
            <div key={index} className="menu-card">
              <h3>{item.name}</h3>
              <p className="desc">{item.desc}</p>
              <p className="price">{item.price}</p>
              <button className="order-btn">Add to Order</button>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="back-btn-container">
          <button
            className="back-btn"
            onClick={() => navigate("/customer/dashboard")}
          >
            ⟲ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerMenu;
