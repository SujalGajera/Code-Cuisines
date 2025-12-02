// src/Yubi/Payment/CustomerPayment.js
import React, { useState } from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import { useCart } from "../Cart/CartContext";
import { auth, db } from "../../firebase";
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import "./CustomerPayment.css";

function CustomerPayment() {
  const { items, subtotal, tax, total, clearCart } = useCart();
  const [method, setMethod] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Card details (optional demo form)
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    // must choose any method
    if (!method) {
      setMsg("❌ Please select a payment method.");
      return;
    }

    // simple validation for card fields (demo only)
    if (method === "Card") {
      if (
        !cardDetails.name.trim() ||
        !cardDetails.number.trim() ||
        !cardDetails.expiry.trim() ||
        !cardDetails.cvv.trim()
      ) {
        setMsg("❌ Please fill all card details.");
        return;
      }
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        setMsg("❌ Please log in to complete payment.");
        setLoading(false);
        return;
      }

      // Get the most recent pending order for this user
      const ordersRef = collection(db, "customer", user.uid, "orders");
      console.log("Querying orders for user:", user.uid);

      // Simplified query - no orderBy to avoid index requirement
      const q = query(ordersRef, where("paymentStatus", "==", "Pending"), limit(1));
      const orderSnapshot = await getDocs(q);

      console.log("Orders found:", orderSnapshot.size);
      orderSnapshot.forEach(doc => console.log("Order doc:", doc.id, doc.data()));

      if (orderSnapshot.empty) {
        setMsg("❌ No pending order found.");
        setLoading(false);
        return;
      }

      const orderDoc = orderSnapshot.docs[0];

      // Update order with payment information
      await updateDoc(doc(db, "customer", user.uid, "orders", orderDoc.id), {
        paymentMethod: method,
        paymentStatus: "Completed",
        status: "Confirmed",
        paidAt: serverTimestamp()
      });

      // DEMO ONLY: pretend payment is always successful
      clearCart(); // empty the cart

      setMsg("✅ Payment Successful! Thank you for your order.");
      setLoading(false);

      setTimeout(() => {
        // optional: go to order history page
        window.location.href = "/customer/orders";
      }, 1500);
    } catch (error) {
      console.error("Payment error:", error);
      setMsg("❌ Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <CustomerLayout>
      <div className="pay-wrap">
        <h1 className="pay-title">Payment</h1>

        {/* Method Buttons */}
        <div className="pay-method-grid">
          {["Cash", "Card", "Online"].map((m) => (
            <button
              key={m}
              className={`pay-option ${method === m ? "active" : ""}`}
              onClick={() => setMethod(m)}
            >
              {m}
            </button>
          ))}
        </div>

        {/* CASH Payment Box */}
        {method === "Cash" && (
          <div className="pay-method-box">
            <h3>Cash Payment</h3>
            <p>You can pay cash when you arrive at Code & Cuisine.</p>
          </div>
        )}

        {/* CARD Payment Box – user can type details */}
        {method === "Card" && (
          <div className="pay-method-box">
            <h3>Card Payment</h3>
            <p className="card-hint">
              Demo only – this does not charge a real card.
            </p>

            <div className="card-form">
              <div className="card-row">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Roshan Dhakal"
                  value={cardDetails.name}
                  onChange={handleCardChange}
                />
              </div>

              <div className="card-row">
                <label>Card Number</label>
                <input
                  type="text"
                  name="number"
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  value={cardDetails.number}
                  onChange={handleCardChange}
                />
              </div>

              <div className="card-row-two">
                <div>
                  <label>Expiry</label>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="12/29"
                    maxLength={5}
                    value={cardDetails.expiry}
                    onChange={handleCardChange}
                  />
                </div>
                <div>
                  <label>CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    placeholder="123"
                    maxLength={4}
                    value={cardDetails.cvv}
                    onChange={handleCardChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ONLINE Payment Box (simple dummy text) */}
        {method === "Online" && (
          <div className="pay-method-box">
            <h3>Online Payment</h3>
            <p>Dummy Online Payment Gateway.</p>
            <p>
              UPI ID: <b>codecuisine@ybl</b>
            </p>
            <p className="card-hint">
              For demo, click <b>Confirm Payment</b> after paying.
            </p>
          </div>
        )}

        {/* Order Summary */}
        <div className="pay-summary">
          <h3>Order Summary</h3>
          <p>Items: {items.length}</p>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax (10%): ${tax.toFixed(2)}</p>
          <h2>Total: ${total.toFixed(2)}</h2>
        </div>

        {/* Confirm Payment button – always calls handlePayment */}
        <button
          className="pay-confirm"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Payment"}
        </button>

        {msg && (
          <p
            className={`pay-msg ${msg.startsWith("❌") ? "pay-error" : "pay-success"
              }`}
          >
            {msg}
          </p>
        )}
      </div>
    </CustomerLayout>
  );
}

export default CustomerPayment;
