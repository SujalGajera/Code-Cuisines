import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as fbSignOut } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";

// This context holds:
// - user: Firebase Auth user (or null)
// - role: "admin" | "staff" | "receptionist" | "customer" | null
// - loading: true while checking auth
// - signOut(): logs out user and clears admin verification flag
const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      try {
        if (!firebaseUser) {
          setUser(null);
          setRole(null);
          return;
        }

        setUser(firebaseUser);

        // 🔐 ALWAYS treat this email as admin
        if (firebaseUser.email === "admin@codecuisine.com") {
          setRole("admin");

          // Make sure a Firestore doc exists for admin
          const userRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(userRef);
          if (!snap.exists()) {
            await setDoc(userRef, {
              email: firebaseUser.email,
              role: "admin",
              createdAt: serverTimestamp(),
            });
          }
          return;
        }

        // For other users, read Firestore user doc for role
        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data();
          setRole(data.role || null);
        } else {
          // fallback: treat as customer and create minimal doc
          await setDoc(userRef, {
            email: firebaseUser.email,
            role: "customer",
            createdAt: serverTimestamp(),
          });
          setRole("customer");
        }
      } catch (err) {
        console.error("Error in AdminProvider:", err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const signOut = async () => {
    await fbSignOut(auth);
    setUser(null);
    setRole(null);
    localStorage.removeItem("isAdminVerified");
  };

  const value = { user, role, loading, signOut };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
