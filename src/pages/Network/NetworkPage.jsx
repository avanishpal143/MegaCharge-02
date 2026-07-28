/**
 * ========================================
 * Network Page Component
 * Purpose:
 * Renders the national charging station map
 * and details grid of active highway corridors.
 *
 * Developer Notes:
 * Integrates the InteractiveMap component
 * and provides state-wise listings.
 *
 * ========================================
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveMap from '../../components/InteractiveMap/InteractiveMap';
import {
  IconGoogleConstruction,
  IconGoogleSmartphone,
  IconGoogleSupport,
  IconGoogleSolar,
  ArrowRightIcon,
} from '../../components/CustomIcons/CustomIcons';
import './NetworkPage.css';

// Import assets for real stations section
import teslaCharging from '../../assets/tesla_charging.jpg';
import chargeEvBanner from '../../assets/charge_ev_banner.png';
import acChargerReal from '../../assets/ac_charger_real.png';

/* ==========================================
   ANIMATION CONFIGS
========================================== */
const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: false, amount: 0.15 },
  transition: { duration: 0.45, ease: 'easeOut' }
};

const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: false, amount: 0.15 },
  transition: { duration: 0.45, ease: 'easeOut' }
};

/* ==========================================
   NETWORK COMPONENT
========================================== */

const NetworkPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const CITIES_LIST = [
    { name: "Delhi NCR", state: "Delhi", active: 24, power: "Up to 180kW" },
    { name: "Mumbai", state: "Maharashtra", active: 18, power: "Up to 180kW" },
    { name: "Bengaluru", state: "Karnataka", active: 16, power: "Up to 120kW" },
    { name: "Pune", state: "Maharashtra", active: 8, power: "Up to 120kW" },
    { name: "Hyderabad", state: "Telangana", active: 12, power: "Up to 120kW" },
    { name: "Chennai", state: "Tamil Nadu", active: 10, power: "Up to 120kW" },
    { name: "Kolkata", state: "West Bengal", active: 6, power: "Up to 60kW" },
    { name: "NH44 Highway Corridor", state: "Expressway", active: 14, power: "Up to 180kW" }
  ];

  const filteredCities = CITIES_LIST.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    city.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="network-page-container bg-megacharge-dark pt-28 pb-20 px-6">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto mb-16 text-center">
        <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest block mb-2">
          Grid Status Map
        </span>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-poppins">
          National Charging <span className="text-gradient-green">Footprint</span>
        </h1>
        <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
          Locate high-power public AC & DC charging bays across municipal segments and NH expressways. View live telemetry diagnostic states.
        </p>
      </section>

      {/* INTERACTIVE MAP INTEGRATION */}
      <section className="max-w-7xl mx-auto mb-20">
        <InteractiveMap />
      </section>

      {/* CITIS DIRECTORY */}
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-white text-2xl font-bold font-poppins">Active Stations Directory</h3>
            <p className="text-megacharge-text-secondary text-xs mt-1">
              Filter operational stations by state or region.
            </p>
          </div>
          <input 
            type="text"
            placeholder="Search by state or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-megacharge-card border border-megacharge-border text-white text-sm px-5 py-3 rounded-full focus:outline-none focus:border-megacharge-green transition-colors min-w-[280px]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCities.map((city, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-megacharge-card border border-megacharge-border hover:border-megacharge-green transition-all duration-300"
            >
              <h4 className="text-white font-bold text-base font-poppins">{city.name}</h4>
              <span className="text-megacharge-text-secondary text-xs block mb-4">State: {city.state}</span>
              
              <div className="flex items-center justify-between text-xs pt-4 border-t border-megacharge-border">
                <span className="text-megacharge-text-secondary">Active Ports:</span>
                <span className="text-megacharge-green font-bold font-poppins">{city.active} Bays</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span className="text-megacharge-text-secondary">Max Power:</span>
                <span className="text-white font-semibold font-poppins">{city.power}</span>
              </div>
            </div>
          ))}
          {filteredCities.length === 0 && (
            <div className="col-span-full text-center py-12 text-megacharge-text-secondary text-sm">
              No regions matching your query found. We are constantly expanding to new corridors.
            </div>
          )}
        </div>
      </section>

      {/* ==========================================
         REAL STATIONS SECTION
      ========================================== */}
      <section className="py-24 mt-20 border-t border-megacharge-border/30 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: copy */}
            <motion.div {...fadeInLeft} className="lg:col-span-5 flex flex-col gap-6">
              <h2 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight font-poppins">
                Charging Stations You Can <span className="text-megacharge-green">See & Trust</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Not just renders, but real MegaCharge stations powering real vehicles across India's highways, malls, hotels, and residential complexes.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {[
                  { icon: <IconGoogleConstruction size={20} className="text-megacharge-green" />, label: 'Turnkey Installation', sub: 'Civil + electrical done by us' },
                  { icon: <IconGoogleSmartphone size={20} className="text-megacharge-green" />, label: 'App Monitored', sub: 'Live session tracking' },
                  { icon: <IconGoogleSupport size={20} className="text-megacharge-green" pulse />, label: '24/7 Support', sub: 'Remote NOC diagnostics' },
                  { icon: <IconGoogleSolar size={20} className="text-megacharge-green" bounce />, label: 'Solar Ready', sub: 'Green grid compatible' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.04 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-megacharge-card/10 border border-slate-700/50 backdrop-blur-md hover:border-megacharge-green hover:shadow-glow-green transition-all duration-300"
                  >
                    <div className="p-1.5 bg-megacharge-green bg-opacity-10 text-megacharge-green border border-megacharge-green border-opacity-10 rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-white text-xs font-bold block">{item.label}</span>
                      <span className="text-slate-400 text-[10px]">{item.sub}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link to="/franchise" className="inline-flex items-center gap-2 text-megacharge-green font-bold text-sm hover:gap-4 transition-all duration-300 mt-2">
                Partner With Us <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Right: image collage */}
            <motion.div {...fadeInRight} className="lg:col-span-7 relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Main large image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="col-span-2 h-64 rounded-3xl overflow-hidden shadow-xl relative"
                >
                  <img src={chargeEvBanner} alt="MegaCharge station banner" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>

                {/* Bottom two smaller panels */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="h-44 rounded-2xl overflow-hidden shadow-lg bg-[#402e32] border border-slate-700 flex flex-col items-center justify-center gap-3 relative"
                >
                  <img src={acChargerReal} alt="AC Charger" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-white text-[10px] font-bold uppercase tracking-wider font-mono">AC 7.4kW</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="h-44 rounded-2xl overflow-hidden shadow-lg bg-[#402e32] border border-slate-700 flex flex-col items-center justify-center gap-3 relative"
                >
                  <img src={teslaCharging} alt="Tesla Charging" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-white text-[10px] font-bold uppercase tracking-wider font-mono">DC 180kW</span>
                </motion.div>
              </div>

              {/* Floating badge overlay */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-megacharge-green text-white px-5 py-3 rounded-2xl shadow-glow-green text-center"
              >
                <span className="text-xl font-extrabold font-mono block leading-none">7 Days</span>
                <span className="text-[9px] uppercase tracking-widest">To Go Live</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default NetworkPage;
