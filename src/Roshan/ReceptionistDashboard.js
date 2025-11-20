// Author: Roshan Dhakal
// Date: November 2025
// Description: Receptionist Dashboard (clean UI + bookings + staff orders + profile + shifts)

import React, { useMemo, useState, useEffect, useRef } from "react";
import "./ReceptionistDashboard.css";

export default function ReceptionistDashboard() {
  // -----------------------
  // TAB SELECTION
  // -----------------------
  const [activeTab, setActiveTab] = useState("bookings"); // "profile" | "bookings" | "staff" | "shifts"

  // =======================
  // 0) PROFILE
  // =======================

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("receptionProfile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Roshan Dhakal",
          email: "roshandhakal788@gmail.com",
          phone: "021 000 0000",
          role: "Receptionist",
          avatar: "",
          skills: ["Front Counter", "Table Bookings"],
        };
  });

  const [profileDraft, setProfileDraft] = useState(profile);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    localStorage.setItem("receptionProfile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    setProfileDraft(profile);
  }, [profile]);

  const handleAvatarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileDraft((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleProfileFieldChange = (field, value) => {
    setProfileDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (
      profileDraft.skills &&
      profileDraft.skills.find(
        (s) => s.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      setNewSkill("");
      return;
    }

    setProfileDraft((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), trimmed],
    }));
    setNewSkill("");
  };

  const removeSkill = (skill) => {
    setProfileDraft((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((s) => s !== skill),
    }));
  };

  const saveProfile = () => {
    setProfile(profileDraft);
    alert("Profile updated successfully.");
  };

  const resetProfileDraft = () => {
    setProfileDraft(profile);
  };

  // =======================
  // HEADER DATE
  // =======================

  const [selectedDate, setSelectedDate] = useState(() => {
    const saved = localStorage.getItem("receptionDate");
    return saved || "2025-11-07";
  });

  useEffect(() => {
    localStorage.setItem("receptionDate", selectedDate);
  }, [selectedDate]);

  const dateInputRef = useRef(null);

  const formatDateLabel = (iso) => {
    if (!iso) return "Pick a date";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "Pick a date";
    const options = { month: "short", day: "numeric", year: "numeric" };
    return d.toLocaleDateString("en-US", options);
  };

  const openDatePicker = () => {
    if (!dateInputRef.current) return;
    if (dateInputRef.current.showPicker) {
      dateInputRef.current.showPicker();
    } else {
      dateInputRef.current.click();
    }
  };

  // =======================
  // 1) CUSTOMER BOOKINGS
  // =======================

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "John Smith",
            contact: "021 456 98724",
            date: "Oct 7",
            time: "7:30 PM",
            table: "Table 3",
            status: "Confirmed",
          },
          {
            id: 2,
            name: "Alice Brown",
            contact: "027 321 65425",
            date: "Oct 1",
            time: "1:00 PM",
            table: "Table 5",
            status: "Pending",
          },
          {
            id: 3,
            name: "David Clark",
            contact: "020 345 78926",
            date: "Oct 6",
            time: "6:45 PM",
            table: "Table 1",
            status: "Cancelled",
          },
          {
            id: 4,
            name: "Maria Lopez",
            contact: "029 876 54326",
            date: "Oct 8",
            time: "8:00 PM",
            table: "Table 7",
            status: "Confirmed",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    contact: "",
    date: "",
    time: "",
    table: "",
    status: "Pending",
  });

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return bookings.filter(
      (b) =>
        (filterStatus === "All" || b.status === filterStatus) &&
        (b.name.toLowerCase().includes(q) ||
          b.contact.toLowerCase().includes(q) ||
          b.table.toLowerCase().includes(q))
    );
  }, [searchTerm, filterStatus, bookings]);

  const openAdd = () => {
    setIsEditing(false);
    setFormData({
      id: null,
      name: "",
      contact: "",
      date: "",
      time: "",
      table: "",
      status: "Pending",
    });
    setShowModal(true);
  };

  const openEdit = (b) => {
    setIsEditing(true);
    setFormData({ ...b });
    setShowModal(true);
  };

  const saveBooking = () => {
    if (
      !formData.name ||
      !formData.contact ||
      !formData.date ||
      !formData.time ||
      !formData.table
    ) {
      alert("Please fill all fields");
      return;
    }

    if (isEditing) {
      setBookings((prev) =>
        prev.map((x) => (x.id === formData.id ? formData : x))
      );
    } else {
      setBookings((prev) => [{ ...formData, id: Date.now() }, ...prev]);
    }

    setShowModal(false);
  };

  const deleteBooking = (id) => {
    if (window.confirm("Delete this booking?")) {
      setBookings((prev) => prev.filter((x) => x.id !== id));
    }
  };

  // =======================
  // 2) STAFF ORDERS
  // =======================

  const [orderSearch, setOrderSearch] = useState("");
  const [orderFilter, setOrderFilter] = useState("All");

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("staffOrders");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            customer: "John Smith",
            item: "Pizza",
            qty: 2,
            table: "Table 3",
            status: "Confirmed",
          },
          {
            id: 2,
            customer: "Alice Brown",
            item: "Burger",
            qty: 1,
            table: "Table 5",
            status: "Served",
          },
          {
            id: 3,
            customer: "David Clark",
            item: "Pasta",
            qty: 1,
            table: "Table 1",
            status: "Pending",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("staffOrders", JSON.stringify(orders));
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const q = orderSearch.toLowerCase();
    return orders.filter(
      (o) =>
        (orderFilter === "All" || o.status === orderFilter) &&
        (String(o.id).includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          o.item.toLowerCase().includes(q) ||
          o.table.toLowerCase().includes(q))
    );
  }, [orders, orderSearch, orderFilter]);

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderEditing, setOrderEditing] = useState(false);
  const [orderForm, setOrderForm] = useState({
    id: "",
    customer: "",
    item: "",
    qty: 1,
    table: "",
    status: "Pending",
  });

  const openOrderAdd = () => {
    setOrderEditing(false);
    setOrderForm({
      id: "",
      customer: "",
      item: "",
      qty: 1,
      table: "",
      status: "Pending",
    });
    setOrderModalOpen(true);
  };

  const openOrderEdit = (order) => {
    setOrderEditing(true);
    setOrderForm({ ...order });
    setOrderModalOpen(true);
  };

  const saveOrder = () => {
    if (
      !orderForm.customer ||
      !orderForm.item ||
      !orderForm.qty ||
      !orderForm.table
    ) {
      alert("Please fill all fields");
      return;
    }

    if (orderEditing) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderForm.id ? orderForm : o))
      );
    } else {
      const newId =
        orderForm.id ||
        (orders.length ? Math.max(...orders.map((o) => o.id)) + 1 : 1);

      setOrders((prev) => [{ ...orderForm, id: newId }, ...prev]);
    }
    setOrderModalOpen(false);
  };

  const deleteOrder = (id) => {
    if (window.confirm("Delete this order?")) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  };

  // =======================
  // 3) SHIFTS
  // =======================

  const [shifts, setShifts] = useState(() => {
    const saved = localStorage.getItem("receptionShifts");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            staff: "Roshan Dhakal",
            role: "Receptionist",
            date: "2025-11-07",
            start: "09:00",
            end: "17:00",
            status: "Scheduled",
          },
          {
            id: 2,
            staff: "Alice Brown",
            role: "Wait Staff",
            date: "2025-11-07",
            start: "12:00",
            end: "20:00",
            status: "Completed",
          },
          {
            id: 3,
            staff: "David Clark",
            role: "Host",
            date: "2025-11-08",
            start: "10:00",
            end: "18:00",
            status: "Scheduled",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("receptionShifts", JSON.stringify(shifts));
  }, [shifts]);

  const [shiftFilter, setShiftFilter] = useState("All");
  const [shiftModalOpen, setShiftModalOpen] = useState(false);
  const [shiftEditing, setShiftEditing] = useState(false);
  const [shiftForm, setShiftForm] = useState({
    id: "",
    staff: "",
    role: "",
    date: selectedDate,
    start: "09:00",
    end: "17:00",
    status: "Scheduled",
  });

  const filteredShifts = useMemo(() => {
    return shifts.filter(
      (s) => shiftFilter === "All" || s.status === shiftFilter
    );
  }, [shifts, shiftFilter]);

  const openShiftAdd = () => {
    setShiftEditing(false);
    setShiftForm({
      id: "",
      staff: profile.name || "Receptionist",
      role: profile.role || "Receptionist",
      date: selectedDate,
      start: "09:00",
      end: "17:00",
      status: "Scheduled",
    });
    setShiftModalOpen(true);
  };

  const openShiftEdit = (shift) => {
    setShiftEditing(true);
    setShiftForm({ ...shift });
    setShiftModalOpen(true);
  };

  const saveShift = () => {
    if (
      !shiftForm.staff ||
      !shiftForm.role ||
      !shiftForm.date ||
      !shiftForm.start ||
      !shiftForm.end
    ) {
      alert("Please fill all fields");
      return;
    }

    if (shiftEditing) {
      setShifts((prev) =>
        prev.map((s) => (s.id === shiftForm.id ? shiftForm : s))
      );
    } else {
      const newId =
        shiftForm.id ||
        (shifts.length ? Math.max(...shifts.map((s) => s.id)) + 1 : 1);
      setShifts((prev) => [{ ...shiftForm, id: newId }, ...prev]);
    }
    setShiftModalOpen(false);
  };

  const deleteShift = (id) => {
    if (window.confirm("Delete this shift?")) {
      setShifts((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // =======================
  // RENDER
  // =======================

  return (
    <div className="cb-page">
      {/* HEADER */}
      <header className="cb-brandbar">
        <div className="cb-brand-left">
          <span className="cb-title">Receptionist Dashboard</span>
        </div>

        {/* TABS inside navbar */}
        <div className="cb-tabs-inside">
          <button
            className={`cb-chip ${
              activeTab === "profile" ? "cb-chip--active" : ""
            }`}
            onClick={() => {
              setProfileDraft(profile);
              setActiveTab("profile");
            }}
          >
            👤 Profile
          </button>

          <button
            className={`cb-chip ${
              activeTab === "bookings" ? "cb-chip--active" : ""
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            🧾 Customer Booking
          </button>

          <button
            className={`cb-chip ${
              activeTab === "shifts" ? "cb-chip--active" : ""
            }`}
            onClick={() => setActiveTab("shifts")}
          >
            ⏰ Shifts
          </button>

          <button
            className={`cb-chip ${
              activeTab === "staff" ? "cb-chip--active" : ""
            }`}
            onClick={() => setActiveTab("staff")}
          >
            👥 Staff
          </button>
        </div>

        <div className="cb-brand-right-row">
          {/* date pill with calendar */}
          <span
            className="cb-pill"
            style={{ cursor: "pointer" }}
            onClick={openDatePicker}
          >
            📅 {formatDateLabel(selectedDate)}
          </span>

          {/* hidden date input for native calendar */}
          <input
            type="date"
            ref={dateInputRef}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ display: "none" }}
          />

          {/* name pill */}
          <span
            className="cb-pill"
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("profile")}
          >
            {profile.name || "Receptionist"}
          </span>

          {/* 🔹 NEW LOGOUT BUTTON 🔹 */}
          <button
            className="cb-pill"
            style={{
              marginLeft: "8px",
              background: "#9b4a0f",
              color: "white",
              border: "none",
              cursor: "pointer",
              padding: "0 14px",
              fontSize: "14px",
              borderRadius: "20px",
            }}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* PROFILE */}
      {activeTab === "profile" && (
        <div
          className="cb-tablecard"
          style={{ maxWidth: 960, margin: "32px auto" }}
        >
          <div
            style={{
              display: "flex",
              gap: "32px",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* Avatar */}
            <div style={{ minWidth: 180, textAlign: "center" }}>
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#ffe8d9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#9b4a0f",
                  margin: "0 auto 12px",
                }}
              >
                {profileDraft.avatar ? (
                  <img
                    src={profileDraft.avatar}
                    alt="Avatar"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  (profileDraft.name || "R").charAt(0).toUpperCase()
                )}
              </div>

              <label
                className="cb-add"
                style={{
                  display: "inline-block",
                  padding: "0.45rem 0.9rem",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            {/* Profile form */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: 16,
                  fontSize: 22,
                  color: "#2f1f1f",
                }}
              >
                Profile Details
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px 24px",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#3c2c2c",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileDraft.name}
                    onChange={(e) =>
                      handleProfileFieldChange("name", e.target.value)
                    }
                    className="input-clean"
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#3c2c2c",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    value={profileDraft.role}
                    onChange={(e) =>
                      handleProfileFieldChange("role", e.target.value)
                    }
                    className="input-clean"
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#3c2c2c",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={profileDraft.email}
                    onChange={(e) =>
                      handleProfileFieldChange("email", e.target.value)
                    }
                    className="input-clean"
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#3c2c2c",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={profileDraft.phone}
                    onChange={(e) =>
                      handleProfileFieldChange("phone", e.target.value)
                    }
                    className="input-clean"
                  />
                </div>
              </div>

              {/* Skills */}
              <div style={{ marginTop: 24 }}>
                <label
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#3c2c2c",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Responsibilities / Skills
                </label>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  {(profileDraft.skills || []).map((skill) => (
                    <span
                      key={skill}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: "#fff3e0",
                        fontSize: 13,
                        color: "#8a4510",
                        border: "1px solid #f3d2a3",
                      }}
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          fontSize: 14,
                          lineHeight: 1,
                          color: "#c35a0c",
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {(!profileDraft.skills || profileDraft.skills.length === 0) && (
                    <span style={{ fontSize: 13, color: "#7a6e6e" }}>
                      No skills added yet.
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    maxWidth: 360,
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Add new skill (e.g. Walk-ins)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    className="input-clean"
                  />
                  <button
                    type="button"
                    className="cb-add"
                    style={{ padding: "0.55rem 0.9rem", whiteSpace: "nowrap" }}
                    onClick={addSkill}
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div
                className="cb-modal-actions"
                style={{ marginTop: 28, justifyContent: "flex-end" }}
              >
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetProfileDraft}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="save-btn"
                  onClick={saveProfile}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKINGS */}
      {activeTab === "bookings" && (
        <>
          <div className="cb-actionbar">
            <input
              type="text"
              className="cb-search"
              placeholder="Search bookings…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button className="cb-add" onClick={openAdd}>
              + Add New Booking
            </button>

            <div className="cb-filterbar">
              <label>Filter:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option>All</option>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          <div className="cb-tablecard">
            <table className="cb-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Table</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="cb-row">
                    <td onClick={() => openEdit(b)}>{b.name}</td>
                    <td onClick={() => openEdit(b)}>{b.contact}</td>
                    <td onClick={() => openEdit(b)}>{b.date}</td>
                    <td onClick={() => openEdit(b)}>{b.time}</td>
                    <td onClick={() => openEdit(b)}>{b.table}</td>

                    <td onClick={() => openEdit(b)}>
                      <span className={`cb-badge ${b.status.toLowerCase()}`}>
                        {b.status}
                      </span>
                    </td>

                    <td>
                      <div className="cb-actions-col">
                        <button
                          className="edit-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEdit(b);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteBooking(b.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && (
            <div
              className="cb-modal-backdrop"
              onClick={(e) =>
                e.target === e.currentTarget && setShowModal(false)
              }
            >
              <div className="cb-modal">
                <h2>{isEditing ? "Edit Booking" : "New Booking"}</h2>

                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Contact"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Table"
                  value={formData.table}
                  onChange={(e) =>
                    setFormData({ ...formData, table: e.target.value })
                  }
                />

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Cancelled</option>
                </select>

                <div className="cb-modal-actions">
                  <button className="save-btn" onClick={saveBooking}>
                    {isEditing ? "Save Changes" : "Create"}
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* STAFF */}
      {activeTab === "staff" && (
        <>
          <div className="cb-actionbar">
            <input
              type="text"
              className="cb-search"
              placeholder="Search orders…"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
            />

            <button className="cb-add" onClick={openOrderAdd}>
              + Add New Order
            </button>

            <div className="cb-filterbar">
              <label>Filter:</label>
              <select
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value)}
              >
                <option>All</option>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Served</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          <div className="cb-tablecard">
            <table className="cb-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Item Name</th>
                  <th>Qty</th>
                  <th>Table</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="cb-row">
                    <td>{o.id}</td>
                    <td>{o.customer}</td>
                    <td>{o.item}</td>
                    <td>{o.qty}</td>
                    <td>{o.table}</td>
                    <td>
                      <span className={`cb-badge ${o.status.toLowerCase()}`}>
                        {o.status}
                      </span>
                    </td>
                    <td>
                      <div className="cb-actions-col">
                        <button
                          className="edit-btn"
                          onClick={() => openOrderEdit(o)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteOrder(o.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orderModalOpen && (
            <div
              className="cb-modal-backdrop"
              onClick={(e) =>
                e.target === e.currentTarget && setOrderModalOpen(false)
              }
            >
              <div className="cb-modal">
                <h2>{orderEditing ? "Edit Order" : "New Order"}</h2>

                <input
                  type="text"
                  placeholder="Order ID (optional)"
                  value={orderForm.id}
                  onChange={(e) =>
                    setOrderForm({
                      ...orderForm,
                      id: e.target.value ? Number(e.target.value) : "",
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Customer"
                  value={orderForm.customer}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, customer: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Item Name"
                  value={orderForm.item}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, item: e.target.value })
                  }
                />

                <input
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  value={orderForm.qty}
                  onChange={(e) =>
                    setOrderForm({
                      ...orderForm,
                      qty: Number(e.target.value),
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Table"
                  value={orderForm.table}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, table: e.target.value })
                  }
                />

                <select
                  value={orderForm.status}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, status: e.target.value })
                  }
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Served</option>
                  <option>Cancelled</option>
                </select>

                <div className="cb-modal-actions">
                  <button className="save-btn" onClick={saveOrder}>
                    {orderEditing ? "Save Changes" : "Create"}
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setOrderModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* SHIFTS */}
      {activeTab === "shifts" && (
        <>
          <div className="cb-actionbar">
            <button className="cb-add" onClick={openShiftAdd}>
              + Add New Shift
            </button>

            <div className="cb-filterbar">
              <label>Filter:</label>
              <select
                value={shiftFilter}
                onChange={(e) => setShiftFilter(e.target.value)}
              >
                <option>All</option>
                <option>Scheduled</option>
                <option>Completed</option>
                <option>Off</option>
                <option>Sick</option>
              </select>
            </div>
          </div>

          <div className="cb-tablecard">
            <table className="cb-table">
              <thead>
                <tr>
                  <th>Shift ID</th>
                  <th>Staff</th>
                  <th>Role</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredShifts.map((s) => (
                  <tr key={s.id} className="cb-row">
                    <td>{s.id}</td>
                    <td>{s.staff}</td>
                    <td>{s.role}</td>
                    <td>{formatDateLabel(s.date)}</td>
                    <td>
                      {s.start} – {s.end}
                    </td>
                    <td>
                      <span className={`cb-badge ${s.status.toLowerCase()}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <div className="cb-actions-col">
                        <button
                          className="edit-btn"
                          onClick={() => openShiftEdit(s)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteShift(s.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {shiftModalOpen && (
            <div
              className="cb-modal-backdrop"
              onClick={(e) =>
                e.target === e.currentTarget && setShiftModalOpen(false)
              }
            >
              <div className="cb-modal">
                <h2>{shiftEditing ? "Edit Shift" : "New Shift"}</h2>

                <input
                  type="text"
                  placeholder="Shift ID (optional)"
                  value={shiftForm.id}
                  onChange={(e) =>
                    setShiftForm({
                      ...shiftForm,
                      id: e.target.value ? Number(e.target.value) : "",
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Staff Name"
                  value={shiftForm.staff}
                  onChange={(e) =>
                    setShiftForm({ ...shiftForm, staff: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Role"
                  value={shiftForm.role}
                  onChange={(e) =>
                    setShiftForm({ ...shiftForm, role: e.target.value })
                  }
                />

                <input
                  type="date"
                  value={shiftForm.date}
                  onChange={(e) =>
                    setShiftForm({ ...shiftForm, date: e.target.value })
                  }
                />

                <input
                  type="time"
                  value={shiftForm.start}
                  onChange={(e) =>
                    setShiftForm({ ...shiftForm, start: e.target.value })
                  }
                />

                <input
                  type="time"
                  value={shiftForm.end}
                  onChange={(e) =>
                    setShiftForm({ ...shiftForm, end: e.target.value })
                  }
                />

                <select
                  value={shiftForm.status}
                  onChange={(e) =>
                    setShiftForm({ ...shiftForm, status: e.target.value })
                  }
                >
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Off</option>
                  <option>Sick</option>
                </select>

                <div className="cb-modal-actions">
                  <button className="save-btn" onClick={saveShift}>
                    {shiftEditing ? "Save Changes" : "Create"}
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setShiftModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
