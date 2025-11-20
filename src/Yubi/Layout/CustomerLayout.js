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
} from "react-icons/fa";
import "./CustomerLayout.css";
import avatarImg from "../../images/avatar.png";

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

  // pass user down into pages
  const enhancedChild = React.cloneElement(children, { user });

  return (
    <div className="cc-layout">
      {/* Topbar */}
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

      {/* Shell */}
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

        <main className="cc-main">{enhancedChild}</main>
      </div>
    </div>
  );
}

export default CustomerLayout;
