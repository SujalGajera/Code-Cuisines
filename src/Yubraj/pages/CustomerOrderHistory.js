// src/Yubi/Orders/CustomerOrderHistory.js
import React from "react";
import CustomerLayout from "../components/CustomerLayout";
import "../styles/CustomerOrderHistory.css";

import { auth, db } from "../../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

function CustomerOrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "customer", user.uid, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate().toLocaleDateString() || "Recent",
        amount: doc.data().total || 0,
        items: doc.data().items?.map(i => i.name).join(", ") || "Items"
      }));
      setOrders(orderList);
    });

    return () => unsubscribe();
  }, []);
  return (
    <CustomerLayout>
      <div className="cc-orders-page">
        <header className="cc-orders-header">
          <h1 className="cc-page-title">Order History</h1>
          <p className="cc-page-subtitle">
            View all your past orders and their payment status.
          </p>
        </header>

        <div className="cc-card cc-orders-table-wrap">
          <table className="cc-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Date</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.items}</td>
                    <td>${order.amount.toFixed(2)}</td>
                    <td>{order.date}</td>
                    <td>
                      <span className="cc-pill cc-pill-success">
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="cc-link-btn"
                        type="button"
                        onClick={() => alert("View invoice (mock only).")}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#999" }}>
                    No orders yet. Place an order from the menu to see your order history here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default CustomerOrderHistory;












