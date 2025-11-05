import React, { useState } from "react";
import "./ReceptionistDashboard.css";
import ReceptionistProfile from "./ReceptionistProfile";
import ReceptionistBookings from "./ReceptionistBookings";
import ReceptionistShifts from "./ReceptionistShifts";

const logo = process.env.PUBLIC_URL + "/calendar-logo.png";

export default function ReceptionistDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="cb-page">
      {/* Header */}
      <header className="cb-brandbar">
        <div className="cb-brand-left">
          <img src={logo} alt="Logo" className="cb-logo" />
          <span className="cb-title">MediCare Reception</span>
        </div>
        <div className="cb-brand-right">
          <span className="cb-pill">📅 Tuesday, Nov 4</span>
          <span className="cb-pill">Sarah Anderson</span>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="reception-nav">
        <button onClick={() => setActiveTab("profile")} className={activeTab === "profile" ? "active" : ""}>
          👤 Profile
        </button>
        <button onClick={() => setActiveTab("bookings")} className={activeTab === "bookings" ? "active" : ""}>
          📅 Bookings
        </button>
        <button onClick={() => setActiveTab("shifts")} className={activeTab === "shifts" ? "active" : ""}>
          🕒 Shifts
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && <ReceptionistProfile />}
      {activeTab === "bookings" && <ReceptionistBookings />}
      {activeTab === "shifts" && <ReceptionistShifts />}
    </div>
  );
}
