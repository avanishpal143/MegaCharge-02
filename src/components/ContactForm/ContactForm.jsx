import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', location: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-32 px-6 relative bg-megacharge-dark border-t border-slate-800 text-white w-full">
      <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch text-left text-white">
        
        {/* Left Column: Contact info and Social connections */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 w-full premium-glass-card-dark p-8 md:p-10 rounded-3xl border border-slate-800 flex flex-col gap-10 h-full"
        >
          <div>
            <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest bg-megacharge-green bg-opacity-5 border border-megacharge-green border-opacity-25 px-4 py-1.5 rounded-full inline-block mb-4 font-mono">
              Rental & Support Registry
            </span>
            <h2 className="text-white text-3xl sm:text-5xl font-extrabold leading-tight font-poppins">
              Ready to Rent an<br />
              <span className="text-gradient-green">EV Charging Station?</span>
            </h2>
            <p className="text-slate-350 text-sm leading-relaxed mt-4">
              Partner with MegaCharge to launch premium EV charging spaces. Provide your coordinates for a free structural assessment and customized rental proposal.
            </p>
          </div>

          {/* Address, Phone, Email indicators */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4.5">
              <div className="p-3.5 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-2xl border border-megacharge-green border-opacity-20 shadow-glow-green">
                <FaPhoneAlt className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Helpline Number</span>
                <span className="text-white text-sm font-bold">+91 92895 55090</span>
              </div>
            </div>

            <div className="flex items-center gap-4.5">
              <div className="p-3.5 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-2xl border border-megacharge-green border-opacity-20 shadow-glow-green">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Corporate Email</span>
                <span className="text-white text-sm font-bold">rentals@megacharge.in</span>
              </div>
            </div>

            <div className="flex items-center gap-4.5">
              <div className="p-3.5 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-2xl border border-megacharge-green border-opacity-20 shadow-glow-green">
                <FaMapMarkerAlt className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Registered Headquarters</span>
                <span className="text-white text-sm font-bold">MNIL Holdings Corporate Plazas, Gurugram, Haryana</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Registration Form Container */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 w-full premium-glass-card-dark p-8 md:p-10 rounded-3xl border border-megacharge-green border-opacity-25 shadow-glow-green h-full"
        >
          {submitted ? (
            <div className="p-8 border border-green-500 border-opacity-40 rounded-2xl bg-green-500 bg-opacity-5 text-center w-full">
              <span className="text-4xl block mb-4">🎉</span>
              <h4 className="text-white text-xl font-bold mb-2">Rental Enquiry Submitted!</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Thank you for reaching out. A MegaCharge representative will contact you within 24 hours to schedule your site grid evaluation survey.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full text-slate-900">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name" 
                    className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 99999 99999" 
                    className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Corporate Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@company.com" 
                    className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Site Location (City, State) *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. Gurugram, Haryana" 
                    className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-white text-[10px] font-bold uppercase tracking-wider font-mono">Site Details / Message</label>
                <textarea 
                  rows="3" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Provide approximate space dimensions, existing electricity load details, or other notes..." 
                  className="bg-megacharge-navy border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-green transition-colors resize-none font-sans"
                />
              </div>

              <button 
                type="submit" 
                className="w-full text-center bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-xs py-4 rounded-xl transition-all duration-300 mt-2 block shadow-glow-green"
              >
                Submit Installation Inquiry &rarr;
              </button>

              {/* Social Accounts links */}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-800 border-opacity-30 items-center">
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Connect With Us</span>
                <div className="flex items-center gap-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-megacharge-navy hover:bg-megacharge-green border border-slate-700 hover:border-megacharge-green rounded-xl text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 shadow-md">
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-megacharge-navy hover:bg-megacharge-green border border-slate-700 hover:border-megacharge-green rounded-xl text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 shadow-md">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-megacharge-navy hover:bg-megacharge-green border border-slate-700 hover:border-megacharge-green rounded-xl text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 shadow-md">
                    <FaFacebook className="w-4 h-4" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-megacharge-navy hover:bg-megacharge-green border border-slate-700 hover:border-megacharge-green rounded-xl text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 shadow-md">
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-megacharge-navy hover:bg-megacharge-green border border-slate-700 hover:border-megacharge-green rounded-xl text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 shadow-md">
                    <FaWhatsapp className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
