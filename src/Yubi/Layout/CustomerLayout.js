// src/Yubi/Layout/CustomerLayout.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaUtensils,
  FaHistory,
  FaCommentDots,
  FaSignOutAlt,
  FaShoppingCart,
} from "react-icons/fa";
import "./CustomerLayout.css";
import avatarImg from "../../images/avatar.png";
import { useCart } from "../Cart/CartContext";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard Overview",
    icon: <FaHome />,
    path: "/customer/dashboard",
  },
  {
    id: "profile",
    label: "Profile",
    icon: <FaUser />,
    path: "/customer/profile",
  },
  {
    id: "reservations",
    label: "Reservations",
    icon: <FaCalendarAlt />,
    path: "/customer/reservations",
  },
  {
    id: "menu",
    label: "Menu",
    icon: <FaUtensils />,
    path: "/customer/menu",
  },
  {
    id: "orders",
    label: "Order History",
    icon: <FaHistory />,
    path: "/customer/orders",
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: <FaCommentDots />,
    path: "/customer/feedback",
  },
];

function CustomerLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  // ===== CART CONTEXT =====
  const cart = useCart() || {};
  const items = cart.items || [];
  const clearCart = cart.clearCart;
  const removeFromCart = cart.removeFromCart;
  const updateQuantity = cart.updateQuantity;

  const [showCart, setShowCart] = useState(false);

  const cartCount = items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  });

  useEffect(() => {
    const stored = localStorage.getItem("currentCustomer");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser((prev) => ({ ...prev, ...parsed }));
      } catch (err) {
        console.error("Failed to parse currentCustomer", err);
      }
    }
  }, []);

  const fullName =
    (user.firstName || "") + (user.lastName ? ` ${user.lastName}` : "");

  const handleLogout = () => {
    localStorage.removeItem("currentCustomer");
    navigate("/customer/login");
  };

  const handleOpenCart = () => {
    console.log("Opening cart drawer"); // just to see it in console
    setShowCart(true);
  };

  const handleCheckout = () => {
    alert("Checkout complete (mock only).");
    if (typeof clearCart === "function") clearCart();
    setShowCart(false);
  };

  // safely inject "user" into children
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, { user });
  });

  return (
    <div className="cc-layout">
      {/* ===== TOPBAR ===== */}
      <header className="cc-topbar">
        <div className="cc-topbar-left">
          <div className="cc-brand">
            <div className="cc-brand-icon">🍽️</div>
            <div className="cc-brand-text">
              <span className="cc-brand-title">Code &amp; Cuisine</span>
            </div>
          </div>

          <nav className="cc-topnav-links">
            <Link to="/" className="cc-topnav-link">
              Home
            </Link>
            <Link to="/" className="cc-topnav-link">
              Explore
            </Link>
            <Link to="/" className="cc-topnav-link">
              About Us
            </Link>
          </nav>
        </div>

        <div className="cc-topbar-right">
          {/* 🛒 CART BUTTON */}
          <button
            type="button"
            className="cc-cart-btn"
            onClick={handleOpenCart}
          >
            <FaShoppingCart className="cc-cart-icon" />
            {cartCount > 0 && (
              <span className="cc-cart-badge">{cartCount}</span>
            )}
          </button>

          <div className="cc-user-chip">
            <img
              src={avatarImg}
              alt="avatar"
              className="cc-user-avatar"
              loading="lazy"
            />
            <span className="cc-user-name">{fullName || "Customer"}</span>
          </div>
          <button className="cc-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="cc-logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* ===== MAIN SHELL ===== */}
      <div className="cc-shell">
        <aside className="cc-sidebar">
          <div className="cc-sidebar-section">
            <div className="cc-sidebar-label">Dashboard</div>
          </div>
          <ul className="cc-sidebar-list">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li
                  key={item.id}
                  className={`cc-sidebar-item ${
                    isActive ? "cc-sidebar-item-active" : ""
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <div className="cc-sidebar-icon">{item.icon}</div>
                  <span className="cc-sidebar-text">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </aside>

        <main className="cc-main">{enhancedChildren}</main>
      </div>

      {/* ===== CART DRAWER ===== */}
      {showCart && (
        <div
          className="cc-cart-overlay"
          onClick={() => setShowCart(false)}
        >
          <div
            className="cc-cart-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cc-cart-header">
              <h2>Your Cart</h2>
              <button
                type="button"
                className="cc-cart-close"
                onClick={() => setShowCart(false)}
              >
                ×
              </button>
            </div>

            {items.length === 0 ? (
              <p className="cc-cart-empty">Your cart is empty.</p>
            ) : (
              <>
                <ul className="cc-cart-items">
                  {items.map((item) => (
                    <li key={item.id} className="cc-cart-item">
                      <div>
                        <div className="cc-cart-item-name">
                          {item.name}
                        </div>
                        <div className="cc-cart-item-meta">
                          ${item.price.toFixed(2)}
                          {item.quantity ? ` × ${item.quantity}` : ""}
                        </div>
                      </div>
                      <div className="cc-cart-item-right">
                        {typeof updateQuantity === "function" &&
                          typeof item.quantity === "number" && (
                            <div className="cc-cart-qty">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                              >
                                −
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          )}

                        {typeof removeFromCart === "function" && (
                          <button
                            type="button"
                            className="cc-cart-remove"
                            onClick={() => removeFromCart(item.id)}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="cc-cart-footer">
                  <div className="cc-cart-total-row">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="cc-cart-footer-actions">
                    {typeof clearCart === "function" && (
                      <button
                        type="button"
                        className="cc-cart-clear"
                        onClick={clearCart}
                      >
                        Clear Cart
                      </button>
                    )}
                    <button
                      type="button"
                      className="cc-cart-checkout"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerLayout;
