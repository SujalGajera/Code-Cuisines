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
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <label>Last Name</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />

          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} />

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
