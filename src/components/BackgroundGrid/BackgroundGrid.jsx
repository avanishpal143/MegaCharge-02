/**
 * ========================================
 * BackgroundGrid Component
 * Purpose:
 * Renders a global animated background grid,
 * colored ambient glowing light circles, and a cursor spotlight.
 *
 * ========================================
 */

import React, { useRef, useEffect } from 'react';

const BackgroundGrid = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate absolute position on the grid container including scroll values
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-mesh-grid min-h-screen relative w-full">
      {/* Ambient Drifting Glow Orbs */}
      <div className="ambient-glow-orb orb-green w-[300px] md:w-[600px] h-[300px] md:h-[600px] -top-[10%] -left-[10%]" />
      <div className="ambient-glow-orb orb-orange w-[350px] md:w-[700px] h-[350px] md:h-[700px] -bottom-[20%] -right-[10%]" />
      <div className="ambient-glow-orb orb-cyan w-[250px] md:w-[500px] h-[250px] md:h-[500px] top-[35%] left-[55%]" />
      
      {/* Dynamic scanline overlay for cyber-tech feel */}
      <div 
        className="absolute inset-0 pointer-events-none z-[2]" 
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 4px, 6px 100%',
          opacity: 0.15
        }}
      />

      {/* Dynamic Cursor Spotlight Overlay */}
      <div className="cursor-spotlight" />

      {/* Main Content Layer */}
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default BackgroundGrid;
