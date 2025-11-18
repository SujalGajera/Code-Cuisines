import { useEffect, useMemo, useState } from "react";
import { patch, remove, watch } from "../data/fireUtils";
import "./AdminPages.css";

export default function ReservationsPage(){
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(()=>watch("reservations", setRows, { orderBy: "datetime", dir:"desc" }),[]);
  const visible = useMemo(()=>{
    const f = filter.toLowerCase();
    return rows.filter(r=>[r.customer, r.datetime, r.tableNo, r.guests, r.status].some(v=>String(v||"").toLowerCase().includes(f)));
  },[rows,filter]);

  const statusClass = (s)=> s==="Confirmed" ? "chip-green" : s==="Pending" ? "chip-yellow" : "chip-red";

  return (
    <div className="adm-page">
      <h2 className="adm-h2">Reservations</h2>
      <p className="adm-sub">View and manage all restaurant reservations.</p>

      <div className="adm-list-head">
        <div className="adm-search" style={{flex:1}}>🔎 <input placeholder="Search customer, date, table..." value={filter} onChange={e=>setFilter(e.target.value)}/></div>
        <button className="adm-right-btn">▾ All Status</button>
      </div>

      <div className="adm-card" style={{marginTop:12}}>
        <table className="adm-table">
          <thead><tr><th>Customer</th><th>Date & Time</th><th>Table No</th><th>Guests</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {visible.map(r=>(
              <tr key={r.id}>
                <td>{r.customer}</td><td>{r.datetime}</td><td>{r.tableNo}</td><td>{r.guests}</td>
                <td><span className={`adm-chip ${statusClass(r.status)}`}>{r.status}</span></td>
                <td className="adm-actions">
                  <button className="link" onClick={()=>patch("reservations", r.id, { status:"Confirmed" })}>Confirm</button>
                  <button className="link" onClick={()=>patch("reservations", r.id, { status:"Pending" })}>Pending</button>
                  <button className="link link-danger" onClick={()=>remove("reservations", r.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {!visible.length && <tr><td colSpan="6" className="adm-muted">No reservations.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
