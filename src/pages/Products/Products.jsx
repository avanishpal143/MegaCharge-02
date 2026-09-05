import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneIcon } from '../../components/CustomIcons/CustomIcons';
import './Products.css';
import ContactForm from '../../components/ContactForm/ContactForm';

// Import images
import acCharger from '../../assets/ac_charger.png';
import dcCharger from '../../assets/dc_charger.png';
import zenergize60 from '../../assets/zenergize_60.jpg';
import zenergize240 from '../../assets/zenergize_240.jpg';

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
      id: 'nh44-panipat',
      type: 'dc',
      name: 'NH-44 Panipat Hub (2 × 60 kW DC Fast)',
      power: '120 kW Combined DC Fast',
      voltage: '415V AC Three Phase Grid',
      connector: 'Dual CCS2 (4 Guns Total)',
      efficiency: '96.5%',
      features: ['Co-ownership hub model', 'OCPP 1.6 cloud billing', 'High-density highway location', '24x7 MNIL maintenance'],
      usage: 'Highway rest stop, food courts, intercity corridor',
      image: zenergize60
    },
    {
      id: 'agra-expressway',
      type: 'dc',
      name: 'Agra Expressway Hub (180 kW Ultra Fast)',
      power: '180 kW Total Fast Charging',
      voltage: '415V Dedicated HT Grid',
      connector: 'Triple CCS2 Liquid-Cooled Guns',
      efficiency: '97%',
      features: ['High-traffic express corridor', 'Sub-20 min charging', '88% funded', 'Direct monthly NEFT yield'],
      usage: 'Highway Plazas, Expressways, Tourist Corridors',
      image: zenergize60
    },
    {
      id: 'kurukshetra-cluster',
      type: 'ac',
      name: 'Kurukshetra Cluster (4 × 7.4 kW AC)',
      power: '29.6 kW Total Grid Output',
      voltage: '230V / 415V Commercial Grid',
      connector: '4 × Type 2 Sockets',
      efficiency: '97.5%',
      features: ['Destination hotel charging', 'Overnight dwell time', 'Smart RFID cards', 'Zero maintenance liability'],
      usage: 'Hotel, Retail Malls, Commercial Properties',
      image: acCharger
    },
    {
      id: 'raebareli-depot',
      type: 'dc',
      name: 'Rae Bareli Fleet Depot (6 × 30 kW)',
      power: '180 kW Heavy Fleet Grid',
      voltage: '415V Three Phase Industrial',
      connector: '6 × CCS2 High Cycle Guns',
      efficiency: '95.5%',
      features: ['Dedicated logistics fleet', 'Predictable shift charging', 'B2B anchor contracts', '72% funded'],
      usage: 'Fleet & Logistics, Industrial Depots',
      image: dcCharger
    },
    {
      id: 'ac7',
      type: 'ac',
      name: 'MegaCharge 7.4 kW AC Smart Box',
      power: '7.4 kW (Single Phase 32A)',
      voltage: '230V AC ± 15%',
      connector: 'Type 2 plug with 5m cable',
      efficiency: '97%',
      features: ['RFID Authorization', 'Wi-Fi / Bluetooth Integration', 'App Schedule Control', 'Ergonomic Wall Mount'],
      usage: 'Residential housing, private villa parking, workplace grids',
      image: acCharger
    },
    {
      id: 'ac11',
      type: 'ac',
      name: 'MegaCharge Premium 11 kW AC Wallbox',
      power: '11 kW (Three Phase 16A)',
      voltage: '415V AC ± 10%',
      connector: 'Type 2 plug with 5m cable',
      efficiency: '97%',
      features: ['Dynamic Load Balancing', 'Wi-Fi / Bluetooth Integration', 'App Schedule Control', 'Ergonomic Wall Mount'],
      usage: 'Private villas, commercial workplaces, hotels',
      image: acCharger
    },
    {
      id: 'ac22',
      type: 'ac',
      name: 'MegaCharge Dual 22 kW AC Commercial',
      power: '22 kW (Three Phase Split)',
      voltage: '415V AC ± 10%',
      connector: 'Dual Type 2 Sockets',
      efficiency: '97.5%',
      features: ['Dual RFID Authentication', 'OCPP 1.6 Billing System', 'Simultaneous Dual Car Charging', 'Weatherproof Casing'],
      usage: 'Commercial complexes, mall parking, tech parks',
      image: acCharger
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
      usage: 'Office fleet yards, retail store side-bays, hotel valet parking',
      image: dcCharger
    },
    {
      id: 'dc60',
      type: 'dc',
      name: 'MegaCharge 60 kW Dual Gun DC Fast Charger',
      power: '60 kW (Three Phase split)',
      voltage: '415V AC ± 10%',
      connector: 'Dual CCS2 Guns',
      efficiency: '96%',
      features: ['OCPP 1.6 telemetry', 'Dynamic output sharing', 'Unified UPI QR code billing', 'IP54 weather protection'],
      usage: 'Highway food courts, large retail malls, public transit bays',
      image: zenergize60
    },
    {
      id: 'dc120',
      type: 'dc',
      name: 'MegaCharge 120 kW High-Power DC Charger',
      power: '120 kW Ultra Rapid',
      voltage: '415V AC ± 10% LT/HT',
      connector: 'Dual CCS2 High-Power Guns',
      efficiency: '96.5%',
      features: ['Liquid-cooled power modules', 'Sub-20 minute charging', '24x7 remote telemetry', 'Modular power cabinet'],
      usage: 'Highways, logistics depots, transit corridors',
      image: zenergize60
    },
    {
      id: 'dc240',
      type: 'dc',
      name: 'MegaCharge 240 kW Liquid-Cooled Hyper Charger',
      power: '240 kW Ultra Power',
      voltage: '415V AC ± 10%',
      connector: 'Dual CCS2 High-Power Guns',
      efficiency: '96.8%',
      features: ['Liquid-cooled active system', 'Fast charge up to 240 kW', '24x7 remote diagnostics', 'Custom brand wrappers'],
      usage: 'Highway charging stations, logistics vehicle depots, heavy transport hubs',
      image: zenergize240
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
      <section className="w-full bg-megacharge-dark pt-44 sm:pt-48 pb-20 px-6 text-center text-white relative border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold font-montserrat leading-tight tracking-tight">
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
                  <Link to={`/chargers/${charger.id}`} className="block w-full h-64 mb-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm relative group bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
                    <img 
                      src={charger.image || (charger.type === 'ac' ? acCharger : dcCharger)} 
                      alt={charger.name} 
                      className="h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  
                  <Link to={`/chargers/${charger.id}`}>
                    <h3 className="text-slate-900 text-lg sm:text-xl font-bold font-montserrat mb-3 hover:text-megacharge-brand transition-colors line-clamp-1">{charger.name}</h3>
                  </Link>
                  
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
                  <ul className="flex flex-col gap-2 mb-6 text-xs text-slate-600 font-mono">
                    {charger.features.map((feat, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className={charger.type === 'ac' ? 'text-megacharge-green' : 'text-megacharge-orange'}>&bull;</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-100 pt-5 mt-4">
                  <span className="text-[10px] text-slate-500 uppercase block font-mono mb-1">Recommended Deployment</span>
                  <span className="text-slate-900 text-xs font-semibold leading-relaxed block mb-5">{charger.usage}</span>
                  
                  <Link 
                    to={`/chargers/${charger.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-megacharge-brand to-megacharge-orange-dk text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-glow-orange"
                  >
                    View Full Specifications &amp; Pricing &rarr;
                  </Link>
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
          <h2 className="text-slate-900 text-2xl sm:text-3xl font-extrabold font-montserrat">Hardware Technical Comparison</h2>
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
                <th className="py-4 text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">240 kW DC Ultra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-mono">
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">Max Output Power</td>
                <td className="py-4">7.4 kW</td>
                <td className="py-4">30 kW</td>
                <td className="py-4">60 kW</td>
                <td className="py-4">120 kW - 240 kW</td>
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
          <h2 className="text-slate-900 text-2xl sm:text-3xl font-extrabold font-montserrat">Charger Hardware FAQs</h2>
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

      {/* REUSABLE TWO COLUMN CONTACT FORM */}
      <ContactForm />

    </div>
  );
};

export default Products;
