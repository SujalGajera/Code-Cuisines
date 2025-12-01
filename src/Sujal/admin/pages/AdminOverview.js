import { useEffect, useState } from "react";
import { count, countByRole } from "../data/fireUtils";
import "./AdminPages.css";

export default function AdminOverview() {
  const [totals, setTotals] = useState({
    staff: 0, receptionists: 0, customers: 0, menu: 0, reservations: 0, feedback: 0
  });

  useEffect(() => {
    (async () => {
      const [staff, receptionists, customers, menu, reservations, feedback] = await Promise.all([
        countByRole("staff"),
        countByRole("receptionist"),
        countByRole("customer"),
        count("menu"),
        count("reservations"),
        count("feedback")
      ]);

      setTotals({
        staff, receptionists, customers, menu,
        reservations,
        feedback
      });
    })();
  }, []);

  return (
    <div className="adm-page">
      <h2 className="adm-h2">Dashboard Overview</h2>
      <p className="adm-sub">Real-time snapshot of restaurant activity, staff, and performance.</p>

      <section className="adm-grid" style={{ marginTop: 16 }}>
        <KPICard title="Total Staff" value={totals.staff} sub="active" />
        <KPICard title="Receptionists" value={totals.receptionists} sub="total" />
        <KPICard title="Customers" value={totals.customers} sub="registered" />
        <KPICard title="Menu Items" value={totals.menu} sub="available" />
        <KPICard title="Reservations" value={totals.reservations} sub="total" />
        <KPICard title="Feedback Received" value={totals.feedback} sub="reviews" />
      </section>

      <section className="adm-card" style={{ marginTop: 18 }}>
        <h3 className="adm-h3">Recent Activity</h3>
        <p className="adm-muted">Dashboard statistics update in real-time from Firebase.</p>
      </section>
    </div>
  );
}

function KPICard({ title, value, sub }) {
  return (
    <div className="adm-card" style={{ gridColumn: "span 4" }}>
      <div className="adm-kpi">
        <div className="adm-kpi-title">{title}</div>
        <div className="adm-kpi-value">{value}</div>
        <div className="adm-kpi-sub" />
        <span className="adm-muted">{sub}</span>
      </div>
    </div>
  );
}
