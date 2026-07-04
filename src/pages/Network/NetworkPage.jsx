/**
 * ========================================
 * Network Page Component
 * Purpose:
 * Renders the national charging station map
 * and details grid of active highway corridors.
 *
 * Developer Notes:
 * Integrates the InteractiveMap component
 * and provides state-wise listings.
 *
 * ========================================
 */

import React, { useState } from 'react';
import InteractiveMap from '../../components/InteractiveMap/InteractiveMap';
import './NetworkPage.css';

/* ==========================================
   NETWORK COMPONENT
========================================== */

const NetworkPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const CITIES_LIST = [
    { name: "Delhi NCR", state: "Delhi", active: 24, power: "Up to 180kW" },
    { name: "Mumbai", state: "Maharashtra", active: 18, power: "Up to 180kW" },
    { name: "Bengaluru", state: "Karnataka", active: 16, power: "Up to 120kW" },
    { name: "Pune", state: "Maharashtra", active: 8, power: "Up to 120kW" },
    { name: "Hyderabad", state: "Telangana", active: 12, power: "Up to 120kW" },
    { name: "Chennai", state: "Tamil Nadu", active: 10, power: "Up to 120kW" },
    { name: "Kolkata", state: "West Bengal", active: 6, power: "Up to 60kW" },
    { name: "NH44 Highway Corridor", state: "Expressway", active: 14, power: "Up to 180kW" }
  ];

  const filteredCities = CITIES_LIST.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    city.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="network-page-container bg-megacharge-dark pt-28 pb-20 px-6">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto mb-16 text-center">
        <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest block mb-2">
          Grid Status Map
        </span>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-poppins">
          National Charging <span className="text-gradient-green">Footprint</span>
        </h1>
        <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
          Locate high-power public AC & DC charging bays across municipal segments and NH expressways. View live telemetry diagnostic states.
        </p>
      </section>

      {/* INTERACTIVE MAP INTEGRATION */}
      <section className="max-w-7xl mx-auto mb-20">
        <InteractiveMap />
      </section>

      {/* CITIS DIRECTORY */}
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-white text-2xl font-bold font-poppins">Active Stations Directory</h3>
            <p className="text-megacharge-text-secondary text-xs mt-1">
              Filter operational stations by state or region.
            </p>
          </div>
          <input 
            type="text"
            placeholder="Search by state or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-megacharge-card border border-megacharge-border text-white text-sm px-5 py-3 rounded-full focus:outline-none focus:border-megacharge-green transition-colors min-w-[280px]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCities.map((city, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-megacharge-card border border-megacharge-border hover:border-megacharge-green transition-all duration-300"
            >
              <h4 className="text-white font-bold text-base font-poppins">{city.name}</h4>
              <span className="text-megacharge-text-secondary text-xs block mb-4">State: {city.state}</span>
              
              <div className="flex items-center justify-between text-xs pt-4 border-t border-megacharge-border">
                <span className="text-megacharge-text-secondary">Active Ports:</span>
                <span className="text-megacharge-green font-bold font-poppins">{city.active} Bays</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span className="text-megacharge-text-secondary">Max Power:</span>
                <span className="text-white font-semibold font-poppins">{city.power}</span>
              </div>
            </div>
          ))}
          {filteredCities.length === 0 && (
            <div className="col-span-full text-center py-12 text-megacharge-text-secondary text-sm">
              No regions matching your query found. We are constantly expanding to new corridors.
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default NetworkPage;
