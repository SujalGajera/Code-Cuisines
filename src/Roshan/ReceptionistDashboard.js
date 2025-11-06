// Author: Roshan Dhakal
// Date: November 2025
// Description: Receptionist Dashboard (clean UI + improved row click + editable fields + auto date)

// Import React + CSS
import React, { useMemo, useState, useEffect } from "react";
import "./ReceptionistDashboard.css";

export default function ReceptionistDashboard() {

  // Search + Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Load bookings from LocalStorage
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "John Smith", contact: "021 456 98724", date: "Oct 7", time: "7:30 PM", table: "Table 3", status: "Confirmed" },
          { id: 2, name: "Alice Brown", contact: "027 321 65425", date: "Oct 1", time: "1:00 PM", table: "Table 5", status: "Pending" },
          { id: 3, name: "David Clark", contact: "020 345 78926", date: "Oct 6", time: "6:45 PM", table: "Table 1", status: "Cancelled" },
          { id: 4, name: "Maria Lopez", contact: "029 876 54326", date: "Oct 8", time: "8:00 PM", table: "Table 7", status: "Confirmed" },
        ];
  });

  // Save bookings to LocalStorage
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Modal control
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    contact: "",
    date: "",
    time: "",
    table: "",
    status: "Pending",
  });

  // Auto date for header
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Search + filter logic
  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return bookings.filter(
      (b) =>
        (filterStatus === "All" || b.status === filterStatus) &&
        (b.name.toLowerCase().includes(q) ||
          b.contact.toLowerCase().includes(q) ||
          b.table.toLowerCase().includes(q))
    );
  }, [searchTerm, filterStatus, bookings]);

  // Add new booking
  const openAdd = () => {
    setIsEditing(false);
    setFormData({
      id: null,
      name: "",
      contact: "",
      date: "",
      time: "",
      table: "",
      status: "Pending",
    });
    setShowModal(true);
  };

  // Edit booking
  const openEdit = (b) => {
    setIsEditing(true);
    setFormData({ ...b });
    setShowModal(true);
  };

  // Save booking
  const saveBooking = () => {
    if (!formData.name || !formData.contact || !formData.date || !formData.time || !formData.table) {
      alert("Please fill all fields");
      return;
    }

    if (isEditing) {
      setBookings((prev) =>
        prev.map((x) => (x.id === formData.id ? formData : x))
      );
    } else {
      setBookings((prev) => [{ ...formData, id: Date.now() }, ...prev]);
    }

    setShowModal(false);
  };

  // Delete booking
  const deleteBooking = (id) => {
    if (window.confirm("Delete this booking?")) {
      setBookings((prev) => prev.filter((x) => x.id !== id));
    }
  };

  return (
    <div className="cb-page">

      {/* HEADER */}
      <header className="cb-brandbar">
        <div className="cb-brand-left">
          <span
            className="cb-title"
            onClick={() => window.location.reload()}
            style={{ cursor: "pointer" }}
          >
            Receptionist Dashboard
          </span>
        </div>

        <div className="cb-brand-right-row">
          <span className="cb-pill">📅 {formattedDate}</span>
          <span className="cb-pill">Roshan</span>
        </div>
      </header>

      {/* Tabs */}
      <div className="cb-tabs-row">
        <button className="cb-chip">👤 Profile</button>
        <button className="cb-chip cb-chip--active">🧾 Customer Booking</button>
        <button className="cb-chip">⏰ Shifts</button>
      </div>

      {/* Search + Filter + Add Booking */}
      <div className="cb-actionbar">

        <input
          type="text"
          className="cb-search"
          placeholder="Search bookings…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="cb-add" onClick={openAdd}>
          + Add New Booking
        </button>

        <div className="cb-filterbar">
          <label>Filter:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option>All</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="cb-tablecard">
        <table className="cb-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Date</th>
              <th>Time</th>
              <th>Table</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="cb-row">

                {/* Only cell click — NOT row click */}
                <td onClick={() => openEdit(b)}>{b.name}</td>
                <td onClick={() => openEdit(b)}>{b.contact}</td>
                <td onClick={() => openEdit(b)}>{b.date}</td>
                <td onClick={() => openEdit(b)}>{b.time}</td>
                <td onClick={() => openEdit(b)}>{b.table}</td>

                <td onClick={() => openEdit(b)}>
                  <span className={`cb-badge ${b.status.toLowerCase()}`}>{b.status}</span>
                </td>

                <td>
                  <div className="cb-actions-col">

                    <button
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(b);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBooking(b.id);
                      }}
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="cb-modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="cb-modal">
            <h2>{isEditing ? "Edit Booking" : "New Booking"}</h2>

            <input type="text" placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input type="text" placeholder="Contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />

            <input type="text" placeholder="Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />

            <input type="text" placeholder="Time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />

            <input type="text" placeholder="Table"
              value={formData.table}
              onChange={(e) => setFormData({ ...formData, table: e.target.value })}
            />

            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>

            <div className="cb-modal-actions">
              <button className="save-btn" onClick={saveBooking}>
                {isEditing ? "Save Changes" : "Create"}
              </button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
