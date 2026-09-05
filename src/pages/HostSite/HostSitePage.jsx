import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
  DollarSign,
  Clock,
  ArrowRight,
  HelpCircle,
  Car,
  ChevronDown,
  Warehouse,
  ShoppingBag,
  Hotel,
  Fuel,
  Users
} from 'lucide-react';
import './HostSitePage.css';

/* ==========================================
   ANIMATION PRESETS
   ========================================== */
const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.08 }
};

/* ==========================================
   DATA COLLECTIONS
   ========================================== */
const PROPERTY_TYPES = [
  {
    id: 'highway',
    title: 'Highway Dhabas & Rest Plazas',
    icon: Fuel,
    desc: 'Capture intercity EV traffic needing quick 30-45 min DC fast charging top-ups while dining.',
    avgRevenue: '₹45,000 - ₹85,000 / mo',
    bays: '2 - 6 Bays Recommended',
    badge: 'Highest EV Demand'
  },
  {
    id: 'hotel',
    title: 'Hotels & Resorts',
    icon: Hotel,
    desc: 'Offer premium EV guest amenities and attract affluent business & leisure travelers who spend more.',
    avgRevenue: '₹35,000 - ₹65,000 / mo',
    bays: '2 - 4 Bays Recommended',
    badge: 'Guest Dwell Time'
  },
  {
    id: 'mall',
    title: 'Shopping Malls & Retail Hubs',
    icon: ShoppingBag,
    desc: 'Drive extended customer footfall. Shoppers spend 1-2 hours inside while their vehicle recharges.',
    avgRevenue: '₹50,000 - ₹1,20,000 / mo',
    bays: '4 - 10 Bays Recommended',
    badge: 'High Footfall'
  },
  {
    id: 'commercial',
    title: 'IT Parks & Corporate Complexes',
    icon: Building2,
    desc: 'Provide day-long workplace charging for employees and corporate visitors with smart scheduling.',
    avgRevenue: '₹30,000 - ₹70,000 / mo',
    bays: '4 - 8 Bays Recommended',
    badge: 'Predictable Daily Use'
  },
  {
    id: 'residential',
    title: 'High-Rise Societies & RWAs',
    icon: Users,
    desc: 'Turn common society parking bays into a monetized charging amenity with automated resident billing.',
    avgRevenue: '₹20,000 - ₹45,000 / mo',
    bays: '2 - 6 Bays Recommended',
    badge: 'Overnight Charging'
  },
  {
    id: 'plot',
    title: 'Vacant Commercial Plots & Yards',
    icon: Warehouse,
    desc: 'Transform idle roadside land into an active commercial revenue-generating clean energy hub.',
    avgRevenue: '₹40,000 - ₹95,000 / mo',
    bays: '4 - 12 Bays Recommended',
    badge: 'Turnkey Build'
  }
];

const WHY_HOST = [
  {
    title: '100% Capital Funded by MegaCharge',
    desc: 'Zero investment from your side. We supply state-of-the-art AC & DC fast chargers, transformer setups, power panels, cabling, and safety barriers.',
    icon: DollarSign,
    color: 'emerald'
  },
  {
    title: 'Guaranteed Monthly Rent + Revenue Share',
    desc: 'Enjoy fixed guaranteed base lease rent every month, plus an additional percentage payout on every kWh power dispensed at your station.',
    icon: TrendingUp,
    color: 'orange'
  },
  {
    title: 'We Handle Discom Approvals & Power',
    desc: 'No liaisoning stress. Our engineering team secures dedicated EV electricity meter sanctions, safety certifications, and Discom clearances.',
    icon: Zap,
    color: 'emerald'
  },
  {
    title: 'Zero Maintenance & 24/7 NOC Care',
    desc: 'Our centralized NOC monitors charger health around the clock. Preventative inspections, emergency fixes, and cleaning are 100% managed by us.',
    icon: ShieldCheck,
    color: 'orange'
  },
  {
    title: 'High-Value Footfall & Dwell Time',
    desc: 'EV drivers spend an average of 35-50 minutes while charging, dramatically boosting sales at your restaurant, convenience store, or retail shops.',
    icon: Users,
    color: 'emerald'
  },
  {
    title: 'Institutional Backing & Clean Legal Terms',
    desc: 'Partner directly with Mega Nirman & Industries Ltd (MNIL - BSE 539767). Enjoy clear, transparent 3 to 5-year renewable lease agreements.',
    icon: CheckCircle2,
    color: 'orange'
  }
];

