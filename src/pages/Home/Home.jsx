/**
 * ========================================
 * Home Page Component
 * Purpose:
 * Renders the primary premium landing page
 * with long-form detailed sections, interactive calculators,
 * maps, and WebGL elements.
 *
 * ========================================
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThreeHero from '../../components/ThreeHero/ThreeHero';
import InteractiveMap from '../../components/InteractiveMap/InteractiveMap';
import NetworkGlobe from '../../components/NetworkGlobe/NetworkGlobe';
import ROIUtilities from '../../components/ROIUtilities/ROIUtilities';
import { BoltIcon, ChargerIcon, ShieldIcon, ArrowRightIcon, PhoneIcon } from '../../components/CustomIcons/CustomIcons';
import './Home.css';

/* ==========================================
   ANIMATION CONFIGURATIONS
========================================== */

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-100px' },
  transition: { staggerChildren: 0.15 }
};

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const FAQS = [
    {
      q: "Who stands behind the MegaCharge network infrastructure?",
      a: "MegaCharge operates under Mega Nirman & Industries Limited (MNIL), a prestigious public limited entity incorporated on March 23, 1983. Over four decades of large-scale infrastructure expertise ensures absolute corporate compliance and grid engineering stability."
    },
    {
      q: "How fast can I charge my EV using MegaCharge rectifiers?",
      a: "Our Level 3 DC Fast Chargers (ranging from 30 kW to 180 kW modular rectifiers) can supply 80% battery capacity in under 30 minutes, depending on the vehicle's active Battery Management System (BMS) curves. Our 7.4 kW AC Smart Chargers provide stable overnight trickle streams."
    },
    {
      q: "What standards compliance governs your charging hardware?",
      a: "All MegaCharge rectifiers are fully compliant with universal charging protocols including CCS2, CHAdeMO, and standard AC Type 2 grids. The systems integrate OCPP 1.6 JSON software protocols for real-time telemetry."
    },
    {
      q: "What is the tariff structure for public highway networks?",
      a: "The standard public base rate is ₹15 per unit (kWh) dispensed. Our software automatically generates commercial GST invoices, instantly push-notified to vehicle owners via the mobile application wallet."
    },
    {
      q: "Which partnership models are open for commercial CPOs?",
      a: "We offer FOCO (Franchise Owned Company Operated) and FOLO (Franchise Owned Locally Operated) business models with dynamic power allocation matrices. Partners receive full CPO SaaS billing privileges."
    }
  ];

  return (
    <div className="home-page-container overflow-hidden">
      
      {/* ==========================================
         1. HERO SECTION (HIGH-LEVEL COGNITIVE STAGE)
      ========================================== */}
      <section className="hero-section min-h-screen relative pt-32 pb-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Copy Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start gap-6"
          >
            
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold font-poppins leading-none tracking-tight">
              Electrifying the Grid,<br />
              <span className="text-gradient-green">One Charge at a Time</span>
            </h1>
            
            <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-xl">
              Powering India's sustainable transport pipeline. Engineered by **Mega Nirman & Industries Ltd (MNIL)**, our high-power modular rectifiers combine safety compliance with real-time OCPP SaaS telemetry.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-4 w-full sm:w-auto">
              <Link to="/contact" className="w-full sm:w-auto text-center btn-premium-green text-white font-bold text-sm px-10 py-5 rounded-full flex items-center justify-center gap-2">
                Launch Installation Request <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link to="/products" className="w-full sm:w-auto text-center btn-premium-outline text-white font-bold text-sm px-10 py-5 rounded-full">
                Showroom Models
              </Link>
            </div>

            <div className="flex items-center gap-3 mt-8 text-xs text-megacharge-text-secondary bg-megacharge-dark bg-opacity-60 border border-megacharge-border p-3.5 rounded-full">
              <div className="p-2 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-full pulse-glow">
                <PhoneIcon className="w-3.5 h-3.5" />
              </div>
              <span>24x7 Grid Diagnostics Helpline: <strong className="text-white">92895 55090</strong></span>
            </div>
          </motion.div>

          {/* 3D Visual Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full h-[550px] flex justify-center relative"
          >
            <ThreeHero />
          </motion.div>

        </div>
      </section>

      {/* ==========================================
         2. TRUSTED BY MARQUEE
      ========================================== */}
      <section className="py-16 bg-megacharge-card bg-opacity-40 border-y border-megacharge-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-megacharge-text-secondary text-[11px] font-bold uppercase tracking-wider block mb-8">
            STEERING INFRASTRUCTURE ALLIANCES WITH MARKET LEADERS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-50 hover:opacity-90 transition-all duration-500">
            <span className="text-white font-extrabold text-sm sm:text-base tracking-widest font-mono">MNIL CORPORATE</span>
            <span className="text-white font-extrabold text-sm sm:text-base tracking-widest font-mono">DLF INFRA</span>
            <span className="text-white font-extrabold text-sm sm:text-base tracking-widest font-mono">TATA METRO</span>
            <span className="text-white font-extrabold text-sm sm:text-base tracking-widest font-mono">L&T RENEWABLES</span>
            <span className="text-white font-extrabold text-sm sm:text-base tracking-widest font-mono">NHAI EXPRESSWAYS</span>
          </div>
        </div>
      </section>

      {/* ==========================================
         3. SMART HARDWARE SHOWROOM (PRODUCTS OVERVIEW)
      ========================================== */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          {...fadeInUp}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="section-label mb-4">🔌 HARDWARE DEPOT</span>
          <h2 className="text-white text-4xl sm:text-5xl font-extrabold mt-2 mb-4 leading-tight">
            High-Performance <span className="text-gradient-green">Charging Station Units</span>
          </h2>
          <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed">
            All MegaCharge hardware features modular power conversion, dynamic load-balancing software, and heavy liquid-cooled rectifiers, tested to operate in temperatures up to 55°C.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* Charger 1: AC */}
          <motion.div 
            variants={fadeInUp}
            className="premium-glass-card p-10 rounded-3xl border border-megacharge-border flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="flex justify-between items-start mb-8">
                <span className="bg-megacharge-green bg-opacity-10 text-megacharge-green border border-megacharge-green border-opacity-35 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Smart AC Wallbox</span>
                <span className="text-megacharge-text-secondary text-xs font-mono">Series: MC-AC-07</span>
              </div>
              <h3 className="text-white text-3xl font-extrabold mb-4">7.4 kW AC Smart Box</h3>
              <p className="text-megacharge-text-secondary text-sm leading-relaxed mb-8">
                Compact, high-end charging terminal designed for residential townships, commercial workspaces, and overnight hotels. Outfitted with RFID authorization panels and smart mobile application dashboards.
              </p>
              
              <ul className="flex flex-col gap-3.5 mb-10 text-xs text-megacharge-text-secondary font-mono">
                <li className="flex items-center gap-2.5">
                  <span className="text-megacharge-green">&bull;</span> Output: 7.4 kW / 32A single-phase grid load
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-megacharge-green">&bull;</span> Universal Type-2 plug matching all Indian vehicle systems
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-megacharge-green">&bull;</span> App scheduled timing & auto-billing UPI setup
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-megacharge-green">&bull;</span> Heavy IP54 weather shield for rugged operations
                </li>
              </ul>
            </div>
            <Link to="/products" className="w-full text-center border border-megacharge-border hover:border-megacharge-green text-white hover:text-megacharge-green font-bold text-xs py-4.5 rounded-full transition-all duration-300 block">
              Specifications & Booking Request &rarr;
            </Link>
          </motion.div>

          {/* Charger 2: DC */}
          <motion.div 
            variants={fadeInUp}
            className="premium-glass-card p-10 rounded-3xl border border-megacharge-border flex flex-col justify-between relative overflow-hidden premium-glass-card-orange"
          >
            <div>
              <div className="flex justify-between items-start mb-8">
                <span className="bg-megacharge-orange bg-opacity-10 text-megacharge-orange border border-megacharge-orange border-opacity-35 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Modular DC Rectifier</span>
                <span className="text-megacharge-text-secondary text-xs font-mono">Series: MC-DC-180</span>
              </div>
              <h3 className="text-white text-3xl font-extrabold mb-4">30 kW - 180 kW DC Charger</h3>
              <p className="text-megacharge-text-secondary text-sm leading-relaxed mb-8">
                Industrial ultra-fast charging rectifier configuration engineered for public highway hubs, large municipal terminals, and fleet logistics centers. Powers passenger EVs to 80% in under 30 minutes.
              </p>

              <ul className="flex flex-col gap-3.5 mb-10 text-xs text-megacharge-text-secondary font-mono">
                <li className="flex items-center gap-2.5">
                  <span className="text-megacharge-orange">&bull;</span> Dynamic power allocation split (30kW–180kW capacity)
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-megacharge-orange">&bull;</span> Dual-gun configuration supporting CCS2 & CHAdeMO couplers
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-megacharge-orange">&bull;</span> OCPP 1.6 JSON server network synchronization
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-megacharge-orange">&bull;</span> Liquid-cooled modular rectifiers keeping operations stable
                </li>
              </ul>
            </div>
            <Link to="/products" className="w-full text-center border border-megacharge-border hover:border-megacharge-orange text-white hover:text-megacharge-orange font-bold text-xs py-4.5 rounded-full transition-all duration-300 block">
              Specifications & Booking Request &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ==========================================
         4. CORE TECHNOLOGY HUB (NEW DETAILED SECTION)
      ========================================== */}
      <section className="py-32 px-6 bg-megacharge-card bg-opacity-30 border-y border-megacharge-border relative">
        {/* Dynamic ambient lights */}
        <div className="absolute top-1/2 left-[-10%] w-[350px] h-[350px] bg-megacharge-green opacity-5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="section-label mb-4">⚙️ ENGINEERING GRID</span>
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold mt-2 mb-4 leading-tight">
              Enterprise Charging <span className="text-gradient-green">Software & Hardware Core</span>
            </h2>
            <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed">
              MegaCharge pairs robust charging electronics with cloud analytics software to guarantee optimal grid usage and 99.8% platform uptime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-megacharge-border hover:border-megacharge-green transition-colors duration-300">
              <span className="text-megacharge-green text-3xl font-bold font-mono block mb-4">01.</span>
              <h4 className="text-white font-extrabold text-lg mb-2">Liquid Cooled Rectifiers</h4>
              <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
                Our Level 3 DC fast chargers use internal liquid-cooled plates. This design mitigates component wear in dusty highway environments and hot Indian summer parameters.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-megacharge-border hover:border-megacharge-green transition-colors duration-300">
              <span className="text-megacharge-green text-3xl font-bold font-mono block mb-4">02.</span>
              <h4 className="text-white font-extrabold text-lg mb-2">Active Grid Protection</h4>
              <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
                Smart balancing software prevents localized power spikes. If grid demand peaks, our chargers adjust rate output dynamically to safeguard industrial fuses.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-megacharge-border hover:border-megacharge-green transition-colors duration-300">
              <span className="text-megacharge-green text-3xl font-bold font-mono block mb-4">03.</span>
              <h4 className="text-white font-extrabold text-lg mb-2">OCPP 1.6 SaaS Platform</h4>
              <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
                Commercial partners gain full dashboard metrics, including charger power loads, session costs, payment collection status, and remote maintenance triggers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         5. SYSTEM DIAGNOSTICS SECTION
      ========================================== */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col items-start gap-6"
          >
            <span className="section-label">🛡️ GRID OPERATIONS</span>
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight">
              Safety-First Charging Diagnostics
            </h2>
            <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed">
              Every MegaCharge hub operates with smart electrical safety diagnostics. We isolate vehicle components and grid structures from surges, short circuits, and critical operating temperatures.
            </p>

            <div className="flex flex-col gap-6 w-full mt-4">
              <div className="flex gap-4">
                <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl h-fit border border-megacharge-green border-opacity-20">
                  <ShieldIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-sm mb-1.5 uppercase tracking-wider">Overvoltage Surge Protection</h4>
                  <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
                    Integrated circuit breakers absorb line surges and lightning currents, preserving vehicle Battery Management Systems (BMS).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl h-fit border border-megacharge-green border-opacity-20">
                  <BoltIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-sm mb-1.5 uppercase tracking-wider">Real-time Thermal Control</h4>
                  <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
                    Sensors throttle charger output power if the grid or charger modules exceed operating temperatures.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl h-fit border border-megacharge-green border-opacity-20">
                  <ChargerIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-sm mb-1.5 uppercase tracking-wider">Continuous OCPP Telemetry</h4>
                  <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
                    Automated connections report system diagnostic logs and payment status to centralized customer care centers.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 w-full"
          >
            <NetworkGlobe />
          </motion.div>

        </div>
      </section>

      {/* ==========================================
         6. INTERACTIVE MAP SECTION
      ========================================== */}
      <section className="py-32 px-6 bg-megacharge-card bg-opacity-35 border-y border-megacharge-border">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="section-label mb-4">🗺️ GRID INFRASTRUCTURE</span>
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold mt-2 mb-4 leading-tight">
              India's Expanding Highway Network
            </h2>
            <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed">
              Select highway nodes below to check charger availability, power allocation configurations, and operational statuses.
            </p>
          </motion.div>

          <InteractiveMap />
        </div>
      </section>

      {/* ==========================================
         7. DECISION TOOLS (CALCULATORS SECTION)
      ========================================== */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="section-label section-label-orange mb-4">⚡ DECISION PLATFORM</span>
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold mt-2 mb-4 leading-tight">
              Interactive ROI & Commute Savings Console
            </h2>
            <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed">
              Estimate your monthly commute cost savings, calculate investment payback schedules, or match vehicles to optimal charging formats.
            </p>
          </motion.div>

          <ROIUtilities />
        </div>
      </section>

      {/* ==========================================
         8. FAQ SECTION (HIGH DIAGNOSTIC TRANSPARENCY)
      ========================================== */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-20"
        >
          <span className="section-label mb-4">❓ KNOWLEDGE BASE</span>
          <h2 className="text-white text-4xl font-extrabold mt-2">Frequently Answered Diagnostics</h2>
        </motion.div>

        <div className="flex flex-col gap-5">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className="faq-item rounded-2xl border border-megacharge-border bg-megacharge-card bg-opacity-40 overflow-hidden"
            >
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-7 text-left transition-colors hover:bg-megacharge-border hover:bg-opacity-20"
              >
                <span className="text-white font-extrabold text-sm sm:text-base">{faq.q}</span>
                <span className="text-megacharge-green text-xl font-bold">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              
              <div 
                className={`faq-answer-container transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-[300px] border-t border-megacharge-border p-7' : 'max-h-0'}`}
                style={{ overflow: 'hidden' }}
              >
                <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
         9. FINAL CALL TO ACTION
      ========================================== */}
      <section className="py-32 px-6 relative flex justify-center text-center">
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-5 blur-3xl pointer-events-none" />
        
        <motion.div 
          {...fadeInUp}
          className="max-w-4xl mx-auto relative z-10 premium-glass-card p-10 md:p-20 rounded-3xl border border-megacharge-green border-opacity-25 flex flex-col items-center gap-8 shadow-glow-green"
        >
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest bg-megacharge-green bg-opacity-5 border border-megacharge-green border-opacity-25 px-4 py-1.5 rounded-full">
            Alliances Registry open
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight">
            Ready to Build Your EV Charging Station?
          </h2>
          <p className="text-megacharge-text-secondary text-sm md:text-base leading-relaxed max-w-2xl">
            Partner with MNIL Holdings to launch high-performance DC Charging Stations in your locality. Commercial sites, highway real estate developers, and corporate fleets receive customized CPO platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 w-full sm:w-auto">
            <Link to="/contact" className="w-full sm:w-auto text-center btn-premium-green text-white font-bold text-sm px-10 py-5 rounded-full block">
              Enquire Commercial Quote
            </Link>
            <Link to="/franchise" className="w-full sm:w-auto text-center btn-premium-outline text-white font-bold text-sm px-10 py-5 rounded-full block">
              Apply for CPO Franchise
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
