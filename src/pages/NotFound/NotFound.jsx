/**
 * ========================================
 * NotFound Page Component (404)
 * Purpose:
 * Renders the broken route fallback screen
 * with return-to-home navigation links.
 *
 * Developer Notes:
 * Uses center flexboxes.
 *
 * ========================================
 */

import React from 'react';
import { Link } from 'react-router-dom';

/* ==========================================
   NOTFOUND COMPONENT
========================================== */

const NotFound = () => {
  return (
    <div className="min-h-screen bg-megacharge-dark flex flex-col items-center justify-center text-center px-6 pt-20">
      <span className="text-megacharge-green text-8xl font-extrabold font-poppins block mb-4">404</span>
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-3 font-poppins">Out of Charge Grid Bounds</h2>
      <p className="text-megacharge-text-secondary text-sm leading-relaxed max-w-md mb-8">
        The route you are navigating is offline or currently undergoing telemetry repair diagnostics.
      </p>
      <Link to="/" className="bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 shadow-glow-green">
        Return to Central Station
      </Link>
    </div>
  );
};

export default NotFound;