const ONBOARDING_STEPS = [
  {
    step: '01',
    title: 'Submit Site Form',
    time: '2 Minutes',
    desc: 'Share basic details about your property location, parking area, and accessible bays.'
  },
  {
    step: '02',
    title: 'Free Technical Survey',
    time: 'Within 48 Hours',
    desc: 'Our grid engineers visit your site to inspect transformer load, cable pathway, and bay accessibility.'
  },
  {
    step: '03',
    title: 'Sign Institutional Lease',
    time: 'Day 3 - 5',
    desc: 'Formalize a transparent 3-5 year lease with guaranteed monthly rent and revenue-share clauses.'
  },
  {
    step: '04',
    title: 'Civil & Charger Setup',
    time: 'Day 7 - 18',
    desc: 'MegaCharge pours concrete plinths, pulls HT/LT cabling, installs chargers, and sets up safety bays.'
  },
  {
    step: '05',
    title: 'Commissioning & Payouts',
    time: 'Day 21 Onwards',
    desc: 'Station goes live on the MegaCharge app and Google Maps. Payouts credited directly to your bank every month.'
  }
];

const HOST_FAQS = [
  {
    q: 'Do I have to invest any money to host a MegaCharge station?',
    a: 'Absolutely zero. Under our Host-a-Site model, MegaCharge covers 100% of the capital expenditure, including the chargers, cabling, transformer upgrades, civil works, signage, and installation.'
  },
  {
    q: 'Who pays the electricity bills consumed by the chargers?',
    a: 'MegaCharge pays the electricity charges directly. We coordinate with the local power utility (Discom) to install an independent EV tariff meter or sub-meter. Your personal or commercial property electricity bills will never be impacted.'
  },
  {
    q: 'How much space do I need to qualify as a site host?',
    a: 'You only need a minimum of 2 dedicated car parking bays (approx. 250 - 300 sq.ft.). For larger highway hubs or commercial complexes, we can build 4 to 8 bays with ultra-fast 60 kW to 240 kW DC stations.'
  },
  {
    q: 'What is the lock-in period and agreement duration?',
    a: 'Our standard host lease agreement is for 3 to 5 years, with automatic mutual renewal options. The agreement includes clear lease escalation clauses and guarantees periodic hardware upgrades as battery technology advances.'
  },
  {
    q: 'What happens if a charger breaks down or needs repairs?',
    a: 'Our 24x7 Network Operations Center (NOC) detects errors within seconds via OCPP cloud telemetry. Our local field maintenance engineers are dispatched immediately to resolve any issue at zero cost to you.'
  },
  {
    q: 'How and when do I receive my monthly payouts?',
    a: 'Your guaranteed base lease rent and revenue share earnings are consolidated and transferred directly via NEFT/RTGS to your registered bank account by the 5th working day of every calendar month, along with a transparent digital statement.'
  }
];

/* ==========================================
   MAIN COMPONENT: HOST A SITE
   ========================================== */
