/**
 * ========================================
 * App Root Component
 * Purpose:
 * Configures the router, initializes Lenis
 * smooth scroll, and lays out global sections.
 *
 * Developer Notes:
 * Handles scroll cleanups and top scroll triggers.
 *
 * ========================================
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

/* Shared Layout Components */
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BackgroundGrid from './components/BackgroundGrid/BackgroundGrid';

/* Route Pages */
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Products from './pages/Products/Products';
import Solutions from './pages/Solutions/Solutions';
import NetworkPage from './pages/Network/NetworkPage';
import FranchisePage from './pages/Franchise/FranchisePage';
import Sustainability from './pages/Sustainability/Sustainability';
import ProjectsPage from './pages/Projects/ProjectsPage';
import CareersPage from './pages/Careers/CareersPage';
import ContactPage from './pages/Contact/ContactPage';
import NotFound from './pages/NotFound/NotFound';

/* ==========================================
   ROUTING HELPERS & SCROLL ALIGNMENT
========================================== */

/**
 * ScrollToTop Component
 * Forces window scroll coordinates to top on route change.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/* ==========================================
   APP COMPONENT
========================================== */

const App = () => {
  
  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Request Animation Frame loop for Lenis
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <BackgroundGrid>
        
        {/* Transparent Header */}
        <Navbar />

        {/* Dynamic Main Body */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/network" element={<NetworkPage />} />
            <Route path="/franchise" element={<FranchisePage />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Fallback 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Corporate Footer */}
        <Footer />

      </BackgroundGrid>
    </Router>
  );
};

export default App;
