/**
 * ========================================
 * Solutions Page Component
 * Purpose:
 * Showcases charging infrastructure models for
 * Commercial, Residential, and Fleet applications.
 *
 * Developer Notes:
 * Uses flex grids and overlay hover cards.
 *
 * ========================================
 */

import React, { useState } from 'react';
import { BuildingIcon, HomeIcon, TruckIcon } from '../../components/CustomIcons/CustomIcons';
import './Solutions.css';

/* ==========================================
   SOLUTIONS COMPONENT
========================================== */

const Solutions = () => {
  const [activeSegment, setActiveSegment] = useState('commercial'); // 'commercial' | 'residential' | 'fleet'

  return (
    <div className="solutions-page-container bg-megacharge-dark pt-28 pb-20 px-6">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto mb-16 text-center">
        <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest block mb-2">
          Infrastructure Systems
        </span>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-poppins">
          EV Charging Grid for <span className="text-gradient-green">Every Vertical</span>
        </h1>
        <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
          From high-traffic shopping complexes to delivery fleet depots and housing societies, we design tailormade charging installations.
        </p>

        {/* TABS SELECTOR */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button 
            onClick={() => setActiveSegment('commercial')}
            className={`px-6 py-3 rounded-full font-semibold text-xs flex items-center gap-2 transition-all duration-300 ${activeSegment === 'commercial' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-card border border-megacharge-border text-megacharge-text-secondary hover:text-white'}`}
          >
            <BuildingIcon className="w-4 h-4" /> Commercial Properties
          </button>
          <button 
            onClick={() => setActiveSegment('residential')}
            className={`px-6 py-3 rounded-full font-semibold text-xs flex items-center gap-2 transition-all duration-300 ${activeSegment === 'residential' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-card border border-megacharge-border text-megacharge-text-secondary hover:text-white'}`}
          >
            <HomeIcon className="w-4 h-4" /> Residential Societies
          </button>
          <button 
            onClick={() => setActiveSegment('fleet')}
            className={`px-6 py-3 rounded-full font-semibold text-xs flex items-center gap-2 transition-all duration-300 ${activeSegment === 'fleet' ? 'bg-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-card border border-megacharge-border text-megacharge-text-secondary hover:text-white'}`}
          >
            <TruckIcon className="w-4 h-4" /> Logistics & Fleet Depots
          </button>
        </div>
      </section>

      {/* CORE SOLUTIONS CONTENT */}
      <section className="max-w-7xl mx-auto">
        
        {/* TAB 1: COMMERCIAL */}
        {activeSegment === 'commercial' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Monetize Your Parking Bays</span>
              <h2 className="text-white text-3xl font-bold font-poppins">Commercial & CPO Infrastructure</h2>
              <p className="text-megacharge-text-secondary text-sm leading-relaxed">
                Unlock new revenue models for shopping complexes, tech parks, hotels, and highway food courts. We supply OCPP-enabled dual-gun DC chargers that process automated QR/UPI digital payments without manual billing efforts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="p-5 rounded-2xl bg-megacharge-card border border-megacharge-border">
                  <h4 className="text-white font-bold text-sm mb-1.5">Automated UPI Billing</h4>
                  <p className="text-megacharge-text-secondary text-xs">
                    Users scan the QR plate, pay through UPI, and start charging. Grid billing handles GST instantly.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-megacharge-card border border-megacharge-border">
                  <h4 className="text-white font-bold text-sm mb-1.5">Customer Attraction</h4>
                  <p className="text-megacharge-text-secondary text-xs">
                    High-power fast chargers make your location a critical hub on maps, increasing vehicle footfall.
                  </p>
                </div>
              </div>

              <a href="/franchise" className="bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all duration-300 shadow-glow-green mt-4 block">
                Explore Franchise Models &rarr;
              </a>
            </div>
            
            <div className="lg:col-span-5 bg-megacharge-card border border-megacharge-border p-8 rounded-3xl">
              <h4 className="text-white font-bold text-lg mb-4">Commercial Suitability</h4>
              <ul className="flex flex-col gap-3 text-xs text-megacharge-text-secondary">
                <li className="flex items-center gap-2 border-b border-megacharge-border pb-2.5">💼 IT Parks & Office Complexes</li>
                <li className="flex items-center gap-2 border-b border-megacharge-border pb-2.5">🏨 Hotels, Resorts, & Banquets</li>
                <li className="flex items-center gap-2 border-b border-megacharge-border pb-2.5">🛍️ Retail Malls & Hypermarkets</li>
                <li className="flex items-center gap-2">🍽️ Highway Food Courtyards</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: RESIDENTIAL */}
        {activeSegment === 'residential' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Convenient Home Charging</span>
              <h2 className="text-white text-3xl font-bold font-poppins">Housing Societies & Private Villas</h2>
              <p className="text-megacharge-text-secondary text-sm leading-relaxed">
                Empower your residents with app-controlled AC wallboxes. Our multi-billing RFID system allows cooperative societies to allocate energy tariffs per flat/resident, preventing billing disputes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="p-5 rounded-2xl bg-megacharge-card border border-megacharge-border">
                  <h4 className="text-white font-bold text-sm mb-1.5">RFID Swipe Authorization</h4>
                  <p className="text-megacharge-text-secondary text-xs">
                    Locks the port automatically. Swiping the correct card unlocks power, preventing unauthorized usage.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-megacharge-card border border-megacharge-border">
                  <h4 className="text-white font-bold text-sm mb-1.5">Society Admin Dashboard</h4>
                  <p className="text-megacharge-text-secondary text-xs">
                    Tracks individual power usage records on the web portal to aggregate flat bills easily.
                  </p>
                </div>
              </div>

              <a href="/contact" className="bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all duration-300 shadow-glow-green mt-4 block">
                Request Society Audit &rarr;
              </a>
            </div>
            
            <div className="lg:col-span-5 bg-megacharge-card border border-megacharge-border p-8 rounded-3xl">
              <h4 className="text-white font-bold text-lg mb-4">Residential Suitability</h4>
              <ul className="flex flex-col gap-3 text-xs text-megacharge-text-secondary">
                <li className="flex items-center gap-2 border-b border-megacharge-border pb-2.5">🏡 Individual Luxury Villas</li>
                <li className="flex items-center gap-2 border-b border-megacharge-border pb-2.5">🏢 Multi-story Apartment Societies</li>
                <li className="flex items-center gap-2 border-b border-megacharge-border pb-2.5">🏘️ Gated Residential Townships</li>
                <li className="flex items-center gap-2">🛋️ Cooperative Housing Projects</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: FLEET */}
        {activeSegment === 'fleet' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Zero Fleet Downtime</span>
              <h2 className="text-white text-3xl font-bold font-poppins">Logistics Yards & Fleet Depots</h2>
              <p className="text-megacharge-text-secondary text-sm leading-relaxed">
                Engineered for logistics carriers, delivery fleets, and corporate transit buses. Our smart load management system prevents utility overloads by distributing power dynamically across multiple active bays.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="p-5 rounded-2xl bg-megacharge-card border border-megacharge-border">
                  <h4 className="text-white font-bold text-sm mb-1.5">Intelligent Dynamic Sharing</h4>
                  <p className="text-megacharge-text-secondary text-xs">
                    Throttles power output when multiple delivery vans connect, keeping grid connection costs optimal.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-megacharge-card border border-megacharge-border">
                  <h4 className="text-white font-bold text-sm mb-1.5">24x7 Diagnostic Uptime</h4>
                  <p className="text-megacharge-text-secondary text-xs">
                    Continuous remote monitoring guarantees that your delivery vans charge overnight without failure.
                  </p>
                </div>
              </div>

              <a href="/contact" className="bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all duration-300 shadow-glow-green mt-4 block">
                Connect with Fleet Engineers &rarr;
              </a>
            </div>
            
            <div className="lg:col-span-5 bg-megacharge-card border border-megacharge-border p-8 rounded-3xl">
              <h4 className="text-white font-bold text-lg mb-4">Fleet Suitability</h4>
              <ul className="flex flex-col gap-3 text-xs text-megacharge-text-secondary">
                <li className="flex items-center gap-2 border-b border-megacharge-border pb-2.5">📦 E-commerce Delivery Yards</li>
                <li className="flex items-center gap-2 border-b border-megacharge-border pb-2.5">🚌 Employee Transit Bus Plazas</li>
                <li className="flex items-center gap-2 border-b border-megacharge-border pb-2.5">🚛 Last-mile Electric fleets</li>
                <li className="flex items-center gap-2">🚕 Corporate Taxi Operator Hubs</li>
              </ul>
            </div>
          </div>
        )}

      </section>

    </div>
  );
};

export default Solutions;
