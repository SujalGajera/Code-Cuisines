import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  serverTimestamp, onSnapshot, query, orderBy, getCountFromServer
} from "firebase/firestore";
import { db } from "../../../firebase";

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
