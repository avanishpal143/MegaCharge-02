import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import InteractiveMap from '../../components/InteractiveMap/InteractiveMap';
import NetworkGlobe from '../../components/NetworkGlobe/NetworkGlobe';
import ROIUtilities from '../../components/ROIUtilities/ROIUtilities';
import {
  BoltIcon, ChargerIcon, ShieldIcon, ArrowRightIcon, PhoneIcon,
  IconSearch, IconFile, IconCharging, IconDollar,
  IconHotel, IconHighway, IconBuilding, IconHome, IconMall,
  IconFleet, IconSolar, IconBrain, IconTool, IconCheck,
  IconZap, IconGauge, IconCpu, IconPhone,
  // Google Icons
  IconGoogleBolt, IconGoogleConstruction, IconGoogleSmartphone,
  IconGoogleSupport, IconGoogleSolar, IconGoogleCheck, IconGoogleCancel,
  IconGoogleSearch, IconGoogleStar, IconGoogleScooter, IconGoogleWallet,
  IconGoogleCalendar, IconGoogleLock,
} from '../../components/CustomIcons/CustomIcons';
import { MapPin, Search, FileText, BatteryCharging, Banknote, Hotel, Navigation, Building2, Home as LucideHome, ShoppingBag, Factory, SunMedium, Brain, Wrench } from 'lucide-react';
import ThreeHero from '../../components/ThreeHero/ThreeHero';
import IsometricHero from '../../components/IsometricHero/IsometricHero';
import ContactForm from '../../components/ContactForm/ContactForm';
import PremiumHero from '../../components/PremiumHero/PremiumHero';
import './Home.css';

import chargingStationCars from '../../assets/charging_station_cars.jpg';
import acCharger from '../../assets/ac_charger.png';
import dcCharger from '../../assets/dc_charger.png';
import heroBg from '../../assets/hero_bg.png';
import megachargeBanner from '../../assets/megacharge_banner.png';

/* ==========================================
   SCROLL COUNT UP HELPER
========================================== */
const CountUpTo = ({ target, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting && !hasStarted) setHasStarted(true); },
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
    const totalMs = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMs / end), 20);
    const step = end / (totalMs / incrementTime);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { clearInterval(timer); setCount(end); }
      else setCount(Math.floor(start));
    }, incrementTime);
    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return <span ref={elementRef} className="font-mono">{count.toLocaleString()}{suffix}</span>;
};

/* ==========================================
   FLOATING PARTICLE COMPONENT (Hero Background)
========================================== */
const FloatingParticles = () => {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-megacharge-green opacity-20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -40, 0], x: [0, 15, -10, 0], opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Electric bolt icons floating */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`bolt-${i}`}
          className="absolute text-megacharge-green opacity-10 select-none"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0], opacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 6 + i, delay: i * 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <IconGoogleBolt size={24} />
        </motion.div>
      ))}
    </div>
  );
};

/* ==========================================
   ANIMATION CONFIGS
========================================== */
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { staggerChildren: 0.15 }
};

const cardVariant = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
};

/* ==========================================
   TESTIMONIALS DATA
========================================== */
const TESTIMONIALS = [
  {
    name: "Rajiv Sharma",
    role: "Mall Owner, Gurugram",
    text: "MegaCharge installed 8 DC fast chargers in our parking lot within 2 weeks. Footfall to the mall increased 18% — EV drivers stay longer and spend more.",
    rating: 5,
    avatar: "RS"
  },
  {
    name: "Priya Mehta",
    role: "Hotel GM, Pune",
    text: "Our guests specifically book our hotel because of MegaCharge stations. Zero maintenance headaches — their team handles everything remotely.",
    rating: 5,
    avatar: "PM"
  },
  {
    name: "Anil Kapoor",
    role: "Highway Plaza Owner, NH48",
    text: "Revenue from charging sessions is now ₹85,000/month. The rental model meant zero upfront cost for us. Best infrastructure decision we made.",
    rating: 5,
    avatar: "AK"
  },
  {
    name: "Deepak Verma",
    role: "RWA President, Noida Society",
    text: "120 flats, 40+ EVs. MegaCharge set up AC wallboxes in our basement within a week. Residents love the app-based billing.",
    rating: 5,
    avatar: "DV"
  },
  {
    name: "Sunita Rao",
    role: "Fleet Manager, Bangalore",
    text: "Our 60-vehicle EV fleet charges overnight. OCPP telemetry lets us track every session. Cost per km dropped significantly.",
    rating: 5,
    avatar: "SR"
  },
];

