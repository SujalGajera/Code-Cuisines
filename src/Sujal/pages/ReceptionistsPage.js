import { useEffect, useMemo, useState } from "react";
import { collection, query, where, onSnapshot, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { createSecondaryUser } from "../utils/fireUtils";
import "../styles/AdminPages.css";

/**
 * ReceptionistsPage Component
 * Manages front desk staff (Receptionists).
 * Handles creation of receptionist accounts and their removal.
 */
export default function ReceptionistsPage() {
    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState("");
    const [form, setForm] = useState({ name: "", email: "", role: "Front Desk", password: "" });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");

    // Subscribe to real-time updates for receptionists
    useEffect(() => {
        const q = collection(db, "receptionist");
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const receptionistsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRows(receptionistsList);
        });
        return () => unsubscribe();
    }, []);

    // Filter list based on search term
    const visible = useMemo(() => {
        const f = filter.toLowerCase();
        return rows.filter(r => [(r.name || ""), (r.email || ""), (r.role || "")].some(v => String(v).toLowerCase().includes(f)));
    }, [rows, filter]);

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.name || !form.email || !form.password) {
            setError("Please fill all required fields");
            return;
        }

        try {
            if (editingId) {
                alert("Editing receptionists is not supported. Please delete and create new account.");
                setEditingId(null);
                setForm({ name: "", email: "", role: "Front Desk", password: "" });
            } else {
                // Create auth user using secondary app instance to avoid logging out the admin
                const user = await createSecondaryUser(form.email, form.password);

                // Store receptionist details in Firestore
                await setDoc(doc(db, "receptionist", user.uid), {
                    name: form.name,
                    email: form.email,
                    role: "receptionist",
                    position: form.role,
                    createdAt: new Date().toISOString(),
                });

                alert(`Receptionist created successfully! Login: ${form.email}`);
                setForm({ name: "", email: "", role: "Front Desk", password: "" });
                setEditingId(null);
            }
        } catch (err) {
            console.error("Error creating receptionist:", err);
            if (err.code === "auth/email-already-in-use") {
                setError("Email already exists");
            } else if (err.code === "auth/weak-password") {
                setError("Password should be at least 6 characters");
            } else {
                setError("Failed to create receptionist: " + err.message);
            }
        }
    };

    const deleteReceptionist = async (id) => {
        if (window.confirm("Delete this receptionist? This will remove from database.")) {
            try {
                await deleteDoc(doc(db, "receptionist", id));
                alert("Receptionist removed from database.");
            } catch (err) {
                console.error("Error deleting receptionist:", err);
                alert("Failed to delete receptionist");
            }
        }
    };

    return (
        <div className="adm-page">
            <h2 className="adm-h2">Receptionist Management</h2>
            <p className="adm-sub">Add, edit, or manage front desk team and their access.</p>

            <div className="adm-list-head">
                <div className="adm-search"> <input placeholder="Search..." value={filter} onChange={e => setFilter(e.target.value)} /></div>
            </div>

            {error && <div style={{ color: "#ff4444", padding: "10px", marginTop: "10px", background: "#ffe0e0", borderRadius: "4px" }}>{error}</div>}

            <form className="adm-card" onSubmit={submit} style={{ marginTop: 12, display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr 1fr 1fr auto" }}>
                <input className="adm-inp" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input className="adm-inp" placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                <input className="adm-inp" placeholder="Position/Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
                <input className="adm-inp" placeholder="Password (min 6 chars)" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                <button className="adm-right-btn" type="submit">{editingId ? "Save" : " + Add Receptionist"}</button>
            </form>

            <div className="adm-card" style={{ marginTop: 12 }}>
                <table className="adm-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Position</th><th>Created</th><th>Actions</th></tr></thead>
                    <tbody>
                        {visible.map(r => (
                            <tr key={r.id}>
                                <td>{r.name}</td>
                                <td>{r.email}</td>
                                <td>{r.position || r.role || "Receptionist"}</td>
                                <td>{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "N/A"}</td>
                                <td className="adm-actions">
                                    <button className="link link-danger" onClick={() => deleteReceptionist(r.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {!visible.length && <tr><td colSpan="5" className="adm-muted">No receptionists yet. Add receptionists to grant them access.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
