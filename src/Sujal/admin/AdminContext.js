import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as fbSignOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      console.log("Auth state changed:", firebaseUser);

      try {
        if (!firebaseUser) {
          setUser(null);
          setRole(null);
          setLoading(false);
          return;
        }

        setUser(firebaseUser);

        // Check Firestore for user role
        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const userData = snap.data();
          console.log("User role from Firestore:", userData.role);
          setRole(userData.role || null);
        } else {
          console.warn("User document not found in Firestore");
          setRole(null);
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
    try {
      await fbSignOut(auth);
      setUser(null);
      setRole(null);
      localStorage.removeItem("isAdminVerified");
      localStorage.removeItem("pendingAdminVerify");
    } catch (err) {
      console.error("Error signing out:", err);
    }
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