/**
 * ========================================
 * Franchise Page Component
 * Purpose:
 * Renders the partner program guidelines,
 * business models (FOCO/FOLO), investment math,
 * and the official print-ready signage asset pack.
 *
 * ========================================
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FranchisePage.css';

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
  viewport: { once: true },
  transition: { staggerChildren: 0.12 }
};

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

  const SIGNAGE_ASSETS = [
    {
      id: "asset-ac",
      title: "AC Station Banner (Asset 01)",
      dimensions: "8 ft × 3 ft",
      material: "500 GSM Vinyl Flex",
      finish: "Matte Laminate, Eyelets every 24 in",
      dpi: "300 DPI, CMYK",
      header: "⚡ MegaCharge — EV Charging Station ⚡",
      tagline: "CHARGE NOW, DRIVE FURTHER",
      bullets: [
        "AC 7.4 kW Fast Charger support",
        "Universal compatibility with EV 2-wheelers & cars",
        "Pay per use · No registration required"
      ],
      footnote: "Scan QR to Download App | Helpline: 92895 55090"
    },
    {
      id: "asset-dc",
      title: "DC Fast-Charge Banner (Asset 02)",
      dimensions: "12 ft × 4 ft",
      material: "500 GSM Vinyl Flex",
      finish: "Matte Laminate, Eyelets every 24 in",
      dpi: "300 DPI, CMYK",
      header: "⚡ MegaCharge DC FAST CHARGING ⚡",
      tagline: "30–180 kW POWER | CHARGE IN 30 MINUTES",
      bullets: [
        "Dual CCS2 & CHAdeMO couplers",
        "GST bill generated automatically",
        "OCPP 1.6 network managed telemetry",
        "24×7 remote monitoring security"
      ],
      footnote: "₹15 / unit dispensed | Helpline: 92895 55090"
    },
    {
      id: "asset-qr",
      title: "QR Instruction Board (Asset 03)",
      dimensions: "A4 Size (210×297 mm)",
      material: "170 GSM Gloss Paper",
      finish: "Gloss Laminate, Wall-mount Bracket",
      dpi: "300 DPI, CMYK",
      header: "MegaCharge — How to Charge",
      tagline: "Bilingual Step-by-Step Instructions",
      bullets: [
        "1. Download the MegaCharge App (ऐप डाउनलोड करें)",
        "2. Scan QR or Select Charger (QR स्कैन करें)",
        "3. Select Charging Duration (समय चुनें)",
        "4. Pay & Start Charging (भुगतान करके शुरू करें)"
      ],
      footnote: "Operator: Mega Nirman & Industries Ltd"
    },
    {
      id: "asset-safety",
      title: "Safety Board Guide (Asset 04)",
      dimensions: "A4 Size (210×297 mm)",
      material: "170 GSM Gloss Paper",
      finish: "Gloss Laminate, Mount adjacent to charger",
      dpi: "300 DPI, CMYK",
      header: "SAFETY INSTRUCTIONS / सुरक्षा निर्देश",
      tagline: "Bilingual Protection Protocol",
      bullets: [
        "🚫 Do NOT charge if cable is damaged / क्षतिग्रस्त केबल से चार्ज न करें",
        "🚫 Do NOT use in heavy rain or flooding / भारी बारिश में उपयोग न करें",
        "✅ Ensure vehicle is in Park / switched OFF / वाहन पार्क में रखें",
        "✅ Insert connector fully until it clicks / कनेक्टर पूरी तरह लगाएं",
        "🚫 Do NOT leave children unattended / बच्चों को अकेला न छोड़ें",
        "✅ Emergency: Press red STOP button / लाल STOP बटन दबाएं"
      ],
      footnote: "24x7 Grid Support: 92895 55090"
    },
    {
      id: "asset-stencil",
      title: "Floor Bay Stencil (Asset 05)",
      dimensions: "2.5 m × 5.0 m",
      material: "Thermoplastic Paint System",
      finish: "Green (#1DB954) reflective additive",
      dpi: "Vector Paths, Line width 100 mm",
      header: "EV ONLY parking layout marker",
      tagline: "Reflective Low-Light Visibility Stencil",
      bullets: [
        "Bay size: 2.5 m × 5.0 m dimensions",
        "Clearance: 500 mm margins from adjacent walls",
        "Lightning bolt graphic: 800 mm × 800 mm centered",
        "Reflective micro-beads applied in 2 coats"
      ],
      footnote: "Complies with SOP-SITE-001 grid checklist"
    }
  ];

  return (
    <div className="franchise-page-container overflow-hidden pt-28 pb-20 px-6">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto mb-20 text-center">
        <span className="section-label mb-4">
          🤝 CORPORATE ALLIANCES
        </span>
        <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold font-poppins leading-none tracking-tight">
          Launch a MegaCharge <br />
          <span className="text-gradient-green">Franchise Hub</span>
        </h1>
        <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mt-6">
          Secure a vital position in India's interstate highways and metro transportation grid. Own a profitable CPO segment with structured technical deployment backing from **Mega Nirman & Industries Ltd (MNIL)**.
        </p>
      </section>

      {/* BUSINESS MODELS */}
      <section className="max-w-7xl mx-auto mb-32">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* FOCO CARD */}
          <motion.div 
            variants={fadeInUp}
            className="premium-glass-card p-10 rounded-3xl border border-megacharge-border flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-megacharge-green text-xs font-extrabold uppercase tracking-widest bg-megacharge-green bg-opacity-5 border border-megacharge-green border-opacity-30 px-4 py-1.5 rounded-full">
                  FOCO Model
                </span>
                <span className="text-megacharge-text-secondary text-xs font-mono">Franchise Owned · Company Operated</span>
              </div>
              <h3 className="text-white text-3xl font-extrabold mb-4">Hands-Off Yield Payouts</h3>
              <p className="text-megacharge-text-secondary text-sm leading-relaxed mb-8">
                Invest the capital and nominate a viable parking footprint. MegaCharge manages hardware allocation, substation permissions, grid connectivity setup, remote software repairs, billing operations, and customer support. Receive stable monthly base lease payouts or direct charging revenue cuts.
              </p>
              <ul className="flex flex-col gap-3 text-xs text-megacharge-text-secondary font-mono mb-8">
                <li className="flex items-center gap-2">&bull; Minimum Space: 2–4 parking bays</li>
                <li className="flex items-center gap-2">&bull; Ideal Sites: Highways, hypermarkets, mall side-bays</li>
                <li className="flex items-center gap-2">&bull; Site Uptime: 100% managed by MegaCharge support</li>
              </ul>
            </div>
            <a href="#enquiry-form" className="btn-premium-outline text-white text-center text-xs font-bold py-4 rounded-full transition-all duration-300 block">
              Apply for FOCO Program &rarr;
            </a>
          </motion.div>

          {/* FOLO CARD */}
          <motion.div 
            variants={fadeInUp}
            className="premium-glass-card p-10 rounded-3xl border border-megacharge-border flex flex-col justify-between premium-glass-card-orange"
          >
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-megacharge-orange text-xs font-extrabold uppercase tracking-widest bg-megacharge-orange bg-opacity-5 border border-megacharge-orange border-opacity-30 px-4 py-1.5 rounded-full">
                  FOLO Model
                </span>
                <span className="text-megacharge-text-secondary text-xs font-mono">Franchise Owned · Locally Operated</span>
              </div>
              <h3 className="text-white text-3xl font-extrabold mb-4">Active Operator Margins</h3>
              <p className="text-megacharge-text-secondary text-sm leading-relaxed mb-8">
                Retain full operational authority. You purchase the Level 3 DC rapid rectifiers from MegaCharge, manage site operators, and set localized margins. MegaCharge configures our OCPP 1.6 SaaS client, manages cloud billing pathways, and lists your nodes on digital mapping directories globally.
              </p>
              <ul className="flex flex-col gap-3 text-xs text-megacharge-text-secondary font-mono mb-8">
                <li className="flex items-center gap-2">&bull; Minimum Space: 3–6 highway parking bays</li>
                <li className="flex items-center gap-2">&bull; Ideal Sites: Expressway gas stations, logistics transit nodes</li>
                <li className="flex items-center gap-2">&bull; Software License: Direct CPO dashboard privileges</li>
              </ul>
            </div>
            <a href="#enquiry-form" className="btn-premium-outline text-white text-center text-xs font-bold py-4 rounded-full transition-all duration-300 block">
              Apply for FOLO Program &rarr;
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* INVESTMENT & PAYBACK METRICS */}
      <section className="max-w-7xl mx-auto mb-32 bg-megacharge-card bg-opacity-40 border border-megacharge-border p-8 md:p-16 rounded-3xl grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 flex flex-col justify-center">
          <span className="text-megacharge-green text-xs font-bold uppercase tracking-wider">Financial Modeling</span>
          <h3 className="text-white text-3xl font-extrabold mt-2 mb-4 leading-tight">Projected Investment Yield</h3>
          <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed">
            Baseline figures are calculated for a standard dual-charger highway station layout (120 kW dual-gun DC Fast Charger). Projections align with MNIL historical highway grid analytics.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-megacharge-border">
            <span className="text-megacharge-text-secondary text-[11px] block uppercase tracking-wider mb-2 font-mono">Estimated CapEx</span>
            <span className="text-white text-xl font-bold font-poppins font-mono">₹12 - ₹15 Lakhs</span>
            <p className="text-megacharge-text-secondary text-[11px] mt-3 leading-relaxed">Includes dual CCS2 DC charger hardware, civil grid works, and branding signage pack.</p>
          </div>
          <div className="p-6 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-megacharge-border">
            <span className="text-megacharge-text-secondary text-[11px] block uppercase tracking-wider mb-2 font-mono">Gross Margin</span>
            <span className="text-megacharge-green text-xl font-bold font-poppins font-mono">₹5.5 - ₹7.0 / kWh</span>
            <p className="text-megacharge-text-secondary text-[11px] mt-3 leading-relaxed">Dispense profit margin derived after subtracting local utility electricity tariffs.</p>
          </div>
          <div className="p-6 rounded-2xl bg-megacharge-dark bg-opacity-40 border border-megacharge-border">
            <span className="text-megacharge-text-secondary text-[11px] block uppercase tracking-wider mb-2 font-mono">Payback Period</span>
            <span className="text-white text-xl font-bold font-poppins font-mono">18 - 24 Months</span>
            <p className="text-megacharge-text-secondary text-[11px] mt-3 leading-relaxed">Calculated on 6 average vehicle charge sessions per charger every 24 hours.</p>
          </div>
        </div>
      </section>

      {/* BRAND IDENTITY & SIGNAGE SYSTEM KIT (NEW DETAILED SECTION FROM ASSET PPTX) */}
      <section className="max-w-7xl mx-auto mb-32">
        <motion.div 
          {...fadeInUp}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="section-label mb-4">🎨 BRANDING IDENTITY</span>
          <h2 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight">
            Print-Ready Signage & Site Identity Pack
          </h2>
          <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed mt-4">
            Every MegaCharge station setup is equipped with standardized, print-ready signage guides (Doc No: BAP-MC-001 Rev 02) to build user trust and ensure absolute safety.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SIGNAGE_ASSETS.map((asset) => (
            <motion.div 
              key={asset.id}
              variants={fadeInUp}
              className="premium-glass-card p-6 sm:p-8 rounded-3xl border border-megacharge-border flex flex-col justify-between"
            >
              <div>
                <span className="text-megacharge-green text-[10px] font-bold uppercase tracking-widest block font-mono mb-2">
                  {asset.dimensions} // {asset.dpi}
                </span>
                <h4 className="text-white font-extrabold text-xl mb-4">{asset.title}</h4>
                
                {/* Print Layout Specs */}
                <div className="p-4 rounded-xl bg-megacharge-dark bg-opacity-40 border border-megacharge-border border-opacity-60 text-[11px] font-mono mb-6">
                  <div className="flex justify-between border-b border-megacharge-border border-opacity-40 py-1.5">
                    <span className="text-megacharge-text-secondary">Material:</span>
                    <span className="text-white">{asset.material}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-megacharge-text-secondary">Finish:</span>
                    <span className="text-white text-right">{asset.finish}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-t border-megacharge-border border-opacity-40 pt-4">
                    <span className="text-[10px] text-megacharge-text-secondary uppercase block font-mono mb-1">Visual Text Layout</span>
                    <p className="text-white text-xs font-bold font-mono bg-megacharge-dark bg-opacity-30 p-2.5 rounded border border-megacharge-border border-opacity-30">
                      {asset.header}<br />
                      <span className="text-megacharge-green font-normal text-[10px]">{asset.tagline}</span>
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-[10px] text-megacharge-text-secondary uppercase block font-mono mb-2">Signage Details</span>
                    <ul className="flex flex-col gap-1.5 text-xs text-megacharge-text-secondary">
                      {asset.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-megacharge-green font-bold">&bull;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-megacharge-border border-opacity-40 pt-4 mt-6 text-[10px] font-mono text-megacharge-text-secondary flex justify-between items-center">
                <span>Print File Ready</span>
                <span className="text-megacharge-green">{asset.footnote}</span>
              </div>
            </motion.div>
          ))}

          {/* Printer checklist placeholder */}
          <motion.div 
            variants={fadeInUp}
            className="premium-glass-card p-6 sm:p-8 rounded-3xl border border-megacharge-green border-opacity-30 flex flex-col justify-between bg-megacharge-green bg-opacity-[0.02]"
          >
            <div>
              <span className="text-megacharge-green text-[10px] font-bold uppercase tracking-widest block font-mono mb-2">
                ASSET STANDARDIZATION
              </span>
              <h4 className="text-white font-extrabold text-xl mb-4">Printer Checklist</h4>
              <p className="text-megacharge-text-secondary text-xs leading-relaxed mb-6">
                All branding files are provided in vector-based CMYK formats with a 3mm bleed standard. Hindi translations are pre-outlined to avoid custom font rendering discrepancies.
              </p>
              <ul className="flex flex-col gap-2 text-[11px] text-megacharge-text-secondary font-mono">
                <li className="flex gap-2">☑ CMYK Color profile check</li>
                <li className="flex gap-2">☑ Crop & trim markers standard</li>
                <li className="flex gap-2">☑ Swapped official partner logo</li>
                <li className="flex gap-2">☑ Verified helpline number</li>
              </ul>
            </div>
            <a 
              href="/contact" 
              className="btn-premium-green text-white text-center text-xs font-bold py-4 rounded-full block mt-6"
            >
              Request Vector Signage Pack
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ENQUIRY INTAKE FORM */}
      <section id="enquiry-form" className="max-w-4xl mx-auto premium-glass-card p-8 md:p-16 rounded-3xl border border-megacharge-border relative">
        {/* Glow behind form */}
        <div className="absolute inset-0 bg-gradient-radial from-megacharge-green to-transparent opacity-[0.03] pointer-events-none" />
        
        <div className="text-center mb-12 relative z-10">
          <h3 className="text-white text-3xl font-extrabold">Apply for Franchise Program</h3>
          <p className="text-megacharge-text-secondary text-xs sm:text-sm mt-2">
            Complete the form below. Our Corporate Alliances Division will review your site availability details.
          </p>
        </div>

        {submitted ? (
          <div className="text-center p-8 border border-megacharge-green rounded-2xl bg-megacharge-green bg-opacity-5 relative z-10">
            <span className="text-4xl block mb-3 animate-bounce">✓</span>
            <h4 className="text-white font-bold text-lg mb-2">Application Received</h4>
            <p className="text-megacharge-text-secondary text-xs leading-relaxed max-w-md mx-auto">
              Thank you for applying. A representative from Mega Nirman & Industries Ltd (MNIL) will connect with you on your registered mobile number within 24 working hours. Reference ID: MC-FR-{Math.floor(Math.random() * 9000 + 1000)}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-white text-xs block mb-2 font-bold uppercase tracking-wider">Your Full Name *</label>
                <input 
                  type="text" required
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-megacharge-dark bg-opacity-50 border border-megacharge-border text-white text-sm px-5 py-4 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
                  placeholder="e.g. Ramesh Sharma"
                />
              </div>
              <div>
                <label className="text-white text-xs block mb-2 font-bold uppercase tracking-wider">Corporate Email *</label>
                <input 
                  type="email" required
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-megacharge-dark bg-opacity-50 border border-megacharge-border text-white text-sm px-5 py-4 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
                  placeholder="e.g. ramesh@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-white text-xs block mb-2 font-bold uppercase tracking-wider">Contact Mobile Number *</label>
                <input 
                  type="tel" required
                  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-megacharge-dark bg-opacity-50 border border-megacharge-border text-white text-sm px-5 py-4 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
                  placeholder="e.g. +91 98765 43210"
                />
              </div>
              <div>
                <label className="text-white text-xs block mb-2 font-bold uppercase tracking-wider">Proposed Site Location *</label>
                <input 
                  type="text" required
                  value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-megacharge-dark bg-opacity-50 border border-megacharge-border text-white text-sm px-5 py-4 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
                  placeholder="e.g. NH44 Expressway, Karnal, Haryana"
                />
              </div>
            </div>

            <div>
              <label className="text-white text-xs block mb-2 font-bold uppercase tracking-wider">Proposed Site Category</label>
              <select 
                value={formData.siteType} onChange={(e) => setFormData({...formData, siteType: e.target.value})}
                className="w-full bg-megacharge-dark bg-opacity-50 border border-megacharge-border text-white text-sm px-5 py-4 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
              >
                <option value="highway">Highway Stopway Plaza</option>
                <option value="mall">Shopping Mall / Hotel parking</option>
                <option value="office">Corporate Commercial complex</option>
                <option value="residential">Residential Housing society</option>
              </select>
            </div>

            <div>
              <label className="text-white text-xs block mb-2 font-bold uppercase tracking-wider">Site space / grid details (Optional)</label>
              <textarea 
                rows="4"
                value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-megacharge-dark bg-opacity-50 border border-megacharge-border text-white text-sm px-5 py-4 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors resize-none"
                placeholder="Details of available parking slots, transformer capacity (KVA) or lease preferences..."
              />
            </div>

            <button type="submit" className="w-full py-5 btn-premium-green text-white font-bold text-xs uppercase rounded-xl transition-all duration-300 mt-4">
              Submit Franchise Request
            </button>
          </form>
        )}
      </section>

    </div>
  );
};

export default FranchisePage;
