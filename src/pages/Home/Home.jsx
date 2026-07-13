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
import teslaCharging from '../../assets/tesla_charging.jpg';
import chargeEvBanner from '../../assets/charge_ev_banner.png';
import acChargerReal from '../../assets/ac_charger_real.png';
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
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.15 },
  transition: { duration: 0.45, ease: 'easeOut' }
};

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

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: false, amount: 0.15 },
  transition: { staggerChildren: 0.08 }
};

const cardVariant = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: false, amount: 0.15 },
  transition: { duration: 0.35, ease: 'easeOut' }
};

/* ==========================================
   TESTIMONIALS DATA
========================================== */
const TESTIMONIALS = [
  {
    name: "Rajiv Sharma",
    role: "Mall Owner, Gurugram",
    text: "MegaCharge installed 8 DC fast chargers in our parking lot within 2 weeks. Footfall to the mall increased 18%, as EV drivers stay longer and spend more.",
    rating: 5,
    avatar: "RS"
  },
  {
    name: "Priya Mehta",
    role: "Hotel GM, Pune",
    text: "Our guests specifically book our hotel because of MegaCharge stations. Zero maintenance headaches: their team handles everything remotely.",
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
                  <img src={chargeEvBanner} alt="MegaCharge station banner" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>

                {/* Bottom two smaller panels */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="h-44 rounded-2xl overflow-hidden shadow-lg bg-megacharge-dark border border-slate-800 flex flex-col items-center justify-center gap-3 relative"
                >
                  <img src={acChargerReal} alt="AC Charger" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-white text-[10px] font-bold uppercase tracking-wider font-mono">AC 7.4kW</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="h-44 rounded-2xl overflow-hidden shadow-lg bg-megacharge-dark border border-slate-800 flex flex-col items-center justify-center gap-3 relative"
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: 'easeOut' }}
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
              Trusted by Property<br />
              <span className="text-gradient-green">Owners Pan-India</span>
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
