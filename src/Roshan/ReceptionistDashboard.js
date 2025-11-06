// Author: Roshan Dhakal
// Date: November 2025
// Description: Receptionist Dashboard - Red Theme (Add + Edit + Delete + Search + Filter)

import React, { useState } from "react";
import "./ReceptionistDashboard.css";

export default function ReceptionistDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [bookings, setBookings] = useState([
    { id: 1, name: "John Smith", contact: "021 456 98724", date: "Oct 7", time: "7:30 PM", table: "Table 3", status: "Confirmed" },
    { id: 2, name: "Alice Brown", contact: "027 321 65425", date: "Oct 1", time: "1:00 PM", table: "Table 5", status: "Pending" },
    { id: 3, name: "David Clark", contact: "020 345 78926", date: "Oct 6", time: "6:45 PM", table: "Table 1", status: "Cancelled" },
    { id: 4, name: "Maria Lopez", contact: "029 876 54326", date: "Oct 8", time: "8:00 PM", table: "Table 7", status: "Confirmed" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    contact: "",
    date: "",
    time: "",
    table: "",
    status: "Pending",
  });

  // Filter + Search
  const filteredBookings = bookings.filter(
    (b) =>
      (filterStatus === "All" || b.status === filterStatus) &&
      b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Add New Booking
  const handleAddNew = () => {
    setFormData({ id: null, name: "", contact: "", date: "", time: "", table: "", status: "Pending" });
    setIsEditing(false);
    setShowModal(true);
  };

  // Handle Edit Booking
  const handleEdit = (booking) => {
    setFormData(booking);
    setIsEditing(true);
    setShowModal(true);
  };

  // Handle Save (Create or Update)
  const handleSave = () => {
    if (!formData.name || !formData.contact || !formData.date || !formData.time || !formData.table) {
      alert("Please fill all fields!");
      return;
    }

    if (isEditing) {
      setBookings((prev) => prev.map((b) => (b.id === formData.id ? formData : b)));
    } else {
      setBookings((prev) => [...prev, { ...formData, id: Date.now() }]);
    }

    setShowModal(false);
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="cb-page">
      {/* Header */}
      <header className="cb-brandbar">
        <div className="cb-brand-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1048/1048315.png"
            alt="logo"
            className="cb-logo"
          />
          <span className="cb-title">Receptionist Dashboard</span>
        </div>
        <div className="cb-brand-right">
          <div className="cb-pill">📅 Nov 6, 2025</div>
          <div className="cb-pill">Sarah Anderson</div>
        </div>
      </header>

      {/* Tabs */}
      <div className="cb-togglebar">
        <button className="cb-link">👤 Profile</button>
        <button className="cb-link active">📋 Customer Booking</button>
        <button className="cb-link">⏰ Shifts</button>
      </div>

      {/* Search + Add + Filter */}
      <div className="cb-actionbar">
        <input
          className="cb-search-white"
          type="text"
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="cb-add" onClick={handleAddNew}>
          + Add New Booking
        </button>
        <div className="cb-filterbar">
          <label>Filter by Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option>All</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Booking Table */}
      <div className="cb-tablecard">
        <table className="cb-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Contact</th>
              <th>Date</th>
              <th>Time</th>
              <th>Table</th>
              <th>Status</th>
              <th className="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>{b.contact}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>{b.table}</td>
                <td>
                  <span className={`cb-badge ${b.status.toLowerCase()}`}>{b.status}</span>
                </td>
                <td className="right">
                  <button className="cb-link edit" onClick={() => handleEdit(b)}>
                    Edit
                  </button>
                  <button className="cb-link danger" onClick={() => handleDelete(b.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "14px", color: "#888" }}>
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="cb-modal-backdrop">
          <div className="cb-modal">
            <h2>{isEditing ? "Edit Booking" : "New Booking"}</h2>

            <input
              type="text"
              placeholder="Customer Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
            <input
              type="text"
              placeholder="Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
            <input
              type="text"
              placeholder="Table"
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
              <button className="cb-btn primary" onClick={handleSave}>
                {isEditing ? "Save Changes" : "Create"}
              </button>
              <button className="cb-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
