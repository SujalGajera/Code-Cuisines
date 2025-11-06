import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminForgot.css";

export default function AdminForgot() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage("⚠️ Please enter your email address.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("⚠️ Please enter a valid email address.");
    } else {
      setMessage("✅ Password reset link sent successfully!");
      setEmail("");
    }
  };

  return (
    <div className="admin-forgot-page">
      <div className="admin-forgot-card">
        <h2 className="forgot-title">Forgot Password</h2>
        <p className="forgot-subtitle">
          Enter your admin email and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleReset} className="forgot-form">
          <label>Email</label>
          <div className="input-group">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {message && (
            <p
              className={`message-text ${
                message.startsWith("✅") ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}

          <button type="submit" className="btn-primary">
            Send Reset Link
          </button>

          <div className="back-link">
            <Link to="/login/admin">← Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
