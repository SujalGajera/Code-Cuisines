// Author: Roshan Dhakal
// Date: November 2025
// Description: Receptionist Dashboard (Profile + Bookings + Shifts)

import React, { useState } from "react";
import "./ReceptionistDashboard.css";
import CustomerBookings from "./CustomerBookings";

export default function ReceptionistDashboard() {
  const [tab, setTab] = useState("bookings");

  return (
    <div className="receptionist-page">
      <div className="cb-page">
        {/* ---------- Header ---------- */}
        <header className="cb-brandbar">
          <div className="cb-brand-left">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1048/1048315.png"
              alt="logo"
              className="cb-logo"
            />
            <span className="cb-title">Code & Cuisine</span>
          </div>

          <div className="cb-brand-right">
            <div className="cb-pill">📅 {new Date().toDateString()}</div>
            <div className="cb-pill">Sarah Anderson</div>
          </div>
        </header>

        {/* ---------- Navigation Tabs ---------- */}
        <div className="cb-tabs">
          <button
            className={`cb-tab ${tab === "profile" ? "active" : ""}`}
            onClick={() => setTab("profile")}
          >
            👤 Profile
          </button>
          <button
            className={`cb-tab ${tab === "bookings" ? "active" : ""}`}
            onClick={() => setTab("bookings")}
          >
            📋 Bookings
          </button>
          <button
            className={`cb-tab ${tab === "shifts" ? "active" : ""}`}
            onClick={() => setTab("shifts")}
          >
            ⏰ Shifts
          </button>
        </div>

        {/* ---------- Tab Content ---------- */}
        {tab === "bookings" && <CustomerBookings />}
        {tab === "profile" && (
          <div className="cb-comingsoon">
            <h2>👤 Profile — Coming Soon</h2>
            <p>Feature under development.</p>
          </div>
        )}
        {tab === "shifts" && (
          <div className="cb-comingsoon">
            <h2>⏰ Shifts — Coming Soon</h2>
            <p>Shift scheduling and tracking will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
