/**
 * ========================================
 * Products Page Component
 * Purpose:
 * Showcases detailed EV charger models,
 * electrical specifications, and ordering info.
 *
 * Developer Notes:
 * Integrates state to toggle between AC/DC tabs.
 *
 * ========================================
 */

import React, { useState } from 'react';
import { ChargerIcon, BoltIcon } from '../../components/CustomIcons/CustomIcons';
import './Products.css';

/* ==========================================
   PRODUCTS COMPONENT
========================================== */

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
      features: ['RFID Authentication', 'Wi-Fi / Bluetooth integration', 'App scheduling', 'Wall-mount bracket'],
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
    <div className="products-page-container bg-megacharge-dark pt-28 pb-20 px-6">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto mb-16 text-center">
        <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest block mb-2">
          Hardware Engineering
        </span>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-poppins">
          Smart Chargers designed for <span className="text-gradient-green">Indian Climates</span>
        </h1>
        <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
          Every MegaCharge unit is tested to perform reliably in extreme temperature gradients. Our systems operate under standard OCPP 1.6 software management.
        </p>

        {/* TABS SELECTOR */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2.5 rounded-full font-semibold text-xs transition-all duration-300 ${activeTab === 'all' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-card border border-megacharge-border text-megacharge-text-secondary hover:text-white'}`}
          >
            Show All Models
          </button>
          <button 
            onClick={() => setActiveTab('ac')}
            className={`px-6 py-2.5 rounded-full font-semibold text-xs transition-all duration-300 ${activeTab === 'ac' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-card border border-megacharge-border text-megacharge-text-secondary hover:text-white'}`}
          >
            Smart AC Wallboxes
          </button>
          <button 
            onClick={() => setActiveTab('dc')}
            className={`px-6 py-2.5 rounded-full font-semibold text-xs transition-all duration-300 ${activeTab === 'dc' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-card border border-megacharge-border text-megacharge-text-secondary hover:text-white'}`}
          >
            DC Fast Chargers
          </button>
        </div>
      </section>

      {/* PRODUCTS DISPLAY LIST */}
      <section className="max-w-7xl mx-auto flex flex-col gap-12">
        {filteredChargers.map((charger) => (
          <div 
            key={charger.id}
            className="glass-panel p-8 md:p-12 rounded-3xl border border-megacharge-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-megacharge-green transition-all duration-300"
          >
            {/* Visual/Icon Area */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 bg-megacharge-dark border border-megacharge-border rounded-2xl aspect-square">
              <div className={`p-6 rounded-full mb-6 ${charger.type === 'ac' ? 'bg-megacharge-green bg-opacity-10 text-megacharge-green' : 'bg-megacharge-orange bg-opacity-10 text-megacharge-orange'}`}>
                {charger.type === 'ac' ? <ChargerIcon className="w-12 h-12" /> : <BoltIcon className="w-12 h-12" />}
              </div>
              <span className="text-white font-mono text-xs uppercase tracking-wider">
                {charger.type === 'ac' ? 'Level 2 AC' : 'Level 3 DC'}
              </span>
              <span className="text-megacharge-text-secondary text-[11px] mt-1 font-mono">
                {charger.efficiency} Efficiency
              </span>
            </div>

            {/* Description Area */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-white text-2xl font-bold mb-2">{charger.name}</h3>
                <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed mb-6">
                  Recommended installation: <strong>{charger.usage}</strong>. Manufactured with heavy electrical shielding to sustain surges.
                </p>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 border-t border-b border-megacharge-border py-4">
                  <div className="text-xs">
                    <span className="text-megacharge-text-secondary block mb-1">Maximum Output Power:</span>
                    <span className="text-white font-bold">{charger.power}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-megacharge-text-secondary block mb-1">Required Connection Voltage:</span>
                    <span className="text-white font-bold">{charger.voltage}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-megacharge-text-secondary block mb-1">Connector Specification:</span>
                    <span className="text-white font-bold">{charger.connector}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-megacharge-text-secondary block mb-1">Network Protocol compatibility:</span>
                    <span className="text-white font-bold">OCPP 1.6 JSON</span>
                  </div>
                </div>

                {/* Bullet Features */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {charger.features.map((feature, i) => (
                    <span key={i} className="text-[10px] bg-megacharge-border px-3 py-1.5 rounded-full text-white border border-opacity-40">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="flex flex-wrap gap-4 items-center">
                <a 
                  href="/contact"
                  className="bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all duration-300 shadow-glow-green flex items-center gap-2"
                >
                  Request Commercial Proposal &rarr;
                </a>
                <a 
                  href="/contact"
                  className="border border-megacharge-border hover:border-white text-white font-semibold text-xs px-6 py-3.5 rounded-full transition-all duration-300"
                >
                  Download Brochure
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default Products;
