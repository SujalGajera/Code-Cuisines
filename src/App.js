import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

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
import ReceptionistShifts from "./Roshan/ReceptionistShifts";

<Route path="/receptionist/shifts" element={<ReceptionistShifts />} />


function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/receptionist";
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          <Route path="/" element={<Home />} />

          {/* Receptionist */}
          <Route path="/receptionist" element={<ReceptionistDashboard />} />

          {/* Staff */}
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/staff/forgot" element={<StaffForgot />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Customer */}
          <Route path="/login/customer" element={<CustomerLogin />} />
          <Route path="/customer/register" element={<CustomerRegister />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/forgot" element={<CustomerForgot />} />

          {/* Redirect unknown → Home */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
