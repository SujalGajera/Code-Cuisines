// src/Yubi/Auth/CustomerRegister.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function CustomerRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const customers = JSON.parse(localStorage.getItem("customers") || "[]");

    if (customers.some((c) => c.email === form.email)) {
      alert("An account with this email already exists.");
      return;
    }

    const newCustomer = { ...form };

    const updated = [...customers, newCustomer];
    localStorage.setItem("customers", JSON.stringify(updated));
    localStorage.setItem("currentCustomer", JSON.stringify(newCustomer));

    navigate("/customer/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">
          Sign up to start booking tables and placing orders.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-actions">
            <button type="submit" className="auth-primary-btn">
              Sign Up
            </button>
          </div>
        </form>

        <div className="auth-footer-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/customer/login")}>Log in</span>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegister;
