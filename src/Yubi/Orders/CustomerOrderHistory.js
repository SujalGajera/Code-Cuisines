// src/Yubi/Orders/CustomerOrderHistory.js
import React from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import "./CustomerOrderHistory.css";

const ORDERS = [
  {
    id: "ORD-2025-1205",
    items: "Cappuccino, Croissant",
    amount: 8.0,
    date: "Dec 12, 2025",
    status: "Delivered",
  },
  {
    id: "ORD-2025-1198",
    items: "Avocado Toast, Fresh Lemonade",
    amount: 11.5,
    date: "Dec 10, 2025",
    status: "Delivered",
  },
  {
    id: "ORD-2025-1187",
    items: "Espresso, Blueberry Muffin",
    amount: 7.0,
    date: "Dec 8, 2025",
    status: "Delivered",
  },
  {
    id: "ORD-2025-1165",
    items: "Cappuccino x2, Croissant x2",
    amount: 16.0,
    date: "Dec 5, 2025",
    status: "Delivered",
  },
  {
    id: "ORD-2025-1142",
    items: "Fresh Lemonade, Avocado Toast",
    amount: 11.5,
    date: "Dec 1, 2025",
    status: "Delivered",
  },
];

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
              {ORDERS.map((order) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default CustomerOrderHistory;
