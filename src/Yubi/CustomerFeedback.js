import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CustomerFeedback.css";

function CustomerFeedback() {
  const navigate = useNavigate();
  const location = useLocation();
  const reservation = location.state || {};

  const [feedbackList, setFeedbackList] = useState([]);
  const [formData, setFormData] = useState({
    reservationId: reservation.id || "",
    date: reservation.date || "",
    rating: 0,
    comment: "",
  });
  const [toast, setToast] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customerFeedback")) || [];
    setFeedbackList(stored);
  }, []);

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert("Please select a rating before submitting!");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      ...formData,
      dateSubmitted: new Date().toLocaleString(),
    };
    const updated = [...feedbackList, newFeedback];
    setFeedbackList(updated);
    localStorage.setItem("customerFeedback", JSON.stringify(updated));

    setToast("✅ Thank you! Your feedback has been submitted.");
    setTimeout(() => setToast(""), 3000);

    setFormData({
      reservationId: "",
      date: "",
      rating: 0,
      comment: "",
    });
  };

  const averageRating =
    feedbackList.length > 0
      ? (
          feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length
        ).toFixed(1)
      : 0;

  return (
    <div className="cd-dashboard">
      <aside className="cd-sidebar">
        <div className="cd-logo-box">
          <img
            src="/images/code-cuisines-logo.png"
            alt="Code & Cuisine Logo"
            className="cd-logo"
          />
        </div>

        <nav className="cd-nav">
          <a className="cd-nav-item" onClick={() => navigate("/customer/dashboard")}>
            🏠 Dashboard
          </a>
          <a className="cd-nav-item" onClick={() => navigate("/customer/reservations")}>
            📅 Reservations
          </a>
          <a className="cd-nav-item active" onClick={() => navigate("/customer/feedback")}>
            ⭐ Feedback
          </a>
        </nav>

        <button
          className="cd-logout"
          onClick={() => {
            localStorage.removeItem("currentCustomer");
            navigate("/customer/login");
          }}
        >
          ⟲ Logout
        </button>
      </aside>

      <main className="cd-main">
        <header className="cd-header">
          <h1>Customer Feedback</h1>
          <p>Rate your dining experience at Code & Cuisine</p>
        </header>

        <section className="cd-card cd-summary-card">
          <div>
            <h2>
              ⭐ Average Rating:{" "}
              <span className="avg-rating">{averageRating}</span> / 5
            </h2>
            <p>
              Based on <strong>{feedbackList.length}</strong>{" "}
              {feedbackList.length === 1 ? "feedback" : "feedbacks"}
            </p>
          </div>
        </section>

        <section className="cd-card cd-feedback-form">
          <h3>📝 Leave Feedback</h3>
          <form onSubmit={handleSubmit}>
            {reservation.date && (
              <p>
                Reservation Date: <b>{reservation.date}</b>
              </p>
            )}

            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${formData.rating >= star ? "filled" : ""}`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              placeholder="Write your feedback..."
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              required
            ></textarea>

            <button type="submit" className="cd-btn-primary">
              Submit Feedback
            </button>
          </form>
        </section>

        <section className="cd-card cd-feedback-history">
          <h3>📜 My Feedback History</h3>
          {feedbackList.length === 0 ? (
            <p>No feedback given yet.</p>
          ) : (
            <ul>
              {feedbackList.map((fb) => (
                <li key={fb.id}>
                  <div className="feedback-header">
                    <strong>⭐ {fb.rating}/5</strong> — {fb.date || "N/A"}
                  </div>
                  <p>{fb.comment}</p>
                  <small>
                    Submitted on: <i>{fb.dateSubmitted}</i>
                  </small>
                </li>
              ))}
            </ul>
          )}
        </section>

        <button
          className="cd-btn-secondary"
          style={{ marginTop: "1rem" }}
          onClick={() => navigate("/customer/reservations")}
        >
          ← Back to Reservations
        </button>

        {toast && <div className="cd-toast">{toast}</div>}
      </main>
    </div>
  );
}

export default CustomerFeedback;
