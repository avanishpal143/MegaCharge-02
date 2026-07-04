/**
 * ========================================
 * Navbar Component
 * Purpose:
 * Renders the primary transparent, sticky
 * navigation bar with premium glassmorphism
 * and an interactive Mega Menu dropdown.
 *
 * Developer Notes:
 * Uses state to toggle active mega menus
 * and detects page scroll to update styles.
 *
 * ========================================
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, BoltIcon, GlobeIcon, BuildingIcon, HomeIcon, TruckIcon, UsersIcon } from '../CustomIcons/CustomIcons';
import './Navbar.css';

/* ==========================================
   NAVBAR COMPONENT
========================================== */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'products' | 'solutions' | 'network' | 'company' | null
  const location = useLocation();

  // Close mega menu on page change
  useEffect(() => {
    setActiveMenu(null);
  }, [location]);

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

  const handleMenuHover = (menu) => {
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  return (
    <nav 
      className={`navbar-container ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}
      onMouseLeave={handleMenuLeave}
    >
      <div className="navbar-inner max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="navbar-logo flex items-center gap-2">
          <div className="logo-icon-container">
            <span className="logo-lightning">⚡</span>
          </div>
          <span className="logo-text font-poppins font-extrabold text-2xl tracking-tight">
            MEGA<span className="text-megacharge-green">CHARGE</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8 h-full">
          
          {/* Products Dropdown */}
          <div 
            className="nav-item-dropdown h-full flex items-center"
            onMouseEnter={() => handleMenuHover('products')}
          >
            <button className={`nav-link flex items-center gap-1 ${activeMenu === 'products' ? 'text-megacharge-green' : ''}`}>
              Products <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === 'products' ? 'rotate-180 text-megacharge-green' : ''}`} />
            </button>
          </div>

          {/* Solutions Dropdown */}
          <div 
            className="nav-item-dropdown h-full flex items-center"
            onMouseEnter={() => handleMenuHover('solutions')}
          >
            <button className={`nav-link flex items-center gap-1 ${activeMenu === 'solutions' ? 'text-megacharge-green' : ''}`}>
              Solutions <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === 'solutions' ? 'rotate-180 text-megacharge-green' : ''}`} />
            </button>
          </div>

          {/* Network Dropdown */}
          <div 
            className="nav-item-dropdown h-full flex items-center"
            onMouseEnter={() => handleMenuHover('network')}
          >
            <button className={`nav-link flex items-center gap-1 ${activeMenu === 'network' ? 'text-megacharge-green' : ''}`}>
              Network <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === 'network' ? 'rotate-180 text-megacharge-green' : ''}`} />
            </button>
          </div>

          {/* Company Dropdown */}
          <div 
            className="nav-item-dropdown h-full flex items-center"
            onMouseEnter={() => handleMenuHover('company')}
          >
            <button className={`nav-link flex items-center gap-1 ${activeMenu === 'company' ? 'text-megacharge-green' : ''}`}>
              Company <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === 'company' ? 'rotate-180 text-megacharge-green' : ''}`} />
            </button>
          </div>

          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden sm:inline-flex border border-megacharge-green text-megacharge-green hover:bg-megacharge-green hover:text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 text-sm">
            Partner With Us
          </Link>
          <a href="tel:9289555090" className="bg-megacharge-green hover:bg-opacity-90 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm shadow-glow-green">
            Helpline
          </a>
        </div>
      </div>

      {/* MEGA MENUS */}
      <div className={`mega-menu-overlay ${activeMenu ? 'mega-menu-active' : ''}`}>
        
        {/* Products Mega Menu */}
        {activeMenu === 'products' && (
          <div className="mega-menu-content max-w-7xl mx-auto grid grid-cols-3 gap-8 py-8 px-6">
            <div className="col-span-1 border-r border-megacharge-border pr-8">
              <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Charging Hardware</span>
              <h3 className="text-white text-xl font-bold mt-2 mb-3">Our Core Chargers</h3>
              <p className="text-megacharge-text-secondary text-sm leading-relaxed">
                Engineered for maximum reliability, speed, and standard compliance across Indian vehicle grids.
              </p>
              <Link to="/products" className="text-megacharge-green text-sm font-semibold flex items-center gap-1 mt-4 hover:underline">
                View All Chargers &rarr;
              </Link>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-6">
              <Link to="/products" className="mega-menu-card p-4 rounded-xl hover:bg-megacharge-border hover:bg-opacity-30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-lg">
                    <HomeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Smart AC Chargers</h4>
                    <p className="text-megacharge-text-secondary text-xs leading-relaxed">
                      7.4 kW intelligent wallboxes with app integration. Perfect for homes, overnight parking, and retail units.
                    </p>
                  </div>
                </div>
              </Link>
              <Link to="/products" className="mega-menu-card p-4 rounded-xl hover:bg-megacharge-border hover:bg-opacity-30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-megacharge-orange bg-opacity-10 text-megacharge-orange rounded-lg">
                    <BoltIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Smart Fast DC Chargers</h4>
                    <p className="text-megacharge-text-secondary text-xs leading-relaxed">
                      30 kW to 180 kW rapid chargers supporting CCS2 & CHAdeMO. Charges to 80% in under 30 minutes.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Solutions Mega Menu */}
        {activeMenu === 'solutions' && (
          <div className="mega-menu-content max-w-7xl mx-auto grid grid-cols-4 gap-6 py-8 px-6">
            <Link to="/solutions" className="mega-menu-card p-5 rounded-xl border border-megacharge-border hover:border-megacharge-green hover:bg-megacharge-border hover:bg-opacity-20 transition-all duration-300">
              <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <BuildingIcon className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold mb-2">Commercial Charging</h4>
              <p className="text-megacharge-text-secondary text-xs leading-relaxed">
                Customized monetization models for shopping complexes, offices, hotels, and public sites.
              </p>
            </Link>
            <Link to="/solutions" className="mega-menu-card p-5 rounded-xl border border-megacharge-border hover:border-megacharge-green hover:bg-megacharge-border hover:bg-opacity-20 transition-all duration-300">
              <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <HomeIcon className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold mb-2">Residential Charging</h4>
              <p className="text-megacharge-text-secondary text-xs leading-relaxed">
                App-controlled domestic charging grids. Ideal for individual villas and housing societies.
              </p>
            </Link>
            <Link to="/solutions" className="mega-menu-card p-5 rounded-xl border border-megacharge-border hover:border-megacharge-green hover:bg-megacharge-border hover:bg-opacity-20 transition-all duration-300">
              <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <TruckIcon className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold mb-2">Fleet Charging</h4>
              <p className="text-megacharge-text-secondary text-xs leading-relaxed">
                Logistics hubs and corporate fleets. Intelligent fleet planning calculators to minimize grid downtime.
              </p>
            </Link>
            <div className="p-5 rounded-xl bg-megacharge-card flex flex-col justify-between">
              <div>
                <h4 className="text-white font-bold mb-2">Industries We Serve</h4>
                <p className="text-megacharge-text-secondary text-xs leading-relaxed mb-4">
                  Hospitality, retail, real estate, logistics, highway hubs, public transit networks.
                </p>
              </div>
              <Link to="/solutions" className="text-megacharge-green text-xs font-bold tracking-wider uppercase hover:underline">
                Explore Industries &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Network Mega Menu */}
        {activeMenu === 'network' && (
          <div className="mega-menu-content max-w-7xl mx-auto grid grid-cols-3 gap-8 py-8 px-6">
            <div className="col-span-1 border-r border-megacharge-border pr-8">
              <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Charging Grid</span>
              <h3 className="text-white text-xl font-bold mt-2 mb-3">Our National Footprint</h3>
              <p className="text-megacharge-text-secondary text-sm leading-relaxed">
                Constantly expanding network of smart fast charging hubs connecting highways and metro cities across India.
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-6">
              <Link to="/network" className="mega-menu-card p-4 rounded-xl hover:bg-megacharge-border hover:bg-opacity-30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-lg">
                    <GlobeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Interactive Locator</h4>
                    <p className="text-megacharge-text-secondary text-xs leading-relaxed">
                      Find nearby high-power DC or AC chargers, view live availability status, and navigate directly.
                    </p>
                  </div>
                </div>
              </Link>
              <Link to="/franchise" className="mega-menu-card p-4 rounded-xl hover:bg-megacharge-border hover:bg-opacity-30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-megacharge-orange bg-opacity-10 text-megacharge-orange rounded-lg">
                    <UsersIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Franchise Program</h4>
                    <p className="text-megacharge-text-secondary text-xs leading-relaxed">
                      Partner with India's leading brand. Build your own CPO business with FOCO/FOLO models.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Company Mega Menu */}
        {activeMenu === 'company' && (
          <div className="mega-menu-content max-w-7xl mx-auto grid grid-cols-4 gap-6 py-8 px-6">
            <Link to="/about" className="mega-menu-card p-4 rounded-xl hover:bg-megacharge-border hover:bg-opacity-30 transition-all duration-300">
              <h4 className="text-white font-bold mb-1 text-sm">About Us</h4>
              <p className="text-megacharge-text-secondary text-xs leading-relaxed">
                MNIL legacy since 1983, leadership, corporate board, and certifications.
              </p>
            </Link>
            <Link to="/sustainability" className="mega-menu-card p-4 rounded-xl hover:bg-megacharge-border hover:bg-opacity-30 transition-all duration-300">
              <h4 className="text-white font-bold mb-1 text-sm">Sustainability</h4>
              <p className="text-megacharge-text-secondary text-xs leading-relaxed">
                Our solar ecosystem integration and direct CO₂ offset achievements.
              </p>
            </Link>
            <Link to="/projects" className="mega-menu-card p-4 rounded-xl hover:bg-megacharge-border hover:bg-opacity-30 transition-all duration-300">
              <h4 className="text-white font-bold mb-1 text-sm">Projects & Case Studies</h4>
              <p className="text-megacharge-text-secondary text-xs leading-relaxed">
                Successful large-scale grid deployments and municipality partnerships.
              </p>
            </Link>
            <Link to="/careers" className="mega-menu-card p-4 rounded-xl hover:bg-megacharge-border hover:bg-opacity-30 transition-all duration-300">
              <h4 className="text-white font-bold mb-1 text-sm">Careers</h4>
              <p className="text-megacharge-text-secondary text-xs leading-relaxed">
                Join a future-focused team driving global clean mobility pipelines.
              </p>
            </Link>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
