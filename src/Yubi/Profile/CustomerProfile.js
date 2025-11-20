// src/Yubi/Profile/CustomerProfile.js
import React, { useState } from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import "./CustomerProfile.css";
import avatarImg from "../../images/avatar.png";

function CustomerProfile({ user }) {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "+64 21 000 0000",
    preferences: "No peanuts, extra spicy",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("currentCustomer", JSON.stringify(formData));
    alert("Profile updated (saved to local storage).");
  };

  return (
    <CustomerLayout>
      <div className="cc-profile">
        <header className="cc-profile-header">
          <h1 className="cc-page-title">Profile</h1>
          <p className="cc-page-subtitle">
            Manage your personal details and contact information.
          </p>
        </header>

        <div className="cc-profile-grid">
          <div className="cc-card cc-profile-summary">
            <div className="cc-profile-avatar-wrap">
              <img className="cc-profile-avatar" src={avatarImg} alt="avatar" />
            </div>
            <h2 className="cc-profile-name">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="cc-profile-email">{formData.email}</p>

            <div className="cc-profile-info-pairs">
              <div className="cc-profile-info-row">
                <span className="cc-profile-info-label">Phone</span>
                <span className="cc-profile-info-value">{formData.phone}</span>
              </div>
              <div className="cc-profile-info-row">
                <span className="cc-profile-info-label">Member since</span>
                <span className="cc-profile-info-value">2024</span>
              </div>
              <div className="cc-profile-info-row">
                <span className="cc-profile-info-label">Favourite cuisine</span>
                <span className="cc-profile-info-value">
                  Indian &amp; Italian
                </span>
              </div>
            </div>
          </div>

          <div className="cc-card cc-profile-form-card">
            <h2 className="cc-profile-form-title">Edit profile</h2>

            <form onSubmit={handleSubmit} className="cc-profile-form">
              <div className="cc-profile-form-row">
                <div className="cc-form-field">
                  <label>First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="cc-form-field">
                  <label>Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="cc-profile-form-row">
                <div className="cc-form-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="cc-form-field">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="cc-form-field">
                <label>Dining preferences</label>
                <textarea
                  rows="3"
                  name="preferences"
                  value={formData.preferences}
                  onChange={handleChange}
                  placeholder="Any allergies or special requests?"
                />
              </div>

              <div className="cc-profile-actions">
                <button type="submit" className="cc-primary-btn">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default CustomerProfile;
