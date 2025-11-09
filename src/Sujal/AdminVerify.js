import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminSignIn.css";

export default function AdminVerify() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (code.trim().length === 6) {
      alert("✅ Verified successfully!");
      navigate("/admin-dashboard");
    } else {
      alert("⚠️ Please enter a valid 6-digit code.");
    }
  };

  return (
    <div className="admin-verify-page">
      <div className="admin-verify-card">
        <h2 className="admin-verify-title">Verification Code</h2>
        <p className="admin-verify-subtitle">Please enter the 6-digit code sent to your email.</p>

        <form className="admin-verify-form" onSubmit={handleVerify}>
          <label htmlFor="verifyCode">6-Digit Code</label>
          <div className="input-group">
            <input
              type="text"
              id="verifyCode"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength="6"
            />
          </div>
          <button className="btn-primary" type="submit">
            Verify
          </button>
        </form>

        <div className="back-link">
          <Link to="/adminsignin">← Back</Link>
        </div>
      </div>
    </div>
  );
}
