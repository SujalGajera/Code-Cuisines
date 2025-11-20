// src/Yubi/Dashboard/CustomerDashboard.js
import React from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import "./CustomerDashboard.css";

function CustomerDashboard({ user }) {
  const stats = [
    { label: "active reservations", value: 2, icon: "📅" },
    { label: "completed orders", value: 15, icon: "✅" },
    { label: "transactions processed", value: 18, icon: "💳" },
    { label: "upcoming reservation", value: "Dec 25, 7:00 PM", icon: "⏰" },
    { label: "total spend", value: "$342", icon: "💵" },
  ];

  const activities = [
    {
      id: 1,
      title: "Reservation confirmed",
      date: "Dec 15, 2025",
      status: "Confirmed",
      pillClass: "cc-pill-success",
    },
    {
      id: 2,
      title: "Payment completed",
      date: "Dec 12, 2025",
      status: "Paid",
      pillClass: "cc-pill-success",
    },
    {
      id: 3,
      title: "Order delivered",
      date: "Dec 10, 2025",
      status: "Delivered",
      pillClass: "cc-pill-muted",
    },
    {
      id: 4,
      title: "Feedback received",
      date: "Dec 8, 2025",
      status: "Received",
      pillClass: "cc-pill-warning",
    },
  ];

  const firstName = user?.firstName || "Customer";

  return (
    <CustomerLayout>
      <div className="cc-dashboard">
        <div className="cc-dashboard-header">
          <h1 className="cc-page-title">Customer Dashboard</h1>
          <p className="cc-page-subtitle">
            Welcome back, {firstName}! Here&apos;s your overview.
          </p>
        </div>

        <section className="cc-dashboard-metrics">
          {stats.map((s) => (
            <div key={s.label} className="cc-dashboard-metric-card">
              <div className="cc-metric-icon">{s.icon}</div>
              <div className="cc-metric-content">
                <div className="cc-metric-value">{s.value}</div>
                <div className="cc-metric-label">{s.label}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="cc-dashboard-activity-section">
          <div className="cc-card cc-dashboard-activity-card">
            <h2>Recent Activity</h2>
            <ul className="cc-activity-list">
              {activities.map((item) => (
                <li key={item.id} className="cc-activity-item">
                  <div className="cc-activity-icon-badge">
                    <span>✓</span>
                  </div>
                  <div className="cc-activity-main">
                    <div className="cc-activity-title">{item.title}</div>
                    <div className="cc-activity-meta">{item.date}</div>
                  </div>
                  <div className={`cc-pill ${item.pillClass}`}>
                    {item.status}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </CustomerLayout>
  );
}

export default CustomerDashboard;
