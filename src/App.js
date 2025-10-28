import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CustomerLogin from "./Yubi/CustomerLogin";
import CustomerRegister from "./Yubi/CustomerRegister";
import CustomerDashboard from "./Yubi/CustomerDashboard";
import ForgotPassword from "./Yubi/ForgotPassword"; // ✅ NEW

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/customer/login" />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/forgot-password" element={<ForgotPassword />} /> {/* ✅ NEW */}
      </Routes>
    </Router>
  );
}

export default App;
