import React from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";
import avatar from "../images/avatar.png";

function CustomerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>🍴 Code Cuisine</h2>
        <ul>
          <li>Home</li>
          <li>Reservations</li>
          <li>Menu</li>
        </ul>
        <button onClick={() => navigate("/customer/login")} className="logout-btn">
          ⟲ Log Out
        </button>
      </aside>

      <main className="main">
        <h1>Welcome, John Doe 👋</h1>

        <div className="profile-section">
          <img src={avatar} alt="Profile" />
          <div className="details">
            <h3>My Profile</h3>
            <p><strong>Full Name:</strong> John Doe</p>
            <p><strong>Email:</strong> johndoe@example.com</p>
            <p><strong>Phone Number:</strong> 123-456-7890</p>
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
