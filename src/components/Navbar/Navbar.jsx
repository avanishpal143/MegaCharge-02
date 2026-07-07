import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../../assets/logo.png';

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

  const isHomepage = location.pathname === '/';
  const shouldFloat = scrolled || !isHomepage;

  return (
    <nav className={`navbar-container ${shouldFloat ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="navbar-inner max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        
        {/* LOGO */}
        <Link to="/" className="navbar-logo flex items-center gap-2">
          <div className="logo-icon-container flex items-center justify-center">
            <img src={logoImg} alt="MegaCharge Logo" className="w-10 h-10 object-contain" />
          </div>
          <div className="flex flex-col items-start leading-none gap-0.5">
            <span className="logo-text font-poppins font-black text-xl tracking-tight uppercase">
              MEGA<span className="text-gradient-green">CHARGE</span>
            </span>
            <span className="text-[7.5px] font-mono tracking-[0.25em] text-megacharge-text-secondary uppercase">
              MNIL Holdings
            </span>
          </div>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8 h-full">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active-link text-megacharge-green' : ''}`}>Home</Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active-link text-megacharge-green' : ''}`}>Charger Models</Link>
          <Link to="/solutions" className={`nav-link ${location.pathname === '/solutions' ? 'active-link text-megacharge-green' : ''}`}>Rental Solutions</Link>
          <Link to="/franchise" className={`nav-link ${location.pathname === '/franchise' ? 'active-link text-megacharge-green' : ''}`}>Rental Franchise</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active-link text-megacharge-green' : ''}`}>Contact</Link>
        </div>

        {/* CTA & HAMBURGER */}
        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden sm:inline-flex border border-megacharge-green text-megacharge-green hover:bg-megacharge-green hover:text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 text-sm">
            Rent a Station
          </Link>
          
          {/* Mobile Menu 3-Line Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden flex flex-col justify-between w-6 h-4 text-white relative z-50 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className={`h-0.5 w-full bg-white rounded-full transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`h-0.5 w-full bg-white rounded-full transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-white rounded-full transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* MOBILE DROPDOWN PANEL */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-panel lg:hidden">
            <Link to="/" className="text-white text-base font-semibold hover:text-megacharge-green transition-colors py-2.5 border-b border-slate-800 border-opacity-40">Home</Link>
            <Link to="/products" className="text-white text-base font-semibold hover:text-megacharge-green transition-colors py-2.5 border-b border-slate-800 border-opacity-40">Charger Models</Link>
            <Link to="/solutions" className="text-white text-base font-semibold hover:text-megacharge-green transition-colors py-2.5 border-b border-slate-800 border-opacity-40">Rental Solutions</Link>
            <Link to="/franchise" className="text-white text-base font-semibold hover:text-megacharge-green transition-colors py-2.5 border-b border-slate-800 border-opacity-40">Rental Franchise</Link>
            <Link to="/contact" className="text-white text-base font-semibold hover:text-megacharge-green transition-colors py-2.5">Contact</Link>
            <Link to="/contact" className="border border-megacharge-green text-megacharge-green hover:bg-megacharge-green hover:text-white px-6 py-3 rounded-full font-bold transition-all duration-300 text-sm text-center mt-3 shadow-glow-green">
              Rent a Station
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
