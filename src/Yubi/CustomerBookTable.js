import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerBookTable.css";

function CustomerBookTable() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    notes: "",
  });

  const [toast, setToast] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time || !formData.guests) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }

    // ✅ Build new reservation object
    const newReservation = {
      id: Date.now(),
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      notes: formData.notes || "—",
      status: "Pending",
    };

    try {
      // ✅ Get current data
      const existing = JSON.parse(localStorage.getItem("customerReservations")) || [];

      // ✅ Add new one
      existing.push(newReservation);

      // ✅ Save back
      localStorage.setItem("customerReservations", JSON.stringify(existing));

      // ✅ Show confirmation
      setToast("✅ Reservation booked successfully!");
      setTimeout(() => {
        setToast("");
        navigate("/customer/reservations");
      }, 1800);
    } catch (err) {
      console.error("Error saving reservation:", err);
      alert("Something went wrong while booking! Please try again.");
    }
  };

  return (
    <div className="booktable-container">
      <div className="booktable-card">
        <h1>📅 Book a Table</h1>
        <p>Reserve your spot at <strong>Code & Cuisine</strong> in seconds!</p>

        <form className="booktable-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time *</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Guests *</label>
            <input
              type="number"
              name="guests"
              min="1"
              max="20"
              value={formData.guests}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full">
            <label>Special Notes</label>
            <textarea
              name="notes"
              placeholder="Any preferences or requests?"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              💾 Confirm Booking
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/customer/reservations")}
            >
              ← Back to Reservations
            </button>
          </div>
        </form>

        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
}

export default CustomerBookTable;
