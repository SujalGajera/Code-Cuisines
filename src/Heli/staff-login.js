import React, { useState } from "react";
import "./style.css";

export default function StaffLogin() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="sl-page">
      <div className="sl-card">

        <h2 className="sl-title">Sign In Here</h2>
        <p className="sl-sub">Welcome back! Please enter your details.</p>

        {/* Email */}
        <label className="sl-label">Email</label>
        <input
          type="email"
          placeholder="Enter your work email"
          className="sl-input"
        />

        {/* Password */}
        <label className="sl-label">Password</label>

        <div className="sl-pass-wrapper">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter your password"
            className="sl-input sl-pass-input"
          />
          <span
            className="sl-show-btn"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? "Hide Password" : "Show Password"}
          </span>
        </div>

        <button className="sl-btn">
          Sign In as Staff / Receptionist
        </button>

        <p className="sl-bottom-text">
          Already have an account?
          <a href="/staff-login" className="sl-link"> Sign in here</a>
        </p>

      </div>
    </div>
  );
}
