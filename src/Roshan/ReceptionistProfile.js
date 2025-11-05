import React from "react";

export default function ReceptionistProfile() {
  return (
    <div className="reception-card">
      <div className="reception-content">
        <h3>Profile Information</h3>
        <div className="profile-grid">
          <div className="profile-photo">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Profile"
            />
          </div>
          <div className="profile-details">
            <div className="field">
              <label>Full Name</label>
              <div className="value">Sarah Anderson</div>
            </div>
            <div className="field">
              <label>Role</label>
              <div className="value">Receptionist</div>
            </div>
            <div className="field">
              <label>Email Address</label>
              <div className="value">sarah.anderson@medicare.com</div>
            </div>
            <div className="field">
              <label>Phone Number</label>
              <div className="value">+1 (555) 987-6543</div>
            </div>
          </div>
        </div>
        <div className="edit-btn-wrap">
          <button className="cb-btn primary">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}