const STEPS = [
  {
    num: "01",
    IconComp: MapPin,
    title: "Submit Your Site",
    desc: "Fill out a quick form with your property location, available space, and electricity load. Takes under 2 minutes."
  },
  {
    num: "02",
    IconComp: Search,
    title: "Free Site Survey",
    desc: "Our grid engineers visit within 48 hours for a structural feasibility check and power load assessment."
  },
  {
    num: "03",
    IconComp: FileText,
    title: "Rental Proposal",
    desc: "Receive a customized rental agreement with monthly income projections, hardware specs, and installation timeline."
  },
  {
    num: "04",
    IconComp: BatteryCharging,
    title: "Installation & Go Live",
    desc: "Our team handles all civil works, cabling, grid connection, and software setup. Station goes live typically within 7 days."
  },
  {
    num: "05",
    IconComp: Banknote,
    title: "Earn Monthly",
    desc: "Sit back and earn recurring rental income or revenue share while we manage 100% of operations and maintenance."
  },
];

const USE_CASES = [
  {
    IconComp: Hotel,
    label: "Hotels & Resorts",
    headline: "Attract EV-Driving Guests",
    desc: "Offer guaranteed overnight charging to guests. Boost bookings and add a premium amenity that sets you apart from competitors.",
    color: "green",
    stat: "+22% bookings",
  },
  {
    IconComp: Navigation,
    label: "Highway Plazas",
    headline: "Capture Long-Distance EV Traffic",
    desc: "Highway travellers stop specifically where they can charge. Turn your dhaba or plaza into an essential pit-stop on every EV route.",
    color: "orange",
    stat: "₹70-120K/month",
  },
  {
    IconComp: Building2,
    label: "Commercial Offices",
    headline: "Employee & Visitor Charging",
    desc: "Attract top talent and clients. Corporate fleets charge during business hours. Add a CSR win for your sustainability reporting.",
    color: "green",
    stat: "Zero ops cost",
  },
  {
    IconComp: LucideHome,
    label: "Residential Societies",
    headline: "Basement & Podium Charging",
    desc: "App-based billing means zero RWA overhead. Every resident charges from their parking spot with individual UPI meters.",
    color: "orange",
    stat: "Per-unit billing",
  },
  {
    IconComp: ShoppingBag,
    label: "Malls & Retail",
    headline: "Increase Dwell Time",
    desc: "EV owners spend 40-60 minutes shopping while their car charges. Your parking becomes a loyalty driver, not just a utility.",
    color: "green",
    stat: "+18% dwell time",
  },
  {
    IconComp: Factory,
    label: "Fleet & Logistics",
    headline: "Overnight Fleet Depot Charging",
    desc: "Keep your entire commercial EV fleet charged by morning. Load-balanced AC charging across 20-100 vehicles simultaneously.",
    color: "orange",
    stat: "Fleet-optimized",
  },
];

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

