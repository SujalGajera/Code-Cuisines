// Customer Booking Management
// Fully functional Add / Edit / Delete / Search / Filter
// Author: Roshan Dhakal — Red Theme Edition

import React, { useState } from "react";
import "./ReceptionistDashboard.css";

export default function CustomerBookings() {
  const [bookings, setBookings] = useState([
    { id: 1, name: "John Smith", contact: "021 456 98724", date: "Oct 7", time: "7:30 PM", table: "Table 3", status: "Confirmed" },
    { id: 2, name: "Alice Brown", contact: "027 321 65425", date: "Oct 1", time: "1:00 PM", table: "Table 5", status: "Pending" },
    { id: 3, name: "David Clark", contact: "020 345 78926", date: "Oct 6", time: "6:45 PM", table: "Table 1", status: "Cancelled" },
    { id: 4, name: "Maria Lopez", contact: "029 876 54326", date: "Oct 8", time: "8:00 PM", table: "Table 7", status: "Confirmed" },
  ]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editBooking, setEditBooking] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newBooking, setNewBooking] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
    table: "Table 1",
    status: "Pending",
  });

  // Derived list with live search + filter
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.contact.toLowerCase().includes(search.toLowerCase()) ||
      b.table.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || b.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Add new booking
  const handleAdd = () => {
    if (!newBooking.name || !newBooking.contact) return;
    setBookings([{ ...newBooking, id: Date.now() }, ...bookings]);
    setShowAdd(false);
    setNewBooking({
      name: "",
      contact: "",
      date: "",
      time: "",
      table: "Table 1",
      status: "Pending",
    });
  };

  // Save edited booking
  const saveEdit = () => {
    setBookings((prev) =>
      prev.map((b) => (b.id === editBooking.id ? editBooking : b))
    );
    setEditBooking(null);
  };

  // Delete booking
  const handleDelete = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <section className="cb-bookings fade-in">
      {/* Header with search */}
      <div className="cb-booking-header">
        <h2>Customer Booking</h2>
        <div className="cb-search">
          <input
            type="text"
            placeholder="🔍 Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Summary + Filter */}
      <div className="cb-toprow">
        <div className="cb-summary slide-up">
          <h3>Booking Summary</h3>
          <div className="cb-summary-kv">
            <strong>Total</strong> <span>{bookings.length}</span>
          </div>
          <div className="cb-summary-kv">
            <strong>Pending</strong>{" "}
            <span>{bookings.filter((b) => b.status === "Pending").length}</span>
          </div>
          <div className="cb-summary-kv">
            <strong>Confirmed</strong>{" "}
            <span>{bookings.filter((b) => b.status === "Confirmed").length}</span>
          </div>
          <div className="cb-summary-kv">
            <strong>Cancelled</strong>{" "}
            <span>{bookings.filter((b) => b.status === "Cancelled").length}</span>
          </div>
        </div>

        <div className="cb-top-actions">
          <button className="cb-add" onClick={() => setShowAdd(true)}>
            + Add New Booking
          </button>
          <div className="cb-filterbar">
            <label>Filter by Status:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>All</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Booking Table */}
      <div className="cb-tablecard slide-up">
        <table className="cb-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Date</th>
              <th>Time</th>
              <th>Table</th>
              <th>Status</th>
              <th className="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.contact}</td>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                  <td>{b.table}</td>
                  <td>
                    <span className={`cb-badge ${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="right">
                    <button className="cb-link" onClick={() => setEditBooking(b)}>
                      Edit
                    </button>
                    <button
                      className="cb-link danger"
                      onClick={() => handleDelete(b.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", color: "#777" }}>
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editBooking && (
        <div className="cb-modal-backdrop fade-in">
          <div className="cb-modal slide-up">
            <h2>Edit Booking</h2>
            <input
              value={editBooking.name}
              onChange={(e) =>
                setEditBooking({ ...editBooking, name: e.target.value })
              }
            />
            <select
              value={editBooking.status}
              onChange={(e) =>
                setEditBooking({ ...editBooking, status: e.target.value })
              }
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>
            <div className="cb-modal-actions">
              <button className="cb-btn primary" onClick={saveEdit}>
                Save
              </button>
              <button className="cb-btn" onClick={() => setEditBooking(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div className="cb-modal-backdrop fade-in">
          <div className="cb-modal slide-up">
            <h2>New Booking</h2>
            <input
              placeholder="Customer Name"
              value={newBooking.name}
              onChange={(e) =>
                setNewBooking({ ...newBooking, name: e.target.value })
              }
            />
            <input
              placeholder="Contact Number"
              value={newBooking.contact}
              onChange={(e) =>
                setNewBooking({ ...newBooking, contact: e.target.value })
              }
            />
            <input
              placeholder="Date"
              value={newBooking.date}
              onChange={(e) =>
                setNewBooking({ ...newBooking, date: e.target.value })
              }
            />
            <input
              placeholder="Time"
              value={newBooking.time}
              onChange={(e) =>
                setNewBooking({ ...newBooking, time: e.target.value })
              }
            />
            <div className="cb-modal-actions">
              <button className="cb-btn primary" onClick={handleAdd}>
                Create
              </button>
              <button className="cb-btn" onClick={() => setShowAdd(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
