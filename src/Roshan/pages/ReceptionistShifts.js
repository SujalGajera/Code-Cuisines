import React, { useState } from "react";

export default function ReceptionistShifts() {
  const [shifts, setShifts] = useState([
    { id: 1, staff: "Sarah Anderson", role: "Receptionist", date: "Nov 7", time: "9:00 AM - 5:00 PM" },
    { id: 2, staff: "John Smith", role: "Waiter", date: "Nov 7", time: "5:00 PM - 11:00 PM" },
    { id: 3, staff: "Alice Brown", role: "Chef", date: "Nov 8", time: "8:00 AM - 4:00 PM" },
  ]);

  return (
    <div className="cb-page">
      <h2 style={{ marginBottom: "20px" }}>Staff Shifts</h2>

      <div className="cb-top-actions">
        <button className="cb-add">+ Add Shift</button>
      </div>

      <div className="cb-tablecard">
        <table className="cb-table">
          <thead>
            <tr>
              <th>Staff</th>
              <th>Role</th>
              <th>Date</th>
              <th>Time</th>
              <th className="right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id}>
                <td>{shift.staff}</td>
                <td>{shift.role}</td>
                <td>{shift.date}</td>
                <td>{shift.time}</td>
                <td className="right">
                  <button className="cb-link">Edit</button>
                  <button className="cb-link danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
