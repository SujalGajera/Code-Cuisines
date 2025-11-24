import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSignIn.css";

export default function AdminVerify() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();

    // Example static check — replace with real Firebase or backend logic if needed
    const correctCode = "123456";

    if (code.trim() === "") {
      setError("⚠️ Please enter the 6-digit code.");
      return;
    }

    if (code === correctCode) {
      alert("✅ Verified successfully!");

      // 🔒 Save verification flag so ProtectedRoute allows dashboard
      localStorage.setItem("isAdminVerified", "true");

      // ✅ Redirect to AdminOverview
      navigate("/admin", { replace: true });
    } else {
      setError("❌ Invalid code. Please try again.");
    }
  };

  return (
    <div className="admin-verify-page">
      <div className="admin-verify-card">
        <h2>Verification Code</h2>
        <p>Please enter the 6-digit code sent to your email.</p>

        <form onSubmit={handleVerify}>
          <label>6-Digit Code</label>
          <input
            type="text"
            maxLength="6"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
          />
          {error && <p className="error-text">{error}</p>}

          <button type="submit">Verify</button>
        </form>

        <button
          onClick={() => navigate("/login/admin")}
          className="back-link"
          type="button"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
