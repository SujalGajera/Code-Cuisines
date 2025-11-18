// src/Roshan/SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      // 1️⃣ Create Firebase Auth account
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // 2️⃣ Save Firestore document in receptionists collection
      await setDoc(doc(db, "receptionists", userCred.user.uid), {
        firstName,
        lastName,
        email,
        role: "receptionist",
        uid: userCred.user.uid,
      });

      alert("Account created successfully!");
      navigate("/staff-login");

    } catch (error) {
      console.log("Signup error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Create Your Account</h2>

        <div className="login-form">
          <label>Name</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input className="input-clean" placeholder="First Name"
              value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input className="input-clean" placeholder="Last Name"
              value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <label>Work Email</label>
          <input className="input-clean" type="email"
            placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <div className="sl-pass-wrapper">
            <input className="input-clean sl-pass-input"
              type={passwordVisible ? "text" : "password"}
              value={password} placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} />
            <span className="sl-show-btn"
              onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? "Hide Password" : "Show Password"}
            </span>
          </div>

          <button className="btn-primary login-btn" onClick={handleSignup}>
            Create Account
          </button>
        </div>

        <p className="signup-link">
          Already signed up?
          <a className="highlight-link" href="/staff-login"> Sign in</a>
        </p>
      </div>
    </div>
  );
}
