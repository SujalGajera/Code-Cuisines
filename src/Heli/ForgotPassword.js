import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setEmail("");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Forgot Password</h2>
        <p className="login-subtitle">
          Enter your email and we’ll send you a link to reset your password.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <div className="input-group">
            <span className="icon">@</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="btn-primary" type="submit">
            Send Reset Link
          </button>
        </form>

        <div className="back-link">
          <Link to="/staff-login" className="highlight-link">
            ← Back to Login
          </Link>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>📧 Reset Link Sent</h3>
            <p>
              A password reset link has been sent to <b>{email}</b>. <br />
              Please check your inbox to continue.
            </p>
            <button className="btn-primary" onClick={closePopup}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
