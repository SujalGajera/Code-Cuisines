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

  //  Load current logged-in customer (saved by Login.js)
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentCustomer"));
    if (currentUser) {
      setUser({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        avatar: currentUser.avatar || defaultAvatar,
      });
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        avatar: currentUser.avatar || defaultAvatar,
      });
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
    setTimeout(() => setShowToast(false), 3000);
  };

  const fullName =
    (user.firstName || "") + (user.lastName ? ` ${user.lastName}` : "");

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
  <img 
    src="/images/code-cuisines-logo.png" 
    alt="Code Cuisines Logo" 
    className="logo-image"
  />
</div>

        <ul>
          <li onClick={() => navigate("/customer/dashboard")}>🏠 Home</li>
          <li onClick={() => navigate("/customer/reservations")}>📅 Reservations</li>
          <li onClick={() => navigate("/customer/menu")}>🍽️ Menu</li>
        </ul>
        <button
          onClick={() => {
            localStorage.removeItem("currentCustomer");
            navigate("/customer/login");
          }}
          className="logout-btn"
        >
          ⟲ Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="main">
        <h1>Welcome, {fullName || "Guest"} 👋</h1>
        <p className="welcome-subtext">Glad to see you back at Code Cuisine!</p>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="avatar-container">
            <img
              src={formData.avatar || defaultAvatar}
              alt="Profile"
              className="profile-img"
            />
            {isEditing && (
              <label className="upload-btn">
                📸 Change Photo
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>

          <div className="details">
            <h3>My Profile</h3>

            {!isEditing ? (
              <>
                <p>
                  <strong>Full Name:</strong> {fullName || "Not available"}
                </p>
                <p>
                  <strong>Email:</strong> {user.email || "Not available"}
                </p>
                <p>
                  <strong>Phone Number:</strong> {user.phone || "Not available"}
                </p>
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  ✏️ Edit Profile
                </button>
              </>
            ) : (
              <>
                <div className="edit-fields">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />

                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />

                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="edit-buttons">
                  <button className="save-btn" onClick={handleSave}>
                    💾 Save
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    ✖ Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Reservations Section */}
        <div className="reservations">
          <h3>My Reservations</h3>
          <p>You have 2 upcoming reservations</p>
          <button className="view-btn">View Reservations</button>
        </div>
      </main>

      {/*  Toast/ pop up  */}
      {showToast && <div className="toast">✅ Profile Updated Successfully!</div>}
    </div>
  );
}

export default CustomerDashboard;
