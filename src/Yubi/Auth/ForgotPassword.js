// src/Yubi/Auth/ForgotPassword.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Password reset link would be sent to ${email} (demo only – no real email).`
    );
    navigate("/customer/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Reset password</h1>
        <p className="auth-subtitle">
          Enter the email associated with your account.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-actions">
            <button type="submit" className="auth-primary-btn">
              Send reset link
            </button>
          </div>
        </form>

        <div className="auth-footer-text">
          Remembered it?{" "}
          <Link className="auth-link" to="/customer/login">
            Go back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
