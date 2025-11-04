import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

function CustomerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //  Get all registered customers
    const users = JSON.parse(localStorage.getItem("registeredCustomers")) || [];

    // Find the matching user
    const loggedInUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (loggedInUser) {
      //  Save current logged-in user data
      localStorage.setItem("currentCustomer", JSON.stringify(loggedInUser));

      alert(`Welcome back, ${loggedInUser.firstName}!`);
      navigate("/customer/dashboard");UUU
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Welcome Back, Customer 👋</h2>
        <p>Access your profile and reservations</p>

        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>

        <div className="login-footer">
  <p
    className="forgot-link"
    onClick={() => navigate("/customer/forgot-password")}
  >
    Forgot Password?
  </p>

  <p>
    Don’t have an account?{" "}
    <span
      onClick={() => navigate("/customer/register")}
      className="link"
    >
      Register here
    </span>
  </p>
</div>

      </form>
    </div>
  );
}

export default CustomerLogin;
