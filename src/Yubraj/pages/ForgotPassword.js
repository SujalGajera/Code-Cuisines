import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";   // IMPORTANT

function CustomerForgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const exists = users.find((u) => u.email === email);

    if (!exists) {
      alert("Email not found!");
      return;
    }

    alert("✔ Email verified! You can reset password now.");
    navigate("/customer/login");
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Reset Password</h2>
        <p>Enter your registered email to reset your password.</p>

        <form onSubmit={handleVerify}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@codecuisine.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="forgot-btn" type="submit">
            Verify Email
          </button>

          <div
            className="back-login-link"
            onClick={() => navigate("/customer/login")}
          >
            ← Back to Login
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerForgot;
