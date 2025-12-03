import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdmin } from "../contexts/AdminContext";

// Admin Route - Only admin can access
// Props:
//   - requireVerify: if true, also check for admin verification code
export const AdminRoute = ({ children, requireVerify = false }) => {
  const { user, role, loading } = useAdmin();
  const location = useLocation();

  console.log("AdminRoute - User:", user?.email, "Role:", role, "RequireVerify:", requireVerify);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        Loading...
      </div>
    );
  }

  // Step 1: Check if user is logged in
  if (!user) {
    console.log("No user - redirecting to login");
    return <Navigate to="/login/admin" replace state={{ from: location }} />;
  }

  //  Step 2: Check if user is admin
  if (role !== "admin") {
    console.log("Not admin role - access denied");
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to access this page.</p>
        <p>Admin privileges required.</p>
      </div>
    );
  }

  // Step 3: Check verification if required for this route
  if (requireVerify) {
    const isVerified = localStorage.getItem("isAdminVerified") === "true";
    console.log("Verification required. Is verified?", isVerified);

    if (!isVerified) {
      console.log("Not verified - redirecting to verify page");
      return (
        <Navigate
          to="/admin/verify"
          replace
          state={{ from: location.pathname }}
        />
      );
    }
  }

  // All checks passed
  return children;
};

// Customer Route - Admin and Customer can access
export const CustomerRoute = ({ children }) => {
  const { user, role, loading } = useAdmin();
  const location = useLocation();

  console.log("🔒 CustomerRoute Check:", {
    user: user?.email || "NO USER",
    role: role || "NO ROLE",
    loading
  });

  if (loading) {
    console.log("⏳ Still loading auth state...");
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        Loading...
      </div>
    );
  }

  // Not logged in - MUST redirect
  if (!user) {
    console.log("❌ NO USER - Redirecting to /login/customer");
    return <Navigate to="/login/customer" replace state={{ from: location }} />;
  }

  // Check if user is admin or customer
  if (role !== "admin" && role !== "customer") {
    console.log("❌ WRONG ROLE - User role:", role);
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to access this page.</p>
        <p>Customer or Admin privileges required.</p>
        <p>Your role: {role || "none"}</p>
      </div>
    );
  }

  console.log("✅ Access GRANTED - User:", user.email, "Role:", role);
  return children;
};

// Staff Route - Admin, Staff, and Receptionist can access
export const StaffRoute = ({ children }) => {
  const { user, role, loading } = useAdmin();
  const location = useLocation();

  console.log("🔒 StaffRoute Check:", {
    user: user?.email || "NO USER",
    role: role || "NO ROLE",
    loading
  });

  if (loading) {
    console.log("⏳ Still loading auth state...");
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        Loading...
      </div>
    );
  }

  // Not logged in - MUST redirect
  if (!user) {
    console.log("❌ NO USER - Redirecting to /staff-login");
    return <Navigate to="/staff-login" replace state={{ from: location }} />;
  }

  // Check if user is admin, staff, or receptionist
  if (role !== "admin" && role !== "staff" && role !== "receptionist") {
    console.log("❌ WRONG ROLE - User role:", role);
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to access this page.</p>
        <p>Staff or Admin privileges required.</p>
        <p>Your role: {role || "none"}</p>
      </div>
    );
  }

  console.log("✅ Access GRANTED - User:", user.email, "Role:", role);
  return children;
};

// Staff and Customer Route - Admin, Staff, Receptionist, and Customer can access
export const StaffAndCustomerRoute = ({ children }) => {
  const { user, role, loading } = useAdmin();
  const location = useLocation();

  console.log("StaffAndCustomerRoute - User:", user?.email, "Role:", role);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Allow admin, staff, receptionist, or customer
  const allowedRoles = ["admin", "staff", "receptionist", "customer"];
  if (!allowedRoles.includes(role)) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return children;
};

export default AdminRoute;