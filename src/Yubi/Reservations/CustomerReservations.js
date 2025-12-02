// src/Yubi/Reservations/CustomerReservations.js
import React, { useState, useEffect } from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import "./CustomerReservations.css";

import { auth, db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

function CustomerReservations() {
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);

  const [customerUid, setCustomerUid] = useState(null);
  const [loading, setLoading] = useState(true);

  // modal state
  const [modalMode, setModalMode] = useState(null); // "new" | "edit" | "cancel" | null
  const [activeReservation, setActiveReservation] = useState(null);

  const [form, setForm] = useState({
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });

  // ---------- load reservations from top-level collection ----------
  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCustomerUid(user.uid);
        setLoading(false);

        // 🔹 Real-time listener for reservations collection filtered by userId
        const q = query(
          collection(db, "reservations"),
          where("userId", "==", user.uid)
        );

        const unsubSnapshot = onSnapshot(q, (snapshot) => {
          const all = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));

          setUpcomingReservations(all.filter((r) => r.status !== "Completed"));
          setPastReservations(all.filter((r) => r.status === "Completed"));
        });

        return () => unsubSnapshot();
      } else {
        setLoading(false);
        console.warn("No logged-in customer");
      }
    });

    return () => unsubAuth();
  }, []);

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

  const handleSubmitNew = async (e) => {
    e.preventDefault();
    if (!customerUid) {
      alert("No logged-in customer found.");
      return;
    }

    try {
      // Try to get customer details from users collection, but don't fail if it doesn't exist
      let userName = "Customer";
      let userEmail = "";
      let userPhone = "";

      try {
        const userDoc = await getDoc(doc(db, "users", customerUid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          userName = userData?.name || auth.currentUser?.displayName || "Customer";
          userEmail = userData?.email || auth.currentUser?.email || "";
          userPhone = userData?.phone || "";
        } else {
          // Use auth data if Firestore document doesn't exist
          userName = auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || "Customer";
          userEmail = auth.currentUser?.email || "";
        }
      } catch (error) {
        console.warn("Could not fetch user document, using auth data:", error);
        userName = auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || "Customer";
        userEmail = auth.currentUser?.email || "";
      }

      const newResData = {
        userId: customerUid,
        userName: userName,
        userEmail: userEmail,
        userPhone: userPhone,
        date: form.date || "New date",
        time: form.time || "Time",
        guests: Number(form.guests) || 2,
        table: "TBD",
        status: "Pending",
        note: form.notes || "",
        createdAt: serverTimestamp(),
      };

      // 🔹 addDoc into top-level reservations collection
      await addDoc(collection(db, "reservations"), newResData);
      // Real-time listener will update the UI automatically

      closeModal();
      alert("Reservation created successfully!");
    } catch (err) {
      console.error("Error creating reservation:", err);
      alert("Could not create reservation. Please try again.");
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!activeReservation || !customerUid) return;

    try {
      const ref = doc(db, "reservations", activeReservation.id);

      await updateDoc(ref, {
        date: form.date,
        time: form.time,
        guests: Number(form.guests) || 2,
        note: form.notes || "",
      });
      // Real-time listener will update UI automatically

      closeModal();
      alert("Reservation updated successfully!");
    } catch (err) {
      console.error("Error updating reservation:", err);
      alert("Could not update reservation. Please try again.");
    }
  };

  const handleConfirmCancel = async () => {
    if (!activeReservation || !customerUid) return;

    try {
      const ref = doc(db, "reservations", activeReservation.id);
      await deleteDoc(ref);
      // Real-time listener will update UI automatically

      closeModal();
      alert("Reservation cancelled successfully.");
    } catch (err) {
      console.error("Error cancelling reservation:", err);
      alert("Could not cancel reservation. Please try again.");
    }
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
                type="date"
                name="date"
                placeholder="mm/dd/yyyy"
                className="cc-input"
                value={form.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}   // 🔥 BLOCK PAST DATES
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
  if (loading) {
    return (
      <CustomerLayout>
        <div className="cc-res-page">
          <p>Loading your reservations...</p>
        </div>
      </CustomerLayout>
    );
  }

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
            {upcomingReservations.length === 0 && (
              <p className="cc-empty-state">No upcoming reservations yet.</p>
            )}
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
                    className={`cc-pill ${res.status === "Confirmed"
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
            {pastReservations.length === 0 && (
              <p className="cc-empty-state">No past reservations yet.</p>
            )}
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










