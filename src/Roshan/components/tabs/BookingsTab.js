import React from "react";

export default function BookingsTab({
  bookings,
  setBookings, // not used but kept for future
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filtered,
  openAdd,
  openEdit,
  showModal,
  setShowModal,
  formData,
  setFormData,
  saveBooking,
  deleteBooking,
  isEditing,
}) {
  return (
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
              <option>Fulfilled</option>
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
  );
}
