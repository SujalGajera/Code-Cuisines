import { useEffect, useMemo, useState } from "react";
//import { create, patch, remove } from "../utils/fireUtils";
import { collection, query, getDocs, collectionGroup, onSnapshot, doc, deleteDoc, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import "../styles/AdminPages.css";

/**
 * ShiftsPage Component
 * Manages work shifts for receptionists.
 * Allows assigning shifts, updating status (Pending/Confirmed/Cancelled), and viewing schedules.
 */
export default function ShiftsPage() {
    const [rows, setRows] = useState([]);
    const [receptionists, setReceptionists] = useState([]);
    const [filter, setFilter] = useState("");
    const [form, setForm] = useState({
        receptionistId: "",
        receptionistName: "",
        date: "",
        startTime: "",
        endTime: "",
        role: "Front Desk",
        status: "Pending"
    });
    const [editingId, setEditingId] = useState(null);
    const [editingRecId, setEditingRecId] = useState(null); // Parent ID required for subcollection updates

    // Fetch list of receptionists for the assignment dropdown
    useEffect(() => {
        const fetchReceptionists = async () => {
            const q = collection(db, "receptionist");
            const snapshot = await getDocs(q);
            const recs = snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name || doc.data().firstName + " " + doc.data().lastName || doc.data().email
            }));
            setReceptionists(recs);
        };
        fetchReceptionists();
    }, []);

    // Subscribe to ALL shifts across all receptionists using collectionGroup
    useEffect(() => {
        const q = query(collectionGroup(db, "shifts"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allShifts = snapshot.docs.map(d => ({
                id: d.id,
                path: d.ref.path,
                receptionistId: d.ref.parent.parent?.id, // Extract parent receptionist ID
                ...d.data()
            }));
            setRows(allShifts);
        });
        return () => unsubscribe();
    }, []);

    // Filter shifts based on search criteria
    const visible = useMemo(() => {
        const f = filter.toLowerCase();
        return rows.filter(r =>
            [r.receptionistName, r.date, r.role, r.status].some(v =>
                String(v || "").toLowerCase().includes(f)
            )
        );
    }, [rows, filter]);

    const submit = async (e) => {
        e.preventDefault();
        const payload = { ...form };

        try {
            if (editingId && editingRecId) {
                // Update existing shift
                // If the receptionist ID has changed, we must delete the old doc and create a new one
                // because it belongs to a different parent subcollection.
                if (editingRecId !== payload.receptionistId) {
                    await deleteDoc(doc(db, "receptionist", editingRecId, "shifts", editingId));
                    await addDoc(collection(db, "receptionist", payload.receptionistId, "shifts"), {
                        ...payload,
                        createdAt: serverTimestamp()
                    });
                } else {
                    await updateDoc(doc(db, "receptionist", editingRecId, "shifts", editingId), {
                        ...payload,
                        updatedAt: serverTimestamp()
                    });
                }
            } else {
                // Create new shift
                await addDoc(collection(db, "receptionist", payload.receptionistId, "shifts"), {
                    ...payload,
                    createdAt: serverTimestamp()
                });
            }

            // Reset form
            setForm({
                receptionistId: "",
                receptionistName: "",
                date: "",
                startTime: "",
                endTime: "",
                role: "Front Desk",
                status: "Pending"
            });
            setEditingId(null);
            setEditingRecId(null);
        } catch (err) {
            console.error("Error saving shift:", err);
            alert("Failed to save shift");
        }
    };

    const handleReceptionistChange = (e) => {
        const recId = e.target.value;
        const rec = receptionists.find(r => r.id === recId);
        setForm({
            ...form,
            receptionistId: recId,
            receptionistName: rec ? rec.name : ""
        });
    };

    const handleDelete = async (r) => {
        if (!window.confirm("Delete this shift?")) return;
        try {
            if (r.receptionistId) {
                await deleteDoc(doc(db, "receptionist", r.receptionistId, "shifts", r.id));
            } else {
                console.error("Could not determine parent receptionist for deletion");
            }
        } catch (err) {
            console.error("Error deleting shift:", err);
            alert("Failed to delete shift");
        }
    };

    return (
        <div className="adm-page">
            <h2 className="adm-h2">Shifts Management</h2>
            <p className="adm-sub">Assign and manage receptionist shifts and schedules.</p>

            <div className="adm-list-head">
                <div className="adm-search">
                    <input placeholder="Search shifts..." value={filter} onChange={e => setFilter(e.target.value)} />
                </div>
            </div>

            <form className="adm-card" onSubmit={submit} style={{ marginTop: 12, display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr auto" }}>
                <select className="adm-inp" value={form.receptionistId} onChange={handleReceptionistChange} required>
                    <option value="">Select Receptionist</option>
                    {receptionists.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                </select>
                <input className="adm-inp" type="date" placeholder="Date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
                <input className="adm-inp" type="time" placeholder="Start Time" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} required />
                <input className="adm-inp" type="time" placeholder="End Time" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} required />
                <input className="adm-inp" placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
                <select className="adm-inp" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                </select>
                <button className="adm-right-btn" type="submit">{editingId ? "Save" : "+ Add Shift"}</button>
            </form>

            <div className="adm-card" style={{ marginTop: 12 }}>
                <table className="adm-table">
                    <thead>
                        <tr>
                            <th>Receptionist</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visible.map(r => (
                            <tr key={r.id}>
                                <td>{r.receptionistName}</td>
                                <td>{r.date}</td>
                                <td>{r.startTime} - {r.endTime}</td>
                                <td>{r.role}</td>
                                <td>
                                    <span className={`adm-chip ${r.status === "Confirmed" ? "chip-green" : r.status === "Cancelled" ? "chip-red" : "chip-yellow"}`}>
                                        {r.status}
                                    </span>
                                </td>
                                <td className="adm-actions">
                                    <button className="link" onClick={() => {
                                        setEditingId(r.id);
                                        setEditingRecId(r.receptionistId);
                                        setForm({
                                            receptionistId: r.receptionistId,
                                            receptionistName: r.receptionistName,
                                            date: r.date,
                                            startTime: r.startTime,
                                            endTime: r.endTime,
                                            role: r.role,
                                            status: r.status
                                        });
                                    }}>Edit</button>
                                    <button className="link link-danger" onClick={() => handleDelete(r)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {!visible.length && <tr><td colSpan="6" className="adm-muted">No shifts yet.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
