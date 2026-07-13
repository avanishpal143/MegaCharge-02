import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRightIcon } from '../CustomIcons/CustomIcons';
import megachargeBanner from '../../assets/megacharge_banner.png';

/* ── Horizontal scan line ── */
const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-megacharge-brand to-transparent opacity-10 pointer-events-none z-10"
    animate={{ top: ['0%', '100%', '0%'] }}
    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
  />
);

/* ── Grid overlay ── */
const GridOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-0"
    style={{
      backgroundImage: `linear-gradient(rgba(101,61,30,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(101,61,30,0.02) 1px, transparent 1px)`,
      backgroundSize: '60px 60px',
    }}
  />
);

/* ════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════ */
const PremiumHero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  /* Subtle mouse parallax */
  useEffect(() => {
    const handle = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 8,
      });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  /* GSAP title letter stagger */
  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll('.char');
    gsap.fromTo(chars,
      { y: 60, opacity: 0, rotateX: -60 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 0.8,
        ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const headline = "OWN & RENT YOUR EV CHARGING STATION.";

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-megacharge-gray pt-20 pb-12"
    >
      {/* Deep ambient orbs matching strict palette */}
      <motion.div
        animate={{ x: mousePos.x * 1.2, y: mousePos.y }}
        transition={{ type: 'spring', stiffness: 45, damping: 20 }}
        className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(241,131,33,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />
      <motion.div
        animate={{ x: -mousePos.x, y: -mousePos.y * 0.6 }}
        transition={{ type: 'spring', stiffness: 35, damping: 20 }}
        className="absolute bottom-[-10%] left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(131,40,0,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <GridOverlay />
      <ScanLine />

      {/* ── MAIN LAYOUT ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">

        {/* LEFT SECTION (TEXT & CTA) */}
        <div className="lg:col-span-7 flex flex-col gap-6 xl:gap-8 justify-center">

          {/* Main heading — GSAP animated */}
          <div ref={titleRef} className="overflow-hidden" style={{ perspective: '800px' }}>
            <h1 className="text-megacharge-heading font-black font-montserrat leading-[1.05] tracking-tight text-[clamp(1.8rem,4vw,3.2rem)]">
              {["OWN & RENT", "YOUR EV", "CHARGING STATION."].map((line, li) => (
                <span key={li} className="block">
                  {line.split(' ').map((word, wi) => (
                    <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden">
                      {word.split('').map((ch, ci) => (
                        <span key={ci} className="char inline-block">
                          {ch}
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-megacharge-paragraph font-inter text-base md:text-lg leading-relaxed max-w-[580px]"
          >
            Partner with MegaCharge to launch premium EV charging stations on rent. Earn consistent monthly income through Rental Income
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <Link to="/network"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#F18321] to-[#832800] text-white font-bold text-base px-8 py-4 rounded-full shadow-glow-orange transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(241,131,33,0.45)]"
            >
              <span className="relative z-10 uppercase tracking-wider text-xs">Explore Map</span>
              <motion.span className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRightIcon className="w-4 h-4" />
              </motion.span>
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-15"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
              />
            </Link>
          </motion.div>

        </div>

        {/* RIGHT SECTION (BANNER IMAGE) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: mousePos.x * 0.4, y: mousePos.y * 0.4 }}
          className="lg:col-span-5 relative w-full flex items-center justify-center"
        >
          {/* Card Frame enclosing the image with premium glass shadows */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(64,46,50,0.12)] border border-megacharge-border bg-white p-2">
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img
                src={megachargeBanner}
                alt="MegaCharge Station with EV Cars"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Branded floating status badge */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 right-4 bg-megacharge-card border border-megacharge-border rounded-2xl px-5 py-3 shadow-[0_10px_30px_rgba(64,46,50,0.08)]"
          >
            <div className="flex flex-col items-center justify-center text-center font-montserrat leading-tight px-2 py-0.5">
              <span className="text-megacharge-heading font-black text-lg md:text-xl block">250+</span>
              <span className="text-megacharge-brand font-bold text-[9px] uppercase tracking-widest block mt-0.5">Live Points</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default PremiumHero;
