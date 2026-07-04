/**
 * ========================================
 * Home Page Component
 * Purpose:
 * Renders the primary landing page with
 * narrative sections, interactive calculators,
 * maps, and the 3D WebGL scene.
 *
 * Developer Notes:
 * Integrates external components: ThreeHero,
 * InteractiveMap, ROIUtilities, and NetworkGlobe.
 *
 * ========================================
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThreeHero from '../../components/ThreeHero/ThreeHero';
import InteractiveMap from '../../components/InteractiveMap/InteractiveMap';
import NetworkGlobe from '../../components/NetworkGlobe/NetworkGlobe';
import ROIUtilities from '../../components/ROIUtilities/ROIUtilities';
import { BoltIcon, ChargerIcon, ShieldIcon, ArrowRightIcon, PhoneIcon } from '../../components/CustomIcons/CustomIcons';
import './Home.css';

/* ==========================================
   HOME COMPONENT
========================================== */

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const FAQS = [
    {
      q: "What is MegaCharge?",
      a: "MegaCharge is an advanced EV charging infrastructure segment of Mega Nirman & Industries Limited (MNIL), a public limited company established in 1983. We manufacture and operate premium AC and DC fast chargers paired with our proprietary OCPP 1.6 CPO management software."
    },
    {
      q: "How fast can I charge my vehicle with MegaCharge?",
      a: "Our DC Fast Chargers (ranging from 30 kW to 180 kW) can charge most passenger electric vehicles from 10% to 80% in under 30 minutes. Our AC Smart Chargers (7.4 kW) are designed for overnight or workplace charging."
    },
    {
      q: "Is MegaCharge compatible with all electric vehicles in India?",
      a: "Yes. Our chargers support universal standard protocols including CCS2 (passenger cars/SUVs), CHAdeMO (selected models), and Type 2 (AC charging for passenger cars and two-wheelers)."
    },
    {
      q: "What is the tariff rate on the public MegaCharge network?",
      a: "Our standard network rate is ₹15 per unit (kWh) dispensed, with automatic GST invoice generation and instant digital payment tracking via our mobile app."
    },
    {
      q: "How do I become a Franchise Partner?",
      a: "We offer FOCO (Franchise Owned Company Operated) and FOLO (Franchise Owned Locally Operated) business models. Complete our Franchise Request Form to connect with our corporate alliances division."
    }
  ];

  return (
    <div className="home-page-container bg-megacharge-dark overflow-hidden">
      
      {/* ==========================================
         HERO SECTION
         Premium landing experience
      ========================================== */}
      <section className="hero-section min-h-screen relative pt-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Copy Column */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <span className="text-megacharge-green font-bold text-xs uppercase tracking-widest border border-megacharge-green border-opacity-30 px-3 py-1 rounded-full bg-megacharge-green bg-opacity-5">
              🚀 Powering India's EV Future
            </span>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold font-poppins leading-tight">
              Powering the Future,<br />
              <span className="text-gradient-green">One Charge at a Time</span>
            </h1>
            <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-xl">
              Discover MegaCharge’s ultra-reliable charging network. Powered by Mega Nirman & Industries Ltd (MNIL), we combine cutting-edge high-power AC/DC rectifiers with intelligent CPO SaaS integration.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-2">
              <Link to="/contact" className="bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 shadow-glow-green flex items-center gap-2">
                Request Installation <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link to="/products" className="border border-megacharge-border text-white hover:border-white font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300">
                Explore Products
              </Link>
            </div>

            <div className="flex items-center gap-3 mt-6 text-xs text-megacharge-text-secondary">
              <div className="p-2 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-full">
                <PhoneIcon className="w-4 h-4" />
              </div>
              <span>24x7 Emergency Grid Support: <strong>92895 55090</strong></span>
            </div>
          </div>

          {/* 3D Visual Column */}
          <div className="lg:col-span-6 w-full h-[600px] flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-10 blur-3xl pointer-events-none"></div>
            <ThreeHero />
          </div>

        </div>
      </section>

      {/* ==========================================
         TRUSTED BY SECTION
      ========================================== */}
      <section className="py-12 bg-megacharge-card border-y border-megacharge-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-megacharge-text-secondary text-[11px] font-bold uppercase tracking-wider block mb-6">
            Trusted by Leaders in Infrastructure & Real Estate
          </span>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-white font-extrabold text-lg tracking-wider">MNIL HOLDINGS</span>
            <span className="text-white font-extrabold text-lg tracking-wider">DLF GRID</span>
            <span className="text-white font-extrabold text-lg tracking-wider">TATA INTEGRATED</span>
            <span className="text-white font-extrabold text-lg tracking-wider">L&T POWER</span>
            <span className="text-white font-extrabold text-lg tracking-wider">NH-EXPWAY</span>
          </div>
        </div>
      </section>

      {/* ==========================================
         PRODUCTS OVERVIEW SECTION
      ========================================== */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Hardware Showroom</span>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold mt-2 mb-4">Smart EV Charging Hardware</h2>
          <p className="text-megacharge-text-secondary text-sm">
            Manufactured in compliance with international OCPP & electrical safety standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Card 1: AC */}
          <div className="glass-panel p-8 rounded-3xl border border-megacharge-border flex flex-col justify-between hover:border-megacharge-green transition-all duration-300">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="bg-megacharge-green bg-opacity-10 text-megacharge-green px-3 py-1 rounded text-xs font-bold uppercase">Smart AC Charger</span>
                <span className="text-megacharge-text-secondary text-xs">Model: MC-AC-07</span>
              </div>
              <h3 className="text-white text-2xl font-bold mb-3">7.4 kW AC Smart Charger</h3>
              <p className="text-megacharge-text-secondary text-sm leading-relaxed mb-6">
                Compact wall-box format designed for residential societies, single villas, and corporate employee parking. Full app integration with RFID authorization.
              </p>
              
              <ul className="flex flex-col gap-2.5 mb-8 text-xs text-megacharge-text-secondary">
                <li className="flex items-center gap-2">&bull; Output: 7.4 kW / 32A single-phase</li>
                <li className="flex items-center gap-2">&bull; Universal Type-2 connector socket</li>
                <li className="flex items-center gap-2">&bull; QR Pay & RFID Authentication enabled</li>
                <li className="flex items-center gap-2">&bull; IP54 weather-proof rating for outdoor</li>
              </ul>
            </div>
            <Link to="/products" className="w-full text-center border border-megacharge-border hover:border-megacharge-green text-white hover:text-megacharge-green font-bold text-xs py-4 rounded-full transition-all duration-300 block">
              Specifications & Booking &rarr;
            </Link>
          </div>

          {/* Product Card 2: DC */}
          <div className="glass-panel p-8 rounded-3xl border border-megacharge-border flex flex-col justify-between hover:border-megacharge-orange transition-all duration-300">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="bg-megacharge-orange bg-opacity-10 text-megacharge-orange px-3 py-1 rounded text-xs font-bold uppercase">High-Power DC Fast</span>
                <span className="text-megacharge-text-secondary text-xs">Model: MC-DC-180</span>
              </div>
              <h3 className="text-white text-2xl font-bold mb-3">30 kW - 180 kW DC Charger</h3>
              <p className="text-megacharge-text-secondary text-sm leading-relaxed mb-6">
                Dual-gun rapid rectifiers engineered for highway stopways, fleet transit depots, and high-turnover shopping malls. Powers batteries to 80% in 30 minutes.
              </p>

              <ul className="flex flex-col gap-2.5 mb-8 text-xs text-megacharge-text-secondary">
                <li className="flex items-center gap-2">&bull; Output range: 30 kW / 60 kW / 120 kW / 180 kW</li>
                <li className="flex items-center gap-2">&bull; Connectors: Dual CCS2 & CHAdeMO</li>
                <li className="flex items-center gap-2">&bull; Unified charging fee: ₹15 / Unit</li>
                <li className="flex items-center gap-2">&bull; OCPP 1.6 JSON remote management integration</li>
              </ul>
            </div>
            <Link to="/products" className="w-full text-center border border-megacharge-border hover:border-megacharge-orange text-white hover:text-megacharge-orange font-bold text-xs py-4 rounded-full transition-all duration-300 block">
              Specifications & Booking &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
         TECHNOLOGY & DIAGNOSTICS SECTION
      ========================================== */}
      <section className="py-20 px-6 bg-megacharge-card border-y border-megacharge-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col items-start gap-6">
            <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Integrated Safety</span>
            <h2 className="text-white text-3xl sm:text-4xl font-extrabold">Next-Gen Charging Diagnostics</h2>
            <p className="text-megacharge-text-secondary text-sm leading-relaxed">
              Every MegaCharge hub is integrated with intelligent electrical diagnostics. Our chargers protect the grid and your vehicle battery using multiple layers of active protection.
            </p>

            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-4">
                <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl h-fit">
                  <ShieldIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Overcurrent & Overvoltage Safeguard</h4>
                  <p className="text-megacharge-text-secondary text-xs">
                    Prevents electrical spikes and lightning surges from impacting car battery Management Systems (BMS).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl h-fit">
                  <BoltIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Active Temperature Regulation</h4>
                  <p className="text-megacharge-text-secondary text-xs">
                    Built-in sensors throttle power flow if temperatures exceed parameters, ensuring battery safety in hot climates.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl h-fit">
                  <ChargerIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">OCPP 1.6 Network Telemetry</h4>
                  <p className="text-megacharge-text-secondary text-xs">
                    Continuous server connection reports cable faults, port locks, and payment issues to our central control panel instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <NetworkGlobe />
          </div>

        </div>
      </section>

      {/* ==========================================
         INTERACTIVE MAP SECTION
      ========================================== */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Charging Grid Map</span>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold mt-2 mb-4">India's Growing Highway Network</h2>
          <p className="text-megacharge-text-secondary text-sm">
            Select nodes to preview live status, connector availability, and operational capacities.
          </p>
        </div>

        <InteractiveMap />
      </section>

      {/* ==========================================
         CALCULATORS SECTION
      ========================================== */}
      <section className="py-24 px-6 bg-megacharge-card border-y border-megacharge-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Decision Tools</span>
            <h2 className="text-white text-3xl sm:text-4xl font-extrabold mt-2 mb-4">Interactive Profit & Savings Calculators</h2>
            <p className="text-megacharge-text-secondary text-sm">
              Calculate your commute cost margins, project franchise payback periods, or pick the correct charger model.
            </p>
          </div>

          <ROIUtilities />
        </div>
      </section>

      {/* ==========================================
         FAQ SECTION
      ========================================== */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Got Questions?</span>
          <h2 className="text-white text-3xl font-extrabold mt-2">Frequently Answered Diagnostics</h2>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className="faq-item rounded-2xl border border-megacharge-border bg-megacharge-card overflow-hidden"
            >
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-megacharge-border hover:bg-opacity-20"
              >
                <span className="text-white font-bold text-sm sm:text-base">{faq.q}</span>
                <span className="text-megacharge-green text-xl font-bold">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              
              <div className={`faq-answer-container transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-[300px] border-t border-megacharge-border p-6' : 'max-h-0'}`}>
                <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
         FINAL CALL TO ACTION
      ========================================== */}
      <section className="py-24 px-6 relative flex justify-center text-center">
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-10 blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10 glass-panel p-8 md:p-16 rounded-3xl border border-megacharge-green border-opacity-25 flex flex-col items-center gap-6">
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest">Join the Alliances Grid</span>
          <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight">
            Ready to Build Your EV Charging Station?
          </h2>
          <p className="text-megacharge-text-secondary text-sm md:text-base leading-relaxed max-w-xl">
            Partner with MNIL Holdings to launch high-performance DC Charging Stations in your locality. Commercial sites, retail centers, and fleet operators get tailored CPO solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
            <Link to="/contact" className="bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 shadow-glow-green">
              Get an Installation Quote
            </Link>
            <Link to="/franchise" className="border border-megacharge-border hover:border-white text-white font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300">
              Apply for Franchise Program
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
