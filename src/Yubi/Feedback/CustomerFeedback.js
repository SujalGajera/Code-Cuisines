// src/Yubi/Feedback/CustomerFeedback.js
import React, { useState } from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import "./CustomerFeedback.css";

const INITIAL_FEEDBACK = [
  {
    id: 1,
    rating: 5,
    message: "Amazing food and great service! Will definitely come back.",
    date: "Dec 8, 2025",
  },
  {
    id: 2,
    rating: 4,
    message: "Loved the ambiance and coffee. Little noisy but great overall.",
    date: "Dec 5, 2025",
  },
];

function Star({ filled, onClick }) {
  return (
    <span
      className={`cc-star ${filled ? "cc-star-filled" : ""}`}
      onClick={onClick}
    >
      ★
    </span>
  );
}

function CustomerFeedback() {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [list, setList] = useState(INITIAL_FEEDBACK);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !text.trim()) {
      alert("Please provide a rating and feedback message.");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      rating,
      message: text.trim(),
      date: new Date().toLocaleDateString("en-NZ", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setList((prev) => [newFeedback, ...prev]);
    setRating(0);
    setText("");
  };

  return (
    <CustomerLayout>
      <div className="cc-feedback-page">
        <header className="cc-feedback-header">
          <h1 className="cc-page-title">Feedback</h1>
          <p className="cc-page-subtitle">
            Share your experience with us – we&apos;d love to hear from you.
          </p>
        </header>

        <section className="cc-card cc-feedback-form-card">
          <h2 className="cc-feedback-form-title">
            How would you rate your experience?
          </h2>

          <div className="cc-feedback-stars">
            {[1, 2, 3, 4, 5].map((val) => (
              <Star
                key={val}
                filled={val <= rating}
                onClick={() => setRating(val)}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="cc-feedback-form">
            <label className="cc-form-field">
              <span>Tell us more about your experience</span>
              <textarea
                rows="4"
                placeholder="What did you think about our service, food quality, ambiance, etc.?"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </label>

            <div className="cc-feedback-actions">
              <button type="submit" className="cc-primary-btn">
                Submit Feedback
              </button>
            </div>
          </form>
        </section>

        <section className="cc-feedback-list-section">
          <h2 className="cc-feedback-list-title">Your Recent Feedback</h2>
          <div className="cc-feedback-list">
            {list.map((fb) => (
              <article key={fb.id} className="cc-card cc-feedback-item">
                <div className="cc-feedback-item-header">
                  <div className="cc-feedback-stars-small">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={`cc-star-small ${
                          idx < fb.rating ? "cc-star-small-filled" : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="cc-feedback-date">{fb.date}</span>
                </div>
                <p className="cc-feedback-message">{fb.message}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </CustomerLayout>
  );
}

export default CustomerFeedback;
