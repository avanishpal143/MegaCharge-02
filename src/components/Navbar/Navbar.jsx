import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

/* ==========================================
   MEGAEV NAVBAR COMPONENT
   ========================================== */

const Navbar = () => {
  const [tight, setTight] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // 'chargers' | 'partners' | 'network' | 'contact' | null
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Toggle tight capsule state on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setTight((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route changes
  useEffect(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenMenu(null);
    setIsDrawerOpen(false);
  }, [location]);

  // Click outside to close desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        setOpenMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        setOpenMenu(null);
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Drawer body overflow toggle
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isDrawerOpen]);

  const closeTimerRef = useRef(null);

  const handleMouseEnter = (menuName) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu(menuName);
  };

  const handleMouseLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 220);
  };

  const toggleDropdown = (menuName, e) => {
    if (e) e.stopPropagation();
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const isChargersActive = ['/solutions', '/products'].includes(location.pathname);
  const isPartnersActive = location.pathname === '/franchise';
  const isNetworkActive = location.pathname === '/network';
  const isContactActive = ['/contact', '/about', '/careers'].includes(location.pathname);

  return (
    <div className={`navbar-wrapper ${tight ? 'scrolled' : ''}`}>

      {/* ---------- Sticky / Floating Navigation Header ---------- */}
      <header className={`head ${tight ? 'tight' : ''}`} id="head">
        <div className="bar">
          {/* Brand Logo */}
          <Link className="brand" to="/" aria-label="MegaEV Home">
            <svg width="27" height="27" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M4 27V6l11 12" stroke="#1c9d5c" strokeWidth="3.4" fill="none" strokeLinejoin="round" />
              <path d="M28 5v21L17 14" stroke="#f0801f" strokeWidth="3.4" fill="none" strokeLinejoin="round" />
            </svg>
            MEGAEV
          </Link>

          {/* Primary Nav Items */}
          <ul className="primary" id="primary-nav" ref={navRef}>
            {/* 1. HOME */}
            <li>
              <Link
                to="/"
                className={`top-link ${location.pathname === '/' ? 'current' : ''}`}
              >
                Home
              </Link>
            </li>

            {/* 2. CHARGERS */}
            <li
              data-open={openMenu === 'chargers' ? 'true' : 'false'}
              onMouseEnter={() => handleMouseEnter('chargers')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`top-link ${isChargersActive ? 'current' : ''}`}
                aria-expanded={openMenu === 'chargers'}
                onClick={(e) => toggleDropdown('chargers', e)}
              >
                Chargers
                <svg className="car" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div 
                className="mega two"
                onMouseEnter={() => handleMouseEnter('chargers')}
                onMouseLeave={handleMouseLeave}
              >
                <Link className="mi" to="/solutions" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <rect x="6" y="3" width="12" height="18" rx="3" />
                      <path d="M12 8v4M10 16h4" />
                    </svg>
                  </span>
                  <span>
                    <b>AC wallbox</b>
                    <small>3.3 to 22 kW for homes, offices and societies</small>
                  </span>
                </Link>
                <Link className="mi" to="/solutions" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                    </svg>
                  </span>
                  <span>
                    <b>DC fast</b>
                    <small>30 to 240 kW for highways and commercial sites</small>
                  </span>
                </Link>
                <Link className="mi" to="/solutions" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 3h14l-2 18H7L5 3zM9 8h6" />
                    </svg>
                  </span>
                  <span>
                    <b>Portable</b>
                    <small>3.3 kW plug-in unit for travel and emergencies</small>
                  </span>
                </Link>
                <Link className="mi" to="/products" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 6h18M3 12h18M3 18h18" />
                    </svg>
                  </span>
                  <span>
                    <b>Compare all models</b>
                    <small>Filter by capacity, connector and lease rate</small>
                  </span>
                </Link>
                <div className="mega-foot">
                  <p>Lease from ₹490 a month, or buy outright.</p>
                  <Link to="/solutions" onClick={() => setOpenMenu(null)}>SEE LEASE RATES</Link>
                </div>
              </div>
            </li>

            {/* 3. GRID PARTNERS */}
            <li
              data-open={openMenu === 'partners' ? 'true' : 'false'}
              onMouseEnter={() => handleMouseEnter('partners')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`top-link ${isPartnersActive ? 'current' : ''}`}
                aria-expanded={openMenu === 'partners'}
                onClick={(e) => toggleDropdown('partners', e)}
              >
                Grid Partners
                <svg className="car" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div 
                className="mega two"
                onMouseEnter={() => handleMouseEnter('partners')}
                onMouseLeave={handleMouseLeave}
              >
                <Link className="mi" to="/franchise" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                    </svg>
                  </span>
                  <span>
                    <b>Own a hub<span className="tag">NEW</span></b>
                    <small>Take a share of a working site from ₹10,000</small>
                  </span>
                </Link>
                <Link className="mi" to="/franchise" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 21s-7-4.4-7-10a7 7 0 1114 0c0 5.6-7 10-7 10z" />
                      <circle cx="12" cy="11" r="2.4" />
                    </svg>
                  </span>
                  <span>
                    <b>Host a site</b>
                    <small>Have land or parking? We build and run it</small>
                  </span>
                </Link>
                <Link className="mi" to="/franchise" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
                      <path d="M12 3v18" />
                    </svg>
                  </span>
                  <span>
                    <b>Franchise</b>
                    <small>Run a MegaCharge territory as your own business</small>
                  </span>
                </Link>
                <Link className="mi" to="/franchise" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 3v18h18" />
                      <path d="M7 15l4-5 3 3 5-7" />
                    </svg>
                  </span>
                  <span>
                    <b>Site economics</b>
                    <small>How a charge point actually makes money</small>
                  </span>
                </Link>
                <div className="mega-foot">
                  <p>Partner payouts credited monthly. Targeted, not guaranteed.</p>
                  <Link to="/franchise" onClick={() => setOpenMenu(null)}>VIEW OPEN SITES</Link>
                </div>
              </div>
            </li>

            {/* 4. NETWORK */}
            <li
              data-open={openMenu === 'network' ? 'true' : 'false'}
              onMouseEnter={() => handleMouseEnter('network')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`top-link ${isNetworkActive ? 'current' : ''}`}
                aria-expanded={openMenu === 'network'}
                onClick={(e) => toggleDropdown('network', e)}
              >
                Network
                <svg className="car" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div 
                className="mega"
                onMouseEnter={() => handleMouseEnter('network')}
                onMouseLeave={handleMouseLeave}
              >
                <Link className="mi" to="/network" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3z" />
                    </svg>
                  </span>
                  <span>
                    <b>Live charger map</b>
                    <small>Find and navigate to any MegaCharge point</small>
                  </span>
                </Link>
                <Link className="mi" to="/network" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                  </span>
                  <span>
                    <b>Uptime and support</b>
                    <small>How we keep 97.6% of the network live</small>
                  </span>
                </Link>
                <Link className="mi" to="/network" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="4" width="18" height="16" rx="3" />
                      <path d="M8 2v4M16 2v4M3 10h18" />
                    </svg>
                  </span>
                  <span>
                    <b>Coming soon</b>
                    <small>Sites under construction across the corridor</small>
                  </span>
                </Link>
              </div>
            </li>

            {/* 5. CONTACT US */}
            <li
              data-open={openMenu === 'contact' ? 'true' : 'false'}
              onMouseEnter={() => handleMouseEnter('contact')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`top-link ${isContactActive ? 'current' : ''}`}
                aria-expanded={openMenu === 'contact'}
                onClick={(e) => toggleDropdown('contact', e)}
              >
                Contact us
                <svg className="car" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div 
                className="mega two"
                onMouseEnter={() => handleMouseEnter('contact')}
                onMouseLeave={handleMouseLeave}
              >
                <Link className="mi" to="/contact" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7 12 12 0 00.7 2.8 2 2 0 01-.4 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.4 1.8.6 2.8.7a2 2 0 011.7 2.1z" />
                    </svg>
                  </span>
                  <span>
                    <b>Talk to sales</b>
                    <small>NSP Pitampura, New Delhi · Mon to Sat</small>
                  </span>
                </Link>
                <Link className="mi" to="/about" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 16v-5M12 8h.01" />
                    </svg>
                  </span>
                  <span>
                    <b>About MNIL</b>
                    <small>The listed company behind MegaCharge</small>
                  </span>
                </Link>
                <Link className="mi" to="/about" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <path d="M14 2v6h6M9 15h6" />
                    </svg>
                  </span>
                  <span>
                    <b>Investor relations</b>
                    <small>Filings, results and disclosures — BSE 539767</small>
                  </span>
                </Link>
                <Link className="mi" to="/careers" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 00-3-3.9" />
                    </svg>
                  </span>
                  <span>
                    <b>Careers</b>
                    <small>Sales, field operations and engineering roles</small>
                  </span>
                </Link>
              </div>
            </li>
          </ul>

          {/* Action Button (Sign In) & Hamburger */}
          <div className="tail">
            <Link to="/contact" className="cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-1a7 7 0 0114 0v1" />
              </svg>
              SIGN IN
            </Link>
            <button
              type="button"
              className="burger"
              id="burger"
              aria-label="Open navigation menu"
              aria-expanded={isDrawerOpen}
              onClick={() => setIsDrawerOpen((prev) => !prev)}
            >
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Mobile Scrim Overlay ---------- */}
      <div
        className="scrim"
        id="scrim"
        data-on={isDrawerOpen ? 'true' : 'false'}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* ---------- Mobile Drawer Navigation ---------- */}
      <aside
        className="drawer"
        id="drawer"
        aria-label="Mobile Navigation Menu"
        data-on={isDrawerOpen ? 'true' : 'false'}
      >
        <div className="drawer-top">
          <Link className="brand" to="/" onClick={() => setIsDrawerOpen(false)}>
            <svg width="25" height="25" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M4 27V6l11 12" stroke="#1c9d5c" strokeWidth="3.4" fill="none" strokeLinejoin="round" />
              <path d="M28 5v21L17 14" stroke="#f0801f" strokeWidth="3.4" fill="none" strokeLinejoin="round" />
            </svg>
            MEGAEV
          </Link>
          <button
            type="button"
            className="drawer-close-btn"
            id="close"
            aria-label="Close menu"
            onClick={() => setIsDrawerOpen(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <Link
          className="acc"
          to="/"
          style={{ display: 'block', padding: '17px 2px', fontSize: '17px', fontWeight: 700, color: 'var(--mega-ink)' }}
          onClick={() => setIsDrawerOpen(false)}
        >
          Home
        </Link>

        <details className="acc">
          <summary>
            Chargers{' '}
            <svg className="car" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <div className="body">
            <Link to="/solutions" onClick={() => setIsDrawerOpen(false)}>AC wallbox</Link>
            <Link to="/solutions" onClick={() => setIsDrawerOpen(false)}>DC fast</Link>
            <Link to="/solutions" onClick={() => setIsDrawerOpen(false)}>Portable</Link>
            <Link to="/products" onClick={() => setIsDrawerOpen(false)}>Compare all models</Link>
          </div>
        </details>

        <details className="acc">
          <summary>
            Grid Partners{' '}
            <svg className="car" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <div className="body">
            <Link to="/franchise" onClick={() => setIsDrawerOpen(false)}>Own a hub</Link>
            <Link to="/franchise" onClick={() => setIsDrawerOpen(false)}>Host a site</Link>
            <Link to="/franchise" onClick={() => setIsDrawerOpen(false)}>Franchise</Link>
            <Link to="/franchise" onClick={() => setIsDrawerOpen(false)}>Site economics</Link>
          </div>
        </details>

        <details className="acc">
          <summary>
            Network{' '}
            <svg className="car" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <div className="body">
            <Link to="/network" onClick={() => setIsDrawerOpen(false)}>Live charger map</Link>
            <Link to="/network" onClick={() => setIsDrawerOpen(false)}>Uptime and support</Link>
            <Link to="/network" onClick={() => setIsDrawerOpen(false)}>Coming soon</Link>
          </div>
        </details>

        <details className="acc">
          <summary>
            Contact us{' '}
            <svg className="car" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <div className="body">
            <Link to="/contact" onClick={() => setIsDrawerOpen(false)}>Talk to sales</Link>
            <Link to="/about" onClick={() => setIsDrawerOpen(false)}>About MNIL</Link>
            <Link to="/about" onClick={() => setIsDrawerOpen(false)}>Investor relations</Link>
            <Link to="/careers" onClick={() => setIsDrawerOpen(false)}>Careers</Link>
          </div>
        </details>

        <Link
          to="/contact"
          className="cta"
          onClick={() => setIsDrawerOpen(false)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21v-1a7 7 0 0114 0v1" />
          </svg>
          SIGN IN
        </Link>
      </aside>

      {/* ---------- Mobile Bottom Tab Bar ---------- */}
      <nav className="tabbar" aria-label="Quick Access">
        <Link className={location.pathname === '/' ? 'on' : ''} to="/">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#9c8b85" strokeWidth="2" strokeLinecap="round">
            <path d="M3 10l9-7 9 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          Home
        </Link>
        <Link className={isChargersActive ? 'on' : ''} to="/solutions">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#9c8b85" strokeWidth="2" strokeLinecap="round">
            <rect x="6" y="3" width="12" height="18" rx="3" />
            <path d="M12 8v4" />
          </svg>
          Chargers
        </Link>
        <Link className={isPartnersActive ? 'on' : ''} to="/franchise">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#9c8b85" strokeWidth="2" strokeLinecap="round">
            <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
          </svg>
          Partner
        </Link>
        <Link className={isNetworkActive ? 'on' : ''} to="/network">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#9c8b85" strokeWidth="2" strokeLinecap="round">
            <path d="M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3z" />
          </svg>
          Map
        </Link>
        <Link className={isContactActive ? 'on' : ''} to="/contact">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#9c8b85" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21v-1a7 7 0 0114 0v1" />
          </svg>
          Account
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
