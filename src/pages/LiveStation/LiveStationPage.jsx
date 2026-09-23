import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  FileText, 
  TrendingUp, 
  HelpCircle, 
  MessageCircle, 
  PhoneCall, 
  ExternalLink 
} from 'lucide-react';
import './LiveStationPage.css';

/* Image Assets */
import acCharger from '../../assets/ac_charger.png';
import acChargerReal from '../../assets/ac_charger_real.png';
import dcCharger from '../../assets/dc_charger.png';
import zenergize60 from '../../assets/zenergize_60.jpg';

/* ==========================================
   CONFIG
   ========================================== */
const STATION_CONFIG = {
  price: 39990,
  paybackMonths: 18, // 1.5 years target payback
  escalation: 0.08,  // 8% yearly increase in tariff
  modelledKwhDay: 62,
  tariffPerUnit: 11,
  whatsapp: '919289555090',
  location: 'DLF CyberCity / Sector 29, Gurgaon',
  hardware: 'Smart AC Wallbox Model MC-07',
  liveSince: 'LIVE · JAN 2026',
  warranty: '3 Years Full Replacement'
};

const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

const pbLabel = (n) => {
  if (n % 12 === 0) return `${n / 12} year${n > 12 ? 's' : ''}`;
  if (n % 6 === 0) return `${n / 12} years`;
  return `${n} months`;
};

