import { useEffect, useMemo, useState } from "react";
import { create, patch, remove, watch } from "../data/fireUtils";
import "./AdminPages.css";

export default function StaffPage() {
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({ name: "", email: "", role: "Line Cook", status: "Active" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => watch("staff", setRows), []);

  const visible = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f) return rows;
    return rows.filter(r =>
      [r.name, r.email, r.role, r.status].some(v => String(v || "").toLowerCase().includes(f))
    );
  }, [rows, filter]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    if (editingId) await patch("staff", editingId, form);
    else await create("staff", form);
    setForm({ name: "", email: "", role: "Line Cook", status: "Active" });
    setEditingId(null);
  };

  const edit = (row) => {
    setEditingId(row.id);
    setForm({ name: row.name, email: row.email, role: row.role, status: row.status });
  };

  const toggle = async (row) => {
    await patch("staff", row.id, { status: row.status === "Active" ? "Disabled" : "Active" });
  };

  return (
    <div className="adm-page">
      <h2 className="adm-h2">Staff Management</h2>
      <p className="adm-sub">Add, edit, or manage restaurant staff and their access.</p>

      <div className="adm-list-head">
        <div className="adm-search">🔎
          <input placeholder="Search name, email, role, status..." value={filter} onChange={e => setFilter(e.target.value)} />
        </div>
      </div>

      <form className="adm-card" onSubmit={submit} style={{marginTop:12, display:"grid", gap:10, gridTemplateColumns:"1fr 1fr 1fr 1fr auto"}}>
        <input className="adm-inp" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="adm-inp" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="adm-inp" placeholder="Role" value={form.role} onChange={e=>setForm({...form, role:e.target.value})}/>
        <select className="adm-inp" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
          <option>Active</option><option>Disabled</option>
        </select>
        <button className="adm-right-btn" type="submit">{editingId ? "Save" : "+ Add Staff"}</button>
      </form>

      <div className="adm-card" style={{marginTop:12}}>
        <table className="adm-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
          {visible.map((r)=>(
            <tr key={r.id}>
              <td>{r.name}</td><td>{r.email}</td><td>{r.role}</td>
              <td><span className={`adm-chip ${r.status==="Active"?"chip-green":"chip-yellow"}`}>{r.status}</span></td>
              <td className="adm-actions">
                <button className="link" onClick={()=>edit(r)}>Edit</button>
                <button className="link" onClick={()=>toggle(r)}>{r.status==="Active"?"Disable":"Enable"}</button>
                <button className="link link-danger" onClick={()=>remove("staff", r.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {!visible.length && <tr><td colSpan="5" className="adm-muted">No staff yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
