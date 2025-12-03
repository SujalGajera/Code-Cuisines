import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import "../styles/AdminSignIn.css";
import { Eye, EyeOff } from "lucide-react";

/**
 * AdminSignIn Component
 * Handles administrator authentication with email/password.
 * Verifies user role in Firestore before granting access.
 */
export default function AdminSignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Reset verification flags on mount to ensure fresh login flow
  useEffect(() => {
    localStorage.removeItem("isAdminVerified");
    localStorage.removeItem("pendingAdminVerify");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("⚠️ Enter email & password.");
      setIsLoading(false);
      return;
    }

    try {
      // Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verify admin role in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await auth.signOut();
        setError("⚠️ Access denied. User not found in system.");
        setIsLoading(false);
        return;
      }

      const userData = userSnap.data();

      if (!userData.role || userData.role !== "admin") {
        await auth.signOut();
        setError("⚠️ Access denied. Admin privileges required.");
        setIsLoading(false);
        return;
      }

      // Set pending flag and redirect to 2FA/Verification page
      localStorage.setItem("pendingAdminVerify", "true");
      localStorage.removeItem("isAdminVerified");
      navigate("/admin/verify");

    } catch (err) {
      console.error("Login error:", err);

      // Map Firebase error codes to user-friendly messages
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("⚠️ Incorrect email or password.");
      } else if (err.code === "auth/invalid-email") {
        setError("⚠️ Invalid email format.");
      } else if (err.code === "auth/too-many-requests") {
        setError("⚠️ Too many failed attempts. Try again later.");
      } else if (err.code === "auth/invalid-credential") {
        setError("⚠️ Invalid credentials.");
      } else {
        setError("⚠️ Login failed. Please try again.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2 className="admin-login-title">Admin Login</h2>

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div className="input-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <Link to="/admin/forgot" className="forgot-link-below">
              Forgot Password?
            </Link>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <div className="back-link">
            <Link to="/">← Back to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}