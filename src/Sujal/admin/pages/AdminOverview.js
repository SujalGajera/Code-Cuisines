import { useEffect, useState } from "react";
import { count } from "../data/fireUtils";
import "./AdminPages.css";

export default function AdminOverview() {
  const [totals, setTotals] = useState({
    staff: 0, receptionists: 0, customers: 0, menu: 0, todayReservations: 0, payments: 0
  });

  useEffect(() => {
    (async () => {
      const [staff, receptionists, customers, menu, reservations, payments] = await Promise.all([
        count("staff"),
        count("receptionists"),
        count("customers"),
        count("menu"),
        count("reservations"),
        count("payments")
      ]);

      // crude “today” filter shown as total reservations; refine later with a query if needed
      setTotals({
        staff, receptionists, customers, menu,
        todayReservations: reservations,
        payments
      });
    })();
  }, []);

  return (
    <div className="adm-page">
      <h2 className="adm-h2">Dashboard Overview</h2>
      <p className="adm-sub">Real-time snapshot of restaurant activity, staff, and performance.</p>

      <section className="adm-grid" style={{marginTop:16}}>
        <KPICard title="Total Staff" value={totals.staff} sub="active" />
        <KPICard title="Receptionists" value={totals.receptionists} sub="total" />
        <KPICard title="Customers" value={totals.customers} sub="registered" />
        <KPICard title="Menu Items" value={totals.menu} sub="available" />
        <KPICard title="Reservations Today" value={totals.todayReservations} sub="bookings" />
        <KPICard title="Payments Processed" value={totals.payments} sub="transactions" />
      </section>

      <section className="adm-card" style={{marginTop:18}}>
        <h3 className="adm-h3">Recent Activity</h3>
        <p className="adm-muted">Hook up to a `activity` collection later if you want a true feed.</p>
      </section>
    </div>
  );
}

function KPICard({ title, value, sub }) {
  return (
    <div className="adm-card" style={{gridColumn:"span 4"}}>
      <div className="adm-kpi">
        <div className="adm-kpi-title">{title}</div>
        <div className="adm-kpi-value">{value}</div>
        <div className="adm-kpi-sub" />
        <span className="adm-muted">{sub}</span>
      </div>
    </div>
  );
}
