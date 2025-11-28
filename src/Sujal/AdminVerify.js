import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "./admin/AdminContext";
import "./AdminSignIn.css";

export default function AdminVerify() {
  const navigate = useNavigate();
  const { user, role } = useAdmin();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if user should be on this page
  useEffect(() => {
    // If not logged in, redirect to login
    if (!user) {
      console.log("No user found - redirecting to login");
      navigate("/login/admin", { replace: true });
      return;
    }

    // If not admin, redirect to home
    if (role && role !== "admin") {
      console.log("Not admin - redirecting home");
      navigate("/", { replace: true });
      return;
    }

    // If already verified, redirect to admin dashboard
    const isVerified = localStorage.getItem("isAdminVerified") === "true";
    if (isVerified) {
      console.log("Already verified - redirecting to dashboard");
      navigate("/admin", { replace: true });
      return;
    }

    // Check if they came from login (should have pending flag)
    const pendingVerify = localStorage.getItem("pendingAdminVerify") === "true";
    if (!pendingVerify) {
      console.log("No pending verification - redirecting to login");
      navigate("/login/admin", { replace: true });
      return;
    }
  }, [user, role, navigate]);

  const handleVerify = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Hardcoded verification code (replace with real implementation)
    const CORRECT_CODE = "123456";

    if (!code.trim()) {
      setError("⚠️ Please enter the verification code.");
      setIsLoading(false);
      return;
    }

    if (code !== CORRECT_CODE) {
      setError("⚠️ Invalid verification code.");
      setIsLoading(false);
      return;
    }

    // Success - set verified flag and navigate
    localStorage.setItem("isAdminVerified", "true");
    localStorage.removeItem("pendingAdminVerify");
    setIsLoading(false);
    navigate("/admin");
  };

  const handleBack = () => {
    // Clear flags and sign out
    localStorage.removeItem("isAdminVerified");
    localStorage.removeItem("pendingAdminVerify");
    navigate("/login/admin");
  };

  // Don't render anything if checks are happening
  if (!user || role !== "admin") {
    return null;
  }

  return (
    <div className="admin-verify-page">
      <div className="admin-verify-card">
        <h2 className="verify-title">Verification Code</h2>
        <p className="verify-subtitle">
          Please enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleVerify} className="verify-form">
          {/* FIX: Wrapped label and input in .input-group for correct spacing */}
          <div className="input-group"> 
            <label htmlFor="code">6-Digit Code</label>
            <input
              id="code"
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify"}
          </button>

          <div className="back-link" onClick={handleBack}>
            ← Back
          </div>
        </form>
      </div>
    </div>
  );
}