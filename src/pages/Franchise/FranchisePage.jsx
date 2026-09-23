import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Calculator, Store, Send, ShieldCheck, Wrench, Activity, TrendingUp, Sparkles } from 'lucide-react';
import './FranchisePage.css';

/* Assets */
import acCharger from '../../assets/ac_charger.png';
import acChargerReal from '../../assets/ac_charger_real.png';
import dcCharger from '../../assets/dc_charger.png';
import zenergize60 from '../../assets/zenergize_60.jpg';

/* ==========================================
   CONFIG & PRICING
   ========================================== */
const CONFIG = {
  whatsapp: '919289555090',
  mode: 'fico',
  focoFeePct: 15,
  ficoInvestorPct: 50,
  ficoTerm: '7 years',
  goLive: '8–12 weeks',
  launch: '3–4 weeks',
  dcReferralPct: 2,
  term: '5 to 10 years',
  defaults: { size: 120, util: 20, tariff: 20, power: 9, host: 10 },
  downsideUtil: 8,
  sizes: [
    {
      kw: 60,
      bays: '2 cars at a time',
      label: '₹25–35 lakh',
      capex: 3000000,
      om: 8000,
      fit: 'City sites, malls, restaurants',
      popular: false
    },
    {
      kw: 120,
      bays: '2–4 cars at a time',
      label: '₹35 lakh',
      capex: 3500000,
      om: 12000,
      fit: 'Fuel stations, busy city roads',
      popular: true
    },
    {
      kw: 180,
      bays: '2–4 cars at a time',
      label: '₹40 lakh',
      capex: 4000000,
      om: 15000,
      fit: 'Highways, logistics hubs',
      popular: false
    },
    {
      kw: 240,
      bays: '4–6 cars at a time',
      label: '₹60–70 lakh',
      capex: 6500000,
      om: 18000,
      fit: 'Highway hubs, fleet depots',
      popular: false
    }
  ]
};

/* Formatters */
const inr = (n) => {
  const sign = n < 0 ? '−' : '';
  const val = Math.abs(n);
  if (val >= 1e7) return sign + '₹' + (val / 1e7).toFixed(2) + ' Cr';
  if (val >= 1e5) return sign + '₹' + (val / 1e5).toFixed(2) + ' L';
  return sign + '₹' + Math.round(val).toLocaleString('en-IN');
};

const num = (n) => Math.round(n).toLocaleString('en-IN');

const payTxt = (p) => (isFinite(p) && p > 0 ? p.toFixed(1) + ' years' : 'Not reached');

const waUrl = (phone, msg) =>
  `https://wa.me/${phone}${msg ? '?text=' + encodeURIComponent(msg) : ''}`;

/* ==========================================
   DEALER PRODUCTS DATASET
   ========================================== */
const DEALER_PRODUCTS = [
  {
    id: 'ez-charge',
    name: 'EZ Charge 3.3 kW AC',
    forVehicle: 'For electric scooters and 3-wheelers',
    image: acCharger,
    bullets: [
      '3.3 kW, single phase, 220–240 V input',
      'Universal socket, CE certified',
      'Pay by RFID card or QR code',
      'Bluetooth, Wi-Fi and GPRS connectivity',
      'IP65 weatherproof, surge and short-circuit protection'
    ],
    buyer: 'Housing societies, offices, parking operators, scooter dealers'
  },
  {
    id: 'crystal-7kw',
    name: 'Crystal 7 kW AC',
    forVehicle: 'For electric cars',
    image: acChargerReal,
    bullets: [
      '7 kW AC with Type 2 connector',
      'Display screen and emergency stop',
      'OCPP 1.6J for network and app billing',
      'Wi-Fi, Ethernet and 4G',
      'RFID, QR code and card access, IP55'
    ],
    buyer: 'Homes, hotels, offices, car dealers, apartment complexes'
  },
  {
    id: 'portable-car',
    name: 'Portable car charger 3.3 / 7 kW',
    forVehicle: 'For car owners on the move',
    image: dcCharger,
    bullets: [
      '16 A or 32 A variants, 230 V AC output',
      'Plug and play with display and key press',
      'Over-voltage, over-current and temperature protection',
      'Works from −25 °C to +55 °C, IP65'
    ],
    buyer: 'New EV car buyers, fleet drivers, car accessory shops'
  },
  {
    id: 'erickshaw',
    name: 'E-rickshaw charger',
    forVehicle: 'For e-rickshaws and loaders',
    image: zenergize60,
    bullets: [
      'Lead-acid: 48 V at 18 A or 25 A',
      'Lithium-ion: 48 V 50 A, 60 V 6 A / 10 A, 72 V 10 A',
      'Wide input range, 140–300 V AC',
      'Up to 90% efficiency, automatic charging profile'
    ],
    buyer: 'E-rickshaw owners and dealers, fleet operators, battery shops'
  }
];