/* ==========================================
   HOME COMPONENT
========================================== */
const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [heroView, setHeroView] = useState('3d');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialRef = useRef(null);

  const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="home-page-container overflow-hidden">

      {/* PREMIUM HERO */}
      <PremiumHero />

      {/* ==========================================
         2. PARTNERS ANIMATED MARQUEE
      ========================================== */}
      <section className="py-14 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="text-center mb-6">
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-mono">
            STEERING INFRASTRUCTURE ALLIANCES WITH MARKET LEADERS
          </span>
        </div>
        <div className="partner-marquee-container">
          <div className="partner-marquee-track text-slate-700 font-extrabold text-sm tracking-widest font-mono flex items-center">
            {['MNIL CORPORATE', 'DLF INFRA', 'TATA METRO', 'L&T RENEWABLES', 'NHAI EXPRESSWAYS', 'MAHINDRA ELECTRIC', 'LODHA GROUP', 'GMR INFRA', 'MNIL CORPORATE', 'DLF INFRA', 'TATA METRO', 'L&T RENEWABLES', 'NHAI EXPRESSWAYS', 'MAHINDRA ELECTRIC', 'LODHA GROUP', 'GMR INFRA'].map((name, i) => (
              <span key={i} className="mx-10 sm:mx-16 whitespace-nowrap flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-megacharge-green inline-block opacity-60" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
         3. STATS / MILESTONES SECTION
      ========================================== */}
      <section className="py-24 bg-megacharge-dark border-b border-slate-800 relative overflow-hidden text-white">
        <div className="absolute right-[-10%] top-[10%] w-[350px] h-[350px] bg-megacharge-green opacity-5 rounded-full blur-[80px] pointer-events-none animate-pulse" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <h2 className="text-white text-3xl sm:text-5xl font-extrabold font-poppins leading-tight mt-1">
                Gunning for <span className="text-gradient-green">1 Million</span><br />Charging Points!
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4 max-w-xl">
                Leading India's vision for a fully connected electric highway grid — state-of-the-art telemetry, load-balancing hardware, and rapid deployment partnerships.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {[
                { target: 13500, suffix: '+', label: 'Charging Points Across India' },
                { target: 10, suffix: 'M kW+', label: 'Power Dispensed Monthly' },
                { target: 26, suffix: '', label: 'States Reached Pan-India' },
                { target: 350, suffix: '+', label: 'Cities Connected' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6, borderColor: 'var(--color-green)' }}
                  className="p-8 rounded-2xl bg-megacharge-navy bg-opacity-40 border border-slate-800 stats-clipped-card transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-megacharge-green opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-2xl" />
                  <div className="text-megacharge-green text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight">
                    <CountUpTo target={stat.target} suffix={stat.suffix} duration={2} />
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider font-mono">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-[85%] max-w-[300px] aspect-[9/18] bg-megacharge-dark border-[8px] border-slate-800 rounded-[44px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-4 flex flex-col gap-4 overflow-hidden"
            >
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-800 rounded-full z-30" />
              <div className="relative z-10 flex flex-col gap-4 h-full pt-6 justify-between select-none">
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-3">
                  <span className="text-[9px] text-megacharge-orange font-bold uppercase tracking-wider font-mono">NOC Live Feed</span>
                  <span className="text-white text-xs font-bold font-poppins">Active Stations Network</span>
                </div>
                <div className="flex-grow bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden p-2">
                  <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-megacharge-green rounded-full shadow-glow-green animate-ping" />
                  <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-megacharge-green rounded-full" />
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-megacharge-green rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                  <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-megacharge-green rounded-full" />
                  <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-megacharge-orange rounded-full" />
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                    <line x1="33%" y1="25%" x2="66%" y2="50%" stroke="var(--color-green)" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="66%" y1="50%" x2="75%" y2="66%" stroke="var(--color-orange)" strokeWidth="1" strokeDasharray="3,3" />
                  </svg>
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-slate-500 font-mono">24/7 Status: Online</span>
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
         4. HOW IT WORKS — STEP BY STEP
      ========================================== */}
      <section className="py-32 px-6 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mt-2 leading-tight">
              From Empty Parking to<br />
              <span className="relative inline-block">
                <span className="text-megacharge-green">Earning Charging Station</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6">
                  <path d="M0 5 Q100 0 200 5" fill="none" stroke="var(--color-green)" strokeWidth="2" strokeDasharray="4 2" opacity="0.6" />
                </svg>
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-5">
              Our rental model is zero-risk. You provide the space, we provide everything else.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line behind steps */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="how-it-works-card flex flex-col items-center text-center gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative group"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-megacharge-green text-white text-xs font-extrabold font-mono flex items-center justify-center shadow-glow-green">
                    {step.num}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mt-4 group-hover:border-megacharge-green group-hover:bg-megacharge-green group-hover:bg-opacity-5 transition-all duration-300 text-megacharge-green"
                  >
                    <step.IconComp size={28} strokeWidth={1.6} />
                  </motion.div>
                  <h4 className="text-slate-900 font-extrabold text-base">{step.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div {...fadeInUp} className="text-center mt-16">
            <Link to="/contact" className="inline-flex items-center gap-2 btn-premium-green text-white font-bold text-sm px-10 py-4 rounded-full shadow-glow-green hover:scale-105 transition-transform duration-300">
              Start Your Application <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         5. CHARGER HARDWARE SHOWCASE
      ========================================== */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mt-2 mb-4 leading-tight">
            High-Performance Charging Station Units
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            All MegaCharge hardware features modular power conversion, dynamic load-balancing, and liquid-cooled rectifiers — tested up to 55°C.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* AC Charger Card */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.02, translateY: -8 }}
            className="premium-glass-card p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="w-full h-64 mb-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm relative group">
                <img src={acCharger} alt="MegaCharge AC Smart Box" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-megacharge-green bg-opacity-10 text-megacharge-green border border-megacharge-green border-opacity-35 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Smart AC Wallbox</span>
                <span className="text-slate-500 text-xs font-mono">Series: MC-AC-07</span>
              </div>
              <h3 className="text-slate-900 text-2xl font-extrabold mb-4">7.4 kW AC Smart Box</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Compact terminal for residential townships, commercial workspaces, and hotels. RFID authorization and smart app dashboards included.
              </p>
              <ul className="flex flex-col gap-3 mb-8 text-xs text-slate-600 font-mono">
                {['7.4 kW / 32A single-phase', 'Universal Type-2 plug', 'App scheduled timing & UPI', 'IP54 weather shield'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5"><span className="text-megacharge-green">&bull;</span>{f}</li>
                ))}
              </ul>
            </div>
            <Link to="/products" className="w-full text-center border border-megacharge-green hover:bg-megacharge-green text-megacharge-green hover:text-white font-bold text-xs py-4 rounded-full transition-all duration-300 block">
              Specifications & Rental Quotes &rarr;
            </Link>
          </motion.div>

          {/* DC Charger Card */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.02, translateY: -8 }}
            className="premium-glass-card p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="w-full h-64 mb-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm relative group">
                <img src={dcCharger} alt="MegaCharge DC Fast Charger" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-megacharge-orange bg-opacity-10 text-megacharge-orange border border-megacharge-orange border-opacity-35 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Modular DC Rectifier</span>
                <span className="text-slate-500 text-xs font-mono">Series: MC-DC-180</span>
              </div>
              <h3 className="text-slate-900 text-2xl font-extrabold mb-4">30 kW–180 kW DC Charger</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Industrial ultra-fast rectifier for highway hubs, municipal terminals, and fleet centers. Powers EVs to 80% in under 30 minutes.
              </p>
              <ul className="flex flex-col gap-3 mb-8 text-xs text-slate-600 font-mono">
                {['Dynamic 30–180 kW power allocation', 'Dual CCS2 & CHAdeMO couplers', 'OCPP 1.6 JSON telemetry', 'Liquid-cooled modular rectifiers'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5"><span className="text-megacharge-orange">&bull;</span>{f}</li>
                ))}
              </ul>
            </div>
            <Link to="/products" className="w-full text-center border border-megacharge-orange hover:bg-megacharge-orange text-megacharge-orange hover:text-white font-bold text-xs py-4 rounded-full transition-all duration-300 block">
              Specifications & Rental Quotes &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ==========================================
         6. RENTAL USE CASES SECTION
      ========================================== */}
      <section className="py-32 px-6 bg-megacharge-dark border-y border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-megacharge-green opacity-[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold mt-2 leading-tight">
              Perfect For Every <span className="text-gradient-orange">Property Type</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
              From highway dhabas to luxury hotels — any property with a parking space can become an EV charging destination.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={i}
                variants={cardVariant}
                whileHover={{ y: -10, scale: 1.02 }}
                className="use-case-card group relative rounded-3xl p-7 flex flex-col gap-4 cursor-default overflow-hidden"
                style={{ '--accent': uc.color === 'green' ? 'var(--color-green)' : 'var(--color-orange)' }}
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] ${uc.color === 'green' ? 'bg-megacharge-green' : 'bg-megacharge-orange'} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="flex items-start justify-between">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${uc.color === 'green' ? 'bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-25 text-megacharge-green' : 'bg-megacharge-orange bg-opacity-10 border border-megacharge-orange border-opacity-25 text-megacharge-orange'} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <uc.IconComp size={24} strokeWidth={1.6} />
                  </motion.div>
                  <span className={`text-xs font-extrabold font-mono px-3 py-1.5 rounded-full border ${uc.color === 'green' ? 'text-megacharge-green bg-megacharge-green bg-opacity-10 border-megacharge-green border-opacity-30' : 'text-megacharge-orange bg-megacharge-orange bg-opacity-10 border-megacharge-orange border-opacity-30'}`}>
                    {uc.stat}
                  </span>
                </div>
                
                <div>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-mono block mb-1">{uc.label}</span>
                  <h4 className="text-white text-lg font-extrabold mb-2">{uc.headline}</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{uc.desc}</p>
                </div>

                <div className={`mt-auto pt-4 border-t ${uc.color === 'green' ? 'border-slate-800' : 'border-slate-800'}`}>
                  <Link to="/solutions" className={`text-xs font-bold flex items-center gap-1 ${uc.color === 'green' ? 'text-megacharge-green' : 'text-megacharge-orange'} group-hover:gap-3 transition-all duration-300`}>
                    Learn more <ArrowRightIcon className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         7. PHOTO GALLERY / REAL STATIONS SECTION
      ========================================== */}
      <section className="py-32 px-6 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: copy */}
            <motion.div {...fadeInLeft} className="lg:col-span-5 flex flex-col gap-6">
              <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold leading-tight">
                Charging Stations You Can <span className="text-megacharge-green">See & Trust</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Not just renders — real MegaCharge stations powering real vehicles across India's highways, malls, hotels, and residential complexes.
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
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-megacharge-green hover:shadow-glow-green transition-all duration-300"
                  >
                    <div className="p-1.5 bg-megacharge-green bg-opacity-10 text-megacharge-green border border-megacharge-green border-opacity-10 rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-slate-900 text-xs font-bold block">{item.label}</span>
                      <span className="text-slate-500 text-[10px]">{item.sub}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link to="/network" className="inline-flex items-center gap-2 text-megacharge-green font-bold text-sm hover:gap-4 transition-all duration-300 mt-2">
                Explore Our Network <ArrowRightIcon className="w-4 h-4" />
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
                  <img src={chargingStationCars} alt="MegaCharge station with EVs" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-megacharge-green animate-pulse" />
                    <span className="text-white text-xs font-bold font-mono">Live Charging Session</span>
                  </div>
                </motion.div>

                {/* Bottom two smaller panels */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="h-44 rounded-2xl overflow-hidden shadow-lg bg-megacharge-dark border border-slate-800 flex flex-col items-center justify-center gap-3 relative"
                >
                  <img src={acCharger} alt="AC Charger" className="h-28 object-contain opacity-90" />
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">AC 7.4kW</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="h-44 rounded-2xl overflow-hidden shadow-lg bg-megacharge-dark border border-slate-800 flex flex-col items-center justify-center gap-3 relative"
                >
                  <img src={dcCharger} alt="DC Charger" className="h-28 object-contain opacity-90" />
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">DC 180kW</span>
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

      {/* ==========================================
         8. WHY RENT VS BUY COMPARISON
      ========================================== */}
      <section className="py-32 px-6 bg-megacharge-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,166,200,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold mt-2 leading-tight">
              Why <span className="text-gradient-green">Rent</span> Instead of Buy?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
              The numbers make it clear. Our rental model eliminates all risk while delivering the same upside.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            className="overflow-x-auto rounded-3xl border border-slate-800 shadow-2xl"
          >
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-slate-900">
                  <th className="py-5 px-6 text-left text-slate-400 font-mono text-xs uppercase tracking-widest">Parameter</th>
                  <th className="py-5 px-6 text-center">
                    <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-megacharge-green bg-megacharge-green bg-opacity-10 px-4 py-2 rounded-full font-mono border border-megacharge-green border-opacity-30 shadow-glow-green">
                      <IconGoogleCheck size={16} className="text-megacharge-green" /> Rent with MegaCharge
                    </span>
                  </th>
                  <th className="py-5 px-6 text-center text-slate-500 font-mono text-xs uppercase tracking-wider">
                    <span className="inline-flex items-center gap-2 bg-red-500 bg-opacity-5 px-4 py-2 rounded-full border border-red-500 border-opacity-20 text-red-400">
                      <IconGoogleCancel size={16} className="text-red-400" /> Buy & Operate Yourself
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  ['Upfront Capital Required', '₹0 / Zero Investment', '₹3–15 Lakhs per charger'],
                  ['Installation & Civil Work', 'Fully handled by MegaCharge', 'Your responsibility + costs'],
                  ['Monthly Maintenance', 'Zero — 100% covered by us', '₹5,000–20,000/month'],
                  ['Software & Telemetry Fees', 'Included in rental contract', 'Separate SaaS subscription'],
                  ['Breakdown & Repair', '24/7 NOC remote + on-site', 'Find your own technician'],
                  ['Revenue', 'Earn rental + revenue share', 'Collect all revenue yourself'],
                  ['Risk', 'Zero risk for the host', 'Full equipment depreciation risk'],
                  ['Upgrade Path', 'Free hardware upgrades by us', 'Buy new hardware at market rate'],
                ].map(([param, rent, buy], i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    className="group hover:bg-slate-900/50 transition-colors duration-200"
                  >
                    <td className="py-4 px-6 text-slate-300 text-xs sm:text-sm font-semibold">{param}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-megacharge-green text-xs sm:text-sm font-bold bg-megacharge-green bg-opacity-5 px-3 py-1 rounded-lg">{rent}</span>
                    </td>
                    <td className="py-4 px-6 text-center text-slate-500 text-xs sm:text-sm">{buy}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link to="/solutions" className="inline-flex items-center gap-2 btn-premium-green text-white font-bold text-sm px-10 py-4 rounded-full shadow-glow-green hover:scale-105 transition-transform duration-300">
              See All Rental Plans <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         9. WHAT MAKES MEGACHARGE CUT ABOVE (COSMIC)
      ========================================== */}
      <section className="cosmic-section py-32 px-6 relative border-y border-slate-900">
        <div className="cosmic-glow-orb-1" />
        <div className="cosmic-glow-orb-2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold mt-2 mb-4 leading-tight">
              What makes MegaCharge® a cut above the rest?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Future-ready engineering and dynamic cloud analytics to build, manage, and operate India's most reliable rental charging network.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <BoltIcon size={22} strokeWidth={1.6}/>, title: 'Ultra-Fast Charging', desc: 'High-capacity DC fast rectifiers delivering up to 360 kW. Charges EVs to 80% in under 15 minutes.' },
              { icon: <SunMedium size={22} strokeWidth={1.6}/>, title: 'Solar & Green Grid', desc: 'Zero-emission charging arrays powered by local solar panels, wind grids, and smart power storage blocks.' },
              { icon: <ShieldIcon size={22} strokeWidth={1.6}/>, title: '99.9% Network Uptime', desc: 'Active load allocation, redundant backup systems, and live self-healing software for uninterrupted service.' },
              { icon: <BatteryCharging size={22} strokeWidth={1.6}/>, title: 'Universal Compatibility', desc: 'Dual-gun setups with CCS-2 and Type-2 — fully compatible with all Indian, European, and American EV models.' },
              { icon: <Brain size={22} strokeWidth={1.6}/>, title: 'Dynamic Load Balancing', desc: 'Telemetry systems throttle outputs during grid peaks, keeping infrastructure safe from blowouts and overloads.' },
              { icon: <Wrench size={22} strokeWidth={1.6}/>, title: 'End-to-End Managed', desc: 'Zero management overhead for property hosts. Grid setup, civil works, updates, and maintenance all covered.' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="cosmic-card flex flex-col gap-6"
              >
                <div className="cosmic-card-icon">
                  {typeof card.icon === 'string' ? <span className="text-xl">{card.icon}</span> : card.icon}
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-lg mb-2">{card.title}</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
         10. DIAGNOSTICS SECTION
      ========================================== */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div {...fadeInLeft} className="lg:col-span-6 flex flex-col items-start gap-6">
            <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold leading-tight">
              Safety-First Charging Diagnostics
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every MegaCharge hub runs smart electrical safety diagnostics — isolating vehicle components from surges, short circuits, and temperature extremes.
            </p>
            <div className="flex flex-col gap-6 w-full mt-4">
              {[
                { icon: <ShieldIcon className="w-6 h-6" />, title: 'Overvoltage Surge Protection', desc: 'Integrated circuit breakers absorb line surges and lightning currents, preserving vehicle Battery Management Systems.' },
                { icon: <BoltIcon className="w-6 h-6" />, title: 'Real-time Thermal Control', desc: 'Sensors throttle charger output if grid or charger modules exceed operating temperatures.' },
                { icon: <ChargerIcon className="w-6 h-6" />, title: 'Continuous OCPP Telemetry', desc: 'Automated connections report diagnostic logs and payment status to centralized customer care centers.' },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ x: 6 }} className="flex gap-4">
                  <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl h-fit border border-megacharge-green border-opacity-20 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-extrabold text-sm mb-1.5 uppercase tracking-wider">{item.title}</h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInRight} className="lg:col-span-6 w-full filter invert hue-rotate-180 brightness-95">
            <NetworkGlobe />
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         11. INTERACTIVE MAP
      ========================================== */}
      <section className="py-32 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mt-2 mb-4 leading-tight">
              India's Expanding Highway Network
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Select highway nodes to check charger availability, power configurations, and operational statuses.
            </p>
          </motion.div>
          <InteractiveMap />
        </div>
      </section>

      {/* ==========================================
         12. TESTIMONIALS CAROUSEL
      ========================================== */}
      <section className="py-32 px-6 bg-megacharge-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(147,166,200,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold mt-2 leading-tight">
              Trusted by Property <span className="text-gradient-green">Owners Pan-India</span>
            </h2>
          </motion.div>

          {/* Featured testimonial (auto-rotating) */}
          <div className="max-w-3xl mx-auto mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-megacharge-navy bg-opacity-50 border border-slate-700 rounded-3xl p-10 text-center relative overflow-hidden"
              >
                <div className="absolute top-6 left-8 text-6xl text-megacharge-green opacity-20 font-serif leading-none select-none">&ldquo;</div>
                <div className="relative z-10 flex flex-col items-center gap-5">
                  <div className="flex gap-1">
                    {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                      <IconGoogleStar key={i} size={20} fill className="text-yellow-400" pulse delay={i * 0.2} />
                    ))}
                  </div>
                  <p className="text-white text-lg sm:text-xl font-medium leading-relaxed italic">
                    "{TESTIMONIALS[activeTestimonial].text}"
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="w-12 h-12 rounded-full bg-megacharge-green bg-opacity-20 border border-megacharge-green border-opacity-40 flex items-center justify-center text-megacharge-green font-extrabold font-mono text-sm">
                      {TESTIMONIALS[activeTestimonial].avatar}
                    </div>
                    <div className="text-left">
                      <span className="text-white font-bold text-sm block">{TESTIMONIALS[activeTestimonial].name}</span>
                      <span className="text-slate-400 text-xs font-mono">{TESTIMONIALS[activeTestimonial].role}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-3 mb-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-8 h-2.5 bg-megacharge-green' : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400'}`}
              />
            ))}
          </div>

          {/* All testimonial cards row */}
          <div className="testimonials-scroll-track flex gap-6 overflow-x-auto pb-4 scrollbar-hidden">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setActiveTestimonial(i)}
                className={`testimonial-mini-card shrink-0 w-72 p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${i === activeTestimonial ? 'border-megacharge-green bg-megacharge-green bg-opacity-5' : 'border-slate-700 bg-megacharge-navy bg-opacity-30 hover:border-slate-600'}`}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => <IconGoogleStar key={j} size={14} fill className="text-yellow-400" />)}
                </div>
                <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-3">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-megacharge-green bg-opacity-15 border border-megacharge-green border-opacity-30 flex items-center justify-center text-megacharge-green text-[10px] font-extrabold font-mono">
                    {t.avatar}
                  </div>
                  <div>
                    <span className="text-white text-xs font-bold block">{t.name}</span>
                    <span className="text-slate-500 text-[10px] font-mono">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
         13. APP SHOWCASE SECTION
      ========================================== */}
      <section className="py-28 px-6 bg-slate-50 border-t border-b border-slate-200 relative overflow-hidden text-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Phone mockups */}
            <div className="lg:col-span-6 w-full flex justify-center items-center phone-mockup-wrapper relative min-h-[480px]">
              <div className="relative w-[340px] h-[480px]">
                {/* Back Phone */}
                <motion.div
                  initial={{ rotateY: -10, rotateX: 5 }}
                  whileHover={{ rotateY: -5, rotateX: 2, scale: 1.02 }}
                  className="absolute left-4 top-0 w-[210px] aspect-[9/18] bg-megacharge-dark border-4 border-slate-800 rounded-[32px] shadow-2xl p-3 flex flex-col justify-between overflow-hidden"
                >
                  <div className="w-16 h-3.5 bg-slate-800 rounded-full mx-auto mb-4" />
                  <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center">
                    <IconGoogleBolt size={36} className="text-megacharge-green" pulse />
                    <span className="text-white text-base font-extrabold tracking-widest font-mono">MEGACHARGE</span>
                    <span className="text-slate-400 text-[9px] uppercase tracking-wider font-mono">Powering the Future</span>
                  </div>
                  <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto" />
                </motion.div>

                {/* Front Phone */}
                <motion.div
                  initial={{ x: 90, y: 50 }}
                  whileHover={{ scale: 1.03, x: 100, y: 40 }}
                  className="absolute left-4 top-0 w-[210px] aspect-[9/18] bg-white border-4 border-slate-900 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-3 flex flex-col justify-between overflow-hidden"
                  style={{ x: 90, y: 50 }}
                >
                  <div className="w-16 h-3.5 bg-slate-900 rounded-full mx-auto mb-2" />
                  <div className="flex-grow flex flex-col gap-2.5 pt-2 justify-between">
                    <div className="border-b border-slate-100 pb-1.5">
                      <span className="text-[8px] text-slate-400 block font-mono">WELCOME BACK</span>
                      <span className="text-slate-950 text-[10px] font-bold">Hello, EV Host</span>
                    </div>
                    <div className="flex-grow bg-slate-100 rounded-xl border border-slate-200 relative overflow-hidden p-1">
                      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
                      <div className="absolute top-1.5 inset-x-1.5 bg-white p-1 rounded-md shadow-sm border border-slate-200 flex items-center justify-between text-[7px] text-slate-400 font-mono">
                        <span>Search chargers...</span><IconGoogleSearch size={8} className="text-slate-400 animate-pulse" />
                      </div>
                      <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-megacharge-green rounded-full shadow-glow-green" />
                      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-megacharge-green rounded-full shadow-glow-green" />
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2 rounded-xl">
                      <span className="text-[7px] text-slate-500 font-bold uppercase block font-mono">Revenue This Month</span>
                      <span className="text-slate-900 text-[11px] font-extrabold text-megacharge-green">₹82,450 ↑</span>
                    </div>
                  </div>
                  <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mt-2" />
                </motion.div>
              </div>
            </div>

            {/* Right: Features */}
            <div className="lg:col-span-6 flex flex-col items-start gap-8">
              <div>
                <h2 className="text-slate-950 text-3xl sm:text-5xl font-extrabold font-poppins leading-tight mt-1">
                  MegaCharge App is<br />All You Need
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
                  Track, manage, and earn from your charging stations across our nationwide network — all from one app.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {[
                  { icon: <IconGoogleScooter size={20} className="text-megacharge-green" bounce />, title: 'TRACK & MONITOR', desc: 'Live session tracking and telemetry curves.' },
                  { icon: <IconGoogleWallet size={20} className="text-megacharge-green" pulse />, title: 'INTEGRATED WALLET', desc: 'UPI, saved cards, or business profiles.' },
                  { icon: <IconGoogleCalendar size={20} className="text-megacharge-green" bounce />, title: 'RESERVE SLOTS', desc: 'Pre-book charger connectors ahead of arrival.' },
                  { icon: <IconGoogleLock size={20} className="text-megacharge-green" />, title: 'OTP SMART CHARGING', desc: 'Secure authentication and plug-and-verify start.' },
                ].map((f, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.04 }} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-megacharge-green hover:shadow-glow-green transition-all duration-300">
                    <div className="p-1.5 bg-megacharge-green bg-opacity-10 text-megacharge-green border border-megacharge-green border-opacity-10 rounded-xl flex items-center justify-center">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-sm tracking-wide">{f.title}</h4>
                      <p className="text-slate-500 text-xs mt-0.5">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Vehicle compatibility marquee */}
          <div className="border-t border-slate-200 pt-16 flex flex-col gap-6 text-center">
            <span className="text-slate-500 text-[10px] font-extrabold uppercase tracking-widest font-mono">COMPATIBLE WITH ALL EV BRANDS — CCS2 / TYPE 2 STANDARD</span>
            <div className="partner-marquee-container">
              <div className="partner-marquee-track-reverse text-slate-700 font-extrabold text-sm tracking-widest font-mono gap-16 md:gap-28 items-center flex">
                {['TATA.EV', 'HYUNDAI ELECTRIC', 'KIA EV CORE', 'MG ZS ELECTRIC', 'BYD AUTO', 'MERCEDES EQ', 'AUDI E-TRON', 'BMW IX', 'TATA.EV', 'HYUNDAI ELECTRIC', 'KIA EV CORE', 'MG ZS ELECTRIC', 'BYD AUTO', 'MERCEDES EQ', 'AUDI E-TRON', 'BMW IX'].map((name, i) => (
                  <span key={i} className="mx-8 sm:mx-14 whitespace-nowrap flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-400 inline-block" />{name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         14. FAQ SECTION
      ========================================== */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-20">
          <h2 className="text-slate-900 text-4xl font-extrabold mt-2">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm mt-3">Everything you need to know about renting a MegaCharge station.</p>
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
                <span className="text-slate-700 font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                <motion.span
                  animate={{ rotate: activeFaq === idx ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-megacharge-green text-xl font-bold shrink-0"
                >
                  +
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: activeFaq === idx ? 'auto' : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-slate-100 px-7 py-5">
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==========================================
         15. FINAL CONTACT FORM CTA
      ========================================== */}
      <ContactForm />

    </div>
  );
};

export default Home;
