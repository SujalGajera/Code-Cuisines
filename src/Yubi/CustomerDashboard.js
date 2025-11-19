// CustomerDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";
import defaultAvatar from "../images/avatar.png";

function CustomerDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: defaultAvatar,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [showToast, setShowToast] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // mobile hamburger toggle

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentCustomer"));
    if (currentUser) {
      setUser(currentUser);
      setFormData(currentUser);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setUser(formData);
    localStorage.setItem("currentCustomer", JSON.stringify(formData));
    setIsEditing(false);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  return (
    <div className="cd-wrapper">
      {/* ------------------ TOP NAVBAR --------------------- */}
      <nav className="cd-navbar">
        <div className="cd-nav-left">
          <img
            src="/images/code-cuisines-logo.png"
            alt="Logo"
            className="cd-top-logo"
          />
          <h2>Code Cuisines</h2>
        </div>

        <div className={`cd-nav-links ${menuOpen ? "active" : ""}`}>
          <button
            onClick={() => {
              navigate("/customer/dashboard");
              setMenuOpen(false);
            }}
            className="active"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              navigate("/customer/reservations");
              setMenuOpen(false);
            }}
          >
            Reservations
          </button>
          <button
            onClick={() => {
              navigate("/customer/menu");
              setMenuOpen(false);
            }}
          >
            Menu
          </button>
          <button
            onClick={() => {
              navigate("/customer/feedback");
              setMenuOpen(false);
            }}
          >
            Feedback
          </button>
        </div>

        <div className="cd-nav-right">
          <button
            className="cd-logout-btn"
            onClick={() => {
              localStorage.removeItem("currentCustomer");
              navigate("/customer/login");
            }}
          >
            Logout
          </button>

          {/* Hamburger for mobile */}
          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </nav>

      {/* ------------------ MAIN CONTENT --------------------- */}
      <main className="cd-main">
        <header className="cd-header">
          <h1>Welcome, {fullName || "Guest"} </h1>
          <p>Your personal Code Cuisines dashboard</p>
        </header>

        {/* -------- PROFILE CARD -------- */}
        <section className="cd-card cd-profile-card">
          <div className="cd-avatar-box">
            <img src={formData.avatar} className="cd-avatar" alt="Avatar" />

            {isEditing && (
              <label className="cd-upload-btn">
                Change Photo
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>

          <div className="cd-details">
            <h3>My Profile</h3>

            {!isEditing ? (
              <>
                <p>
                  <strong>Full Name:</strong> {fullName || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {user.email || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone || "N/A"}
                </p>

                <button className="cd-edit-btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                <label>First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} />

                <label>Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} />

                <label>Email</label>
                <input name="email" value={formData.email} onChange={handleChange} />

                <label>Phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} />

                <div className="cd-btn-row">
                  <button className="cd-save-btn" onClick={handleSave}>
                    Save
                  </button>
                  <button className="cd-cancel-btn" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* -------- RESERVATIONS CARD ---------- */}
        <section className="cd-card cd-res-card">
          <h3>My Reservations</h3>
          <p>You have 2 upcoming reservations.</p>

          <button
            className="cd-btn-primary"
            onClick={() => navigate("/customer/reservations")}
          >
            View Reservations
          </button>
        </section>

        {/* -------- FEEDBACK CARD ---------- */}
        <section className="cd-card cd-feedback-card">
          <h3>My Feedback</h3>
          <p>Share your dining experience with us.</p>

          <button
            className="cd-btn-primary"
            onClick={() => navigate("/customer/feedback")}
          >
            Give Feedback
          </button>
        </section>

        {showToast && <div className="cd-toast">Profile Updated Successfully!</div>}
      </main>
    </div>
  );
}

export default CustomerDashboard;
