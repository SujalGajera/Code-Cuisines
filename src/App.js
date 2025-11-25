import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Global UI
import Navbar from "./Sujal/Navbar";

// Landing
import Home from "./Sujal/Home";

// Admin
import AdminSignIn from "./Sujal/AdminSignIn";
import AdminForgot from "./Sujal/AdminForgot";
import AdminVerify from "./Sujal/AdminVerify";
import AdminLayout from "./Sujal/admin/AdminLayout";
import AdminOverview from "./Sujal/admin/pages/AdminOverview";
import StaffPage from "./Sujal/admin/pages/StaffPage";
import ReceptionistsPage from "./Sujal/admin/pages/ReceptionistsPage";
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

// Providers
import { CartProvider } from "./Yubi/Cart/CartContext";
import { AdminProvider } from "./Sujal/admin/AdminContext";

// Staff / Receptionist
import StaffLogin from "./Heli/staff-login";
import StaffForgot from "./Heli/ForgotPassword";
import SignUp from "./Roshan/SignUp";
import ReceptionistDahboard from "./Roshan/ReceptionistDashboard";

// Placeholder
const Explore = () => <div style={{ padding: 24 }}>Explore Page</div>;
const About = () => <div style={{ padding: 24 }}>About Us Page</div>;

function AppWrapper() {
  const location = useLocation();

  // HIDE NAVBAR ON THESE ROUTES:
  const hideNavbar =
    location.pathname.startsWith("/customer/");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Landing */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />

        {/* Admin Auth */}
        <Route path="/login/admin" element={<AdminSignIn />} />
        <Route path="/admin/login" element={<Navigate to="/login/admin" replace />} />
        <Route path="/admin/forgot" element={<AdminForgot />} />
        <Route path="/admin/verify" element={<AdminVerify />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="receptionists" element={<ReceptionistsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
        </Route>

        {/* Customer Auth */}
        <Route path="/login/customer" element={<CustomerLogin />} />
        <Route path="/customer/login" element={<Navigate to="/login/customer" replace />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/forgot-password" element={<CustomerForgot />} />

        {/* Customer Pages */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/customer/menu" element={<CustomerMenu />} />
        <Route path="/customer/reservations" element={<CustomerReservations />} />
        <Route path="/customer/orders" element={<CustomerOrderHistory />} />
        <Route path="/customer/feedback" element={<CustomerFeedback />} />

        {/* Staff */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/staff/forgot" element={<StaffForgot />} />
        <Route path="/receptionist" element={<ReceptionistDahboard />} />

        {/* Catch-all */}
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
