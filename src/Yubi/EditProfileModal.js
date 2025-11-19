// src/components/EditProfileModal.js
import React, { useState, useEffect } from "react";
import "./EditProfileModal.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  currentUser,
  onSave,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
      });
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />

          <label>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
          />

          <label>Address</label>
          <input
            name="address"
            value={form.address}
            onChange={onChange}
          />

          <div className="modal-actions">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
