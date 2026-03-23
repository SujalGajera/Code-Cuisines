import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdminRoute, CustomerRoute } from './routes/ProtectedRoute';

// ── Mocks ──────────────────────────────────────────────────────────────────
jest.mock('./firebase', () => ({
  auth: { currentUser: null },
  db: {},
  firebaseConfig: {},
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn((_auth, cb) => { cb(null); return () => {}; }),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(() => Promise.resolve({ exists: () => false, data: () => ({}) })),
  setDoc: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ forEach: jest.fn() })),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  onSnapshot: jest.fn(() => () => {}),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  serverTimestamp: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  Navigate: ({ to }) => <div>Redirected to {to}</div>,
  useLocation: () => ({ pathname: '/' }),
}), { virtual: true });

jest.mock('./contexts/AdminContext', () => ({
  useAdmin: jest.fn(),
  AdminProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock('./contexts/CartContext', () => ({
  CartProvider: ({ children }) => <div>{children}</div>,
  useCart: jest.fn(() => ({ cart: [], addToCart: jest.fn(), clearCart: jest.fn() })),
}));

const { useAdmin } = require('./contexts/AdminContext');

// ── AdminRoute ─────────────────────────────────────────────────────────────
describe('AdminRoute', () => {

  test('shows Loading while auth resolves', () => {
    useAdmin.mockReturnValue({ user: null, role: null, loading: true });
    render(<AdminRoute><div>Admin content</div></AdminRoute>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('hides content when no user is logged in', () => {
    useAdmin.mockReturnValue({ user: null, role: null, loading: false });
    render(<AdminRoute><div>Admin content</div></AdminRoute>);
    expect(screen.queryByText('Admin content')).not.toBeInTheDocument();
  });

  test('shows Access Denied for wrong role', () => {
    useAdmin.mockReturnValue({ user: { email: 'x@x.com' }, role: 'customer', loading: false });
    render(<AdminRoute><div>Admin content</div></AdminRoute>);
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });

  test('renders children for admin role', () => {
    useAdmin.mockReturnValue({ user: { email: 'a@a.com' }, role: 'admin', loading: false });
    render(<AdminRoute><div>Admin content</div></AdminRoute>);
    expect(screen.getByText('Admin content')).toBeInTheDocument();
  });

});

// ── CustomerRoute ──────────────────────────────────────────────────────────
describe('CustomerRoute', () => {

  test('hides content when no user is logged in', () => {
    useAdmin.mockReturnValue({ user: null, role: null, loading: false });
    render(<CustomerRoute><div>Customer content</div></CustomerRoute>);
    expect(screen.queryByText('Customer content')).not.toBeInTheDocument();
  });

  test('shows Access Denied for staff role', () => {
    useAdmin.mockReturnValue({ user: { email: 'x@x.com' }, role: 'staff', loading: false });
    render(<CustomerRoute><div>Customer content</div></CustomerRoute>);
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });

  test('renders children for customer role', () => {
    useAdmin.mockReturnValue({ user: { email: 'c@c.com' }, role: 'customer', loading: false });
    render(<CustomerRoute><div>Customer content</div></CustomerRoute>);
    expect(screen.getByText('Customer content')).toBeInTheDocument();
  });

});