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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      const userRef = doc(db, "receptionists", userCred.user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) return setError("Access denied");

      const role = snap.data().role;

      if (role === "receptionist" || role === "staff") {
        navigate("/receptionist");
      } else {
        setError("Unknown role!");
      }
    } catch (err) {
      setError("Wrong login details!");
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
          />

          <label>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              className="input-clean"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: "100px" }}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                color: "#9b4a0f",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>

          {error && <p className="error-login">{error}</p>}

          <button className="btn-primary login-btn" onClick={handleLogin}>
            Sign In as Staff / Receptionist
          </button>
        </div>

        <p className="signup-link">
          Don’t have an account?
          <a className="highlight-link" href="/signup"> Sign up here</a>
        </p>
      </div>
    </div>
  );
}
