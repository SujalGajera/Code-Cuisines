import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./AdminSignIn.css";
import { Eye, EyeOff } from "lucide-react"; // lightweight icon set

export default function AdminSignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("⚠️ Enter email & password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("pendingAdminVerify", "true");
      navigate("/admin/verify");
    } catch (err) {
      console.error("Login error:", err);
      setError("⚠️ Incorrect credentials.");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2 className="admin-login-title">Admin Login</h2>

        <form onSubmit={handleLogin} className="admin-login-form">
          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password with toggle */}
          <div className="input-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <Link to="/admin/forgot" className="forgot-link-below">
              Forgot Password?
            </Link>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn-primary">
            Sign In
          </button>

          <div className="back-link">
            <Link to="/">← Back to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
