import React from "react";
import "./style.css";

export default function Shifts() {
  return (
    <div className="page">
      <h1 className="page-title">Shift Management</h1>
      <p>View your upcoming shifts and request changes.</p>

      <div className="shifts-container">
        <div className="shift-card">
          <h3>Thursday, August 15, 2024</h3>
          <p>Server — 17:00 - 22:00</p>
          <button className="btn-secondary">Request Change</button>
        </div>
        <div className="shift-card">
          <h3>Friday, August 16, 2024</h3>
          <p>Host — 16:00 - 21:00</p>
          <button className="btn-secondary">Request Change</button>
        </div>
      </div>
    </div>
  );
}
