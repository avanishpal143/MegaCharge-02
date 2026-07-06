import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveMap from '../../components/InteractiveMap/InteractiveMap';
import NetworkGlobe from '../../components/NetworkGlobe/NetworkGlobe';
import ROIUtilities from '../../components/ROIUtilities/ROIUtilities';
import { BoltIcon, ChargerIcon, ShieldIcon, ArrowRightIcon, PhoneIcon } from '../../components/CustomIcons/CustomIcons';
import './Home.css';

// Import images
import chargingStationCars from '../../assets/charging_station_cars.jpg';
import acCharger from '../../assets/ac_charger.png';
import dcCharger from '../../assets/dc_charger.png';

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
      q: "How does the charging station rental program work?",
      a: "MegaCharge provides, installs, and manages EV charging stations on rental models. Property owners (hosts) can rent out a portion of their parking or land, and we handle the grid integration, operations, and support. Hosts receive recurring rental payments or revenue-sharing returns."
    },
    {
      q: "Who is eligible to host a rented MegaCharge station?",
      a: "Commercial complexes, retail parking lots, highway restaurants, hotels, residential societies, and private landowners with high-traffic space are ideal candidates. A minimum power load feasibility check is done during our initial site survey."
    },
    {
      q: "What standards compliance governs your rented chargers?",
      a: "All our AC and DC chargers are certified under global standards (CCS2 and Type 2), supporting all electric vehicles in India. The chargers run on intelligent OCPP 1.6 cloud software for real-time remote diagnostics and monitoring."
    },
    {
      q: "Do I have to pay for maintenance and software updates?",
      a: "No. Since the station is rented, MegaCharge handles 100% of the maintenance, electrical servicing, software upgrades, and customer support. There are zero hidden operational costs for the host."
    },
    {
      q: "How can I request a site installation evaluation?",
      a: "Simply submit our Contact Form with your location details. Our grid engineers will conduct a structural feasibility check and provide you with a customized rental proposal within 48 hours."
    }
  ];

  return (
    <div className="home-page-container overflow-hidden">
      
      {/* ==========================================
         1. HERO SECTION (DARK GRADIENT WITH GLOW)
      ========================================== */}
      <section className="hero-section min-h-screen relative pt-32 pb-20 flex items-center bg-[#0B132B] text-white">
        {/* Glow Effects */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#00B4D8] opacity-10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Copy Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start gap-6"
          >
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold font-poppins leading-none tracking-tight">
              Own & Rent Your<br />
              <span className="text-gradient-green">Charging Station</span>
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Partner with MegaCharge to launch high-performance EV charging units on rent. Unlock steady monthly rental income or revenue share on your property while driving clean mobility. We manage the installation, maintenance, and grid software.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-4 w-full sm:w-auto">
              <Link to="/contact" className="w-full sm:w-auto text-center btn-premium-green text-white font-bold text-sm px-10 py-5 rounded-full flex items-center justify-center gap-2">
                Apply for Station Installation <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center gap-3 mt-4 text-xs text-slate-300 bg-[#1C2541] bg-opacity-80 border border-slate-700 p-3.5 rounded-full">
              <div className="p-2 bg-[#00B4D8] bg-opacity-20 text-[#00B4D8] rounded-full pulse-glow">
                <PhoneIcon className="w-3.5 h-3.5" />
              </div>
              <span>24x7 Installation Helpline: <strong className="text-white">92895 55090</strong></span>
            </div>
          </motion.div>

          {/* Photo Column (Replaces 3D) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full h-[450px] sm:h-[500px] flex justify-center relative rounded-3xl overflow-hidden border border-slate-700 shadow-[0_0_30px_rgba(0,180,216,0.25)]"
          >
            <img 
              src={chargingStationCars} 
              alt="MegaCharge EV Charging Station" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

        </div>
      </section>

      {/* ==========================================
         2. TRUSTED BY MARQUEE
      ========================================== */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-8">
            STEERING INFRASTRUCTURE ALLIANCES WITH MARKET LEADERS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-60 hover:opacity-90 transition-all duration-500">
            <span className="text-slate-800 font-extrabold text-sm sm:text-base tracking-widest font-mono">MNIL CORPORATE</span>
            <span className="text-slate-800 font-extrabold text-sm sm:text-base tracking-widest font-mono">DLF INFRA</span>
            <span className="text-slate-800 font-extrabold text-sm sm:text-base tracking-widest font-mono">TATA METRO</span>
            <span className="text-slate-800 font-extrabold text-sm sm:text-base tracking-widest font-mono">L&T RENEWABLES</span>
            <span className="text-slate-800 font-extrabold text-sm sm:text-base tracking-widest font-mono">NHAI EXPRESSWAYS</span>
          </div>
        </div>
      </section>

      {/* ==========================================
         3. SMART HARDWARE SHOWROOM (PRODUCTS OVERVIEW - LIGHT BACKGROUND)
      ========================================== */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-transparent">
        <motion.div 
          {...fadeInUp}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mt-2 mb-4 leading-tight">
            High-Performance Charging Station Units
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
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
            className="premium-glass-card p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              {/* Product Photo */}
              <div className="w-full h-64 mb-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm relative group">
                <img 
                  src={acCharger} 
                  alt="MegaCharge 7.4 kW AC Smart Box" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex justify-between items-start mb-4">
                <span className="bg-[#00B4D8] bg-opacity-10 text-[#00B4D8] border border-[#00B4D8] border-opacity-35 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Smart AC Wallbox</span>
                <span className="text-slate-500 text-xs font-mono">Series: MC-AC-07</span>
              </div>
              <h3 className="text-slate-900 text-2xl font-extrabold mb-4">7.4 kW AC Smart Box</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Compact, high-end charging terminal designed for residential townships, commercial workspaces, and overnight hotels. Outfitted with RFID authorization panels and smart mobile application dashboards.
              </p>
              
              <ul className="flex flex-col gap-3 mb-8 text-xs text-slate-600 font-mono">
                <li className="flex items-center gap-2.5">
                  <span className="text-[#00B4D8]">&bull;</span> Output: 7.4 kW / 32A single-phase grid load
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#00B4D8]">&bull;</span> Universal Type-2 plug matching all Indian vehicle systems
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#00B4D8]">&bull;</span> App scheduled timing & auto-billing UPI setup
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#00B4D8]">&bull;</span> Heavy IP54 weather shield for rugged operations
                </li>
              </ul>
            </div>
            <Link to="/products" className="w-full text-center border border-[#00B4D8] hover:bg-[#00B4D8] text-[#00B4D8] hover:text-white font-bold text-xs py-4 rounded-full transition-all duration-300 block">
              Specifications & Rental Quotes &rarr;
            </Link>
          </motion.div>

          {/* Charger 2: DC */}
          <motion.div 
            variants={fadeInUp}
            className="premium-glass-card p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              {/* Product Photo */}
              <div className="w-full h-64 mb-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm relative group">
                <img 
                  src={dcCharger} 
                  alt="MegaCharge DC Fast Charger" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex justify-between items-start mb-4">
                <span className="bg-[#FF6B35] bg-opacity-10 text-[#FF6B35] border border-[#FF6B35] border-opacity-35 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Modular DC Rectifier</span>
                <span className="text-slate-500 text-xs font-mono">Series: MC-DC-180</span>
              </div>
              <h3 className="text-slate-900 text-2xl font-extrabold mb-4">30 kW - 180 kW DC Charger</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Industrial ultra-fast charging rectifier configuration engineered for public highway hubs, large municipal terminals, and fleet logistics centers. Powers passenger EVs to 80% in under 30 minutes.
              </p>

              <ul className="flex flex-col gap-3 mb-8 text-xs text-slate-600 font-mono">
                <li className="flex items-center gap-2.5">
                  <span className="text-[#FF6B35]">&bull;</span> Dynamic power allocation split (30kW–180kW capacity)
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#FF6B35]">&bull;</span> Dual-gun configuration supporting CCS2 & CHAdeMO couplers
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#FF6B35]">&bull;</span> OCPP 1.6 JSON server network synchronization
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#FF6B35]">&bull;</span> Liquid-cooled modular rectifiers keeping operations stable
                </li>
              </ul>
            </div>
            <Link to="/products" className="w-full text-center border border-[#FF6B35] hover:bg-[#FF6B35] text-[#FF6B35] hover:text-white font-bold text-xs py-4 rounded-full transition-all duration-300 block">
              Specifications & Rental Quotes &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ==========================================
         4. CORE TECHNOLOGY HUB (LIGHT BACKGROUND)
      ========================================== */}
      <section className="py-32 px-6 bg-white border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mt-2 mb-4 leading-tight">
              Enterprise Charging Software & Hardware Core
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              MegaCharge pairs robust charging electronics with cloud analytics software to guarantee optimal grid usage and 99.8% platform uptime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#00B4D8] transition-colors duration-300">
              <span className="text-[#00B4D8] text-3xl font-bold font-mono block mb-4">01.</span>
              <h4 className="text-slate-900 font-extrabold text-lg mb-2">Liquid Cooled Rectifiers</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Our Level 3 DC fast chargers use internal liquid-cooled plates. This design mitigates component wear in dusty highway environments and hot Indian summer parameters.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#00B4D8] transition-colors duration-300">
              <span className="text-[#00B4D8] text-3xl font-bold font-mono block mb-4">02.</span>
              <h4 className="text-slate-900 font-extrabold text-lg mb-2">Active Grid Protection</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Smart balancing software prevents localized power spikes. If grid demand peaks, our chargers adjust rate output dynamically to safeguard industrial fuses.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#00B4D8] transition-colors duration-300">
              <span className="text-[#00B4D8] text-3xl font-bold font-mono block mb-4">03.</span>
              <h4 className="text-slate-900 font-extrabold text-lg mb-2">OCPP 1.6 SaaS Platform</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Commercial partners gain full dashboard metrics, including charger power loads, session costs, payment collection status, and remote maintenance triggers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         5. SYSTEM DIAGNOSTICS SECTION (LIGHT BACKGROUND)
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
            <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold leading-tight">
              Safety-First Charging Diagnostics
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every MegaCharge hub operates with smart electrical safety diagnostics. We isolate vehicle components and grid structures from surges, short circuits, and critical operating temperatures.
            </p>

            <div className="flex flex-col gap-6 w-full mt-4">
              <div className="flex gap-4">
                <div className="p-3 bg-[#00B4D8] bg-opacity-10 text-[#00B4D8] rounded-xl h-fit border border-[#00B4D8] border-opacity-20">
                  <ShieldIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-extrabold text-sm mb-1.5 uppercase tracking-wider">Overvoltage Surge Protection</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Integrated circuit breakers absorb line surges and lightning currents, preserving vehicle Battery Management Systems (BMS).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-[#00B4D8] bg-opacity-10 text-[#00B4D8] rounded-xl h-fit border border-[#00B4D8] border-opacity-20">
                  <BoltIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-extrabold text-sm mb-1.5 uppercase tracking-wider">Real-time Thermal Control</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Sensors throttle charger output power if the grid or charger modules exceed operating temperatures.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-[#00B4D8] bg-opacity-10 text-[#00B4D8] rounded-xl h-fit border border-[#00B4D8] border-opacity-20">
                  <ChargerIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-extrabold text-sm mb-1.5 uppercase tracking-wider">Continuous OCPP Telemetry</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
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
            className="lg:col-span-6 w-full filter invert hue-rotate-180 brightness-95"
          >
            <NetworkGlobe />
          </motion.div>

        </div>
      </section>

      {/* ==========================================
         6. INTERACTIVE MAP SECTION (LIGHT BACKGROUND)
      ========================================== */}
      <section className="py-32 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mt-2 mb-4 leading-tight">
              India's Expanding Highway Network
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Select highway nodes below to check charger availability, power allocation configurations, and operational statuses.
            </p>
          </motion.div>

          <InteractiveMap />
        </div>
      </section>

      {/* ==========================================
         7. DECISION TOOLS (ROI SAVINGS - LIGHT BACKGROUND)
      ========================================== */}
      <section className="py-32 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mt-2 mb-4 leading-tight">
              Interactive ROI & Commute Savings Console
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Estimate your monthly commute cost savings, calculate investment payback schedules, or match vehicles to optimal charging formats.
            </p>
          </motion.div>

          <ROIUtilities />
        </div>
      </section>

      {/* ==========================================
         8. FAQ SECTION (LIGHT BACKGROUND)
      ========================================== */}
      <section className="py-32 px-6 max-w-4xl mx-auto bg-transparent">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-slate-900 text-4xl font-extrabold mt-2">Frequently Answered Diagnostics</h2>
        </motion.div>

        <div className="flex flex-col gap-5">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className="faq-item rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-7 text-left transition-colors hover:bg-slate-50"
              >
                <span className="text-slate-900 font-extrabold text-sm sm:text-base">{faq.q}</span>
                <span className="text-[#00B4D8] text-xl font-bold">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              
              <div 
                className={`faq-answer-container transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-[300px] border-t border-slate-100 p-7' : 'max-h-0'}`}
                style={{ overflow: 'hidden' }}
              >
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
         9. FINAL CALL TO ACTION (DARK GLOW CARD)
      ========================================== */}
      <section className="py-32 px-6 relative flex justify-center text-center bg-transparent">
        <div className="absolute inset-0 bg-gradient-radial from-[#00B4D8] to-transparent opacity-5 blur-3xl pointer-events-none" />
        
        <motion.div 
          {...fadeInUp}
          className="max-w-4xl mx-auto relative z-10 premium-glass-card-dark p-10 md:p-20 rounded-3xl border border-[#00B4D8] border-opacity-25 flex flex-col items-center gap-8 shadow-[0_0_30px_rgba(0,180,216,0.15)] text-white"
        >
          <span className="text-[#00B4D8] text-xs font-bold uppercase tracking-widest bg-[#00B4D8] bg-opacity-5 border border-[#00B4D8] border-opacity-25 px-4 py-1.5 rounded-full">
            Rental Installation Registry Open
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight">
            Ready to Rent an EV Charging Station?
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
            Get a high-performance EV charging station installed on rent. Contact us today for a free site assessment and customized rental quotation. Join the green mobility revolution with zero setup hassle.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 w-full sm:w-auto">
            <Link to="/contact" className="w-full sm:w-auto text-center btn-premium-green text-white font-bold text-sm px-12 py-5 rounded-full block shadow-glow-green">
              Contact Us for Installation
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
