import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CustomerReservationStatus.css";

function CustomerReservationStatus() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    date: "",
    time: "",
    guests: "",
    notes: "",
    status: "Pending",
  });

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

  const handleDelete = (id) => {
    const updated = reservations.filter((r) => r.id !== id);
    setReservations(updated);
    localStorage.setItem("customerReservations", JSON.stringify(updated));
  };

  const handleEdit = (id) => {
    const reservation = reservations.find((r) => r.id === id);
    if (reservation) {
      setEditingId(id);
      setEditData({ ...reservation });
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    const updated = reservations.map((r) =>
      r.id === editingId ? { ...r, ...editData } : r
    );
    setReservations(updated);
    localStorage.setItem("customerReservations", JSON.stringify(updated));
    setEditingId(null);
    setEditData({
      date: "",
      time: "",
      guests: "",
      notes: "",
      status: "Pending",
    });
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty">
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
                  <td>
                    <button onClick={() => handleEdit(r.id)} className="btn-edit">✏️ Edit</button>
                    <button onClick={() => handleDelete(r.id)} className="btn-delete">🗑️ Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {editingId && (
        <section className="edit-form">
          <h2>Edit Reservation</h2>
          <label>
            Date:
            <input type="date" name="date" value={editData.date} onChange={handleEditChange} />
          </label>
          <label>
            Time:
            <input type="time" name="time" value={editData.time} onChange={handleEditChange} />
          </label>
          <label>
            Guests:
            <input type="number" name="guests" value={editData.guests} onChange={handleEditChange} />
          </label>
          <label>
            Notes:
            <input type="text" name="notes" value={editData.notes} onChange={handleEditChange} />
          </label>
          <label>
            Status:
            <select name="status" value={editData.status} onChange={handleEditChange}>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>
          <button onClick={handleEditSave} className="btn-primary">💾 Save Changes</button>
        </section>
      )}

      <div className="back-btn-container">
        <button className="back-btn" onClick={() => navigate("/customer/dashboard")}>
          ⟲ Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default CustomerReservationStatus;
