/**
 * ========================================
 * Footer Component
 * Purpose:
 * Renders the double-decker enterprise footer
 * containing corporate links, newsletter signups,
 * and company compliance info.
 *
 * Developer Notes:
 * Integrates state for newsletter confirmation.
 *
 * ========================================
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon } from '../CustomIcons/CustomIcons';
import './Footer.css';

/* ==========================================
   FOOTER COMPONENT
========================================== */

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer-container pt-16 pb-8 px-6 bg-megacharge-dark border-t border-megacharge-border">
      <div className="max-w-7xl mx-auto">
        
        {/* UPPER DECK: NEWSLETTER & BRAND STATEMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12 border-b border-megacharge-border">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="logo-icon-container">
                <span className="logo-lightning">⚡</span>
              </div>
              <span className="text-white font-poppins font-extrabold text-2xl tracking-tight">
                MEGA<span className="text-megacharge-green">CHARGE</span>
              </span>
            </Link>
            <p className="text-megacharge-text-secondary text-sm leading-relaxed mb-6">
              A premium EV infrastructure segment of **Mega Nirman & Industries Limited (MNIL)**. Powering India's electric mobility transition since 1983 with cutting-edge public and residential charger grids.
            </p>
          </div>
          
          <div className="lg:col-span-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-megacharge-card p-6 rounded-2xl border border-megacharge-border">
            <div className="max-w-md">
              <h4 className="text-white font-bold text-lg mb-1">Stay Charge-Connected</h4>
              <p className="text-megacharge-text-secondary text-xs">
                Subscribe to receive regional network expansion announcements, CPO SaaS updates, and regulatory subsidies news.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              {subscribed ? (
                <div className="text-megacharge-green text-sm font-semibold py-2 px-4 border border-megacharge-green rounded-full bg-megacharge-green bg-opacity-5">
                  ✓ Successfully subscribed to newsletter.
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    required
                    placeholder="Enter corporate email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-megacharge-dark border border-megacharge-border text-white text-sm px-5 py-3 rounded-full focus:outline-none focus:border-megacharge-green transition-colors min-w-[240px]"
                  />
                  <button type="submit" className="bg-megacharge-green hover:bg-opacity-95 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-glow-green">
                    Subscribe
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* MID DECK: LINKS & CONTACT INFO */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12">
          
          {/* Link Col 1: Products */}
          <div>
            <h5 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Products</h5>
            <ul className="flex flex-col gap-3">
              <li><Link to="/products" className="footer-link text-sm">Smart AC Chargers</Link></li>
              <li><Link to="/products" className="footer-link text-sm">Smart Fast DC Chargers</Link></li>
              <li><Link to="/products" className="footer-link text-sm">Portable Chargers</Link></li>
              <li><Link to="/solutions" className="footer-link text-sm">CPO SaaS Platform</Link></li>
            </ul>
          </div>

          {/* Link Col 2: Solutions */}
          <div>
            <h5 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Solutions</h5>
            <ul className="flex flex-col gap-3">
              <li><Link to="/solutions" className="footer-link text-sm">Commercial Charging</Link></li>
              <li><Link to="/solutions" className="footer-link text-sm">Residential Societies</Link></li>
              <li><Link to="/solutions" className="footer-link text-sm">Fleet Depots</Link></li>
              <li><Link to="/solutions" className="footer-link text-sm">Highway Fast Charging</Link></li>
            </ul>
          </div>

          {/* Link Col 3: Company */}
          <div>
            <h5 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Company</h5>
            <ul className="flex flex-col gap-3">
              <li><Link to="/about" className="footer-link text-sm">About Us</Link></li>
              <li><Link to="/sustainability" className="footer-link text-sm">Sustainability</Link></li>
              <li><Link to="/projects" className="footer-link text-sm">Projects Portfolio</Link></li>
              <li><Link to="/careers" className="footer-link text-sm">Careers & Jobs</Link></li>
            </ul>
          </div>

          {/* Link Col 4: Partners */}
          <div>
            <h5 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Partners</h5>
            <ul className="flex flex-col gap-3">
              <li><Link to="/franchise" className="footer-link text-sm">Franchise Program</Link></li>
              <li><Link to="/franchise" className="footer-link text-sm">Developer Alliances</Link></li>
              <li><Link to="/contact" className="footer-link text-sm">Dealer Application</Link></li>
              <li><Link to="/contact" className="footer-link text-sm">Installation Request</Link></li>
            </ul>
          </div>

          {/* Link Col 5: Head Office Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 border-t md:border-t-0 border-megacharge-border pt-6 md:pt-0">
            <h5 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Head Office</h5>
            <p className="text-megacharge-text-secondary text-xs leading-relaxed mb-4">
              811-812, Aggarwal Cyber Plaza-1, Netaji Subhash Place, Pitampura, Delhi, 110034
            </p>
            <div className="flex flex-col gap-2">
              <a href="tel:9289555090" className="flex items-center gap-2 text-sm text-white hover:text-megacharge-green transition-colors">
                <PhoneIcon className="w-4 h-4 text-megacharge-green" />
                <span>+91 92895 55090</span>
              </a>
              <a href="mailto:sales@megacharge.co.in" className="flex items-center gap-2 text-sm text-white hover:text-megacharge-green transition-colors">
                <span className="text-megacharge-green">✉</span>
                <span>sales@megacharge.co.in</span>
              </a>
            </div>
          </div>
        </div>

        {/* LOWER DECK: REGULATORY COMPLIANCE, MAPS & COPYRIGHT */}
        <div className="pt-8 border-t border-megacharge-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-megacharge-text-secondary text-xs">Certified compliance:</span>
            <div className="flex gap-3">
              <span className="text-[10px] text-white bg-megacharge-border px-2.5 py-1 rounded font-semibold border border-opacity-50">ISO 9001:2015</span>
              <span className="text-[10px] text-white bg-megacharge-border px-2.5 py-1 rounded font-semibold border border-opacity-50">OCPP 1.6 Compliant</span>
              <span className="text-[10px] text-white bg-megacharge-border px-2.5 py-1 rounded font-semibold border border-opacity-50">MNIL Segment</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="footer-link text-xs">Privacy Policy</Link>
            <Link to="/terms" className="footer-link text-xs">Terms & Conditions</Link>
            <span className="text-megacharge-text-secondary text-xs">
              &copy; {new Date().getFullYear()} MegaCharge. All rights reserved.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
