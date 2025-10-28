import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
    navigate("/customer/login");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Forgot Password?</h2>
        <p>Enter your email to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Send Reset Link</button>
          <p className="bottom-text">
            Back to{" "}
            <button
              type="button"
              className="link-btn"
              onClick={() => navigate("/customer/login")}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
