import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

// Import the logo file using the correct relative path
import logo from '../assets/CodeCuisineLogo.png'; 

function Navbar() {
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropOpen(false);
  }, [location]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle mobile menu
  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  // Close mobile menu
  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <header className="cc-nav-wrap">
      <div className="cc-nav">
        {/* LEFT: Logo */}
        <Link to="/" className="cc-brand" onClick={closeMobile}>
          <img src={logo} alt="Code & Cuisine Logo" className="cc-logo-img" />
          <span className="cc-brand-text">Code & Cuisine</span>
        </Link>

        {/* RIGHT: Desktop menu */}
        <nav className="cc-links">
          <NavLink to="/" className="cc-link">Home</NavLink>
          <a href="/#features" className="cc-link">Explore</a>
          <a href="/#about" className="cc-link">About Us</a>

          {/* Dropdown */}
          <div className="cc-dropdown" ref={dropdownRef}>
            <button
              className="cc-primary-btn"
              aria-haspopup="true"
              aria-expanded={dropOpen}
              onClick={() => setDropOpen((v) => !v)}
            >
              Login/Register
              <svg className={`caret ${dropOpen ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

           {dropOpen && (
                <div className="cc-menu" role="menu">
                <Link to="/login/admin" className="cc-menu-item" role="menuitem">Admin</Link>
                <Link to="/signup" className="cc-menu-item" role="menuitem">Staff/Receptionist</Link>
                <Link to="/login/customer" className="cc-menu-item" role="menuitem">Customer</Link>
            </div>
          )}

          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`cc-hamburger ${mobileOpen ? 'active' : ''}`}
          aria-label="Toggle menu"
          onClick={toggleMobile}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="cc-mobile-overlay active" 
          onClick={closeMobile}
        />
      )}

      {/* Mobile slide panel */}
      <div className={`cc-mobile ${mobileOpen ? 'open' : ''}`}>
        <NavLink to="/" className="cc-mobile-link" onClick={closeMobile}>Home</NavLink>
        <NavLink to="/explore" className="cc-mobile-link" onClick={closeMobile}>Explore</NavLink>
        <NavLink to="/about" className="cc-mobile-link" onClick={closeMobile}>About Us</NavLink>
        <div className="cc-mobile-divider" />
        <div className="cc-mobile-label">Login / Register</div>
        <Link to="/login/admin" className="cc-mobile-link" onClick={closeMobile}>Admin</Link>
        <Link to="/signup" className="cc-mobile-link" onClick={closeMobile}>Staff/Receptionist</Link>
        <Link to="/login/customer" className="cc-mobile-link" onClick={closeMobile}>Customer</Link>
      </div>
    </header>
  );
}

export default Navbar;