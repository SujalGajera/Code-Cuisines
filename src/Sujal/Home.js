import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../assets/CodeCuisineLogo.png';

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login/customer');
  };

  const handleFeatureClick = () => {
    navigate('/login/customer');
  };

  return (
    <main className="cc-home">
      {/* HERO */}
      <section className="cc-hero">
        <div className="cc-hero-bg" />
        <div className="cc-hero-inner">
          <div className="cc-hero-icon">
            <img src={logo} alt="Code Cuisine" className="cc-hero-logo" />
          </div>

          <h1 className="cc-hero-title">
            Taste the Code,<br />
            <span>Serve the Cuisine</span>
          </h1>

          <p className="cc-hero-sub">
            Experience the future of restaurant management. From seamless reservations to
            efficient kitchen operations, Code Cuisine transforms how restaurants serve their
            customers with cutting-edge technology and intuitive design.
          </p>

          <div className="cc-hero-cta">
            <button className="cc-btn cc-btn-primary" onClick={handleGetStarted}>Get Started</button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="cc-features" id="features">
        <div className="cc-container">
          <h2 className="cc-section-title">Explore Our Features</h2>
          <p className="cc-section-sub">
            Discover how Code Cuisine streamlines every aspect of your dining experience
          </p>

          <div className="cc-feature-grid">
            {/* Card 1 */}
            <article className="cc-card">
              <div className="cc-card-media cc-media-menu">
                <div className="cc-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="cc-card-body">
                <h3 className="cc-card-title">View Menu</h3>
                <p className="cc-card-text">
                  Browse our extensive digital menu with beautiful images, detailed descriptions,
                  and real-time availability updates.
                </p>
                <button className="cc-btn cc-btn-secondary" onClick={handleFeatureClick}>Explore Menu</button>
              </div>
            </article>

            {/* Card 2 */}
            <article className="cc-card">
              <div className="cc-card-media cc-media-reserve">
                <div className="cc-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="cc-card-body">
                <h3 className="cc-card-title">Reserve a Table</h3>
                <p className="cc-card-text">
                  Book your table instantly with our smart reservation system. Choose your
                  preferred time, party size, and seating preferences.
                </p>
                <button className="cc-btn cc-btn-secondary" onClick={handleFeatureClick}>Book Now</button>
              </div>
            </article>

            {/* Card 3 */}
            <article className="cc-card">
              <div className="cc-card-media cc-media-order">
                <div className="cc-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-3M9 2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1M9 2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1m-6 5h6m-6 4h6m-6 4h4" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="cc-card-body">
                <h3 className="cc-card-title">Order Online</h3>
                <p className="cc-card-text">
                  Enjoy your favorite dishes at home. Order online for delivery or pickup with
                  real-time order tracking and updates.
                </p>
                <button className="cc-btn cc-btn-secondary" onClick={handleFeatureClick}>Order Now</button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="cc-about" id="about">
        <div className="cc-container cc-about-grid">
          <div className="cc-about-media">
            <div className="cc-about-img" />
            <div className="cc-metric">
              <div className="cc-metric-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm7 9a7 7 0 0 0-14 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="cc-metric-num">10,000+</div>
                <div className="cc-metric-sub">Happy Customers</div>
              </div>
            </div>
          </div>

          <div className="cc-about-text">
            <div className="cc-pill">About Code Cuisine</div>
            <h2 className="cc-about-title">Redefining Restaurant Excellence</h2>
            <p className="cc-about-lead">
              Code Cuisine is more than just a restaurant management platform—it's a
              comprehensive ecosystem designed to elevate every aspect of the dining
              experience. From the moment a customer browses our menu to the final bite,
              we ensure seamless operations and unforgettable moments.
            </p>
            <p className="cc-about-body">
              Our innovative system empowers restaurants to manage reservations efficiently,
              streamline kitchen operations, track inventory in real-time, and deliver
              exceptional customer service—all through an intuitive, modern interface.
            </p>

            <ul className="cc-about-bullets">
              <li><span className="dot" /> Smart Kitchen Management</li>
              <li><span className="dot" /> Real-time Updates</li>
              <li><span className="dot" /> Customer Insights</li>
              <li><span className="dot" /> Easy Reservations</li>
            </ul>

            <button className="cc-btn cc-btn-primary">Discover More</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cc-footer">
        <div className="cc-container cc-footer-grid">
          <div className="cc-foot-brand">
            <img src={logo} alt="Code Cuisine Logo" className="cc-foot-logo" />
            <div className="cc-foot-name">Code Cuisine</div>
            <p className="cc-foot-desc">
              Revolutionizing restaurant management with modern technology and seamless dining experiences.
            </p>
          </div>

          <div className="cc-foot-links">
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="#features">Explore</a>
            <a href="#about">About Us</a>
            <a href="/login/admin">Login</a>
          </div>

          <div className="cc-foot-contact">
            <h4>Contact Us</h4>
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ info@codecuisine.com</p>
            <p>📍 123 Restaurant Ave, Food City</p>
            <div className="cc-foot-social">
              <a href="#!">f</a>
              <a href="#!">i</a>
              <a href="#!">x</a>
            </div>
          </div>
        </div>

        <div className="cc-foot-bottom">
          © 2025 Code Cuisine | All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}

export default Home;