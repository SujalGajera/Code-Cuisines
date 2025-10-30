import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

function CustomerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Fetch registered users
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Check if user exists
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      alert(`✅ Welcome back, ${matchedUser.firstName}!`);
      // Save logged-in user info for dashboard
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      navigate("/customer/dashboard");
    } else {
      alert("❌ Invalid email or password! Please try again or register.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back, Customer </h2>
        <p>Access your profile and reservations</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@codecuisine.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a
              href="/customer/forgot-password"
              style={{ color: "#ffb703", textDecoration: "none" }}
            >
              Forgot password?
            </a>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>

          <p style={{ marginTop: "15px", color: "#fff" }}>
            Don’t have an account?{" "}
            <span
              style={{ color: "#ffb703", cursor: "pointer" }}
              onClick={() => navigate("/customer/register")}
            >
              Register here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CustomerLogin;
