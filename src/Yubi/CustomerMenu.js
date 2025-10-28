import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import all pages (with .js)
import CustomerLogin from "./Yubi/CustomerLogin.js";
import CustomerRegister from "./Yubi/CustomerRegister.js";
import CustomerForgotPassword from "./Yubi/CustomerForgotPassword.js";
import CustomerDashboard from "./Yubi/CustomerDashboard.js";
import CustomerMenu from "./Yubi/CustomerMenu.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/customer/login" />} />

        {/* Auth Pages */}
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/forgot-password" element={<CustomerForgotPassword />} />

        {/* Dashboard & Menu */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/menu" element={<CustomerMenu />} />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
              404 - Page Not Found
            </h2>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
