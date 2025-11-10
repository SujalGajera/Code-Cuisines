import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CustomerLogin from "./Yubi/CustomerLogin";
import CustomerRegister from "./Yubi/CustomerRegister";
import ForgotPassword from "./Yubi/ForgotPassword";
import CustomerDashboard from "./Yubi/CustomerDashboard";
import CustomerMenu from "./Yubi/CustomerMenu";
import CustomerReservationStatus from "./Yubi/CustomerReservationStatus";
import CustomerBookTable from "./Yubi/CustomerBookTable";
import CustomerFeedback from "./Yubi/CustomerFeedback";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/customer/login" />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/forgot-password" element={<ForgotPassword />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/menu" element={<CustomerMenu />} />
        <Route path="/customer/reservations" element={<CustomerReservationStatus />} />
         <Route path="/customer/book" element={<CustomerBookTable />} />
        <Route path="/customer/feedback" element={<CustomerFeedback />} />
      </Routes>
    </Router>
  );
}

export default App;
