import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerReservationStatus.css";

function CustomerReservationStatus() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customerReservations")) || [];
    setReservations(stored);
  }, []);

  const handleExport = () => {
    const csv = [
      ["ID", "Date", "Time", "Guests", "Notes", "Status"],
      ...reservations.map((r) => [r.id, r.date, r.time, r.guests, r.notes, r.status]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Reservations.csv";
    a.click();
  };

  return (
    <div className="reservation-dashboard">
      <header className="reservation-header">
        <div>
          <h1>My Reservations</h1>
          <p>Manage and track all your restaurant bookings efficiently.</p>
        </div>
        <div className="header-buttons">
          <button onClick={handleExport} className="btn-secondary">📤 Export CSV</button>
          <button onClick={() => navigate("/customer/book")} className="btn-primary">➕ Book Table</button>
        </div>
      </header>

      <section className="summary-cards">
        <div className="summary-card total">
          <h3>Total</h3>
          <p>{reservations.length}</p>
        </div>
        <div className="summary-card pending">
          <h3>Pending</h3>
          <p>{reservations.filter((r) => r.status === "Pending").length}</p>
        </div>
        <div className="summary-card accepted">
          <h3>Accepted</h3>
          <p>{reservations.filter((r) => r.status === "Accepted").length}</p>
        </div>
        <div className="summary-card rejected">
          <h3>Rejected</h3>
          <p>{reservations.filter((r) => r.status === "Rejected").length}</p>
        </div>
      </section>

      <section className="reservation-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Notes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty">
                  No reservations found. Try booking a new table!
                </td>
              </tr>
            ) : (
              reservations.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.date}</td>
                  <td>{r.time}</td>
                  <td>{r.guests}</td>
                  <td>{r.notes}</td>
                  <td>
                    <span className={`status ${r.status?.toLowerCase()}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default CustomerReservationStatus;
