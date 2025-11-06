import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css"; // Reuse same CSS

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);

  // Step 1: Verify Email
  const handleVerify = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const userExists = users.find((user) => user.email === email);

    if (!userExists) {
      alert("❌ Email not found! Please register first.");
      navigate("/customer/register");
      return;
    }

    alert("✅ Email verified! Please reset your password.");
    setStep(2);
  };

  // Step 2: Reset Password
  const handleReset = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("⚠️ Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, password: newPassword } : user
    );

    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    alert("✅ Password has been successfully reset!");
    navigate("/customer/login");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Forgot </h2>
        <p>Reset your Code Cuisine account password</p>

        {step === 1 ? (
          <form onSubmit={handleVerify}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">
              Verify Email
            </button>

            <p style={{ marginTop: "15px", color: "#fff" }}>
              Remembered your password?{" "}
              <span
                style={{ color: "#ffb703", cursor: "pointer" }}
                onClick={() => navigate("/customer/login")}
              >
                Login here
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">
              Reset Password
            </button>

            <p style={{ marginTop: "15px", color: "#fff" }}>
              Go back to{" "}
              <span
                style={{ color: "#ffb703", cursor: "pointer" }}
                onClick={() => navigate("/customer/login")}
              >
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
