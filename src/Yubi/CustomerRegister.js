import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

function CustomerRegister() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      alert("⚠️ Please enter a valid 10-digit phone number.");
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const userExists = existingUsers.some((user) => user.email === email);

    if (userExists) {
      alert("⚠️ Email already registered. Please login instead.");
      navigate("/customer/login");
      return;
    }

    const newUser = { firstName, lastName, email, phone, password };
    existingUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

    alert("✅ Registration successful! Please login.");
    navigate("/customer/login");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create Your Account</h2>
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">
            Register
          </button>

          <p className="signin-link">
            Already registered?{" "}
            <span
              onClick={() => navigate("/customer/login")}
              style={{ color: "#c35a0c", cursor: "pointer", fontWeight: 600 }}
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
