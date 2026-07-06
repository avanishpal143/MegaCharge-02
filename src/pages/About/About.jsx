/**
 * ========================================
 * About Page Component
 * Purpose:
 * Renders corporate history, timeline,
 * leadership info, and standard compliance.
 *
 * ========================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldIcon, LeafIcon, BoltIcon } from '../../components/CustomIcons/CustomIcons';
import './About.css';

/* ==========================================
   ANIMATION DEFINITIONS
========================================== */

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { staggerChildren: 0.15 }
};

const About = () => {
  const TIMELINE_DATA = [
    {
      year: "1983",
      title: "Corporate Inception",
      desc: "Mega Nirman & Industries Limited (MNIL) is established under the Companies Act on March 23, 1983, laying structural roots for corporate real estate, civil engineering, and infrastructure."
    },
    {
      year: "2002",
      title: "Commercial Grid Operations",
      desc: "Expanding from traditional layouts, MNIL completes several heavy civil infrastructure grids and commercial sub-station projects across North India."
    },
    {
      year: "2018",
      title: "Clean Mobility R&D Initiative",
      desc: "Laying foundations for energy transition pipelines. MNIL establishes research labs specializing in high-efficiency rectifiers and battery balance software."
    },
    {
      year: "2024",
      title: "MegaCharge Launch",
      desc: "MegaCharge is launched as the primary clean mobility division. Deploying universal Level 2 AC and Level 3 DC fast rectifiers integrated with proprietary OCPP management SaaS."
    },
    {
      year: "2028",
      title: "Expanding National Pipeline",
      desc: "On track to implement 10,000+ public and fleet charging points, connecting state expressways and high-volume commercial centers across the subcontinent."
    }
  ];

  return (
    <div className="about-page-container overflow-hidden pt-28 pb-20 px-6">
      
      {/* 1. HERO SECTION (CORPORATE HERITAGE) */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start gap-6"
        >
          <span className="section-label">
            📜 LEGACY OF TRUST // SINCE 1983
          </span>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold font-poppins leading-none tracking-tight">
            Pioneering Clean Energy <br />
            <span className="text-gradient-green">Across the Subcontinent</span>
          </h1>
          <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-xl">
            MegaCharge is the EV infrastructure segment of **Mega Nirman & Industries Limited (MNIL)**, a non-government public limited company established on March 23, 1983. Over four decades of operational excellence in commercial projects allows us to build India’s most robust, premium fast-charging network.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 bg-megacharge-card bg-opacity-40 border border-megacharge-border p-10 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-5 pointer-events-none" />
          <span className="text-[100px] sm:text-[140px] font-extrabold text-megacharge-border leading-none select-none block text-right pr-4 mb-4 font-mono opacity-40">
            1983
          </span>
          <h4 className="text-white font-extrabold text-xl mb-2">MNIL Group Foundation</h4>
          <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
            Established under the Indian Companies Act, MNIL holds a legacy of trust and quality engineering, driving forward-thinking public infrastructure projects.
          </p>
        </motion.div>
      </section>

      {/* 2. HISTORICAL TIMELINE SECTION */}
      <section className="max-w-6xl mx-auto mb-32">
        <motion.div 
          {...fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label mb-4">📅 TIMELINE</span>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold">Our Structural Milestones</h2>
        </motion.div>

        <div className="relative border-l border-megacharge-border pl-6 sm:pl-10 space-y-12 max-w-4xl mx-auto">
          {TIMELINE_DATA.map((milestone, idx) => (
            <motion.div 
              key={idx}
              {...fadeInUp}
              className="relative"
            >
              {/* Floating Year circle */}
              <div className="absolute left-[-39px] sm:left-[-53px] top-1.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-megacharge-dark border-2 border-megacharge-green flex items-center justify-center pulse-glow">
                <div className="w-2 h-2 rounded-full bg-megacharge-green" />
              </div>
              
              <div className="premium-glass-card p-6 sm:p-8 rounded-2xl border border-megacharge-border relative overflow-hidden">
                <span className="text-megacharge-green font-mono font-extrabold text-xl sm:text-2xl block mb-1">{milestone.year}</span>
                <h4 className="text-white font-extrabold text-lg sm:text-xl mb-2">{milestone.title}</h4>
                <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">{milestone.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. VISION, MISSION, & VALUES */}
      <section className="max-w-7xl mx-auto mb-32">
        <motion.div 
          {...fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label mb-4">🎯 OBJECTIVES</span>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold">Philosophy & Direction</h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeInUp} className="premium-glass-card p-8 rounded-3xl border border-megacharge-border">
            <div className="p-3.5 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl w-fit mb-6 border border-megacharge-green border-opacity-25">
              <LeafIcon className="w-6 h-6" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Our Vision</h3>
            <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
              To make clean, fast charging accessible to every corner of India, establishing a zero-emission transport network that integrates solar grid generation with public transit corridors.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="premium-glass-card p-8 rounded-3xl border border-megacharge-border">
            <div className="p-3.5 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl w-fit mb-6 border border-megacharge-green border-opacity-25">
              <BoltIcon className="w-6 h-6" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
              Deploy 10,000+ high-power DC fast-charging bays and smart AC wall-boxes across major national highways and metro centers by 2028, maintaining a 99.8% network uptime.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="premium-glass-card p-8 rounded-3xl border border-megacharge-border">
            <div className="p-3.5 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl w-fit mb-6 border border-megacharge-green border-opacity-25">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Core Values</h3>
            <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
              Safety, engineering precision, absolute grid transparency, and customer-first support operations. Every charge must feel seamless and reliable.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. CORPORATE CERTIFICATIONS */}
      <section className="max-w-7xl mx-auto mb-32 bg-megacharge-card bg-opacity-40 border border-megacharge-border rounded-3xl p-8 md:p-16">
        <motion.div 
          {...fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label mb-4">🏆 QUALITY LABS</span>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold mt-2">Certifications & Standards</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-megacharge-border text-center">
            <h4 className="text-white font-extrabold text-base mb-2">ISO 9001:2015</h4>
            <p className="text-megacharge-text-secondary text-xs leading-relaxed">
              Quality Management Systems for product designs and distribution grid channels.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-megacharge-border text-center">
            <h4 className="text-white font-extrabold text-base mb-2">OCPP 1.6 Compliant</h4>
            <p className="text-megacharge-text-secondary text-xs leading-relaxed">
              Guarantees cloud software interoperability with Level 2 AC and Level 3 DC terminals.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-megacharge-border text-center">
            <h4 className="text-white font-extrabold text-base mb-2">ARAI Compliant</h4>
            <p className="text-megacharge-text-secondary text-xs leading-relaxed">
              Verified charging outputs matching standards set by the Automotive Research Association of India.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-megacharge-border text-center">
            <h4 className="text-white font-extrabold text-base mb-2">CE Mark & Safety</h4>
            <p className="text-megacharge-text-secondary text-xs leading-relaxed">
              Certified surge buffers protecting against grid leakages, heating, and vehicle BMS spikes.
            </p>
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP & ADVISORY */}
      <section className="max-w-7xl mx-auto">
        <motion.div 
          {...fadeInUp}
          className="max-w-2xl mb-16"
        >
          <span className="section-label mb-4">👥 GOVERNANCE</span>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold mt-2">Executive Board & divisions</h2>
          <p className="text-megacharge-text-secondary text-sm leading-relaxed mt-4">
            Steered by clean technology veterans and municipal infrastructure leaders who design MegaCharge's national grid plans.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeInUp} className="premium-glass-card p-8 rounded-3xl border border-megacharge-border">
            <div className="w-16 h-16 bg-megacharge-border bg-opacity-65 rounded-full flex items-center justify-center mb-6 text-white text-xl font-bold font-mono border border-megacharge-green border-opacity-35">
              MC
            </div>
            <h4 className="text-white font-extrabold text-lg mb-1">Board of Directors</h4>
            <span className="text-megacharge-green text-[10px] font-bold uppercase tracking-wider block mb-4">MNIL Holding Board</span>
            <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
              Steers general operations, corporate governance oversight, and regulatory alliances using 40+ years of municipal contracting wisdom.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="premium-glass-card p-8 rounded-3xl border border-megacharge-border">
            <div className="w-16 h-16 bg-megacharge-border bg-opacity-65 rounded-full flex items-center justify-center mb-6 text-white text-xl font-bold font-mono border border-megacharge-green border-opacity-35">
              ES
            </div>
            <h4 className="text-white font-extrabold text-lg mb-1">EV Systems division</h4>
            <span className="text-megacharge-green text-[10px] font-bold uppercase tracking-wider block mb-4">Engineering R&D Lead</span>
            <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
              Manages modular rectifier engineering, active load balancing software upgrades, and hardware manufacturing lines.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="premium-glass-card p-8 rounded-3xl border border-megacharge-border">
            <div className="w-16 h-16 bg-megacharge-border bg-opacity-65 rounded-full flex items-center justify-center mb-6 text-white text-xl font-bold font-mono border border-megacharge-green border-opacity-35">
              CA
            </div>
            <h4 className="text-white font-extrabold text-lg mb-1">Commercial Alliances</h4>
            <span className="text-megacharge-green text-[10px] font-bold uppercase tracking-wider block mb-4">Business Development</span>
            <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
              Supervises national franchise networks, commercial site dealer requests, real estate group partnerships, and highway hub programs.
            </p>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

export default About;
