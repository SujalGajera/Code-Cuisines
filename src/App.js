import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

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
import ShiftsPage from "./Sujal/admin/pages/ShiftsPage";
import CustomersPage from "./Sujal/admin/pages/CustomersPage";
import MenuPage from "./Sujal/admin/pages/MenuPage";
import ReservationsPage from "./Sujal/admin/pages/ReservationsPage";
import PaymentsPage from "./Sujal/admin/pages/PaymentsPage";

// CUSTOMER AUTH
import CustomerLogin from "./Yubi/Auth/CustomerLogin";
import CustomerRegister from "./Yubi/Auth/CustomerRegister";
import CustomerForgot from "./Yubi/Auth/ForgotPassword";

// CUSTOMER DASHBOARD + PAGES
import CustomerDashboard from "./Yubi/Customer/Dashboard/CustomerDashboard";
import CustomerProfile from "./Yubi/Profile/CustomerProfile";
import CustomerFeedback from "./Yubi/Feedback/CustomerFeedback";
import CustomerMenu from "./Yubi/Menu/CustomerMenu";
import CustomerOrderHistory from "./Yubi/Orders/CustomerOrderHistory";
import CustomerReservations from "./Yubi/Reservations/CustomerReservations";
import CustomerPayment from "./Yubi/Payment/CustomerPayment";

// Providers
import { CartProvider } from "./Yubi/Cart/CartContext";
import { AdminProvider } from "./Sujal/admin/AdminContext";

// Staff / Receptionist screens
import StaffLogin from "./Heli/staff-login";
import StaffForgot from "./Heli/ForgotPassword";
import SignUp from "./Roshan/SignUp";

// Receptionist Dashboard
import ReceptionistDashboard from "./Roshan/ReceptionistDashboard";

// Auth / role context + protected routes
import {
  AdminRoute,
  CustomerRoute,
  StaffRoute,
} from "./Sujal/admin/ProtectedRoute";

// Placeholder pages
const Explore = () => <div style={{ padding: 24 }}>Explore Page (placeholder)</div>;
const About = () => <div style={{ padding: 24 }}>About Us Page (placeholder)</div>;

function AppWrapper() {
  const location = useLocation();

  // HIDE NAVBAR ON THESE ROUTES:
  const hideNavbar = location.pathname.startsWith("/customer/");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />

        {/* ADMIN AUTH */}
        <Route path="/login/admin" element={<AdminSignIn />} />
        <Route path="/admin/login" element={<Navigate to="/login/admin" replace />} />
        <Route path="/admin/forgot" element={<AdminForgot />} />

        {/* ADMIN VERIFY */}
        <Route
          path="/admin/verify"
          element={
            <AdminRoute>
              <AdminVerify />
            </AdminRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <AdminRoute requireVerify={true}>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="receptionists" element={<ReceptionistsPage />} />
          <Route path="shifts" element={<ShiftsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
        </Route>

        {/* CUSTOMER AUTH */}
        <Route path="/login/customer" element={<CustomerLogin />} />
        <Route path="/customer/login" element={<Navigate to="/login/customer" replace />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/forgot-password" element={<CustomerForgot />} />

        {/* CUSTOMER DASHBOARD */}
        <Route
          path="/customer/dashboard"
          element={
            <CustomerRoute>
              <CustomerDashboard />
            </CustomerRoute>
          }
        />

        {/* CUSTOMER PAGES */}
        <Route
          path="/customer/profile"
          element={
            <CustomerRoute>
              <CustomerProfile />
            </CustomerRoute>
          }
        />
        <Route
          path="/customer/menu"
          element={
            <CustomerRoute>
              <CustomerMenu />
            </CustomerRoute>
          }
        />
        <Route
          path="/customer/reservations"
          element={
            <CustomerRoute>
              <CustomerReservations />
            </CustomerRoute>
          }
        />
        <Route
          path="/customer/orders"
          element={
            <CustomerRoute>
              <CustomerOrderHistory />
            </CustomerRoute>
          }
        />
        <Route
          path="/customer/feedback"
          element={
            <CustomerRoute>
              <CustomerFeedback />
            </CustomerRoute>
          }
        />
        <Route
          path="/customer/payment"
          element={
            <CustomerRoute>
              <CustomerPayment />
            </CustomerRoute>
          }
        />

        {/* STAFF / RECEPTIONIST AUTH */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/staff/forgot" element={<StaffForgot />} />

        {/* STAFF / RECEPTIONIST DASHBOARD */}
        <Route
          path="/staff/dashboard"
          element={
            <StaffRoute>
              <ReceptionistDashboard />
            </StaffRoute>
          }
        />

        {/* CATCH ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <BrowserRouter>
          <AppWrapper />
        </BrowserRouter>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;
