// src/Yubi/Reservations/CustomerReservations.js
import React, { useState } from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import "./CustomerReservations.css";

const INITIAL_UPCOMING = [
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

const INITIAL_PAST = [
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
  const [upcomingReservations, setUpcomingReservations] =
    useState(INITIAL_UPCOMING);
  const [pastReservations] = useState(INITIAL_PAST);

  // modal state
  const [modalMode, setModalMode] = useState(null); // "new" | "edit" | "cancel" | null
  const [activeReservation, setActiveReservation] = useState(null);

  const [form, setForm] = useState({
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });

  // ---------- open / close helpers ----------
  const openNewReservation = () => {
    setModalMode("new");
    setActiveReservation(null);
    setForm({
      date: "",
      time: "",
      guests: "2",
      notes: "",
    });
  };

  const openEditReservation = (res) => {
    setModalMode("edit");
    setActiveReservation(res);
    setForm({
      date: res.date || "",
      time: res.time || "",
      guests: String(res.guests || "2"),
      notes: res.note || "",
    });
  };

  const openCancelReservation = (res) => {
    setModalMode("cancel");
    setActiveReservation(res);
  };

  const closeModal = () => {
    setModalMode(null);
    setActiveReservation(null);
  };

  // ---------- form handlers ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    const newRes = {
      id: Date.now(),
      date: form.date || "New date",
      time: form.time || "Time",
      guests: Number(form.guests) || 2,
      table: "TBD",
      status: "Pending",
      note: form.notes,
    };
    setUpcomingReservations((prev) => [...prev, newRes]);
    closeModal();
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (!activeReservation) return;

    setUpcomingReservations((prev) =>
      prev.map((res) =>
        res.id === activeReservation.id
          ? {
              ...res,
              date: form.date,
              time: form.time,
              guests: Number(form.guests) || 2,
              note: form.notes,
            }
          : res
      )
    );
    closeModal();
  };

  const handleConfirmCancel = () => {
    if (!activeReservation) return;
    setUpcomingReservations((prev) =>
      prev.filter((res) => res.id !== activeReservation.id)
    );
    closeModal();
  };

  // ---------- modal render helpers ----------
  const renderReservationFormModal = () => {
    if (modalMode !== "new" && modalMode !== "edit") return null;
    const isEdit = modalMode === "edit";

    return (
      <div className="cc-modal-overlay">
        <div className="cc-modal">
          <div className="cc-modal-header">
            <div>
              <h2 className="cc-modal-title">
                {isEdit ? "Edit Reservation" : "New Reservation"}
              </h2>
              <p className="cc-modal-subtitle">
                {isEdit
                  ? "Update your reservation details"
                  : "Book a table at Code & Cuisine"}
              </p>
            </div>
            <button
              type="button"
              className="cc-modal-close"
              onClick={closeModal}
            >
              ×
            </button>
          </div>

          <form
            className="cc-modal-form"
            onSubmit={isEdit ? handleSubmitEdit : handleSubmitNew}
          >
            {/* Date */}
            <label className="cc-field">
              <span className="cc-field-label">Date</span>
              <input
                type="text"
                name="date"
                placeholder="mm/dd/yyyy"
                className="cc-input"
                value={form.date}
                onChange={handleChange}
                required
              />
            </label>

            {/* Time */}
            <label className="cc-field">
              <span className="cc-field-label">Time</span>
              <select
                name="time"
                className="cc-input"
                value={form.time}
                onChange={handleChange}
                required
              >
                <option value="">Select time</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="5:30 PM">5:30 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="6:30 PM">6:30 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="7:30 PM">7:30 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="8:30 PM">8:30 PM</option>
                <option value="9:00 PM">9:00 PM</option>
              </select>
            </label>

            {/* Guests */}
            <label className="cc-field">
              <span className="cc-field-label">Number of Guests</span>
              <select
                name="guests"
                className="cc-input"
                value={form.guests}
                onChange={handleChange}
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </label>

            {/* Notes */}
            <label className="cc-field">
              <span className="cc-field-label">
                Special Requests (Optional)
              </span>
              <textarea
                name="notes"
                rows={4}
                className="cc-input cc-input-textarea"
                placeholder="Any dietary restrictions, special occasions, seating preferences..."
                value={form.notes}
                onChange={handleChange}
              />
            </label>

            <div className="cc-modal-footer">
              <button
                type="button"
                className="cc-btn cc-btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button type="submit" className="cc-btn cc-btn-primary">
                {isEdit ? "Update Reservation" : "Book Table"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderCancelModal = () => {
    if (modalMode !== "cancel" || !activeReservation) return null;

    return (
      <div className="cc-modal-overlay">
        <div className="cc-modal cc-modal-small">
          <div className="cc-modal-header">
            <div>
              <h2 className="cc-modal-title">Cancel Reservation</h2>
              <p className="cc-modal-subtitle">
                Are you sure you want to cancel this reservation? This action
                cannot be undone.
              </p>
            </div>
          </div>

          <div className="cc-modal-res-summary">
            <div>{activeReservation.date}</div>
            <div>
              {activeReservation.time} · {activeReservation.guests} guests ·{" "}
              {activeReservation.table}
            </div>
          </div>

          <div className="cc-modal-footer">
            <button
              type="button"
              className="cc-btn cc-btn-secondary"
              onClick={closeModal}
            >
              Keep Reservation
            </button>
            <button
              type="button"
              className="cc-btn cc-btn-danger"
              onClick={handleConfirmCancel}
            >
              Cancel Reservation
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ---------- main render ----------
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
            onClick={openNewReservation}
          >
            <span className="cc-res-new-icon">📅</span>
            <span>New Reservation</span>
          </button>
        </div>

        {/* Upcoming */}
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
                    onClick={() => openEditReservation(res)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="cc-res-action-btn cc-res-action-btn-danger"
                    onClick={() => openCancelReservation(res)}
                  >
                    Cancel
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Past */}
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

      {/* Modals */}
      {renderReservationFormModal()}
      {renderCancelModal()}
    </CustomerLayout>
  );
}

export default CustomerReservations;
