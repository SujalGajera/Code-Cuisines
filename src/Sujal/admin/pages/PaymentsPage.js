import { useEffect, useMemo, useState } from "react";
import { patch, watch } from "../data/fireUtils";
import "./AdminPages.css";

export default function PaymentsPage(){
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(()=>watch("payments", setRows, { orderBy:"createdAt", dir:"desc" }),[]);
  const visible = useMemo(()=>{
    const f = filter.toLowerCase();
    return rows.filter(r=>[r.customer, r.amount, r.method, r.date, r.status].some(v=>String(v||"").toLowerCase().includes(f)));
  },[rows,filter]);

  const sumToday = rows
    .filter(()=>true) // refine with date parser if needed
    .reduce((a, r)=> a + Number(String(r.amount).replace(/[^\d.]/g,"")) || 0, 0);

  const statusClass = (s)=> s==="Completed" ? "chip-green" : s==="Pending" ? "chip-yellow" : "chip-red";

  return (
    <div className="adm-page">
      <h2 className="adm-h2">Payments</h2>
      <p className="adm-sub">Track and manage all payment transactions.</p>

      <div className="adm-grid" style={{marginTop:8}}>
        <div className="adm-card" style={{gridColumn:"span 6"}}>
          <div className="adm-kpi">
            <div className="adm-kpi-title">Total Earnings Today</div>
            <div className="adm-kpi-value">${sumToday.toFixed(2)}</div>
          </div>
        </div>
        <div className="adm-card" style={{gridColumn:"span 6"}}>
          <div className="adm-kpi">
            <div className="adm-kpi-title">Total Earnings This Month</div>
            <div className="adm-kpi-value">—</div>
          </div>
        </div>
      </div>

      <div className="adm-search" style={{margin:"14px 0"}}>🔎
        <input placeholder="Search customer, amount, method..." value={filter} onChange={e=>setFilter(e.target.value)} />
      </div>

      <div className="adm-card">
        <table className="adm-table">
          <thead><tr><th>Customer</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {visible.map(r=>(
              <tr key={r.id}>
                <td>{r.customer}</td><td>{r.amount}</td><td>{r.method}</td><td>{r.date}</td>
                <td><span className={`adm-chip ${statusClass(r.status)}`}>{r.status}</span></td>
                <td className="adm-actions">
                  <button className="link" onClick={()=>patch("payments", r.id, { status:"Completed" })}>Mark Completed</button>
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
