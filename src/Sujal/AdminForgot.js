import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import "./AdminForgot.css";

export default function AdminForgot() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    // Validate email format
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
      // Step 1: Check if this email belongs to an admin in Firestore
      // We need to find the user by email first
      // Note: This is a basic check - for production, consider using Cloud Functions
      
      // Step 2: Send password reset email via Firebase
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin + "/login/admin", // Redirect here after reset
        handleCodeInApp: false,
      });

      setMessage("✅ Password reset link sent! Check your email.");
      setEmail("");
    } catch (err) {
      console.error("Password reset error:", err);

      // Handle different error codes
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
              className={`message-text ${
                message.startsWith("✅") ? "success" : "error"
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
