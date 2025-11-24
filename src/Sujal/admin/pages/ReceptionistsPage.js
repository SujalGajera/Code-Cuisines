import { useEffect, useMemo, useState } from "react";
import { create, patch, remove, watch } from "../data/fireUtils";
import "./AdminPages.css";

export default function ReceptionistsPage(){
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({ name:"", email:"", role:"Front Desk", status:"Active" });
  const [editingId, setEditingId] = useState(null);

  useEffect(()=>watch("receptionists", setRows),[]);
  const visible = useMemo(()=>{
    const f = filter.toLowerCase();
    return rows.filter(r=>[r.name,r.email,r.role,r.status].some(v=>String(v||"").toLowerCase().includes(f)));
  },[rows,filter]);

  const submit = async (e)=>{
    e.preventDefault();
    if(editingId) await patch("receptionists", editingId, form);
    else await create("receptionists", form);
    setForm({ name:"", email:"", role:"Front Desk", status:"Active" });
    setEditingId(null);
  };

  return (
    <div className="adm-page">
      <h2 className="adm-h2">Receptionist Management</h2>
      <p className="adm-sub">Add, edit, or manage front desk team and their access.</p>

      <div className="adm-list-head">
        <div className="adm-search">🔎 <input placeholder="Search..." value={filter} onChange={e=>setFilter(e.target.value)}/></div>
      </div>

      <form className="adm-card" onSubmit={submit} style={{marginTop:12, display:"grid", gap:10, gridTemplateColumns:"1fr 1fr 1fr 1fr auto"}}>
        <input className="adm-inp" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="adm-inp" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input className="adm-inp" placeholder="Role" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/>
        <select className="adm-inp" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
          <option>Active</option><option>Disabled</option>
        </select>
        <button className="adm-right-btn" type="submit">{editingId?"Save":" + Add Receptionist"}</button>
      </form>

      <div className="adm-card" style={{marginTop:12}}>
        <table className="adm-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
          {visible.map(r=>(
            <tr key={r.id}>
              <td>{r.name}</td><td>{r.email}</td><td>{r.role}</td>
              <td><span className="adm-chip chip-green">{r.status}</span></td>
              <td className="adm-actions">
                <button className="link" onClick={()=>{setEditingId(r.id);setForm({name:r.name,email:r.email,role:r.role,status:r.status});}}>Edit</button>
                <button className="link" onClick={()=>patch("receptionists", r.id, { status: r.status==="Active"?"Disabled":"Active"})}>{r.status==="Active"?"Disable":"Enable"}</button>
                <button className="link link-danger" onClick={()=>remove("receptionists", r.id)}>Delete</button>
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
