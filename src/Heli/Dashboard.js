import React, { useState, useEffect } from "react";
import "./style.css";

export default function Dashboard({ userRole }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [workSeconds, setWorkSeconds] = useState(0);
  const [lastAction, setLastAction] = useState("Clocked Out");
  const [userName, setUserName] = useState("User");

  // Load user profile and role from localStorage
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profileData"));
    const savedRole = localStorage.getItem("userRole");

    if (savedProfile && savedProfile.name) {
      setUserName(savedProfile.name);
    } else if (savedRole === "Receptionist") {
      setUserName("Receptionist");
    } else {
      setUserName("Staff");
    }
  }, []);

  //  Update real-time clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ⏱ Count working time while clocked in
  useEffect(() => {
    let interval = null;
    if (isClockedIn) {
      interval = setInterval(() => {
        setWorkSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isClockedIn]);

  //  Handle Clock In / Clock Out
  const handleClockInOut = () => {
    const actionTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    if (isClockedIn) {
      setIsClockedIn(false);
      setLastAction(`Clocked Out at ${actionTime}`);
    } else {
      setIsClockedIn(true);
      setWorkSeconds(0);
      setLastAction(`Clocked In at ${actionTime}`);
    }
  };

  //  Format the working time display
  const formatWorkTime = () => {
    const hours = Math.floor(workSeconds / 3600);
    const minutes = Math.floor((workSeconds % 3600) / 60);
    const seconds = workSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="page">
      <h1 className="page-title">
        {userRole} Dashboard
      </h1>
      <p>
        Welcome back, <b>{userName}</b>! Here's your workspace for today.
      </p>

      <div className="dashboard-cards">
        {/* 🕒 TIME CLOCK CARD */}
        <div className="card">
          <h3>Time Clock</h3>
          <p>Track your working hours.</p>

          <div className="clock">{currentTime.toLocaleTimeString()}</div>

          <button
            className={`btn-primary ${isClockedIn ? "clocked-in" : ""}`}
            onClick={handleClockInOut}
          >
            {isClockedIn ? "→ Clock Out" : "→ Clock In"}
          </button>

          <p className="work-time">
            {isClockedIn
              ? `⏱ Worked Time: ${formatWorkTime()}`
              : "⏱ Not Clocked In"}
          </p>

          <small>Last action: {lastAction}</small>
        </div>

        {/* 📊 QUICK STATS CARD */}
        <div className="card">
          <h3>Quick Stats</h3>
          <p>
            Hours this week: <b>24.5 / 40</b>
          </p>
          <p>
            Upcoming Shifts: <b>3</b>
          </p>
          <p>
            Pending Requests: <b>1</b>
          </p>
        </div>
      </div>
    </div>
  );
}
