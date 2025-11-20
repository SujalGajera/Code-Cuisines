// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import CustomerLogin from "./Yubi/Auth/CustomerLogin";
import CustomerRegister from "./Yubi/Auth/CustomerRegister";
import ForgotPassword from "./Yubi/Auth/ForgotPassword";

import CustomerDashboard from "./Yubi/Dashboard/CustomerDashboard";
import CustomerProfile from "./Yubi/Profile/CustomerProfile";
import CustomerReservations from "./Yubi/Reservations/CustomerReservations";
import CustomerMenu from "./Yubi/Menu/CustomerMenu";
import CustomerOrderHistory from "./Yubi/Orders/CustomerOrderHistory";
import CustomerFeedback from "./Yubi/Feedback/CustomerFeedback";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Navigate to="/customer/login" />} />
      <Route path="/customer/login" element={<CustomerLogin />} />
      <Route path="/customer/register" element={<CustomerRegister />} />
      <Route path="/customer/forgot-password" element={<ForgotPassword />} />

      {/* Customer dashboard pages */}
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/customer/profile" element={<CustomerProfile />} />
      <Route path="/customer/reservations" element={<CustomerReservations />} />
      <Route path="/customer/menu" element={<CustomerMenu />} />
      <Route path="/customer/orders" element={<CustomerOrderHistory />} />
      <Route path="/customer/feedback" element={<CustomerFeedback />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/customer/login" />} />
    </Routes>
  );
}

export default App;
