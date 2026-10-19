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
import zenergize120 from '../../assets/zenergize_120.jpg';
import zenergize240 from '../../assets/zenergize_240.jpg';
import agraStationCloseup from '../../assets/agra_station_closeup.jpg';

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
      id: 'agra-expressway',
      code: 'MC-101',
      type: 'dc',
      isComingSoon: false,
      name: 'MC-101 | Agra Expressway Hub (180 kW)',
      power: '180 kW Dual Fast Charging',
      voltage: '415V Dedicated HT Grid',
      connector: 'Dual CCS2 High-Power Guns',
      efficiency: '97.2%',
      features: ['Safexpress guaranteed corporate demand', 'Diwali Price: ₹40 L + GST (Save ₹2.5 L)', '5-Yr Net Earnings: ₹105–140 Lakh', '1.4–2 yrs payback · 43–64% IRR'],
      usage: 'Prem Vehicles Pvt Ltd, Agra (Agra Expressway Corridor)',
      image: agraStationCloseup
    },
    {
      id: 'yamuna-expressway',
      code: 'MC-102',
      type: 'dc',
      isComingSoon: true,
      name: 'MC-102 | Yamuna Expressway Super Hub (240 kW)',
      power: '240 kW Combined Hyper Charging',
      voltage: '415V HT Dedicated Transformer',
      connector: 'Quad CCS2 Liquid-Cooled Guns',
      efficiency: '97.5%',
      features: ['Coming Soon · Pre-Registration Open', 'Jewar Airport freight logistics link', 'Expected 5-Yr Net Earnings: ₹135–175 Lakh', '1.3–1.8 yrs payback · 46–68% IRR'],
      usage: 'Jewar Logistics Interchange, Yamuna Expressway Milestone 68',
      image: zenergize240
    },
    {
      id: 'delhi-mumbai-expressway',
      code: 'MC-103',
      type: 'dc',
      isComingSoon: true,
      name: 'MC-103 | Delhi-Mumbai Expressway Hub (120 kW)',
      power: '120 kW Dual Fast Charging',
      voltage: '415V Three Phase Industrial Grid',
      connector: 'Dual CCS2 Fast Guns',
      efficiency: '96.8%',
      features: ['Coming Soon · Pre-Registration Open', 'NE-4 Greenfield corridor wayside hub', 'Expected 5-Yr Net Earnings: ₹82–110 Lakh', '1.5–2.1 yrs payback · 40–60% IRR'],
      usage: 'NE-4 Delhi-Mumbai Expressway Km 112, Wayside Rest Area',
      image: zenergize120
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
    : activeTab === 'ultra'
      ? CHARGERS_DATA.filter(c => c.id === 'yamuna-expressway' || c.id === 'agra-expressway')
      : CHARGERS_DATA.filter(c => c.id === 'delhi-mumbai-expressway');

  return (
    <div className="products-page-container overflow-hidden bg-slate-50 min-h-screen">
         {/* HEADER SECTION (DARK GRADIENT WITH GLOW) */}
      <section className="w-full bg-megacharge-dark pt-44 sm:pt-48 pb-20 px-6 text-center text-white relative border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold font-montserrat leading-tight tracking-tight">
            High-Speed Expressway <br />
            <span className="text-gradient-green">Charging Hubs</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mt-6">
            Explore live and operational high-power EV charging terminals on India's busiest highway corridors. Co-own a verified high-yield charging asset with guaranteed uptime and monthly revenue payouts.
          </p>
 
          {/* TABS SELECTOR */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${activeTab === 'all' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-navy border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              All Expressway Hubs (3)
            </button>
            <button 
              onClick={() => setActiveTab('ultra')}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${activeTab === 'ultra' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-navy border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              Ultra &amp; Hyper (180 kW - 240 kW)
            </button>
            <button 
              onClick={() => setActiveTab('dual')}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${activeTab === 'dual' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-navy border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              Dual Fast (120 kW)
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
                    {charger.isComingSoon ? (
                      <span className="px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
                        Coming Soon
                      </span>
                    ) : (
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${charger.type === 'ac' ? 'bg-megacharge-green bg-opacity-10 text-megacharge-green' : 'bg-megacharge-orange bg-opacity-10 text-megacharge-orange'}`}>
                        {charger.type === 'ac' ? 'AC Wallbox' : 'DC Rapid'}
                      </span>
                    )}
                    <span className="text-slate-400 text-xs font-mono">{charger.power}</span>
                  </div>
                  
                  {/* Product Charger Image */}
                  <Link to={`/chargers/${charger.id}`} className="block w-full h-64 mb-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm relative group bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
                    <img 
                      src={charger.image || (charger.type === 'ac' ? acCharger : dcCharger)} 
                      alt={charger.name} 
                      className="h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    />
                    {charger.isComingSoon && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-md">
                        Coming Soon
                      </div>
                    )}
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
                        <span className={charger.isComingSoon ? 'text-amber-500' : (charger.type === 'ac' ? 'text-megacharge-green' : 'text-megacharge-orange')}>&bull;</span>
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
                    className={`w-full inline-flex items-center justify-center gap-2 font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-sm ${
                      charger.isComingSoon 
                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200' 
                        : 'bg-gradient-to-r from-megacharge-brand to-megacharge-orange-dk text-white hover:shadow-glow-orange'
                    }`}
                  >
                    {charger.isComingSoon ? 'Coming Soon · Pre-Register →' : 'View Full Specifications & Pricing →'}
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
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 pb-4">
                <th className="py-4 text-xs font-mono uppercase tracking-wider text-megacharge-green font-bold pl-4">Specification Matrix</th>
                <th className="py-4 text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">Delhi-Mumbai (120 kW)</th>
                <th className="py-4 text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">Agra Expway (180 kW)</th>
                <th className="py-4 text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">Yamuna Expway (240 kW)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-mono">
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">Max Output Power</td>
                <td className="py-4">120 kW Rapid</td>
                <td className="py-4">180 kW Ultra</td>
                <td className="py-4">240 kW Hyper Power</td>
              </tr>
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">Grid Connection Input</td>
                <td className="py-4">Three Phase (415V)</td>
                <td className="py-4">Dedicated HT Transformer (415V)</td>
                <td className="py-4">Dedicated HT Transformer (415V)</td>
              </tr>
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">Standard Connectors</td>
                <td className="py-4">Dual CCS2 Fast Guns</td>
                <td className="py-4">Triple CCS2 Liquid Guns</td>
                <td className="py-4">Quad CCS2 Liquid 500A Guns</td>
              </tr>
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">Conversion Efficiency</td>
                <td className="py-4">96.8%</td>
                <td className="py-4">97.0%</td>
                <td className="py-4">97.5%</td>
              </tr>
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">Cooling & Weathering</td>
                <td className="py-4">IP54 / Heavy Outdoor</td>
                <td className="py-4">IP54 / Liquid-Cooled</td>
                <td className="py-4">IP55 / Active Chiller Unit</td>
              </tr>
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">OCPP Telemetry Server</td>
                <td className="py-4">OCPP 1.6J Cloud Sync</td>
                <td className="py-4">OCPP 1.6J Cloud Sync</td>
                <td className="py-4">OCPP 1.6J Cloud Sync</td>
              </tr>
              <tr>
                <td className="py-4 font-sans text-slate-900 font-bold pl-4">Emergency Surge Buffer</td>
                <td className="py-4">Yes (SPD + Overload)</td>
                <td className="py-4">Yes (SPD + Active fuse)</td>
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
