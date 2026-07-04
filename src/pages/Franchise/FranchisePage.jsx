/**
 * ========================================
 * Franchise Page Component
 * Purpose:
 * Renders the partner program guidelines,
 * business models (FOCO/FOLO), investment math,
 * and a registration request intake form.
 *
 * Developer Notes:
 * Uses state to handle form submission and validation.
 *
 * ========================================
 */

import React, { useState } from 'react';
import './FranchisePage.css';

/* ==========================================
   FRANCHISE COMPONENT
========================================== */

const FranchisePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    siteType: 'highway',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <div className="franchise-page-container bg-megacharge-dark pt-28 pb-20 px-6">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto mb-16 text-center">
        <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest block mb-2">
          Corporate Partnerships
        </span>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-poppins">
          Launch a MegaCharge <span className="text-gradient-green">Franchise Hub</span>
        </h1>
        <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
          Own a critical piece of India's highway transport grid. Build a profitable CPO business with direct backing from Mega Nirman & Industries Ltd (MNIL).
        </p>
      </section>

      {/* BUSINESS MODELS */}
      <section className="max-w-7xl mx-auto mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* FOCO CARD */}
        <div className="glass-panel p-8 rounded-3xl border border-megacharge-border flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider bg-megacharge-green bg-opacity-10 px-3 py-1 rounded">
                FOCO Model
              </span>
              <span className="text-megacharge-text-secondary text-xs">Franchise Owned · Company Operated</span>
            </div>
            <h3 className="text-white text-2xl font-bold mb-3">Hands-Off Investment</h3>
            <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed mb-6">
              You provide the capital and location; MegaCharge handles charger installations, grid connectivity permissions, remote diagnostic repairs, customer support, and payment clearing. Get monthly lease payouts or revenue shares.
            </p>
            <ul className="flex flex-col gap-2 text-xs text-megacharge-text-secondary mb-6">
              <li>&bull; Minimum Space: 2–4 parking bays</li>
              <li>&bull; Recommended Locations: High-traffic malls, restaurants, city hubs</li>
              <li>&bull; Maintenance: 100% managed by MegaCharge teams</li>
            </ul>
          </div>
          <a href="#enquiry-form" className="text-megacharge-green text-sm font-semibold hover:underline flex items-center gap-1">
            Apply for FOCO Model &rarr;
          </a>
        </div>

        {/* FOLO CARD */}
        <div className="glass-panel p-8 rounded-3xl border border-megacharge-border flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-megacharge-orange text-xs font-bold uppercase tracking-wider bg-megacharge-orange bg-opacity-10 px-3 py-1 rounded">
                FOLO Model
              </span>
              <span className="text-megacharge-text-secondary text-xs">Franchise Owned · Locally Operated</span>
            </div>
            <h3 className="text-white text-2xl font-bold mb-3">Active Operator Model</h3>
            <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed mb-6">
              You own the site and manage daily operations. MegaCharge supplies high-power DC hardware rectifiers and configures our proprietary CPO SaaS software. You retain maximum profit margins per kWh unit charged.
            </p>
            <ul className="flex flex-col gap-2 text-xs text-megacharge-text-secondary mb-6">
              <li>&bull; Minimum Space: 3–6 parking bays</li>
              <li>&bull; Recommended Locations: Major NH highway plaza segments</li>
              <li>&bull; Software Support: 24/7 OCPP cloud backend connection</li>
            </ul>
          </div>
          <a href="#enquiry-form" className="text-megacharge-orange text-sm font-semibold hover:underline flex items-center gap-1">
            Apply for FOLO Model &rarr;
          </a>
        </div>

      </section>

      {/* INVESTMENT & PAYBACK METRICS */}
      <section className="max-w-7xl mx-auto mb-20 bg-megacharge-card border border-megacharge-border p-8 md:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col justify-center">
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Financial Overview</span>
          <h3 className="text-white text-2xl font-bold mt-2 mb-4">Investment Projections</h3>
          <p className="text-megacharge-text-secondary text-xs leading-relaxed">
            Standard metrics for a 2-charger highway station layout (120 kW dual gun DC charger infrastructure). Projections match average MNIL highway grid statistics.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-megacharge-dark border border-megacharge-border">
            <span className="text-megacharge-text-secondary text-[11px] block mb-1">Average CapEx Cost</span>
            <span className="text-white text-xl font-bold font-poppins">₹12 - ₹15 Lakhs</span>
            <p className="text-megacharge-text-secondary text-[10px] mt-2 leading-relaxed">Includes dual CCS2 DC charger setup, civil works, and signage layout.</p>
          </div>
          <div className="p-6 rounded-2xl bg-megacharge-dark border border-megacharge-border">
            <span className="text-megacharge-text-secondary text-[11px] block mb-1">Gross Margin / Unit</span>
            <span className="text-megacharge-green text-xl font-bold font-poppins">₹5.5 - ₹7.0 / kWh</span>
            <p className="text-megacharge-text-secondary text-[10px] mt-2 leading-relaxed">Operating profit margin after local electricity grid supply costs.</p>
          </div>
          <div className="p-6 rounded-2xl bg-megacharge-dark border border-megacharge-border">
            <span className="text-megacharge-text-secondary text-[11px] block mb-1">Payback Period</span>
            <span className="text-white text-xl font-bold font-poppins">18 - 24 Months</span>
            <p className="text-megacharge-text-secondary text-[10px] mt-2 leading-relaxed">Based on 6 average passenger car sessions per charger daily.</p>
          </div>
        </div>
      </section>

      {/* ENQUIRY INTAKE FORM */}
      <section id="enquiry-form" className="max-w-3xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-megacharge-border">
        <div className="text-center mb-8">
          <h3 className="text-white text-2xl font-bold">Apply for Franchise Program</h3>
          <p className="text-megacharge-text-secondary text-xs mt-1">
            Complete the form. Our Corporate Alliances Division will review your site availability details.
          </p>
        </div>

        {submitted ? (
          <div className="text-center p-8 border border-megacharge-green rounded-2xl bg-megacharge-green bg-opacity-5">
            <span className="text-3xl block mb-3">✓</span>
            <h4 className="text-white font-bold text-lg mb-2">Application Received</h4>
            <p className="text-megacharge-text-secondary text-xs leading-relaxed max-w-md mx-auto">
              Thank you for applying. A representative from Mega Nirman & Industries Ltd (MNIL) will connect with you on your registered mobile number within 24 working hours. Reference ID: MC-FR-{Math.floor(Math.random() * 9000 + 1000)}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Your Full Name *</label>
                <input 
                  type="text" required
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
                  placeholder="e.g. Ramesh Sharma"
                />
              </div>
              <div>
                <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Corporate Email *</label>
                <input 
                  type="email" required
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
                  placeholder="e.g. ramesh@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Contact Mobile Number *</label>
                <input 
                  type="tel" required
                  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
                  placeholder="e.g. +91 98765 43210"
                />
              </div>
              <div>
                <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Proposed Site Location *</label>
                <input 
                  type="text" required
                  value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
                  placeholder="e.g. NH44 Expressway, Karnal, Haryana"
                />
              </div>
            </div>

            <div>
              <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Proposed Site Category</label>
              <select 
                value={formData.siteType} onChange={(e) => setFormData({...formData, siteType: e.target.value})}
                className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
              >
                <option value="highway">Highway Stopway Plaza</option>
                <option value="mall">Shopping Mall / Hotel parking</option>
                <option value="office">Corporate Commercial complex</option>
                <option value="residential">Residential Housing society</option>
              </select>
            </div>

            <div>
              <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Site space / grid details (Optional)</label>
              <textarea 
                rows="3"
                value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors resize-none"
                placeholder="Details of available parking slots, transformer capacity (KVA) or lease preferences..."
              />
            </div>

            <button type="submit" className="w-full py-4 bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-xs uppercase rounded-xl transition-all duration-300 shadow-glow-green mt-2">
              Submit Franchise Request
            </button>
          </form>
        )}
      </section>

    </div>
  );
};

export default FranchisePage;
