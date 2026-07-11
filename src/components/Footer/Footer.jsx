import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, IconGoogleMail } from '../CustomIcons/CustomIcons';
import './Footer.css';
import fullLogo from '/Full_Logo.png';

/* ==========================================
   FOOTER COMPONENT
   ========================================== */

const Footer = () => {
  return (
    <footer className="footer-container pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* UPPER DECK: BRAND STATEMENT ONLY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12 border-b border-megacharge-heading border-opacity-20">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-5">
              <img
                src={fullLogo}
                alt="MegaCharge"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-megacharge-card text-opacity-80 text-sm leading-relaxed max-w-2xl font-inter">
              A premium EV infrastructure segment of <strong className="text-white font-bold font-montserrat">Mega Nirman & Industries Limited (MNIL)</strong>. Powering India's electric mobility transition since 1983 with cutting-edge public and residential charger grids. We rent out state-of-the-art charging stations and manage end-to-end installations.
            </p>
          </div>
        </div>

        {/* MID DECK: LINKS & CONTACT INFO */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 font-inter">
          
          {/* Link Col 1: Products */}
          <div>
            <h5 className="text-white font-bold text-sm mb-4 uppercase tracking-wider font-montserrat">Products</h5>
            <ul className="flex flex-col gap-3">
              <li><Link to="/products" className="footer-link text-sm">Smart AC Chargers</Link></li>
              <li><Link to="/products" className="footer-link text-sm">Smart Fast DC Chargers</Link></li>
            </ul>
          </div>

          {/* Link Col 2: Rental Solutions */}
          <div>
            <h5 className="text-white font-bold text-sm mb-4 uppercase tracking-wider font-montserrat">Rental Solutions</h5>
            <ul className="flex flex-col gap-3">
              <li><Link to="/solutions" className="footer-link text-sm">Commercial Charging</Link></li>
              <li><Link to="/solutions" className="footer-link text-sm">Residential Societies</Link></li>
              <li><Link to="/solutions" className="footer-link text-sm">Fleet Depots</Link></li>
            </ul>
          </div>

          {/* Link Col 3: Partnerships */}
          <div>
            <h5 className="text-white font-bold text-sm mb-4 uppercase tracking-wider font-montserrat">Partnerships</h5>
            <ul className="flex flex-col gap-3">
              <li><Link to="/franchise" className="footer-link text-sm">Franchise Program</Link></li>
              <li><Link to="/contact" className="footer-link text-sm">Installation Request</Link></li>
            </ul>
          </div>

          {/* Link Col 4: Head Office Info */}
          <div className="border-t md:border-t-0 border-megacharge-heading border-opacity-20 pt-6 md:pt-0">
            <h5 className="text-white font-bold text-sm mb-4 uppercase tracking-wider font-montserrat">Head Office</h5>
            <p className="text-megacharge-card text-opacity-70 text-xs leading-relaxed mb-4">
              811-812, Aggarwal Cyber Plaza-1, Netaji Subhash Place, Pitampura, Delhi, 110034
            </p>
            <div className="flex flex-col gap-2">
              <a href="tel:9289555090" className="flex items-center gap-2 text-sm text-white hover:text-megacharge-brand transition-colors">
                <PhoneIcon className="w-4 h-4 text-megacharge-brand" />
                <span>+91 92895 55090</span>
              </a>
              <a href="mailto:sales@megacharge.co.in" className="flex items-center gap-2 text-sm text-white hover:text-megacharge-brand transition-colors">
                <IconGoogleMail size={16} className="text-megacharge-brand" />
                <span>sales@megacharge.co.in</span>
              </a>
            </div>
          </div>
        </div>

        {/* LOWER DECK: COPYRIGHT */}
        <div className="pt-8 border-t border-megacharge-heading border-opacity-20 flex flex-col md:flex-row items-center justify-center gap-6">
          <span className="text-megacharge-card text-opacity-50 text-xs font-mono">
            &copy; {new Date().getFullYear()} MegaCharge. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
