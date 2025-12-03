import { useEffect, useState } from "react";
import { collection, collectionGroup, getCountFromServer } from "firebase/firestore";
import { db } from "../../firebase";
import "../styles/AdminPages.css";

/**
 * AdminOverview Component
 * Displays the main dashboard for administrators.
 * Fetches and shows real-time counts of staff, customers, menu items, and other key metrics.
 */
export default function AdminOverview() {
  const [totals, setTotals] = useState({
    staff: 0, receptionists: 0, customers: 0, menu: 0, reservations: 0, feedback: 0
  });

  useEffect(() => {
    (async () => {
      try {
        console.log("Fetching dashboard counts...");

        // Fetch counts for each collection independently to ensure partial data availability
        // even if one query fails.
        const staffSnap = await getCountFromServer(collection(db, "users")).catch(e => { console.error("Staff count failed:", e); return { data: () => ({ count: 0 }) }; });
        const receptionistSnap = await getCountFromServer(collection(db, "receptionist")).catch(e => { console.error("Receptionist count failed:", e); return { data: () => ({ count: 0 }) }; });
        const customerSnap = await getCountFromServer(collection(db, "customer")).catch(e => { console.error("Customer count failed:", e); return { data: () => ({ count: 0 }) }; });
        const menuSnap = await getCountFromServer(collection(db, "menu")).catch(e => { console.error("Menu count failed:", e); return { data: () => ({ count: 0 }) }; });
        const reservationsSnap = await getCountFromServer(collection(db, "reservations")).catch(e => { console.error("Reservations count failed:", e); return { data: () => ({ count: 0 }) }; });

        // Use collectionGroup to count all feedback subcollections across the database
        const feedbackSnap = await getCountFromServer(collectionGroup(db, "feedback")).catch(e => { console.error("Feedback count failed:", e); return { data: () => ({ count: 0 }) }; });

        setTotals({
          staff: staffSnap.data().count,
          receptionists: receptionistSnap.data().count,
          customers: customerSnap.data().count,
          menu: menuSnap.data().count,
          reservations: reservationsSnap.data().count,
          feedback: feedbackSnap.data().count
        });
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      }
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

/**
 * KPICard Component
 * Reusable card component for displaying Key Performance Indicators.
 */
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
