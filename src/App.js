import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Global UI
import Navbar from "./Sujal/Navbar";

// Landing
import Home from "./Sujal/Home";

// Auth context + route guard
import { AdminProvider } from "./Sujal/admin/AdminContext";
import RequireAuth from "./Sujal/RequireAuth";

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

// Customer screens (Yubi)
import CustomerLogin from "./Yubi/CustomerLogin";
import CustomerRegister from "./Yubi/CustomerRegister";
import CustomerDashboard from "./Yubi/CustomerDashboard";
import CustomerForgot from "./Yubi/ForgotPassword";

// Staff / Receptionist screens
import SignUp from "./Roshan/SignUp";
import StaffLogin from "./Heli/staff-login";

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* -------- PUBLIC PAGES -------- */}
          <Route path="/" element={<Home />} />

          {/* -------- ADMIN AUTH -------- */}
          <Route path="/admin/login" element={<AdminSignIn />} />
          <Route path="/admin/forgot" element={<AdminForgot />} />
          <Route path="/admin/verify" element={<AdminVerify />} />

          {/* -------- CUSTOMER AUTH -------- */}
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/register" element={<CustomerRegister />} />
          <Route path="/customer/forgot" element={<CustomerForgot />} />

          {/* -------- STAFF / RECEPTIONIST AUTH -------- */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/staff-login" element={<StaffLogin />} />

          {/* You mentioned "/staff/forgot" in App.js – you don't have a separate component yet.
             For now we'll just show the same staff login page so the route works. */}
          <Route path="/staff/forgot" element={<StaffLogin />} />

          {/* -------- PROTECTED ADMIN AREA -------- */}
          {/* Only admin@codecuisine.com (role "admin") + verified code can see these */}
          <Route
            element={
              <RequireAuth
                allowedRoles={["admin"]}
                requireAdminVerify={true}
              />
            }
          >
            {/* AdminLayout uses <Outlet /> for nested pages */}
            <Route path="/admin" element={<AdminLayout />}>
              {/* /admin → overview dashboard */}
              <Route index element={<AdminOverview />} />

              {/* /admin/staff → staff collection */}
              <Route path="staff" element={<StaffPage />} />

              {/* /admin/receptionists → receptionist collection */}
              <Route path="receptionists" element={<ReceptionistsPage />} />

              {/* /admin/customers → customers collection */}
              <Route path="customers" element={<CustomersPage />} />

              {/* /admin/menu → menu items */}
              <Route path="menu" element={<MenuPage />} />

              {/* /admin/reservations → reservations */}
              <Route path="reservations" element={<ReservationsPage />} />

              {/* /admin/payments → payments */}
              <Route path="payments" element={<PaymentsPage />} />
            </Route>
          </Route>

          {/* -------- PROTECTED CUSTOMER AREA -------- */}
          {/* Customers AND admin can see this dashboard */}
          <Route element={<RequireAuth allowedRoles={["admin", "customer"]} />}>
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          </Route>

          {/* -------- FUTURE: STAFF / RECEPTIONIST DASHBOARDS -------- */}
          {/* When you build them, wrap like this:

          <Route element={<RequireAuth allowedRoles={["admin", "staff"]} />}>
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["admin", "receptionist"]} />}>
            <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
          </Route>

          */}

          {/* -------- CATCH ALL -------- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
