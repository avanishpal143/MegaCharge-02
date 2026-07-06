import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PhoneIcon } from '../CustomIcons/CustomIcons';
import './Navbar.css';

/* ==========================================
   NAVBAR COMPONENT
========================================== */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
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

  const isHomepage = location.pathname === '/';
  const shouldFloat = scrolled || !isHomepage;

  return (
    <nav className={`navbar-container ${shouldFloat ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="navbar-inner max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="navbar-logo flex items-center gap-3">
          <div className="logo-icon-container">
            <svg className="logo-icon-svg w-9 h-9" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00B4D8" />
                  <stop offset="100%" stopColor="#0077B6" />
                </linearGradient>
                <filter id="logoGlow">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Outer hexagonal tech border */}
              <path d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z" stroke="url(#logoGrad)" strokeWidth="1.5" strokeOpacity="0.6" fill="rgba(11, 19, 43, 0.45)" />
              {/* Glowing internal tech electric bolt */}
              <path d="M16 6L22 13H17.5L20.5 21.5L14 13.5H18.5L16 6Z" fill="url(#logoGrad)" filter="url(#logoGlow)" />
            </svg>
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

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden sm:inline-flex border border-megacharge-green text-megacharge-green hover:bg-megacharge-green hover:text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 text-sm">
            Rent a Station
          </Link>
          <a href="tel:9289555090" className="bg-megacharge-green hover:bg-opacity-90 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm shadow-glow-green">
            Helpline
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
