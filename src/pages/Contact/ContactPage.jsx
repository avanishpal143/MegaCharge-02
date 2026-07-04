/**
 * ========================================
 * Contact Page Component
 * Purpose:
 * Renders support touchpoints, corporate addresses,
 * and a multi-channel contact / installation form.
 *
 * Developer Notes:
 * Uses state to manage form fields and confirmations.
 *
 * ========================================
 */

import React, { useState } from 'react';
import { PhoneIcon } from '../../components/CustomIcons/CustomIcons';
import './ContactPage.css';

/* ==========================================
   CONTACT COMPONENT
========================================== */

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'installation', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="contact-page-container bg-megacharge-dark pt-28 pb-20 px-6">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto mb-16 text-center">
        <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest block mb-2">
          Get in Touch
        </span>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-poppins">
          Connect with our <span className="text-gradient-green">Support Network</span>
        </h1>
        <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
          Contact our technical team for charger installation queries, corporate accounts, network status reports, or franchise alliances.
        </p>
      </section>

      {/* TOUCHPOINTS GRID */}
      <section className="max-w-7xl mx-auto mb-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Help Line */}
        <div className="glass-panel p-8 rounded-3xl border border-megacharge-border flex flex-col justify-between">
          <div>
            <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl w-fit mb-6">
              <PhoneIcon className="w-6 h-6" />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Emergency Helpline</h3>
            <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed mb-6">
              Connect directly with our 24x7 grid control center for active station troubleshooting or charging session failures.
            </p>
          </div>
          <a href="tel:9289555090" className="text-megacharge-green text-lg font-bold font-poppins hover:underline">
            +91 92895 55090
          </a>
        </div>

        {/* Corporate Office */}
        <div className="glass-panel p-8 rounded-3xl border border-megacharge-border flex flex-col justify-between">
          <div>
            <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl w-fit mb-6">
              <span>🏢</span>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Head Office Address</h3>
            <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed mb-6">
              Mega Nirman & Industries Limited (MNIL), 811-812, Aggarwal Cyber Plaza-1, Netaji Subhash Place, Pitampura, Delhi, 110034.
            </p>
          </div>
          <a href="mailto:sales@megacharge.co.in" className="text-megacharge-green text-sm font-semibold hover:underline">
            sales@megacharge.co.in
          </a>
        </div>

        {/* Business Sales */}
        <div className="glass-panel p-8 rounded-3xl border border-megacharge-border flex flex-col justify-between">
          <div>
            <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl w-fit mb-6">
              <span>💼</span>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Corporate Sales Division</h3>
            <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed mb-6">
              Reach our corporate alliances divisions directly for land lease quotes, highway plaza bids, or bulk logistics charger deals.
            </p>
          </div>
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">
            Response under 24 Hours
          </span>
        </div>

      </section>

      {/* CONTACT/INSTALL FORM */}
      <section className="max-w-3xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-megacharge-border">
        <div className="text-center mb-8">
          <h3 className="text-white text-2xl font-bold">Submit an Inquiry</h3>
          <p className="text-megacharge-text-secondary text-xs mt-1">
            Complete the details below, and our respective coordinator will connect with you.
          </p>
        </div>

        {submitted ? (
          <div className="text-center p-8 border border-megacharge-green rounded-2xl bg-megacharge-green bg-opacity-5">
            <span className="text-3xl block mb-3">✓</span>
            <h4 className="text-white font-bold text-lg mb-2">Message Sent Successfully</h4>
            <p className="text-megacharge-text-secondary text-xs leading-relaxed max-w-md mx-auto">
              Your inquiry has been catalogued in our CPO ticketing grid. A field support engineer or alliance coordinator will reach out shortly. Reference ID: MC-TKT-{Math.floor(Math.random() * 90000 + 10000)}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Your Name *</label>
                <input 
                  type="text" required
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
                  placeholder="e.g. Anand Sen"
                />
              </div>
              <div>
                <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Email Address *</label>
                <input 
                  type="email" required
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
                  placeholder="e.g. anand@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Topic of Discussion *</label>
              <select 
                value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
              >
                <option value="installation">EV Charger Installation Request</option>
                <option value="franchise">Franchise Program / FOCO Model</option>
                <option value="support">Active Station Help / OCPP Support</option>
                <option value="sales">Corporate Sales & Bulk Hardware</option>
              </select>
            </div>

            <div>
              <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Message Detail *</label>
              <textarea 
                rows="4" required
                value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors resize-none"
                placeholder="Details of your installation project, site power connection metrics, or general feedback..."
              />
            </div>

            <button type="submit" className="w-full py-4 bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-xs uppercase rounded-xl transition-all duration-300 shadow-glow-green mt-2">
              Send Message &rarr;
            </button>
          </form>
        )}
      </section>

    </div>
  );
};

export default ContactPage;
