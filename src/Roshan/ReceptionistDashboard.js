// Author: Roshan Dhakal
// Date: November 2025
// Description: Receptionist Dashboard (Bookings + Summary Section)

import React from "react";
import "./ReceptionistDashboard.css";

export default function ReceptionistDashboard() {
  return (
    <div className="receptionist-page">
      <div className="cb-page">
        {/* -------- Header -------- */}
        <header className="cb-brandbar">
          <div className="cb-brand-left">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1048/1048315.png"
              alt="logo"
              className="cb-logo"
            />
            <span className="cb-title">Code & Cuisine</span>
          </div>

          <div className="cb-brand-right">
            <div className="cb-pill">Tuesday, Nov 4</div>
            <div className="cb-pill">Sarah Anderson</div>
            <button className="cb-add">Login/Register</button>
          </div>
        </header>

        {/* -------- Reception Section -------- */}
        <section className="cb-toprow" style={{ marginTop: "25px" }}>
          <div
            style={{
              background: "linear-gradient(90deg,#f57c00,#ff9b2b)",
              color: "#fff",
              borderRadius: "12px",
              padding: "20px",
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>MediCare Reception</h2>
            <div className="cb-brand-right">
              <div className="cb-pill">📅 Tuesday, Nov 4</div>
              <div className="cb-pill">Sarah Anderson</div>
            </div>
          </div>
        </section>

        {/* -------- Toggle Buttons -------- */}
        <div className="cb-togglebar">
          <button className="cb-link">👤 Profile</button>
          <button className="cb-link active">📋 Bookings</button>
          <button className="cb-link">⏰ Shifts</button>
        </div>

        {/* -------- Bookings Section -------- */}
        <section className="cb-bookings">
          <div className="cb-booking-header">
            <h2>Receptionist Bookings</h2>
            <div className="cb-search">
              <input type="text" placeholder="Search bookings..." />
            </div>
            <div className="cb-pill">Sarah Anderson</div>
          </div>

          {/* Summary + Actions Row */}
          <div className="cb-toprow">
            <div className="cb-summary">
              <h3>Booking Summary</h3>
              <div className="cb-summary-kv">
                <strong>Total</strong> <span>5</span>
              </div>
              <div className="cb-summary-kv">
                <strong>Pending</strong> <span>2</span>
              </div>
              <div className="cb-summary-kv">
                <strong>Confirmed</strong> <span>2</span>
              </div>
              <div className="cb-summary-kv">
                <strong>Cancelled</strong> <span>1</span>
              </div>
            </div>

            <div className="cb-top-actions">
              <button className="cb-add">+ Add New Booking</button>
              <div className="cb-filterbar">
                <label>Filter by Status:</label>
                <select>
                  <option>All</option>
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* -------- Table -------- */}
          <div className="cb-tablecard">
            <table className="cb-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Contact</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Table</th>
                  <th>Status</th>
                  <th className="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><button className="cb-name">John Smith</button></td>
                  <td>021 456 98724</td>
                  <td>Oct 7</td>
                  <td>7:30 PM</td>
                  <td>Table 3</td>
                  <td><span className="cb-badge confirmed">Confirmed</span></td>
                  <td className="right">
                    <button className="cb-link">Edit</button>
                    <button className="cb-link danger">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td><button className="cb-name">Alice Brown</button></td>
                  <td>027 321 65425</td>
                  <td>Oct 1</td>
                  <td>1:00 PM</td>
                  <td>Table 5</td>
                  <td><span className="cb-badge pending">Pending</span></td>
                  <td className="right">
                    <button className="cb-link">Edit</button>
                    <button className="cb-link danger">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td><button className="cb-name">David Clark</button></td>
                  <td>020 345 78926</td>
                  <td>Oct 6</td>
                  <td>6:45 PM</td>
                  <td>Table 1</td>
                  <td><span className="cb-badge cancelled">Cancelled</span></td>
                  <td className="right">
                    <button className="cb-link">Edit</button>
                    <button className="cb-link danger">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td><button className="cb-name">Maria Lopez</button></td>
                  <td>029 876 54326</td>
                  <td>Oct 8</td>
                  <td>8:00 PM</td>
                  <td>Table 7</td>
                  <td><span className="cb-badge confirmed">Confirmed</span></td>
                  <td className="right">
                    <button className="cb-link">Edit</button>
                    <button className="cb-link danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
