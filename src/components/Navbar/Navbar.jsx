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
  const isPartnersActive = ['/host-a-site', '/host-site', '/franchise'].includes(location.pathname);
  const isNetworkActive = location.pathname === '/network';
  const isAboutActive = location.pathname === '/about';
  const isContactActive = location.pathname === '/contact';

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

            {/* 2. CHARGERS (Direct Link) */}
            <li>
              <Link
                to="/solutions"
                className={`top-link ${isChargersActive ? 'current' : ''}`}
              >
                Chargers
              </Link>
            </li>

            {/* 3. GRID PARTNERS (Dropdown with ONLY 2 pages: Host a site & Franchise) */}
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
                className="mega partners-two"
                onMouseEnter={() => handleMouseEnter('partners')}
                onMouseLeave={handleMouseLeave}
              >
                <Link className="mi" to="/host-a-site" onClick={() => setOpenMenu(null)}>
                  <span className="ic">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#bf5a08" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 21s-7-4.4-7-10a7 7 0 1114 0c0 5.6-7 10-7 10z" />
                      <circle cx="12" cy="11" r="2.4" />
                    </svg>
                  </span>
                  <span>
                    <b>Host a site</b>
                    <small>Have land or parking? Zero investment, earn monthly rent</small>
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
                    <small>Own & operate a high-yield EV charging business</small>
                  </span>
                </Link>
              </div>
            </li>

            {/* 4. NETWORK (Direct Link) */}
            <li>
              <Link
                to="/network"
                className={`top-link ${isNetworkActive ? 'current' : ''}`}
              >
                Network
              </Link>
            </li>

            {/* 5. ABOUT (Direct Link) */}
            <li>
              <Link
                to="/about"
                className={`top-link ${isAboutActive ? 'current' : ''}`}
              >
                About
              </Link>
            </li>

            {/* 6. CONTACT US (Direct Link) */}
            <li>
              <Link
                to="/contact"
                className={`top-link ${isContactActive ? 'current' : ''}`}
              >
                Contact
              </Link>
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
          className="drawer-direct-link"
          to="/"
          onClick={() => setIsDrawerOpen(false)}
        >
          Home
        </Link>

        <Link
          className="drawer-direct-link"
          to="/solutions"
          onClick={() => setIsDrawerOpen(false)}
        >
          Chargers
        </Link>

        <details className="acc" open>
          <summary>
            Grid Partners{' '}
            <svg className="car" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <div className="body">
            <Link to="/host-a-site" onClick={() => setIsDrawerOpen(false)}>Host a site</Link>
            <Link to="/franchise" onClick={() => setIsDrawerOpen(false)}>Franchise</Link>
          </div>
        </details>

        <Link
          className="drawer-direct-link"
          to="/network"
          onClick={() => setIsDrawerOpen(false)}
        >
          Network
        </Link>

        <Link
          className="drawer-direct-link"
          to="/about"
          onClick={() => setIsDrawerOpen(false)}
        >
          About
        </Link>

        <Link
          className="drawer-direct-link"
          to="/contact"
          onClick={() => setIsDrawerOpen(false)}
        >
          Contact
        </Link>

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
        <Link className={location.pathname === '/host-a-site' ? 'on' : ''} to="/host-a-site">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#9c8b85" strokeWidth="2" strokeLinecap="round">
            <path d="M12 21s-7-4.4-7-10a7 7 0 1114 0c0 5.6-7 10-7 10z" />
            <circle cx="12" cy="11" r="2.4" />
          </svg>
          Host Site
        </Link>
        <Link className={location.pathname === '/franchise' ? 'on' : ''} to="/franchise">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#9c8b85" strokeWidth="2" strokeLinecap="round">
            <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
            <path d="M12 3v18" />
          </svg>
          Franchise
        </Link>
        <Link className={isNetworkActive ? 'on' : ''} to="/network">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#9c8b85" strokeWidth="2" strokeLinecap="round">
            <path d="M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3z" />
          </svg>
          Map
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
