import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BuildingIcon, HomeIcon, TruckIcon } from '../../components/CustomIcons/CustomIcons';
import './Solutions.css';

/* ==========================================
   ANIMATION DEFINITIONS
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
  viewport: { once: true },
  transition: { staggerChildren: 0.12 }
};

const Solutions = () => {
  const [activeSegment, setActiveSegment] = useState('commercial'); // 'commercial' | 'residential' | 'fleet'
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', solutionType: 'commercial', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const FAQS = [
    {
      q: "What electrical connection parameters are required for solutions?",
      a: "AC Wallbox installations require standard single-phase 230V or three-phase 415V domestic grids. High-power DC chargers (30kW - 180kW) require a dedicated LT/HT three-phase commercial connection with appropriate grid sanction load."
    },
    {
      q: "How does the revenue-sharing payout schedule operate?",
      a: "Under the FOCO model, MegaCharge installs the meters. Telemetry automatically tallies the kWh dispensed. Earnings are calculated dynamically based on local utility slab tariffs, and payouts are disbursed directly to your bank account within the first 7 days of each month."
    },
    {
      q: "Can the local housing society admin customize user charging tariffs?",
      a: "Yes. Using the Society Admin Portal dashboard, admins can set differential tariffs (e.g. baseline rates for residents, higher rates for visitors) and distribute RFID swipe authorization cards."
    },
    {
      q: "What happens if a charger goes offline or has a coupler jam?",
      a: "Our NOC diagnostic telemetry center runs 24x7 monitoring. Jammed couplers or network drops trigger an automatic reset command. Physical faults are assigned to a localized MNIL field engineer, resolving under 24 hours."
    }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
    }
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="solutions-page-container bg-slate-50 min-h-screen">
      
      {/* HEADER SECTION (DARK GRADIENT WITH GLOW) */}
      <section className="w-full bg-megacharge-dark pt-32 pb-20 px-6 text-center text-white border-b border-slate-800 relative">
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-poppins">
            EV Charging Grid for <span className="text-gradient-green">Every Vertical</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
            From commercial parking properties to residential housing societies and delivery logistics fleets, we design and rent out tailored EV charging installations.
          </p>

          {/* TABS SELECTOR */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <button 
              onClick={() => setActiveSegment('commercial')}
              className={`px-6 py-3 rounded-full font-semibold text-xs flex items-center gap-2 transition-all duration-300 ${activeSegment === 'commercial' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-navy border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              <BuildingIcon className="w-4 h-4" /> Commercial Properties
            </button>
            <button 
              onClick={() => setActiveSegment('residential')}
              className={`px-6 py-3 rounded-full font-semibold text-xs flex items-center gap-2 transition-all duration-300 ${activeSegment === 'residential' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-navy border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              <HomeIcon className="w-4 h-4" /> Residential Societies
            </button>
            <button 
              onClick={() => setActiveSegment('fleet')}
              className={`px-6 py-3 rounded-full font-semibold text-xs flex items-center gap-2 transition-all duration-300 ${activeSegment === 'fleet' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-navy border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              <TruckIcon className="w-4 h-4" /> Logistics & Fleet Depots
            </button>
          </div>
        </div>
      </section>

      {/* CORE SOLUTIONS CONTENT */}
      <section className="max-w-7xl mx-auto py-20 px-6 text-slate-900">
        
        {/* TAB 1: COMMERCIAL */}
        {activeSegment === 'commercial' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <h2 className="text-slate-900 text-3xl font-extrabold font-poppins">Commercial & CPO Infrastructure</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Unlock new revenue models for shopping complexes, tech parks, hotels, and highway food courts. We supply and rent OCPP-enabled dual-gun DC chargers that process automated QR/UPI digital payments without manual billing efforts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <h4 className="text-slate-900 font-bold text-sm mb-1.5">Automated UPI Billing</h4>
                  <p className="text-slate-600 text-xs">
                    Users scan the QR plate, pay through UPI, and start charging. Grid billing handles GST instantly.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <h4 className="text-slate-900 font-bold text-sm mb-1.5">Customer Attraction</h4>
                  <p className="text-slate-600 text-xs">
                    High-power fast chargers make your location a critical hub on maps, increasing vehicle footfall.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm text-slate-900">
              <h4 className="text-slate-900 font-extrabold text-lg mb-4">Commercial Suitability</h4>
              <ul className="flex flex-col gap-3 text-xs text-slate-600">
                <li className="flex items-center gap-2 border-b border-slate-100 pb-2.5">💼 IT Parks & Office Complexes</li>
                <li className="flex items-center gap-2 border-b border-slate-100 pb-2.5">🏨 Hotels, Resorts, & Banquets</li>
                <li className="flex items-center gap-2 border-b border-slate-100 pb-2.5">🛍️ Retail Malls & Hypermarkets</li>
                <li className="flex items-center gap-2">🍽️ Highway Food Courtyards</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: RESIDENTIAL */}
        {activeSegment === 'residential' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <h2 className="text-slate-900 text-3xl font-extrabold font-poppins">Housing Societies & Private Villas</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Empower your residents with app-controlled AC wallboxes. Our multi-billing RFID system allows cooperative societies to allocate energy tariffs per flat/resident, preventing billing disputes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <h4 className="text-slate-900 font-bold text-sm mb-1.5">RFID Swipe Authorization</h4>
                  <p className="text-slate-600 text-xs">
                    Locks the port automatically. Swiping the correct card unlocks power, preventing unauthorized usage.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <h4 className="text-slate-900 font-bold text-sm mb-1.5">Society Admin Dashboard</h4>
                  <p className="text-slate-600 text-xs">
                    Tracks individual power usage records on the web portal to aggregate flat bills easily.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm text-slate-900">
              <h4 className="text-slate-900 font-extrabold text-lg mb-4">Residential Suitability</h4>
              <ul className="flex flex-col gap-3 text-xs text-slate-600">
                <li className="flex items-center gap-2 border-b border-slate-100 pb-2.5">🏡 Individual Luxury Villas</li>
                <li className="flex items-center gap-2 border-b border-slate-100 pb-2.5">🏢 Multi-story Apartment Societies</li>
                <li className="flex items-center gap-2 border-b border-slate-100 pb-2.5">🏡 Gated Residential Townships</li>
                <li className="flex items-center gap-2">🛋️ Cooperative Housing Projects</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: FLEET */}
        {activeSegment === 'fleet' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <h2 className="text-slate-900 text-3xl font-extrabold font-poppins">Logistics Yards & Fleet Depots</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Engineered for logistics carriers, delivery fleets, and corporate transit buses. Our smart load management system prevents utility overloads by distributing power dynamically across multiple active bays.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <h4 className="text-slate-900 font-bold text-sm mb-1.5">Intelligent Dynamic Sharing</h4>
                  <p className="text-slate-600 text-xs">
                    Throttles power output when multiple delivery vans connect, keeping grid connection costs optimal.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <h4 className="text-slate-900 font-bold text-sm mb-1.5">24x7 Diagnostic Uptime</h4>
                  <p className="text-slate-600 text-xs">
                    Continuous remote monitoring guarantees that your delivery vans charge overnight without failure.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm text-slate-900">
              <h4 className="text-slate-900 font-extrabold text-lg mb-4">Fleet Suitability</h4>
              <ul className="flex flex-col gap-3 text-xs text-slate-600">
                <li className="flex items-center gap-2 border-b border-slate-100 pb-2.5">📦 E-commerce Delivery Yards</li>
                <li className="flex items-center gap-2 border-b border-slate-100 pb-2.5">🚌 Employee Transit Bus Plazas</li>
                <li className="flex items-center gap-2 border-b border-slate-100 pb-2.5">🚛 Last-mile Electric fleets</li>
                <li className="flex items-center gap-2">🚕 Corporate Taxi Operator Hubs</li>
              </ul>
            </div>
          </div>
        )}

      </section>

      {/* ROADMAP SECTION (PROCESS ROADMAP) */}
      <section className="py-24 px-6 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-slate-900 text-3xl font-extrabold">Installation Roadmap to Launch</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
              We guide you from property evaluation to full commissioning and digital deployment launch.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <span className="text-megacharge-green font-bold text-2xl mb-3 block">01. Site Survey</span>
              <h4 className="text-slate-900 font-extrabold text-sm mb-2">Feasibility Audit</h4>
              <p className="text-slate-600 text-xs leading-relaxed">MNIL field engineers conduct structural assessments and electrical check audits.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <span className="text-megacharge-green font-bold text-2xl mb-3 block">02. Design Approval</span>
              <h4 className="text-slate-900 font-extrabold text-sm mb-2">Technical Blueprint</h4>
              <p className="text-slate-600 text-xs leading-relaxed">We outline optimal charger configurations, cabling metrics, and safety isolators.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <span className="text-megacharge-green font-bold text-2xl mb-3 block">03. Deployment</span>
              <h4 className="text-slate-900 font-extrabold text-sm mb-2">Civil Works & Mounts</h4>
              <p className="text-slate-600 text-xs leading-relaxed">We pour structural base blocks, install couplers, and wire the terminals safely.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <span className="text-megacharge-green font-bold text-2xl mb-3 block">04. Telemetry Sync</span>
              <h4 className="text-slate-900 font-extrabold text-sm mb-2">Live Cloud Config</h4>
              <p className="text-slate-600 text-xs leading-relaxed">We map the terminal to public directories and connect cloud OCPP billing grids.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS FAQs */}
      <section className="max-w-4xl mx-auto py-24 px-6">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-slate-900 text-3xl font-extrabold">Deployment & Installation FAQs</h2>
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
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
              >
                <span className="text-slate-900 font-extrabold text-sm sm:text-base">{faq.q}</span>
                <span className="text-megacharge-green text-xl font-bold">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              
              <div 
                className={`faq-answer-container transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-[300px] border-t border-slate-100 p-6' : 'max-h-0'}`}
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

      {/* SOLUTIONS ENQUIRY FORM */}
      <section className="max-w-3xl mx-auto pb-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-5 blur-3xl pointer-events-none" />
        
        <motion.div 
          {...fadeInUp}
          className="premium-glass-card-dark p-8 md:p-12 rounded-3xl border border-megacharge-green border-opacity-25 flex flex-col gap-8 shadow-glow-green text-white relative z-10"
        >
          <div className="text-center md:text-left border-b border-slate-800 pb-6">
            <h3 className="text-white text-3xl font-extrabold leading-tight">Request Infrastructure Integration</h3>
            <p className="text-slate-300 text-sm leading-relaxed mt-2">
              Submit your property details below. A regional manager will schedule a physical survey with load capacity audits.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 border border-green-500 border-opacity-40 rounded-2xl bg-green-500 bg-opacity-5 text-center w-full">
              <span className="text-4xl block mb-4">🎉</span>
              <h4 className="text-white text-xl font-bold mb-2">Request Submitted Successfully!</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Thank you. A field coordinator has been assigned to your query and will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 w-full text-slate-900">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name" 
                    className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 99999 99999" 
                    className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Select Vertical Segment *</label>
                <select 
                  value={formData.solutionType}
                  onChange={(e) => setFormData({...formData, solutionType: e.target.value})}
                  className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors font-mono cursor-pointer"
                >
                  <option value="commercial" className="bg-megacharge-dark">Commercial Complex / Hotel / Restaurant</option>
                  <option value="residential" className="bg-megacharge-dark">Housing Society / Residential Villa</option>
                  <option value="fleet" className="bg-megacharge-dark">Logistics Yard / Fleet Depot</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Deployment Site Notes</label>
                <textarea 
                  rows="3" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Provide approximate space dimensions, existing electricity load details, or other notes..." 
                  className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full text-center bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-xs py-4 rounded-xl transition-all duration-300 mt-2 block shadow-glow-green"
              >
                Submit Solutions Request &rarr;
              </button>
            </form>
          )}
        </motion.div>
      </section>

    </div>
  );
};

export default Solutions;
