/**
 * ========================================
 * Sustainability Page Component
 * Purpose:
 * Showcases carbon reductions, solar + EV
 * integrations, and offset calculations.
 *
 * Developer Notes:
 * Integrates state slider for real-time tree math.
 *
 * ========================================
 */

import React, { useState } from 'react';
import './Sustainability.css';

/* ==========================================
   SUSTAINABILITY COMPONENT
========================================== */

const Sustainability = () => {
  const [chargeUnits, setChargeUnits] = useState(1000); // kWh charged

  // Math
  const co2Offset = Math.round(chargeUnits * 0.82); // 0.82 kg of CO2 offset per kWh compared to grid coal mix
  const treesEquivalent = Math.round(co2Offset / 22); // 1 mature tree absorbs ~22kg of CO2 per year

  return (
    <div className="sustainability-page-container bg-megacharge-dark pt-28 pb-20 px-6">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto mb-16 text-center">
        <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest block mb-2">
          Environmental Impact
        </span>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-poppins">
          Decarbonizing India's <span className="text-gradient-green">Transport Corridors</span>
        </h1>
        <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
          MegaCharge is committed to absolute zero-emission mobility. By pairing highway charger installations with local solar micro-grids, we offset megatons of coal grid emissions.
        </p>
      </section>

      {/* CORE STATS */}
      <section className="max-w-7xl mx-auto mb-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="glass-panel p-8 rounded-3xl border border-megacharge-border">
          <span className="text-megacharge-green text-4xl font-extrabold font-poppins block mb-2">4,200+ Tonnes</span>
          <h4 className="text-white font-bold text-sm mb-2">Net CO₂ Offset</h4>
          <p className="text-megacharge-text-secondary text-xs leading-relaxed">
            Eliminated from Indian highway transit pipelines through active electric charging sessions.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-megacharge-border">
          <span className="text-megacharge-green text-4xl font-extrabold font-poppins block mb-2">350,000+</span>
          <h4 className="text-white font-bold text-sm mb-2">Clean Kilometres Powered</h4>
          <p className="text-megacharge-text-secondary text-xs leading-relaxed">
            Dispensed across passenger cars, commercial fleets, and light electric utility vehicles.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-megacharge-border">
          <span className="text-megacharge-green text-4xl font-extrabold font-poppins block mb-2">100% Green</span>
          <h4 className="text-white font-bold text-sm mb-2">Solar Integration Target</h4>
          <p className="text-megacharge-text-secondary text-xs leading-relaxed">
            Deploying roof-top solar panels on all highway franchise hubs to feedback clean units directly.
          </p>
        </div>
      </section>

      {/* CO2 CALCULATOR WIDGET */}
      <section className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-megacharge-border">
        <div className="text-center mb-8">
          <h3 className="text-white text-2xl font-bold">Calculate Your Ecological Yield</h3>
          <p className="text-megacharge-text-secondary text-xs mt-1">
            Drag the slider to see how many units charged offsets grid coal consumption.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-megacharge-text-secondary text-sm">Energy Dispensed / Charged:</span>
            <span className="text-megacharge-green font-bold text-lg">{chargeUnits.toLocaleString()} kWh</span>
          </div>
          <input 
            type="range" min="100" max="50000" step="500"
            value={chargeUnits} onChange={(e) => setChargeUnits(Number(e.target.value))}
            className="w-full accent-megacharge-green bg-megacharge-border rounded-lg h-2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-megacharge-border">
          <div className="border-l-2 border-megacharge-green pl-4">
            <span className="text-megacharge-text-secondary text-xs block">CO₂ Offoffset</span>
            <span className="text-white text-2xl font-bold font-poppins">{co2Offset.toLocaleString()} kg</span>
          </div>
          <div className="border-l-2 border-megacharge-green pl-4">
            <span className="text-megacharge-text-secondary text-xs block">Equivalent Trees Planted</span>
            <span className="text-megacharge-green text-2xl font-bold font-poppins">{treesEquivalent} Mature Trees</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Sustainability;
