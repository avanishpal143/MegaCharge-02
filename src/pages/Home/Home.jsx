import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveMap from '../../components/InteractiveMap/InteractiveMap';
import NetworkGlobe from '../../components/NetworkGlobe/NetworkGlobe';
import ROIUtilities from '../../components/ROIUtilities/ROIUtilities';
import { BoltIcon, ChargerIcon, ShieldIcon, ArrowRightIcon, PhoneIcon } from '../../components/CustomIcons/CustomIcons';
import ThreeHero from '../../components/ThreeHero/ThreeHero';
import IsometricHero from '../../components/IsometricHero/IsometricHero';
import './Home.css';

// Import images
import chargingStationCars from '../../assets/charging_station_cars.jpg';
import acCharger from '../../assets/ac_charger.png';
import dcCharger from '../../assets/dc_charger.png';

/* ==========================================
   SCROLL COUNT UP HELPER COMPONENT
========================================== */
const CountUpTo = ({ target, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const end = target;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
    let step = end / (totalMiliseconds / incrementTime);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return (
    <span ref={elementRef} className="font-mono">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

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
  const [homeFormData, setHomeFormData] = useState({ name: '', email: '', phone: '', location: '', message: '' });
  const [homeSubmitted, setHomeSubmitted] = useState(false);
  const [heroView, setHeroView] = useState('3d'); // '3d' | 'isometric'

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleHomeFormSubmit = (e) => {
    e.preventDefault();
    if (homeFormData.name && homeFormData.phone) {
      setHomeSubmitted(true);
    }
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
      <section className="hero-section min-h-screen relative pt-32 pb-20 flex items-center bg-megacharge-dark text-white">
        {/* Glow Effects */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-megacharge-green opacity-10 rounded-full blur-3xl pointer-events-none" />
        
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
            
            {/* Button and Helpline in a single aligned row */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">
              <Link 
                to="/contact" 
                className="w-full sm:w-auto text-center btn-premium-green text-white font-bold text-sm px-10 py-5 rounded-full flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-105 shadow-glow-green"
              >
                Apply for Station Installation <ArrowRightIcon className="w-4 h-4" />
              </Link>
              
              <div className="flex items-center gap-3 text-xs text-slate-300 bg-megacharge-navy bg-opacity-80 border border-slate-700 px-6 py-[18px] rounded-full w-full sm:w-auto justify-center sm:justify-start">
                <div className="p-2 bg-megacharge-green bg-opacity-20 text-megacharge-green rounded-full pulse-glow">
                  <PhoneIcon className="w-3.5 h-3.5" />
                </div>
                <span>Helpline: <strong className="text-white">92895 55090</strong></span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Hero Asset Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full flex flex-col items-center justify-center relative z-20 min-h-[500px] sm:min-h-[550px] gap-6"
          >
            {/* View Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-megacharge-navy bg-opacity-70 border border-slate-700 rounded-full shadow-lg self-center z-30">
              <button
                type="button"
                onClick={() => setHeroView('3d')}
                className={`px-5 py-2.5 rounded-full font-extrabold text-[10px] uppercase tracking-wider transition-all duration-300 ${heroView === '3d' ? 'bg-megacharge-green text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                3D Core Grid
              </button>
              <button
                type="button"
                onClick={() => setHeroView('isometric')}
                className={`px-5 py-2.5 rounded-full font-extrabold text-[10px] uppercase tracking-wider transition-all duration-300 ${heroView === 'isometric' ? 'bg-megacharge-green text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                Isometric Casing
              </button>
            </div>

            <div className="w-full flex items-center justify-center min-h-[450px]">
              {heroView === '3d' ? <ThreeHero /> : <IsometricHero />}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ==========================================
         2. TRUSTED BY MARQUEE
      ========================================== */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto px-6 text-center"
        >
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
        </motion.div>
      </section>

      {/* ==========================================
         2.5 MILESTONES & GRID COUNTING COUNTERS (DARK THEME)
      ========================================== */}
      <section className="py-24 bg-megacharge-dark border-b border-slate-800 relative overflow-hidden text-white">
        {/* Glow Orb behind map mock */}
        <div className="absolute right-[-10%] top-[10%] w-[350px] h-[350px] bg-megacharge-green opacity-5 rounded-full blur-[80px] pointer-events-none animate-pulse" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          {/* Left Column: Heading and Counters */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            <div>
              <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest bg-megacharge-green bg-opacity-5 border border-megacharge-green border-opacity-25 px-4 py-1.5 rounded-full inline-block mb-3 font-mono">
                Expansion Metrics
              </span>
              <h2 className="text-white text-3xl sm:text-5xl font-extrabold font-poppins leading-tight mt-1">
                Gunning for <span className="text-gradient-green">1 Million</span><br />Charging Points!
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4 max-w-xl">
                Leading India's vision for a fully connected electric highway grid, MegaCharge offers state-of-the-art telemetry, load-balancing hardware, and rapid deployment partnerships.
              </p>
            </div>

            {/* Counters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {/* Card 1 */}
              <motion.div 
                whileHover={{ y: -6, borderColor: 'var(--color-green)' }}
                className="p-8 rounded-2xl bg-megacharge-navy bg-opacity-40 border border-slate-800 stats-clipped-card transition-all duration-300 relative overflow-hidden"
              >
                <div className="text-megacharge-green text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight">
                  <CountUpTo target={13500} suffix="+" duration={2} />
                </div>
                <div className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider font-mono">
                  Charging Points Across India
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                whileHover={{ y: -6, borderColor: 'var(--color-green)' }}
                className="p-8 rounded-2xl bg-megacharge-navy bg-opacity-40 border border-slate-800 stats-clipped-card transition-all duration-300 relative overflow-hidden"
              >
                <div className="text-megacharge-green text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight">
                  <CountUpTo target={10} suffix="M kW+" duration={2} />
                </div>
                <div className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider font-mono">
                  Power Dispensed Monthly
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                whileHover={{ y: -6, borderColor: 'var(--color-green)' }}
                className="p-8 rounded-2xl bg-megacharge-navy bg-opacity-40 border border-slate-800 stats-clipped-card transition-all duration-300 relative overflow-hidden"
              >
                <div className="text-megacharge-green text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight">
                  <CountUpTo target={26} suffix="" duration={1.5} />
                </div>
                <div className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider font-mono">
                  States Reached Pan-India
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div 
                whileHover={{ y: -6, borderColor: 'var(--color-green)' }}
                className="p-8 rounded-2xl bg-megacharge-navy bg-opacity-40 border border-slate-800 stats-clipped-card transition-all duration-300 relative overflow-hidden"
              >
                <div className="text-megacharge-green text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight">
                  <CountUpTo target={350} suffix="+" duration={1.8} />
                </div>
                <div className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider font-mono">
                  Cities Connected Globally
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Floating Telemetry Mockup */}
          <div className="lg:col-span-5 w-full flex items-center justify-center relative">
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[85%] max-w-[320px] aspect-[9/18] bg-megacharge-dark border-[8px] border-slate-800 rounded-[44px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-4 flex flex-col gap-4 overflow-hidden border-opacity-95"
            >
              {/* Camera Notch */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-slate-800 rounded-full z-30" />
              
              {/* Telemetry HUD Screen inside mockup */}
              <div className="relative z-10 flex flex-col gap-4 h-full pt-6 justify-between select-none">
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-3">
                  <span className="text-[9px] text-megacharge-orange font-bold uppercase tracking-wider font-mono">NOC Live Feed</span>
                  <span className="text-white text-xs font-bold font-poppins">Active Stations Network</span>
                </div>
                
                {/* Visual pulsating network map mockup */}
                <div className="flex-grow bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden p-2 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
                  
                  {/* Grid lines */}
                  <div className="absolute inset-x-0 h-[1px] bg-slate-800 top-1/3 opacity-30" />
                  <div className="absolute inset-x-0 h-[1px] bg-slate-800 top-2/3 opacity-30" />
                  <div className="absolute inset-y-0 w-[1px] bg-slate-800 left-1/3 opacity-30" />
                  <div className="absolute inset-y-0 w-[1px] bg-slate-800 left-2/3 opacity-30" />

                  {/* Telemetry nodes */}
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-megacharge-green rounded-full shadow-glow-green animate-ping" />
                  <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-megacharge-green rounded-full shadow-glow-green" />

                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-megacharge-green rounded-full shadow-glow-green animate-ping" style={{ animationDelay: '1s' }} />
                  <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-megacharge-green rounded-full shadow-glow-green" />

                  <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-megacharge-orange rounded-full shadow-glow-orange" />
                  
                  {/* Sync Line representing telemetry links */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                    <line x1="33%" y1="25%" x2="66%" y2="50%" stroke="var(--color-green)" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="66%" y1="50%" x2="75%" y2="66%" stroke="var(--color-orange)" strokeWidth="1" strokeDasharray="3,3" />
                  </svg>
                  
                  <span className="absolute bottom-3 text-[9px] text-slate-500 font-mono">24/7 Status: Online</span>
                </div>

                <div className="bg-megacharge-navy bg-opacity-50 border border-slate-800 p-3 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[8px] text-slate-400 block uppercase tracking-wider font-mono">Live Sessions</span>
                    <span className="text-white text-xs font-bold font-mono">1,489 active</span>
                  </div>
                  <span className="text-[9px] text-megacharge-green font-mono bg-megacharge-green bg-opacity-10 px-2 py-0.5 rounded-full">Syncing</span>
                </div>
              </div>
            </motion.div>
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
            whileHover={{ scale: 1.02, translateY: -8 }}
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
                <span className="bg-megacharge-green bg-opacity-10 text-megacharge-green border border-megacharge-green border-opacity-35 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Smart AC Wallbox</span>
                <span className="text-slate-500 text-xs font-mono">Series: MC-AC-07</span>
              </div>
              <h3 className="text-slate-900 text-2xl font-extrabold mb-4">7.4 kW AC Smart Box</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Compact, high-end charging terminal designed for residential townships, commercial workspaces, and overnight hotels. Outfitted with RFID authorization panels and smart mobile application dashboards.
              </p>
              
              <ul className="flex flex-col gap-3 mb-8 text-xs text-slate-600 font-mono">
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
            <Link to="/products" className="w-full text-center border border-megacharge-green hover:bg-megacharge-green text-megacharge-green hover:text-white font-bold text-xs py-4 rounded-full transition-all duration-300 block">
              Specifications & Rental Quotes &rarr;
            </Link>
          </motion.div>

          {/* Charger 2: DC */}
          <motion.div 
            variants={fadeInUp}
            whileHover={{ scale: 1.02, translateY: -8 }}
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
                <span className="bg-megacharge-orange bg-opacity-10 text-megacharge-orange border border-megacharge-orange border-opacity-35 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Modular DC Rectifier</span>
                <span className="text-slate-500 text-xs font-mono">Series: MC-DC-180</span>
              </div>
              <h3 className="text-slate-900 text-2xl font-extrabold mb-4">30 kW - 180 kW DC Charger</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Industrial ultra-fast charging rectifier configuration engineered for public highway hubs, large municipal terminals, and fleet logistics centers. Powers passenger EVs to 80% in under 30 minutes.
              </p>

              <ul className="flex flex-col gap-3 mb-8 text-xs text-slate-600 font-mono">
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
            <Link to="/products" className="w-full text-center border border-megacharge-orange hover:bg-megacharge-orange text-megacharge-orange hover:text-white font-bold text-xs py-4 rounded-full transition-all duration-300 block">
              Specifications & Rental Quotes &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ==========================================
         4. WHAT MAKES MEGACHARGE A CUT ABOVE THE REST (COSMIC STYLE)
      ========================================== */}
      <section className="cosmic-section py-32 px-6 relative border-y border-slate-900">
        <div className="cosmic-glow-orb-1" />
        <div className="cosmic-glow-orb-2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="text-megacharge-orange text-xs font-bold uppercase tracking-widest bg-megacharge-orange bg-opacity-5 border border-megacharge-orange border-opacity-20 px-4 py-1.5 rounded-full inline-block mb-3 font-mono">
              Market Leading EV Fleet Infrastructure
            </span>
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold mt-2 mb-4 leading-tight">
              What makes MegaCharge® a cut above the rest?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We leverage future-ready engineering and dynamic cloud analytics to build, manage, and operate India's most reliable rental charging network.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="cosmic-card flex flex-col gap-6"
            >
              <div className="cosmic-card-icon">
                <BoltIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-extrabold text-lg mb-2">Ultra-Fast Charging</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  High-capacity DC fast rectifiers delivering up to 360 kW power outputs. Charges passenger electric vehicles to 80% capacity in under 15 minutes.
                </p>
              </div>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="cosmic-card flex flex-col gap-6"
            >
              <div className="cosmic-card-icon">
                <span className="text-xl">☀️</span>
              </div>
              <div>
                <h4 className="text-white font-extrabold text-lg mb-2">Solar & Green Grid Integrated</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  Zero-emission charging arrays powered directly by local solar panels, wind grids, and smart power storage blocks for green mobility.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="cosmic-card flex flex-col gap-6"
            >
              <div className="cosmic-card-icon">
                <ShieldIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-extrabold text-lg mb-2">99.9% Network Uptime</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  Active load allocation models, redundant backup systems, and live self-healing software diagnostics for uninterrupted service.
                </p>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="cosmic-card flex flex-col gap-6"
            >
              <div className="cosmic-card-icon">
                <ChargerIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-extrabold text-lg mb-2">Universal Compatibility</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  Dual-gun setups supporting global standards like CCS-2 and Type-2. Fully compatible with all Indian, European, and American EV lines.
                </p>
              </div>
            </motion.div>

            {/* Card 5 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="cosmic-card flex flex-col gap-6"
            >
              <div className="cosmic-card-icon">
                <span className="text-xl">🧠</span>
              </div>
              <div>
                <h4 className="text-white font-extrabold text-lg mb-2">Dynamic Load Balancing</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  Telemetry systems dynamically throttle outputs during local grid peaks, keeping infrastructure safe from blowouts and overloads.
                </p>
              </div>
            </motion.div>

            {/* Card 6 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="cosmic-card flex flex-col gap-6"
            >
              <div className="cosmic-card-icon">
                <span className="text-xl">🛠️</span>
              </div>
              <div>
                <h4 className="text-white font-extrabold text-lg mb-2">End-to-End Managed Operations</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  Zero management overheads for property hosts. We take care of grid setups, structural civil works, updates, and maintenance.
                </p>
              </div>
            </motion.div>
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
              <motion.div 
                whileHover={{ x: 6 }}
                className="flex gap-4"
              >
                <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl h-fit border border-megacharge-green border-opacity-20">
                  <ShieldIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-extrabold text-sm mb-1.5 uppercase tracking-wider">Overvoltage Surge Protection</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Integrated circuit breakers absorb line surges and lightning currents, preserving vehicle Battery Management Systems (BMS).
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 6 }}
                className="flex gap-4"
              >
                <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl h-fit border border-megacharge-green border-opacity-20">
                  <BoltIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-extrabold text-sm mb-1.5 uppercase tracking-wider">Real-time Thermal Control</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Sensors throttle charger output power if the grid or charger modules exceed operating temperatures.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 6 }}
                className="flex gap-4"
              >
                <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl h-fit border border-megacharge-green border-opacity-20">
                  <ChargerIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-extrabold text-sm mb-1.5 uppercase tracking-wider">Continuous OCPP Telemetry</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Automated connections report system diagnostic logs and payment status to centralized customer care centers.
                  </p>
                </div>
              </motion.div>
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
         7.5 APP SHOWCASE SECTION (LIGHT THEME - DETAILED DESIGN)
      ========================================== */}
      <section className="py-28 px-6 bg-slate-50 border-t border-b border-slate-200 relative overflow-hidden text-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Overlapping Phone Mockups */}
            <div className="lg:col-span-6 w-full flex justify-center items-center phone-mockup-wrapper relative min-h-[480px]">
              <div className="relative w-[340px] h-[480px] phone-mockup-container">
                {/* Back Phone (Splash Screen) */}
                <motion.div 
                  initial={{ rotateY: -10, rotateX: 5, zIndex: 10 }}
                  whileHover={{ rotateY: -5, rotateX: 2, scale: 1.02 }}
                  className="absolute left-4 top-0 w-[210px] aspect-[9/18] bg-megacharge-dark border-4 border-slate-800 rounded-[32px] shadow-2xl p-3 flex flex-col justify-between overflow-hidden border-opacity-95"
                >
                  <div className="w-16 h-3.5 bg-slate-800 rounded-full mx-auto mb-4" />
                  <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center">
                    <span className="text-4xl text-megacharge-green animate-pulse">⚡</span>
                    <span className="text-white text-base font-extrabold tracking-widest font-mono">MEGACHARGE</span>
                    <span className="text-slate-400 text-[9px] uppercase tracking-wider font-mono">Powering the Future</span>
                  </div>
                  <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto" />
                </motion.div>

                {/* Front Phone (Active Session Map / Telemetry Screen) */}
                <motion.div 
                  initial={{ rotateY: 10, rotateX: -5, zIndex: 20, x: 90, y: 50 }}
                  whileHover={{ rotateY: 5, rotateX: -2, scale: 1.03, x: 100, y: 40 }}
                  className="absolute left-4 top-0 w-[210px] aspect-[9/18] bg-white border-4 border-slate-900 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-3 flex flex-col justify-between overflow-hidden border-opacity-95"
                >
                  <div className="w-16 h-3.5 bg-slate-900 rounded-full mx-auto mb-2" />
                  
                  {/* Active App view */}
                  <div className="flex-grow flex flex-col gap-2.5 pt-2 text-left justify-between">
                    <div className="flex flex-col gap-0.5 border-b border-slate-100 pb-1.5">
                      <span className="text-[8px] text-slate-400 block font-mono">WELCOME BACK</span>
                      <span className="text-slate-950 text-[10px] font-bold">Hello Priyesh</span>
                    </div>

                    {/* App Map Frame */}
                    <div className="flex-grow bg-slate-100 rounded-xl border border-slate-200 relative overflow-hidden p-1 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
                      
                      {/* Search Bar mockup */}
                      <div className="absolute top-1.5 inset-x-1.5 bg-white p-1 rounded-md shadow-sm border border-slate-200 flex items-center justify-between text-[7px] text-slate-400 font-mono">
                        <span>Search chargers...</span>
                        <span>🔍</span>
                      </div>

                      {/* Map Pins */}
                      <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-megacharge-green rounded-full shadow-glow-green" />
                      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-megacharge-green rounded-full shadow-glow-green" />
                      
                      <span className="absolute bottom-1.5 text-[6px] text-slate-400 font-mono">Telemetry Active</span>
                    </div>

                    {/* Lower status card */}
                    <div className="bg-slate-50 border border-slate-200 p-2 rounded-xl flex flex-col gap-0.5">
                      <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider block font-mono">Recent Charger</span>
                      <span className="text-slate-900 text-[8px] font-extrabold">Vadodara Expressway</span>
                      <span className="text-megacharge-green text-[7px] font-mono">Connected • 78% SOC</span>
                    </div>
                  </div>
                  <div className="w-12 h-1 bg-slate-350 rounded-full mx-auto mt-2" />
                </motion.div>
              </div>
            </div>

            {/* Right Column: Features and Download Badges */}
            <div className="lg:col-span-6 flex flex-col items-start gap-8 text-left">
              <div>
                <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-20 px-4 py-1.5 rounded-full inline-block mb-3 font-mono">
                  Smart App Features
                </span>
                <h2 className="text-slate-950 text-3xl sm:text-5xl font-extrabold font-poppins leading-tight mt-1">
                  MegaCharge App is<br />All You Need
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
                  Seamlessly track, coordinate, and pay for charging sessions across our nationwide network of ultra-fast DC corridors and regional AC hosts.
                </p>
              </div>

              {/* Bullet Features list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🛵</span>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm tracking-wide">TRACK & MONITOR</h4>
                    <p className="text-slate-500 text-xs mt-0.5">Live battery percentage tracking and session telemetry curves.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">💳</span>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm tracking-wide">INTEGRATED WALLET</h4>
                    <p className="text-slate-500 text-xs mt-0.5">Instant payments via UPI, saved cards, or business profiles.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">📅</span>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm tracking-wide">RESERVE SLOTS</h4>
                    <p className="text-slate-500 text-xs mt-0.5">Pre-book charger connectors ahead of arrival to avoid queues.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">🔒</span>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm tracking-wide">OTP SMART CHARGING</h4>
                    <p className="text-slate-500 text-xs mt-0.5">Secure authentication and plug-and-verify start procedures.</p>
                  </div>
                </div>
              </div>

              {/* Badges CTAs */}
              <div className="flex items-center gap-4 border-t border-slate-200 pt-8 w-full">
                <a 
                  href="https://apps.apple.com/in/app/charge-zone-ev-charging-india/id1627426498" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl flex items-center gap-2.5 hover:bg-slate-800 transition-all duration-300 shadow-sm"
                >
                  <span className="text-lg">🍎</span>
                  <div className="text-left">
                    <span className="text-[8px] text-slate-400 block font-mono">Download on the</span>
                    <span className="text-[10px] font-bold font-poppins">App Store</span>
                  </div>
                </a>
                
                <a 
                  href="https://play.google.com/store/apps/details?id=com.chargezone" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl flex items-center gap-2.5 hover:bg-slate-800 transition-all duration-300 shadow-sm"
                >
                  <span className="text-lg">🤖</span>
                  <div className="text-left">
                    <span className="text-[8px] text-slate-400 block font-mono">GET IT ON</span>
                    <span className="text-[10px] font-bold font-poppins">Google Play</span>
                  </div>
                </a>
              </div>

            </div>
          </div>

          {/* Marquee Partner Logos at bottom */}
          <div className="border-t border-slate-200 pt-16 flex flex-col gap-6 text-center">
            <span className="text-slate-500 text-[10px] font-extrabold uppercase tracking-widest font-mono">
              ALLIANCE CAR DESIGN SPECIFICATIONS Governed BY CCS2 / TYPE 2
            </span>
            <div className="partner-marquee-container">
              <div className="partner-marquee-track text-slate-700 font-extrabold text-sm sm:text-base tracking-widest font-mono gap-16 md:gap-28 items-center flex">
                <span>TATA.EV</span>
                <span>HYUNDAI ELECTRIC</span>
                <span>KIA EV CORE</span>
                <span>MG ZS ELECTRIC</span>
                <span>BYD AUTO</span>
                <span>MERCEDES EQ</span>
                <span>AUDI E-TRON</span>
                <span>BMW IX SERIES</span>
                {/* Loop elements */}
                <span>TATA.EV</span>
                <span>HYUNDAI ELECTRIC</span>
                <span>KIA EV CORE</span>
                <span>MG ZS ELECTRIC</span>
                <span>BYD AUTO</span>
                <span>MERCEDES EQ</span>
                <span>AUDI E-TRON</span>
                <span>BMW IX SERIES</span>
              </div>
            </div>
          </div>

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
            <motion.div 
              key={idx} 
              whileHover={{ scale: 1.01 }}
              className="faq-item rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-7 text-left transition-colors hover:bg-slate-50"
              >
                <span className="text-slate-700 font-medium text-sm sm:text-base">{faq.q}</span>
                <span className="text-megacharge-green text-xl font-bold">
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==========================================
         9. FINAL CALL TO ACTION (WITH INTEGRATED FORM)
      ========================================== */}
      <section className="py-32 px-6 relative flex justify-center text-center bg-transparent">
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-5 blur-3xl pointer-events-none" />
        
        <motion.div 
          {...fadeInUp}
          className="max-w-3xl w-full mx-auto relative z-10 premium-glass-card-dark p-8 md:p-12 rounded-3xl border border-megacharge-green border-opacity-25 flex flex-col gap-8 shadow-glow-green text-white text-left"
        >
          <div className="text-center md:text-left border-b border-slate-800 pb-6">
            <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest bg-megacharge-green bg-opacity-5 border border-megacharge-green border-opacity-25 px-4 py-1.5 rounded-full inline-block mb-3">
              Rental Installation Registry Open
            </span>
            <h2 className="text-white text-3xl font-extrabold leading-tight">
              Ready to Rent an EV Charging Station?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mt-2">
              Get a high-performance EV charging station installed on rent. Enter your property details below for a free site assessment and customized rental quotation from MNIL engineers.
            </p>
          </div>

          {homeSubmitted ? (
            <div className="p-8 border border-green-500 border-opacity-40 rounded-2xl bg-green-500 bg-opacity-5 text-center w-full">
              <span className="text-4xl block mb-4">🎉</span>
              <h4 className="text-white text-xl font-bold mb-2">Rental Enquiry Submitted!</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Thank you for reaching out. A MegaCharge representative will contact you within 24 hours to schedule your site grid evaluation survey.
              </p>
            </div>
          ) : (
            <form onSubmit={handleHomeFormSubmit} className="flex flex-col gap-5 w-full text-slate-900">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={homeFormData.name}
                    onChange={(e) => setHomeFormData({...homeFormData, name: e.target.value})}
                    placeholder="Enter your name" 
                    className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={homeFormData.phone}
                    onChange={(e) => setHomeFormData({...homeFormData, phone: e.target.value})}
                    placeholder="+91 99999 99999" 
                    className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Corporate Email</label>
                  <input 
                    type="email" 
                    value={homeFormData.email}
                    onChange={(e) => setHomeFormData({...homeFormData, email: e.target.value})}
                    placeholder="email@company.com" 
                    className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Site Location (City, State) *</label>
                  <input 
                    type="text" 
                    required 
                    value={homeFormData.location}
                    onChange={(e) => setHomeFormData({...homeFormData, location: e.target.value})}
                    placeholder="e.g. Gurugram, Haryana" 
                    className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Site Details / Message</label>
                <textarea 
                  rows="3" 
                  value={homeFormData.message}
                  onChange={(e) => setHomeFormData({...homeFormData, message: e.target.value})}
                  placeholder="Provide approximate space dimensions, existing electricity load details, or other notes..." 
                  className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full text-center bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-xs py-4 rounded-xl transition-all duration-300 mt-2 block shadow-glow-green"
              >
                Submit Installation Inquiry &rarr;
              </button>
            </form>
          )}
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
