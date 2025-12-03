import { useEffect, useMemo, useState } from "react";
import { patch, remove, watch } from "../utils/fireUtils";
import "../styles/AdminPages.css";

/**
 * ReservationsPage Component
 * Admin interface for managing table reservations.
 * Allows confirming, completing, or deleting reservations.
 */
export default function ReservationsPage() {
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");

  // Watch reservations collection, ordered by creation date
  useEffect(() => watch("reservations", setRows, { orderBy: "createdAt", dir: "desc" }), []);

  const visible = useMemo(() => {
    const f = filter.toLowerCase();
    return rows.filter(r => [r.userName, r.date, r.time, r.table, r.guests, r.status, r.userEmail, r.userPhone].some(v => String(v || "").toLowerCase().includes(f)));
  }, [rows, filter]);

  const statusClass = (s) => s === "Confirmed" ? "chip-green" : s === "Pending" ? "chip-yellow" : s === "Completed" ? "chip-blue" : "chip-red";

  return (
    <div className="adm-page">
      <h2 className="adm-h2">Reservations</h2>
      <p className="adm-sub">View and manage all restaurant reservations from customers.</p>

      <div className="adm-list-head">
        <div className="adm-search" style={{ flex: 1 }}> <input placeholder="Search customer, date, time, table..." value={filter} onChange={e => setFilter(e.target.value)} /></div>
      </div>

      <div className="adm-card" style={{ marginTop: 12 }}>
        <table className="adm-table">
          <thead><tr><th>Customer</th><th>Contact</th><th>Date</th><th>Time</th><th>Guests</th><th>Table</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {visible.map(r => (
              <tr key={r.id}>
                <td>{r.userName || "N/A"}</td>
                <td>
                  <div style={{ fontSize: '0.85em' }}>
                    <div>{r.userEmail || ""}</div>
                    <div style={{ color: '#666' }}>{r.userPhone || ""}</div>
                  </div>
                </td>
                <td>{r.date}</td>
                <td>{r.time}</td>
                <td>{r.guests}</td>
                <td>{r.table}</td>
                <td><span className={`adm-chip ${statusClass(r.status)}`}>{r.status}</span></td>
                <td className="adm-actions">
                  <button className="link" onClick={() => patch("reservations", r.id, { status: "Confirmed", table: r.table === "TBD" ? "Table " + Math.floor(Math.random() * 20 + 1) : r.table })}>Confirm</button>
                  <button className="link" onClick={() => patch("reservations", r.id, { status: "Completed" })}>Complete</button>
                  <button className="link link-danger" onClick={() => remove("reservations", r.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {!visible.length && <tr><td colSpan="8" className="adm-muted">No reservations yet. Customers can create reservations from their dashboard.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
