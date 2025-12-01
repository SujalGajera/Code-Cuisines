// src/Yubi/Orders/CustomerOrderHistory.js
import React from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import "./CustomerOrderHistory.css";

// Orders will be populated from Firebase in the future
const ORDERS = [];

function CustomerOrderHistory() {
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
              {ORDERS.length > 0 ? (
                ORDERS.map((order) => (
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












