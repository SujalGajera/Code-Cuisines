import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';
import logo from '../assets/CodeCuisineLogo.png';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuPreviewOpen, setIsMenuPreviewOpen] = useState(false);
  const [previewQuantities, setPreviewQuantities] = useState({});

  // Quick preview dishes (NZD prices + food images)
const previewItems = [
  {
    id: 1,
    name: 'Smoked Salmon Benedict',
    description:
      'Toasted sourdough, poached eggs, smoked salmon and house hollandaise.',
    price: 'NZ$18.50',
    // breakfast / eggs style image
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Creamy Alfredo Pasta',
    description:
      'Fresh fettuccine tossed in a rich parmesan cream with garlic and herbs.',
    price: 'NZ$24.00',
    // pasta image
    image: 'https://cdn.pixabay.com/photo/2022/11/07/15/47/creamy-mushroom-chicken-pasta-7576678_1280.jpg',
  },
  {
    id: 3,
    name: 'Grilled Chicken Bowl',
    description:
      'Marinated chicken, roasted veggies and jasmine rice with a citrus dressing.',
    price: 'NZ$25.90',
    // chicken bowl / salad style
    image: 'https://cdn.pixabay.com/photo/2015/04/28/15/49/fast-food-743846_1280.jpg',
  },
  {
    id: 4,
    name: 'Signature Brownie Sundae',
    description:
      'Warm chocolate brownie topped with vanilla ice cream and toasted nuts.',
    price: 'NZ$14.50',
    // dessert / brownie image
    image: 'https://cdn.pixabay.com/photo/2017/08/31/15/49/banana-split-2701128_1280.jpg',
  },
];


  // Smooth scroll when route contains #features or #about
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const handleGetStarted = () => {
    navigate('/login/customer');
  };

  const handleFeatureClick = () => {
    navigate('/login/customer');
  };

  const openMenuPreview = () => {
    setIsMenuPreviewOpen(true);
  };

  const closeMenuPreview = () => {
    setIsMenuPreviewOpen(false);
  };

  const getQuantity = (id) => previewQuantities[id] || 1;

  const changeQuantity = (id, delta) => {
    setPreviewQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleAddItemAndLogin = () => {
    // In future you can store selected items before redirect
    navigate('/login/customer');
  };

  const handleViewFullMenu = () => {
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

          <div className="cc-hero-text">
            <span className="cc-pill">Smart Restaurant Suite</span>
            <h1 className="cc-hero-title">
              Manage Your Restaurant
              <span> the Modern Way</span>
            </h1>
            <p className="cc-hero-sub">
              From online reservations to live menu management and secure payments,
              Code Cuisine gives you everything you need to run a high-performing
              restaurant—all in one place.
            </p>

            <div className="cc-hero-cta">
              <button className="cc-btn cc-btn-primary" onClick={handleGetStarted}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="cc-features" id="features">
        <div className="cc-container">
          <h2 className="cc-section-title">Explore Our Features</h2>
          <div className="cc-feature-grid">
            {/* Card 1 */}
            <article className="cc-card">
              <div className="cc-card-media cc-media-menu">
                <div className="cc-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="white"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="cc-card-body">
                <h3 className="cc-card-title">View Menu</h3>
                <p className="cc-card-text">
                  Explore our immersive digital menu, featuring stunning images, detailed descriptions, 
                  and real-time availability for a seamless ordering experience.
                </p>
                <button className="cc-btn cc-btn-secondary" onClick={openMenuPreview}>
                  Explore Menu
                </button>
              </div>
            </article>

            {/* Card 2 */}
            <article className="cc-card">
              <div className="cc-card-media cc-media-reserve">
                <div className="cc-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18"
                      stroke="white"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="cc-card-body">
                <h3 className="cc-card-title">Reserve a Table</h3>
                <p className="cc-card-text">
                  Book your table instantly with our smart reservation system. Choose your
                  preferred time, party size, and seating preferences.
                </p>
                <button className="cc-btn cc-btn-secondary" onClick={handleFeatureClick}>
                  Book Now
                </button>
              </div>
            </article>

            {/* Card 3 */}
            <article className="cc-card">
              <div className="cc-card-media cc-media-order">
                <div className="cc-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18"
                      stroke="white"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="cc-card-body">
                <h3 className="cc-card-title">Order Online</h3>
                <p className="cc-card-text">
                  Enjoy your favorite dishes at home. Order online for delivery or pickup
                  with real-time order tracking and updates.
                </p>
                <button className="cc-btn cc-btn-secondary" onClick={handleFeatureClick}>
                  Order Now
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* MENU PREVIEW MODAL */}
      {isMenuPreviewOpen && (
        <div className="cc-menu-modal-backdrop" onClick={closeMenuPreview}>
          <div className="cc-menu-modal" onClick={(e) => e.stopPropagation()}>
            <header className="cc-menu-modal-header">
              <div>
                <h3 className="cc-menu-modal-title">Quick Menu Preview</h3>
                <p className="cc-menu-modal-sub">
                  A glimpse at some of our popular dishes. All prices shown in NZD (indicative
                  market pricing).
                </p>
              </div>
              <button
                type="button"
                className="cc-menu-modal-close"
                onClick={closeMenuPreview}
                aria-label="Close"
              >
                ×
              </button>
            </header>

            <div className="cc-menu-modal-body">
              {previewItems.map((item) => (
                <div key={item.id} className="cc-menu-item-card">
                  <div className="cc-menu-item-media">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cc-menu-item-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="cc-menu-item-main">
                    <h4 className="cc-menu-item-name">{item.name}</h4>
                    <p className="cc-menu-item-desc">{item.description}</p>
                  </div>

                  <div className="cc-menu-item-meta">
                    <div className="cc-menu-item-price">{item.price}</div>
                    <div className="cc-menu-item-qty">
                      <button
                        type="button"
                        className="cc-qty-btn"
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="cc-qty-value">{getQuantity(item.id)}</span>
                      <button
                        type="button"
                        className="cc-qty-btn"
                        onClick={() => changeQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cc-btn cc-btn-primary cc-menu-item-add"
                      onClick={handleAddItemAndLogin}
                    >
                      Add &amp; Login
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <footer className="cc-menu-modal-footer">
              <button
                type="button"
                className="cc-btn cc-btn-primary"
                onClick={handleViewFullMenu}
              >
                View Full Menu &amp; Login
              </button>
              <button
                type="button"
                className="cc-btn cc-btn-ghost"
                onClick={closeMenuPreview}
              >
                Not now
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* ABOUT SECTION */}
      <section className="cc-about" id="about">
        <div className="cc-container cc-about-grid">
          <div className="cc-about-media">
            <div className="cc-about-img" />
            <div className="cc-metric">
              <div className="cc-metric-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm7 9a7 7 0 0 0-14 0"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
            <p className="cc-about-body">
              Code Cuisine is more than just a restaurant management platform—it's a
              comprehensive ecosystem designed to elevate every aspect of the dining
              experience.
            </p>

            <p className="cc-about-body">
              Our system empowers restaurants to manage reservations efficiently, streamline
              kitchen operations, track inventory in real-time, and deliver exceptional
              customer service—all through an intuitive interface.
            </p>

            <ul className="cc-about-bullets">
              <li>
                <span className="dot" /> Smart Kitchen Management
              </li>
              <li>
                <span className="dot" /> Real-time Updates
              </li>
              <li>
                <span className="dot" /> Customer Insights
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="cc-testimonials">
        <div className="cc-container">
          <h2 className="cc-section-title">Loved by Modern Restaurants</h2>
          <p className="cc-section-sub">
            Restaurants of all sizes trust Code Cuisine to optimize operations and delight
            guests.
          </p>

          <div className="cc-testimonial-grid">
            <article className="cc-testimonial-card">
              <p className="cc-quote">
                “Code Cuisine has completely transformed how we manage reservations and online
                orders. Our staff is more efficient and our guests love the seamless
                experience.”
              </p>
              <div className="cc-quote-author">
                <div className="cc-avatar">AK</div>
                <div>
                  <div className="cc-author-name">Aarav Kulkarni</div>
                  <div className="cc-author-role">Owner, Urban Plates Bistro</div>
                </div>
              </div>
            </article>

            <article className="cc-testimonial-card">
              <p className="cc-quote">
                “From the kitchen to the front desk, everything is in sync. Real-time updates
                and powerful analytics help us make better decisions every day.”
              </p>
              <div className="cc-quote-author">
                <div className="cc-avatar">MS</div>
                <div>
                  <div className="cc-author-name">Mira Shah</div>
                  <div className="cc-author-role">General Manager, Spice Route</div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="cc-cta-strip">
        <div className="cc-container cc-cta-inner">
          <div>
            <h2 className="cc-cta-title">Ready to Upgrade Your Restaurant Experience?</h2>
            <p className="cc-cta-sub">
              Join Code Cuisine today and give your guests the seamless dining experience they
              deserve.
            </p>
          </div>
          <button className="cc-btn cc-btn-primary" onClick={handleGetStarted}>
            Start Now
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cc-footer">
        <div className="cc-container cc-footer-grid">
          {/* BRAND */}
          <div className="cc-foot-brand">
            <img src={logo} alt="Code Cuisine Logo" className="cc-foot-logo" />
            <div className="cc-foot-name">Code Cuisine</div>
            <p className="cc-foot-desc">
              Revolutionizing restaurant management with modern technology and seamless dining
              experiences.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="cc-foot-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="cc-foot-links">
            <h4>Support</h4>
            <ul>
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div className="cc-foot-links">
            <h4>Connect</h4>
            <ul>
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Facebook
                </a>
              </li>
            </ul>
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
