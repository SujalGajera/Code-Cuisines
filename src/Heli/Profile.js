import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Profile() {
  const navigate = useNavigate();

  // 🧩 Load saved profile data or use defaults
  const savedProfile = JSON.parse(localStorage.getItem("profileData")) || {
    name: "Alex Doe",
    email: "alex.doe@example.com",
    phone: "555-123-4567",
    address: "123 Main St, Auckland, NZ",
    photo: null,
  };

  const [profile, setProfile] = useState(savedProfile);
  const [preview, setPreview] = useState(savedProfile.photo);
  const [showPopup, setShowPopup] = useState(false);

  // 🔄 Automatically update Dashboard + Sidebar when profile changes
  useEffect(() => {
    const handleProfileUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("profileData"));
      if (updated) setProfile(updated);
    };
    window.addEventListener("profile-updated", handleProfileUpdate);
    return () => window.removeEventListener("profile-updated", handleProfileUpdate);
  }, []);

  //  Handle text input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  //  Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  //  Save profile changes (stay on same page)
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(profile));

    // Trigger event to update other components (Dashboard, Sidebar)
    window.dispatchEvent(new Event("profile-updated"));

    // Show popup instead of alert
    setShowPopup(true);

    // Hide popup after 2.5 seconds
    setTimeout(() => setShowPopup(false), 2500);
  };

  //  Logout
  const handleLogout = () => {
    localStorage.removeItem("profileData");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="page">
      <h1 className="page-title">Personal Information</h1>
      <p>Keep your details up to date.</p>

      <div className="profile-card">
        {/*Profile Image Upload */}
        <div className="profile-img-container">
          <img
            src={
              preview ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="profile-img"
          />
          <label htmlFor="upload-photo" className="upload-btn" title="Upload Photo">
            ⬆
          </label>
          <input
            id="upload-photo"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>

        {/*Profile Form */}
        <form className="profile-form" onSubmit={handleSave}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            required
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
          />

          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>

        {/*  Logout Button */}
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* ✅ Success Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>✅ Profile Updated</h3>
            <p>Your profile information has been successfully saved!</p>
          </div>
        </div>
      )}
    </div>
  );
}
