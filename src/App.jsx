/**
 * ========================================
 * App Root Component
 * Purpose:
 * Configures the router, initialises Lenis
 * smooth scroll, and lays out global sections.
 * Includes AnimatePresence for page transitions.
 * ========================================
 */

import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

/* Shared Layout Components */
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BackgroundGrid from './components/BackgroundGrid/BackgroundGrid';
import FloatingActions from './components/FloatingActions/FloatingActions';
import PageTransition from './components/PageTransition/PageTransition';

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
   SCROLL TO TOP ON ROUTE CHANGE
========================================== */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/* ==========================================
   ANIMATED ROUTES — reads location key for
   AnimatePresence to detect route changes
========================================== */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
        <Route path="/solutions" element={<PageTransition><Solutions /></PageTransition>} />
        <Route path="/network" element={<PageTransition><NetworkPage /></PageTransition>} />
        <Route path="/franchise" element={<PageTransition><FranchisePage /></PageTransition>} />
        <Route path="/sustainability" element={<PageTransition><Sustainability /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><CareersPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

/* ==========================================
   APP COMPONENT
========================================== */
const App = () => {

  // Initialise Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <BackgroundGrid>
        <Navbar />
        <FloatingActions />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </BackgroundGrid>
    </Router>
  );
};

export default App;
