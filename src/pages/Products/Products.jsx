import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneIcon } from '../../components/CustomIcons/CustomIcons';
import './Products.css';

// Import images
import acCharger from '../../assets/ac_charger.png';
import dcCharger from '../../assets/dc_charger.png';

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

const Products = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'ac' | 'dc'
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', chargerType: 'ac7', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const CHARGERS_DATA = [
    {
      id: 'ac7',
      type: 'ac',
      name: 'MegaCharge 7.4 kW AC Smart Box',
      power: '7.4 kW (Single Phase 32A)',
      voltage: '230V AC ± 15%',
      connector: 'Type 2 plug with 5m cable',
      efficiency: '97%',
      features: ['RFID Authorization', 'Wi-Fi / Bluetooth Integration', 'App Schedule Control', 'Ergonomic Wall Mount'],
      usage: 'Residential housing, private villa parking, workplace grids'
    },
    {
      id: 'dc30',
      type: 'dc',
      name: 'MegaCharge 30 kW DC Compact Rapid',
      power: '30 kW (Three Phase)',
      voltage: '415V AC ± 10%',
      connector: 'Single CCS2 Gun',
      efficiency: '95%',
      features: ['OCPP 1.6 cloud sync', 'Intelligent power distribution', '7-inch LCD interface', 'Emergency stop mechanism'],
      usage: 'Office fleet yards, retail store side-bays, hotel valet parking'
    },
    {
      id: 'dc60',
      type: 'dc',
      name: 'MegaCharge 60 kW Dual Gun DC Charger',
      power: '60 kW (Three Phase split)',
      voltage: '415V AC ± 10%',
      connector: 'Dual CCS2 Guns',
      efficiency: '96%',
      features: ['OCPP 1.6 telemetry', 'Dynamic output sharing', 'Unified UPI QR code billing', 'IP54 weather protection'],
      usage: 'Highway food courts, large retail malls, public transit bays'
    },
    {
      id: 'dc180',
      type: 'dc',
      name: 'MegaCharge 120 kW - 180 kW Dual Gun DC Charger',
      power: '120 kW - 180 kW Ultra Power',
      voltage: '415V AC ± 10%',
      connector: 'Dual CCS2 High-Power Guns',
      efficiency: '96.5%',
      features: ['Liquid-cooled rectifiers', 'Fast charge up to 180 kW', '24x7 remote diagnostics', 'Custom brand wrappers'],
      usage: 'Highway charging stations, logistics vehicle depots, heavy transport hubs'
    }
  ];

  const FAQS = [
    {
      q: "Can I upgrade a rented AC charger to a DC fast charger later?",
      a: "Yes, you can upgrade your rented hardware. When power capacity limits allow, our engineering team handles the cable alterations, civil grid adjustments, and upgrades to a higher DC output terminal dynamically."
    },
    {
      q: "Are the Type-2 and CCS-2 connectors compatible with all cars in India?",
      a: "Absolutely. Type-2 (for AC charging) and CCS-2 (for DC fast charging) are the official national standards in India, universally compatible with Tata, MG, BYD, Hyundai, Mahindra, and luxury European EV models."
    },
    {
      q: "Who bears the cost of standard maintenance and software telemetry updates?",
      a: "Under our standard rental lease contract, MegaCharge (MNIL) covers 100% of the maintenance, telemetry server connection charges, system upgrades, and physical parts replacements. There are zero operating liabilities on your end."
    },
    {
      q: "What safety certificates do MegaCharge units hold?",
      a: "Our entire product lineup is tested in accordance with international IEC standards, including built-in overvoltage protection, ground fault leakage sensors (RCD), and dynamic temperature monitoring."
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

  const filteredChargers = activeTab === 'all' 
    ? CHARGERS_DATA 
    : CHARGERS_DATA.filter(c => c.type === activeTab);

  return (
    <div className="products-page-container overflow-hidden bg-slate-50 min-h-screen">
         {/* HEADER SECTION (DARK GRADIENT WITH GLOW) */}
      <section className="w-full bg-megacharge-dark pt-32 pb-20 px-6 text-center text-white relative border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold font-poppins leading-none tracking-tight">
            Rent Smart Chargers for <br />
            <span className="text-gradient-green">Your EV Infrastructure</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mt-6">
            Every MegaCharge unit is built to perform reliably in extreme temperatures. Rent our premium chargers on flexible terms with zero upfront setup costs, active grid protection, and remote OCPP telemetry.
          </p>
 
          {/* TABS SELECTOR */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${activeTab === 'all' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-navy border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              Show All Models
            </button>
            <button 
              onClick={() => setActiveTab('ac')}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${activeTab === 'ac' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-navy border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              Smart AC Wallboxes
            </button>
            <button 
              onClick={() => setActiveTab('dc')}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${activeTab === 'dc' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-navy border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              DC Fast Chargers
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS DISPLAY GRID */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredChargers.map((charger) => (
              <motion.div
                layout
                key={charger.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="premium-glass-card p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${charger.type === 'ac' ? 'bg-megacharge-green bg-opacity-10 text-megacharge-green' : 'bg-megacharge-orange bg-opacity-10 text-megacharge-orange'}`}>
                      {charger.type === 'ac' ? 'AC Wallbox' : 'DC Rapid'}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">{charger.power}</span>
                  </div>
                  
                  {/* Product Charger Image */}
                  <div className="w-full h-64 mb-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm relative group bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
                    <img 
                      src={charger.type === 'ac' ? acCharger : dcCharger} 
                      alt={charger.name} 
                      className="h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <h3 className="text-slate-900 text-2xl font-extrabold mb-4">{charger.name}</h3>
                  
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono mb-6 space-y-2 text-slate-600">
                    <div className="flex justify-between">
                      <span>Input Voltage:</span>
                      <span className="text-slate-900 font-bold">{charger.voltage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coupler Port:</span>
                      <span className="text-slate-900 font-bold">{charger.connector}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Efficiency:</span>
                      <span className="text-slate-900 font-bold">{charger.efficiency}</span>
                    </div>
                  </div>

                  <h5 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">Key Integrations:</h5>
                  <ul className="flex flex-col gap-2 mb-8 text-xs text-slate-600 font-mono">
                    {charger.features.map((feat, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className={charger.type === 'ac' ? 'text-megacharge-green' : 'text-megacharge-orange'}>&bull;</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-100 pt-6 mt-6">
                  <span className="text-[10px] text-slate-500 uppercase block font-mono mb-1">Recommended Deployment</span>
                  <span className="text-slate-900 text-xs font-semibold leading-relaxed block">{charger.usage}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* DETAILED TECH MATRIX */}
      <section className="max-w-7xl mx-auto pb-24 px-6">
        <motion.div 
          {...fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-slate-900 text-3xl font-extrabold">Hardware Technical Comparison</h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
            Detailed parameter grid detailing output thresholds, protections, and software configurations for our hardware fleet.
          </p>
        </motion.div>

        <motion.div 
          {...fadeInUp}
          className="overflow-x-auto bg-white rounded-3xl border border-slate-200 p-6 shadow-sm"
        >
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200 pb-4">
                <th className="py-4 text-xs font-mono uppercase tracking-wider text-megacharge-green font-bold pl-4">Specification Matrix</th>
                <th className="py-4 text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">7.4 kW AC Smart</th>
                <th className="py-4 text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">30 kW DC Compact</th>
                <th className="py-4 text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">60 kW DC Dual</th>
                <th className="py-4 text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">180 kW DC Ultra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-mono">
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">Max Output Power</td>
                <td className="py-4">7.4 kW</td>
                <td className="py-4">30 kW</td>
                <td className="py-4">60 kW</td>
                <td className="py-4">120 kW - 180 kW</td>
              </tr>
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">Grid Connection Input</td>
                <td className="py-4">Single Phase (230V)</td>
                <td className="py-4">Three Phase (415V)</td>
                <td className="py-4">Three Phase (415V)</td>
                <td className="py-4">Grid Sub-Station (415V)</td>
              </tr>
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">Standard Connectors</td>
                <td className="py-4">Type 2 Cable</td>
                <td className="py-4">Single CCS2 Gun</td>
                <td className="py-4">Dual CCS2 Guns</td>
                <td className="py-4">Dual CCS2 High-Power</td>
              </tr>
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">Conversion Efficiency</td>
                <td className="py-4">97.0%</td>
                <td className="py-4">95.0%</td>
                <td className="py-4">96.0%</td>
                <td className="py-4">96.5%</td>
              </tr>
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">Weather Protection</td>
                <td className="py-4">IP54 / Outdoor</td>
                <td className="py-4">IP54 / Outdoor</td>
                <td className="py-4">IP54 / Outdoor</td>
                <td className="py-4">IP54 / Liquid-Cooled</td>
              </tr>
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">OCPP Telemetry Server</td>
                <td className="py-4">OCPP 1.6 JSON</td>
                <td className="py-4">OCPP 1.6 JSON</td>
                <td className="py-4">OCPP 1.6 JSON</td>
                <td className="py-4">OCPP 1.6 JSON</td>
              </tr>
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">Emergency Surge Buffer</td>
                <td className="py-4">Yes (30mA RCD)</td>
                <td className="py-4">Yes (SPD + Overload)</td>
                <td className="py-4">Yes (SPD + Overload)</td>
                <td className="py-4">Yes (SPD + Active fuse)</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* PRODUCTS FAQ SECTION */}
      <section className="max-w-4xl mx-auto pb-24 px-6">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-slate-900 text-3xl font-extrabold">Charger Hardware FAQs</h2>
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
                <span className="text-slate-700 font-medium text-sm sm:text-base">{faq.q}</span>
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

      {/* CHARGER ENQUIRY FORM (2-COLUMN PREMIUM LAYOUT) */}
      <section className="max-w-7xl mx-auto pb-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-5 blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Left Column: Contact details (Talk to Our Team) */}
          <div className="lg:col-span-6 flex flex-col gap-8 text-slate-900">
            <div>
              <span className="text-megacharge-orange text-xs font-bold uppercase tracking-widest bg-megacharge-orange bg-opacity-5 border border-megacharge-orange border-opacity-20 px-4 py-1.5 rounded-full inline-block mb-3 font-mono">
                Get In Touch
              </span>
              <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold font-poppins leading-none tracking-tight">
                Talk to Our Team
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mt-4">
                Ready to scale your EV charging infrastructure? Speak with our technical team of engineers about installation feasibility, charger operations, OCPP telemetry, or flexible rental quotes.
              </p>
            </div>
            
            {/* Contact details cards */}
            <div className="flex flex-col gap-4">
              {/* Sales Card */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-megacharge-orange hover:shadow-md">
                <div className="p-3 bg-megacharge-orange bg-opacity-10 text-megacharge-orange rounded-xl flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Sales & Corporate</span>
                  <a href="tel:9289555090" className="text-slate-950 font-bold text-sm sm:text-base hover:underline">+91 92895 55090</a>
                </div>
              </div>

              {/* Support Card */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-megacharge-orange hover:shadow-md">
                <div className="p-3 bg-megacharge-orange bg-opacity-10 text-megacharge-orange rounded-xl flex items-center justify-center">
                  <span className="text-lg">✉</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Support & Inquiries</span>
                  <a href="mailto:sales@megacharge.co.in" className="text-slate-950 font-bold text-sm sm:text-base hover:underline">sales@megacharge.co.in</a>
                </div>
              </div>

              {/* Address Card */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-megacharge-orange hover:shadow-md">
                <div className="p-3 bg-megacharge-orange bg-opacity-10 text-megacharge-orange rounded-xl flex items-center justify-center">
                  <span className="text-lg">🏢</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Corporate Headquarters</span>
                  <span className="text-slate-950 font-bold text-xs sm:text-sm">811-812, Aggarwal Cyber Plaza-1, NSP, Pitampura, Delhi 110034</span>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-megacharge-orange hover:shadow-md">
                <div className="p-3 bg-megacharge-orange bg-opacity-10 text-megacharge-orange rounded-xl flex items-center justify-center">
                  <span className="text-lg">💬</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">WhatsApp Support</span>
                  <a href="https://wa.me/919289555090" target="_blank" rel="noopener noreferrer" className="text-slate-950 font-bold text-sm sm:text-base hover:underline">Chat with us now</a>
                </div>
              </div>
            </div>

            {/* Bottom tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full font-semibold">• Direct Grid Alignment</span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full font-semibold">• Live Telemetry Integration</span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full font-semibold">• 24/7 Grid NOC Support</span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full font-semibold">• Zero Maintenance Fees</span>
            </div>
          </div>

          {/* Right Column: Dark Form Card */}
          <div className="lg:col-span-6 w-full">
            <motion.div 
              {...fadeInUp}
              className="premium-glass-card-dark p-8 md:p-10 rounded-3xl border border-megacharge-orange border-opacity-25 flex flex-col gap-6 shadow-glow-orange text-white relative z-10"
            >
              <div className="border-b border-slate-800 pb-4">
                <span className="text-megacharge-orange text-[10px] font-bold uppercase tracking-wider font-mono">Request a Rental</span>
                <h3 className="text-white text-2xl font-extrabold leading-tight mt-1">Request Charger Rental</h3>
                <p className="text-slate-300 text-xs leading-relaxed mt-1">
                  Complete the form below to receive custom quotes and load assessment surveys from MNIL engineers.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 border border-green-500 border-opacity-40 rounded-2xl bg-green-500 bg-opacity-5 text-center w-full">
                  <span className="text-4xl block mb-4">🎉</span>
                  <h4 className="text-white text-lg font-bold mb-2">Request Submitted Successfully!</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Thank you. A technical representative will review your selected model specifications and connect with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4.5 w-full text-slate-900">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your name" 
                        className="bg-megacharge-dark border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-orange transition-colors"
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
                        className="bg-megacharge-dark border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-orange transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Select Charger Model *</label>
                    <select 
                      value={formData.chargerType}
                      onChange={(e) => setFormData({...formData, chargerType: e.target.value})}
                      className="bg-megacharge-dark border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-orange transition-colors cursor-pointer"
                    >
                      <option value="ac7" className="bg-megacharge-dark">7.4 kW AC Smart Box (AC)</option>
                      <option value="dc30" className="bg-megacharge-dark">30 kW DC Compact Rapid (DC)</option>
                      <option value="dc60" className="bg-megacharge-dark">60 kW DC Dual Gun Charger (DC)</option>
                      <option value="dc180" className="bg-megacharge-dark">120 kW - 180 kW DC Ultra Charger (DC)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Deployment Site Notes</label>
                    <textarea 
                      rows="3" 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Provide approximate space dimensions, existing electricity load details, or other notes..." 
                      className="bg-megacharge-dark border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-orange transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full text-center bg-megacharge-orange hover:bg-megacharge-navy text-megacharge-dark hover:text-white font-bold text-xs py-4 rounded-xl transition-all duration-300 mt-2 block shadow-glow-orange uppercase tracking-wider font-mono"
                  >
                    Submit Hardware Request &rarr;
                  </button>
                </form>
              )}

              {/* Form Stats Footer inside Card */}
              <div className="grid grid-cols-3 gap-2 border-t border-slate-800 pt-4 mt-2 text-center">
                <div>
                  <span className="block text-white text-base font-extrabold">500+</span>
                  <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Stations</span>
                </div>
                <div>
                  <span className="block text-white text-base font-extrabold">99.9%</span>
                  <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Uptime SLA</span>
                </div>
                <div>
                  <span className="block text-white text-base font-extrabold">5 MW+</span>
                  <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Power Dispensed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Products;
