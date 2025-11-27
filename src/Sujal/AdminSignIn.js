import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./AdminSignIn.css";
import { Eye, EyeOff } from "lucide-react";

export default function AdminSignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Clear verification flag when component mounts
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
      // Step 1: Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Check if user has admin role in Firestore BEFORE navigating
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // ❌ Block login if user doesn't exist in Firestore
      if (!userSnap.exists()) {
        await auth.signOut();
        setError("⚠️ Access denied. User not found in system.");
        setIsLoading(false);
        return;
      }

      const userData = userSnap.data();

      // ❌ Block login if user has no role
      if (!userData.role) {
        await auth.signOut();
        setError("⚠️ Access denied. No role assigned.");
        setIsLoading(false);
        return;
      }

      // ❌ Block login if user is not admin
      if (userData.role !== "admin") {
        await auth.signOut();
        setError("⚠️ Access denied. Admin privileges required.");
        setIsLoading(false);
        return;
      }

      // ✅ All checks passed - set pending verification flag and navigate
      localStorage.setItem("pendingAdminVerify", "true");
      localStorage.removeItem("isAdminVerified"); // Ensure not verified yet
      navigate("/admin/verify");
      
    } catch (err) {
      console.error("Login error:", err);
      
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
          {/* Email */}
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