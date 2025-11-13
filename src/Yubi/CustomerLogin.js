import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

function CustomerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      alert(`✅ Welcome back, ${matchedUser.firstName}!`);
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      navigate("/customer/dashboard");
    } else {
      alert("❌ Invalid email or password. Please try again or register.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 style={{ color: "#111" }}>Welcome Back</h2>
        <p>Access your profile and reservations</p>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@codecuisine.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password + Forgot link */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <label style={{ margin: 0 }}>Password</label>
            <span
              onClick={() => navigate("/customer/forgot-password")}
              style={{
                color: "#a94c0a",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              Forgot password?
            </span>
          </div>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Button */}
          <button type="submit" className="login-btn">
            Sign In
          </button>

          {/* Register link */}
          <p className="link-prompt">
            Not yet registered?{" "}
            <span onClick={() => navigate("/customer/register")}>
              Sign up here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CustomerLogin;
