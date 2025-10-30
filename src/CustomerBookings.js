import React, { useState } from "react";
import "./CustomerBookings.css";

const logo = process.env.PUBLIC_URL + "/restaurant-image.png";

export default function CustomerBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  // Add Booking modal state
  const [showAdd, setShowAdd] = useState(false);
  const [addError, setAddError] = useState("");

  const [addData, setAddData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    date: "",
    time: "",
    table: "Table 1",
    status: "Pending",
  });

  const [bookings, setBookings] = useState([
    { id: 1, name: "John Smith",  contact: "021 456 98724", date: "Oct 7",  time: "7:30 PM", table: "Table 3", status: "Confirmed" },
    { id: 2, name: "Alice Brown", contact: "027 321 65425", date: "Oct 1",  time: "1:00 PM", table: "Table 5", status: "Pending"   },
    { id: 3, name: "David Clark",  contact: "020 345 78926", date: "Oct 6",  time: "6:45 PM", table: "Table 1", status: "Cancelled" },
    { id: 4, name: "Maria Lopez",  contact: "029 876 54326", date: "Oct 8",  time: "8:00 PM", table: "Table 7", status: "Confirmed" },
    { id: 5, name: "Sophia Lee",   contact: "027 123 8902",  date: "Oct 12", time: "12:30 PM", table: "Table 2", status: "Pending"   },
  ]);

  // Derived list
  const filtered = bookings.filter((b) =>
    (filterStatus === "All" || b.status === filterStatus) &&
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ── Edit booking save ───────────────────────────────────────────────
  const handleSaveEdit = () => {
    setBookings((prev) => prev.map((b) => (b.id === selectedBooking.id ? selectedBooking : b)));
    setSelectedBooking(null);
  };

  // 👉 NEW: Delete booking
  const handleDelete = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    if (selectedBooking && selectedBooking.id === id) setSelectedBooking(null);
  };

  // ── Open Add modal ──────────────────────────────────────────────────
  const openAdd = () => {
    setAddData({
      firstName: "",
      lastName: "",
      phone: "",
      date: "",
      time: "",
      table: "Table 1",
      status: "Pending",
    });
    setAddError("");
    setShowAdd(true);
  };

  // Helpers to display date/time in same text style as seed data
  const formatDateToMonDay = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate + "T00:00:00");
    const mon = d.toLocaleString("en-US", { month: "short" });
    const day = d.getDate();
    return `${mon} ${day}`;
  };
  const formatTimeTo12h = (hhmm) => {
    if (!hhmm) return "";
    const [h, m] = hhmm.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  // ── Save new booking ────────────────────────────────────────────────
  const saveAdd = () => {
    const { firstName, lastName, phone, date, time, table, status } = addData;

    if (!firstName || !lastName || !phone || !date || !time || !table) {
      setAddError("Please fill in all required fields.");
      return;
    }
    const digits = phone.replace(/[^\d]/g, "");
    if (!(digits.length >= 8 && digits.length <= 14 && phone.trim().startsWith("0"))) {
      setAddError("Enter a valid phone number (start with 0, 8–14 digits).");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: `${firstName.trim()} ${lastName.trim()}`.trim(),
      contact: phone.trim(),
      date: formatDateToMonDay(date),
      time: formatTimeTo12h(time),
      table,
      status,
    };

    setBookings((prev) => [newItem, ...prev]);
    setShowAdd(false);
    setAddError("");
  };

  return (
    <div className="cb-page">
      {/* Brand Header */}
      <header className="cb-brandbar">
        <div className="cb-brand-left">
          <img src={logo} alt="Code & Cuisine Logo" className="cb-logo" />
          <span className="cb-title">Customer Booking</span>
        </div>
        <div className="cb-brand-right">
          <div className="cb-search">
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" fill="none" strokeWidth="2" stroke="currentColor" />
            </svg>
          </div>
          <span className="cb-pill">🔔 Notifications</span>
          <span className="cb-pill">👩‍💼 Receptionist</span>
        </div>
      </header>

      {/* Top Row */}
      <div className="cb-toprow">
        <div className="cb-summary">
          <h3>Booking Summary</h3>
          <div className="cb-summary-kv"><span>Total</span><strong>{bookings.length}</strong></div>
          <div className="cb-summary-kv"><span>Pending</span><strong>{bookings.filter(b=>b.status==='Pending').length}</strong></div>
          <div className="cb-summary-kv"><span>Confirmed</span><strong>{bookings.filter(b=>b.status==='Confirmed').length}</strong></div>
          <div className="cb-summary-kv"><span>Cancelled</span><strong>{bookings.filter(b=>b.status==='Cancelled').length}</strong></div>
        </div>

        <div className="cb-top-actions">
          <button className="cb-add" onClick={openAdd}>+ Add New Booking</button>

          {/* Filter Section */}
          <div className="cb-filterbar">
            <label>Filter by Status:</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option>All</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
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
            {filtered.map((b) => (
              <tr key={b.id}>
                <td>
                  <button className="cb-name" onClick={() => setSelectedBooking(b)}>{b.name}</button>
                </td>
                <td className="muted">{b.contact}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>{b.table}</td>
                <td><span className={`cb-badge ${b.status.toLowerCase()}`}>{b.status}</span></td>
                <td className="right">
                  <button className="cb-link" onClick={() => setSelectedBooking(b)}>✏️ Edit</button>
                  {/* 👉 NEW: delete hooked up */}
                  <button className="cb-link danger" onClick={() => handleDelete(b.id)}>🗑 Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td className="empty" colSpan={7}>No results match your filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {selectedBooking && (
        <div className="cb-modal-backdrop">
          <div className="cb-modal">
            <h2>Edit Booking</h2>

            <label>Name</label>
            <input
              type="text"
              value={selectedBooking.name}
              onChange={(e) => setSelectedBooking({ ...selectedBooking, name: e.target.value })}
            />
            <label>Date</label>
            <input
              type="text"
              value={selectedBooking.date}
              onChange={(e) => setSelectedBooking({ ...selectedBooking, date: e.target.value })}
            />
            <label>Time</label>
            <input
              type="text"
              value={selectedBooking.time}
              onChange={(e) => setSelectedBooking({ ...selectedBooking, time: e.target.value })}
            />
            <label>Status</label>
            <select
              value={selectedBooking.status}
              onChange={(e) => setSelectedBooking({ ...selectedBooking, status: e.target.value })}
            >
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>

            <div className="cb-modal-actions">
              <button className="cb-btn primary" onClick={handleSaveEdit}>Save</button>
              <button className="cb-btn" onClick={() => setSelectedBooking(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Booking Modal */}
      {showAdd && (
        <div className="cb-modal-backdrop">
          <div className="cb-modal">
            <h2>New Booking</h2>

            {addError && <div className="cb-error">{addError}</div>}

            <div className="cb-form-grid">
              <div className="field">
                <label>First Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Roshan"
                  value={addData.firstName}
                  onChange={(e) => setAddData({ ...addData, firstName: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Last Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Dhakal"
                  value={addData.lastName}
                  onChange={(e) => setAddData({ ...addData, lastName: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. 021 456 98724"
                  value={addData.phone}
                  onChange={(e) => setAddData({ ...addData, phone: e.target.value })}
                />
                <small className="hint">Start with 0, digits only (spaces allowed).</small>
              </div>

              <div className="field">
                <label>Date *</label>
                <input
                  type="date"
                  value={addData.date}
                  onChange={(e) => setAddData({ ...addData, date: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Time *</label>
                <input
                  type="time"
                  value={addData.time}
                  onChange={(e) => setAddData({ ...addData, time: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Table *</label>
                <select
                  value={addData.table}
                  onChange={(e) => setAddData({ ...addData, table: e.target.value })}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i} value={`Table ${i + 1}`}>{`Table ${i + 1}`}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Status</label>
                <select
                  value={addData.status}
                  onChange={(e) => setAddData({ ...addData, status: e.target.value })}
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>

            <div className="cb-modal-actions">
              <button className="cb-btn primary" onClick={saveAdd}>Create</button>
              <button className="cb-btn" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
