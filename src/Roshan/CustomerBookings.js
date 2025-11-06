import React, { useState } from "react";
import "./ReceptionistDashboard.css";

export default function CustomerBookings() {
  const [bookings, setBookings] = useState([
    { id: 1, name: "John Smith", contact: "021 456 98724", date: "Oct 7", time: "7:30 PM", table: "Table 3", status: "Confirmed" },
    { id: 2, name: "Alice Brown", contact: "027 321 65425", date: "Oct 1", time: "1:00 PM", table: "Table 5", status: "Pending" },
    { id: 3, name: "David Clark", contact: "020 345 78926", date: "Oct 6", time: "6:45 PM", table: "Table 1", status: "Cancelled" },
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

  const filtered = bookings.filter(
    (b) =>
      (filter === "All" || b.status === filter) &&
      b.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newBooking.name || !newBooking.contact) return;
    setBookings([...bookings, { ...newBooking, id: Date.now() }]);
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

  const saveEdit = () => {
    setBookings((prev) =>
      prev.map((b) => (b.id === editBooking.id ? editBooking : b))
    );
    setEditBooking(null);
  };

  const handleDelete = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <section className="cb-bookings">
      <div className="cb-booking-header">
        <h2>Receptionist Bookings</h2>
        <div className="cb-search">
          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="cb-toprow">
        <div className="cb-summary">
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
              <th className="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editBooking && (
        <div className="cb-modal-backdrop">
          <div className="cb-modal">
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
        <div className="cb-modal-backdrop">
          <div className="cb-modal">
            <h2>New Booking</h2>
            <input
              placeholder="Name"
              value={newBooking.name}
              onChange={(e) =>
                setNewBooking({ ...newBooking, name: e.target.value })
              }
            />
            <input
              placeholder="Contact"
              value={newBooking.contact}
              onChange={(e) =>
                setNewBooking({ ...newBooking, contact: e.target.value })
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
