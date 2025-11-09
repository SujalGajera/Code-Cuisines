import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Global UI
import Navbar from './Sujal/Navbar';

// Landing
import Home from './Sujal/Home';

// Admin screens
import AdminSignIn from './Sujal/AdminSignIn';
import AdminForgot from './Sujal/AdminForgot';
import AdminVerify from './Sujal/AdminVerify';

// Customer screens
import CustomerLogin from './Yubi/CustomerLogin';
import CustomerRegister from './Yubi/CustomerRegister';
import CustomerDashboard from './Yubi/CustomerDashboard';
import CustomerForgot from './Yubi/ForgotPassword';

// Staff / Receptionist screens
import StaffLogin from './Heli/staff-login';
import StaffForgot from './Heli/ForgotPassword';
import SignUp from './Roshan/SignUp';

// Placeholder pages until implementation
const Explore = () => <div style={{ padding: 24 }}>Explore Page (placeholder)</div>;
const About = () => <div style={{ padding: 24 }}>About Us Page (placeholder)</div>;

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Landing */}
        <Route path="/" element={<Home />} />

        {/* Simple pages */}
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />

        {/* Admin Pages */}
        <Route path="/login/admin" element={<AdminSignIn />} />
        <Route path="/admin/forgot" element={<AdminForgot />} />
        <Route path="/admin/verify" element={<AdminVerify />} />

        {/* Customer Auth */}
        <Route path="/login/customer" element={<CustomerLogin />} />
        <Route path="/customer/login" element={<Navigate to="/login/customer" replace />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/forgot-password" element={<CustomerForgot />} />

        {/* Staff / Receptionist */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/staff/forgot" element={<StaffForgot />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
