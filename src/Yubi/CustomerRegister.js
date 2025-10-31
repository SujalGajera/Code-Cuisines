import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css"; //  same style as login page

function CustomerRegister() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [subscribe, setSubscribe] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    // Validation checks
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("⚠️ Please enter a valid 10-digit phone number.");
      return;
    }

    // Save user to localStorage
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const userExists = existingUsers.some((user) => user.email === email);
    if (userExists) {
      alert("⚠️ Email already registered. Please login instead.");
      navigate("/customer/login");
      return;
    }

    const newUser = { firstName, lastName, email, phone, password, subscribe };
    existingUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

    alert("✅ Registration successful! Please login.");
    navigate("/customer/login");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create Your Account 🍴</h2>
        <p>Join Code Cuisine to manage your profile and reservations</p>

        <form onSubmit={handleRegister}>
          <div className="name-fields">
            <div>
              <label>First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@codecuisine.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={subscribe}
                onChange={(e) => setSubscribe(e.target.checked)}
              />{" "}
              Subscribe to our newsletter
            </label>
          </div>

          <button type="submit" className="login-btn">
            Register
          </button>

          <p style={{ marginTop: "15px", color: "#fff" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#ffb703", cursor: "pointer" }}
              onClick={() => navigate("/customer/login")}
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister;
