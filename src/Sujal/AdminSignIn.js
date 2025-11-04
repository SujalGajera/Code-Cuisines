import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminSignIn.css";

export default function AdminSignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() && !password.trim()) {
      setError("⚠️ Please enter your email and password.");
    } else if (!email.trim()) {
      setError("⚠️ Please enter your email address.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("⚠️ Please enter a valid email address.");
    } else if (!password.trim()) {
      setError("⚠️ Please enter your password.");
    } else if (email === "admin@codecuisine.com" && password === "Admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/");
    } else {
      setError("⚠️ Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2 className="admin-login-title">Admin Login</h2>
        <p className="admin-login-subtitle">
          Welcome back! Please enter your admin credentials.
        </p>

        <form onSubmit={handleLogin} className="admin-login-form">
          <label>Email</label>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label>Password</label>
          <div className="input-group password-row">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/admin/forgot" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn-primary">
            Sign In as Admin
          </button>

          <div className="back-link">
            <Link to="/">← Back to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
