import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import heroBg from '../../assets/hero_bg.png';

const IsometricHero = () => {
  const containerRef = useRef(null);

  // Mouse coordinate values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for parallax tracking
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform coordinates into translations & slight rotations
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  // Parallax layers
  const shadowTranslateX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const shadowTranslateY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  // Handle mouse move within container bounds
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalize coordinates between -0.5 and 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  // Reset tracking on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[450px] sm:h-[500px] flex items-center justify-center cursor-pointer select-none overflow-visible"
    >
      {/* 1. Ambient Background Glowing Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft periwinkle/lavender background light */}
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-megacharge-green to-megacharge-orange rounded-full blur-[80px]"
        />
        
        {/* Floating grid circles */}
        <div className="absolute top-[20%] left-[10%] w-[120px] h-[120px] bg-megacharge-green opacity-5 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-[15%] right-[5%] w-[150px] h-[150px] bg-megacharge-orange opacity-5 rounded-full blur-xl animate-pulse" />
      </div>

      {/* 2. Floating Cyber Particles (HUD element simulator) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 300 - 150, 
              y: Math.random() * 200 + 100, 
              opacity: 0,
              scale: Math.random() * 0.4 + 0.3
            }}
            animate={{ 
              y: -50,
              opacity: [0, 0.8, 0],
              scale: [0.4, 0.8, 0.2]
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
            className="absolute left-1/2 bottom-0 w-3 h-3 bg-megacharge-green rounded-full shadow-glow-green"
          />
        ))}
      </div>

      {/* 3. Parallax Render Frame */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-[100%] max-w-[760px] aspect-[1000/524] overflow-visible transition-all duration-300"
      >
        {/* Custom SVG telemetry overlay with electrical currents */}
        <svg viewBox="0 0 1000 524" className="absolute inset-0 w-full h-full z-30 pointer-events-none overflow-visible">
          {/* Glowing Background Pulse Ring behind circle backdrop (Circle center ≈ x: 445, y: 262) */}
          <circle 
            cx="445" 
            cy="262" 
            r="188" 
            fill="none" 
            stroke="#93A6C8" 
            strokeWidth="2.5" 
            className="opacity-20"
            style={{ transformOrigin: '445px 262px' }}
          >
            <animate attributeName="r" values="188;205;188" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.25;0.05;0.25" dur="4s" repeatCount="indefinite" />
          </circle>

          {/* Glowing Cable Spark Flow 1 */}
          <circle r="6" fill="#B5D26A" filter="drop-shadow(0 0 8px #B5D26A)">
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M 768,354 C 768,460 768,470 700,470 L 330,470 C 330,470 330,388 255,388" />
          </circle>

          {/* Glowing Cable Spark Flow 2 (delayed offset) */}
          <circle r="4.5" fill="#C9C1EB" filter="drop-shadow(0 0 6px #C9C1EB)">
            <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M 768,354 C 768,460 768,470 700,470 L 330,470 C 330,470 330,388 255,388" />
          </circle>

          {/* Pulsing Charger Plug Node (x: 768, y: 354) */}
          <circle cx="768" cy="354" r="8" fill="#B5D26A" className="opacity-35">
            <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="768" cy="354" r="3.5" fill="#B5D26A" />

          {/* Pulsing Car Plug Node (x: 255, y: 388) */}
          <circle cx="255" cy="388" r="8" fill="#B5D26A" className="opacity-35">
            <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" style={{ animationDelay: '0.6s' }} />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="255" cy="388" r="3.5" fill="#B5D26A" />

          {/* Pulsing Charger Screen LED status indicator */}
          <circle cx="755" cy="186" r="3.5" fill="#F9F871">
            <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Hero Graphic Image */}
        <motion.img 
          src={heroBg}
          alt="MegaCharge EV Charging Illustration"
          className="w-full h-full object-contain scale-[1.01]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.01 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </motion.div>

      {/* 4. Underlying Drop Shadow Layer */}
      <motion.div
        style={{
          translateX: shadowTranslateX,
          translateY: shadowTranslateY,
        }}
        className="absolute bottom-[10%] w-[80%] max-w-[380px] h-[30px] bg-black opacity-35 rounded-full blur-[24px] z-10 pointer-events-none"
      />
    </div>
  );
};

export default IsometricHero;
