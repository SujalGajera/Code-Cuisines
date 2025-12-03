import { useEffect, useMemo, useState } from "react";
import { collectionGroup, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "../styles/AdminPages.css";

/**
 * PaymentsPage Component
 * Tracks and displays payment history from all orders.
 * Aggregates data from the 'orders' subcollections across all customers.
 */
export default function PaymentsPage() {
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Query all completed orders across the entire database
    const ordersQuery = query(
      collectionGroup(db, "orders"),
      where("paymentStatus", "==", "Completed")
    );

    console.log("Fetching payments...");

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      console.log("Payments snapshot size:", snapshot.size);

      const ordersList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          customer: data.userEmail || "Unknown",
          amount: `$${data.total?.toFixed(2) || "0.00"}`,
          method: data.paymentMethod || "N/A",
          date: data.paidAt?.toDate().toLocaleDateString() || data.createdAt?.toDate().toLocaleDateString() || "Recent",
          status: data.paymentStatus || "Pending",
          // Store raw date for sorting
          rawDate: data.paidAt?.toDate() || data.createdAt?.toDate() || new Date(0)
        };
      });

      // Sort client-side by date (newest first)
      ordersList.sort((a, b) => b.rawDate - a.rawDate);

      setRows(ordersList);
    }, (error) => {
      console.error("Error fetching payments:", error);
    });

    return () => unsubscribe();
  }, []);

  const visible = useMemo(() => {
    const f = filter.toLowerCase();
    return rows.filter(r => [r.customer, r.amount, r.method, r.date, r.status].some(v => String(v || "").toLowerCase().includes(f)));
  }, [rows, filter]);

  // Calculate total earnings from visible rows
  const sumToday = rows
    .filter(() => true) // Placeholder for date filtering logic
    .reduce((a, r) => a + Number(String(r.amount).replace(/[^\d.]/g, "")) || 0, 0);

  const statusClass = (s) => s === "Completed" ? "chip-green" : s === "Pending" ? "chip-yellow" : "chip-red";

  return (
    <div className="adm-page">
      <h2 className="adm-h2">Payments</h2>
      <p className="adm-sub">Track and manage all payment transactions.</p>

      <div className="adm-grid" style={{ marginTop: 8 }}>
        <div className="adm-card" style={{ gridColumn: "span 6" }}>
          <div className="adm-kpi">
            <div className="adm-kpi-title">Total Earnings Today</div>
            <div className="adm-kpi-value">${sumToday.toFixed(2)}</div>
          </div>
        </div>
        <div className="adm-card" style={{ gridColumn: "span 6" }}>
          <div className="adm-kpi">
            <div className="adm-kpi-title">Total Earnings This Month</div>
            <div className="adm-kpi-value">—</div>
          </div>
        </div>
      </div>

      <div className="adm-search" style={{ margin: "14px 0" }}>
        <input placeholder="Search customer, amount, method..." value={filter} onChange={e => setFilter(e.target.value)} />
      </div>

      <div className="adm-card">
        <table className="adm-table">
          <thead><tr><th>Customer</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {visible.map(r => (
              <tr key={r.id}>
                <td>{r.customer}</td><td>{r.amount}</td><td>{r.method}</td><td>{r.date}</td>
                <td><span className={`adm-chip ${statusClass(r.status)}`}>{r.status}</span></td>
                <td className="adm-actions">
                  <span className="adm-muted">—</span>
                </td>
              </tr>
            ))}
            {!visible.length && <tr><td colSpan="6" className="adm-muted">No payments.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
