// src/Heli/StaffLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./style.css";

export default function StaffLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setError("");
      setIsLoading(true);

      if (!email.trim() || !password.trim()) {
        setError("⚠️ Please enter email and password.");
        setIsLoading(false);
        return;
      }

      // Step 1: Authenticate with Firebase
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // Step 2: Check user role in Firestore (users collection, not receptionists)
      const userRef = doc(db, "users", userCred.user.uid);
      const snap = await getDoc(userRef);

      // ❌ Block if user doesn't exist in Firestore
      if (!snap.exists()) {
        await auth.signOut();
        setError("⚠️ Access denied. User not found in system.");
        setIsLoading(false);
        return;
      }

      const userData = snap.data();
      const role = userData.role;

      // ❌ Block if no role
      if (!role) {
        await auth.signOut();
        setError("⚠️ Access denied. No role assigned.");
        setIsLoading(false);
        return;
      }

      // ✅ Allow admin, staff, or receptionist
      if (role === "admin" || role === "staff" || role === "receptionist") {
        console.log(`✅ ${role} logged in successfully`);

        // --- START NEW LOGIC: Save profile to localStorage ---
        const profile = {
          name: userData.name || userCred.user.email.split('@')[0], // Use name from Firestore or part of email
          email: userCred.user.email,
          phone: userData.phone || "N/A",
          role: role.charAt(0).toUpperCase() + role.slice(1), // Capitalize role for display
          avatar: userData.avatar || "",
          skills: userData.skills || ["General Staff Duties"],
        };

        // Save the profile data for the ReceptionistDashboard to pick up
        localStorage.setItem("receptionProfile", JSON.stringify(profile));
        // --- END NEW LOGIC ---

        // Navigate to staff dashboard
        navigate("/staff/dashboard");
      } else {
        // ❌ Block customers and other roles
        await auth.signOut();
        setError("⚠️ Access denied. Staff or Admin privileges required.");
        setIsLoading(false);
      }

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
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Sign In Here</h2>
        <p className="login-subtitle">
          Welcome back! Please enter your details.
        </p>

        <div className="login-form">
          <label>Email</label>
          <input
            type="email"
            className="input-clean"
            placeholder="Enter your work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <label>Password</label>
          <input
            type="password"
            className="input-clean"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            disabled={isLoading}
          />

          {error && <p className="error-login">{error}</p>}

          <button 
            className="btn-primary login-btn" 
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In as Staff / Receptionist"}
          </button>
        </div>

        <p className="signup-link">
          Don't have an account?
          <a className="highlight-link" href="/signup"> Sign up here</a>
        </p>
      </div>
    </div>
  );
}