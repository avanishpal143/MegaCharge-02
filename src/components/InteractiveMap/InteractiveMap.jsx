/**
 * ========================================
 * InteractiveMap Component
 * Purpose:
 * Renders a stylized vector outline map of
 * India with glowing network hotspots to
 * locate and view live charging station status.
 *
 * Developer Notes:
 * Uses custom SVG coordinates and triggers sidebar
 * state updates upon node interaction.
 *
 * ========================================
 */

import React, { useState } from 'react';

/* ==========================================
   METRO HUBS DATA
========================================== */

const HUBS_DATA = [
  {
    id: 'delhi',
    name: 'Delhi NCR Hub',
    coords: { x: 190, y: 150 },
    stations: [
      { name: 'NSP Cyber Plaza Charger (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 },
      { name: 'Connaught Place Civic Center (DC 60kW)', status: 'Active', port: 'CCS2 / CHAdeMO', count: 1 },
      { name: 'Gurugram Sector 43 Depot (DC 180kW)', status: 'Busy', port: 'Triple Gun CCS2', count: 3 }
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai Metro Grid',
    coords: { x: 110, y: 280 },
    stations: [
      { name: 'BKC Commercial Hub (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 },
      { name: 'Nariman Point Public Charging (AC 7.4kW)', status: 'Active', port: 'Type 2', count: 4 },
      { name: 'Andheri Logistics Depot (DC 180kW)', status: 'Busy', port: 'CCS2 / Type 2', count: 2 }
    ]
  },
  {
    id: 'pune',
    name: 'Pune Industrial Grid',
    coords: { x: 125, y: 300 },
    stations: [
      { name: 'Hinjawadi IT Park Charger (DC 60kW)', status: 'Active', port: 'CCS2', count: 1 },
      { name: 'Chakan Manufacturing Hub (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 }
    ]
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru Tech Corridor',
    coords: { x: 170, y: 380 },
    stations: [
      { name: 'Whitefield IT Plaza (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 },
      { name: 'Electronic City Corridor (DC 60kW)', status: 'Active', port: 'CCS2', count: 1 },
      { name: 'Koramangala Commercial Hub (AC 7.4kW)', status: 'Active', port: 'Type 2', count: 6 }
    ]
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad Ring Road Grid',
    coords: { x: 190, y: 320 },
    stations: [
      { name: 'Gachibowli Outer Ring Hub (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 },
      { name: 'HITEC City Corporate Hub (DC 60kW)', status: 'Busy', port: 'CCS2', count: 1 }
    ]
  },
  {
    id: 'chennai',
    name: 'Chennai Port & Corridor',
    coords: { x: 200, y: 395 },
    stations: [
      { name: 'OMR Expressway Hub (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 },
      { name: 'Guindy Industrial Park (AC 7.4kW)', status: 'Active', port: 'Type 2', count: 4 }
    ]
  },
  {
    id: 'kolkata',
    name: 'Kolkata East Corridor',
    coords: { x: 330, y: 220 },
    stations: [
      { name: 'Salt Lake Sector V Grid (DC 60kW)', status: 'Active', port: 'CCS2', count: 1 },
      { name: 'New Town Commercial Center (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 }
    ]
  },
  {
    id: 'nh44',
    name: 'NH44 Highway Corridor',
    coords: { x: 185, y: 230 },
    stations: [
      { name: 'Highway Stop Plaza - Hub 01 (DC 180kW)', status: 'Active', port: 'Triple Gun CCS2', count: 3 },
      { name: 'Highway Stop Plaza - Hub 02 (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 }
    ]
  }
];

/* ==========================================
   INTERACTIVE MAP COMPONENT
========================================== */

const InteractiveMap = () => {
  const [selectedHub, setSelectedHub] = useState(HUBS_DATA[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
      
      {/* MAP SVG CONTAINER */}
      <div className="lg:col-span-2 flex justify-center relative bg-megacharge-card border border-megacharge-border p-6 rounded-3xl">
        
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-0 pointer-events-none opacity-5">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-white border-dashed"></div>
          ))}
        </div>

        <svg 
          viewBox="0 0 450 480" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[450px] relative z-10 filter drop-shadow-[0_0_15px_rgba(3,12,21,0.8)]"
        >
          {/* Stylized Tech Polyline representing India's Outline */}
          <path
            d="M175 40 L195 60 L185 85 L200 95 L190 120 L210 135 L200 155 L225 175 L255 160 L275 170 L285 190 L320 200 L340 190 L335 225 L360 230 L345 245 L320 235 L300 240 L285 220 L260 230 L220 235 L225 255 L215 270 L220 295 L200 320 L220 345 L205 385 L208 410 L202 430 L192 410 L170 380 L160 360 L135 320 L125 300 L110 280 L108 260 L125 240 L135 210 L115 190 L95 195 L80 180 L82 165 L105 140 L120 145 L135 125 L145 120 L130 95 L140 85 L145 50 L175 40 Z"
            fill="#061324"
            stroke="#0e2949"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Network Connection Lines (Corridor representation) */}
          <path
            d="M190 150 L185 230 L190 320 L170 380 M110 280 L125 300 L170 380 L200 395 M330 220 L185 230"
            stroke="rgba(29, 185, 84, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Plotting Hubs */}
          {HUBS_DATA.map((hub) => {
            const isSelected = selectedHub.id === hub.id;
            return (
              <g 
                key={hub.id}
                onClick={() => setSelectedHub(hub)}
                className="cursor-pointer group"
              >
                {/* Ping Wave */}
                <circle
                  cx={hub.coords.x}
                  cy={hub.coords.y}
                  r={isSelected ? 10 : 6}
                  fill={hub.id === 'nh44' ? '#FF6B35' : '#1DB954'}
                  fillOpacity="0.2"
                  className="animate-ping"
                  style={{ animationDuration: isSelected ? '1.5s' : '3s' }}
                />
                
                {/* Core Dot */}
                <circle
                  cx={hub.coords.x}
                  cy={hub.coords.y}
                  r={isSelected ? 6 : 4.5}
                  fill={hub.id === 'nh44' ? '#FF6B35' : '#1DB954'}
                  className="transition-all duration-300 group-hover:r-6"
                />

                {/* Inner White Core */}
                <circle
                  cx={hub.coords.x}
                  cy={hub.coords.y}
                  r="2"
                  fill="#ffffff"
                />

                {/* Tooltip text (appears on hover) */}
                <text
                  x={hub.coords.x + 10}
                  y={hub.coords.y + 4}
                  fill="#ffffff"
                  fontSize="9"
                  fontFamily="Poppins"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  {hub.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex gap-4 text-xs font-semibold z-20">
          <div className="flex items-center gap-1.5 text-megacharge-green">
            <span className="w-2.5 h-2.5 bg-megacharge-green rounded-full inline-block"></span> Metro Grid
          </div>
          <div className="flex items-center gap-1.5 text-megacharge-orange">
            <span className="w-2.5 h-2.5 bg-megacharge-orange rounded-full inline-block"></span> Highway Corridor
          </div>
        </div>
      </div>

      {/* METRO GRID SIDEBAR SIDE */}
      <div className="bg-megacharge-card border border-megacharge-border p-6 md:p-8 rounded-3xl h-full flex flex-col justify-between">
        <div>
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Live Station Locator</span>
          <h3 className="text-white text-2xl font-bold mt-2 mb-1">{selectedHub.name}</h3>
          <p className="text-megacharge-text-secondary text-xs mb-6">
            Interactive view of high-power public charging bays currently active in this region.
          </p>

          <div className="flex flex-col gap-4 max-h-[250px] overflow-y-auto pr-2">
            {selectedHub.stations.map((st, i) => (
              <div 
                key={i} 
                className="p-4 rounded-xl bg-megacharge-dark border border-megacharge-border flex flex-col gap-2 transition-all duration-300 hover:border-megacharge-green"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-xs font-bold truncate max-w-[80%]">{st.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${st.status === 'Active' ? 'bg-megacharge-green bg-opacity-10 text-megacharge-green' : 'bg-megacharge-orange bg-opacity-10 text-megacharge-orange'}`}>
                    {st.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-megacharge-text-secondary text-[11px]">
                  <span>Connector: {st.port}</span>
                  <span>Bays: {st.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <a 
          href="/network"
          className="w-full text-center bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-sm py-4 rounded-full transition-all duration-300 mt-8 shadow-glow-green block"
        >
          View Full Interactive Finder &rarr;
        </a>
      </div>

    </div>
  );
};

export default InteractiveMap;