const FranchisePage = () => {
  /* Calculator state */
  const [calcState, setCalcState] = useState({ ...CONFIG.defaults });

  /* Form state */
  const [formPath, setFormPath] = useState('invest');
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    city: '',
    state: '',
    budget: '₹30–50 lakh',
    land: 'No',
    biz: 'Electrical contractor',
    tier: 'City dealer',
    dbudget: '₹5–10 lakh'
  });
  const [formErr, setFormErr] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeSection, setActiveSection] = useState('invest');

  /* Scroll position tracking for active jump-nav button */
  useEffect(() => {
    const sections = ['invest', 'calculator', 'sizes', 'demand', 'sites', 'dealer', 'apply'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          if (sections[i] === 'sizes' || sections[i] === 'demand' || sections[i] === 'sites') {
            setActiveSection('invest');
          } else {
            setActiveSection(sections[i]);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Compute live returns */
  const results = useMemo(() => {
    const size = CONFIG.sizes.find((x) => x.kw === calcState.size) || CONFIG.sizes[1];
    const units = size.kw * 24 * 30.4 * (calcState.util / 100);
    const rev = units * calcState.tariff;
    const power = units * calcState.power;
    const host = (rev * calcState.host) / 100;
    const income = rev - power - host - size.om;
    const feePct = 100 - CONFIG.ficoInvestorPct;
    const fee = income > 0 ? (income * feePct) / 100 : 0;
    const net = income > 0 ? (income * CONFIG.ficoInvestorPct) / 100 : income;
    const annual = net * 12;
    const payback = annual > 0 ? size.capex / annual : Infinity;
    const roi = (annual / size.capex) * 100;

    /* Downside scenario check at 8% */
    const dUnits = size.kw * 24 * 30.4 * (Math.min(CONFIG.downsideUtil, calcState.util) / 100);
    const dRev = dUnits * calcState.tariff;
    const dPower = dUnits * calcState.power;
    const dHost = (dRev * calcState.host) / 100;
    const dIncome = dRev - dPower - dHost - size.om;
    const dNet = dIncome > 0 ? (dIncome * CONFIG.ficoInvestorPct) / 100 : dIncome;
    const dAnnual = dNet * 12;
    const dPayback = dAnnual > 0 ? size.capex / dAnnual : Infinity;

    return {
      size,
      units,
      rev,
      power,
      host,
      fee,
      feePct,
      om: size.om,
      net,
      annual,
      payback,
      roi,
      downsideNet: dNet,
      downsidePayback: dPayback
    };
  }, [calcState]);

  /* Handle form submit */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = formValues.name.trim();
    const phone = formValues.phone.replace(/\D/g, '');
    const city = formValues.city.trim();

    if (!name) {
      setFormErr('Please enter your full name so our partnerships team knows who to call.');
      return;
    }
    if (phone.length < 10) {
      setFormErr('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!city) {
      setFormErr('Please enter your city or district to verify territory availability.');
      return;
    }

    setFormErr('');

    let pathLabel = 'Invest in a charging station';
    if (formPath === 'dealer') pathLabel = 'Become a dealer';
    if (formPath === 'both') pathLabel = 'Explore both (Investor + Dealer)';

    let msg = `New MegaCharge partner enquiry\nInterested in: ${pathLabel}\nName: ${name}\nMobile: ${phone}\nCity: ${city}\nState: ${formValues.state.trim() || 'Not given'}`;

    if (formPath !== 'dealer') {
      msg += `\nStation budget: ${formValues.budget}\nHas land: ${formValues.land}`;
    }
    if (formPath !== 'invest') {
      msg += `\nBusiness: ${formValues.biz}\nDealer level: ${formValues.tier}\nDealer investment: ${formValues.dbudget}`;
    }

    window.open(waUrl(CONFIG.whatsapp, msg), '_blank', 'noopener,noreferrer');
  };

  /* Quick scroll & path select helper */
  const selectPathAndScroll = (path, elementId) => {
    setFormPath(path);
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const FAQS = [
    {
      q: "What is the FICO model and how does it protect my capital?",
      a: "FICO stands for Franchise Invested, Company Operated. You fund a specific high-traffic fast-charging station, while MegaCharge takes 100% operational responsibility: site acquisition, grid sanction, hardware installation, round-the-clock maintenance, customer billing, and fleet partnerships. You receive your share of station operating income every month."
    },
    {
      q: "How are monthly payouts calculated and disbursed?",
      a: "Every charging session is logged via our cloud OCPP platform. At month-end, revenue from units sold minus direct electricity tariffs, host site rent, and standard maintenance is computed. 50% of the net operating income is directly credited to your registered bank account alongside an itemised audit statement."
    },
    {
      q: "What warranty and hardware support is provided for authorized dealers?",
      a: "All MegaCharge AC and DC units come with comprehensive manufacturer warranties, CE certification, and round-the-clock technical helpline support. Dealers receive localized installation training, marketing collateral, demo display units, and genuine spare parts direct from our manufacturing facility."
    },
    {
      q: "Can I bring my own commercial land or petrol pump site for a station?",
      a: "Yes! If you already own or lease high-frontage commercial land on a highway, city artery, or fuel station, you can set the site landowner rent to 0% in your investment structure, maximising your monthly net income and shortening your payback period."
    }
  ];

  return (
    <div className="franchise-page-container">
      {/* ==========================================
          1. HERO SECTION (Dark Rich Aesthetic)
         ========================================== */}
      {/* ==========================================
          1. HERO SECTION (Dark Rich Aesthetic)
         ========================================== */}
      <header className="relative bg-[#201411] text-white pt-36 sm:pt-44 pb-20 px-6 overflow-hidden hero-gradient-overlay border-b border-[#3A2C28]">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#E97A1C]/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#1E9B63]/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div className="max-w-[1160px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Hero Description */}
            <div className="lg:col-span-7">
              {/* Partner Network Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E97A1C]/25 via-[#E97A1C]/15 to-transparent border border-[#E97A1C]/40 text-[#FFA448] text-xs font-mono font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(233,122,28,0.15)]">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E9B63] opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E9B63]"></span>
                </span>
                <Zap className="w-3.5 h-3.5 text-[#E97A1C] fill-[#E97A1C]/40" />
                <span>MegaCharge Partner Network</span>
              </div>

              {/* Main Headline with High-Impact MegaCharge Branding */}
              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black font-montserrat tracking-tight leading-[1.08] uppercase">
                <span className="text-white tracking-tight drop-shadow-md block">
                  Earn with
                </span>
                <span className="relative inline-flex items-center flex-wrap gap-x-3 gap-y-2 mt-1">
                  <span className="bg-gradient-to-r from-[#FF7A00] via-[#FFA844] to-[#FF6B00] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(233,122,28,0.5)]">
                    MEGACHARGE
                  </span>
                  <span className="text-[#FF7A00]">.</span>
                  
                  {/* High-tech EV Power Badge */}
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#E97A1C] to-[#A9480E] text-white text-xs sm:text-sm font-bold tracking-wider normal-case shadow-[0_4px_20px_rgba(233,122,28,0.45)] border border-[#FFA448]/50 -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <Zap className="w-4 h-4 fill-white text-white animate-pulse" />
                    <span>EV Grid Franchise</span>
                  </span>
                </span>
              </h1>

              {/* Quick Feature Pills */}
              <div className="flex flex-wrap items-center gap-2.5 mt-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-xs font-semibold text-[#F3E8E2] backdrop-blur-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1E9B63] shadow-[0_0_8px_#1E9B63]" />
                  <span>50% Monthly Payout</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-xs font-semibold text-[#F3E8E2] backdrop-blur-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#E97A1C] shadow-[0_0_8px_#E97A1C]" />
                  <span>Turnkey DC Stations</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-xs font-semibold text-[#F3E8E2] backdrop-blur-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
                  <span>BSE: 539767 Listed</span>
                </div>
              </div>

              <p className="text-[#E2D4CB] text-base sm:text-lg leading-relaxed mt-6 max-w-xl font-normal">
                Two ways to partner with us. Invest in a fast-charging station that we build and run, and earn a share of its income every month. Or become an authorised dealer and build your own business selling MegaCharge chargers.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="#apply"
                  onClick={() => selectPathAndScroll('invest', 'apply')}
                  className="inline-flex items-center gap-2.5 font-bold text-sm sm:text-base px-8 py-4 rounded-full bg-gradient-to-r from-[#E97A1C] to-[#A9480E] text-white shadow-xl shadow-[#A9480E]/40 hover:brightness-110 hover:shadow-[#E97A1C]/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Apply now</span>
                  <span>&rarr;</span>
                </a>
                <a
                  href={waUrl(CONFIG.whatsapp, "Hi, I'm interested in partnering with MegaCharge.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-bold text-sm sm:text-base px-7 py-4 rounded-full bg-white/[0.07] text-white border border-white/25 hover:border-white hover:bg-white/[0.12] transition-all backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 fill-current text-[#25D366]" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                  <span>Talk to us on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Action Paths */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <a
                href="#invest"
                onClick={(e) => {
                  e.preventDefault();
                  selectPathAndScroll('invest', 'invest');
                }}
                className="screen-card block p-6 rounded-2xl transition-all duration-300 group hover:translate-x-1"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white text-xl font-extrabold group-hover:text-[#E97A1C] transition-colors">
                    Invest in a station
                  </h3>
                  <span className="text-xs bg-[#E97A1C] text-white px-2.5 py-1 rounded-full font-bold">
                    FICO
                  </span>
                </div>
                <p className="text-[#D9C9C0] text-sm leading-relaxed">
                  Fund a DC fast-charging station. We own and run it. You receive <strong>50%</strong> of its income after costs, every month.
                </p>
                <span className="inline-flex items-center gap-1.5 mt-3 text-[#E97A1C] font-semibold text-sm group-hover:gap-2.5 transition-all">
                  See station returns &rarr;
                </span>
              </a>

              <a
                href="#dealer"
                onClick={(e) => {
                  e.preventDefault();
                  selectPathAndScroll('dealer', 'dealer');
                }}
                className="screen-card block p-6 rounded-2xl transition-all duration-300 group hover:translate-x-1"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white text-xl font-extrabold group-hover:text-[#E97A1C] transition-colors">
                    Become a dealer
                  </h3>
                  <span className="text-xs bg-[#1E9B63] text-white px-2.5 py-1 rounded-full font-bold">
                    TERRITORY
                  </span>
                </div>
                <p className="text-[#D9C9C0] text-sm leading-relaxed">
                  Sell and install MegaCharge chargers for scooters, e-rickshaws and cars in your territory, and earn on every unit.
                </p>
                <span className="inline-flex items-center gap-1.5 mt-3 text-[#E97A1C] font-semibold text-sm group-hover:gap-2.5 transition-all">
                  See the dealership &rarr;
                </span>
              </a>
            </div>
          </div>

          {/* 4 Trust Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-10 border-t border-white/15">
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#1E9B63]/40 transition-colors">
              <strong className="block text-white text-sm font-bold mb-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1E9B63] flex-shrink-0" />
                <span>Listed parent company</span>
              </strong>
              <span className="text-xs text-[#D9C9C0]">Mega Nirman &amp; Industries Ltd, BSE: 539767</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#E97A1C]/40 transition-colors">
              <strong className="block text-white text-sm font-bold mb-1 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#E97A1C] flex-shrink-0" />
                <span>In-house installation</span>
              </strong>
              <span className="text-xs text-[#D9C9C0]">Our own engineering crew builds &amp; commissions</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#38BDF8]/40 transition-colors">
              <strong className="block text-white text-sm font-bold mb-1 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <span>24×7 NOC monitoring</span>
              </strong>
              <span className="text-xs text-[#D9C9C0]">Telemetry spots &amp; resolves faults proactively</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#1E9B63]/40 transition-colors">
              <strong className="block text-white text-sm font-bold mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#1E9B63] flex-shrink-0" />
                <span>Full transparency</span>
              </strong>
              <span className="text-xs text-[#D9C9C0]">Itemised monthly statements &amp; live partner dashboard</span>
            </div>
          </div>
        </div>
      </header>

      {/* ==========================================
          2. STICKY SUB-NAV / JUMP BAR
         ========================================== */}
      <div className="jump-nav-sticky">
        <div className="max-w-[1160px] mx-auto px-6">
          <nav className="jump-nav-container" aria-label="Quick Navigation">
            <a
              href="#invest"
              onClick={() => {
                setFormPath('invest');
                setActiveSection('invest');
              }}
              className={`jump-nav-btn ${activeSection === 'invest' ? 'active' : ''}`}
            >
              <Zap className={`w-3.5 h-3.5 ${activeSection === 'invest' ? 'text-[#E97A1C]' : 'text-[#76655D]'}`} />
              <span>Invest in a station</span>
              <span className="jump-nav-badge">FICO</span>
            </a>

            <a
              href="#calculator"
              onClick={() => setActiveSection('calculator')}
              className={`jump-nav-btn ${activeSection === 'calculator' ? 'active' : ''}`}
            >
              <Calculator className={`w-3.5 h-3.5 ${activeSection === 'calculator' ? 'text-[#E97A1C]' : 'text-[#76655D]'}`} />
              <span>Station returns calculator</span>
              <span className="jump-nav-badge">Live ROI</span>
            </a>

            <a
              href="#dealer"
              onClick={() => {
                setFormPath('dealer');
                setActiveSection('dealer');
              }}
              className={`jump-nav-btn ${activeSection === 'dealer' ? 'active' : ''}`}
            >
              <Store className={`w-3.5 h-3.5 ${activeSection === 'dealer' ? 'text-[#E97A1C]' : 'text-[#76655D]'}`} />
              <span>Become a dealer</span>
              <span className="jump-nav-badge">Products</span>
            </a>

            <a
              href="#apply"
              onClick={() => setActiveSection('apply')}
              className="jump-nav-cta"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Apply now</span>
            </a>
          </nav>
        </div>
      </div>

      <main>
        {/* ==========================================
            3. INVEST IN A STATION (FICO ROLES)
           ========================================== */}
        <section id="invest" className="py-20 px-6">
          <div className="max-w-[1160px] mx-auto border-t-4 border-[#E97A1C] pt-8">
            <h2 className="text-[#2A1B17] text-3xl sm:text-4xl lg:text-5xl font-extrabold font-montserrat tracking-tight">
              Invest in a station
            </h2>
            <p className="text-[#6F5F57] text-base sm:text-lg max-w-3xl mt-4 leading-relaxed">
              The FICO model: franchise invested, company operated. You fund a specific station, MegaCharge owns and runs it, and you earn a monthly share of its income.
            </p>

            <div className="mt-14 bg-white border border-[#EADFD5] rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12">
              {/* What you do */}
              <div className="md:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-[#2A1B17] mb-6">What you do</h3>
                  <ul className="space-y-4">
                    <li className="check-bullet-green text-[#2A1B17] text-sm sm:text-base font-medium">
                      Invest in one identified station
                    </li>
                    <li className="check-bullet-green text-[#2A1B17] text-sm sm:text-base font-medium">
                      Track its performance on your partner dashboard
                    </li>
                    <li className="check-bullet-green text-[#2A1B17] text-sm sm:text-base font-medium">
                      Receive your share of its income after costs, monthly
                    </li>
                    <li className="check-bullet-green text-[#2A1B17] text-sm sm:text-base font-medium">
                      Get a statement showing every session, cost and payout
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-5 border-t border-dashed border-[#EADFD5] text-[#6F5F57] text-sm">
                  Equipment to own, insure or maintain: <strong>None</strong>.
                </div>
              </div>

              {/* What MegaCharge does */}
              <div className="md:col-span-7 bg-[#FFF6EE] border-t md:border-t-0 md:border-l border-[#EADFD5] p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-extrabold text-[#2A1B17]">What MegaCharge does</h3>
                    <span className="text-xs font-bold text-[#A9480E] bg-[#FDEBDC] px-3 py-1 rounded-full uppercase">
                      Company Operated
                    </span>
                  </div>
                  <ul className="space-y-4">
                    <li className="check-bullet-green text-[#2A1B17] text-sm sm:text-base font-medium">
                      Owns the charger and all station equipment
                    </li>
                    <li className="check-bullet-green text-[#2A1B17] text-sm sm:text-base font-medium">
                      Finds the site and pays the landowner
                    </li>
                    <li className="check-bullet-green text-[#2A1B17] text-sm sm:text-base font-medium">
                      Gets Discom approval and the power connection
                    </li>
                    <li className="check-bullet-green text-[#2A1B17] text-sm sm:text-base font-medium">
                      Installs, commissions and brands the station
                    </li>
                    <li className="check-bullet-green text-[#2A1B17] text-sm sm:text-base font-medium">
                      Sets prices, handles customers and brings in commercial fleets
                    </li>
                    <li className="check-bullet-green text-[#2A1B17] text-sm sm:text-base font-medium">
                      Monitors 24×7 and carries maintenance and repairs
                    </li>
                    <li className="check-bullet-green text-[#2A1B17] text-sm sm:text-base font-medium">
                      Calculates and pays your share every month
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-5 border-t border-dashed border-[#EADFD5] text-[#6F5F57] text-sm">
                  The income split is set out in your partner agreement.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            4. STATION SIZES & INVESTMENT
           ========================================== */}
        <section id="sizes" className="py-12 px-6">
          <div className="max-w-[1160px] mx-auto">
            <h2 className="text-[#2A1B17] text-2xl sm:text-3xl lg:text-4xl font-extrabold font-montserrat">
              Station sizes and investment amounts
            </h2>
            <p className="text-[#6F5F57] text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              Bigger stations serve more cars at once and cost less per kW. We recommend a size after we study your site's traffic and power supply.
            </p>

            {/* Sizes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mt-10 border border-[#EADFD5] rounded-3xl overflow-hidden bg-white shadow-sm">
              {CONFIG.sizes.map((s, idx) => (
                <div
                  key={s.kw}
                  className={`p-7 border-b lg:border-b-0 border-[#EADFD5] ${
                    idx !== CONFIG.sizes.length - 1 ? 'lg:border-r' : ''
                  } ${s.popular ? 'bg-[#FFF6EE]' : ''} flex flex-col justify-between`}
                >
                  <div>
                    {s.popular && (
                      <span className="inline-block bg-[#E97A1C] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-3 uppercase tracking-wider">
                        Most chosen
                      </span>
                    )}
                    <div className="font-montserrat font-black text-4xl text-[#2A1B17]">
                      {s.kw}
                      <span className="text-lg font-bold ml-1 text-[#6F5F57]">kW</span>
                    </div>
                    <div className="text-xs text-[#6F5F57] mt-1 font-medium">{s.bays}</div>
                    <div className="text-xl font-extrabold text-[#2A1B17] mt-5 mb-2">{s.label}</div>
                  </div>
                  <div className="text-xs text-[#6F5F57] mt-4 pt-4 border-t border-[#EADFD5]">
                    {s.fit}
                  </div>
                </div>
              ))}
            </div>

            {/* What investment funds */}
            <div className="mt-10 p-8 sm:p-10 bg-white border border-[#EADFD5] rounded-3xl shadow-sm">
              <h3 className="text-xl font-extrabold text-[#2A1B17] mb-6">What your investment funds</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li className="check-bullet-green text-[#2A1B17] text-sm font-medium">
                  DC fast charger with dual CCS2 guns
                </li>
                <li className="check-bullet-green text-[#2A1B17] text-sm font-medium">
                  Transformer, panel and power upgrade
                </li>
                <li className="check-bullet-green text-[#2A1B17] text-sm font-medium">
                  Civil and electrical works
                </li>
                <li className="check-bullet-green text-[#2A1B17] text-sm font-medium">
                  Discom approvals and paperwork
                </li>
                <li className="check-bullet-green text-[#2A1B17] text-sm font-medium">
                  Canopy, signage and full branding kit
                </li>
                <li className="check-bullet-green text-[#2A1B17] text-sm font-medium">
                  Charging app and payment software
                </li>
                <li className="check-bullet-green text-[#2A1B17] text-sm font-medium">
                  Listing on Google Maps and the MegaCharge network
                </li>
                <li className="check-bullet-green text-[#2A1B17] text-sm font-medium">
                  Commissioning, testing and go-live
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ==========================================
            5. INTERACTIVE FINANCIAL CALCULATOR
           ========================================== */}
        <section id="calculator" className="py-20 px-6 bg-gradient-to-b from-[#FAF7F3] to-[#F3ECE5]">
          <div className="max-w-[1160px] mx-auto">
            <h2 className="text-[#2A1B17] text-3xl sm:text-4xl lg:text-5xl font-extrabold font-montserrat tracking-tight">
              See what a station could earn
            </h2>
            <p className="text-[#6F5F57] text-base sm:text-lg max-w-2xl mt-3 leading-relaxed">
              Move the sliders to match your situation. Utilisation, the share of the day a charger is in use, drives almost everything, so check the low-usage case too.
            </p>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-[#EADFD5]">
              {/* Controls Column */}
              <div className="lg:col-span-6 bg-white p-8 sm:p-10 flex flex-col justify-between space-y-8">
                {/* Station Size Segmented Buttons */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-3">
                    <span className="text-[#2A1B17]">Station size</span>
                    <span className="text-[#A9480E] font-bold">{calcState.size} kW DC</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 bg-[#F4EEE8] p-1.5 rounded-2xl">
                    {CONFIG.sizes.map((s) => (
                      <button
                        key={s.kw}
                        type="button"
                        onClick={() => setCalcState((prev) => ({ ...prev, size: s.kw }))}
                        className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                          calcState.size === s.kw
                            ? 'bg-white text-[#2A1B17] shadow-md'
                            : 'text-[#6F5F57] hover:text-[#2A1B17]'
                        }`}
                      >
                        {s.kw} kW
                      </button>
                    ))}
                  </div>
                </div>

                {/* Utilisation Slider */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-3">
                    <span className="text-[#2A1B17]">Utilisation</span>
                    <span className="text-[#A9480E] font-bold">{calcState.util}% of day</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={calcState.util}
                    onChange={(e) =>
                      setCalcState((prev) => ({ ...prev, util: parseFloat(e.target.value) }))
                    }
                    className="custom-range-slider"
                  />
                  <div className="flex justify-between text-[11px] text-[#6F5F57] mt-2 font-mono">
                    <span>5% new site</span>
                    <span>20% typical</span>
                    <span>40% busy highway</span>
                  </div>
                </div>

                {/* 2-Input Pricing Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2A1B17] mb-2 uppercase">
                      Charging price
                    </label>
                    <div className="flex items-center border border-[#EADFD5] rounded-xl px-3 py-2 bg-white focus-within:border-[#E97A1C]">
                      <input
                        type="number"
                        min="5"
                        max="40"
                        step="0.5"
                        value={calcState.tariff}
                        onChange={(e) =>
                          setCalcState((prev) => ({
                            ...prev,
                            tariff: parseFloat(e.target.value) || 0
                          }))
                        }
                        className="w-full font-bold text-[#2A1B17] outline-none text-base"
                      />
                      <span className="text-xs text-[#6F5F57] whitespace-nowrap font-medium">₹/unit</span>
                    </div>
                    <span className="block text-[11px] text-[#6F5F57] mt-1">What drivers pay, before GST</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A1B17] mb-2 uppercase">
                      Electricity cost
                    </label>
                    <div className="flex items-center border border-[#EADFD5] rounded-xl px-3 py-2 bg-white focus-within:border-[#E97A1C]">
                      <input
                        type="number"
                        min="3"
                        max="20"
                        step="0.5"
                        value={calcState.power}
                        onChange={(e) =>
                          setCalcState((prev) => ({
                            ...prev,
                            power: parseFloat(e.target.value) || 0
                          }))
                        }
                        className="w-full font-bold text-[#2A1B17] outline-none text-base"
                      />
                      <span className="text-xs text-[#6F5F57] whitespace-nowrap font-medium">₹/unit</span>
                    </div>
                    <span className="block text-[11px] text-[#6F5F57] mt-1">Your EV tariff from Discom</span>
                  </div>
                </div>

                {/* Site rent slider */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-3">
                    <span className="text-[#2A1B17]">Site rent to landowner</span>
                    <span className="text-[#A9480E] font-bold">{calcState.host}% of revenue</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={calcState.host}
                    onChange={(e) =>
                      setCalcState((prev) => ({ ...prev, host: parseFloat(e.target.value) }))
                    }
                    className="custom-range-slider"
                  />
                  <span className="block text-[11px] text-[#6F5F57] mt-2">
                    Paid to landowner where station is placed. Set to 0% if it is on your own land.
                  </span>
                </div>
              </div>

              {/* Real-Time Output Column (Dark Aesthetic) */}
              <div className="lg:col-span-6 bg-[#1F1715] text-white p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#BFAEA5] uppercase font-mono tracking-wider">
                    Estimated monthly share to you
                  </span>
                  <div className="text-4xl sm:text-5xl font-black font-montserrat text-white my-2 tracking-tight">
                    {inr(results.net)} <span className="text-lg font-bold text-[#BFAEA5]">/ month</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#BFAEA5]">
                    {inr(results.annual)} a year on an investment of {results.size.label}
                  </p>

                  {/* 2 KPI Badges */}
                  <div className="grid grid-cols-2 gap-4 my-6">
                    <div className="p-4 rounded-xl border border-[#3A2C28] bg-[#2A1F1C]">
                      <small className="block text-[#BFAEA5] text-xs">Payback period</small>
                      <b className="text-xl sm:text-2xl font-black font-montserrat text-white">
                        {payTxt(results.payback)}
                      </b>
                    </div>
                    <div className="p-4 rounded-xl border border-[#3A2C28] bg-[#2A1F1C]">
                      <small className="block text-[#BFAEA5] text-xs">Annual ROI</small>
                      <b className="text-xl sm:text-2xl font-black font-montserrat text-[#1E9B63]">
                        {results.roi > 0 ? results.roi.toFixed(1) + '%' : 'Negative'}
                      </b>
                    </div>
                  </div>

                  {/* Transparent Ledger Breakdown */}
                  <div className="border-t border-[#3A2C28] pt-4 space-y-2 text-sm text-[#E9DCD3]">
                    <div className="flex justify-between">
                      <span>Units sold per month</span>
                      <span className="font-semibold text-white">{num(results.units)} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Charging revenue</span>
                      <span className="font-semibold text-white">{inr(results.rev)}</span>
                    </div>
                    <div className="flex justify-between text-[#F0B79A]">
                      <span>Electricity cost</span>
                      <span>− {inr(results.power)}</span>
                    </div>
                    <div className="flex justify-between text-[#F0B79A]">
                      <span>Site rent to landowner ({calcState.host}%)</span>
                      <span>− {inr(results.host)}</span>
                    </div>
                    <div className="flex justify-between text-[#F0B79A]">
                      <span>MegaCharge share ({results.feePct}% after costs)</span>
                      <span>− {inr(results.fee)}</span>
                    </div>
                    <div className="flex justify-between text-[#F0B79A]">
                      <span>Maintenance and software</span>
                      <span>− {inr(results.om)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-dashed border-[#3A2C28] text-white font-bold text-base">
                      <span>Your share per month</span>
                      <span className="text-[#E97A1C]">{inr(results.net)}</span>
                    </div>
                  </div>
                </div>

                {/* Downside Scenario Callout */}
                <div className="mt-6 p-4 rounded-xl bg-[#2A1F1C] border-l-4 border-[#E97A1C] text-xs text-[#E9DCD3] leading-relaxed">
                  {calcState.util <= CONFIG.downsideUtil ? (
                    <span>
                      <b>You are looking at the low-usage case.</b> Many new stations sit here in their first few months before regular commercial fleets and highway travelers establish routines.
                    </span>
                  ) : (
                    <span>
                      <b>Low-usage check:</b> at {CONFIG.downsideUtil}% utilisation this station would still earn approximately{' '}
                      <strong>{inr(results.downsideNet)}</strong> a month, with payback of{' '}
                      <strong>{payTxt(results.downsidePayback)}</strong>.
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-[#9E8D84] mt-6 leading-normal">
                  Illustrative estimate only, not an assured or guaranteed return. Your share depends on the station's actual usage, electricity tariffs, site terms and downtime, and is paid only from income the station earns. Figures exclude GST.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            6. WHERE CUSTOMERS COME FROM (Demand)
           ========================================== */}
        <section id="demand" className="py-20 px-6">
          <div className="max-w-[1160px] mx-auto">
            <h2 className="text-[#2A1B17] text-3xl sm:text-4xl lg:text-5xl font-extrabold font-montserrat">
              Where your customers come from
            </h2>
            <p className="text-[#6F5F57] text-base sm:text-lg max-w-2xl mt-3 leading-relaxed">
              A station earns when chargers are busy. We fill them from three directions, so you are not depending on chance footfall.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-8 bg-white border border-[#EADFD5] rounded-3xl shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#FDEBDC] flex items-center justify-center text-[#A9480E] mb-6">
                  <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-[#2A1B17] mb-3">Everyday EV drivers</h3>
                <p className="text-sm text-[#6F5F57] leading-relaxed">
                  Your station is listed on Google Maps, popular EV charging apps, and the MegaCharge network, so drivers searching for a fast charger nearby find you effortlessly.
                </p>
              </div>

              <div className="p-8 bg-white border border-[#EADFD5] rounded-3xl shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#FDEBDC] flex items-center justify-center text-[#A9480E] mb-6">
                  <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="7" width="13" height="10" rx="1.5" />
                    <path d="M15 10h4l3 3v4h-7" />
                    <circle cx="6.5" cy="18" r="1.8" />
                    <circle cx="18" cy="18" r="1.8" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-[#2A1B17] mb-3">Commercial fleets</h3>
                <p className="text-sm text-[#6F5F57] leading-relaxed">
                  Delivery, logistics, and ride-hailing cab fleets charge every day, whereas a private car charges a few times a week. One fleet customer can keep a charger busy for hours.
                </p>
              </div>

              <div className="p-8 bg-white border border-[#EADFD5] rounded-3xl shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#FDEBDC] flex items-center justify-center text-[#A9480E] mb-6">
                  <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4" />
                    <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-[#2A1B17] mb-3">Fleet minimum contracts</h3>
                <p className="text-sm text-[#6F5F57] leading-relaxed">
                  Where possible, we sign logistics operators on contracts that commit to a minimum number of units each month. That gives your station a floor of predictable, steady revenue.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            7. SITE SELECTION (Dark Section)
           ========================================== */}
        <section id="sites" className="py-20 px-6 bg-[#2A1B17] text-white">
          <div className="max-w-[1160px] mx-auto">
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold font-montserrat">
              We study a site before anyone invests in it
            </h2>
            <p className="text-[#E9DCD3] text-base sm:text-lg max-w-2xl mt-3 leading-relaxed">
              A charger in the wrong place never pays back. Every site is surveyed and given a utilisation estimate before you sign.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
              {/* What we check */}
              <div className="lg:col-span-6">
                <h3 className="text-lg font-bold text-white mb-6">What we check</h3>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    'Daily traffic and EV count',
                    'Transformer capacity',
                    'Power connection cost',
                    'Road frontage and entry',
                    'Nearby chargers',
                    'Fleet routes and depots',
                    'Dwell time of visitors',
                    'Amenities for drivers',
                    'Local approvals'
                  ].map((chip) => (
                    <span
                      key={chip}
                      className="border border-white/20 rounded-full px-4 py-2 text-xs sm:text-sm text-[#F3E7DF] bg-white/5"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Where stations work best */}
              <div className="lg:col-span-6">
                <h3 className="text-lg font-bold text-white mb-6">Where stations work best</h3>
                <ul className="divide-y divide-white/10 text-sm">
                  <li className="py-3.5 flex justify-between gap-4">
                    <span className="font-semibold text-white">Highways and expressways</span>
                    <span className="text-[#BFAEA5] text-right">Long-distance travel, high DC demand</span>
                  </li>
                  <li className="py-3.5 flex justify-between gap-4">
                    <span className="font-semibold text-white">Fuel stations and dhabas</span>
                    <span className="text-[#BFAEA5] text-right">Existing traffic, dwell, and open space</span>
                  </li>
                  <li className="py-3.5 flex justify-between gap-4">
                    <span className="font-semibold text-white">Logistics hubs and depots</span>
                    <span className="text-[#BFAEA5] text-right">Daily continuous fleet charging</span>
                  </li>
                  <li className="py-3.5 flex justify-between gap-4">
                    <span className="font-semibold text-white">Malls, restaurants, hotels</span>
                    <span className="text-[#BFAEA5] text-right">Customers stay 30 minutes or more</span>
                  </li>
                  <li className="py-3.5 flex justify-between gap-4">
                    <span className="font-semibold text-white">Transit hubs and IT parks</span>
                    <span className="text-[#BFAEA5] text-right">Steady daily commuter traffic</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            8. INVEST PROCESS (6 Steps)
           ========================================== */}
        <section id="invest-process" className="py-20 px-6">
          <div className="max-w-[1160px] mx-auto">
            <h2 className="text-[#2A1B17] text-3xl sm:text-4xl font-extrabold font-montserrat">
              From investment to first payout
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mt-12">
              {[
                { title: 'Apply', desc: 'Tell us your budget, city and whether you have land.' },
                { title: 'Site survey', desc: 'We visit, check power and traffic, and share a utilisation estimate.' },
                { title: 'Agreement', desc: 'Sign the partner agreement with clear revenue and exit terms.' },
                { title: 'Approvals and build', desc: 'We handle the Discom connection, civil work and installation.' },
                { title: 'Go live', desc: 'The station is commissioned, branded and listed on maps and apps.' },
                { title: 'Monthly payout', desc: 'Earnings are paid to your account with a detailed statement.' }
              ].map((step, idx) => (
                <li key={step.title} className="step-item-connector">
                  <div className="w-10 h-10 rounded-full bg-[#E97A1C] text-white flex items-center justify-center font-montserrat font-bold text-base mb-4 relative z-10 shadow-md">
                    {idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#2A1B17] mb-1.5">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-[#6F5F57] leading-relaxed">{step.desc}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-sm text-[#6F5F57]">
              Typical time from signed agreement to go-live: <b>{CONFIG.goLive}</b>, depending mostly on the power connection.
            </p>
          </div>
        </section>

        {/* ==========================================
            9. BECOME A DEALER SECTION
           ========================================== */}
        <section id="dealer" className="py-20 px-6 border-t-4 border-[#1E9B63] bg-white">
          <div className="max-w-[1160px] mx-auto">
            <h2 className="text-[#2A1B17] text-3xl sm:text-4xl lg:text-5xl font-extrabold font-montserrat">
              Become a dealer
            </h2>
            <p className="text-[#6F5F57] text-base sm:text-lg max-w-3xl mt-4 leading-relaxed">
              Sell and install MegaCharge EV chargers in your territory. You get territory rights, dealer pricing, training and customer leads from us.
            </p>

            <div className="mt-14">
              <h3 className="text-2xl font-extrabold text-[#2A1B17]">What you'll sell</h3>
              <p className="text-[#6F5F57] text-sm sm:text-base mt-2">
                A complete AC charging range for every vehicle on Indian roads, from e-rickshaws to cars. Each product is a repeat sale: every new EV in your area needs a charger.
              </p>

              {/* 4 Products Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                {DEALER_PRODUCTS.map((prod) => (
                  <article
                    key={prod.id}
                    className="p-6 sm:p-8 rounded-3xl border border-[#EADFD5] bg-white shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
                  >
                    <div className="sm:col-span-5 bg-[#FAF7F3] rounded-2xl p-4 flex items-center justify-center h-48 border border-[#EADFD5]/50">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="max-h-40 w-auto object-contain transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="sm:col-span-7">
                      <h4 className="text-xl font-extrabold text-[#2A1B17]">{prod.name}</h4>
                      <div className="text-xs font-bold text-[#E97A1C] mt-1 mb-3">{prod.forVehicle}</div>
                      <ul className="space-y-1.5">
                        {prod.bullets.map((b, i) => (
                          <li key={i} className="text-xs text-[#6F5F57] flex items-start gap-1.5">
                            <span className="text-[#E97A1C] mt-0.5">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-3 border-t border-[#EADFD5] text-xs text-[#2A1B17]">
                        <strong>Who buys it:</strong> {prod.buyer}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* DC Referral Band */}
              <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#FFF6EE] border border-[#F6D9C0] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-bold text-[#2A1B17]">DC fast chargers from 60 to 240 kW</h4>
                  <p className="text-sm text-[#6F5F57] mt-1 max-w-2xl">
                    Bring us a fuel station, fleet depot or highway site and earn a referral commission of{' '}
                    <b>{CONFIG.dcReferralPct}%</b> on every DC project we complete.
                  </p>
                </div>
                <a
                  href="#apply"
                  onClick={() => selectPathAndScroll('dealer', 'apply')}
                  className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold bg-white text-[#2A1B17] border border-[#EADFD5] hover:border-[#E97A1C] shadow-sm transition-all"
                >
                  Ask about DC referrals &rarr;
                </a>
              </div>

              {/* Dealer Steps */}
              <div className="mt-16">
                <h3 className="text-2xl font-extrabold text-[#2A1B17]">From application to your first sale</h3>
                <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mt-8">
                  {[
                    { title: 'Apply', desc: 'Tell us your city, current business and the level you want.' },
                    { title: 'Discussion', desc: 'Our team calls you to check territory availability and fit.' },
                    { title: 'Agreement', desc: 'Sign the dealership agreement and pay the franchise fee.' },
                    { title: 'Opening stock', desc: 'Place your first order and receive demo units and branding.' },
                    { title: 'Training', desc: 'Your team is trained and certified on sales and installation.' },
                    { title: 'Launch', desc: 'You go live on our dealer map and start receiving leads.' }
                  ].map((step, idx) => (
                    <li key={step.title} className="step-item-connector">
                      <div className="w-10 h-10 rounded-full bg-[#1E9B63] text-white flex items-center justify-center font-montserrat font-bold text-base mb-4 relative z-10 shadow-md">
                        {idx + 1}
                      </div>
                      <h4 className="text-base font-bold text-[#2A1B17] mb-1.5">{step.title}</h4>
                      <p className="text-xs sm:text-sm text-[#6F5F57] leading-relaxed">{step.desc}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 text-sm text-[#6F5F57]">
                  Typical time from agreement to launch: <b>{CONFIG.launch}</b>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            10. APPLICATION FORM SECTION
           ========================================== */}
        <section id="apply" className="py-20 px-6 bg-[#FAF7F3] border-t border-[#EADFD5]">
          <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Contact Narrative */}
            <div className="lg:col-span-5">
              <span className="text-xs font-bold text-[#E97A1C] uppercase tracking-widest font-mono">
                Join the Network
              </span>
              <h2 className="text-[#2A1B17] text-3xl sm:text-4xl lg:text-5xl font-extrabold font-montserrat mt-2">
                Apply to partner with MegaCharge
              </h2>
              <p className="text-[#6F5F57] text-sm sm:text-base leading-relaxed mt-4">
                Share a few details and our team will call you within one working day. Investors get a station recommendation and return estimate; dealers get territory availability and pricing.
              </p>

              <div className="mt-8 space-y-3 text-sm text-[#2A1B17]">
                <div>
                  <span className="text-[#6F5F57] block text-xs">WhatsApp or Call:</span>
                  <a
                    href={waUrl(CONFIG.whatsapp, "Hi, I'm applying for a MegaCharge partnership.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#A9480E] hover:underline text-base"
                  >
                    +91 92895 55090
                  </a>
                </div>
                <div>
                  <span className="text-[#6F5F57] block text-xs">Headquarters:</span>
                  <span className="font-medium text-xs sm:text-sm text-[#2A1B17]">
                    Mega Nirman &amp; Industries Ltd, Netaji Subhash Place (NSP), Pitampura, New Delhi
                  </span>
                </div>
              </div>
            </div>

            {/* Right Application Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#EADFD5] shadow-lg">
              <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                {/* Pathway Selector */}
                <div>
                  <label htmlFor="fPath" className="block text-xs font-bold text-[#2A1B17] uppercase mb-1.5">
                    I want to
                  </label>
                  <select
                    id="fPath"
                    value={formPath}
                    onChange={(e) => setFormPath(e.target.value)}
                    className="w-full px-4 py-3 border border-[#EADFD5] rounded-xl text-sm font-semibold text-[#2A1B17] bg-white focus:outline-none focus:border-[#E97A1C]"
                  >
                    <option value="invest">Invest in a charging station (FICO)</option>
                    <option value="dealer">Become an authorised dealer</option>
                    <option value="both">Explore both options</option>
                  </select>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fName" className="block text-xs font-bold text-[#2A1B17] uppercase mb-1.5">
                      Your name *
                    </label>
                    <input
                      id="fName"
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formValues.name}
                      onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                      className="w-full px-4 py-3 border border-[#EADFD5] rounded-xl text-sm text-[#2A1B17] focus:outline-none focus:border-[#E97A1C]"
                    />
                  </div>
                  <div>
                    <label htmlFor="fPhone" className="block text-xs font-bold text-[#2A1B17] uppercase mb-1.5">
                      Mobile number *
                    </label>
                    <input
                      id="fPhone"
                      type="tel"
                      required
                      placeholder="10-digit mobile"
                      value={formValues.phone}
                      onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-[#EADFD5] rounded-xl text-sm text-[#2A1B17] focus:outline-none focus:border-[#E97A1C]"
                    />
                  </div>
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fCity" className="block text-xs font-bold text-[#2A1B17] uppercase mb-1.5">
                      City or district *
                    </label>
                    <input
                      id="fCity"
                      type="text"
                      required
                      placeholder="e.g. Panipat"
                      value={formValues.city}
                      onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
                      className="w-full px-4 py-3 border border-[#EADFD5] rounded-xl text-sm text-[#2A1B17] focus:outline-none focus:border-[#E97A1C]"
                    />
                  </div>
                  <div>
                    <label htmlFor="fState" className="block text-xs font-bold text-[#2A1B17] uppercase mb-1.5">
                      State
                    </label>
                    <input
                      id="fState"
                      type="text"
                      placeholder="e.g. Haryana"
                      value={formValues.state}
                      onChange={(e) => setFormValues({ ...formValues, state: e.target.value })}
                      className="w-full px-4 py-3 border border-[#EADFD5] rounded-xl text-sm text-[#2A1B17] focus:outline-none focus:border-[#E97A1C]"
                    />
                  </div>
                </div>

                {/* Investor specific fields */}
                {(formPath === 'invest' || formPath === 'both') && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EADFD5]">
                    <div>
                      <label htmlFor="fBudget" className="block text-xs font-bold text-[#2A1B17] uppercase mb-1.5">
                        Station budget
                      </label>
                      <select
                        id="fBudget"
                        value={formValues.budget}
                        onChange={(e) => setFormValues({ ...formValues, budget: e.target.value })}
                        className="w-full px-4 py-3 border border-[#EADFD5] rounded-xl text-sm text-[#2A1B17] focus:outline-none focus:border-[#E97A1C]"
                      >
                        <option>Under ₹30 lakh</option>
                        <option>₹30–50 lakh</option>
                        <option>₹50 lakh – ₹1 crore</option>
                        <option>Above ₹1 crore</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="fLand" className="block text-xs font-bold text-[#2A1B17] uppercase mb-1.5">
                        Do you have land?
                      </label>
                      <select
                        id="fLand"
                        value={formValues.land}
                        onChange={(e) => setFormValues({ ...formValues, land: e.target.value })}
                        className="w-full px-4 py-3 border border-[#EADFD5] rounded-xl text-sm text-[#2A1B17] focus:outline-none focus:border-[#E97A1C]"
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Dealer specific fields */}
                {(formPath === 'dealer' || formPath === 'both') && (
                  <div className="space-y-4 pt-2 border-t border-[#EADFD5]">
                    <div>
                      <label htmlFor="fBiz" className="block text-xs font-bold text-[#2A1B17] uppercase mb-1.5">
                        Your current business
                      </label>
                      <select
                        id="fBiz"
                        value={formValues.biz}
                        onChange={(e) => setFormValues({ ...formValues, biz: e.target.value })}
                        className="w-full px-4 py-3 border border-[#EADFD5] rounded-xl text-sm text-[#2A1B17] focus:outline-none focus:border-[#E97A1C]"
                      >
                        <option>Electrical contractor</option>
                        <option>Vehicle dealer (2W / 3W / 4W)</option>
                        <option>E-rickshaw dealer</option>
                        <option>Battery or inverter shop</option>
                        <option>Solar installer</option>
                        <option>Electrical wholesaler</option>
                        <option>New business</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fTier" className="block text-xs font-bold text-[#2A1B17] uppercase mb-1.5">
                          Dealership level
                        </label>
                        <select
                          id="fTier"
                          value={formValues.tier}
                          onChange={(e) => setFormValues({ ...formValues, tier: e.target.value })}
                          className="w-full px-4 py-3 border border-[#EADFD5] rounded-xl text-sm text-[#2A1B17] focus:outline-none focus:border-[#E97A1C]"
                        >
                          <option>City dealer</option>
                          <option>Regional distributor</option>
                          <option>Not sure yet</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="fDBudget" className="block text-xs font-bold text-[#2A1B17] uppercase mb-1.5">
                          Dealer investment
                        </label>
                        <select
                          id="fDBudget"
                          value={formValues.dbudget}
                          onChange={(e) => setFormValues({ ...formValues, dbudget: e.target.value })}
                          className="w-full px-4 py-3 border border-[#EADFD5] rounded-xl text-sm text-[#2A1B17] focus:outline-none focus:border-[#E97A1C]"
                        >
                          <option>Under ₹5 lakh</option>
                          <option>₹5–10 lakh</option>
                          <option>₹10–25 lakh</option>
                          <option>Above ₹25 lakh</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error message */}
                {formErr && (
                  <div className="text-xs text-red-600 font-semibold p-3 rounded-lg bg-red-50 border border-red-200">
                    {formErr}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#E97A1C] to-[#A9480E] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#A9480E]/25 hover:brightness-105 transition-all"
                >
                  Send my application &rarr;
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ==========================================
            11. FREQUENTLY ASKED QUESTIONS
           ========================================== */}
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#2A1B17] text-3xl font-extrabold font-montserrat">
              Partnership FAQs
            </h2>
            <p className="text-[#6F5F57] text-sm mt-2">
              Common questions on station funding, FICO terms, and hardware dealerships.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EADFD5] rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#2A1B17] text-base hover:bg-[#FAF7F3] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-xl text-[#E97A1C] font-mono shrink-0">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-[#6F5F57] leading-relaxed border-t border-[#EADFD5]/50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ==========================================
          12. LEGAL DISCLAIMER FOOTER
         ========================================== */}
      <footer className="legal bg-white border-t border-[#EADFD5] py-12 px-6 text-[12px] text-[#6F5F57]">
        <div className="max-w-[1160px] mx-auto leading-relaxed space-y-2">
          <p>
            <strong>MegaCharge</strong> is a commercial EV infrastructure brand of{' '}
            <strong>Mega Nirman &amp; Industries Limited</strong> (BSE: 539767). All earnings, projected returns, payback metrics and margins shown on this page are illustrative estimates based on the stated baseline assumptions and are not an offer, promise, or legal guarantee of returns, electricity units, sales or revenue.
          </p>
          <p>
            Station returns depend on actual charging utilisation, electricity tariffs from the Discom, site lease terms, and system uptime, and are disbursed strictly from income earned by the identified station. Under the FICO model, the investor funds the project but does not acquire title ownership of the electrical grid assets. Franchise fees, dealership purchase prices, discounts, and exclusive territories are indicative, exclude GST, and are governed solely by the executed binding agreement. Product specifications are subject to continuous technical improvement without prior notice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FranchisePage;