const LiveStationPage = () => {
  // Gallery state
  const photos = useMemo(() => [
    { id: 0, src: acChargerReal, title: 'Installed station on site charging vehicle' },
    { id: 1, src: acCharger, title: 'Close-up of Type 2 ergonomic connector and status ring' }
  ], []);
  const [activePhoto, setActivePhoto] = useState(0);

  // Selected year for calculator
  const [years, setYears] = useState(5);

  // FAQ accordion
  const [activeFaq, setActiveFaq] = useState(0);

  // Buy Dialog State
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  // Sticky Bar visibility
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroBuyBoxRef = useRef(null);

  // Calculate monthly payout to reach price within paybackMonths
  const monthlyPayout = useMemo(() => {
    let units = 0;
    for (let m = 0; m < STATION_CONFIG.paybackMonths; m++) {
      units += Math.pow(1 + STATION_CONFIG.escalation, Math.floor(m / 12));
    }
    return Math.ceil(STATION_CONFIG.price / units / 5) * 5;
  }, []);

  // 5-year payout projections
  const payoutsList = useMemo(() => {
    const out = [];
    let cum = 0;
    for (let y = 0; y < 5; y++) {
      const yr = monthlyPayout * 12 * Math.pow(1 + STATION_CONFIG.escalation, y);
      cum += yr;
      out.push({ year: y + 1, yrAnnual: yr, cumTotal: cum });
    }
    return out;
  }, [monthlyPayout]);

  const selectedCum = useMemo(() => {
    return payoutsList[years - 1]?.cumTotal || 0;
  }, [payoutsList, years]);

  const maxCum = useMemo(() => {
    return payoutsList[4]?.cumTotal || 1;
  }, [payoutsList]);

  // Track hero buybox intersection for bottom sticky bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setShowStickyBar(isPast);
      },
      { threshold: 0.1 }
    );

    if (heroBuyBoxRef.current) {
      observer.observe(heroBuyBoxRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Open WhatsApp with prefilled text
  const openWhatsApp = (msg) => {
    const text = msg || `Hi, I'm interested in buying the live MegaCharge 7.4 kW AC Smart Box (₹39,990).`;
    window.open(`https://wa.me/${STATION_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!isAgreed) return;
    setIsBuyModalOpen(false);
    const msg = `Hi MegaCharge team, I would like to proceed with the purchase of the live 7.4 kW AC Smart Box (₹39,990) for my site. Please share the escrow payment link and onboarding documents.`;
    openWhatsApp(msg);
  };

  const FAQS = [
    {
      q: 'What exactly do I own?',
      a: 'You own the physical charging station hardware (MegaCharge 7.4 kW Smart AC Wallbox MC-07), registered legally in your name or firm, and 100% of the net earnings from the electricity units it dispenses to EV drivers.'
    },
    {
      q: 'How is my monthly payout worked out?',
      a: "From the actual electricity units (kWh) your station sells each month at the site's prevailing charging tariff (₹11/unit), after deducting direct Discom electricity cost and site upkeep. Every single charging session and dispensed kWh is transparently visible in your real-time cloud partner dashboard."
    },
    {
      q: 'Is the payout guaranteed?',
      a: 'No. The payout is a targeted projection based on modelled site utilization (~62 kWh/day). If EV drivers charge more frequently, you earn higher monthly payouts; if traffic is lower, payouts reflect actual energy throughput.'
    },
    {
      q: 'What if the charger breaks or encounters a technical glitch?',
      a: 'MegaCharge takes complete responsibility. Our 24×7 cloud NOC team monitors telemetry around the clock. The hardware is backed by our comprehensive 3-year full replacement warranty, with zero maintenance labor charges on you.'
    },
    {
      q: 'Can I sell my station later if I need liquidity?',
      a: 'Yes! MegaCharge operates a certified secondary marketplace. Whenever you choose to exit, inform our team and we will match your earning asset with an active buyer on our waiting list, disbursing funds to your verified account within 7 working days.'
    },
    {
      q: 'Do I need to visit the site or manage daily drivers?',
      a: 'No, zero on-site involvement is needed. EV drivers plug in, scan the QR code or tap their RFID card, and pay through the MegaCharge app automatically. You monitor your revenue remotely from your smartphone.'
    }
  ];

  return (
    <div className="live-station-container min-h-screen pt-28 pb-20">
      {/* ==========================================
          BREADCRUMBS
         ========================================== */}
      <div className="max-w-[1080px] mx-auto px-6 py-4 text-xs text-[#766A63]">
        <Link to="/products" className="hover:text-[#C4600F] transition-colors">Stations for sale</Link>
        <span className="mx-2">&rsaquo;</span>
        <span className="text-[#5A4E48]">Live stations</span>
        <span className="mx-2">&rsaquo;</span>
        <b className="text-[#2B1D1A]">MegaCharge 7.4 kW AC Smart Box</b>
      </div>

      {/* ==========================================
          HERO SECTION: 2-COLUMN VIEW
         ========================================== */}
      <section className="max-w-[1080px] mx-auto px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: GALLERY & SPEC CARD */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative bg-white border border-[#ECE6DF] rounded-2xl p-3 shadow-sm overflow-hidden">
              {/* Main Photo View */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#E5DFD9]">
                <img
                  src={photos[activePhoto].src}
                  alt={photos[activePhoto].title}
                  className="w-full h-full object-contain p-4 transition-all duration-300"
                />

                {/* Live Indicator Pill */}
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 bg-[#FFF1DC] text-[#8A4B12] px-3 py-1.5 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider shadow-sm">
                  <span className="live-dot-pulse" aria-hidden="true" />
                  <span>{STATION_CONFIG.liveSince}</span>
                </div>

                {/* Capacity Tag */}
                <div className="absolute right-3 top-3 bg-[#2B1D1A]/90 text-white px-3 py-1.5 rounded-full text-xs font-mono">
                  7.4 kW Single Phase
                </div>

                {/* Thumbnails Floating Switcher */}
                <div className="absolute left-3 bottom-3 flex gap-2 z-10">
                  {photos.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePhoto(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 bg-white p-1 transition-all ${
                        activePhoto === idx ? 'border-[#EE8A33] scale-105 shadow-md' : 'border-white/80 opacity-80'
                      }`}
                      aria-label={p.title}
                    >
                      <img src={p.src} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Specs Under Photo */}
            <div className="bg-white border border-[#ECE6DF] rounded-2xl px-5 py-3 text-xs font-mono space-y-2 shadow-sm">
              <div className="flex justify-between py-1 border-b border-[#ECE6DF]">
                <span className="text-[#766A63]">Location:</span>
                <span className="font-bold text-[#2B1D1A] text-right">{STATION_CONFIG.location}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ECE6DF]">
                <span className="text-[#766A63]">Hardware:</span>
                <span className="font-bold text-[#2B1D1A]">{STATION_CONFIG.hardware}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ECE6DF]">
                <span className="text-[#766A63]">Looked after by:</span>
                <span className="font-bold text-[#2B1D1A]">MegaCharge (Turnkey Upkeep)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#766A63]">Warranty:</span>
                <span className="font-bold text-[#1E8A4C]">{STATION_CONFIG.warranty}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: BUYBOX & FINANCIAL SUMMARY */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#E3F4E8] text-[#17693A] text-xs font-extrabold uppercase px-3 py-1 rounded-full font-montserrat tracking-wider">
                  Live Station
                </span>
                <span className="bg-[#FDEBD6] text-[#9A5314] text-xs font-extrabold uppercase px-3 py-1 rounded-full font-montserrat tracking-wider">
                  Home &amp; Workplace
                </span>
              </div>

              {/* Title & Description */}
              <span className="block text-xs uppercase tracking-widest font-extrabold text-[#C4600F] font-montserrat mb-1">
                MegaCharge Earning Asset
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B1D1A] font-montserrat leading-tight uppercase">
                7.4 kW AC Smart Box
              </h1>
              <p className="text-sm sm:text-base text-[#5A4E48] mt-2 leading-relaxed">
                Already installed and charging cars. You buy it, we run it, and you get paid every month.
              </p>
            </div>

            {/* DARK BUYBOX CARD */}
            <div 
              ref={heroBuyBoxRef} 
              id="buy" 
              className="bg-[#2B1D1A] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-[#42322E]"
            >
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#4A3A34]">
                <div>
                  <div className="text-xs text-[#CDBFB6]">You pay</div>
                  <div className="text-2xl sm:text-3xl font-black font-montserrat text-white mt-1">
                    {inr(STATION_CONFIG.price)}
                  </div>
                </div>
                <div className="border-l border-[#4A3A34] pl-4">
                  <div className="text-xs text-[#CDBFB6]">Target monthly payout</div>
                  <div className="text-2xl sm:text-3xl font-black font-montserrat text-[#F6A460] mt-1">
                    ~{inr(monthlyPayout)}
                    <span className="text-xs font-normal text-[#CDBFB6]"> /mo</span>
                  </div>
                </div>
              </div>

              {/* Payback Pill */}
              <div className="flex items-center gap-2 mt-4 px-3 py-2 rounded-xl bg-[#F6A460]/15 text-[#F6C39A] text-xs font-medium">
                <Clock className="w-4 h-4 text-[#F6A460] shrink-0" />
                <span>
                  Pays for itself in about <strong className="text-white font-bold font-montserrat">1.5 years (~18 months)</strong>
                </span>
              </div>

              <p className="text-[11px] text-[#BFB1A8] mt-2 leading-normal">
                Payouts and payback are targets, not a promise. They go up or down with how much drivers charge at this site.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 mt-5">
                <button
                  type="button"
                  onClick={() => setIsBuyModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#EE8A33] to-[#C4600F] text-white font-montserrat font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-[0.99] transition-all"
                >
                  Buy now &rarr;
                </button>
                <button
                  type="button"
                  onClick={() => openWhatsApp()}
                  className="w-full py-3 rounded-xl bg-transparent border border-[#6B5A52] text-white font-montserrat font-bold text-xs uppercase tracking-wider hover:border-white transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  Talk to us on WhatsApp
                </button>
              </div>

              {/* Reassurance Row */}
              <div className="flex items-center justify-between text-[11px] text-[#CDBFB6] pt-4 mt-4 border-t border-[#4A3A34]">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#F6A460]" /> All upkeep by us
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#F6A460]" /> 3-yr warranty
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#F6A460]" /> Resell any time
                </span>
              </div>
            </div>

            {/* 3 STATS PILL ROW */}
            <div className="grid grid-cols-3 bg-[#FDF1E6] rounded-2xl py-3 text-center border border-[#F0D9C3]">
              <div className="border-r border-[#F0D9C3]/80">
                <b className="block text-base sm:text-lg font-black font-montserrat text-[#2B1D1A]">97%</b>
                <span className="text-[10px] font-mono uppercase font-bold text-[#C4600F]">Efficiency</span>
              </div>
              <div className="border-r border-[#F0D9C3]/80">
                <b className="block text-base sm:text-lg font-black font-montserrat text-[#2B1D1A]">~18 mo</b>
                <span className="text-[10px] font-mono uppercase font-bold text-[#C4600F]">Payback</span>
              </div>
              <div>
                <b className="block text-base sm:text-lg font-black font-montserrat text-[#2B1D1A]">99.5%</b>
                <span className="text-[10px] font-mono uppercase font-bold text-[#C4600F]">Uptime</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          STEP 01: HOW IT WORKS
         ========================================== */}
      <section className="max-w-[1080px] mx-auto px-6 py-12">
        <div className="mb-6">
          <span className="text-xs font-mono font-bold text-[#C4600F] uppercase tracking-wider block mb-1">
            Step 01
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-montserrat text-[#2B1D1A] uppercase">
            How it works
          </h2>
          <p className="text-sm text-[#5A4E48] mt-1">
            No technical know-how needed. You own the station; we handle all the work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-[#ECE6DF] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EE8A33] to-[#C4600F] text-white flex items-center justify-center font-montserrat font-bold text-sm mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-[#2B1D1A] mb-2">You buy the station</h3>
              <p className="text-xs sm:text-sm text-[#5A4E48] leading-relaxed">
                Pick this live station, review the verified valuation report, and pay securely into the escrow account. The hardware is registered in your name.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#ECE6DF] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EE8A33] to-[#C4600F] text-white flex items-center justify-center font-montserrat font-bold text-sm mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-[#2B1D1A] mb-2">We look after it</h3>
              <p className="text-xs sm:text-sm text-[#5A4E48] leading-relaxed">
                Hardware repairs, routine maintenance, app billing, customer support, and firmware updates are 100% managed by our in-house engineering team.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#ECE6DF] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EE8A33] to-[#C4600F] text-white flex items-center justify-center font-montserrat font-bold text-sm mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-[#2B1D1A] mb-2">You get paid monthly</h3>
              <p className="text-xs sm:text-sm text-[#5A4E48] leading-relaxed">
                Your share of charging revenue lands directly in your bank account every month. View dispensed units live in your owner dashboard anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          STEP 02: WHAT COULD YOU EARN? CALCULATOR
         ========================================== */}
      <section className="max-w-[1080px] mx-auto px-6 py-6">
        <div className="bg-[#2B1D1A] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#42322E]">
          <span className="text-xs font-mono font-bold text-[#F6A460] uppercase tracking-wider block mb-1">
            Step 02
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-montserrat text-white uppercase">
            What could you earn?
          </h2>

          {/* Dynamic Interactive Sentence */}
          <p className="text-lg sm:text-2xl font-semibold leading-relaxed mt-4 text-[#E9DCD3]">
            If I buy this station for <span className="text-white font-bold underline decoration-[#EE8A33]">{inr(STATION_CONFIG.price)}</span> and keep it for{' '}
            <span className="inline-flex gap-1.5 align-middle mx-1.5 my-1">
              {[1, 2, 3, 4, 5].map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setYears(y)}
                  className={`w-9 h-9 rounded-full text-sm font-bold transition-all border ${
                    years === y
                      ? 'bg-gradient-to-r from-[#EE8A33] to-[#C4600F] border-[#EE8A33] text-white shadow-md scale-105'
                      : 'bg-transparent border-[#6B5A52] text-[#CDBFB6] hover:border-white'
                  }`}
                >
                  {y}
                </button>
              ))}
            </span>{' '}
            {years > 1 ? 'years' : 'year'}, I could get about{' '}
            <span className="text-[#F6A460] font-black font-montserrat">{inr(selectedCum)}</span> back in payouts.
          </p>

          {/* Meter Bar with Money Back Marker */}
          <div className="mt-8 pt-4">
            <div className="meter-bar-wrapper">
              <div 
                className="meter-bar-fill" 
                style={{ width: `${Math.min(100, Math.round((selectedCum / maxCum) * 100))}%` }} 
              />
              <div 
                className="meter-target-marker" 
                style={{ left: `${Math.min(100, Math.round((STATION_CONFIG.price / maxCum) * 100))}%` }}
              >
                <em>Money back</em>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-[#CDBFB6] mt-3 font-mono">
              <span>
                {selectedCum >= STATION_CONFIG.price
                  ? `Target paid back by month 18. ${inr(selectedCum - STATION_CONFIG.price)} in net profit.`
                  : `${Math.round((selectedCum / STATION_CONFIG.price) * 100)}% of initial price recouped so far`}
              </span>
              <span>Purchase price: <b className="text-white">{inr(STATION_CONFIG.price)}</b></span>
            </div>
          </div>

          {/* 5-Year Projections Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-8">
            {payoutsList.map((p) => (
              <div 
                key={p.year}
                className={`p-3.5 rounded-xl border text-xs font-mono transition-all ${
                  years === p.year 
                    ? 'bg-[#3A2B26] border-[#EE8A33] text-white shadow-md' 
                    : 'bg-[#241A17] border-[#3A2B26] text-[#CDBFB6]'
                }`}
              >
                <div className="text-[11px] text-[#A8988F]">Year {p.year}</div>
                <b className="block text-sm font-bold text-white my-1 font-montserrat">{inr(p.yrAnnual)}</b>
                <div className="text-[10px] text-[#A8988F]">Total {inr(p.cumTotal)}</div>
              </div>
            ))}
          </div>

          {/* Methodology Footnote */}
          <p className="text-xs text-[#BFB1A8] mt-6 leading-relaxed">
            Based on the site's modelled use: about 62 units (kWh) a day at ₹11 a unit, with tariffs rising 8% a year and upkeep already taken out. Target payback: 18 months. Real payouts can be lower and payback can take longer depending on driver footfall. Please read the valuation and projection report before buying.
          </p>

          {/* Talk Row / Owner Desk */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[#4A3A34]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EE8A33] to-[#C4600F] flex items-center justify-center font-montserrat font-bold text-xs text-white shrink-0">
                MC
              </div>
              <div>
                <b className="text-sm text-white block">Still working out the numbers?</b>
                <small className="text-xs text-[#CDBFB6]">MegaCharge Owner Desk · Mon–Sat, 10am to 7pm IST</small>
              </div>
            </div>
            <div className="flex gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => openWhatsApp("Hi, I want to schedule a call regarding the live 7.4 kW station.")}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EE8A33] to-[#C4600F] text-white font-montserrat font-bold text-xs uppercase tracking-wider"
              >
                Schedule a call
              </button>
              <button
                type="button"
                onClick={() => openWhatsApp()}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-[#6B5A52] text-white font-montserrat font-bold text-xs uppercase tracking-wider hover:border-white"
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          STEP 03: ABOUT THIS STATION (8 FACTS)
         ========================================== */}
      <section className="max-w-[1080px] mx-auto px-6 py-12">
        <div className="mb-6">
          <span className="text-xs font-mono font-bold text-[#C4600F] uppercase tracking-wider block mb-1">
            Step 03
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-montserrat text-[#2B1D1A] uppercase">
            About this station
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-white border border-[#ECE6DF] rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-mono uppercase font-bold text-[#C4600F]">Where it is</span>
            <div className="text-sm sm:text-base font-extrabold text-[#2B1D1A] mt-1 font-montserrat">{STATION_CONFIG.location}</div>
            <div className="text-xs text-[#766A63] mt-1">High-end residential society &amp; commercial zone</div>
          </div>

          <div className="bg-white border border-[#ECE6DF] rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-mono uppercase font-bold text-[#C4600F]">Power rating</span>
            <div className="text-base sm:text-lg font-extrabold text-[#2B1D1A] mt-1 font-montserrat">7.4 kW AC</div>
            <div className="text-xs text-[#766A63] mt-1">Universal Type 2 connector (fits all Indian EVs)</div>
          </div>

          <div className="bg-white border border-[#ECE6DF] rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-mono uppercase font-bold text-[#C4600F]">Working uptime</span>
            <div className="text-base sm:text-lg font-extrabold text-[#2B1D1A] mt-1 font-montserrat">99.5%</div>
            <div className="text-xs text-[#766A63] mt-1">Cloud monitored 24×7 with proactive alerting</div>
          </div>

          <div className="bg-white border border-[#ECE6DF] rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-mono uppercase font-bold text-[#C4600F]">Energy dispensed</span>
            <div className="text-base sm:text-lg font-extrabold text-[#2B1D1A] mt-1 font-montserrat">~62 kWh / day</div>
            <div className="text-xs text-[#766A63] mt-1">Average daily throughput as modelled for this site</div>
          </div>

          <div className="bg-white border border-[#ECE6DF] rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-mono uppercase font-bold text-[#C4600F]">Charging price</span>
            <div className="text-base sm:text-lg font-extrabold text-[#2B1D1A] mt-1 font-montserrat">₹11 / unit</div>
            <div className="text-xs text-[#766A63] mt-1">Current public charging tariff paid by drivers</div>
          </div>

          <div className="bg-white border border-[#ECE6DF] rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-mono uppercase font-bold text-[#C4600F]">Electrical efficiency</span>
            <div className="text-base sm:text-lg font-extrabold text-[#2B1D1A] mt-1 font-montserrat">97%</div>
            <div className="text-xs text-[#766A63] mt-1">Minimal transmission loss with CE grade isolation</div>
          </div>

          <div className="bg-white border border-[#ECE6DF] rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-mono uppercase font-bold text-[#C4600F]">Hardware model</span>
            <div className="text-sm font-extrabold text-[#2B1D1A] mt-1 font-montserrat">{STATION_CONFIG.hardware}</div>
            <div className="text-xs text-[#766A63] mt-1">Wi-Fi, Bluetooth, 4G, and RFID tap card</div>
          </div>

          <div className="bg-white border border-[#ECE6DF] rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-mono uppercase font-bold text-[#C4600F]">Hardware warranty</span>
            <div className="text-sm font-extrabold text-[#1E8A4C] mt-1 font-montserrat">3 Years Full</div>
            <div className="text-xs text-[#766A63] mt-1">Comprehensive equipment replacement warranty</div>
          </div>
        </div>
      </section>

      {/* ==========================================
          STEP 04 & 05: COST & ESCROW PROTECTION
         ========================================== */}
      <section className="max-w-[1080px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Step 04: What ₹39,990 covers */}
          <div className="lg:col-span-5 bg-white border border-[#ECE6DF] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#C4600F] uppercase tracking-wider block mb-1">
                Step 04
              </span>
              <h2 className="text-lg font-black font-montserrat text-[#2B1D1A] uppercase mb-4">
                What your {inr(STATION_CONFIG.price)} covers
              </h2>

              <div className="font-mono text-xs space-y-3">
                <div className="flex justify-between py-2 border-b border-[#ECE6DF]">
                  <span className="text-[#766A63]">The 7.4 kW smart charger</span>
                  <span className="font-bold text-[#2B1D1A]">₹29,990</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#ECE6DF]">
                  <span className="text-[#766A63]">Tap-cards &amp; smart gateway</span>
                  <span className="font-bold text-[#2B1D1A]">₹5,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#ECE6DF]">
                  <span className="text-[#766A63]">Wall mount &amp; 5m heavy cable</span>
                  <span className="font-bold text-[#2B1D1A]">₹5,000</span>
                </div>
                <div className="flex justify-between pt-3 border-t-2 border-[#2B1D1A] font-montserrat font-extrabold text-sm">
                  <span>Total cost</span>
                  <span className="text-[#C4600F]">{inr(STATION_CONFIG.price)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openWhatsApp("Hi, please share the valuation and audit report for the 7.4 kW live station.")}
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#C4600F] hover:underline"
            >
              See the valuation and audit report &rarr;
            </button>
          </div>

          {/* Step 05: Your money stays protected */}
          <div className="lg:col-span-7 bg-white border border-[#ECE6DF] rounded-2xl p-6 shadow-sm">
            <span className="text-xs font-mono font-bold text-[#C4600F] uppercase tracking-wider block mb-1">
              Step 05
            </span>
            <h2 className="text-lg font-black font-montserrat text-[#2B1D1A] uppercase mb-4">
              Your money stays protected
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF7F3] border border-[#ECE6DF] flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FDF1E6] flex items-center justify-center text-[#C4600F] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#2B1D1A]">Dedicated ICICI escrow</h3>
                  <p className="text-[11px] text-[#766A63] mt-1 leading-normal">
                    You pay into a dedicated escrow account, never into general company accounts.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F3] border border-[#ECE6DF] flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FDF1E6] flex items-center justify-center text-[#C4600F] shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#2B1D1A]">Independent trustee check</h3>
                  <p className="text-[11px] text-[#766A63] mt-1 leading-normal">
                    A regulated trustee releases funds only after physical station commissioning is verified.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F3] border border-[#ECE6DF] flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FDF1E6] flex items-center justify-center text-[#C4600F] shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#2B1D1A]">Raw hardware meter telemetry</h3>
                  <p className="text-[11px] text-[#766A63] mt-1 leading-normal">
                    Units sold are logged straight from the MID-certified meter, giving you audit-proof facts.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F3] border border-[#ECE6DF] flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FDF1E6] flex items-center justify-center text-[#C4600F] shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#2B1D1A]">Easy liquidity exit</h3>
                  <p className="text-[11px] text-[#766A63] mt-1 leading-normal">
                    Exit anytime. We match you with an active buyer and disburse cash within 7 working days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FAQ SECTION
         ========================================== */}
      <section className="max-w-[760px] mx-auto px-6 py-12">
        <div className="mb-6 text-center">
          <span className="text-xs font-mono font-bold text-[#C4600F] uppercase tracking-wider block mb-1">
            Good to know
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-montserrat text-[#2B1D1A] uppercase">
            Questions people ask us
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#ECE6DF] rounded-xl overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-[#2B1D1A] text-sm hover:bg-[#FAF7F3] transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-lg text-[#C4600F] font-mono shrink-0">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-[#766A63] leading-relaxed border-t border-[#ECE6DF]/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          EXPLORE MORE STATIONS
         ========================================== */}
      <section className="max-w-[1080px] mx-auto px-6 py-6">
        <div className="mb-6">
          <span className="text-xs font-mono font-bold text-[#C4600F] uppercase tracking-wider block mb-1">
            Explore more
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-montserrat text-[#2B1D1A] uppercase">
            Other live stations for sale
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <article className="bg-white border border-[#ECE6DF] rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:border-[#EE8A33] transition-all">
            <div className="w-28 h-28 bg-[#FAF7F3] rounded-xl p-2 flex items-center justify-center shrink-0 border border-[#ECE6DF]/60">
              <img src={acChargerReal} alt="11 kW Wallbox" className="max-h-24 w-auto object-contain" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#C4600F] block">
                  3-Phase AC · 11 kW
                </span>
                <h3 className="text-sm font-bold text-[#2B1D1A] mt-0.5">
                  MegaCharge Premium 11 kW AC Wallbox
                </h3>
                <div className="text-[11px] text-[#766A63] mt-1">Sector 29, Gurgaon · 99.5% uptime</div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#ECE6DF]">
                <span className="text-sm font-black font-montserrat text-[#2B1D1A]">₹54,990</span>
                <Link
                  to="/chargers/ac11"
                  className="px-3 py-1.5 rounded-lg bg-[#FDF1E6] text-[#C4600F] text-xs font-bold hover:bg-[#EE8A33] hover:text-white transition-all font-montserrat"
                >
                  View station &rarr;
                </Link>
              </div>
            </div>
          </article>

          <article className="bg-white border border-[#ECE6DF] rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:border-[#EE8A33] transition-all">
            <div className="w-28 h-28 bg-[#FAF7F3] rounded-xl p-2 flex items-center justify-center shrink-0 border border-[#ECE6DF]/60">
              <img src={dcCharger} alt="22 kW Commercial" className="max-h-24 w-auto object-contain" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#C4600F] block">
                  Dual AC Pillar · 22 kW
                </span>
                <h3 className="text-sm font-bold text-[#2B1D1A] mt-0.5">
                  MegaCharge Dual 22 kW AC Commercial
                </h3>
                <div className="text-[11px] text-[#766A63] mt-1">NH-44 Highway Strip · 99.0% uptime</div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#ECE6DF]">
                <span className="text-sm font-black font-montserrat text-[#2B1D1A]">₹89,990</span>
                <Link
                  to="/chargers/ac22"
                  className="px-3 py-1.5 rounded-lg bg-[#FDF1E6] text-[#C4600F] text-xs font-bold hover:bg-[#EE8A33] hover:text-white transition-all font-montserrat"
                >
                  View station &rarr;
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ==========================================
          BOTTOM STICKY BUY BAR
         ========================================== */}
      <div className={`sticky-buy-bar ${showStickyBar ? 'visible' : ''}`}>
        <div className="max-w-[1080px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="text-xs text-[#5A4E48]">
            <b className="text-base font-black font-montserrat text-[#2B1D1A] mr-2">
              {inr(STATION_CONFIG.price)}
            </b>
            Live 7.4 kW station · <span className="font-semibold text-[#C4600F]">~{inr(monthlyPayout)}/mo</span> · payback <span className="font-bold text-[#2B1D1A]">~18 mo</span>
          </div>
          <button
            type="button"
            onClick={() => setIsBuyModalOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#EE8A33] to-[#C4600F] text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all"
          >
            Buy now
          </button>
        </div>
      </div>

      {/* ==========================================
          BUY ESCROW DIALOG MODAL
         ========================================== */}
      <AnimatePresence>
        {isBuyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#ECE6DF] text-[#2B1D1A]"
            >
              <button
                type="button"
                onClick={() => setIsBuyModalOpen(false)}
                className="absolute right-5 top-5 w-8 h-8 rounded-full bg-[#FAF7F3] flex items-center justify-center text-[#766A63] hover:text-[#2B1D1A]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-xl font-black font-montserrat uppercase">
                Acquire Live Station
              </h2>
              <p className="text-xs text-[#766A63] mt-1">
                You are purchasing an active earning charging station with registered title.
              </p>

              {/* Order Summary Box */}
              <div className="bg-[#2B1D1A] text-white rounded-2xl p-4 my-5 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#CDBFB6]">Live 7.4 kW station</span>
                  <b className="text-white text-sm">{inr(STATION_CONFIG.price)}</b>
                </div>
                <div className="flex justify-between text-[#F6A460]">
                  <span>Year-one payout target</span>
                  <b>~{inr(monthlyPayout)}/month</b>
                </div>
                <div className="flex justify-between text-[#1E8A4C]">
                  <span>Target payback duration</span>
                  <b>~18 months</b>
                </div>
              </div>

              {/* What happens next */}
              <div className="space-y-2 text-xs text-[#5A4E48] mb-5">
                <p className="font-bold text-[#2B1D1A] uppercase tracking-wider text-[11px] font-mono">
                  What happens next:
                </p>
                <ol className="list-decimal pl-4 space-y-1.5 leading-relaxed">
                  <li>You pay securely into the designated ICICI escrow account.</li>
                  <li>We register the station hardware title in your name and dispatch legal documents.</li>
                  <li>Your live monitoring dashboard activates and payouts commence the following month.</li>
                </ol>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <label className="flex items-start gap-3 text-xs text-[#5A4E48] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#C4600F] rounded"
                  />
                  <span>
                    I have read the offer summary and understand that station payouts depend on electricity throughput and are not a guaranteed deposit return.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!isAgreed}
                  className={`w-full py-3.5 rounded-xl font-montserrat font-bold text-xs uppercase tracking-wider shadow-lg transition-all ${
                    isAgreed
                      ? 'bg-gradient-to-r from-[#EE8A33] to-[#C4600F] text-white hover:brightness-105'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Continue to escrow payment &rarr;
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveStationPage;
