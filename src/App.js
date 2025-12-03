import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Global UI
import Navbar from "./Sujal/components/Navbar";

// Landing
import Home from "./Sujal/pages/Home";

// Admin auth screens
import AdminSignIn from "./Sujal/pages/AdminSignIn";
import AdminForgot from "./Sujal/pages/AdminForgot";
import AdminVerify from "./Sujal/pages/AdminVerify";

// Admin dashboard shell + pages
import AdminLayout from "./Sujal/components/AdminLayout";
import AdminOverview from "./Sujal/pages/AdminOverview";
import StaffPage from "./Sujal/pages/StaffPage";
import ReceptionistsPage from "./Sujal/pages/ReceptionistsPage";
import ShiftsPage from "./Sujal/pages/ShiftsPage";
import CustomersPage from "./Sujal/pages/CustomersPage";
import MenuPage from "./Sujal/pages/MenuPage";
import ReservationsPage from "./Sujal/pages/ReservationsPage";
import PaymentsPage from "./Sujal/pages/PaymentsPage";

// CUSTOMER AUTH
import CustomerLogin from "./Yubraj/pages/CustomerLogin";
import CustomerRegister from "./Yubraj/pages/CustomerRegister";
import CustomerForgot from "./Yubraj/pages/ForgotPassword";

// CUSTOMER DASHBOARD + PAGES
import CustomerDashboard from "./Yubraj/pages/CustomerDashboard";
import CustomerProfile from "./Yubraj/pages/CustomerProfile";
import CustomerFeedback from "./Yubraj/pages/CustomerFeedback";
import CustomerMenu from "./Yubraj/pages/CustomerMenu";
import CustomerOrderHistory from "./Yubraj/pages/CustomerOrderHistory";
import CustomerReservations from "./Yubraj/pages/CustomerReservations";
import CustomerPayment from "./Yubraj/pages/CustomerPayment";

// Providers
import { CartProvider } from "./contexts/CartContext";
import { AdminProvider } from "./contexts/AdminContext";

// Staff / Receptionist screens
import StaffLogin from "./Heli/pages/staff-login";
import StaffForgot from "./Heli/pages/ForgotPassword";
import SignUp from "./Roshan/pages/SignUp";

// Receptionist Dashboard
import ReceptionistDashboard from "./Roshan/pages/ReceptionistDashboard";

// Auth / role context + protected routes
import {
  AdminRoute,
  CustomerRoute,
  StaffRoute,
} from "./routes/ProtectedRoute";

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
