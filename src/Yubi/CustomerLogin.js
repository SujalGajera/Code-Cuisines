import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./CustomerLogin.css";

function CustomerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("⚠️ Please enter email and password.");
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Check user role in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // ❌ Block if user doesn't exist in Firestore
      if (!userSnap.exists()) {
        await auth.signOut();
        setError("⚠️ Access denied. User not found in system.");
        setIsLoading(false);
        return;
      }

      const userData = userSnap.data();

      // ❌ Block if no role assigned
      if (!userData.role) {
        await auth.signOut();
        setError("⚠️ Access denied. No role assigned.");
        setIsLoading(false);
        return;
      }

      // ✅ Allow admin or customer
      if (userData.role === "admin" || userData.role === "customer") {
        console.log(`✅ ${userData.role} logged in as customer`);
        
        // Store user info in localStorage (optional)
        localStorage.setItem("loggedInUser", JSON.stringify({
          email: userData.email,
          name: userData.name,
          role: userData.role,
        }));

        // Navigate to customer dashboard
        navigate("/customer/dashboard");
      } else {
        // ❌ Block staff and receptionist from customer login
        await auth.signOut();
        setError("⚠️ Access denied. Customer or Admin privileges required.");
        setIsLoading(false);
      }

    } catch (err) {
      console.error("Login error:", err);
      
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("⚠️ Invalid email or password. Please try again.");
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
            disabled={isLoading}
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
            disabled={isLoading}
            required
          />

          {/* Error message */}
          {error && (
            <p style={{ 
              color: "#d32f2f", 
              fontSize: "0.9rem", 
              marginTop: "0.5rem" 
            }}>
              {error}
            </p>
          )}

          {/* Button */}
          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
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