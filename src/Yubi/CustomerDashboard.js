import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CustomerDashboard.css";
import avatar from "../images/avatar.png";

function CustomerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    name: "Guest",
    email: "guest@codecuisine.com",
    phone: "N/A"
  });

  // load user from state or localStorage
  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    } else {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/customer/login");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>🍴 Code Cuisine</h2>
        <ul>
          <li>Home</li>
          <li>Reservations</li>
          <li>Menu</li>
        </ul>
        <button onClick={handleLogout} className="logout-btn">
          ⟲ Log Out
        </button>
      </aside>

      <main className="main">
        <h1>Welcome, {user.name} </h1>

        <div className="profile-section">
          <img src={avatar} alt="Profile" />
          <div className="details">
            <h3>My Profile</h3>
            <p>
              <strong>Full Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {user.phone}
            </p>
          </div>
        </div>

        <div className="reservations">
          <h3>My Reservations</h3>
          <p>You have 2 upcoming reservations</p>
          <button className="view-btn">View Reservations</button>
        </div>
      </main>
    </div>
  );
}

export default CustomerDashboard;
