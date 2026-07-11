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
    <section className="py-32 px-6 relative w-full border-t border-slate-200" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(241, 131, 33, 0.02), transparent 70%), #fff7f1' }}>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch text-left">
        
        {/* Left Column: Contact info and Social connections */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 w-full premium-glass-card p-8 md:p-10 rounded-3xl border border-slate-200 flex flex-col gap-10 h-full"
        >
          <div>
            <span className="text-megacharge-brand text-xs font-bold uppercase tracking-widest bg-megacharge-brand bg-opacity-5 border border-megacharge-brand border-opacity-20 px-4 py-1.5 rounded-full inline-block mb-4 font-mono">
              Rental & Support Registry
            </span>
            <h2 className="text-megacharge-heading text-3xl sm:text-[32px] font-extrabold leading-tight font-poppins">
              Ready to Rent an<br />
              <span className="bg-gradient-to-r from-[#F18321] to-[#832800] bg-clip-text text-transparent">EV Charging Station?</span>
            </h2>
            <p className="text-megacharge-paragraph text-sm leading-relaxed mt-4">
              Partner with MegaCharge to launch premium EV charging spaces. Provide your coordinates for a free structural assessment and customized rental proposal.
            </p>
          </div>

          {/* Address, Phone, Email indicators */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4.5">
              <div className="p-3.5 bg-megacharge-brand bg-opacity-10 text-megacharge-brand rounded-2xl border border-megacharge-brand border-opacity-20 shadow-glow-orange">
                <FaPhoneAlt className="w-4 h-4" />
              </div>
              <div className="ml-3">
                <span className="text-[10px] text-slate-500 block font-mono uppercase tracking-wider leading-tight">Helpline Number</span>
                <span className="text-megacharge-heading text-sm font-bold">+91 92895 55090</span>
              </div>
            </div>

            <div className="flex items-center gap-4.5">
              <div className="p-3.5 bg-megacharge-brand bg-opacity-10 text-megacharge-brand rounded-2xl border border-megacharge-brand border-opacity-20 shadow-glow-orange">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <div className="ml-3">
                <span className="text-[10px] text-slate-500 block font-mono uppercase tracking-wider leading-tight">Corporate Email</span>
                <span className="text-megacharge-heading text-sm font-bold">rentals@megacharge.in</span>
              </div>
            </div>

            <div className="flex items-center gap-4.5">
              <div className="p-3.5 bg-megacharge-brand bg-opacity-10 text-megacharge-brand rounded-2xl border border-megacharge-brand border-opacity-20 shadow-glow-orange">
                <FaMapMarkerAlt className="w-4 h-4" />
              </div>
              <div className="ml-3">
                <span className="text-[10px] text-slate-500 block font-mono uppercase tracking-wider leading-tight">Registered Headquarters</span>
                <span className="text-megacharge-heading text-sm font-bold">MNIL Holdings Corporate Plazas, Gurugram, Haryana</span>
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
          className="lg:col-span-7 w-full premium-glass-card p-8 md:p-10 rounded-3xl border border-slate-200 h-full"
        >
          {submitted ? (
            <div className="p-8 border border-green-500 border-opacity-40 rounded-2xl bg-green-500 bg-opacity-5 flex flex-col items-center text-center w-full">
              <div className="w-16 h-16 rounded-full bg-green-500 bg-opacity-10 border border-green-500 border-opacity-20 flex items-center justify-center text-green-500 mb-4 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                <svg className="w-8 h-8 fill-none stroke-current stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="text-slate-900 text-xl font-bold mb-2">Rental Enquiry Submitted!</h4>
              <p className="text-slate-650 text-sm leading-relaxed">
                Thank you for reaching out. A MegaCharge representative will contact you within 24 hours to schedule your site grid evaluation survey.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-megacharge-heading text-[10px] font-bold uppercase tracking-wider font-mono">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name" 
                    className="bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-brand transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-megacharge-heading text-[10px] font-bold uppercase tracking-wider font-mono">Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 99999 99999" 
                    className="bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-brand transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-megacharge-heading text-[10px] font-bold uppercase tracking-wider font-mono">Corporate Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@company.com" 
                    className="bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-brand transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-megacharge-heading text-[10px] font-bold uppercase tracking-wider font-mono">Site Location (City, State) *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. Gurugram, Haryana" 
                    className="bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-brand transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-megacharge-heading text-[10px] font-bold uppercase tracking-wider font-mono">Site Details / Message</label>
                <textarea 
                  rows="3" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Provide approximate space dimensions, existing electricity load details, or other notes..." 
                  className="bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-megacharge-brand transition-colors resize-none font-sans"
                />
              </div>

              <button 
                type="submit" 
                className="w-full text-center bg-gradient-to-r from-[#F18321] to-[#832800] text-white font-bold text-xs py-4 rounded-xl transition-all duration-300 mt-2 block shadow-glow-orange hover:scale-[1.01]"
              >
                Submit Installation Inquiry &rarr;
              </button>

              {/* Social Accounts links */}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-200 items-center">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Connect With Us</span>
                <div className="flex items-center gap-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white hover:bg-[#F18321] border border-slate-200 hover:border-[#F18321] rounded-xl text-slate-600 hover:text-white transition-all duration-300 hover:scale-105 shadow-sm">
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white hover:bg-[#F18321] border border-slate-200 hover:border-[#F18321] rounded-xl text-slate-600 hover:text-white transition-all duration-300 hover:scale-105 shadow-sm">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white hover:bg-[#F18321] border border-slate-200 hover:border-[#F18321] rounded-xl text-slate-600 hover:text-white transition-all duration-300 hover:scale-105 shadow-sm">
                    <FaFacebook className="w-4 h-4" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white hover:bg-[#F18321] border border-slate-200 hover:border-[#F18321] rounded-xl text-slate-600 hover:text-white transition-all duration-300 hover:scale-105 shadow-sm">
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white hover:bg-[#F18321] border border-slate-200 hover:border-[#F18321] rounded-xl text-slate-600 hover:text-white transition-all duration-300 hover:scale-105 shadow-sm">
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
