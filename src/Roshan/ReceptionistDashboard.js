// Author: Roshan Dhakal
// Date: November 2025
// Description: Receptionist Dashboard (clean UI + bookings + staff orders + profile + shifts)

import React, { useMemo, useState, useEffect, useRef } from "react";
import "./ReceptionistDashboard.css";

import ProfileTab from "./components/tabs/ProfileTab";
import BookingsTab from "./components/tabs/BookingsTab";
import StaffTab from "./components/tabs/StaffTab";
import ShiftsTab from "./components/tabs/ShiftsTab";

export default function ReceptionistDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");

  // PROFILE
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
      setProfileDraft((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleProfileFieldChange = (field, value) => {
    setProfileDraft((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (profileDraft.skills.find((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setNewSkill("");
      return;
    }
    setProfileDraft((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setNewSkill("");
  };

  const removeSkill = (skill) => {
    setProfileDraft((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const saveProfile = () => {
    setProfile(profileDraft);
    alert("Profile updated successfully.");
  };

  const resetProfileDraft = () => {
    setProfileDraft(profile);
  };

  // DATE
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
    if (dateInputRef.current.showPicker) dateInputRef.current.showPicker();
    else dateInputRef.current.click();
  };

  // BOOKINGS
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "John Smith", contact: "021 456 98724", date: "Oct 7", time: "7:30 PM", table: "Table 3", status: "Confirmed" },
          { id: 2, name: "Alice Brown", contact: "027 321 65425", date: "Oct 1", time: "1:00 PM", table: "Table 5", status: "Pending" },
          { id: 3, name: "David Clark", contact: "020 345 78926", date: "Oct 6", time: "6:45 PM", table: "Table 1", status: "Cancelled" },
          { id: 4, name: "Maria Lopez", contact: "029 876 54326", date: "Oct 8", time: "8:00 PM", table: "Table 7", status: "Confirmed" },
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
    setFormData({ id: null, name: "", contact: "", date: "", time: "", table: "", status: "Pending" });
    setShowModal(true);
  };

  const openEdit = (b) => {
    setIsEditing(true);
    setFormData({ ...b });
    setShowModal(true);
  };

  const saveBooking = () => {
    if (!formData.name || !formData.contact || !formData.date || !formData.time || !formData.table) {
      alert("Please fill all fields");
      return;
    }
    if (isEditing) {
      setBookings((prev) => prev.map((x) => (x.id === formData.id ? formData : x)));
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

  // STAFF
  const [orderSearch, setOrderSearch] = useState("");
  const [orderFilter, setOrderFilter] = useState("All");

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("staffOrders");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, customer: "John Smith", item: "Pizza", qty: 2, table: "Table 3", status: "Confirmed" },
          { id: 2, customer: "Alice Brown", item: "Burger", qty: 1, table: "Table 5", status: "Served" },
          { id: 3, customer: "David Clark", item: "Pasta", qty: 1, table: "Table 1", status: "Pending" },
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
    setOrderForm({ id: "", customer: "", item: "", qty: 1, table: "", status: "Pending" });
    setOrderModalOpen(true);
  };

  const openOrderEdit = (order) => {
    setOrderEditing(true);
    setOrderForm({ ...order });
    setOrderModalOpen(true);
  };

  const saveOrder = () => {
    if (!orderForm.customer || !orderForm.item || !orderForm.qty || !orderForm.table) {
      alert("Please fill all fields");
      return;
    }
    if (orderEditing) {
      setOrders((prev) => prev.map((o) => (o.id === orderForm.id ? orderForm : o)));
    } else {
      const newId = orderForm.id || (orders.length ? Math.max(...orders.map((o) => o.id)) + 1 : 1);
      setOrders((prev) => [{ ...orderForm, id: newId }, ...prev]);
    }
    setOrderModalOpen(false);
  };

  const deleteOrder = (id) => {
    if (window.confirm("Delete this order?")) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  };

  // SHIFTS
  const [shifts, setShifts] = useState(() => {
    const saved = localStorage.getItem("receptionShifts");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, staff: "Roshan Dhakal", role: "Receptionist", date: "2025-11-07", start: "09:00", end: "17:00", status: "Scheduled" },
          { id: 2, staff: "Alice Brown", role: "Wait Staff", date: "2025-11-07", start: "12:00", end: "20:00", status: "Completed" },
          { id: 3, staff: "David Clark", role: "Host", date: "2025-11-08", start: "10:00", end: "18:00", status: "Scheduled" },
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
    return shifts.filter((s) => shiftFilter === "All" || s.status === shiftFilter);
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
    if (!shiftForm.staff || !shiftForm.role || !shiftForm.date || !shiftForm.start || !shiftForm.end) {
      alert("Please fill all fields");
      return;
    }
    if (shiftEditing) {
      setShifts((prev) => prev.map((s) => (s.id === shiftForm.id ? shiftForm : s)));
    } else {
      const newId = shiftForm.id || (shifts.length ? Math.max(...shifts.map((s) => s.id)) + 1 : 1);
      setShifts((prev) => [{ ...shiftForm, id: newId }, ...prev]);
    }
    setShiftModalOpen(false);
  };

  const deleteShift = (id) => {
    if (window.confirm("Delete this shift?")) {
      setShifts((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // UI
  return (
    <div className="cb-page">
      <header className="cb-brandbar">
        <div className="cb-brand-left">
          <span className="cb-title">Receptionist Dashboard</span>
        </div>

        <div className="cb-tabs-inside">
          <button className={`cb-chip ${activeTab === "profile" ? "cb-chip--active" : ""}`} onClick={() => setActiveTab("profile")}>
            👤 Profile
          </button>
          <button className={`cb-chip ${activeTab === "bookings" ? "cb-chip--active" : ""}`} onClick={() => setActiveTab("bookings")}>
            🧾 Customer Booking
          </button>
          <button className={`cb-chip ${activeTab === "shifts" ? "cb-chip--active" : ""}`} onClick={() => setActiveTab("shifts")}>
            ⏰ Shifts
          </button>
          <button className={`cb-chip ${activeTab === "staff" ? "cb-chip--active" : ""}`} onClick={() => setActiveTab("staff")}>
            👥 Staff
          </button>
        </div>

        <div className="cb-brand-right-row">
          <span className="cb-pill" style={{ cursor: "pointer" }} onClick={openDatePicker}>
            📅 {formatDateLabel(selectedDate)}
          </span>

          <input type="date" ref={dateInputRef} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ display: "none" }} />

          <span className="cb-pill" style={{ cursor: "pointer" }} onClick={() => setActiveTab("profile")}>
            {profile.name || "Receptionist"}
          </span>

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

      {activeTab === "profile" && (
        <ProfileTab
          profile={profile}
          profileDraft={profileDraft}
          setProfileDraft={setProfileDraft}
          newSkill={newSkill}
          setNewSkill={setNewSkill}
          addSkill={addSkill}
          removeSkill={removeSkill}
          saveProfile={saveProfile}
          resetProfileDraft={resetProfileDraft}
          handleAvatarChange={handleAvatarChange}
          handleProfileFieldChange={handleProfileFieldChange}
        />
      )}

      {activeTab === "bookings" && (
        <BookingsTab
          bookings={bookings}
          setBookings={setBookings}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filtered={filtered}
          openAdd={openAdd}
          openEdit={openEdit}
          showModal={showModal}
          setShowModal={setShowModal}
          formData={formData}
          setFormData={setFormData}
          saveBooking={saveBooking}
          deleteBooking={deleteBooking}
          isEditing={isEditing}
        />
      )}

      {activeTab === "staff" && (
        <StaffTab
          orders={orders}
          setOrders={setOrders}
          orderSearch={orderSearch}
          setOrderSearch={setOrderSearch}
          orderFilter={orderFilter}
          setOrderFilter={setOrderFilter}
          filteredOrders={filteredOrders}
          openOrderAdd={openOrderAdd}
          openOrderEdit={openOrderEdit}
          orderModalOpen={orderModalOpen}
          setOrderModalOpen={setOrderModalOpen}
          orderForm={orderForm}
          setOrderForm={setOrderForm}
          orderEditing={orderEditing}
          saveOrder={saveOrder}
          deleteOrder={deleteOrder}
        />
      )}

      {activeTab === "shifts" && (
        <ShiftsTab
          profile={profile}
          selectedDate={selectedDate}
          shifts={shifts}
          setShifts={setShifts}
          shiftFilter={shiftFilter}
          setShiftFilter={setShiftFilter}
          filteredShifts={filteredShifts}
          openShiftAdd={openShiftAdd}
          openShiftEdit={openShiftEdit}
          shiftModalOpen={shiftModalOpen}
          setShiftModalOpen={setShiftModalOpen}
          shiftForm={shiftForm}
          setShiftForm={setShiftForm}
          shiftEditing={shiftEditing}
          saveShift={saveShift}
          deleteShift={deleteShift}
          formatDateLabel={formatDateLabel}
        />
      )}

    </div>
  );
}
