/**
 * ========================================
 * ROI & Savings Utilities Component
 * Purpose:
 * Provides interactive calculators for savings,
 * ROI analysis, and charger recommendations
 * styled like a premium EV console dashboard.
 *
 * ========================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BoltIcon, LeafIcon, ChargerIcon, UsersIcon,
  IconGoogleScooter, IconGoogleCar, IconGoogleTruck,
  IconGoogleHome, IconGoogleApartment, IconGoogleMall,
  IconGoogleRoad, IconGoogleOutlet, IconGoogleBolt,
  IconGoogleFactory, IconGoogleSync
} from '../CustomIcons/CustomIcons';

/* ==========================================
   UTILITY CONTAINER
========================================== */

const ROIUtilities = () => {
  const [activeTab, setActiveTab] = useState('savings'); // 'savings' | 'roi' | 'select'

  return (
    <div className="roi-utilities-wrapper w-full max-w-6xl mx-auto premium-glass-card-dark p-6 md:p-12 rounded-3xl border border-slate-800 relative overflow-hidden text-white shadow-glow-green">
      {/* Decorative cyber grid ambient circle */}
      <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-megacharge-green opacity-5 rounded-full blur-3xl pointer-events-none" />
      
      {/* TABS HEADER */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12 pb-8 border-b border-slate-800">
        <button 
          onClick={() => setActiveTab('savings')}
          className={`px-8 py-3.5 rounded-full font-bold transition-all duration-300 flex items-center gap-2.5 text-xs uppercase tracking-wider border ${activeTab === 'savings' ? 'bg-megacharge-green border-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-navy border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'}`}
        >
          <LeafIcon className="w-4 h-4" /> Cost & CO₂ Savings
        </button>
        <button 
          onClick={() => setActiveTab('roi')}
          className={`px-8 py-3.5 rounded-full font-bold transition-all duration-300 flex items-center gap-2.5 text-xs uppercase tracking-wider border ${activeTab === 'roi' ? 'bg-megacharge-green border-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-navy border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'}`}
        >
          <UsersIcon className="w-4 h-4" /> Commercial ROI
        </button>
        <button 
          onClick={() => setActiveTab('select')}
          className={`px-8 py-3.5 rounded-full font-bold transition-all duration-300 flex items-center gap-2.5 text-xs uppercase tracking-wider border ${activeTab === 'select' ? 'bg-megacharge-green border-megacharge-green text-white shadow-glow-green' : 'bg-megacharge-navy border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'}`}
        >
          <ChargerIcon className="w-4 h-4" /> Charger Selector
        </button>
      </div>

      {/* TABS CONTENT WITH MOTION ANIMATION */}
      <div className="tab-contents min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {activeTab === 'savings' && <SavingsCalculator />}
            {activeTab === 'roi' && <ROICalculator />}
            {activeTab === 'select' && <ChargerSelector />}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

/* ==========================================
   1. SAVINGS CALCULATOR WITH DYNAMIC BATTERY GAUGE
========================================== */

const SavingsCalculator = () => {
  const [dailyKm, setDailyKm] = useState(60);
  const [fuelCost, setFuelCost] = useState(102);
  const [efficiency, setEfficiency] = useState(14);
  const [tariff, setTariff] = useState(8.5);
  
  // Constants
  const evEfficiency = 6.5; // km per kWh (avg)
  
  // Math calculations
  const petrolCostPerKm = fuelCost / efficiency;
  const evCostPerKm = tariff / evEfficiency;
  const savingsPerKm = petrolCostPerKm - evCostPerKm;
  
  const monthlySavings = Math.round(savingsPerKm * dailyKm * 30);
  const yearlySavings = Math.round(savingsPerKm * dailyKm * 365);
  const co2Offset = Math.round(dailyKm * 365 * 0.120); // 120g CO2 per km for petrol car

  // Calculate battery charge state segments (max 5) based on commute size
  const batteryPercent = Math.min(100, Math.max(10, Math.round((yearlySavings / 120000) * 100)));
  const chargeSegments = Math.ceil(batteryPercent / 20);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* Sliders Area (Column span 7) */}
      <div className="lg:col-span-7 flex flex-col gap-8">
        <div>
          <span className="text-megacharge-green text-[10px] font-bold uppercase tracking-wider block mb-1">Commute Profiler</span>
          <h3 className="text-white text-2xl font-extrabold mb-4">Commute Cost Estimator</h3>
          <p className="text-megacharge-text-secondary text-sm leading-relaxed mb-6">
            Adjust the sliders below to calibrate your driving statistics against standard utility tariffs.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-megacharge-dark bg-opacity-40 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold text-sm">Daily Driving Distance:</span>
              <span className="text-megacharge-green font-extrabold font-mono text-base">{dailyKm} km / Day</span>
            </div>
            <input 
              type="range" min="10" max="300" step="5"
              value={dailyKm} onChange={(e) => setDailyKm(Number(e.target.value))}
              className="w-full accent-megacharge-green"
            />
          </div>

          <div className="bg-megacharge-dark bg-opacity-40 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold text-sm">Petrol/Diesel Fuel Tariff:</span>
              <span className="text-megacharge-green font-extrabold font-mono text-base">₹{fuelCost} / Litre</span>
            </div>
            <input 
              type="range" min="80" max="150" step="1"
              value={fuelCost} onChange={(e) => setFuelCost(Number(e.target.value))}
              className="w-full accent-megacharge-green"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-megacharge-dark bg-opacity-40 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-semibold text-sm">ICE Fuel Economy:</span>
                <span className="text-megacharge-green font-extrabold font-mono text-sm">{efficiency} km/L</span>
              </div>
              <input 
                type="range" min="8" max="25" step="0.5"
                value={efficiency} onChange={(e) => setEfficiency(Number(e.target.value))}
                className="w-full accent-megacharge-green"
              />
            </div>

            <div className="bg-megacharge-dark bg-opacity-40 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-semibold text-sm">EV Grid Tariff:</span>
                <span className="text-megacharge-green font-extrabold font-mono text-sm">₹{tariff} / kWh</span>
              </div>
              <input 
                type="range" min="5" max="15" step="0.5"
                value={tariff} onChange={(e) => setTariff(Number(e.target.value))}
                className="w-full accent-megacharge-green"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Output Console / Battery Gauge Area (Column span 5) */}
      <div className="lg:col-span-5 bg-megacharge-navy bg-opacity-40 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
        {/* Glow behind stats */}
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-[0.03] pointer-events-none" />
        
        <div>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest">Savings Output</span>
            <span className="text-[10px] text-megacharge-text-secondary font-mono bg-megacharge-dark px-2.5 py-1 rounded-full border border-slate-800 border-opacity-60">System Ready</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-megacharge-dark bg-opacity-30 border border-slate-800 border-opacity-40">
              <span className="text-megacharge-text-secondary text-[11px] uppercase tracking-wider block mb-1">Monthly Cost Savings</span>
              <span className="text-white text-2xl font-extrabold font-mono">₹{monthlySavings.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-4 rounded-xl bg-megacharge-dark bg-opacity-30 border border-slate-800 border-opacity-40">
              <span className="text-megacharge-text-secondary text-[11px] uppercase tracking-wider block mb-1">Annual Cost Savings</span>
              <span className="text-megacharge-green text-2xl font-extrabold font-mono">₹{yearlySavings.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Premium Battery Visualizer */}
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-megacharge-dark bg-opacity-60 border border-slate-800 mb-6">
            <div className="relative w-14 h-24 border-2 border-megacharge-green rounded-xl p-1 flex flex-col-reverse gap-1 justify-start">
              {/* Battery cap */}
              <div className="absolute top-[-7px] left-1/2 transform -translate-x-1/2 w-5 h-1.5 bg-megacharge-green rounded-t" />
              
              {/* Battery Charge Segments */}
              {Array.from({ length: 5 }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-full h-3 rounded transition-all duration-500 ${idx < chargeSegments ? 'bg-megacharge-green shadow-glow-green' : 'bg-megacharge-border bg-opacity-30'}`}
                />
              ))}
              
              {/* Lightning overlay */}
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold opacity-80 shadow-glow-green">
                <IconGoogleBolt size={22} className="text-megacharge-green" pulse />
              </div>
            </div>
            
            <div className="flex-grow">
              <span className="text-white text-sm font-bold block mb-1">Battery Charge Index</span>
              <p className="text-megacharge-text-secondary text-[11px] leading-relaxed">
                Commute saves equivalent to <strong className="text-megacharge-green font-mono">{batteryPercent}%</strong> charging offset index.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-megacharge-green bg-opacity-5 border border-megacharge-green border-opacity-20 p-4 rounded-2xl">
            <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl">
              <LeafIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-megacharge-text-secondary text-[11px] block uppercase tracking-wider">Annual Carbon Capture</span>
              <span className="text-white text-base font-extrabold font-mono">{co2Offset.toLocaleString()} kg of CO₂ Offset</span>
            </div>
          </div>
        </div>

        <p className="text-megacharge-text-secondary text-[10px] leading-relaxed mt-6 border-t border-slate-800 pt-4">
          *Commute metrics align EV power discharge profiles with typical highway speed configurations. Actual environmental indicators vary.
        </p>
      </div>

    </div>
  );
};

/* ==========================================
   2. COMMERCIAL ROI CALCULATOR WITH COMPARATIVE GAUGES
========================================== */

const ROICalculator = () => {
  const [chargersCount, setChargersCount] = useState(2);
  const [sessions, setSessions] = useState(6);
  const [avgKwh, setAvgKwh] = useState(45);
  const [margin, setMargin] = useState(6.5);
  const [investment, setInvestment] = useState(15); // Lakhs

  // Math calculations
  const dailyKwh = chargersCount * sessions * avgKwh;
  const dailyProfit = dailyKwh * margin;
  const monthlyProfit = dailyProfit * 30;
  const annualProfit = monthlyProfit * 12;
  const paybackMonths = Math.round((investment * 100000) / monthlyProfit * 10) / 10;
  
  // Calculate dynamic ROI scale rating (1-100)
  const roiRating = Math.min(100, Math.max(10, Math.round((annualProfit / (investment * 100000)) * 100)));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* Inputs Area (Column span 7) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div>
          <span className="text-megacharge-orange text-[10px] font-bold uppercase tracking-wider block mb-1">CPO Alliances</span>
          <h3 className="text-white text-2xl font-extrabold mb-4">Commercial Franchise Estimator</h3>
          <p className="text-megacharge-text-secondary text-sm leading-relaxed mb-6">
            Calibrate grid capacity variables, pricing structures, and setup capital to project payout velocity.
          </p>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-megacharge-dark bg-opacity-40 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs font-semibold">DC Fast Rectifiers:</span>
                <span className="text-megacharge-orange font-bold font-mono text-sm">{chargersCount} Dual-Gun Units</span>
              </div>
              <input 
                type="range" min="1" max="10" step="1"
                value={chargersCount} onChange={(e) => setChargersCount(Number(e.target.value))}
                className="w-full accent-megacharge-orange"
              />
            </div>

            <div className="bg-megacharge-dark bg-opacity-40 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs font-semibold">Sessions (Per Unit):</span>
                <span className="text-megacharge-orange font-bold font-mono text-sm">{sessions} charges / Day</span>
              </div>
              <input 
                type="range" min="2" max="15" step="1"
                value={sessions} onChange={(e) => setSessions(Number(e.target.value))}
                className="w-full accent-megacharge-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-megacharge-dark bg-opacity-40 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs font-semibold">Average Power Dispense:</span>
                <span className="text-megacharge-orange font-bold font-mono text-sm">{avgKwh} kWh / vehicle</span>
              </div>
              <input 
                type="range" min="20" max="80" step="5"
                value={avgKwh} onChange={(e) => setAvgKwh(Number(e.target.value))}
                className="w-full accent-megacharge-orange"
              />
            </div>

            <div className="bg-megacharge-dark bg-opacity-40 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs font-semibold">Profit Margin per kWh:</span>
                <span className="text-megacharge-orange font-bold font-mono text-sm">₹{margin} / kWh</span>
              </div>
              <input 
                type="range" min="2" max="12" step="0.5"
                value={margin} onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full accent-megacharge-orange"
              />
            </div>
          </div>

          <div className="bg-megacharge-dark bg-opacity-40 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold text-sm">Total Franchise Investment:</span>
              <span className="text-megacharge-orange font-extrabold font-mono text-base">₹{investment} Lakhs</span>
            </div>
            <input 
              type="range" min="3" max="50" step="1"
              value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full accent-megacharge-orange"
            />
          </div>
        </div>
      </div>

      {/* Outputs Area (Column span 5) */}
      <div className="lg:col-span-5 bg-megacharge-navy bg-opacity-40 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-orange to-transparent opacity-[0.03] pointer-events-none" />
        
        <div>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <span className="text-megacharge-orange text-xs font-bold uppercase tracking-widest">Yield Output</span>
            <span className="text-[10px] text-megacharge-text-secondary font-mono bg-megacharge-dark px-2.5 py-1 rounded-full border border-slate-800 border-opacity-60">Live Projections</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-megacharge-dark bg-opacity-30 border border-slate-800 border-opacity-40">
              <span className="text-megacharge-text-secondary text-[11px] uppercase tracking-wider block mb-1">Annual Profit Flow</span>
              <span className="text-white text-xl font-extrabold font-mono">₹{annualProfit.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-4 rounded-xl bg-megacharge-dark bg-opacity-30 border border-slate-800 border-opacity-40">
              <span className="text-megacharge-text-secondary text-[11px] uppercase tracking-wider block mb-1">Payback Duration</span>
              <span className="text-megacharge-orange text-xl font-extrabold font-mono">{paybackMonths} Months</span>
            </div>
          </div>

          {/* Dynamic Circular progress widget */}
          <div className="p-5 rounded-2xl bg-megacharge-dark bg-opacity-60 border border-slate-800 mb-6">
            <span className="text-white text-xs font-bold uppercase tracking-wider block mb-3 text-center">Setup Yield Rating</span>
            <div className="flex items-center justify-center gap-6">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" className="stroke-megacharge-border fill-none" strokeWidth="4" />
                <circle 
                  cx="32" cy="32" r="28" 
                  className="stroke-megacharge-orange fill-none transition-all duration-500" 
                  strokeWidth="4" 
                  strokeDasharray="176"
                  strokeDashoffset={176 - (176 * roiRating) / 100}
                />
              </svg>
              <div>
                <span className="text-white text-sm font-bold block mb-1">Yield Score: {roiRating}%</span>
                <span className="text-megacharge-text-secondary text-[11px] block">
                  Expected payback rate ranks as <strong className="text-megacharge-orange">{roiRating > 60 ? 'Ultra-Rapid' : roiRating > 35 ? 'Highly Profitable' : 'Stable Return'}</strong>.
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-megacharge-orange bg-opacity-5 border border-megacharge-orange border-opacity-20 p-4 rounded-2xl">
            <div className="p-3 bg-megacharge-orange bg-opacity-10 text-megacharge-orange rounded-xl">
              <BoltIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-megacharge-text-secondary text-[11px] block uppercase tracking-wider">Total Power Discharged</span>
              <span className="text-white text-base font-extrabold font-mono">{dailyKwh} kWh / Day</span>
            </div>
          </div>
        </div>

        <p className="text-megacharge-text-secondary text-[10px] leading-relaxed mt-6 border-t border-slate-800 pt-4">
          *Payback projections exclude local real estate leases, commercial grid demand charges, and statutory tax rebates.
        </p>
      </div>

    </div>
  );
};

/* ==========================================
   3. CHARGER SELECTOR WIZARD
========================================== */

const ChargerSelector = () => {
  const [step, setStep] = useState(1);
  const [vehicle, setVehicle] = useState('');
  const [useCase, setUseCase] = useState('');
  const [power, setPower] = useState('');

  const handleNext = (val, setFunc) => {
    setFunc(val);
    setStep(step + 1);
  };

  const resetSelector = () => {
    setVehicle('');
    setUseCase('');
    setPower('');
    setStep(1);
  };

  const getRecommendation = () => {
    if (power === '1phase' || useCase === 'home' || vehicle === '2w') {
      return {
        title: 'MegaCharge 7.4 kW AC Smart Charger',
        desc: 'Sleek, wall-mounted, intelligent charger. Integrates with the MegaCharge mobile app for RFID swipe-and-charge, scheduling, and usage reports.',
        specs: ['Output: 7.4 kW (Single-phase 32A)', 'Connector: Type 2', 'Safety: Built-in Overcurrent & Temp diagnostics', 'Connectivity: Wi-Fi, Bluetooth, RFID'],
        cta: 'Request Home Installation'
      };
    } else if (power === '3phase' || useCase === 'office' || useCase === 'commercial') {
      return {
        title: 'MegaCharge 30 kW - 60 kW DC Fast Charger',
        desc: 'Perfect for corporate fleets, commercial complexes, and employee parking hubs. Rapid charging that supports multi-port vehicle splits.',
        specs: ['Output: 30 to 60 kW (Three-phase)', 'Connector: CCS2 / CHAdeMO dual connector', 'Network: OCPP 1.6 cloud integration', 'Monetization: Instant QR / UPI wallet payments'],
        cta: 'Enquire for Corporate Pricing'
      };
    } else {
      return {
        title: 'MegaCharge 120 kW - 180 kW Dual-Gun DC Charger',
        desc: 'Designed for commercial charging networks and public highway stations. Extreme fast-charging capability that powers dual heavy vehicles concurrently.',
        specs: ['Output: 120 to 180 kW', 'Connector: Dual CCS2 High-Power Guns', 'Efficiency: 98%+ active rectifiers', 'Monitoring: 24/7 remote diagnostic diagnostics'],
        cta: 'Connect with Sales & CPO'
      };
    }
  };

  return (
    <div className="min-h-[400px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: VEHICLE PROFILE */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white text-xl font-bold text-center mb-8 uppercase tracking-wider">Select your vehicle segment:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.button 
                whileHover={{ scale: 1.03, translateY: -4 }}
                onClick={() => handleNext('2w', setVehicle)}
                className="p-8 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-slate-800 hover:border-megacharge-green transition-all duration-300 text-center flex flex-col items-center justify-center"
              >
                <div className="p-3 bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-20 rounded-2xl w-fit mb-4 shadow-glow-green flex items-center justify-center">
                  <IconGoogleScooter size={32} className="text-megacharge-green" bounce />
                </div>
                <h4 className="text-white font-extrabold text-base mb-1">Two/Three-Wheeler</h4>
                <p className="text-megacharge-text-secondary text-xs">Bikes, Electric Scooters, E-Rickshaws</p>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03, translateY: -4 }}
                onClick={() => handleNext('car', setVehicle)}
                className="p-8 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-slate-800 hover:border-megacharge-green transition-all duration-300 text-center flex flex-col items-center justify-center"
              >
                <div className="p-3 bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-20 rounded-2xl w-fit mb-4 shadow-glow-green flex items-center justify-center">
                  <IconGoogleCar size={32} className="text-megacharge-green" bounce />
                </div>
                <h4 className="text-white font-extrabold text-base mb-1">Passenger Vehicles</h4>
                <p className="text-megacharge-text-secondary text-xs">Standard EVs (SUV, Sedans, Hatchbacks)</p>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03, translateY: -4 }}
                onClick={() => handleNext('fleet', setVehicle)}
                className="p-8 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-slate-800 hover:border-megacharge-green transition-all duration-300 text-center flex flex-col items-center justify-center"
              >
                <div className="p-3 bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-20 rounded-2xl w-fit mb-4 shadow-glow-green flex items-center justify-center">
                  <IconGoogleTruck size={32} className="text-megacharge-green" bounce />
                </div>
                <h4 className="text-white font-extrabold text-base mb-1">Commercial Fleet</h4>
                <p className="text-megacharge-text-secondary text-xs">Delivery trucks, e-commerce vehicles, corporate fleets</p>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: USE CASE SELECT */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white text-xl font-bold text-center mb-8 uppercase tracking-wider">Where will the charger be deployed?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <motion.button 
                whileHover={{ scale: 1.03, translateY: -4 }}
                onClick={() => handleNext('home', setUseCase)}
                className="p-6 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-slate-800 hover:border-megacharge-green transition-all duration-300 text-center flex flex-col items-center justify-center"
              >
                <div className="p-3 bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-20 rounded-2xl w-fit mb-3 shadow-glow-green flex items-center justify-center">
                  <IconGoogleHome size={28} className="text-megacharge-green" bounce />
                </div>
                <h4 className="text-white font-extrabold text-sm mb-1">Home / Villa</h4>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03, translateY: -4 }}
                onClick={() => handleNext('office', setUseCase)}
                className="p-6 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-slate-800 hover:border-megacharge-green transition-all duration-300 text-center flex flex-col items-center justify-center"
              >
                <div className="p-3 bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-20 rounded-2xl w-fit mb-3 shadow-glow-green flex items-center justify-center">
                  <IconGoogleApartment size={28} className="text-megacharge-green" bounce />
                </div>
                <h4 className="text-white font-extrabold text-sm mb-1">Workplace / Corporate</h4>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03, translateY: -4 }}
                onClick={() => handleNext('commercial', setUseCase)}
                className="p-6 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-slate-800 hover:border-megacharge-green transition-all duration-300 text-center flex flex-col items-center justify-center"
              >
                <div className="p-3 bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-20 rounded-2xl w-fit mb-3 shadow-glow-green flex items-center justify-center">
                  <IconGoogleMall size={28} className="text-megacharge-green" bounce />
                </div>
                <h4 className="text-white font-extrabold text-sm mb-1">Retail Mall / Hotel</h4>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03, translateY: -4 }}
                onClick={() => handleNext('highway', setUseCase)}
                className="p-6 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-slate-800 hover:border-megacharge-green transition-all duration-300 text-center flex flex-col items-center justify-center"
              >
                <div className="p-3 bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-20 rounded-2xl w-fit mb-3 shadow-glow-green flex items-center justify-center">
                  <IconGoogleRoad size={28} className="text-megacharge-green" bounce />
                </div>
                <h4 className="text-white font-extrabold text-sm mb-1">Highway Fast Hub</h4>
              </motion.button>
            </div>
            <button onClick={() => setStep(1)} className="text-xs text-megacharge-text-secondary hover:text-white hover:underline mt-8 block mx-auto">
              &larr; Return to Previous Step
            </button>
          </motion.div>
        )}

        {/* STEP 3: POWER CONNECTION */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white text-xl font-bold text-center mb-8 uppercase tracking-wider">Select Available Grid Power:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.button 
                whileHover={{ scale: 1.03, translateY: -4 }}
                onClick={() => handleNext('1phase', setPower)}
                className="p-8 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-slate-800 hover:border-megacharge-green transition-all duration-300 text-center flex flex-col items-center justify-center"
              >
                <div className="p-3 bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-20 rounded-2xl w-fit mb-3 shadow-glow-green flex items-center justify-center">
                  <IconGoogleOutlet size={24} className="text-megacharge-green" />
                </div>
                <h4 className="text-white font-extrabold text-base mb-1">Single Phase (230V)</h4>
                <p className="text-megacharge-text-secondary text-xs">Standard domestic power lines</p>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03, translateY: -4 }}
                onClick={() => handleNext('3phase', setPower)}
                className="p-8 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-slate-800 hover:border-megacharge-green transition-all duration-300 text-center flex flex-col items-center justify-center"
              >
                <div className="p-3 bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-20 rounded-2xl w-fit mb-3 shadow-glow-green flex items-center justify-center">
                  <IconGoogleBolt size={24} className="text-megacharge-green" pulse />
                </div>
                <h4 className="text-white font-extrabold text-base mb-1">Three Phase (415V)</h4>
                <p className="text-megacharge-text-secondary text-xs">Commercial utility power setup</p>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03, translateY: -4 }}
                onClick={() => handleNext('grid', setPower)}
                className="p-8 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-slate-800 hover:border-megacharge-green transition-all duration-300 text-center flex flex-col items-center justify-center"
              >
                <div className="p-3 bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-20 rounded-2xl w-fit mb-3 shadow-glow-green flex items-center justify-center">
                  <IconGoogleFactory size={24} className="text-megacharge-green" />
                </div>
                <h4 className="text-white font-extrabold text-base mb-1">Substation Grid</h4>
                <p className="text-megacharge-text-secondary text-xs">High-voltage highway connection hubs</p>
              </motion.button>
            </div>
            <button onClick={() => setStep(2)} className="text-xs text-megacharge-text-secondary hover:text-white hover:underline mt-8 block mx-auto">
              &larr; Return to Previous Step
            </button>
          </motion.div>
        )}

        {/* STEP 4: RECOMMENDATION */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto"
          >
            <div className="lg:col-span-7 bg-megacharge-dark bg-opacity-40 p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest block mb-2">Recommended Deployment Hardware</span>
                <h3 className="text-white text-3xl font-extrabold mb-4">{getRecommendation().title}</h3>
                <p className="text-megacharge-text-secondary text-sm leading-relaxed mb-6">
                  {getRecommendation().desc}
                </p>
              </div>
              
              <button 
                onClick={resetSelector} 
                className="text-xs text-megacharge-green hover:underline flex items-center gap-2 font-semibold w-fit hover:scale-105 transition-transform"
              >
                <IconGoogleSync size={16} className="text-megacharge-green" spin /> Calibrate Inputs Again
              </button>
            </div>

            <div className="lg:col-span-5 bg-megacharge-navy bg-opacity-60 p-8 rounded-3xl border border-megacharge-green border-opacity-35 flex flex-col justify-between shadow-glow-green">
              <div>
                <h4 className="text-white font-extrabold text-xs uppercase tracking-widest mb-4 pb-2 border-b border-slate-800">System Specifications:</h4>
                <ul className="flex flex-col gap-3">
                  {getRecommendation().specs.map((spec, i) => (
                    <li key={i} className="text-megacharge-text-secondary text-xs flex items-start gap-2">
                      <span className="text-megacharge-green mt-0.5">&bull;</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a 
                href="/contact" 
                className="w-full text-center bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-xs py-4 rounded-full transition-all duration-300 mt-8 shadow-glow-green block"
              >
                {getRecommendation().cta}
              </a>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default ROIUtilities;
