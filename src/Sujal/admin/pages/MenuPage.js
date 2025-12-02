import { useEffect, useMemo, useState } from "react";
import { create, patch, remove, watch } from "../data/fireUtils";
import "./AdminPages.css";

export default function MenuPage() {
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({ item: "", category: "Main Course", price: "", availability: "Available", imageUrl: "" });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => watch("menu", setRows), []);
  const visible = useMemo(() => {
    const f = filter.toLowerCase();
    return rows.filter(r => [r.item, r.category, r.price, r.availability].some(v => String(v || "").toLowerCase().includes(f)));
  }, [rows, filter]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      item: form.item.trim(),
      category: form.category,
      price: String(form.price).trim(),
      availability: form.availability
    };

    // Only include imageUrl if it has a value
    if (form.imageUrl && form.imageUrl.trim()) {
      payload.imageUrl = form.imageUrl.trim();
    }

    if (editingId) await patch("menu", editingId, payload);
    else await create("menu", payload);
    setForm({ item: "", category: "Main Course", price: "", availability: "Available", imageUrl: "" });
    setEditingId(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Uploading file:", file.name);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "menu_images_preset");
    formData.append("folder", "menu-items");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dlrnulkxl/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary error:", errorData);
        throw new Error(errorData.error?.message || "Upload failed");
      }

      const data = await response.json();
      console.log("Upload successful:", data.secure_url);
      setForm({ ...form, imageUrl: data.secure_url });
      alert("✅ Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      alert(`❌ Failed to upload image: ${error.message}\n\nPlease check:\n1. Upload preset 'menu_images_preset' exists in Cloudinary\n2. Signing mode is set to 'Unsigned'\n3. Your internet connection`);
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = "";
    }
  };

  return (
    <div className="adm-page">
      <h2 className="adm-h2">Menu Management</h2>
      <p className="adm-sub">Add, edit, or manage restaurant menu items and availability.</p>

      <div className="adm-list-head">
        <div className="adm-search"> <input placeholder="Search item, category, price..." value={filter} onChange={e => setFilter(e.target.value)} /></div>
      </div>

      <form className="adm-card" onSubmit={submit} style={{ marginTop: 12, display: "grid", gap: 10, gridTemplateColumns: "1.5fr 1fr 1fr 1fr auto" }}>
        <input className="adm-inp" placeholder="Item name" value={form.item} onChange={e => setForm({ ...form, item: e.target.value })} required />
        <input className="adm-inp" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <input className="adm-inp" placeholder="Price (e.g., £24.50)" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
        <select className="adm-inp" value={form.availability} onChange={e => setForm({ ...form, availability: e.target.value })}>
          <option>Available</option><option>Unavailable</option>
        </select>
        <button className="adm-right-btn" type="submit" disabled={uploading}>{editingId ? "Save" : " + Add Dish"}</button>
      </form>

      <div className="adm-card" style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center" }}>
        <label style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <span style={{ marginBottom: 4, fontSize: 14, fontWeight: 500 }}>Upload Image or Enter URL:</span>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              style={{ flex: 1 }}
            />
            <input
              className="adm-inp"
              placeholder="Or paste image URL"
              value={form.imageUrl}
              onChange={e => setForm({ ...form, imageUrl: e.target.value })}
              style={{ flex: 1 }}
              disabled={uploading}
            />
          </div>
        </label>
        {form.imageUrl && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <img src={form.imageUrl} alt="Preview" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }} />
            <button
              type="button"
              className="link link-danger"
              onClick={() => setForm({ ...form, imageUrl: "" })}
              style={{ fontSize: 12 }}
            >
              Remove
            </button>
          </div>
        )}
        {uploading && <span style={{ color: "#666" }}>Uploading...</span>}
      </div>

      <div className="adm-card" style={{ marginTop: 12 }}>
        <table className="adm-table">
          <thead><tr><th>Image</th><th>Item</th><th>Category</th><th>Price</th><th>Availability</th><th>Actions</th></tr></thead>
          <tbody>
            {visible.map(r => (
              <tr key={r.id}>
                <td>
                  {r.imageUrl ? (
                    <img src={r.imageUrl} alt={r.item} style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }} />
                  ) : (
                    <span style={{ color: "#999", fontSize: 12 }}>No image</span>
                  )}
                </td>
                <td>{r.item}</td><td>{r.category}</td><td>{r.price}</td>
                <td><span className={`adm-chip ${r.availability === "Available" ? "chip-green" : "chip-yellow"}`}>{r.availability}</span></td>
                <td className="adm-actions">
                  <button className="link" onClick={() => { setEditingId(r.id); setForm({ item: r.item, category: r.category, price: r.price, availability: r.availability, imageUrl: r.imageUrl || "" }); }}>Edit</button>
                  <button className="link" onClick={() => patch("menu", r.id, { availability: r.availability === "Available" ? "Unavailable" : "Available" })}>Toggle</button>
                  <button className="link link-danger" onClick={() => remove("menu", r.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {!visible.length && <tr><td colSpan="6" className="adm-muted">No dishes yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
