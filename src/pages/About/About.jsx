/**
 * ========================================
 * About Page Component
 * Purpose:
 * Renders corporate background, leadership info,
 * MNIL holdings history (established 1983),
 * and compliance qualifications.
 *
 * Developer Notes:
 * Uses structured layout grids and card outlines.
 *
 * ========================================
 */

import React from 'react';
import { ShieldIcon, LeafIcon, BoltIcon } from '../../components/CustomIcons/CustomIcons';
import './About.css';

/* ==========================================
   ABOUT COMPONENT
========================================== */

const About = () => {
  return (
    <div className="about-page-container bg-megacharge-dark pt-28 pb-20 px-6">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest border border-megacharge-green border-opacity-30 px-3.5 py-1 rounded-full bg-megacharge-green bg-opacity-5">
            Legacy & Innovation
          </span>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold font-poppins leading-tight">
            Pioneering Clean Energy <br />
            <span className="text-gradient-green">Across the Subcontinent</span>
          </h1>
          <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl">
            MegaCharge is the EV infrastructure division of **Mega Nirman & Industries Limited (MNIL)**, a non-government public limited company established on March 23, 1983. Over four decades of operational excellence in commercial projects allows us to build India’s most robust, premium fast-charging network.
          </p>
        </div>
        <div className="lg:col-span-5 bg-megacharge-card border border-megacharge-border p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-5 pointer-events-none"></div>
          <span className="text-[120px] font-extrabold text-megacharge-border leading-none select-none block text-right pr-6 mb-4">
            1983
          </span>
          <h4 className="text-white font-bold text-lg mb-2">MNIL Group Foundation</h4>
          <p className="text-megacharge-text-secondary text-xs leading-relaxed">
            Established under the Indian Companies Act, MNIL holds a legacy of trust and quality engineering, driving forward-thinking public infrastructure projects.
          </p>
        </div>
      </section>

      {/* 2. VISION, MISSION, & VALUES */}
      <section className="max-w-7xl mx-auto mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="glass-panel p-8 rounded-3xl border border-megacharge-border">
          <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl w-fit mb-6">
            <LeafIcon className="w-6 h-6" />
          </div>
          <h3 className="text-white text-xl font-bold mb-3">Our Vision</h3>
          <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
            To make clean, fast charging accessible to every corner of India, establishing a zero-emission transport network that integrates solar grid generation with public transit corridors.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-megacharge-border">
          <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl w-fit mb-6">
            <BoltIcon className="w-6 h-6" />
          </div>
          <h3 className="text-white text-xl font-bold mb-3">Our Mission</h3>
          <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
            Deploy 10,000+ high-power DC fast-charging bays and smart AC wall-boxes across major national highways and metro centers by 2028, maintaining a 99.8% network uptime.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-megacharge-border">
          <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green rounded-xl w-fit mb-6">
            <ShieldIcon className="w-6 h-6" />
          </div>
          <h3 className="text-white text-xl font-bold mb-3">Core Values</h3>
          <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
            Safety, engineering precision, absolute grid transparency, and customer-first support operations. Every charge must feel seamless and reliable.
          </p>
        </div>

      </section>

      {/* 3. CORPORATE CERTIFICATIONS */}
      <section className="max-w-7xl mx-auto mb-24 bg-megacharge-card border border-megacharge-border rounded-3xl p-8 md:p-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Quality Qualifications</span>
          <h2 className="text-white text-3xl font-extrabold mt-2">Certifications & Standards</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-megacharge-dark border border-megacharge-border text-center">
            <h4 className="text-white font-bold text-base mb-1">ISO 9001:2015</h4>
            <p className="text-megacharge-text-secondary text-[11px] leading-relaxed">
              Quality Management Systems for product design and distribution operations.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-megacharge-dark border border-megacharge-border text-center">
            <h4 className="text-white font-bold text-base mb-1">OCPP 1.6 Compliant</h4>
            <p className="text-megacharge-text-secondary text-[11px] leading-relaxed">
              Ensures interoperability between hardware chargers and central cloud CPO software.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-megacharge-dark border border-megacharge-border text-center">
            <h4 className="text-white font-bold text-base mb-1">ARAI Compliant</h4>
            <p className="text-megacharge-text-secondary text-[11px] leading-relaxed">
              Aligned with testing standards of the Automotive Research Association of India.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-megacharge-dark border border-megacharge-border text-center">
            <h4 className="text-white font-bold text-base mb-1">CE Mark & Safety</h4>
            <p className="text-megacharge-text-secondary text-[11px] leading-relaxed">
              Certified electric safeguards against surges, leakages, and overcurrent conditions.
            </p>
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP & ADVISORY */}
      <section className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Board & Governance</span>
          <h2 className="text-white text-3xl font-extrabold mt-2">Executive Leadership</h2>
          <p className="text-megacharge-text-secondary text-sm leading-relaxed mt-2">
            Led by infrastructure visionaries and clean energy specialists who steer MegaCharge's long-term deployment strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 rounded-3xl border border-megacharge-border">
            <div className="w-16 h-16 bg-megacharge-border rounded-full flex items-center justify-center mb-6 text-white text-xl font-bold">
              MC
            </div>
            <h4 className="text-white font-bold text-lg mb-1">Board of Directors</h4>
            <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider block mb-3">MNIL Corporate Board</span>
            <p className="text-megacharge-text-secondary text-xs leading-relaxed">
              Provides strategic direction and corporate governance oversight, leveraging decades of public contracting expertise.
            </p>
          </div>
          <div className="glass-panel p-6 rounded-3xl border border-megacharge-border">
            <div className="w-16 h-16 bg-megacharge-border rounded-full flex items-center justify-center mb-6 text-white text-xl font-bold">
              ES
            </div>
            <h4 className="text-white font-bold text-lg mb-1">EV Systems division</h4>
            <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider block mb-3">Engineering R&D Lead</span>
            <p className="text-megacharge-text-secondary text-xs leading-relaxed">
              Manages rectifier designs, safety diagnostic coding, and hardware manufacturing quality control lines.
            </p>
          </div>
          <div className="glass-panel p-6 rounded-3xl border border-megacharge-border">
            <div className="w-16 h-16 bg-megacharge-border rounded-full flex items-center justify-center mb-6 text-white text-xl font-bold">
              CA
            </div>
            <h4 className="text-white font-bold text-lg mb-1">Commercial Alliances</h4>
            <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider block mb-3">Business Development</span>
            <p className="text-megacharge-text-secondary text-xs leading-relaxed">
              Steers highway franchise networks, CPO commercial contracts, and real estate developer alliances.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
