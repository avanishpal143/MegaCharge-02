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
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setSubmitted(true);
    }
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const FAQS = [
    {
      q: "What is the key difference between the FOCO and FOLO models?",
      a: "In the FOCO (Company Operated) model, you lease the land and MegaCharge manages all operations, paying you a fixed rent or session share. In the FOLO (Locally Operated) model, you rent our hardware, set custom margins, and manage local customer service yourself."
    },
    {
      q: "What is the lock-in period for the rental agreement?",
      a: "Our standard rental lease agreement has a duration of 3 to 5 years. It is fully renewable with built-in hardware upgrades and expansion pathways."
    },
    {
      q: "How does MNIL coordinate structural civil works?",
      a: "Our centralized engineering division conducts initial civil checks and allocates localized teams to carry out base concrete pouring, cabling trenches, protection isolators, and signage installations."
    }
  ];

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
      finish: "Green reflective additive",
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
    <div className="franchise-page-container bg-slate-50 min-h-screen overflow-hidden">
      
      {/* HEADER SECTION (DARK GRADIENT) */}
      <section className="w-full bg-[#0B132B] pt-32 pb-20 px-6 text-center text-white border-b border-slate-800 relative">
        <div className="absolute inset-0 bg-gradient-radial from-[#00B4D8] to-transparent opacity-10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold font-poppins leading-none tracking-tight">
            EV Charger Rentals <br />
            <span className="text-gradient-green">& Partner Models</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mt-6">
            Get a premium charging station installed on your commercial property. Partner with MegaCharge, backed by the industrial legacy of **Mega Nirman & Industries Ltd (MNIL)**, and choose a lease layout that works for you.
          </p>
        </div>
      </section>

      {/* RENTAL / BUSINESS MODELS */}
      <section className="max-w-7xl mx-auto py-24 px-6">
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
            className="premium-glass-card p-10 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-[#00B4D8] text-xs font-extrabold uppercase tracking-widest bg-[#00B4D8] bg-opacity-5 border border-[#00B4D8] border-opacity-30 px-4 py-1.5 rounded-full">
                  FOCO Rental Model
                </span>
                <span className="text-slate-500 text-xs font-mono">Franchise Owned · Company Operated</span>
              </div>
              <h3 className="text-slate-900 text-3xl font-extrabold mb-4">Hands-Off Yield Payouts</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Rent out your land or parking space to MegaCharge. We manage the charger hardware supply, utility approvals, installation, cloud software billing, remote maintenance, and 24x7 customer support. You receive steady monthly rental lease payments with zero operational stress.
              </p>
              <ul className="flex flex-col gap-3 text-xs text-slate-600 font-mono mb-8">
                <li className="flex items-center gap-2">&bull; Minimum Space: 2–4 parking bays</li>
                <li className="flex items-center gap-2">&bull; Ideal Sites: Highway hotels, food malls, tech parks</li>
                <li className="flex items-center gap-2">&bull; Maintenance: 100% managed by MegaCharge team</li>
              </ul>
            </div>
            <a href="#enquiry-form" className="btn-premium-green text-white text-center text-xs font-bold py-4 rounded-full transition-all duration-300 block">
              Host a Station &rarr;
            </a>
          </motion.div>

          {/* FOLO CARD */}
          <motion.div 
            variants={fadeInUp}
            className="premium-glass-card p-10 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-[#FF6B35] text-xs font-extrabold uppercase tracking-widest bg-[#FF6B35] bg-opacity-5 border border-[#FF6B35] border-opacity-30 px-4 py-1.5 rounded-full">
                  FOLO Rental Model
                </span>
                <span className="text-slate-500 text-xs font-mono">Franchise Owned · Locally Operated</span>
              </div>
              <h3 className="text-slate-900 text-3xl font-extrabold mb-4">Active Operator Margins</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Rent the chargers directly from MegaCharge and manage the local station operations on your property. You get complete access to the cloud OCPP 1.6 SaaS client dashboard, control over local pricing, and customer billing pathways. Perfect for gas station owners and expressways.
              </p>
              <ul className="flex flex-col gap-3 text-xs text-slate-600 font-mono mb-8">
                <li className="flex items-center gap-2">&bull; Minimum Space: 3–6 highway parking bays</li>
                <li className="flex items-center gap-2">&bull; Ideal Sites: Petrol pumps, transit depots, logistics hubs</li>
                <li className="flex items-center gap-2">&bull; Software: Direct CPO portal telemetry access</li>
              </ul>
            </div>
            <a href="#enquiry-form" className="btn-premium-green text-white text-center text-xs font-bold py-4 rounded-full transition-all duration-300 block">
              Rent a Charger &rarr;
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* INVESTMENT & PAYBACK METRICS */}
      <section className="max-w-7xl mx-auto mb-24 bg-white border border-slate-200 p-8 md:p-16 rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-12 text-slate-900">
        <div className="lg:col-span-1 flex flex-col justify-center">
          <h3 className="text-slate-900 text-3xl font-extrabold mb-4 leading-tight">Projected Rental Returns</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Baseline figures are calculated for a standard dual-charger highway station layout (120 kW dual-gun DC Fast Charger). Projections align with MNIL historical highway grid analytics.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 text-[11px] block uppercase tracking-wider mb-2 font-mono">Monthly Base Rent</span>
            <span className="text-slate-900 text-xl font-bold font-poppins font-mono">₹25K - ₹50K</span>
            <p className="text-slate-600 text-[11px] mt-3 leading-relaxed">Fixed lease payouts depending on space size, highway traffic density, and electricity grid supply access.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 text-[11px] block uppercase tracking-wider mb-2 font-mono">Revenue Share</span>
            <span className="text-[#00B4D8] text-xl font-bold font-poppins font-mono">10% - 18%</span>
            <p className="text-slate-600 text-[11px] mt-3 leading-relaxed">Percentage of gross session revenues paid out to the site host, calculated and disbursed monthly.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 text-[11px] block uppercase tracking-wider mb-2 font-mono">Contract Term</span>
            <span className="text-slate-900 text-xl font-bold font-poppins font-mono">3 - 5 Years</span>
            <p className="text-slate-600 text-[11px] mt-3 leading-relaxed">Standard renewable rental agreement with guaranteed hardware upgrades and maintenance intervals.</p>
          </div>
        </div>
      </section>

      {/* BRAND IDENTITY & SIGNAGE SYSTEM KIT */}
      <section className="max-w-7xl mx-auto mb-24 px-6 bg-transparent">
        <motion.div 
          {...fadeInUp}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold leading-tight">
            Print-Ready Signage & Site Identity Pack
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mt-4">
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
              className="premium-glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between text-slate-900"
            >
              <div>
                <span className="text-[#00B4D8] text-[10px] font-bold uppercase tracking-widest block font-mono mb-2">
                  {asset.dimensions} // {asset.dpi}
                </span>
                <h4 className="text-slate-900 font-extrabold text-xl mb-4">{asset.title}</h4>
                
                {/* Print Specs */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono mb-6">
                  <div className="flex justify-between border-b border-slate-200 py-1.5">
                    <span className="text-slate-500">Material:</span>
                    <span className="text-slate-900 font-bold">{asset.material}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Finish:</span>
                    <span className="text-slate-900 font-bold text-right">{asset.finish}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-t border-slate-200 pt-4">
                    <span className="text-[10px] text-slate-500 uppercase block font-mono mb-1">Visual Text Layout</span>
                    <span className="text-slate-900 text-xs font-bold leading-tight block">{asset.header}</span>
                    <span className="text-slate-600 text-xs leading-normal mt-1 block">{asset.tagline}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <span className="text-[10px] text-slate-500 uppercase block font-mono mb-1.5">Content points</span>
                    <ul className="space-y-2">
                      {asset.bullets.map((bullet, idx) => (
                        <li key={idx} className="text-slate-600 text-xs leading-relaxed flex items-start gap-1">
                          <span>&bull;</span> <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 mt-6 text-[10px] font-mono text-slate-500 text-center">
                {asset.footnote}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FRANCHISE FAQ SECTION */}
      <section className="max-w-4xl mx-auto pb-24 px-6">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-slate-900 text-3xl font-extrabold">Franchise & Alliance FAQs</h2>
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

      {/* RENTAL ALLIANCE ENQUIRY FORM */}
      <section id="enquiry-form" className="max-w-3xl mx-auto pb-24 px-6 bg-transparent relative">
        <div className="absolute inset-0 bg-gradient-radial from-[#00B4D8] to-transparent opacity-5 blur-2xl pointer-events-none" />
        
        <motion.div 
          {...fadeInUp}
          className="premium-glass-card-dark p-8 md:p-12 rounded-3xl border border-[#00B4D8] border-opacity-20 shadow-[0_0_30px_rgba(0,180,216,0.15)] text-white relative z-10"
        >
          <div className="text-center mb-10">
            <h3 className="text-white text-3xl font-extrabold mb-3">Host or Rent an EV Station</h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto">
              Submit your property details for a free site assessment survey by MNIL engineers. Let's build India's green grid together.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 border border-green-500 border-opacity-40 rounded-2xl bg-green-500 bg-opacity-5 text-center">
              <span className="text-4xl block mb-4">🎉</span>
              <h4 className="text-white text-xl font-bold mb-2">Request Submitted Successfully!</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Thank you for applying. A MegaCharge representative will reach out to schedule your site grid evaluation survey.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10 text-slate-900">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-white text-xs font-bold uppercase tracking-wider font-mono">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name" 
                    className="bg-[#1C2541] border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B4D8]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white text-xs font-bold uppercase tracking-wider font-mono">Corporate Email</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@company.com" 
                    className="bg-[#1C2541] border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B4D8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-white text-xs font-bold uppercase tracking-wider font-mono">Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 99999 99999" 
                    className="bg-[#1C2541] border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B4D8]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white text-xs font-bold uppercase tracking-wider font-mono">Property Location (City / State) *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. Gurugram, Haryana" 
                    className="bg-[#1C2541] border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B4D8]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white text-xs font-bold uppercase tracking-wider font-mono">Property Category</label>
                <select 
                  value={formData.siteType}
                  onChange={(e) => setFormData({...formData, siteType: e.target.value})}
                  className="bg-[#1C2541] border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B4D8]"
                >
                  <option value="highway">Highway Land / Gas Station</option>
                  <option value="mall">Shopping Mall / Commercial Parking</option>
                  <option value="hotel">Hotel / Restaurant parking</option>
                  <option value="office">Office complex / Tech Park</option>
                  <option value="residential">Residential Housing Society</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white text-xs font-bold uppercase tracking-wider font-mono">Message / Site Details</label>
                <textarea 
                  rows="4" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Provide approximate space dimensions, existing electricity load, or other details..." 
                  className="bg-[#1C2541] border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00B4D8]"
                />
              </div>

              <button 
                type="submit" 
                className="w-full text-center bg-[#00B4D8] hover:bg-opacity-95 text-white font-bold text-sm py-4 rounded-xl transition-all duration-300 shadow-sm mt-2 block"
              >
                Submit Installation Inquiry
              </button>
            </form>
          )}
        </motion.div>
      </section>

    </div>
  );
};

export default FranchisePage;
