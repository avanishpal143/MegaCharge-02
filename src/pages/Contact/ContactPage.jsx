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
      <section className="w-full bg-[#0B132B] pt-32 pb-20 px-6 text-center text-white border-b border-slate-800 relative">
        <div className="absolute inset-0 bg-gradient-radial from-[#00B4D8] to-transparent opacity-10 blur-3xl pointer-events-none" />
        
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
            <div className="p-3 bg-[#00B4D8] bg-opacity-10 text-[#00B4D8] rounded-xl w-fit mb-6">
              <PhoneIcon className="w-6 h-6" />
            </div>
            <h3 className="text-slate-900 text-xl font-bold mb-2">Emergency Helpline</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              Connect directly with our 24x7 grid control center for active station troubleshooting or charging session failures.
            </p>
          </div>
          <a href="tel:9289555090" className="text-[#00B4D8] text-lg font-bold font-poppins hover:underline">
            +91 92895 55090
          </a>
        </div>

        {/* Corporate Office */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3 bg-[#00B4D8] bg-opacity-10 text-[#00B4D8] rounded-xl w-fit mb-6">
              <span className="text-xl">🏢</span>
            </div>
            <h3 className="text-slate-900 text-xl font-bold mb-2">Head Office Address</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              Mega Nirman & Industries Limited (MNIL), 811-812, Aggarwal Cyber Plaza-1, Netaji Subhash Place, Pitampura, Delhi, 110034.
            </p>
          </div>
          <a href="mailto:sales@megacharge.co.in" className="text-[#00B4D8] text-sm font-semibold hover:underline">
            sales@megacharge.co.in
          </a>
        </div>

        {/* Business Sales */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3 bg-[#00B4D8] bg-opacity-10 text-[#00B4D8] rounded-xl w-fit mb-6">
              <span className="text-xl">💼</span>
            </div>
            <h3 className="text-slate-900 text-xl font-bold mb-2">Corporate Sales Division</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              Reach our corporate alliances divisions directly for land lease quotes, highway plaza bids, or bulk logistics charger deals.
            </p>
          </div>
          <span className="text-[#00B4D8] text-xs font-bold uppercase tracking-wider">
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
                <span className="text-slate-900 font-extrabold text-sm sm:text-base">{faq.q}</span>
                <span className="text-[#00B4D8] text-xl font-bold">
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

      {/* CONTACT/INSTALL FORM */}
      <section className="max-w-3xl mx-auto pb-32 px-6">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm text-slate-900">
          <div className="text-center mb-8">
            <h3 className="text-slate-900 text-2xl font-bold">Submit an Inquiry</h3>
            <p className="text-slate-600 text-xs mt-1">
              Complete the details below, and our respective coordinator will connect with you.
            </p>
          </div>

          {submitted ? (
            <div className="text-center p-8 border border-green-500 border-opacity-40 rounded-2xl bg-green-500 bg-opacity-5">
              <span className="text-3xl block mb-3">✓</span>
              <h4 className="text-slate-900 font-bold text-lg mb-2">Message Sent Successfully</h4>
              <p className="text-slate-600 text-xs leading-relaxed max-w-md mx-auto">
                Your inquiry has been catalogued. A field support engineer or alliance coordinator will reach out shortly. Reference ID: MC-TKT-{Math.floor(Math.random() * 90000 + 10000)}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-slate-900">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-slate-700 text-xs block mb-2 font-semibold">Your Name *</label>
                  <input 
                    type="text" required
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#00B4D8] transition-colors"
                    placeholder="e.g. Anand Sen"
                  />
                </div>
                <div>
                  <label className="text-slate-700 text-xs block mb-2 font-semibold">Email Address *</label>
                  <input 
                    type="email" required
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#00B4D8] transition-colors"
                    placeholder="e.g. anand@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 text-xs block mb-2 font-semibold">Topic of Discussion *</label>
                <select 
                  value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#00B4D8] transition-colors"
                >
                  <option value="installation">EV Charger Installation Request</option>
                  <option value="franchise">Franchise Program / FOCO Model</option>
                  <option value="support">Active Station Help / OCPP Support</option>
                  <option value="sales">Corporate Sales & Bulk Hardware</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 text-xs block mb-2 font-semibold">Message Detail *</label>
                <textarea 
                  rows="4" required
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#00B4D8] transition-colors resize-none"
                  placeholder="Details of your installation project, site power connection metrics, or general feedback..."
                />
              </div>

              <button type="submit" className="w-full py-4 bg-[#00B4D8] hover:bg-opacity-95 text-white font-bold text-xs uppercase rounded-xl transition-all duration-300 shadow-sm mt-2">
                Send Message &rarr;
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
