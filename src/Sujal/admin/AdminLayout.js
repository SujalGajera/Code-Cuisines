import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; // adjust if your firebase file lives elsewhere
import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isAdminVerified");
      navigate("/admin/login");
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  return (
    <div className="adm-shell">
      <header className="adm-topbar">
        <div className="adm-brand">
          <span className="adm-logo-dot" />
          <span>Code & Cuisine – Admin Panel</span>
        </div>
        <button className="adm-btn-outlined" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <div className="adm-body">
        <aside className="adm-sidebar">
          <nav className="adm-nav">
            <NavLink to="/admin" end className="adm-link">
              <span>📊</span>
              <span>
                Dashboard
                <br />
                Overview
              </span>
            </NavLink>
            <NavLink to="/admin/staff" className="adm-link">
              <span>🧑‍🍳</span> <span>Staff</span>
            </NavLink>
            <NavLink to="/admin/receptionists" className="adm-link">
              <span>💁</span> <span>Receptionists</span>
            </NavLink>
            <NavLink to="/admin/customers" className="adm-link">
              <span>🍽️</span> <span>Customers</span>
            </NavLink>
            <NavLink to="/admin/menu" className="adm-link">
              <span>📋</span> <span>Menu</span>
            </NavLink>
            <NavLink to="/admin/reservations" className="adm-link">
              <span>📆</span> <span>Reservations</span>
            </NavLink>
            <NavLink to="/admin/payments" className="adm-link">
              <span>💳</span> <span>Payments</span>
            </NavLink>
          </nav>
        </aside>

        <main className="adm-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
