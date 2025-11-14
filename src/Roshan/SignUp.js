import React, { useState } from "react";
import "./SignUp.css";

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="login-page">
      <div className="login-card">

        <h2 className="login-title">Create Your Account</h2>

        <div className="login-form">

          {/* Label for both fields */}
          <label>Name</label>

          {/* First + Last Name in ONE ROW */}
          <div className="name-row">
            <input
              type="text"
              placeholder="First Name"
              className="input-clean"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input-clean"
            />
          </div>

          {/* Work Email */}
          <label>Work Email</label>
          <input
            type="email"
            placeholder="Work Email"
            className="input-clean"
          />

          {/* Password + Show Password */}
          <label>Password</label>
          <div className="sl-pass-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="input-clean sl-pass-input"
            />

            <span
              className="sl-show-btn"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "Hide Password" : "Show Password"}
            </span>
          </div>

          {/* BUTTON */}
          <button className="btn-primary login-btn">
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
