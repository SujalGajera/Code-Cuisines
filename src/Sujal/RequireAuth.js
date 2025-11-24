import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdmin } from "./admin/AdminContext";

// Protect routes based on:
// - logged in
// - allowedRoles
// - optional "requireAdminVerify" for admin pages
export default function RequireAuth({ allowedRoles, requireAdminVerify = false }) {
  const { user, role, loading } = useAdmin();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Not logged in → send to correct login page
  if (!user) {
    const from = location.pathname;

    if (from.startsWith("/admin")) {
      return <Navigate to="/admin/login" replace state={{ from }} />;
    }

    if (from.startsWith("/staff") || from.startsWith("/receptionist")) {
      return <Navigate to="/staff-login" replace state={{ from }} />;
    }

    return <Navigate to="/customer/login" replace state={{ from }} />;
  }

  // Logged in but wrong role
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Extra layer: admin must be verified when required
  if (requireAdminVerify && role === "admin") {
    const verified = localStorage.getItem("isAdminVerified") === "true";
    if (!verified) {
      return <Navigate to="/admin/verify" replace />;
    }
  }

  // All good → render nested route
  return <Outlet />;
}
