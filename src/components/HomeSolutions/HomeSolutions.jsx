import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Battery, Zap, Shield } from 'lucide-react';
import './HomeSolutions.css';

// Import images
import acCharger from '../../assets/ac_charger.png';
import dcCharger from '../../assets/dc_charger.png';
import zenergize60 from '../../assets/zenergize_60.jpg';
import zenergize120 from '../../assets/zenergize_120.jpg';
import zenergize240 from '../../assets/zenergize_240.jpg';
import agraStationCloseup from '../../assets/agra_station_closeup.jpg';

const FEATURED_CHARGERS = [
  {
    id: 'agra-expressway',
    type: 'Safexpress Guaranteed Hub',
    name: 'MC-101 | Agra Expressway Hub',
    capacity: '180 kW Dual Fast',
    connector: 'Dual CCS2 Fast Guns',
    rent: 'Diwali Price: ₹40 L',
    rating: 5.0,
    reviews: 38,
    isAC: false,
    isComingSoon: false,
    highlight: 'Safexpress Guaranteed · Prem Vehicles Agra',
    image: agraStationCloseup
  },
  {
    id: 'yamuna-expressway',
    type: 'Hyper Expressway Hub',
    name: 'MC-102 | Yamuna Expressway Super Hub',
    capacity: '240 kW Hyper Power',
    connector: 'Quad CCS2 Liquid 500A',
    rent: 'Diwali Price: ₹48 L',
    rating: 4.9,
    reviews: 44,
    isAC: false,
    isComingSoon: true,
    highlight: 'Coming Soon · Jewar Logistics Link',
    image: zenergize240
  },
  {
    id: 'delhi-mumbai-expressway',
    type: 'Greenfield Freight Hub',
    name: 'MC-103 | Delhi-Mumbai Expressway Hub',
    capacity: '120 kW Dual Fast',
    connector: 'Dual CCS2 Fast Guns',
    rent: 'Diwali Price: ₹29.5 L',
    rating: 4.8,
    reviews: 31,
    isAC: false,
    isComingSoon: true,
    highlight: 'Coming Soon · NE-4 Wayside Plaza',
    image: zenergize120
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
};

const HomeSolutions = () => {
  return (
    <section className="home-solutions-section py-24 px-6 relative overflow-hidden bg-slate-50 border-b border-slate-200">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-gradient-radial from-[#F18321]/5 to-transparent opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-gradient-radial from-[#832800]/5 to-transparent opacity-40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          {...fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#F18321]/10 text-[#F18321] border border-[#F18321]/15 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Zap size={12} className="fill-current" /> Charger Catalog
          </div>
          <h2 className="text-slate-900 text-3xl sm:text-5xl font-extrabold font-montserrat leading-tight">
            <span className="text-[#F18321]">EV Charging Solutions</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-4">
            Explore our most popular smart chargers, featuring live UPI/RFID billing telemetry, IP54 weatherproofing, and 24/7 engineering maintenance support.
          </p>
        </motion.div>

        {/* Charger Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FEATURED_CHARGERS.map((charger) => (
            <motion.div
              key={charger.id}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-[#F18321]/30 hover:shadow-premium-glass transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header tags */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-wider ${charger.isAC ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {charger.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold font-mono">{charger.capacity}</span>
                </div>

                {/* Image panel */}
                <div className="w-full h-44 bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-100 rounded-2xl overflow-hidden flex items-center justify-center p-4 mb-4 relative group">
                  <img 
                    src={charger.image || (charger.isAC ? acCharger : dcCharger)} 
                    alt={charger.name} 
                    className="h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute bottom-2 left-2 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${charger.isComingSoon ? 'bg-amber-600' : 'bg-slate-900/90'}`}>
                    {charger.highlight}
                  </div>
                </div>

                {/* Rating & Review */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex text-[#F18321]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill={i < Math.floor(charger.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(charger.rating) ? 0 : 2} />
                    ))}
                  </div>
                  <span className="text-slate-800 text-[10px] font-bold font-mono">{charger.rating}</span>
                  <span className="text-slate-400 text-[10px]">({charger.reviews} reviews)</span>
                </div>

                {/* Charger Title */}
                <h3 className="text-slate-900 font-extrabold text-base mb-6 leading-snug line-clamp-1">
                  {charger.name}
                </h3>
              </div>

              {/* Action Button */}
              <Link 
                to={`/chargers/${charger.id}`} 
                className={`w-full inline-flex items-center justify-center gap-2 text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl transition-all duration-300 hover:opacity-90 shadow-sm ${
                  charger.isComingSoon 
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700' 
                    : 'bg-gradient-to-r from-[#F18321] to-[#832800]'
                }`}
              >
                {charger.isComingSoon ? 'Coming Soon · Pre-Register' : 'Buy Now'} <ArrowRight size={12} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore More CTA */}
        <motion.div 
          {...fadeInUp}
          className="text-center mt-16"
        >
          <Link 
            to="/solutions" 
            className="inline-flex items-center gap-3 bg-[#402e32] hover:bg-[#653d1e] text-white font-bold text-sm px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 uppercase tracking-wider"
          >
            Explore More Solutions <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default HomeSolutions;
