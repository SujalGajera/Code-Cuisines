import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerRegister.css";

function CustomerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Get current list of customers
    const customers =
      JSON.parse(localStorage.getItem("registeredCustomers")) || [];

    // ✅ Add new customer
    customers.push(formData);
    localStorage.setItem("registeredCustomers", JSON.stringify(customers));

    alert("✅ Registration successful!");
    navigate("/customer/login");
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>
        <p>Join Code Cuisine to make reservations easily!</p>

        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/customer/login")} className="link">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default CustomerRegister;
