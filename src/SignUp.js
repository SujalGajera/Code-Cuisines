import React, { useState } from "react";
import "./SignUp.css";
import background from "./assets/medicalert-uk-9OnppW9mlCY-unsplash.jpg"; // Ensure the image path is correct

const SignUp = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (value) => {
    const generalEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"];
    if (!generalEmailRegex.test(value)) return false;

    const domain = value.split("@")[1];
    return validDomains.includes(domain.toLowerCase());
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value.trim() === "") {
      setEmailError("⚠️ Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("⚠️ Please enter a valid email format");
    } else {
      const domain = value.split("@")[1]?.toLowerCase();
      if (!["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"].includes(domain)) {
        setEmailError("⚠️ Only valid email domains are accepted (e.g., Gmail)");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("⚠️ Please use a valid email domain (e.g., @gmail.com)");
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="signup-box">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="row-inputs">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>
          <input
            type="email"
            placeholder="Work Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <p className="error-text">{emailError}</p>}

          <input
            type="password"
            placeholder="Password"
            required
          />

          <div className="role-section">
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

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

        {isSubmitted && !emailError && (
          <p className="success-message">✅ Account has been created successfully!</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
