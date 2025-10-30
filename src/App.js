import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Sujal/Navbar';
import Home from './Sujal/Home';

// Placeholder components
const Explore = () => <div>Explore Page</div>;
const About = () => <div>About Us Page</div>;

const AdminLogin = () => <div>Admin Login Page</div>;
const StaffLogin = () => <div>Staff/Receptionist Login Page</div>;
const CustomerLogin = () => <div>Customer Login Page</div>;


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/staff" element={<StaffLogin />} />
        <Route path="/login/customer" element={<CustomerLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
 