/**
 * ========================================
 * Network Page Component
 * Purpose:
 * Renders the national charging station map
 * and details grid of active highway corridors.
 *
 * Developer Notes:
 * Integrates the InteractiveMap component
 * and provides state-wise listings with high
 * contrast visibility and responsive spacing.
 * ========================================
 */

import React, { useState } from 'react';
import InteractiveMap from '../../components/InteractiveMap/InteractiveMap';
import './NetworkPage.css';

const NetworkPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const CITIES_LIST = [
    { name: "Agra Expressway Terminal", state: "Uttar Pradesh", active: 18, power: "Up to 180kW" },
    { name: "Yamuna Expressway Hub", state: "Uttar Pradesh", active: 24, power: "Up to 240kW" },
    { name: "Delhi-Mumbai NE-4 Terminal", state: "National Expressway", active: 16, power: "Up to 120kW" },
    { name: "Delhi NCR Hub", state: "Delhi", active: 28, power: "Up to 180kW" },
    { name: "Mumbai Metro Grid", state: "Maharashtra", active: 20, power: "Up to 180kW" },
    { name: "Bengaluru Tech Corridor", state: "Karnataka", active: 16, power: "Up to 120kW" },
    { name: "Pune Industrial Grid", state: "Maharashtra", active: 12, power: "Up to 120kW" },
    { name: "Hyderabad Ring Road", state: "Telangana", active: 14, power: "Up to 120kW" },
    { name: "Chennai Port & Corridor", state: "Tamil Nadu", active: 10, power: "Up to 120kW" },
    { name: "Kolkata East Corridor", state: "West Bengal", active: 8, power: "Up to 60kW" },
    { name: "NH44 Panipat Fast Hub", state: "Haryana", active: 14, power: "Up to 180kW" }
  ];

  const filteredCities = CITIES_LIST.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    city.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="network-page-container bg-megacharge-dark pt-44 sm:pt-48 pb-24 px-6 min-h-screen text-left">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto mb-16 text-center">
        <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest block mb-3 font-mono">
          Grid Status Map &amp; Corridor Diagnostics
        </span>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-montserrat">
          National Charging <span className="text-gradient-green">Footprint</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
          Locate high-power public AC &amp; DC charging bays across municipal segments and national expressways. View live telemetry diagnostic states.
        </p>
      </section>

      {/* INTERACTIVE MAP INTEGRATION */}
      <section className="max-w-7xl mx-auto mb-20">
        <InteractiveMap />
      </section>

      {/* CITIES & EXPRESSWAY DIRECTORY */}
      <section className="max-w-7xl mx-auto pt-6" id="active-directory">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <h3 className="text-white text-2xl sm:text-3xl font-extrabold font-montserrat">
              Active Stations Directory
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Filter operational stations by state, expressway, or region.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <input 
              type="text"
              placeholder="Search by state, city or expressway..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:min-w-[340px] bg-white/[0.08] border border-white/20 text-white placeholder-slate-400 text-sm px-6 py-3.5 rounded-full focus:outline-none focus:border-megacharge-green transition-all shadow-inner backdrop-blur-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCities.map((city, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-megacharge-green transition-all duration-300 backdrop-blur-md shadow-lg flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] text-megacharge-green font-mono uppercase tracking-wider block mb-1">
                  Verified Operational
                </span>
                <h4 className="text-white font-bold text-lg font-montserrat group-hover:text-megacharge-green transition-colors leading-snug">
                  {city.name}
                </h4>
                <span className="text-slate-300 text-xs block mt-1.5 mb-5 font-mono">
                  Region: <strong className="text-white font-sans">{city.state}</strong>
                </span>
              </div>
              
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Active Ports:</span>
                  <span className="text-megacharge-green font-bold font-montserrat text-sm">{city.active} Bays</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Max Capacity:</span>
                  <span className="text-white font-semibold font-montserrat">{city.power}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredCities.length === 0 && (
            <div className="col-span-full text-center py-16 text-slate-300 text-sm bg-white/[0.03] rounded-3xl border border-white/10">
              No regions matching your query found. We are constantly commissioning new expressway bays.
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default NetworkPage;
