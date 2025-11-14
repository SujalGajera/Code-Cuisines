import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './Sujal/Navbar';
import Home from './Sujal/Home';

import CustomerLogin from './Yubi/CustomerLogin';
import CustomerRegister from './Yubi/CustomerRegister';
import CustomerDashboard from './Yubi/CustomerDashboard';
import CustomerForgot from './Yubi/ForgotPassword';

import StaffLogin from './Heli/staff-login';
import StaffForgot from './Heli/ForgotPassword';
import SignUp from './Roshan/SignUp';

import ReceptionistDashboard from "./Roshan/ReceptionistDashboard";
import ReceptionistDashboard from "./Roshan/ReceptionistC";


const Explore = () => <div style={{ padding: 24 }}>Explore Page (placeholder)</div>;
const About = () => <div style={{ padding: 24 }}>About Us Page (placeholder)</div>;
const AdminLogin = () => <div style={{ padding: 24 }}>Admin Login Page (placeholder)</div>;

function App() {
  return (
<BrowserRouter>

  {/* Show Navbar on ALL pages EXCEPT receptionist dashboard */}
  {window.location.pathname !== "/receptionist" && <Navbar />}

  <Routes>


        <Route path="/" element={<Home />} />

        {/* Receptionist Domain */}
        <Route path="/receptionist" element={<ReceptionistDashboard />} />

        {/* Customer */}
        <Route path="/login/customer" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/forgot" element={<CustomerForgot />} />

        {/* Staff */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/staff/forgot" element={<StaffForgot />} />

        {/* Admin */}
        <Route path="/login/admin" element={<AdminLogin />} />

        {/* Redirect unknown → Home */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
  