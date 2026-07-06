import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const filteredChargers = activeTab === 'all' 
    ? CHARGERS_DATA 
    : CHARGERS_DATA.filter(c => c.type === activeTab);

  return (
    <div className="products-page-container overflow-hidden bg-slate-50 min-h-screen">
      
      {/* HEADER SECTION (DARK GRADIENT WITH GLOW) */}
      <section className="w-full bg-[#0B132B] pt-32 pb-20 px-6 text-center text-white relative border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-radial from-[#00B4D8] to-transparent opacity-10 blur-3xl pointer-events-none" />
        
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
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${activeTab === 'all' ? 'bg-[#00B4D8] text-white shadow-[0_0_15px_rgba(0,180,216,0.3)]' : 'bg-[#1C2541] border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              Show All Models
            </button>
            <button 
              onClick={() => setActiveTab('ac')}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${activeTab === 'ac' ? 'bg-[#00B4D8] text-white shadow-[0_0_15px_rgba(0,180,216,0.3)]' : 'bg-[#1C2541] border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              Smart AC Wallboxes
            </button>
            <button 
              onClick={() => setActiveTab('dc')}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${activeTab === 'dc' ? 'bg-[#00B4D8] text-white shadow-[0_0_15px_rgba(0,180,216,0.3)]' : 'bg-[#1C2541] border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              DC Fast Chargers
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS DISPLAY LIST */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="flex flex-col gap-12"
        >
          <AnimatePresence mode="wait">
            {filteredChargers.map((charger) => (
              <motion.div 
                key={charger.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="premium-glass-card p-8 md:p-12 rounded-3xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white shadow-sm"
              >
                {/* Visual/Icon Area (Column span 4) */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl aspect-square relative overflow-hidden shadow-inner group">
                  <img 
                    src={charger.type === 'ac' ? acCharger : dcCharger} 
                    alt={charger.name} 
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Description Area (Column span 8) */}
                <div className="lg:col-span-8 flex flex-col justify-between h-full text-slate-900">
                  <div>
                    <span className={`text-xs font-mono font-bold uppercase tracking-widest block mb-2 ${charger.type === 'ac' ? 'text-[#00B4D8]' : 'text-[#FF6B35]'}`}>
                      {charger.type === 'ac' ? 'Level 2 AC Charger // Smart Wallbox' : 'Level 3 DC Charger // Fast Rectifier'}
                    </span>
                    <h3 className="text-slate-900 text-3xl font-extrabold mb-3">{charger.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      Recommended placement: <strong className="text-slate-900">{charger.usage}</strong>. Manufactured with heavy grid safety buffers, dynamic voltage controllers, and instant telemetry reports.
                    </p>

                    {/* Technical Specifications Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 border-t border-b border-slate-200 py-5">
                      <div className="text-xs">
                        <span className="text-slate-500 block mb-1 font-mono uppercase tracking-wider text-[10px]">Maximum Capacity output:</span>
                        <span className="text-slate-900 font-bold">{charger.power}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-slate-500 block mb-1 font-mono uppercase tracking-wider text-[10px]">Required Connection input:</span>
                        <span className="text-slate-900 font-bold">{charger.voltage}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-slate-500 block mb-1 font-mono uppercase tracking-wider text-[10px]">Standard Connectors:</span>
                        <span className="text-slate-900 font-bold">{charger.connector}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-slate-500 block mb-1 font-mono uppercase tracking-wider text-[10px]">Active Protocol stack:</span>
                        <span className="text-slate-900 font-bold font-mono">OCPP 1.6 JSON compliant</span>
                      </div>
                    </div>

                    {/* Bullet Features */}
                    <div className="flex flex-wrap gap-2.5 mb-8">
                      {charger.features.map((feature, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full text-slate-700 font-mono">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Trigger */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <a 
                      href="/contact"
                      className="w-full sm:w-auto text-center btn-premium-green text-white font-bold text-xs px-8 py-4 rounded-full flex items-center justify-center gap-2"
                    >
                      Request Rental Quote &rarr;
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* TECHNICAL COMPARISON MATRIX */}
      <section className="max-w-7xl mx-auto pb-24 px-6 bg-transparent">
        <motion.div 
          {...fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-slate-900 text-3xl sm:text-4xl font-extrabold">Technical Specifications Matrix</h2>
          <p className="text-slate-600 text-sm leading-relaxed mt-4">
            Compare all hardware designs across key grid connection, efficiency, and enclosure metrics side-by-side.
          </p>
        </motion.div>

        <motion.div 
          {...fadeInUp}
          className="overflow-x-auto bg-white rounded-3xl border border-slate-200 p-6 shadow-sm"
        >
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200 pb-4">
                <th className="py-4 text-xs font-mono uppercase tracking-wider text-[#00B4D8] font-bold pl-4">Specification Matrix</th>
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

    </div>
  );
};

export default Products;
