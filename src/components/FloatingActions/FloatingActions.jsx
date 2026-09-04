import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FloatingActions.css';

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to show/hide "Go to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="floating-actions-container">
      
      {/* 1. WHATSAPP FLOATING BUTTON (PULSING GREEN) */}
      <a 
        href="https://wa.me/919289555090?text=Hello%20MegaCharge%2C%20I%20am%20interested%20in%20EV%20Charging%20Station%20Rentals."
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-float-btn shadow-2xl flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <span className="whatsapp-pulse-ring"></span>
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 2.016 14.12 1.01 11.99 1.01c-5.436 0-9.861 4.372-9.865 9.802-.003 1.84.494 3.639 1.446 5.209L2.535 21.1l5.112-1.946zm11.367-5.413c-.309-.154-1.829-.894-2.107-.994-.278-.1-.48-.15-.68.15-.2.3-.779.994-.954 1.193-.176.2-.351.224-.66.07-.309-.154-1.304-.476-2.483-1.517-.918-.809-1.537-1.81-1.717-2.115-.18-.305-.019-.47.135-.622.14-.136.31-.36.464-.539.155-.18.206-.305.31-.51.103-.204.051-.383-.026-.537-.077-.154-.68-1.619-.932-2.222-.245-.59-.496-.51-.68-.519-.176-.01-.377-.01-.578-.01-.201 0-.529.075-.806.373-.278.299-1.06 1.019-1.06 2.487 0 1.468 1.082 2.886 1.233 3.085.15.2 2.13 3.21 5.159 4.496.72.306 1.282.49 1.721.628.723.227 1.38.195 1.9.117.58-.086 1.83-.739 2.087-1.455.258-.717.258-1.33.18-1.455-.076-.124-.278-.2-.587-.354z"/>
        </svg>
      </a>

      {/* 2. GO TO TOP FLOATING BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="scroll-top-btn shadow-2xl flex items-center justify-center"
            aria-label="Go to Top"
          >
            <svg className="w-5 h-5 fill-white stroke-white stroke-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5M12 5L5 12M12 5L19 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};

export default FloatingActions;
