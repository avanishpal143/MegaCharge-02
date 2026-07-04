/**
 * ========================================
 * ROI & Savings Utilities Component
 * Purpose:
 * Provides interactive calculators for savings,
 * ROI analysis, and charger recommendations.
 *
 * Developer Notes:
 * Uses state hooks for range input math
 * and multi-step forms.
 *
 * ========================================
 */

import React, { useState } from 'react';
import { BoltIcon, LeafIcon, ChargerIcon, UsersIcon } from '../CustomIcons/CustomIcons';

/* ==========================================
   UTILITY CONTAINER
========================================== */

const ROIUtilities = () => {
  const [activeTab, setActiveTab] = useState('savings'); // 'savings' | 'roi' | 'select'

  return (
    <div className="roi-utilities-wrapper w-full max-w-5xl mx-auto glass-panel p-6 md:p-10 rounded-3xl border border-megacharge-border">
      
      {/* TABS HEADER */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-10 pb-6 border-b border-megacharge-border">
        <button 
          onClick={() => setActiveTab('savings')}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-sm ${activeTab === 'savings' ? 'bg-megacharge-green text-white shadow-glow-green' : 'text-megacharge-text-secondary hover:text-white'}`}
        >
          <LeafIcon className="w-4 h-4" /> Cost & CO₂ Savings
        </button>
        <button 
          onClick={() => setActiveTab('roi')}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-sm ${activeTab === 'roi' ? 'bg-megacharge-green text-white shadow-glow-green' : 'text-megacharge-text-secondary hover:text-white'}`}
        >
          <UsersIcon className="w-4 h-4" /> Commercial ROI
        </button>
        <button 
          onClick={() => setActiveTab('select')}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-sm ${activeTab === 'select' ? 'bg-megacharge-green text-white shadow-glow-green' : 'text-megacharge-text-secondary hover:text-white'}`}
        >
          <ChargerIcon className="w-4 h-4" /> Charger Selector
        </button>
      </div>

      {/* TABS CONTENT */}
      <div className="tab-contents">
        {activeTab === 'savings' && <SavingsCalculator />}
        {activeTab === 'roi' && <ROICalculator />}
        {activeTab === 'select' && <ChargerSelector />}
      </div>

    </div>
  );
};

/* ==========================================
   1. SAVINGS CALCULATOR
========================================== */

const SavingsCalculator = () => {
  const [dailyKm, setDailyKm] = useState(50);
  const [fuelCost, setFuelCost] = useState(100);
  const [efficiency, setEfficiency] = useState(15);
  const [tariff, setTariff] = useState(8);
  
  // Constants
  const evEfficiency = 6.5; // km per kWh (avg)
  
  // Math
  const petrolCostPerKm = fuelCost / efficiency;
  const evCostPerKm = tariff / evEfficiency;
  const savingsPerKm = petrolCostPerKm - evCostPerKm;
  
  const monthlySavings = Math.round(savingsPerKm * dailyKm * 30);
  const yearlySavings = Math.round(savingsPerKm * dailyKm * 365);
  const co2Offset = Math.round(dailyKm * 365 * 0.120); // 120g CO2 per km for average petrol car

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      
      {/* Sliders Area */}
      <div className="flex flex-col gap-6">
        <h3 className="text-white text-xl font-bold mb-2">Estimate Fuel Savings</h3>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-megacharge-text-secondary text-sm">Daily Commute Distance:</span>
            <span className="text-megacharge-green font-bold">{dailyKm} km</span>
          </div>
          <input 
            type="range" min="10" max="300" step="5"
            value={dailyKm} onChange={(e) => setDailyKm(Number(e.target.value))}
            className="w-full accent-megacharge-green bg-megacharge-border rounded-lg h-2"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-megacharge-text-secondary text-sm">Petrol/Diesel Cost (per Litre):</span>
            <span className="text-megacharge-green font-bold">₹{fuelCost}</span>
          </div>
          <input 
            type="range" min="80" max="150" step="1"
            value={fuelCost} onChange={(e) => setFuelCost(Number(e.target.value))}
            className="w-full accent-megacharge-green bg-megacharge-border rounded-lg h-2"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-megacharge-text-secondary text-sm">ICE Vehicle Fuel Efficiency:</span>
            <span className="text-megacharge-green font-bold">{efficiency} km/L</span>
          </div>
          <input 
            type="range" min="8" max="25" step="0.5"
            value={efficiency} onChange={(e) => setEfficiency(Number(e.target.value))}
            className="w-full accent-megacharge-green bg-megacharge-border rounded-lg h-2"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-megacharge-text-secondary text-sm">Electricity Tariff (per Unit):</span>
            <span className="text-megacharge-green font-bold">₹{tariff} / kWh</span>
          </div>
          <input 
            type="range" min="5" max="15" step="0.5"
            value={tariff} onChange={(e) => setTariff(Number(e.target.value))}
            className="w-full accent-megacharge-green bg-megacharge-border rounded-lg h-2"
          />
        </div>
      </div>

      {/* Output Results Area */}
      <div className="bg-megacharge-card border border-megacharge-border rounded-2xl p-8 flex flex-col justify-between">
        <div>
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Estimated Savings</span>
          <h2 className="text-white text-3xl font-extrabold mt-2 mb-6">Drive Sustainable</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="border-l-2 border-megacharge-green pl-4">
              <span className="text-megacharge-text-secondary text-xs block">Monthly Savings</span>
              <span className="text-white text-2xl font-bold font-poppins">₹{monthlySavings.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-l-2 border-megacharge-green pl-4">
              <span className="text-megacharge-text-secondary text-xs block">Annual Savings</span>
              <span className="text-white text-2xl font-bold font-poppins">₹{yearlySavings.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="border-t border-megacharge-border pt-6 flex items-center gap-4">
            <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl">
              <LeafIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-megacharge-text-secondary text-xs block">Annual CO₂ Emissions Reduced</span>
              <span className="text-megacharge-green text-lg font-bold font-poppins">{co2Offset.toLocaleString()} kg of CO₂</span>
            </div>
          </div>
        </div>

        <p className="text-megacharge-text-secondary text-xs leading-relaxed mt-6">
          *Calculations based on average EV motor efficiency of 6.5 km/kWh compared to equivalent internal combustion vehicles. Actual savings may vary with driving patterns.
        </p>
      </div>

    </div>
  );
};

/* ==========================================
   2. ROI CALCULATOR
========================================== */

const ROICalculator = () => {
  const [chargersCount, setChargersCount] = useState(2);
  const [sessions, setSessions] = useState(5);
  const [avgKwh, setAvgKwh] = useState(40);
  const [margin, setMargin] = useState(6);
  const [investment, setInvestment] = useState(12); // Lakhs

  // Math
  const dailyKwh = chargersCount * sessions * avgKwh;
  const dailyProfit = dailyKwh * margin;
  const monthlyProfit = dailyProfit * 30;
  const annualProfit = monthlyProfit * 12;
  const paybackMonths = Math.round((investment * 100000) / monthlyProfit * 10) / 10;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      
      {/* Inputs Area */}
      <div className="flex flex-col gap-6">
        <h3 className="text-white text-xl font-bold mb-2">Franchise & CPO Yield</h3>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-megacharge-text-secondary text-sm">Number of DC Chargers:</span>
            <span className="text-megacharge-green font-bold">{chargersCount} Units</span>
          </div>
          <input 
            type="range" min="1" max="10" step="1"
            value={chargersCount} onChange={(e) => setChargersCount(Number(e.target.value))}
            className="w-full accent-megacharge-green bg-megacharge-border rounded-lg h-2"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-megacharge-text-secondary text-sm">Daily Sessions (Per Charger):</span>
            <span className="text-megacharge-green font-bold">{sessions} sessions</span>
          </div>
          <input 
            type="range" min="2" max="15" step="1"
            value={sessions} onChange={(e) => setSessions(Number(e.target.value))}
            className="w-full accent-megacharge-green bg-megacharge-border rounded-lg h-2"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-megacharge-text-secondary text-sm">Avg Power Dispensed per session:</span>
            <span className="text-megacharge-green font-bold">{avgKwh} kWh</span>
          </div>
          <input 
            type="range" min="20" max="80" step="5"
            value={avgKwh} onChange={(e) => setAvgKwh(Number(e.target.value))}
            className="w-full accent-megacharge-green bg-megacharge-border rounded-lg h-2"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-megacharge-text-secondary text-sm">Gross margin (per Unit/kWh):</span>
            <span className="text-megacharge-green font-bold">₹{margin}</span>
          </div>
          <input 
            type="range" min="2" max="12" step="0.5"
            value={margin} onChange={(e) => setMargin(Number(e.target.value))}
            className="w-full accent-megacharge-green bg-megacharge-border rounded-lg h-2"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-megacharge-text-secondary text-sm">Setup Capital Investment:</span>
            <span className="text-megacharge-green font-bold">₹{investment} Lakhs</span>
          </div>
          <input 
            type="range" min="3" max="50" step="1"
            value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full accent-megacharge-green bg-megacharge-border rounded-lg h-2"
          />
        </div>
      </div>

      {/* Outputs Area */}
      <div className="bg-megacharge-card border border-megacharge-border rounded-2xl p-8 flex flex-col justify-between">
        <div>
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">ROI Metrics</span>
          <h2 className="text-white text-3xl font-extrabold mt-2 mb-6">Invest in the Future</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="border-l-2 border-megacharge-green pl-4">
              <span className="text-megacharge-text-secondary text-xs block">Annual Profit</span>
              <span className="text-white text-2xl font-bold font-poppins">₹{annualProfit.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-l-2 border-megacharge-green pl-4">
              <span className="text-megacharge-text-secondary text-xs block">Payback Period</span>
              <span className="text-megacharge-green text-2xl font-bold font-poppins">{paybackMonths} Months</span>
            </div>
          </div>

          <div className="border-t border-megacharge-border pt-6 flex items-center gap-4">
            <div className="p-3 bg-megacharge-orange bg-opacity-10 text-megacharge-orange rounded-xl">
              <BoltIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-megacharge-text-secondary text-xs block">Power Dispensed (Daily)</span>
              <span className="text-white text-lg font-bold font-poppins">{dailyKwh} kWh / Day</span>
            </div>
          </div>
        </div>

        <p className="text-megacharge-text-secondary text-xs leading-relaxed mt-6">
          *Payback projections exclude site rent and local demand charges. Projections align with standard MNIL franchise margins.
        </p>
      </div>

    </div>
  );
};

/* ==========================================
   3. CHARGER SELECTOR
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
        desc: 'Sleek, wall-mounted, intelligent charger. Integrates with the MegaCharge mobile app for RFID swipe-and-charge, schedules, and usage reports.',
        specs: ['Output: 7.4 kW (Single-phase 32A)', 'Connector: Type 2', 'Safety: Built-in Overcurrent & Temp diagnostics', 'Connectivity: Wi-Fi, Bluetooth, RFID'],
        cta: 'Request Home Installation'
      };
    } else if (power === '3phase' || useCase === 'office' || useCase === 'commercial') {
      return {
        title: 'MegaCharge 30 kW - 60 kW DC Fast Charger',
        desc: 'Perfect for corporate fleets, commercial complexes, and employee parking hubs. Rapid charging that supports multi-port vehicle splits.',
        specs: ['Output: 30–60 kW (Three-phase)', 'Connector: CCS2 / CHAdeMO dual connector', 'Network: OCPP 1.6 cloud integration', 'Monetization: Instant QR / UPI wallet payments'],
        cta: 'Enquire for Corporate Pricing'
      };
    } else {
      return {
        title: 'MegaCharge 120 kW - 180 kW Dual-Gun DC Charger',
        desc: 'Designed for commercial charging networks and public highway stations. Extreme fast-charging capability that powers dual heavy vehicles concurrently.',
        specs: ['Output: 120–180 kW', 'Connector: Dual CCS2 High-Power Guns', 'Efficiency: 98%+ active rectifiers', 'Monitoring: 24/7 remote diagnostic diagnostics'],
        cta: 'Connect with Sales & CPO'
      };
    }
  };

  return (
    <div className="min-h-[300px] flex flex-col justify-center">
      
      {/* STEP 1: VEHICLE SELECT */}
      {step === 1 && (
        <div>
          <h3 className="text-white text-xl font-bold text-center mb-6">Select your vehicle profile:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={() => handleNext('2w', setVehicle)}
              className="p-6 rounded-2xl bg-megacharge-card border border-megacharge-border hover:border-megacharge-green transition-all duration-300 text-center"
            >
              <div className="text-3xl mb-3">🛵</div>
              <h4 className="text-white font-bold mb-1">Two/Three-Wheeler</h4>
              <p className="text-megacharge-text-secondary text-xs">EV Bikes, Scooters, Rickshaws</p>
            </button>
            <button 
              onClick={() => handleNext('car', setVehicle)}
              className="p-6 rounded-2xl bg-megacharge-card border border-megacharge-border hover:border-megacharge-green transition-all duration-300 text-center"
            >
              <div className="text-3xl mb-3">🚗</div>
              <h4 className="text-white font-bold mb-1">Passenger Vehicle</h4>
              <p className="text-megacharge-text-secondary text-xs">Standard EVs (SUV, Sedans)</p>
            </button>
            <button 
              onClick={() => handleNext('fleet', setVehicle)}
              className="p-6 rounded-2xl bg-megacharge-card border border-megacharge-border hover:border-megacharge-green transition-all duration-300 text-center"
            >
              <div className="text-3xl mb-3">🚛</div>
              <h4 className="text-white font-bold mb-1">Commercial Fleet</h4>
              <p className="text-megacharge-text-secondary text-xs">Delivery trucks, e-commerce vehicles, buses</p>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: USE CASE SELECT */}
      {step === 2 && (
        <div>
          <h3 className="text-white text-xl font-bold text-center mb-6">Where will the charger be installed?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <button 
              onClick={() => handleNext('home', setUseCase)}
              className="p-5 rounded-2xl bg-megacharge-card border border-megacharge-border hover:border-megacharge-green transition-all duration-300 text-center"
            >
              <div className="text-3xl mb-3">🏠</div>
              <h4 className="text-white font-bold text-sm mb-1">Home / Villa</h4>
            </button>
            <button 
              onClick={() => handleNext('office', setUseCase)}
              className="p-5 rounded-2xl bg-megacharge-card border border-megacharge-border hover:border-megacharge-green transition-all duration-300 text-center"
            >
              <div className="text-3xl mb-3">🏢</div>
              <h4 className="text-white font-bold text-sm mb-1">Workplace / Corporate</h4>
            </button>
            <button 
              onClick={() => handleNext('commercial', setUseCase)}
              className="p-5 rounded-2xl bg-megacharge-card border border-megacharge-border hover:border-megacharge-green transition-all duration-300 text-center"
            >
              <div className="text-3xl mb-3">🛍️</div>
              <h4 className="text-white font-bold text-sm mb-1">Mall / Hotel / Public</h4>
            </button>
            <button 
              onClick={() => handleNext('highway', setUseCase)}
              className="p-5 rounded-2xl bg-megacharge-card border border-megacharge-border hover:border-megacharge-green transition-all duration-300 text-center"
            >
              <div className="text-3xl mb-3">🛣️</div>
              <h4 className="text-white font-bold text-sm mb-1">Highway Fast Hub</h4>
            </button>
          </div>
          <button onClick={() => setStep(1)} className="text-xs text-megacharge-text-secondary hover:underline mt-6 block text-center">
            &larr; Go Back
          </button>
        </div>
      )}

      {/* STEP 3: POWER SUPPLY */}
      {step === 3 && (
        <div>
          <h3 className="text-white text-xl font-bold text-center mb-6">Select available power connection:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={() => handleNext('1phase', setPower)}
              className="p-6 rounded-2xl bg-megacharge-card border border-megacharge-border hover:border-megacharge-green transition-all duration-300 text-center"
            >
              <div className="text-2xl mb-3">🔌</div>
              <h4 className="text-white font-bold mb-1">Single Phase (230V)</h4>
              <p className="text-megacharge-text-secondary text-xs">Standard domestic lines</p>
            </button>
            <button 
              onClick={() => handleNext('3phase', setPower)}
              className="p-6 rounded-2xl bg-megacharge-card border border-megacharge-border hover:border-megacharge-green transition-all duration-300 text-center"
            >
              <div className="text-2xl mb-3">⚡</div>
              <h4 className="text-white font-bold mb-1">Three Phase (415V)</h4>
              <p className="text-megacharge-text-secondary text-xs">Industrial / Commercial utility</p>
            </button>
            <button 
              onClick={() => handleNext('grid', setPower)}
              className="p-6 rounded-2xl bg-megacharge-card border border-megacharge-border hover:border-megacharge-green transition-all duration-300 text-center"
            >
              <div className="text-2xl mb-3">🏭</div>
              <h4 className="text-white font-bold mb-1">Substation / Grid Power</h4>
              <p className="text-megacharge-text-secondary text-xs">High-voltage highway grids</p>
            </button>
          </div>
          <button onClick={() => setStep(2)} className="text-xs text-megacharge-text-secondary hover:underline mt-6 block text-center">
            &larr; Go Back
          </button>
        </div>
      )}

      {/* STEP 4: RECOMMENDATION */}
      {step === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Recommended Hardware</span>
            <h3 className="text-white text-2xl font-bold mt-2 mb-4">{getRecommendation().title}</h3>
            <p className="text-megacharge-text-secondary text-sm leading-relaxed mb-6">
              {getRecommendation().desc}
            </p>
            
            <button onClick={resetSelector} className="text-xs text-megacharge-green hover:underline flex items-center gap-1 font-semibold">
              🔄 Run Selector Again
            </button>
          </div>

          <div className="bg-megacharge-border bg-opacity-35 p-6 rounded-2xl border border-megacharge-border flex flex-col justify-between">
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Key Specifications:</h4>
              <ul className="flex flex-col gap-2.5">
                {getRecommendation().specs.map((spec, i) => (
                  <li key={i} className="text-megacharge-text-secondary text-xs flex items-center gap-2">
                    <span className="text-megacharge-green">&bull;</span> {spec}
                  </li>
                ))}
              </ul>
            </div>
            <a href="/contact" className="w-full text-center bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-xs py-3.5 rounded-full transition-all duration-300 mt-6 shadow-glow-green block">
              {getRecommendation().cta}
            </a>
          </div>
        </div>
      )}

    </div>
  );
};

export default ROIUtilities;
