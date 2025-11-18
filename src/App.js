import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Global UI
import Navbar from "./Sujal/Navbar";

// Landing
import Home from "./Sujal/Home";

// Admin auth screens
import AdminSignIn from "./Sujal/AdminSignIn";
import AdminForgot from "./Sujal/AdminForgot";
import AdminVerify from "./Sujal/AdminVerify";

// Admin dashboard shell + pages
import AdminLayout from "./Sujal/admin/AdminLayout";
import AdminOverview from "./Sujal/admin/pages/AdminOverview";
import StaffPage from "./Sujal/admin/pages/StaffPage";
import ReceptionistsPage from "./Sujal/admin/pages/ReceptionistsPage";
import CustomersPage from "./Sujal/admin/pages/CustomersPage";
import MenuPage from "./Sujal/admin/pages/MenuPage";
import ReservationsPage from "./Sujal/admin/pages/ReservationsPage";
import PaymentsPage from "./Sujal/admin/pages/PaymentsPage";

// Customer screens
import CustomerLogin from "./Yubi/CustomerLogin";
import CustomerRegister from "./Yubi/CustomerRegister";
import CustomerDashboard from "./Yubi/CustomerDashboard";
import CustomerForgot from "./Yubi/ForgotPassword";

// Staff / Receptionist screens
import StaffLogin from "./Heli/staff-login";
import StaffForgot from "./Heli/ForgotPassword";
import SignUp from "./Roshan/SignUp";

// Auth / role context + protected route
import { AdminProvider } from "./Sujal/admin/AdminContext";
import ProtectedRoute from "./Sujal/admin/ProtectedRoute";

// Placeholder pages
const Explore = () => (
  <div style={{ padding: 24 }}>Explore Page (placeholder)</div>
);
const About = () => (
  <div style={{ padding: 24 }}>About Us Page (placeholder)</div>
);

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Landing */}
          <Route path="/" element={<Home />} />

          {/* Simple pages */}
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />

          {/* Admin Auth */}
          <Route path="/login/admin" element={<AdminSignIn />} />
          <Route
            path="/admin/login"
            element={<Navigate to="/login/admin" replace />}
          />
          <Route path="/admin/forgot" element={<AdminForgot />} />
          <Route path="/admin/verify" element={<AdminVerify />} />

          {/* Admin Dashboard (PROTECTED) */}
          <Route
            element={
              <ProtectedRoute requireAdmin={true} requireVerify={true} />
            }
          >
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="staff" element={<StaffPage />} />
              <Route path="receptionists" element={<ReceptionistsPage />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="reservations" element={<ReservationsPage />} />
              <Route path="payments" element={<PaymentsPage />} />
            </Route>
          </Route>

          {/* Customer Auth */}
          <Route path="/login/customer" element={<CustomerLogin />} />
          <Route
            path="/customer/login"
            element={<Navigate to="/login/customer" replace />}
          />
          <Route path="/customer/register" element={<CustomerRegister />} />

          {/* Customer dashboard (customer or admin) */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["admin", "customer"]} />
            }
          >
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          </Route>

          <Route
            path="/customer/forgot-password"
            element={<CustomerForgot />}
          />

          {/* Staff / Receptionist */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/staff/forgot" element={<StaffForgot />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
