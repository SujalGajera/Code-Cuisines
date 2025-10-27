import React, { useState } from "react";
import "./StaffDashboard.css";
import logo from "./logo.png"; // optional - you can remove if no logo

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("signup");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "signup") {
      console.log("Create Account:", form);
      alert("Create Account clicked!");
    } else {
      console.log("Login:", { email: form.email, password: form.password });
      alert("Login clicked!");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        {/* optional logo */}
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <img src={logo} alt="logo" style={{ width: 72, opacity: 0.95 }} />
        </div>

        <h2>Staff Dashboard</h2>
        <p className="subtitle">Access your work dashboard</p>

        <div className="tab-container">
          <button
            className={activeTab === "login" ? "tab active" : "tab"}
            onClick={() => setActiveTab("login")}
            type="button"
          >
            Login
          </button>
          <button
            className={activeTab === "signup" ? "tab active" : "tab"}
            onClick={() => setActiveTab("signup")}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {activeTab === "signup" && (
            <>
              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                required
              />
            </>
          )}

          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="name@company.com"
            required
          />

          <label>Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="••••••••"
            required
          />

          <button className="btn" type="submit">
            {activeTab === "signup" ? "Create Account" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
