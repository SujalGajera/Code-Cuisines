// src/Yubi/Dashboard/CustomerDashboard.js
import React, { useState, useEffect } from "react";
import CustomerLayout from "../components/CustomerLayout";
import { auth, db } from "../../firebase";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import "../styles/CustomerDashboard.css";

function CustomerDashboard({ user }) {
  const [customerUid, setCustomerUid] = useState(null);
  const [stats, setStats] = useState({
    activeReservations: 0,
    completedOrders: 0,
    totalTransactions: 0,
    upcomingReservation: null,
    totalSpend: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);

  // Get customer UID
  useEffect(() => {
    const userFromAuth = auth.currentUser;
    const customerFromStorage = JSON.parse(
      localStorage.getItem("currentCustomer") || "null"
    );
    const uid = userFromAuth?.uid || customerFromStorage?.uid;
    if (uid) setCustomerUid(uid);
  }, []);

  // Load real-time stats from Firebase
  useEffect(() => {
    if (!customerUid) return;

    // Listen to reservations
    const resQuery = query(
      collection(db, "reservations"),
      where("userId", "==", customerUid)
    );

    const unsubReservations = onSnapshot(resQuery, (snapshot) => {
      const reservations = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // Count active reservations (Pending or Confirmed)
      const active = reservations.filter(
        (r) => r.status === "Pending" || r.status === "Confirmed"
      );

      // Get upcoming reservation (first confirmed/pending, sorted by date)
      const upcoming = active
        .sort((a, b) => {
          if (a.date === b.date) return a.time.localeCompare(b.time);
          return a.date.localeCompare(b.date);
        })[0];

      setStats((prev) => ({
        ...prev,
        activeReservations: active.length,
        upcomingReservation: upcoming
          ? `${upcoming.date}, ${upcoming.time}`
          : "None",
      }));

      // Add to recent activity
      const recentRes = reservations
        .filter((r) => r.status === "Confirmed")
        .slice(0, 2)
        .map((r) => ({
          id: `res-${r.id}`,
          title: "Reservation confirmed",
          date: r.date || "Recent",
          status: "Confirmed",
          pillClass: "cc-pill-success",
        }));

      setRecentActivities((prev) => {
        const others = prev.filter((a) => !a.id.startsWith("res-"));
        return [...recentRes, ...others].slice(0, 4);
      });
    });

    // Listen to orders (future implementation)
    // For now, set to 0
    setStats((prev) => ({
      ...prev,
      completedOrders: 0,
      totalTransactions: 0,
      totalSpend: 0,
    }));

    // Listen to feedback
    const feedbackQuery = query(
      collection(db, "feedback"),
      where("userId", "==", customerUid),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const unsubFeedback = onSnapshot(feedbackQuery, (snapshot) => {
      if (!snapshot.empty) {
        const feedback = snapshot.docs[0].data();
        const feedbackActivity = {
          id: `feedback-${snapshot.docs[0].id}`,
          title: "Feedback received",
          date: feedback.createdAt?.toDate
            ? feedback.createdAt.toDate().toLocaleDateString()
            : "Recent",
          status: "Received",
          pillClass: "cc-pill-warning",
        };

        setRecentActivities((prev) => {
          const others = prev.filter((a) => !a.id.startsWith("feedback-"));
          return [...others, feedbackActivity].slice(0, 4);
        });
      }
    });

    return () => {
      unsubReservations();
      unsubFeedback();
    };
  }, [customerUid]);

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
          <div className="cc-dashboard-metric-card">
            <div className="cc-metric-icon">📅</div>
            <div className="cc-metric-content">
              <div className="cc-metric-value">{stats.activeReservations}</div>
              <div className="cc-metric-label">active reservations</div>
            </div>
          </div>

          <div className="cc-dashboard-metric-card">
            <div className="cc-metric-icon">✅</div>
            <div className="cc-metric-content">
              <div className="cc-metric-value">{stats.completedOrders}</div>
              <div className="cc-metric-label">completed orders</div>
            </div>
          </div>

          <div className="cc-dashboard-metric-card">
            <div className="cc-metric-icon">💳</div>
            <div className="cc-metric-content">
              <div className="cc-metric-value">{stats.totalTransactions}</div>
              <div className="cc-metric-label">transactions processed</div>
            </div>
          </div>

          <div className="cc-dashboard-metric-card">
            <div className="cc-metric-icon">⏰</div>
            <div className="cc-metric-content">
              <div className="cc-metric-value" style={{ fontSize: "0.9em" }}>
                {stats.upcomingReservation}
              </div>
              <div className="cc-metric-label">upcoming reservation</div>
            </div>
          </div>

          <div className="cc-dashboard-metric-card">
            <div className="cc-metric-icon">💵</div>
            <div className="cc-metric-content">
              <div className="cc-metric-value">${stats.totalSpend}</div>
              <div className="cc-metric-label">total spend</div>
            </div>
          </div>
        </section>

        <section className="cc-dashboard-activity-section">
          <div className="cc-card cc-dashboard-activity-card">
            <h2>Recent Activity</h2>
            {recentActivities.length > 0 ? (
              <ul className="cc-activity-list">
                {recentActivities.map((item) => (
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
            ) : (
              <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>
                No recent activity. Start by making a reservation or placing an order!
              </p>
            )}
          </div>
        </section>
      </div>
    </CustomerLayout>
  );
}

export default CustomerDashboard;
