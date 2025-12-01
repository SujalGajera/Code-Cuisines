import { useEffect, useMemo, useState } from "react";
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth as firebaseAuth } from "../../../firebase";
import { setDoc } from "firebase/firestore";
import "./AdminPages.css";

export default function StaffPage() {
    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState("");
    const [form, setForm] = useState({ name: "", email: "", role: "Line Cook", password: "" });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");

    // Real-time listener for staff from users collection
    useEffect(() => {
        const q = query(collection(db, "users"), where("role", "==", "staff"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const staffList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRows(staffList);
        });
        return () => unsubscribe();
    }, []);

    const visible = useMemo(() => {
        const f = filter.trim().toLowerCase();
        if (!f) return rows;
        return rows.filter(r =>
            [(r.name || ""), (r.email || ""), (r.role || "")].some(v => String(v).toLowerCase().includes(f))
        );
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
                alert("Editing staff is not supported. Please delete and create new account.");
                setEditingId(null);
                setForm({ name: "", email: "", role: "Line Cook", password: "" });
            } else {
                // Create new staff with Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(firebaseAuth, form.email, form.password);
                const user = userCredential.user;

                // Create user document in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    name: form.name,
                    email: form.email,
                    role: "staff",
                    position: form.role,
                    createdAt: new Date().toISOString(),
                });

                alert(`Staff member created successfully! Login: ${form.email}`);
                setForm({ name: "", email: "", role: "Line Cook", password: "" });
                setEditingId(null);
            }
        } catch (err) {
            console.error("Error creating staff:", err);
            if (err.code === "auth/email-already-in-use") {
                setError("Email already exists");
            } else if (err.code === "auth/weak-password") {
                setError("Password should be at least 6 characters");
            } else {
                setError("Failed to create staff: " + err.message);
            }
        }
    };

    const deleteStaff = async (id) => {
        if (window.confirm("Delete this staff member? This will remove from database.")) {
            try {
                await deleteDoc(doc(db, "users", id));
                alert("Staff member removed from database.");
            } catch (err) {
                console.error("Error deleting staff:", err);
                alert("Failed to delete staff");
            }
        }
    };

    return (
        <div className="adm-page">
            <h2 className="adm-h2">Staff Management</h2>
            <p className="adm-sub">Add, edit, or manage restaurant staff and their access.</p>

            <div className="adm-list-head">
                <div className="adm-search">
                    <input placeholder="Search name, email, role..." value={filter} onChange={e => setFilter(e.target.value)} />
                </div>
            </div>

            {error && <div style={{ color: "#ff4444", padding: "10px", marginTop: "10px", background: "#ffe0e0", borderRadius: "4px" }}>{error}</div>}

            <form className="adm-card" onSubmit={submit} style={{ marginTop: 12, display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr 1fr 1fr auto" }}>
                <input className="adm-inp" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input className="adm-inp" placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                <input className="adm-inp" placeholder="Position/Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
                <input className="adm-inp" placeholder="Password (min 6 chars)" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                <button className="adm-right-btn" type="submit">{editingId ? "Save" : "+ Add Staff"}</button>
            </form>

            <div className="adm-card" style={{ marginTop: 12 }}>
                <table className="adm-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Position</th><th>Created</th><th>Actions</th></tr></thead>
                    <tbody>
                        {visible.map((r) => (
                            <tr key={r.id}>
                                <td>{r.name}</td>
                                <td>{r.email}</td>
                                <td>{r.position || r.role || "Staff"}</td>
                                <td>{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "N/A"}</td>
                                <td className="adm-actions">
                                    <button className="link link-danger" onClick={() => deleteStaff(r.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {!visible.length && <tr><td colSpan="5" className="adm-muted">No staff yet. Add staff members to grant them access.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
