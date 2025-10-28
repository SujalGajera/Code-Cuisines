import React, { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [role, setRole] = useState("");

  // Image from public folder
  const logo = process.env.PUBLIC_URL + "/restaurant-image.png";

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* Logo and Title */}
        <img src={logo} alt="Code & Cuisines Logo" className="signup-logo" />
        <h2 className="signup-title">Sign Up Here</h2>
        <h3 className="signup-subtitle">Create Your Account</h3>

        {/* Form Section */}
        <form>
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <input type="email" placeholder="Work Email" required />

          {/* Password with Show/Hide */}
          <div className="password-box">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Role Buttons */}
          <div className="role-buttons">
            <button
              type="button"
              className={`role-btn ${role === "staff" ? "active" : ""}`}
              onClick={() => setRole("staff")}
            >
              Login as Staff
            </button>
            <button
              type="button"
              className={`role-btn ${role === "receptionist" ? "active" : ""}`}
              onClick={() => setRole("receptionist")}
            >
              Login as Receptionist
            </button>
          </div>

          <button type="submit" className="create-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
