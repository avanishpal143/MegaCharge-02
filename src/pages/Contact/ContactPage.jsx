import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, IconGoogleBuilding, IconGoogleWork } from '../../components/CustomIcons/CustomIcons';
import './ContactPage.css';
import ContactForm from '../../components/ContactForm/ContactForm';

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
        <div className="p-8 rounded-3xl border border-slate-200 flex flex-col justify-between premium-light-gradient-card">
          <div>
            <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green border border-megacharge-green border-opacity-20 rounded-xl w-fit mb-6 shadow-glow-green">
              <IconGoogleBuilding size={24} bounce />
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
        <div className="p-8 rounded-3xl border border-slate-200 flex flex-col justify-between premium-light-gradient-card">
          <div>
            <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green border border-megacharge-green border-opacity-20 rounded-xl w-fit mb-6 shadow-glow-green">
              <IconGoogleWork size={24} bounce />
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

      {/* REUSABLE TWO COLUMN CONTACT FORM */}
      <ContactForm />

    </div>
  );
};

export default ContactPage;
