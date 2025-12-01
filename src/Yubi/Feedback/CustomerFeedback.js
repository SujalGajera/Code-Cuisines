// src/Yubi/Feedback/CustomerFeedback.js
import React, { useState, useEffect } from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import "./CustomerFeedback.css";
import { auth, db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
} from "firebase/firestore";

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
  const [list, setList] = useState([]);
  const [customerUid, setCustomerUid] = useState(null);

  // Load customer's feedback from Firebase
  useEffect(() => {
    const init = async () => {
      const userFromAuth = auth.currentUser;
      const customerFromStorage = JSON.parse(
        localStorage.getItem("currentCustomer") || "null"
      );

      const uid = userFromAuth?.uid || customerFromStorage?.uid;

      if (!uid) {
        console.warn("No logged-in customer");
        return;
      }

      setCustomerUid(uid);

      // Real-time listener for feedback filtered by userId
      const q = query(
        collection(db, "feedback"),
        where("userId", "==", uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const feedbacks = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            rating: data.rating,
            message: data.message,
            date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString("en-NZ", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }) : "Recent",
          };
        });
        setList(feedbacks);
      });

      return () => unsubscribe();
    };

    init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !text.trim()) {
      alert("Please provide a rating and feedback message.");
      return;
    }

    if (!customerUid) {
      alert("Please log in to submit feedback.");
      return;
    }

    try {
      // Get customer details
      const userDoc = await getDoc(doc(db, "users", customerUid));
      const userData = userDoc.data();

      await addDoc(collection(db, "feedback"), {
        userId: customerUid,
        userName: userData?.name || "Customer",
        userEmail: userData?.email || "",
        rating,
        message: text.trim(),
        createdAt: serverTimestamp(),
      });

      setRating(0);
      setText("");
      alert("Thank you for your feedback!");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Failed to submit feedback. Please try again.");
    }
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
                        className={`cc-star-small ${idx < fb.rating ? "cc-star-small-filled" : ""
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

