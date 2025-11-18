import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdmin } from "./AdminContext";

// General route guard for admin/staff/receptionist/customer
// Props:
// - requireAdmin: only allow admin email
// - requireVerify: also require admin verification code
// - allowedRoles: optional array of roles (e.g. ["admin", "customer"])
export default function ProtectedRoute({
  requireAdmin = false,
  requireVerify = false,
  allowedRoles,
}) {
  const { user, role, loading } = useAdmin();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  // ❌ Not logged in at all
  if (!user) {
    // For admin paths, go to admin login
    if (location.pathname.startsWith("/admin")) {
      return (
        <Navigate
          to="/login/admin"
          replace
          state={{ from: location.pathname }}
        />
      );
    }

    // For other protected routes, you can customise later
    return <Navigate to="/" replace />;
  }

  // If allowedRoles is provided, enforce it
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // If requireAdmin is true, only allow admin
  if (requireAdmin && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // If admin verification is required, check localStorage flag
  if (requireVerify) {
    const verified = localStorage.getItem("isAdminVerified") === "true";
    if (!verified) {
      return (
        <Navigate
          to="/admin/verify"
          replace
          state={{ from: location.pathname }}
        />
      );
    }
  }

  // ✅ All good
  return <Outlet />;
}
