import React from "react";

export default function ReceptionistShifts() {
  const shifts = [
    { date: "Nov 4", start: "09:00 AM", end: "05:00 PM" },
    { date: "Nov 5", start: "11:00 AM", end: "07:00 PM" },
    { date: "Nov 6", start: "10:00 AM", end: "06:00 PM" },
  ];

  return (
    <div className="reception-card">
      <div className="reception-content">
        <h3>Upcoming Shifts</h3>
        <table className="cb-table" style={{ marginTop: "16px" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((s, i) => (
              <tr key={i}>
                <td>{s.date}</td>
                <td>{s.start}</td>
                <td>{s.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
