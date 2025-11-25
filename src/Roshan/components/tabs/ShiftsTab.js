import React from "react";

export default function ShiftsTab({
  profile, // not used but available
  selectedDate,
  shifts,
  setShifts, // not used here, kept
  shiftFilter,
  setShiftFilter,
  filteredShifts,
  openShiftAdd,
  openShiftEdit,
  shiftModalOpen,
  setShiftModalOpen,
  shiftForm,
  setShiftForm,
  shiftEditing,
  saveShift,
  deleteShift,
  formatDateLabel,
}) {
  return (
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
  );
}
