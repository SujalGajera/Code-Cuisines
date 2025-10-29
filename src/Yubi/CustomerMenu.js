import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerMenu.css";

// Helper component: automatically switches between multiple image links if one fails
function SmartImage({ srcs = [], alt, className }) {
  const [idx, setIdx] = useState(0);
  const current = srcs[idx] || srcs[srcs.length - 1];

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      onError={() => {
        if (idx < srcs.length - 1) setIdx(idx + 1);
      }}
      loading="lazy"
    />
  );
}

function CustomerMenu() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Appetizers");

  const FALLBACK =
    "https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=800&q=60";

  const menuItems = {
    Appetizers: [
      {
        name: "Bruschetta",
        price: "$8.99",
        desc: "Toasted bread topped with fresh tomatoes, basil, garlic, and olive oil.",
        img: [
          "https://upload.wikimedia.org/wikipedia/commons/6/6b/Bruschetta_II_by_gnuckx.jpg",
          "https://images.pexels.com/photos/1234535/pexels-photo-1234535.jpeg?auto=compress&cs=tinysrgb&w=800",
          FALLBACK,
        ],
      },
      {
        name: "Garlic Bread",
        price: "$5.49",
        desc: "Crispy golden garlic bread brushed with butter and fresh herbs.",
        img: [
          "https://images.pexels.com/photos/5695876/pexels-photo-5695876.jpeg?auto=compress&cs=tinysrgb&w=800", // new garlic bread
          "https://images.unsplash.com/photo-1601050690597-7fda2ccf94cf?auto=format&fit=crop&w=800&q=60",
          FALLBACK,
        ],
      },
      {
  name: "Stuffed Mushrooms",
  price: "$7.99",
  desc: "Juicy mushrooms baked with creamy garlic cheese, herbs, and breadcrumbs for a crispy finish.",
  img: [
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80", // overhead shot of golden-baked mushrooms
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800", // close-up of mushrooms with melted cheese
    "https://images.unsplash.com/photo-1651172213229-8f0fcbf1b4f5?auto=format&fit=crop&w=800&q=80", // rustic table view with herbs
    FALLBACK,
  ],
},



    ],

    "Main Courses": [
      {
        name: "Grilled Chicken",
        price: "$15.99",
        desc: "Served with mashed potatoes, veggies, and mushroom sauce.",
        img: [
          "https://images.pexels.com/photos/4106485/pexels-photo-4106485.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=800",
          FALLBACK,
        ],
      },
      {
        name: "Beef Steak",
        price: "$18.99",
        desc: "Juicy grilled steak with peppercorn sauce and fries.",
        img: [
          "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80", // high-quality steak
          "https://images.unsplash.com/photo-1615937693369-6b8b1a9b13f7?auto=format&fit=crop&w=800&q=80", // grilled beef with garnish
          FALLBACK,
        ],
      },
      {
        name: "Pasta Alfredo",
        price: "$13.49",
        desc: "Creamy Alfredo pasta with mushrooms and parmesan cheese.",
        img: [
          "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800",
          FALLBACK,
        ],
      },
    ],

    Desserts: [
      {
        name: "Chocolate Lava Cake",
        price: "$7.99",
        desc: "Warm chocolate cake with a molten center and vanilla ice cream.",
        img: [
          "https://upload.wikimedia.org/wikipedia/commons/6/6a/Chocolate_fondant.jpg",
          "https://images.pexels.com/photos/4109996/pexels-photo-4109996.jpeg?auto=compress&cs=tinysrgb&w=800",
          FALLBACK,
        ],
      },
      {
        name: "Cheesecake",
        price: "$6.99",
        desc: "Classic New York cheesecake with strawberry syrup.",
        img: [
          "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=800",
          FALLBACK,
        ],
      },
      {
        name: "Brownie Delight",
        price: "$6.49",
        desc: "Rich chocolate brownie served with hot fudge sauce.",
        img: [
          "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/461431/pexels-photo-461431.jpeg?auto=compress&cs=tinysrgb&w=800",
          FALLBACK,
        ],
      },
    ],

    Beverages: [
      {
        name: "Cappuccino",
        price: "$4.99",
        desc: "Freshly brewed Italian coffee with milk foam.",
        img: [
          "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/34085/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
          FALLBACK,
        ],
      },
      {
        name: "Iced Latte",
        price: "$5.49",
        desc: "Smooth cold coffee with creamy milk and ice.",
        img: [
          "https://images.pexels.com/photos/5946989/pexels-photo-5946989.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/434213/pexels-photo-434213.jpeg?auto=compress&cs=tinysrgb&w=800",
          FALLBACK,
        ],
      },
      {
  name: "Lemonade",
  price: "$3.99",
  desc: "Freshly squeezed lemonade served chilled with mint, ice, and a slice of lemon for a perfect summer refreshment.",
  img: [
    "https://images.unsplash.com/photo-1561043433-aaf687c4cf4e?auto=format&fit=crop&w=800&q=80", // bright, realistic lemonade with mint
    "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800", // rustic style lemonade glass
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", // lemonade pitcher with ice cubes and lemons
    FALLBACK,
  ],
},

    ],
  };

  return (
    <div className="menu-container">
      <div className="menu-box">
        <h2>🍽️ Our Delicious Menu</h2>
        <p className="subtitle">Select a category to explore our best dishes.</p>

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

        {/* Menu Cards */}
        <div className="menu-grid">
          {menuItems[selectedCategory].map((item, index) => (
            <div key={index} className="menu-card">
              <SmartImage srcs={item.img} alt={item.name} className="menu-image" />
              <h3>{item.name}</h3>
              <p className="desc">{item.desc}</p>
              <p className="price">{item.price}</p>
              <button className="order-btn">Add to Order</button>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="back-btn-container">
          <button className="back-btn" onClick={() => navigate("/customer/dashboard")}>
            ⟲ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerMenu;
