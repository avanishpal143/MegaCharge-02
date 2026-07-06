import React, { useState } from 'react';
import { BuildingIcon, HomeIcon, TruckIcon } from '../../components/CustomIcons/CustomIcons';
import './Solutions.css';

/* ==========================================
   SOLUTIONS COMPONENT
========================================== */

const Solutions = () => {
  const [activeSegment, setActiveSegment] = useState('commercial'); // 'commercial' | 'residential' | 'fleet'

  return (
    <div className="solutions-page-container bg-slate-50 min-h-screen">
      
      {/* HEADER SECTION (DARK GRADIENT WITH GLOW) */}
      <section className="w-full bg-[#0B132B] pt-32 pb-20 px-6 text-center text-white border-b border-slate-800 relative">
        <div className="absolute inset-0 bg-gradient-radial from-[#00B4D8] to-transparent opacity-10 blur-3xl pointer-events-none" />
        
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
              className={`px-6 py-3 rounded-full font-semibold text-xs flex items-center gap-2 transition-all duration-300 ${activeSegment === 'commercial' ? 'bg-[#00B4D8] text-white shadow-[0_0_15px_rgba(0,180,216,0.3)]' : 'bg-[#1C2541] border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              <BuildingIcon className="w-4 h-4" /> Commercial Properties
            </button>
            <button 
              onClick={() => setActiveSegment('residential')}
              className={`px-6 py-3 rounded-full font-semibold text-xs flex items-center gap-2 transition-all duration-300 ${activeSegment === 'residential' ? 'bg-[#00B4D8] text-white shadow-[0_0_15px_rgba(0,180,216,0.3)]' : 'bg-[#1C2541] border border-slate-700 text-slate-300 hover:text-white'}`}
            >
              <HomeIcon className="w-4 h-4" /> Residential Societies
            </button>
            <button 
              onClick={() => setActiveSegment('fleet')}
              className={`px-6 py-3 rounded-full font-semibold text-xs flex items-center gap-2 transition-all duration-300 ${activeSegment === 'fleet' ? 'bg-[#00B4D8] text-white shadow-[0_0_15px_rgba(0,180,216,0.3)]' : 'bg-[#1C2541] border border-slate-700 text-slate-300 hover:text-white'}`}
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

              <a href="/contact" className="bg-[#00B4D8] hover:bg-opacity-95 text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all duration-300 shadow-sm mt-4 block">
                Contact Us for Installation &rarr;
              </a>
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

              <a href="/contact" className="bg-[#00B4D8] hover:bg-opacity-95 text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all duration-300 shadow-sm mt-4 block">
                Request Society Audit &rarr;
              </a>
            </div>
            
            <div className="lg:col-span-5 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm text-slate-900">
              <h4 className="text-slate-900 font-extrabold text-lg mb-4">Residential Suitability</h4>
              <ul className="flex flex-col gap-3 text-xs text-slate-600">
                <li className="flex items-center gap-2 border-b border-slate-100 pb-2.5">🏡 Individual Luxury Villas</li>
                <li className="flex items-center gap-2 border-b border-slate-100 pb-2.5">🏢 Multi-story Apartment Societies</li>
                <li className="flex items-center gap-2 border-b border-slate-100 pb-2.5"> Gated Residential Townships</li>
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

              <a href="/contact" className="bg-[#00B4D8] hover:bg-opacity-95 text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all duration-300 shadow-sm mt-4 block">
                Connect with Fleet Engineers &rarr;
              </a>
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

    </div>
  );
};

export default Solutions;
