import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function CustomerRegister() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    if (users.some((u) => u.email === email)) {
      alert("Email already registered.");
      return;
    }

    const newUser = { firstName, lastName, email, phone, password };
    users.push(newUser);

    localStorage.setItem("registeredUsers", JSON.stringify(users));

    alert("Account created successfully!");
    navigate("/customer/login");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create Your Account</h2>
        <p>Join Code Cuisine to manage your reservations</p>

        <form onSubmit={handleRegister}>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Register
          </button>

          <p className="link-prompt">
            Already registered?
            <span onClick={() => navigate("/customer/login")}>Login here</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister;
