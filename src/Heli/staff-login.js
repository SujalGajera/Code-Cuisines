import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

function Login({ setLoggedIn, setUserRole }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (role) => {
    // Simple mock login (you can replace with backend later)
    if (email && password) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userRole", role);
      setUserRole(role);
      setLoggedIn(true);
      navigate("/");
    } else {
      alert("Please enter your email and password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Staff Portal Login</h2>
        <p className="login-subtitle">
          Welcome back! Please enter your details.
        </p>

        <div className="login-form">
          <label>Email</label>
          <div className="input-group">
            <span className="icon">@</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label>Password</label>
          <div className="input-group">
            <span className="icon">🔑</span>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          {/* Staff login */}
          <button
            className="btn-primary"
            onClick={() => handleLogin("Staff")}
          >
            Sign In
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          {/* Receptionist login */}
          <button
            className="btn-secondary"
            onClick={() => handleLogin("Receptionist")}
          >
            Login as Receptionist
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
