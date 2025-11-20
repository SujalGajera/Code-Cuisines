// src/Yubi/Auth/CustomerLogin.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function CustomerLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = JSON.parse(localStorage.getItem("customers") || "[]");
    const match = stored.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!match) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem("currentCustomer", JSON.stringify(match));
    navigate("/customer/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">
          Log in to manage your reservations and orders.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
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
              Log In
            </button>

            <div className="auth-link-row">
              <Link className="auth-link" to="/customer/forgot-password">
                Forgot password?
              </Link>
            </div>
          </div>
        </form>

        <div className="auth-footer-text">
          Don&apos;t have an account?{" "}
          <span onClick={() => navigate("/customer/register")}>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
