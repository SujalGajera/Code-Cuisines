import { useEffect, useMemo, useState } from "react";
import { create, patch, remove, watch } from "../data/fireUtils";
import "./AdminPages.css";

export default function MenuPage(){
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({ item:"", category:"Main Course", price: "", availability:"Available" });
  const [editingId, setEditingId] = useState(null);

  useEffect(()=>watch("menu", setRows),[]);
  const visible = useMemo(()=>{
    const f = filter.toLowerCase();
    return rows.filter(r=>[r.item,r.category,r.price,r.availability].some(v=>String(v||"").toLowerCase().includes(f)));
  },[rows,filter]);

  const submit = async (e)=>{
    e.preventDefault();
    const payload = { ...form, price: String(form.price).trim() };
    if(editingId) await patch("menu", editingId, payload);
    else await create("menu", payload);
    setForm({ item:"", category:"Main Course", price:"", availability:"Available" });
    setEditingId(null);
  };

  return (
    <div className="adm-page">
      <h2 className="adm-h2">Menu Management</h2>
      <p className="adm-sub">Add, edit, or manage restaurant menu items and availability.</p>

      <div className="adm-list-head">
        <div className="adm-search">🔎 <input placeholder="Search item, category, price..." value={filter} onChange={e=>setFilter(e.target.value)} /></div>
      </div>

      <form className="adm-card" onSubmit={submit} style={{marginTop:12, display:"grid", gap:10, gridTemplateColumns:"1.5fr 1fr 1fr 1fr auto"}}>
        <input className="adm-inp" placeholder="Item name" value={form.item} onChange={e=>setForm({...form,item:e.target.value})}/>
        <input className="adm-inp" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
        <input className="adm-inp" placeholder="Price (e.g., £24.50)" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
        <select className="adm-inp" value={form.availability} onChange={e=>setForm({...form,availability:e.target.value})}>
          <option>Available</option><option>Unavailable</option>
        </select>
        <button className="adm-right-btn" type="submit">{editingId?"Save":" + Add Dish"}</button>
      </form>

      <div className="adm-card" style={{marginTop:12}}>
        <table className="adm-table">
          <thead><tr><th>Item</th><th>Category</th><th>Price</th><th>Availability</th><th>Actions</th></tr></thead>
          <tbody>
            {visible.map(r=>(
              <tr key={r.id}>
                <td>{r.item}</td><td>{r.category}</td><td>{r.price}</td>
                <td><span className={`adm-chip ${r.availability==="Available"?"chip-green":"chip-yellow"}`}>{r.availability}</span></td>
                <td className="adm-actions">
                  <button className="link" onClick={()=>{setEditingId(r.id);setForm({item:r.item,category:r.category,price:r.price,availability:r.availability});}}>Edit</button>
                  <button className="link" onClick={()=>patch("menu", r.id, { availability: r.availability==="Available"?"Unavailable":"Available"})}>Toggle</button>
                  <button className="link link-danger" onClick={()=>remove("menu", r.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {!visible.length && <tr><td colSpan="5" className="adm-muted">No dishes yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
