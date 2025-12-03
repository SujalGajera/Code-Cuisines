import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import "../styles/AdminForgot.css";

/**
 * AdminForgot Component
 * Handles password reset functionality for administrators.
 * Sends a password reset email via Firebase Auth.
 */
export default function AdminForgot() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    if (!email.trim()) {
      setMessage("⚠️ Please enter your email address.");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("⚠️ Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin + "/login/admin", // Redirect URL after reset
        handleCodeInApp: false,
      });

      setMessage("✅ Password reset link sent! Check your email.");
      setEmail("");
    } catch (err) {
      console.error("Password reset error:", err);

      if (err.code === "auth/user-not-found") {
        setMessage("⚠️ No account found with this email address.");
      } else if (err.code === "auth/invalid-email") {
        setMessage("⚠️ Invalid email address format.");
      } else if (err.code === "auth/too-many-requests") {
        setMessage("⚠️ Too many requests. Please try again later.");
      } else if (err.code === "auth/network-request-failed") {
        setMessage("⚠️ Network error. Check your internet connection.");
      } else {
        setMessage("⚠️ Failed to send reset email. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-forgot-page">
      <div className="admin-forgot-card">
        <h2 className="forgot-title">Forgot Password</h2>
        <p className="forgot-subtitle">
          Enter your admin email and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleReset} className="forgot-form">
          <label>Email</label>
          <div className="input-group">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          {message && (
            <p
              className={`message-text ${message.startsWith("✅") ? "success" : "error"
                }`}
            >
              {message}
            </p>
          )}

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="back-link">
            <Link to="/login/admin">← Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
