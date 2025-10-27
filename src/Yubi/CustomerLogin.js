import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

function CustomerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // create a mock user
    const user = {
      name: email.split("@")[0],
      email: email,
      phone: "123-456-7890"
    };

    // navigate with user data
    navigate("/customer/dashboard", { state: { user } });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back, Customer 👋</h2>
        <p>Access your profile and reservations</p>

        <form onSubmit={handleSubmit}>
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
            <a href="/" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className="login-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default CustomerLogin;
