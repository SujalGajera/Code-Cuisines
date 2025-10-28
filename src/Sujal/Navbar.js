import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);  // Properly initialized mobileOpen state
  const dropdownRef = useRef(null);

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
    const close = () => {
      setDropOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);

  return (
    <header className="cc-nav-wrap">
      <div className="cc-nav">
        {/* LEFT: Logo */}
        <Link to="/" className="cc-brand">
          <span className="cc-logo-pill">CC</span>
          <span className="cc-brand-text">Code Cuisine</span>
        </Link>

        {/* RIGHT: Desktop menu */}
        <nav className="cc-links">
          <NavLink to="/" className="cc-link">Home</NavLink>
          <NavLink to="/explore" className="cc-link">Explore</NavLink>
          <NavLink to="/about" className="cc-link">About Us</NavLink>

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
                <Link to="/login/staff" className="cc-menu-item" role="menuitem">Staff/Receptionist</Link>
                <Link to="/login/customer" className="cc-menu-item" role="menuitem">Customer</Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="cc-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}  // Proper toggling of mobileOpen state
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile slide panel */}
      <div className={`cc-mobile ${mobileOpen ? 'open' : ''}`}>
        <NavLink to="/" className="cc-mobile-link" onClick={() => setMobileOpen(false)}>Home</NavLink>
        <NavLink to="/explore" className="cc-mobile-link" onClick={() => setMobileOpen(false)}>Explore</NavLink>
        <NavLink to="/about" className="cc-mobile-link" onClick={() => setMobileOpen(false)}>About Us</NavLink>
        <div className="cc-mobile-divider" />
        <div className="cc-mobile-label">Login / Register</div>
        <Link to="/login/admin" className="cc-mobile-link" onClick={() => setMobileOpen(false)}>Admin</Link>
        <Link to="/login/staff" className="cc-mobile-link" onClick={() => setMobileOpen(false)}>Staff/Receptionist</Link>
        <Link to="/login/customer" className="cc-mobile-link" onClick={() => setMobileOpen(false)}>Customer</Link>
      </div>
    </header>
  );
}

export default Navbar;
