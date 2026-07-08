import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRightIcon, PhoneIcon, IconGoogleBolt } from '../CustomIcons/CustomIcons';

gsap.registerPlugin(ScrollTrigger);

/* ── Animated counter ── */
const Counter = ({ to, suffix = '', duration = 2 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = to / (duration * 60);
        const t = setInterval(() => {
          start += step;
          if (start >= to) { setVal(to); clearInterval(t); }
          else setVal(Math.floor(start));
        }, 1000 / 60);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

/* ── SVG Charger plug animation ── */
const ChargerSVG = ({ plugged }) => (
  <svg viewBox="0 0 220 320" className="w-full h-full" fill="none">
    {/* Station body */}
    <rect x="50" y="60" width="120" height="180" rx="16" fill="url(#stationGrad)" stroke="rgba(147,166,200,0.3)" strokeWidth="1.5"/>
    <rect x="70" y="80" width="80" height="50" rx="8" fill="rgba(0,0,0,0.4)" stroke="rgba(147,166,200,0.2)" strokeWidth="1"/>
    {/* Screen glow */}
    <rect x="72" y="82" width="76" height="46" rx="7" fill="rgba(147,166,200,0.08)"/>
    {plugged ? (
      <g>
        <text x="100" y="112" textAnchor="middle" className="material-symbols-outlined" fontSize="14" fill="#93A6C8">
          bolt
        </text>
        <text x="126" y="112" textAnchor="middle" fontSize="10" fill="rgba(147,166,200,0.9)" fontFamily="monospace" fontWeight="bold">
          CHARGING
        </text>
      </g>
    ) : (
      <text x="110" y="112" textAnchor="middle" fontSize="12" fill="rgba(147,166,200,0.9)" fontFamily="monospace" fontWeight="bold">
        READY
      </text>
    )}
    {/* LED indicator */}
    <circle cx="110" cy="150" r="6" fill={plugged ? '#93A6C8' : '#344F4F'}>
      {plugged && <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>}
    </circle>
    {/* Port */}
    <rect x="90" y="175" width="40" height="30" rx="6" fill="rgba(0,0,0,0.5)" stroke="rgba(147,166,200,0.4)" strokeWidth="1.5"/>
    <rect x="97" y="181" width="26" height="18" rx="3" fill={plugged ? 'rgba(147,166,200,0.3)' : 'rgba(0,0,0,0.3)'}/>
    {/* Cable */}
    <motion.path
      d={plugged
        ? "M110 205 C110 230 110 250 110 265"
        : "M110 205 C110 230 140 255 150 285"}
      stroke="rgba(147,166,200,0.7)" strokeWidth="5" strokeLinecap="round"
      animate={{ d: plugged
        ? "M110 205 C110 230 110 250 110 265"
        : "M110 205 C110 230 140 255 150 285" }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    />
    {/* Plug head */}
    <motion.g
      animate={{ y: plugged ? 0 : 20, opacity: plugged ? 1 : 0.6 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <rect x="98" y="260" width="24" height="16" rx="4" fill="rgba(147,166,200,0.8)" stroke="rgba(147,166,200,0.4)" strokeWidth="1"/>
      <rect x="103" y="255" width="5" height="8" rx="2" fill="rgba(147,166,200,0.6)"/>
      <rect x="112" y="255" width="5" height="8" rx="2" fill="rgba(147,166,200,0.6)"/>
    </motion.g>
    {/* Energy bolts when plugged */}
    {plugged && [0,1,2].map(i => (
      <motion.text key={i} x={80 + i*20} y={130 + i*10} className="material-symbols-outlined" fontSize="14" fill="#93A6C8"
        initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0,1,0], y: -20 }}
        transition={{ duration: 1.2, delay: i * 0.3, repeat: Infinity }}>bolt</motion.text>
    ))}
    <defs>
      <linearGradient id="stationGrad" x1="50" y1="60" x2="170" y2="240" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#23322D"/>
        <stop offset="100%" stopColor="#0b131b"/>
      </linearGradient>
    </defs>
  </svg>
);

/* ── Floating energy particles ── */
const Particles = () => {
  const items = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 8 + 5,
    delay: Math.random() * 4,
    type: i % 5 === 0 ? 'bolt' : 'dot',
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map(p => (
        <motion.div key={p.id}
          className={`absolute ${p.type === 'bolt' ? 'select-none flex items-center justify-center' : 'rounded-full bg-megacharge-green'}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.type === 'dot' ? p.size : undefined, height: p.type === 'dot' ? p.size : undefined }}
          animate={{ y: [0, -30, 0], x: [0, 10, -8, 0], opacity: [0.05, 0.4, 0.05] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {p.type === 'bolt' ? <span className="material-symbols-outlined text-[12px] text-megacharge-green">bolt</span> : null}
        </motion.div>
      ))}
    </div>
  );
};

/* ── Horizontal scan line ── */
const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-megacharge-green to-transparent opacity-20 pointer-events-none z-10"
    animate={{ top: ['0%', '100%', '0%'] }}
    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
  />
);

/* ── Grid overlay ── */
const GridOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-0"
    style={{
      backgroundImage: `linear-gradient(rgba(147,166,200,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(147,166,200,0.04) 1px, transparent 1px)`,
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
  const [plugged, setPlugged] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleVisual = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const springY = useSpring(yTitle, { stiffness: 80, damping: 20 });

  /* Plug-in on scroll */
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setPlugged(v > 0.08));
    return unsub;
  }, [scrollYProgress]);

  /* Subtle mouse parallax */
  useEffect(() => {
    const handle = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
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
      { y: 80, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.04, duration: 0.9,
        ease: 'back.out(1.6)', delay: 0.3 }
    );
  }, []);

  /* Typewriter words */
  const words = ['Rental Income', 'Clean Mobility', 'Smart Infrastructure', 'Zero Risk'];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx(p => (p + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, []);

  /* Split title into chars for GSAP */
  const titleLine1 = 'OWN & RENT';
  const titleLine2 = 'YOUR EV CHARGING';
  const titleLine3 = 'STATION.';

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity: opacityHero }}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0f0d]"
    >
      {/* Deep ambient orbs */}
      <motion.div
        animate={{ x: mousePos.x * 1.5, y: mousePos.y }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
        className="absolute top-[-10%] right-[5%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(147,166,200,0.09) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <motion.div
        animate={{ x: -mousePos.x, y: -mousePos.y * 0.5 }}
        transition={{ type: 'spring', stiffness: 30, damping: 20 }}
        className="absolute bottom-[-10%] left-[0%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(104,138,160,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <GridOverlay />
      <ScanLine />
      <Particles />

      {/* ── MAIN LAYOUT ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 xl:px-12 w-full pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

        {/* LEFT */}
        <motion.div style={{ y: springY }} className="flex flex-col gap-8 xl:gap-10">

          {/* Eyebrow removed */}

          {/* Main heading — GSAP animated */}
          <div ref={titleRef} className="overflow-hidden" style={{ perspective: '800px' }}>
            <div className="text-white font-black font-poppins leading-[0.95] tracking-tighter text-[clamp(1.8rem,6vw,6.5rem)]">
              {[titleLine1, titleLine2].map((line, li) => (
                <div key={li} className="overflow-hidden">
                  <div className="flex flex-wrap">
                    {line.split(' ').map((word, wi) => (
                      <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
                        {word.split('').map((ch, ci) => (
                          <span key={ci} className="char inline-block">
                            {ch}
                          </span>
                        ))}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="overflow-hidden">
                <div className="flex flex-wrap">
                  {titleLine3.split(' ').map((word, wi) => (
                    <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
                      {word.split('').map((ch, ci) => (
                        <span key={ci} className="char inline-block text-megacharge-green">
                          {ch}
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="text-xl xl:text-2xl text-slate-300 leading-relaxed max-w-[560px]"
          >
            Partner with MegaCharge — launch premium EV charging stations on rent.
            Earn consistent monthly income through&nbsp;
            <span className="inline-block overflow-hidden relative h-[1.4em] align-bottom w-[220px] xl:w-[280px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute text-megacharge-green font-bold whitespace-nowrap"
                >
                  {words[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>.
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/contact"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-megacharge-green text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-glow-green transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(147,166,200,0.45)]"
            >
              <span className="relative z-10">Get a Free Site Survey</span>
              <motion.span className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRightIcon className="w-5 h-5" />
              </motion.span>
              {/* shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
              />
            </Link>

            <a href="tel:9289555090"
              className="group inline-flex items-center justify-center gap-3 bg-white bg-opacity-[0.05] hover:bg-opacity-[0.1] border border-slate-700 hover:border-megacharge-green text-white font-semibold text-lg px-8 py-5 rounded-2xl transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-megacharge-green bg-opacity-15 border border-megacharge-green border-opacity-40 flex items-center justify-center shrink-0 pulse-glow">
                <PhoneIcon className="w-4 h-4 text-megacharge-green" />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-slate-400 text-xs">24/7 Helpline</span>
                <span className="text-white font-bold text-lg">92895 55090</span>
              </div>
            </a>
          </motion.div>

          {/* Live stats removed */}
        </motion.div>

        {/* RIGHT — Charger visual */}
        <motion.div
          style={{ y: yVisual, scale: scaleVisual, x: mousePos.x * 0.5 }}
          transition={{ type: 'spring', stiffness: 60 }}
          className="relative flex items-center justify-center min-h-[540px] xl:min-h-[640px]"
        >
          {/* Glow rings */}
          {[1, 2, 3].map(i => (
            <motion.div key={i}
              className="absolute rounded-full border border-megacharge-green"
              style={{ width: 120 + i * 90, height: 120 + i * 90, opacity: 0.04 + i * 0.02 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.04 + i * 0.02, 0.08, 0.04 + i * 0.02] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            />
          ))}

          {/* Rotating orbit ring */}
          <motion.div
            className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-megacharge-green border-opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {/* orbit dot */}
            <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-megacharge-green shadow-glow-green" />
          </motion.div>

          {/* Charger SVG */}
          <motion.div
            className="relative z-10 w-[260px] xl:w-[300px]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChargerSVG plugged={plugged} />
          </motion.div>

          {/* Scroll hint label */}
          <AnimatePresence>
            {!plugged && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              >
                <span className="text-slate-500 text-[10px] uppercase tracking-widest font-mono">Scroll to plug in</span>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <div className="w-px h-8 bg-gradient-to-b from-megacharge-green to-transparent opacity-50" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* "Charging" badge — appears when plugged */}
          <AnimatePresence>
            {plugged && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                className="absolute top-8 right-4 xl:right-0 bg-megacharge-green bg-opacity-15 border border-megacharge-green border-opacity-50 rounded-2xl px-5 py-3 backdrop-blur-sm"
              >
                <span className="text-megacharge-green font-bold text-sm font-mono flex items-center gap-2">
                  <IconGoogleBolt size={18} className="text-megacharge-green" pulse />
                  CHARGING ACTIVE
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner stat */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-12 right-0 xl:-right-6 bg-[#0a0f0d] border border-slate-700 rounded-2xl px-5 py-4 shadow-xl"
          >
            <span className="text-megacharge-green text-2xl font-extrabold font-mono block leading-none">
              <Counter to={13500} suffix="+" duration={2.5} />
            </span>
            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-mono mt-1 block">Live Points</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PremiumHero;
