import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import navbarLogo from '/Full_Logo.png';

/* ==========================================
   NAVBAR COMPONENT
   ========================================== */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Add scroll listener to update styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close mobile menu on route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <nav className={`navbar-container ${scrolled ? 'navbar-scrolled' : 'navbar-top'} ${isHome ? 'nav-light-theme' : 'nav-dark-theme'}`}>
      <div className="navbar-inner max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between relative">

        {/* LOGO */}
        <Link to="/" className="navbar-logo flex items-center">
          <img
            src={navbarLogo}
            alt="MegaCharge"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8 h-full">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`}>Home</Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active-link' : ''}`}>Charger Models</Link>
          <Link to="/solutions" className={`nav-link ${location.pathname === '/solutions' ? 'active-link' : ''}`}>Rental Solutions</Link>
          <Link to="/franchise" className={`nav-link ${location.pathname === '/franchise' ? 'active-link' : ''}`}>Rental Franchise</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active-link' : ''}`}>Contact</Link>
        </div>

        {/* CTA & HAMBURGER */}
        <div className="flex items-center gap-4">
          <Link to="/franchise" className="hidden sm:inline-flex btn-premium-green text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300">
            Rent a Station
          </Link>

          {/* Mobile Menu 3-Line Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col justify-between w-6 h-4 text-megacharge-heading relative z-50 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className={`h-0.5 w-full bg-megacharge-heading rounded-full transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`h-0.5 w-full bg-megacharge-heading rounded-full transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-megacharge-heading rounded-full transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* MOBILE DROPDOWN PANEL */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-panel lg:hidden">
            <Link to="/" className="text-megacharge-heading text-base font-bold hover:text-megacharge-brand transition-colors py-2.5 border-b border-megacharge-heading border-opacity-10">Home</Link>
            <Link to="/products" className="text-megacharge-heading text-base font-bold hover:text-megacharge-brand transition-colors py-2.5 border-b border-megacharge-heading border-opacity-10">Charger Models</Link>
            <Link to="/solutions" className="text-megacharge-heading text-base font-bold hover:text-megacharge-brand transition-colors py-2.5 border-b border-megacharge-heading border-opacity-10">Rental Solutions</Link>
            <Link to="/franchise" className="text-megacharge-heading text-base font-bold hover:text-megacharge-brand transition-colors py-2.5 border-b border-megacharge-heading border-opacity-10">Rental Franchise</Link>
            <Link to="/contact" className="text-megacharge-heading text-base font-bold hover:text-megacharge-brand transition-colors py-2.5 border-b border-megacharge-heading border-opacity-10">Contact</Link>
            <Link to="/franchise" className="btn-premium-green text-white px-6 py-3 rounded-full font-bold text-sm text-center mt-3 shadow-glow-green">
              Rent a Station
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
