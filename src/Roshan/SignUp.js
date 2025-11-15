import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./SignUp.css";

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

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
      // 1) Create auth user
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2) Save profile to **users** collection (matches your rules)
      await setDoc(doc(db, "users", userCred.user.uid), {
        firstName,
        lastName,
        email,
        role: "staff", // we’ll use this on login
      });

      alert("Account created successfully!");
      navigate("/staff-login");
    } catch (error) {
      console.log("Signup error:", error.code, error.message);
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Create Your Account</h2>

        <div className="login-form">
          {/* Name row */}
          <label>Name</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="First Name"
              className="input-clean"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input-clean"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Work Email */}
          <label>Work Email</label>
          <input
            type="email"
            placeholder="Work Email"
            className="input-clean"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password + Show/Hide text */}
          <label>Password</label>
          <div className="sl-pass-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="input-clean sl-pass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="sl-show-btn"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "Hide Password" : "Show Password"}
            </span>
          </div>

          <button className="btn-primary login-btn" onClick={handleSignup}>
            Create Account
          </button>
        </div>

        <p className="signup-link">
          Already signed up?
          <a className="highlight-link" href="/staff-login">
            {" "}
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
