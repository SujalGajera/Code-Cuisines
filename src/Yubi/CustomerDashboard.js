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

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentCustomer"));
    if (currentUser) {
      setUser(currentUser);
      setFormData(currentUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUser(formData);
    localStorage.setItem("currentCustomer", JSON.stringify(formData));
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return (
    <div className="cd-dashboard">
      {/* Sidebar */}
      <aside className="cd-sidebar">
        <div className="cd-logo-box">
          <img
            src="/images/code-cuisines-logo.png"
            alt="Code Cuisines Logo"
            className="cd-logo"
          />
        </div>

        <nav className="cd-nav">
          <button
            className="cd-nav-item active"
            onClick={() => navigate("/customer/dashboard")}
          >
            🏠 Dashboard
          </button>
          <button
            className="cd-nav-item"
            onClick={() => navigate("/customer/reservations")}
          >
            📅 Reservations
          </button>
          <button
            className="cd-nav-item"
            onClick={() => navigate("/customer/menu")}
          >
            🍽️ Menu
          </button>
        </nav>

        <button
          className="cd-logout"
          onClick={() => {
            localStorage.removeItem("currentCustomer");
            navigate("/customer/login");
          }}
        >
          ⟲ Logout
        </button>
      </aside>

      {/* Main */}
      <main className="cd-main">
        <header className="cd-header">
          <h1>Welcome, {fullName || "Guest"} </h1>
          <p>Your personal Code Cuisines dashboard</p>
        </header>

        {/* Profile */}
        <section className="cd-card cd-profile-card">
          <div className="cd-avatar-box">
            <img
              src={formData.avatar || defaultAvatar}
              className="cd-avatar"
              alt="User Avatar"
            />
            {isEditing && (
              <label className="cd-upload-btn">
                📸 Change Photo
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>

          <div className="cd-details">
            <h3>My Profile</h3>
            {!isEditing ? (
              <>
                <p><strong>Full Name:</strong> {fullName || "Not Available"}</p>
                <p><strong>Email:</strong> {user.email || "Not Available"}</p>
                <p><strong>Phone:</strong> {user.phone || "Not Available"}</p>
                <button className="cd-edit-btn" onClick={() => setIsEditing(true)}>
                  ✏️ Edit Profile
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
                  <button className="cd-save-btn" onClick={handleSave}>💾 Save</button>
                  <button className="cd-cancel-btn" onClick={() => setIsEditing(false)}>✖ Cancel</button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Reservations */}
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

        {showToast && <div className="cd-toast">✅ Profile Updated Successfully!</div>}
      </main>
    </div>
  );
}

export default CustomerDashboard;
