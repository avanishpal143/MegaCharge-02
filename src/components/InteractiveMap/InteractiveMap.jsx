/**
 * ========================================
 * InteractiveMap Component
 * Purpose:
 * Renders a real interactive geographic map
 * of India using Leaflet with live charging
 * station hubs, highway corridors, and telemetry.
 *
 * Developer Notes:
 * Integrates Leaflet tile layers with custom
 * animated pulse beacons and hub selection.
 * ========================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* ==========================================
   METRO HUBS & HIGHWAY DATA (REAL GEO COORDS)
========================================== */

const HUBS_DATA = [
  {
    id: 'delhi',
    name: 'Delhi NCR Hub',
    lat: 28.6139,
    lng: 77.2090,
    type: 'metro',
    stations: [
      { name: 'NSP Cyber Plaza Charger (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 },
      { name: 'Connaught Place Civic Center (DC 60kW)', status: 'Active', port: 'CCS2 / CHAdeMO', count: 1 },
      { name: 'Gurugram Sector 43 Depot (DC 180kW)', status: 'Busy', port: 'Triple Gun CCS2', count: 3 }
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai Metro Grid',
    lat: 19.0760,
    lng: 72.8777,
    type: 'metro',
    stations: [
      { name: 'BKC Commercial Hub (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 },
      { name: 'Nariman Point Public Charging (AC 7.4kW)', status: 'Active', port: 'Type 2', count: 4 },
      { name: 'Andheri Logistics Depot (DC 180kW)', status: 'Busy', port: 'CCS2 / Type 2', count: 2 }
    ]
  },
  {
    id: 'pune',
    name: 'Pune Industrial Grid',
    lat: 18.5204,
    lng: 73.8567,
    type: 'metro',
    stations: [
      { name: 'Hinjawadi IT Park Charger (DC 60kW)', status: 'Active', port: 'CCS2', count: 1 },
      { name: 'Chakan Manufacturing Hub (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 }
    ]
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru Tech Corridor',
    lat: 12.9716,
    lng: 77.5946,
    type: 'metro',
    stations: [
      { name: 'Whitefield IT Plaza (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 },
      { name: 'Electronic City Corridor (DC 60kW)', status: 'Active', port: 'CCS2', count: 1 },
      { name: 'Koramangala Commercial Hub (AC 7.4kW)', status: 'Active', port: 'Type 2', count: 6 }
    ]
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad Ring Road Grid',
    lat: 17.3850,
    lng: 78.4867,
    type: 'metro',
    stations: [
      { name: 'Gachibowli Outer Ring Hub (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 },
      { name: 'HITEC City Corporate Hub (DC 60kW)', status: 'Busy', port: 'CCS2', count: 1 }
    ]
  },
  {
    id: 'chennai',
    name: 'Chennai Port & Corridor',
    lat: 13.0827,
    lng: 80.2707,
    type: 'metro',
    stations: [
      { name: 'OMR Expressway Hub (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 },
      { name: 'Guindy Industrial Park (AC 7.4kW)', status: 'Active', port: 'Type 2', count: 4 }
    ]
  },
  {
    id: 'kolkata',
    name: 'Kolkata East Corridor',
    lat: 22.5726,
    lng: 88.3639,
    type: 'metro',
    stations: [
      { name: 'Salt Lake Sector V Grid (DC 60kW)', status: 'Active', port: 'CCS2', count: 1 },
      { name: 'New Town Commercial Center (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 }
    ]
  },
  {
    id: 'nh44',
    name: 'NH44 Highway Corridor',
    lat: 29.3909,
    lng: 76.9635,
    type: 'highway',
    stations: [
      { name: 'Highway Stop Plaza - Hub 01 (DC 180kW)', status: 'Active', port: 'Triple Gun CCS2', count: 3 },
      { name: 'Highway Stop Plaza - Hub 02 (DC 120kW)', status: 'Active', port: 'Dual CCS2', count: 2 }
    ]
  }
];

// Corridor connection routes
const CORRIDOR_ROUTES = [
  // North-South (NH44 through Delhi to Bengaluru & Chennai)
  [[29.3909, 76.9635], [28.6139, 77.2090], [17.3850, 78.4867], [12.9716, 77.5946], [13.0827, 80.2707]],
  // Western Corridor (Delhi to Mumbai & Pune)
  [[28.6139, 77.2090], [19.0760, 72.8777], [18.5204, 73.8567], [12.9716, 77.5946]],
  // East Corridor (Delhi to Kolkata)
  [[28.6139, 77.2090], [22.5726, 88.3639]]
];

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

const InteractiveMap = () => {
  const [selectedHub, setSelectedHub] = useState(HUBS_DATA[0]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create Leaflet map centered on India
    const map = L.map(mapContainerRef.current, {
      center: [22.5, 79.5],
      zoom: 5,
      minZoom: 4,
      maxZoom: 10,
      scrollWheelZoom: false,
      attributionControl: false,
      zoomControl: true
    });

    mapRef.current = map;

    // Add high-resolution clean CartoDB Voyager tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Draw Highway Corridor Lines
    CORRIDOR_ROUTES.forEach(route => {
      L.polyline(route, {
        color: '#F18321',
        weight: 2.5,
        opacity: 0.65,
        dashArray: '6, 8',
        lineCap: 'round'
      }).addTo(map);
    });

    // Create markers for each Hub
    HUBS_DATA.forEach(hub => {
      const isHighway = hub.type === 'highway';
      const color = isHighway ? '#832800' : '#F18321';

      const customIcon = L.divIcon({
        className: 'custom-hub-marker',
        html: `
          <div class="hub-marker-container" id="marker-${hub.id}" style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <div class="hub-beacon-ring" style="position: absolute; width: 30px; height: 30px; border-radius: 50%; background: ${color}; opacity: 0.3; animation: hubPing 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div class="hub-marker-core" style="position: relative; width: 15px; height: 15px; border-radius: 50%; background: ${color}; border: 2.5px solid #ffffff; box-shadow: 0 3px 10px rgba(0,0,0,0.35); transition: transform 0.2s;"></div>
            <div class="hub-marker-tooltip" style="position: absolute; bottom: -18px; white-space: nowrap; font-size: 10px; font-weight: 700; color: #1e293b; background: rgba(255,255,255,0.92); backdrop-filter: blur(4px); padding: 1px 6px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.15); pointer-events: none; border: 1px solid rgba(0,0,0,0.06);">
              ${hub.name.split(' ')[0]}
            </div>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedHub(hub);
        map.flyTo([hub.lat, hub.lng], 6.5, { duration: 0.8 });
      });

      markersRef.current[hub.id] = marker;
    });

    // Cleanup on unmount
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update selection effect on map
  const handleSelectHub = (hub) => {
    setSelectedHub(hub);
    if (mapRef.current) {
      mapRef.current.flyTo([hub.lat, hub.lng], 6.5, { duration: 0.8 });
    }
  };

  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.flyTo([22.5, 79.5], 5, { duration: 0.8 });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch"
    >
      {/* REAL MAP CONTAINER */}
      <div className="lg:col-span-2 relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col min-h-[480px]">
        {/* CSS Animation Keyframes for map beacons */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes hubPing {
            0% { transform: scale(0.6); opacity: 0.8; }
            70% { transform: scale(1.8); opacity: 0; }
            100% { transform: scale(2.2); opacity: 0; }
          }
          .custom-hub-marker { background: transparent !important; border: none !important; }
          .leaflet-container { font-family: inherit; width: 100%; height: 100%; z-index: 10; border-radius: 1.5rem; }
          .leaflet-control-zoom { border: none !important; box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important; border-radius: 12px !important; overflow: hidden; }
          .leaflet-control-zoom a { background: #ffffff !important; color: #334155 !important; border: 1px solid #e2e8f0 !important; }
          .leaflet-control-zoom a:hover { background: #f8fafc !important; color: #F18321 !important; }
        `}} />

        {/* Quick Hub Selector Pills */}
        <div className="absolute top-4 left-4 right-16 z-[500] flex gap-2 overflow-x-auto pb-1 scrollbar-none pointer-events-auto">
          {HUBS_DATA.map(hub => (
            <button
              key={hub.id}
              onClick={() => handleSelectHub(hub)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all duration-200 shadow-sm backdrop-blur-md ${
                selectedHub.id === hub.id 
                  ? 'bg-gradient-to-r from-[#F18321] to-[#832800] text-white shadow-glow-orange scale-105' 
                  : 'bg-white/90 text-slate-700 hover:bg-white border border-slate-200/80 hover:border-[#F18321]'
              }`}
            >
              {hub.name.replace(' Hub', '').replace(' Grid', '').replace(' Corridor', '')}
            </button>
          ))}
        </div>

        {/* Leaflet Map Div */}
        <div ref={mapContainerRef} className="w-full h-full min-h-[460px] flex-1 relative z-10" />

        {/* Floating Controls & Legend */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-[500] pointer-events-none">
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md border border-slate-200/80 px-4 py-2 rounded-2xl shadow-sm pointer-events-auto text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-[#F18321]">
              <span className="w-2.5 h-2.5 bg-[#F18321] rounded-full inline-block"></span> Metro Hub
            </div>
            <div className="flex items-center gap-1.5 text-[#832800]">
              <span className="w-2.5 h-2.5 bg-[#832800] rounded-full inline-block"></span> Highway Corridor
            </div>
          </div>

          <button
            onClick={handleResetView}
            className="bg-white/95 hover:bg-white text-slate-700 hover:text-[#F18321] border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm text-xs font-bold pointer-events-auto transition-all duration-200"
          >
            Reset View ⟲
          </button>
        </div>
      </div>

      {/* METRO GRID SIDEBAR SIDE */}
      <div className="bg-megacharge-card border border-megacharge-border p-6 md:p-8 rounded-3xl h-full flex flex-col justify-between">
        <div>
          <span className="text-megacharge-brand text-xs font-bold uppercase tracking-wider">Live Station Locator</span>
          <h3 className="text-megacharge-heading text-2xl font-bold mt-2 mb-1">{selectedHub.name}</h3>
          <p className="text-megacharge-paragraph text-xs mb-6">
            Interactive view of high-power public charging bays currently active in this region.
          </p>

          <motion.div 
            key={selectedHub.id}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-4 max-h-[250px] overflow-y-auto pr-2"
          >
            {selectedHub.stations.map((st, i) => (
              <motion.div 
                key={i} 
                variants={cardVariants}
                className="p-4 rounded-xl bg-megacharge-dark border border-megacharge-border flex flex-col gap-2 transition-all duration-300 hover:border-megacharge-brand"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-xs font-bold truncate max-w-[80%]">{st.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${st.status === 'Active' ? 'bg-megacharge-brand bg-opacity-20 text-megacharge-brand' : 'bg-megacharge-icon bg-opacity-20 text-megacharge-icon'}`}>
                    {st.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-megacharge-card text-opacity-80 text-[11px]">
                  <span>Connector: {st.port}</span>
                  <span>Bays: {st.count}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <Link 
          to="/network"
          className="w-full text-center btn-premium-green text-white font-bold text-sm py-4 rounded-full transition-all duration-300 mt-8 shadow-glow-orange block"
        >
          View Full Interactive Finder &rarr;
        </Link>
      </div>
    </motion.div>
  );
};

export default InteractiveMap;
