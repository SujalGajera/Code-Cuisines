import { useEffect, useMemo, useState } from "react";
import { create, patch, remove, watch } from "../data/fireUtils";
import "./AdminPages.css";

export default function CustomersPage(){
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({ name:"", email:"", tier:"Regular Customer", status:"Active" });
  const [editingId, setEditingId] = useState(null);

  useEffect(()=>watch("customers", setRows),[]);
  const visible = useMemo(()=>{
    const f = filter.toLowerCase();
    return rows.filter(r=>[r.name,r.email,r.tier,r.status].some(v=>String(v||"").toLowerCase().includes(f)));
  },[rows,filter]);

  const submit = async (e)=>{
    e.preventDefault();
    if(editingId) await patch("customers", editingId, form);
    else await create("customers", form);
    setForm({ name:"", email:"", tier:"Regular Customer", status:"Active" });
    setEditingId(null);
  };

  return (
    <div className="adm-page">
      <h2 className="adm-h2">Customer Management</h2>
      <p className="adm-sub">View and manage customer information and profiles.</p>

      <div className="adm-search" style={{marginBottom:12}}>
        🔎 <input placeholder="Search name, email, role, status..." value={filter} onChange={e=>setFilter(e.target.value)}/>
      </div>

      <form className="adm-card" onSubmit={submit} style={{marginBottom:12, display:"grid", gap:10, gridTemplateColumns:"1fr 1fr 1fr 1fr auto"}}>
        <input className="adm-inp" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="adm-inp" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input className="adm-inp" placeholder="Role/Tier" value={form.tier} onChange={e=>setForm({...form,tier:e.target.value})}/>
        <select className="adm-inp" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
          <option>Active</option><option>Disabled</option>
        </select>
        <button className="adm-right-btn" type="submit">{editingId?"Save":" + Add Customer"}</button>
      </form>

      <div className="adm-card">
        <table className="adm-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {visible.map(r=>(
              <tr key={r.id}>
                <td>{r.name}</td><td>{r.email}</td><td>{r.tier}</td>
                <td><span className={`adm-chip ${r.status==="Active"?"chip-green":"chip-yellow"}`}>{r.status}</span></td>
                <td className="adm-actions">
                  <button className="link" onClick={()=>{setEditingId(r.id);setForm({name:r.name,email:r.email,tier:r.tier,status:r.status});}}>Edit</button>
                  <button className="link" onClick={()=>patch("customers", r.id, { status: r.status==="Active"?"Disabled":"Active"})}>{r.status==="Active"?"Disable":"Enable"}</button>
                  <button className="link link-danger" onClick={()=>remove("customers", r.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {!visible.length && <tr><td colSpan="5" className="adm-muted">No data.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
