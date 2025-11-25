import React from "react";

export default function LogoutTab() {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <div className="cb-tablecard" style={{ maxWidth: 500, margin: "40px auto", textAlign: "center" }}>
      <h2 style={{ marginBottom: 20, color: "#8b3f08" }}>Logout</h2>

      <p style={{ marginBottom: 20 }}>
        You are currently logged in.  
        Would you like to logout from your account?
      </p>

      <button
        className="cb-pill"
        style={{
          background: "#c62828",
          padding: "10px 24px",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        Confirm Logout
      </button>
    </div>
  );
}
