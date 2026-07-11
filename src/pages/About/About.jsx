/**
 * ========================================
 * About Page Component — Enhanced
 * Purpose:
 * Renders corporate heritage, animated
 * timeline, vision/mission, certifications,
 * leadership, and a why-us stats strip.
 * ========================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon,
  IconGoogleConstruction,
  IconGoogleBolt,
  IconGoogleTech,
  IconGoogleRocket,
  IconGoogleGlobe,
  IconGoogleBuilding,
  IconGoogleEco,
  IconGoogleShield,
  IconAward
} from '../../components/CustomIcons/CustomIcons';
import ContactForm from '../../components/ContactForm/ContactForm';
import './About.css';

/* ==========================================
   ANIMATION CONFIGS
========================================== */
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { staggerChildren: 0.12 },
};

const cardItem = {
  initial: { opacity: 0, y: 28, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

/* ==========================================
   DATA
========================================== */
const TIMELINE = [
  {
    year: '1983',
    icon: <IconGoogleConstruction size={20} className="text-megacharge-green" />,
    desc: 'Mega Nirman & Industries Limited (MNIL) is established under the Companies Act on March 23, 1983, laying structural roots in commercial real estate, civil engineering, and infrastructure.',
  },
  {
    year: '2002',
    icon: <IconGoogleBolt size={20} className="text-megacharge-green" pulse />,
    title: 'Commercial Grid Operations',
    desc: 'Expanding beyond traditional layouts, MNIL completes several heavy civil infrastructure grids and commercial sub-station projects across North India.',
  },
  {
    year: '2018',
    icon: <IconGoogleTech size={20} className="text-megacharge-green" />,
    title: 'Clean Mobility R&D',
    desc: 'MNIL establishes research labs specialising in high-efficiency rectifiers and battery balance software, laying foundations for energy transition pipelines.',
  },
  {
    year: '2024',
    icon: <IconGoogleRocket size={20} className="text-megacharge-green" bounce />,
    title: 'MegaCharge Launch',
    desc: 'MegaCharge launches as the primary clean mobility division, deploying universal Level 2 AC and Level 3 DC fast rectifiers with proprietary OCPP management SaaS.',
  },
  {
    year: '2028',
    icon: <IconGoogleGlobe size={20} className="text-megacharge-green" spin />,
    title: 'Expanding National Pipeline',
    desc: 'On track to implement 10,000+ public and fleet charging points, connecting state expressways and high-volume commercial centres across the subcontinent.',
  },
];

const CERTS = [
  { title: 'ISO 9001:2015', desc: 'Quality Management Systems for product designs and distribution grid channels.' },
  { title: 'OCPP 1.6', desc: 'Guarantees cloud software interoperability with Level 2 AC and Level 3 DC terminals.' },
  { title: 'ARAI Compliant', desc: 'Verified charging outputs matching standards set by the Automotive Research Association of India.' },
  { title: 'CE Mark & Safety', desc: 'Certified surge buffers protecting against leakages, heating, and vehicle BMS spikes.' },
];

const DIVISIONS = [
  {
    initials: 'MC',
    title: 'Board of Directors',
    role: 'MNIL Holding Board',
    desc: 'Steers corporate governance, regulatory alliances, and strategic direction using 40+ years of municipal contracting expertise.',
  },
  {
    initials: 'ES',
    title: 'EV Systems Division',
    role: 'Engineering R&D Lead',
    desc: 'Manages modular rectifier engineering, active load-balancing software upgrades, and hardware manufacturing lines.',
  },
  {
    initials: 'CA',
    title: 'Commercial Alliances',
    role: 'Business Development',
    desc: 'Supervises national franchise networks, commercial site requests, real estate partnerships, and highway hub programs.',
  },
];

const WHY_US = [
  { value: '40+', label: 'Years of Infrastructure Experience' },
  { value: '13,500+', label: 'Charging Points Deployed' },
  { value: '₹0', label: 'Upfront Cost for Hosts' },
  { value: '99.9%', label: 'Network Uptime SLA' },
  { value: '48 hrs', label: 'Site Survey Turnaround' },
  { value: '26', label: 'States Covered Pan-India' },
];

/* ==========================================
   COMPONENT
========================================== */
const About = () => {
  const [activeTimeline, setActiveTimeline] = useState(null);

  return (
    <div className="about-page-container overflow-hidden">

      {/* ==========================================
         1. HERO — DARK GRADIENT
      ========================================== */}
      <section className="about-hero relative min-h-[70vh] flex items-center pt-36 pb-24 px-6 bg-megacharge-dark text-white overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-megacharge-green opacity-[0.06] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/6 w-[300px] h-[300px] bg-megacharge-orange opacity-[0.04] rounded-full blur-[100px] pointer-events-none" />
        {/* Subtle dot grid */}
        <div className="about-dot-grid absolute inset-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-2 px-4 py-2 bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-30 rounded-full w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-megacharge-green animate-pulse" />
              <span className="text-megacharge-green text-[10px] font-bold uppercase tracking-widest font-mono">Legacy of Trust: Since 1983</span>
            </motion.div>

            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold font-poppins leading-none tracking-tight">
              Pioneering Clean Energy<br />
              <span className="text-gradient-green">Across the Subcontinent</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              MegaCharge is the EV infrastructure division of <strong className="text-white">Mega Nirman &amp; Industries Limited (MNIL)</strong>, a non-government public limited company established on March 23, 1983. Four decades of operational excellence in commercial projects powers India's most robust, premium fast-charging network.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link to="/contact" className="btn-premium-green text-white font-bold text-sm px-8 py-4 rounded-full flex items-center gap-2 shadow-glow-green hover:scale-105 transition-transform duration-300">
                Partner With Us <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link to="/products" className="border border-slate-600 hover:border-megacharge-green text-slate-300 hover:text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-300">
                View Products
              </Link>
            </div>
          </motion.div>

          {/* Right: founding year card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="about-founding-card rounded-3xl p-10 relative overflow-hidden border border-slate-800">
              <div className="absolute inset-0 bg-gradient-to-br from-megacharge-green opacity-5 to-transparent pointer-events-none" />
              {/* Big year watermark */}
              <span className="absolute right-4 bottom-2 text-[100px] sm:text-[130px] font-extrabold text-slate-800 leading-none select-none font-mono opacity-60">
                1983
              </span>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="p-3 bg-megacharge-green bg-opacity-10 text-megacharge-green border border-megacharge-green border-opacity-25 rounded-2xl w-fit mb-1 flex items-center justify-center shadow-glow-green">
                  <IconGoogleBuilding size={32} className="text-megacharge-green" bounce />
                </div>
                <h4 className="text-white font-extrabold text-2xl">MNIL Group Foundation</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Established under the Indian Companies Act. A legacy of trust and quality engineering, driving forward-thinking public infrastructure projects for over four decades.
                </p>
                {/* Mini stat row */}
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {[['40+', 'Years'], ['₹0', 'Host Risk'], ['100%', 'Managed']].map(([v, l]) => (
                    <div key={l} className="text-center bg-slate-900 border border-slate-800 rounded-2xl py-3">
                      <span className="text-megacharge-green font-extrabold text-lg font-mono block">{v}</span>
                      <span className="text-slate-500 text-[9px] uppercase tracking-wider font-mono">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         2. WHY US — ANIMATED STATS STRIP
      ========================================== */}
      <section className="py-16 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {WHY_US.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                whileHover={{ y: -4, scale: 1.04 }}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-slate-200 shadow-sm group"
              >
                <span className="text-megacharge-green font-extrabold text-2xl sm:text-3xl font-mono leading-none group-hover:text-megacharge-orange transition-colors duration-300">
                  {stat.value}
                </span>
                <span className="text-slate-500 text-[10px] uppercase tracking-wider font-mono mt-2 leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========================================
         3. VISION, MISSION & VALUES
      ========================================== */}
      <section className="py-32 px-6 bg-megacharge-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-megacharge-green opacity-[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest bg-megacharge-green bg-opacity-5 border border-megacharge-green border-opacity-25 px-4 py-1.5 rounded-full inline-block mb-4 font-mono">
              Philosophy & Direction
            </span>
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold mt-2 leading-tight">
              What Drives <span className="text-gradient-green">MegaCharge</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <IconGoogleEco size={32} className="text-megacharge-green" bounce />,
                color: 'green',
                title: 'Our Vision',
                desc: 'Make clean, fast charging accessible to every corner of India, establishing a zero-emission transport network that integrates solar grid generation with public transit corridors.',
              },
              {
                icon: <IconGoogleBolt size={32} className="text-megacharge-green" pulse />,
                color: 'green',
                title: 'Our Mission',
                desc: 'Deploy 10,000+ high-power DC fast-charging bays and smart AC wall-boxes across major national highways and metro centres by 2028, maintaining a 99.8% network uptime.',
              },
              {
                icon: <IconGoogleShield size={32} className="text-megacharge-green" />,
                color: 'green',
                title: 'Core Values',
                desc: 'Safety, engineering precision, absolute grid transparency, and customer-first support. Every charge must feel seamless, reliable, and effortless for both hosts and EV drivers.',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={cardItem}
                whileHover={{ y: -8, scale: 1.02 }}
                className="vision-card premium-gradient-card group relative rounded-3xl p-8 overflow-hidden flex flex-col gap-5 cursor-default"
              >
                {/* Accent glow top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-megacharge-green opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-16 h-16 rounded-2xl bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-25 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow-green">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-white text-xl font-extrabold mb-3">{card.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         4. INTERACTIVE TIMELINE
      ========================================== */}
      <section className="py-32 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-20 px-4 py-1.5 rounded-full inline-block mb-4 font-mono">
              Our Journey
            </span>
            <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mt-2 leading-tight">
              Structural Milestones
            </h2>
            <p className="text-slate-500 text-sm mt-3">Four decades of building. One decade of charging.</p>
          </motion.div>

          <div className="relative">
            {/* Vertical timeline spine */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />

            <div className="flex flex-col gap-12">
              {TIMELINE.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center ${isLeft ? '' : 'md:text-right'}`}
                  >
                    {/* Year badge on the spine */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setActiveTimeline(activeTimeline === i ? null : i)}
                        className="w-10 h-10 rounded-full bg-white border-2 border-megacharge-green shadow-glow-green flex items-center justify-center text-lg cursor-pointer"
                      >
                        {item.icon}
                      </motion.div>
                    </div>

                    {/* Left card */}
                    {isLeft ? (
                      <>
                        <motion.div
                          whileHover={{ y: -4 }}
                          onClick={() => setActiveTimeline(activeTimeline === i ? null : i)}
                          className={`timeline-card md:mr-8 p-7 rounded-3xl cursor-pointer border ${activeTimeline === i ? 'border-megacharge-green bg-megacharge-green bg-opacity-5' : 'border-slate-200 bg-white hover:border-slate-300'} shadow-sm transition-all duration-300`}
                        >
                          <span className="text-megacharge-green font-extrabold text-2xl font-mono block mb-1">{item.year}</span>
                          <h4 className="text-slate-900 font-extrabold text-lg mb-2">{item.title}</h4>
                          <AnimatePresence>
                            {activeTimeline === i && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35 }}
                                className="text-slate-600 text-sm leading-relaxed overflow-hidden"
                              >
                                {item.desc}
                              </motion.p>
                            )}
                            {activeTimeline !== i && (
                              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{item.desc}</p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        <div className="hidden md:block" />
                      </>
                    ) : (
                      <>
                        <div className="hidden md:block" />
                        <motion.div
                          whileHover={{ y: -4 }}
                          onClick={() => setActiveTimeline(activeTimeline === i ? null : i)}
                          className={`timeline-card md:ml-8 p-7 rounded-3xl cursor-pointer border text-left ${activeTimeline === i ? 'border-megacharge-green bg-megacharge-green bg-opacity-5' : 'border-slate-200 bg-white hover:border-slate-300'} shadow-sm transition-all duration-300`}
                        >
                          <span className="text-megacharge-green font-extrabold text-2xl font-mono block mb-1">{item.year}</span>
                          <h4 className="text-slate-900 font-extrabold text-lg mb-2">{item.title}</h4>
                          <AnimatePresence>
                            {activeTimeline === i && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35 }}
                                className="text-slate-600 text-sm leading-relaxed overflow-hidden"
                              >
                                {item.desc}
                              </motion.p>
                            )}
                            {activeTimeline !== i && (
                              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{item.desc}</p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <motion.p {...fadeInUp} className="text-center text-slate-400 text-xs font-mono mt-12">
              Click any milestone to expand details
            </motion.p>
          </div>
        </div>
      </section>

      {/* ==========================================
         5. CERTIFICATIONS & STANDARDS
      ========================================== */}
      <section className="py-32 px-6 bg-megacharge-dark relative overflow-hidden">
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-megacharge-orange opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-megacharge-orange text-xs font-bold uppercase tracking-widest bg-megacharge-orange bg-opacity-5 border border-megacharge-orange border-opacity-20 px-4 py-1.5 rounded-full inline-block mb-4 font-mono">
              Quality Labs
            </span>
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold mt-2 leading-tight">
              Certifications &amp; <span className="text-gradient-orange">Standards</span>
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Every MegaCharge unit is tested to international benchmarks before deployment.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {CERTS.map((cert, i) => (
              <motion.div
                key={i}
                variants={cardItem}
                whileHover={{ y: -8, scale: 1.03 }}
                className="cert-card group relative rounded-3xl p-7 flex flex-col gap-4 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-megacharge-orange opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-12 h-12 rounded-xl bg-megacharge-orange bg-opacity-10 border border-megacharge-orange border-opacity-25 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 text-[#F18321]">
                  <IconAward className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-lg mb-2">{cert.title}</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         6. LEADERSHIP & DIVISIONS
      ========================================== */}
      <section className="py-32 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center mb-20">
            <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-20 px-4 py-1.5 rounded-full inline-block mb-4 font-mono">
              Governance
            </span>
            <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mt-2 leading-tight">
              Executive Board &amp; Divisions
            </h2>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Steered by clean technology veterans and municipal infrastructure leaders.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {DIVISIONS.map((div, i) => (
              <motion.div
                key={i}
                variants={cardItem}
                whileHover={{ y: -8, scale: 1.02 }}
                className="leadership-card group relative rounded-3xl p-8 overflow-hidden flex flex-col gap-5 bg-white border border-slate-200 shadow-sm"
              >
                {/* Background watermark letter */}
                <span className="absolute right-5 bottom-4 text-8xl font-extrabold text-slate-100 select-none font-mono leading-none">
                  {div.initials}
                </span>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-megacharge-green bg-opacity-10 border border-megacharge-green border-opacity-30 rounded-full flex items-center justify-center mb-5 group-hover:bg-megacharge-green group-hover:bg-opacity-20 transition-all duration-300">
                    <span className="text-megacharge-green font-extrabold text-lg font-mono">{div.initials}</span>
                  </div>
                  <h4 className="text-slate-900 font-extrabold text-xl mb-1">{div.title}</h4>
                  <span className="text-megacharge-green text-[10px] font-bold uppercase tracking-widest block mb-4 font-mono">{div.role}</span>
                  <p className="text-slate-600 text-sm leading-relaxed">{div.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         7. CTA BANNER — JOIN THE MISSION
      ========================================== */}
      <section className="py-24 px-6 bg-megacharge-dark border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,166,200,0.07)_0%,transparent_65%)] pointer-events-none" />
        {/* Animated scan line */}
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
          className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-megacharge-green to-transparent opacity-5 pointer-events-none"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeInUp} className="flex flex-col gap-6 items-center">
            <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest bg-megacharge-green bg-opacity-5 border border-megacharge-green border-opacity-25 px-4 py-1.5 rounded-full font-mono">
              Join The Mission
            </span>
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight">
              Ready to Power India's<br />
              <span className="text-gradient-green">Electric Future?</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Whether you're a property owner wanting to earn from idle parking, a developer building EV-ready townships, or a business aiming to lead in sustainability, MegaCharge has a solution built for you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <Link to="/contact" className="btn-premium-green text-white font-bold text-sm px-10 py-4 rounded-full flex items-center gap-2 shadow-glow-green hover:scale-105 transition-transform duration-300">
                Request a Free Site Survey <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link to="/franchise" className="border border-slate-600 hover:border-megacharge-green text-slate-300 hover:text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-300">
                Explore Franchise Program
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         8. CONTACT FORM
      ========================================== */}
      <ContactForm />

    </div>
  );
};

export default About;
