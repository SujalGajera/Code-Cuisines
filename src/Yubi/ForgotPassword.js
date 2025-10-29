import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState("verify"); // 'verify' or 'reset'
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Step 1: Verify user email
  const handleVerifyEmail = (e) => {
    e.preventDefault();

    const customers = JSON.parse(localStorage.getItem("registeredCustomers")) || [];
    const found = customers.find((u) => u.email === email);

    if (!found) {
      setMessage("❌ No account found with this email.");
      return;
    }

    setMessage("✅ Email verified! Please enter your new password.");
    setStep("reset");
  };

  // ✅ Step 2: Update password in localStorage
  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (newPassword.length < 4) {
      setMessage("⚠️ Password must be at least 4 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    let customers = JSON.parse(localStorage.getItem("registeredCustomers")) || [];
    customers = customers.map((user) =>
      user.email === email ? { ...user, password: newPassword } : user
    );
    localStorage.setItem("registeredCustomers", JSON.stringify(customers));

    setMessage("✅ Password updated successfully! Redirecting to login...");
    setTimeout(() => navigate("/customer/login"), 2000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {step === "verify" ? (
          <>
            <h2>Forgot Password?</h2>
            <p>Enter your registered email to verify your account.</p>

            <form onSubmit={handleVerifyEmail}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="login-btn">
                Verify Email
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>Reset Password</h2>
            <p>Enter your new password below.</p>

            <form onSubmit={handlePasswordReset}>
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button type="submit" className="login-btn">
                Update Password
              </button>
            </form>
          </>
        )}

        {/* Feedback message */}
        {message && <p className="info-msg">{message}</p>}

        <p className="bottom-text">
          Back to{" "}
          <button
            type="button"
            className="link-btn"
            onClick={() => navigate("/customer/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
