import { useEffect, useMemo, useState } from "react";
import { collection, query, where, onSnapshot, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { createSecondaryUser } from "../data/fireUtils";
import "./AdminPages.css";

export default function CustomersPage() {
    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState("");
    const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");

    // Real-time listener for customers from customer collection
    useEffect(() => {
        const q = collection(db, "customer");
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const customers = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRows(customers);
        });
        return () => unsubscribe();
    }, []);

    const visible = useMemo(() => {
        const f = filter.toLowerCase();
        return rows.filter(r => [(r.name || ""), (r.email || ""), (r.phone || "")].some(v => String(v).toLowerCase().includes(f)));
    }, [rows, filter]);

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (editingId) {
                alert("Editing customers is not supported. Please delete and create new account.");
                setEditingId(null);
                setForm({ name: "", email: "", phone: "", password: "" });
            } else {
                // Create new customer with Secondary App (prevents admin logout)
                const user = await createSecondaryUser(form.email, form.password);

                // Create user document in Firestore
                await setDoc(doc(db, "customer", user.uid), {
                    name: form.name,
                    email: form.email,
                    phone: form.phone || "",
                    role: "customer",
                    createdAt: new Date().toISOString(),
                });

                alert(`Customer created successfully! Login: ${form.email}`);
                setForm({ name: "", email: "", phone: "", password: "" });
                setEditingId(null);
            }
        } catch (err) {
            console.error("Error creating customer:", err);
            if (err.code === "auth/email-already-in-use") {
                setError("Email already exists");
            } else if (err.code === "auth/weak-password") {
                setError("Password should be at least 6 characters");
            } else {
                setError("Failed to create customer: " + err.message);
            }
        }
    };

    const deleteCustomer = async (id) => {
        if (window.confirm("Delete this customer? This will remove from database (Firebase Auth account will remain).")) {
            try {
                await deleteDoc(doc(db, "customer", id));
                alert("Customer removed from database.");
            } catch (err) {
                console.error("Error deleting customer:", err);
                alert("Failed to delete customer");
            }
        }
    };

    return (
        <div className="adm-page">
            <h2 className="adm-h2">Customer Management</h2>
            <p className="adm-sub">View and manage customer information. Registered customers appear here automatically.</p>

            <div className="adm-search" style={{ marginBottom: 12 }}>
                <input placeholder="Search name, email, phone..." value={filter} onChange={e => setFilter(e.target.value)} />
            </div>

            {error && <div style={{ color: "#ff4444", padding: "10px", marginBottom: "10px", background: "#ffe0e0", borderRadius: "4px" }}>{error}</div>}

            <form className="adm-card" onSubmit={submit} style={{ marginBottom: 12, display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr 1fr 1fr auto" }}>
                <input className="adm-inp" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input className="adm-inp" placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                <input className="adm-inp" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                <input className="adm-inp" placeholder="Password (min 6 chars)" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                <button className="adm-right-btn" type="submit">{editingId ? "Save" : " + Add Customer"}</button>
            </form>

            <div className="adm-card">
                <table className="adm-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Created</th><th>Actions</th></tr></thead>
                    <tbody>
                        {visible.map(r => (
                            <tr key={r.id}>
                                <td>{r.name}</td>
                                <td>{r.email}</td>
                                <td>{r.phone || "N/A"}</td>
                                <td>{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "N/A"}</td>
                                <td className="adm-actions">
                                    <button className="link link-danger" onClick={() => deleteCustomer(r.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {!visible.length && <tr><td colSpan="5" className="adm-muted">No customers yet. Customers who register will appear here automatically.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
