import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

export default function Login({ setLoggedIn, setUserRole }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Mock users
  const mockUsers = [
    { email: "heli@gmail.com", password: "Heli123", role: "Staff" },
    { email: "sujal@gmail.com", password: "Sujal123", role: "Receptionist" },
  ];

  const handleLogin = (role) => {
    setError("");

    if (email.trim() === "" && password.trim() === "") {
      setError("⚠️ Please enter your email and password.");
    } else if (email.trim() === "") {
      setError("⚠️ Please enter your email address.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("⚠️ Please enter a valid email address.");
    } else if (password.trim() === "") {
      setError("⚠️ Please enter your password.");
    } else {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password && u.role === role
      );

      if (user) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userRole", role);
        setUserRole(role);
        setLoggedIn(true);
        navigate("/");
      } else {
        setError("⚠️ Incorrect email or password. Please try again.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Staff Login</h2>
        <p className="login-subtitle">Welcome back! Please enter your details.</p>

        <div className="login-form">
          <label>Email</label>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label>Password</label>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/staff/forgot" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="button-row">
            <button className="btn-primary" onClick={() => handleLogin("Staff")}>
              Sign In as Staff
            </button>
            <button className="btn-primary" onClick={() => handleLogin("Receptionist")}>
              Sign In as Receptionist
            </button>
          </div>

          <div className="signup-link">
            Don’t have an account?{" "}
            <Link to="/signup" className="highlight-link">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
