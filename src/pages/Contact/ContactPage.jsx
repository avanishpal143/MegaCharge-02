import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon } from '../../components/CustomIcons/CustomIcons';
import './ContactPage.css';

/* ==========================================
   CONTACT COMPONENT
========================================== */

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'installation', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const FAQS = [
    {
      q: "What are the head office operating hours for visitors?",
      a: "Our corporate head office in Pitampura, Delhi is open from Monday through Friday, 9:30 AM to 6:30 PM. In-person site survey discussions require prior appointment coordination."
    },
    {
      q: "How can active CPOs contact the dedicated network software support team?",
      a: "Network operators can reach us via our dedicated NOC portal or email at support@megacharge.co.in. Technical troubleshooting tickets are generated instantly."
    },
    {
      q: "Who is the primary contact point for media and investor relation queries?",
      a: "Media, partnerships, and board-level MNIL corporate communication inquiries can be routed directly to corporate@megacharge.co.in."
    }
  ];

  return (
    <div className="contact-page-container bg-slate-50 min-h-screen">
      
      {/* HEADER SECTION (DARK GRADIENT WITH GLOW) */}
      <section className="w-full bg-megacharge-dark pt-32 pb-20 px-6 text-center text-white border-b border-slate-800 relative">
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-poppins">
            Connect with our <span className="text-gradient-green">Support Network</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
            Contact our technical team for charger installation queries, rental quotes, network status reports, or partnership alliances.
          </p>
        </div>
      </section>

      {/* TOUCHPOINTS GRID */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 text-slate-900">
        
        {/* Help Line */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl w-fit mb-6">
              <PhoneIcon className="w-6 h-6" />
            </div>
            <h3 className="text-slate-900 text-xl font-bold mb-2">Emergency Helpline</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              Connect directly with our 24x7 grid control center for active station troubleshooting or charging session failures.
            </p>
          </div>
          <a href="tel:9289555090" className="text-megacharge-green text-lg font-bold font-poppins hover:underline">
            +91 92895 55090
          </a>
        </div>

        {/* Corporate Office */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl w-fit mb-6">
              <span className="text-xl">🏢</span>
            </div>
            <h3 className="text-slate-900 text-xl font-bold mb-2">Head Office Address</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              Mega Nirman & Industries Limited (MNIL), 811-812, Aggarwal Cyber Plaza-1, Netaji Subhash Place, Pitampura, Delhi, 110034.
            </p>
          </div>
          <a href="mailto:sales@megacharge.co.in" className="text-megacharge-green text-sm font-semibold hover:underline">
            sales@megacharge.co.in
          </a>
        </div>

        {/* Business Sales */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl w-fit mb-6">
              <span className="text-xl">💼</span>
            </div>
            <h3 className="text-slate-900 text-xl font-bold mb-2">Corporate Sales Division</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              Reach our corporate alliances divisions directly for land lease quotes, highway plaza bids, or bulk logistics charger deals.
            </p>
          </div>
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">
            Response under 24 Hours
          </span>
        </div>

      </section>

      {/* CONTACT FAQs SECTION */}
      <section className="max-w-4xl mx-auto pb-24 px-6">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-slate-900 text-3xl font-extrabold">General & NOC Support FAQs</h2>
        </motion.div>

        <div className="flex flex-col gap-5">
          {FAQS.map((faq, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ scale: 1.01 }}
              className="faq-item rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
              >
                <span className="text-slate-700 font-medium text-sm sm:text-base">{faq.q}</span>
                <span className="text-megacharge-green text-xl font-bold">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              
              <div 
                className={`faq-answer-container transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-[300px] border-t border-slate-100 p-6' : 'max-h-0'}`}
                style={{ overflow: 'hidden' }}
              >
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT/INSTALL FORM (2-COLUMN PREMIUM LAYOUT) */}
      <section className="max-w-7xl mx-auto pb-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-5 blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Left Column: Contact details (Talk to Our Team) */}
          <div className="lg:col-span-6 flex flex-col gap-8 text-slate-900">
            <div>
              <span className="text-megacharge-orange text-xs font-bold uppercase tracking-widest bg-megacharge-orange bg-opacity-5 border border-megacharge-orange border-opacity-20 px-4 py-1.5 rounded-full inline-block mb-3 font-mono">
                Get In Touch
              </span>
              <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold font-poppins leading-none tracking-tight">
                Talk to Our Team
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mt-4">
                Have questions about our chargers, rental terms, software compatibility, or installation packages? Connect directly with our team, and let's get you set up.
              </p>
            </div>
            
            {/* Contact details cards */}
            <div className="flex flex-col gap-4">
              {/* Sales Card */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-megacharge-orange hover:shadow-md">
                <div className="p-3 bg-megacharge-orange bg-opacity-10 text-megacharge-orange rounded-xl flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Sales & Partnerships</span>
                  <a href="tel:9289555090" className="text-slate-950 font-bold text-sm sm:text-base hover:underline">+91 92895 55090</a>
                </div>
              </div>

              {/* Support Card */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-megacharge-orange hover:shadow-md">
                <div className="p-3 bg-megacharge-orange bg-opacity-10 text-megacharge-orange rounded-xl flex items-center justify-center">
                  <span className="text-lg">✉</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Support & NOC</span>
                  <a href="mailto:support@megacharge.co.in" className="text-slate-950 font-bold text-sm sm:text-base hover:underline">support@megacharge.co.in</a>
                </div>
              </div>

              {/* Address Card */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-megacharge-orange hover:shadow-md">
                <div className="p-3 bg-megacharge-orange bg-opacity-10 text-megacharge-orange rounded-xl flex items-center justify-center">
                  <span className="text-lg">🏢</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Headquarters Location</span>
                  <span className="text-slate-950 font-bold text-xs sm:text-sm">811-812, Aggarwal Cyber Plaza-1, NSP, Pitampura, Delhi 110034</span>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-megacharge-orange hover:shadow-md">
                <div className="p-3 bg-megacharge-orange bg-opacity-10 text-megacharge-orange rounded-xl flex items-center justify-center">
                  <span className="text-lg">💬</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">WhatsApp Support Chat</span>
                  <a href="https://wa.me/919289555090" target="_blank" rel="noopener noreferrer" className="text-slate-950 font-bold text-sm sm:text-base hover:underline">Chat with us now</a>
                </div>
              </div>
            </div>

            {/* Bottom tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full font-semibold">• Direct Grid Connection</span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full font-semibold">• Live Telemetry Link</span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full font-semibold">• 24/7 Grid Operations</span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full font-semibold">• Zero Maintenance Fees</span>
            </div>
          </div>

          {/* Right Column: Dark Form Card */}
          <div className="lg:col-span-6 w-full">
            <motion.div 
              {...fadeInUp}
              className="premium-glass-card-dark p-8 md:p-10 rounded-3xl border border-megacharge-orange border-opacity-25 flex flex-col gap-6 shadow-glow-orange text-white relative z-10"
            >
              <div className="border-b border-slate-800 pb-4">
                <span className="text-megacharge-orange text-[10px] font-bold uppercase tracking-wider font-mono">Inquiry Intake Portal</span>
                <h3 className="text-white text-2xl font-extrabold leading-tight mt-1">Submit an Inquiry</h3>
                <p className="text-slate-300 text-xs leading-relaxed mt-1">
                  Complete the details below, and our coordinator will connect with you.
                </p>
              </div>

              {submitted ? (
                <div className="text-center p-8 border border-green-500 border-opacity-40 rounded-2xl bg-green-500 bg-opacity-5">
                  <span className="text-3xl block mb-3">✓</span>
                  <h4 className="text-white font-bold text-lg mb-2">Message Sent Successfully</h4>
                  <p className="text-slate-300 text-xs leading-relaxed max-w-md mx-auto">
                    Your inquiry has been catalogued. A coordinator will reach out shortly. Reference ID: MC-TKT-{Math.floor(Math.random() * 90000 + 10000)}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4.5 w-full text-slate-900">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Your Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your name" 
                        className="bg-megacharge-dark border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-orange transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="email@domain.com" 
                        className="bg-megacharge-dark border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-orange transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Topic of Discussion *</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="bg-megacharge-dark border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-orange transition-colors cursor-pointer"
                    >
                      <option value="installation" className="bg-megacharge-dark">EV Charger Installation Request</option>
                      <option value="franchise" className="bg-megacharge-dark">Franchise Program / FOCO Model</option>
                      <option value="support" className="bg-megacharge-dark">Active Station Help / OCPP Support</option>
                      <option value="sales" className="bg-megacharge-dark">Corporate Sales & Bulk Hardware</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Message Detail *</label>
                    <textarea 
                      rows="3" 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Details of your installation project, site power connection metrics, or general feedback..." 
                      className="bg-megacharge-dark border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-orange transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full text-center bg-megacharge-orange hover:bg-megacharge-navy text-megacharge-dark hover:text-white font-bold text-xs py-4 rounded-xl transition-all duration-300 mt-2 block shadow-glow-orange uppercase tracking-wider font-mono"
                  >
                    Send Message &rarr;
                  </button>
                </form>
              )}

              {/* Form Stats Footer inside Card */}
              <div className="grid grid-cols-3 gap-2 border-t border-slate-800 pt-4 mt-2 text-center">
                <div>
                  <span className="block text-white text-base font-extrabold">500+</span>
                  <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Stations</span>
                </div>
                <div>
                  <span className="block text-white text-base font-extrabold">99.9%</span>
                  <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Uptime SLA</span>
                </div>
                <div>
                  <span className="block text-white text-base font-extrabold">5 MW+</span>
                  <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Power Dispensed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