const HostSitePage = () => {
  // Calculator state
  const [propertyType, setPropertyType] = useState('highway');
  const [baysCount, setBaysCount] = useState(4);
  const [footfallLevel, setFootfallLevel] = useState('high'); // 'moderate', 'high', 'busy'
  const [activeFaq, setActiveFaq] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyName: '',
    propertyCity: '',
    propertyType: 'highway',
    availableBays: '4',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Calculated estimates
  const calculatedYield = useMemo(() => {
    let basePerBay = 8000;
    if (propertyType === 'mall') basePerBay = 12000;
    if (propertyType === 'highway') basePerBay = 11000;
    if (propertyType === 'hotel') basePerBay = 9000;
    if (propertyType === 'commercial') basePerBay = 8500;
    if (propertyType === 'residential') basePerBay = 6000;

    let multiplier = 1.0;
    if (footfallLevel === 'moderate') multiplier = 0.85;
    if (footfallLevel === 'high') multiplier = 1.25;
    if (footfallLevel === 'busy') multiplier = 1.65;

    const baseRent = Math.round(basePerBay * baysCount);
    const revenueShare = Math.round(basePerBay * 0.75 * baysCount * multiplier);
    const monthlyTotal = baseRent + revenueShare;
    const annualTotal = monthlyTotal * 12;
    const co2Offset = Math.round(baysCount * 3200 * multiplier);

    return { baseRent, revenueShare, monthlyTotal, annualTotal, co2Offset };
  }, [propertyType, baysCount, footfallLevel]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
    }
  };

  const scrollToFormWithSelection = (typeId) => {
    setFormData((prev) => ({ ...prev, propertyType: typeId }));
    const el = document.getElementById('host-application-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="host-site-page bg-slate-50 min-h-screen overflow-hidden">
      
      {/* ==========================================
         HERO SECTION: HOST A SITE
         ========================================== */}
      <section className="w-full bg-[#18110e] pt-40 sm:pt-48 pb-24 px-6 text-center text-white border-b border-stone-800 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c9d5c]/20 via-[#f0801f]/10 to-transparent opacity-80 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            MegaCharge Grid Partner Program · Zero Capital Expenditure
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]"
          >
            Turn Your Empty Parking into an <br />
            <span className="bg-gradient-to-r from-[#1c9d5c] via-[#4ade80] to-[#f0801f] bg-clip-text text-transparent">
              Earning EV Charging Hub
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mt-6"
          >
            Have parking bays or commercial roadside land? Partner with MegaCharge (MNIL). We fund 100% of the equipment, civil work, power setup, and 24/7 maintenance while you earn guaranteed monthly rent and recurring power share.
          </motion.p>

          {/* Quick Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
          >
            <a
              href="#host-application-form"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm bg-gradient-to-r from-[#1c9d5c] to-[#15803d] text-white shadow-lg shadow-emerald-900/40 hover:scale-105 transition-all duration-300"
            >
              Apply to Host a Site <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#revenue-calculator"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-stone-800/80 hover:bg-stone-700 text-white border border-stone-700 transition-all duration-300"
            >
              Calculate My Site Earnings &darr;
            </a>
          </motion.div>

          {/* 4 Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 max-w-4xl mx-auto text-left"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm">
              <span className="text-emerald-400 text-2xl font-black font-mono">₹0</span>
              <p className="text-stone-200 text-xs font-bold mt-1">Host Investment</p>
              <p className="text-stone-400 text-[11px] mt-0.5 leading-snug">MegaCharge funds 100% of capital</p>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm">
              <span className="text-[#f0801f] text-2xl font-black font-mono">₹30K - ₹90K+</span>
              <p className="text-stone-200 text-xs font-bold mt-1">Monthly Host Income</p>
              <p className="text-stone-400 text-[11px] mt-0.5 leading-snug">Guaranteed lease + session share</p>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm">
              <span className="text-emerald-400 text-2xl font-black font-mono">15 - 21 Days</span>
              <p className="text-stone-200 text-xs font-bold mt-1">Fast Commissioning</p>
              <p className="text-stone-400 text-[11px] mt-0.5 leading-snug">From survey to live charging station</p>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm">
              <span className="text-[#f0801f] text-2xl font-black font-mono">24 / 7 NOC</span>
              <p className="text-stone-200 text-xs font-bold mt-1">Zero Maintenance Hassle</p>
              <p className="text-stone-400 text-[11px] mt-0.5 leading-snug">Our engineers handle repairs</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         IDEAL PROPERTY TYPES GRID
         ========================================== */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#1c9d5c] text-xs font-extrabold uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
            Eligible Locations
          </span>
          <h2 className="text-slate-900 text-3xl sm:text-4xl font-extrabold mt-4 leading-tight">
            Which Properties Can Host a MegaCharge Station?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
            If you have 2 or more parking slots with convenient road access, your property is primed to generate recurring green yield.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PROPERTY_TYPES.map((prop) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={prop.id}
                variants={fadeInUp}
                className="property-type-card bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1c9d5c] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-mono">
                      {prop.badge}
                    </span>
                  </div>
                  <h3 className="text-slate-900 text-xl font-extrabold mb-2">{prop.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {prop.desc}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-slate-500 font-medium">Estimated Monthly Payout:</span>
                    <span className="text-slate-900 font-bold font-mono text-sm">{prop.avgRevenue}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs mb-5">
                    <span className="text-slate-500 font-medium">Recommended Setup:</span>
                    <span className="text-slate-700 font-medium">{prop.bays}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToFormWithSelection(prop.id)}
                    className="w-full py-3 rounded-xl text-xs font-bold text-[#1c9d5c] bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    Apply for this Property <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ==========================================
         INTERACTIVE SITE REVENUE CALCULATOR
         ========================================== */}
      <section id="revenue-calculator" className="bg-white border-y border-slate-200 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#f0801f] text-xs font-extrabold uppercase tracking-widest bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-full">
              Estimated Returns
            </span>
            <h2 className="text-slate-900 text-3xl sm:text-5xl font-extrabold mt-4 leading-tight">
              Calculate Your Site's Monthly Payout
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
              Adjust your property type, parking slots, and expected vehicle flow to preview your estimated monthly rental and profit share.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Interactive Inputs */}
            <motion.div {...fadeInUp} className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
              {/* 1. Property Type Selector */}
              <div className="mb-8">
                <label className="text-slate-900 text-sm font-extrabold block mb-3">
                  1. Select Property Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'highway', label: 'Highway Plaza' },
                    { id: 'mall', label: 'Shopping Mall' },
                    { id: 'hotel', label: 'Hotel & Resort' },
                    { id: 'commercial', label: 'Tech Park' },
                    { id: 'residential', label: 'RWA Society' },
                    { id: 'plot', label: 'Vacant Plot' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setPropertyType(t.id)}
                      className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                        propertyType === t.id
                          ? 'bg-[#1c9d5c] text-white border-[#1c9d5c] shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Number of Bays Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-slate-900 text-sm font-extrabold">
                    2. Parking Slots Allocated
                  </label>
                  <span className="text-emerald-700 text-base font-black font-mono bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                    {baysCount} EV Bays
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="2"
                  value={baysCount}
                  onChange={(e) => setBaysCount(Number(e.target.value))}
                  className="w-full slider-custom mt-2"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                  <span>2 Bays (Min)</span>
                  <span>6 Bays (Standard)</span>
                  <span>12 Bays (Hub)</span>
                </div>
              </div>

              {/* 3. Traffic / Footfall Level */}
              <div>
                <label className="text-slate-900 text-sm font-extrabold block mb-3">
                  3. Expected Daily Vehicle Traffic
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'moderate', title: 'Moderate', desc: '10 - 20 Cars/day' },
                    { id: 'high', title: 'High Density', desc: '20 - 45 Cars/day' },
                    { id: 'busy', title: 'Corridor Prime', desc: '45+ Cars/day' }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setFootfallLevel(lvl.id)}
                      className={`p-3 rounded-xl text-left transition-all border ${
                        footfallLevel === lvl.id
                          ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className={`block text-xs font-extrabold ${footfallLevel === lvl.id ? 'text-emerald-800' : 'text-slate-900'}`}>
                        {lvl.title}
                      </span>
                      <span className="block text-[10px] text-slate-500 mt-0.5 font-mono">
                        {lvl.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Dynamic Output Card */}
            <motion.div {...fadeInUp} className="lg:col-span-5">
              <div className="bg-[#18110e] text-white p-8 sm:p-10 rounded-3xl border border-stone-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest font-mono">
                  Monthly Projected Income
                </span>
                <div className="mt-3 mb-6">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono">
                    ₹{calculatedYield.monthlyTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-stone-400 text-sm ml-2 font-medium">/ month</span>
                </div>

                <div className="space-y-3.5 border-t border-stone-800 pt-5 text-xs">
                  <div className="flex justify-between items-center text-stone-300">
                    <span>Guaranteed Fixed Base Rent:</span>
                    <span className="text-white font-mono font-bold">₹{calculatedYield.baseRent.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-300">
                    <span>Session Revenue Profit Share:</span>
                    <span className="text-emerald-400 font-mono font-bold">+ ₹{calculatedYield.revenueShare.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-300">
                    <span>Annual Projected Host Payout:</span>
                    <span className="text-[#f0801f] font-mono font-bold text-sm">₹{calculatedYield.annualTotal.toLocaleString('en-IN')} / yr</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-300">
                    <span>Green Clean Energy Offset:</span>
                    <span className="text-stone-300 font-mono font-medium">~{calculatedYield.co2Offset.toLocaleString('en-IN')} kg CO₂</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-800">
                  <a
                    href="#host-application-form"
                    className="w-full py-4 rounded-full font-bold text-sm bg-gradient-to-r from-[#1c9d5c] to-[#15803d] text-white flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                  >
                    Lock In This Site Proposal <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="text-stone-400 text-[11px] text-center mt-3">
                    Payouts credited monthly. Backed by MNIL institutional agreement.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==========================================
         WHY PARTNER WITH MEGACHARGE
         ========================================== */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#1c9d5c] text-xs font-extrabold uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
            The Host Advantage
          </span>
          <h2 className="text-slate-900 text-3xl sm:text-4xl font-extrabold mt-4 leading-tight">
            Why Property Owners Trust MegaCharge
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
            A partnership engineered for peace of mind. We take care of the heavy lifting so you enjoy consistent passive returns.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {WHY_HOST.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1c9d5c] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-slate-900 text-xl font-extrabold mb-3">{item.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ==========================================
         4-STEP ONBOARDING ROADMAP
         ========================================== */}
      <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emerald-400 text-xs font-extrabold uppercase tracking-widest bg-emerald-950/80 border border-emerald-800 px-4 py-1.5 rounded-full">
              Seamless Deployment
            </span>
            <h2 className="text-white text-3xl sm:text-5xl font-extrabold mt-4 leading-tight">
              From Empty Bay to First Payout in 21 Days
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-3">
              Our seasoned infrastructure division handles survey, civil, electrical, and network approvals end-to-end.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {ONBOARDING_STEPS.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold font-mono text-[#1c9d5c]">{s.step}</span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-700/60 px-2.5 py-1 rounded-full">
                      {s.time}
                    </span>
                  </div>
                  <h4 className="text-white text-base font-extrabold mb-2">{s.title}</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
         HOST FREQUENTLY ASKED QUESTIONS
         ========================================== */}
      <section className="max-w-4xl mx-auto py-24 px-6">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-[#1c9d5c] text-xs font-extrabold uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
            Clarifications
          </span>
          <h2 className="text-slate-900 text-3xl sm:text-4xl font-extrabold mt-4">
            Frequently Asked Questions by Site Hosts
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {HOST_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-slate-900 font-extrabold text-sm sm:text-base pr-4">
                  {faq.q}
                </span>
                <span className="text-[#1c9d5c] text-2xl font-bold shrink-0">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>

              {activeFaq === idx && (
                <div className="p-6 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
         APPLICATION FORM (SUBMIT YOUR PROPERTY)
         ========================================== */}
      <section id="host-application-form" className="max-w-5xl mx-auto pb-24 px-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-emerald-700 text-xs font-extrabold uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
              Get Started Today
            </span>
            <h2 className="text-slate-900 text-3xl font-extrabold mt-4">
              Submit Your Property for Evaluation
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
              Our engineering team will review your location and contact you within 24 to 48 hours for a free site feasibility survey.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#1c9d5c] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-slate-900 text-xl font-extrabold mb-2">Application Received!</h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-6">
                Thank you, <strong className="text-slate-800">{formData.name}</strong>. Our site surveyor for <strong className="text-slate-800">{formData.propertyCity || 'your city'}</strong> will call you shortly at <strong className="text-slate-800">{formData.phone}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#1c9d5c] text-white hover:bg-emerald-700 transition-colors"
              >
                Submit Another Property
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-slate-900 text-xs font-bold block mb-2">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="text-slate-900 text-xs font-bold block mb-2">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-slate-900 text-xs font-bold block mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. contact@myproperty.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="text-slate-900 text-xs font-bold block mb-2">Property Name & Landmark</label>
                  <input
                    type="text"
                    placeholder="e.g. Grand Plaza, NH-48 Km 62"
                    value={formData.propertyName}
                    onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-slate-900 text-xs font-bold block mb-2">City & State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurugram, Haryana"
                    value={formData.propertyCity}
                    onChange={(e) => setFormData({ ...formData, propertyCity: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="text-slate-900 text-xs font-bold block mb-2">Property Category</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 bg-slate-50/50"
                  >
                    <option value="highway">Highway Plaza / Dhaba</option>
                    <option value="hotel">Hotel / Resort</option>
                    <option value="mall">Shopping Mall / Retail</option>
                    <option value="commercial">Commercial / IT Park</option>
                    <option value="residential">Residential Society / RWA</option>
                    <option value="plot">Vacant Land Plot</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-900 text-xs font-bold block mb-2">Available Parking Bays</label>
                  <select
                    value={formData.availableBays}
                    onChange={(e) => setFormData({ ...formData, availableBays: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 bg-slate-50/50"
                  >
                    <option value="2">2 Bays</option>
                    <option value="4">4 Bays (Recommended)</option>
                    <option value="6">6 Bays</option>
                    <option value="8+">8+ Bays (Mega Hub)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-900 text-xs font-bold block mb-2">Additional Details (Optional)</label>
                <textarea
                  rows="3"
                  placeholder="Tell us about existing transformer connection, road frontage, or specific parking layout..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 bg-slate-50/50 resize-none"
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-12 py-4 rounded-full font-bold text-sm bg-gradient-to-r from-[#1c9d5c] to-[#15803d] text-white shadow-lg shadow-emerald-900/30 hover:scale-105 transition-all duration-300"
                >
                  Submit Site for Free Evaluation &rarr;
                </button>
                <p className="text-slate-400 text-xs mt-3">
                  Zero commitment. We will survey your location and present a tailored revenue plan.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};

export default HostSitePage;
