import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  serverTimestamp, onSnapshot, query, orderBy, getCountFromServer, where
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { db, firebaseConfig } from "../../../firebase";

// Generic helpers per collection
export const col = (name) => collection(db, name);
export const ref = (name, id) => doc(db, name, id);

export async function create(name, data) {
  return addDoc(col(name), { ...data, createdAt: serverTimestamp() });
}
export async function patch(name, id, data) {
  return updateDoc(ref(name, id), { ...data, updatedAt: serverTimestamp() });
}
export async function remove(name, id) {
  return deleteDoc(ref(name, id));
}
export function watch(name, set, opts = {}) {
  const q = query(col(name), orderBy(opts.orderBy || "createdAt", opts.dir || "desc"));
  return onSnapshot(q, (snap) => {
    set(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}
export async function count(name) {
  const c = await getCountFromServer(col(name));
  return c.data().count;
}
// Count users by role
export async function countByRole(role) {
  const q = query(col("users"), where("role", "==", role));
  const c = await getCountFromServer(q);
  return c.data().count;
}

// Create user without logging out current admin
export async function createSecondaryUser(email, password) {
  const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
  const secondaryAuth = getAuth(secondaryApp);

  try {
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    await signOut(secondaryAuth); // clean up
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}
