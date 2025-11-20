// src/Yubi/Reservations/CustomerReservations.js
import React from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import "./CustomerReservations.css";

const upcomingReservations = [
  {
    id: 1,
    date: "December 25, 2025",
    time: "7:00 PM",
    guests: 4,
    table: "Table 12",
    status: "Confirmed",
    note: "Window seating preferred",
  },
  {
    id: 2,
    date: "December 30, 2025",
    time: "6:30 PM",
    guests: 2,
    table: "Table 8",
    status: "Pending",
    note: "",
  },
];

const pastReservations = [
  {
    id: 3,
    date: "December 15, 2025",
    time: "8:00 PM",
    guests: 3,
    table: "Table 5",
    status: "Completed",
  },
  {
    id: 4,
    date: "December 8, 2025",
    time: "7:30 PM",
    guests: 2,
    table: "Table 15",
    status: "Completed",
  },
];

function CustomerReservations() {
  const handleNewReservation = () => {
    alert("New reservation action (mock only).");
  };

  const handleEdit = (res) => {
    alert(`Edit reservation for ${res.date} (mock only).`);
  };

  const handleCancel = (res) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      alert(`Reservation for ${res.date} cancelled (mock only).`);
    }
  };

  return (
    <CustomerLayout>
      <div className="cc-res-page">
        <div className="cc-res-header-row">
          <div>
            <h1 className="cc-page-title">Reservations</h1>
            <p className="cc-page-subtitle">
              Manage your table reservations.
            </p>
          </div>
          <button
            type="button"
            className="cc-res-new-btn"
            onClick={handleNewReservation}
          >
            <span className="cc-res-new-icon">📅</span>
            <span>New Reservation</span>
          </button>
        </div>

        <section className="cc-res-section">
          <h2 className="cc-res-section-title">Upcoming Reservations</h2>
          <div className="cc-res-grid">
            {upcomingReservations.map((res) => (
              <article key={res.id} className="cc-card cc-res-card">
                <div className="cc-res-card-top">
                  <div className="cc-res-date-row">
                    <div className="cc-res-date-icon">📅</div>
                    <div>
                      <div className="cc-res-date-text">{res.date}</div>
                    </div>
                  </div>

                  <span
                    className={`cc-pill ${
                      res.status === "Confirmed"
                        ? "cc-pill-success"
                        : "cc-pill-warning"
                    }`}
                  >
                    {res.status}
                  </span>
                </div>

                <ul className="cc-res-details">
                  <li>
                    <span className="cc-res-detail-icon">⏰</span>
                    <span>{res.time}</span>
                  </li>
                  <li>
                    <span className="cc-res-detail-icon">👥</span>
                    <span>{res.guests} guests</span>
                  </li>
                  <li>
                    <span className="cc-res-detail-icon">📍</span>
                    <span>{res.table}</span>
                  </li>
                </ul>

                {res.note && (
                  <div className="cc-res-note-row">
                    <span className="cc-res-note-label">Note:</span>
                    <span className="cc-res-note-text">{res.note}</span>
                  </div>
                )}

                <div className="cc-res-actions">
                  <button
                    type="button"
                    className="cc-res-action-btn"
                    onClick={() => handleEdit(res)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="cc-res-action-btn cc-res-action-btn-danger"
                    onClick={() => handleCancel(res)}
                  >
                    Cancel
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cc-res-section">
          <h2 className="cc-res-section-title">Past Reservations</h2>
          <div className="cc-res-grid">
            {pastReservations.map((res) => (
              <article
                key={res.id}
                className="cc-card cc-res-card cc-res-card-muted"
              >
                <div className="cc-res-card-top">
                  <div className="cc-res-date-row">
                    <div className="cc-res-date-icon cc-res-date-icon-muted">
                      📅
                    </div>
                    <div>
                      <div className="cc-res-date-text">{res.date}</div>
                    </div>
                  </div>

                  <span className="cc-pill cc-pill-muted">
                    {res.status}
                  </span>
                </div>

                <ul className="cc-res-details cc-res-details-muted">
                  <li>
                    <span className="cc-res-detail-icon">⏰</span>
                    <span>{res.time}</span>
                  </li>
                  <li>
                    <span className="cc-res-detail-icon">👥</span>
                    <span>{res.guests} guests</span>
                  </li>
                  <li>
                    <span className="cc-res-detail-icon">📍</span>
                    <span>{res.table}</span>
                  </li>
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </CustomerLayout>
  );
}

export default CustomerReservations;
