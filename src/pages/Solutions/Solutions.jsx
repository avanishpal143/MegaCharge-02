import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Heart, SlidersHorizontal, Grid, List, Check, X, 
  ArrowRight, ChevronDown, ChevronUp, Star, Info, HelpCircle
} from 'lucide-react';
import './Solutions.css';
import ContactForm from '../../components/ContactForm/ContactForm';

// Import assets
import acCharger from '../../assets/ac_charger.png';
import dcCharger from '../../assets/dc_charger.png';
import zenergize60 from '../../assets/zenergize_60.jpg';
import zenergize120 from '../../assets/zenergize_120.jpg';
import zenergize240 from '../../assets/zenergize_240.jpg';

/* ==========================================
   ANIMATION CONFIGS
========================================== */
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.08 }
};

/* ==========================================
   CHARGER DATASET
========================================== */
const CHARGERS_DATASET = [
  {
    id: 'portable3',
    type: 'portable',
    name: 'MegaCharge Portable Go 3.3 kW',
    power: '3.3 kW (Single Phase 15A)',
    voltage: '230V AC ± 15%',
    connector: '16A 3-Pin Plug to Type 2',
    efficiency: '98%',
    features: ['Overcurrent Protection', 'Smart LED status indicator', '5m robust cable', 'Compact design'],
    usage: 'Home Charging, Emergency Portable',
    priceVal: 490,
    priceStr: '₹490/month',
    purchasePrice: '₹12,990',
    rating: 4.4,
    reviews: 190,
    capacityGroup: '3.3 kW',
    connectorGroup: 'Type 2'
  },
  {
    id: 'ac7',
    type: 'ac',
    name: 'MegaCharge 7.4 kW AC Smart Box',
    power: '7.4 kW (Single Phase 32A)',
    voltage: '230V AC ± 15%',
    connector: 'Type 2 plug with 5m cable',
    efficiency: '97%',
    features: ['RFID Authorization', 'Wi-Fi / Bluetooth Integration', 'App Schedule Control', 'Ergonomic Wall Mount'],
    usage: 'Workplace/Office, Home Charging',
    priceVal: 1490,
    priceStr: '₹1,490/month',
    purchasePrice: '₹39,990',
    rating: 4.8,
    reviews: 124,
    capacityGroup: '7.4 kW',
    connectorGroup: 'Type 2'
  },
  {
    id: 'ac11',
    type: 'ac',
    name: 'MegaCharge Premium 11 kW AC Wallbox',
    power: '11 kW (Three Phase 16A)',
    voltage: '415V AC ± 10%',
    connector: 'Type 2 plug with 5m cable',
    efficiency: '97%',
    features: ['RFID Authorization', 'Wi-Fi / Ethernet Integration', 'Dynamic Load Balancer', 'LED status display'],
    usage: 'Home Charging, Workplace/Office, Hotel',
    priceVal: 1990,
    priceStr: '₹1,990/month',
    purchasePrice: '₹49,990',
    rating: 4.6,
    reviews: 82,
    capacityGroup: '11 kW',
    connectorGroup: 'Type 2'
  },
  {
    id: 'ac22',
    type: 'ac',
    name: 'MegaCharge Dual 22 kW AC Commercial',
    power: '22 kW (Three Phase split)',
    voltage: '415V AC ± 10%',
    connector: 'Dual Type 2 Connectors',
    efficiency: '97.5%',
    features: ['Dual RFID Authentication', 'OCPP 1.6 Billing System', 'LED interactive screen', 'Weatherproof casing'],
    usage: 'Commercial Properties, Workplace/Office, Hotel, Retail Malls',
    priceVal: 2990,
    priceStr: '₹2,990/month',
    purchasePrice: '₹79,990',
    rating: 4.7,
    reviews: 65,
    capacityGroup: '22 kW',
    connectorGroup: 'Type 2'
  },
  {
    id: 'dc30',
    type: 'dc',
    name: 'MegaCharge 30 kW DC Compact Rapid',
    power: '30 kW (Three Phase)',
    voltage: '415V AC ± 10%',
    connector: 'Single CCS2 Gun',
    efficiency: '95%',
    features: ['OCPP 1.6 cloud sync', 'Intelligent power distribution', '7-inch LCD interface', 'Emergency stop mechanism'],
    usage: 'Fleet & Logistics, Retail Malls, Hotel, Commercial Properties',
    priceVal: 9990,
    priceStr: '₹9,990/month',
    purchasePrice: '₹2,49,990',
    rating: 4.5,
    reviews: 39,
    capacityGroup: '30 kW',
    connectorGroup: 'CCS2 Single Gun'
  },
  {
    id: 'dc60',
    type: 'dc',
    name: 'MegaCharge 60 kW Dual Gun DC Charger',
    power: '60 kW (Three Phase split)',
    voltage: '415V AC ± 10%',
    connector: 'Dual CCS2 Guns',
    efficiency: '96%',
    features: ['OCPP 1.6 telemetry', 'Dynamic output sharing', 'Unified UPI QR code billing', 'IP54 weather protection'],
    usage: 'Highway Plazas, Retail Malls, Fleet & Logistics',
    priceVal: 18990,
    priceStr: '₹18,990/month',
    purchasePrice: '₹5,89,990',
    rating: 4.9,
    reviews: 110,
    capacityGroup: '60 kW',
    connectorGroup: 'CCS2 Dual Gun',
    image: zenergize60
  },
  {
    id: 'dc120',
    type: 'dc',
    name: 'MegaCharge 120 kW High-Power DC Charger',
    power: '120 kW (Three Phase High Load)',
    voltage: '415V AC ± 10%',
    connector: 'Dual CCS2 High-Power Guns',
    efficiency: '96.5%',
    features: ['Liquid-cooled rectifiers', 'Fast charge up to 120 kW', '24x7 remote diagnostics', 'Custom brand wrappers'],
    usage: 'Highway Plazas, Fleet & Logistics',
    priceVal: 29990,
    priceStr: '₹29,990/month',
    purchasePrice: '₹11,49,990',
    rating: 4.8,
    reviews: 56,
    capacityGroup: '120 kW',
    connectorGroup: 'CCS2 Dual Gun',
    image: zenergize120
  },
  {
    id: 'dc240',
    type: 'dc',
    name: 'MegaCharge 240 kW Liquid-Cooled Hyper Charger',
    power: '240 kW Ultra Power',
    voltage: '415V AC ± 10% Grid',
    connector: 'Dual CCS2 High-Power Guns',
    efficiency: '96.8%',
    features: ['Liquid-cooled active system', 'Ultra-fast hyper charging', 'NOC telemetry sync', 'Active surge protection fuse'],
    usage: 'Highway Plazas, Fleet & Logistics depots',
    priceVal: 54990,
    priceStr: '₹54,990/month',
    purchasePrice: '₹19,49,990',
    rating: 4.9,
    reviews: 78,
    capacityGroup: '240 kW',
    connectorGroup: 'CCS2 Dual Gun',
    image: zenergize240
  }
];

const FAQS_LIST = [
  {
    q: "What electrical connection parameters are required for solutions?",
    a: "AC Wallbox installations require standard single-phase 230V or three-phase 415V domestic grids. High-power DC chargers (30kW - 180kW) require a dedicated LT/HT three-phase commercial connection with appropriate grid sanction load."
  },
  {
    q: "How does the revenue-sharing payout schedule operate?",
    a: "Under the FOCO model, MegaCharge installs the meters. Telemetry automatically tallies the kWh dispensed. Earnings are calculated dynamically based on local utility slab tariffs, and payouts are disbursed directly to your bank account within the first 7 days of each month."
  },
  {
    q: "Can the local housing society admin customize user charging tariffs?",
    a: "Yes. Using the Society Admin Portal dashboard, admins can set differential tariffs (e.g. baseline rates for residents, higher rates for visitors) and distribute RFID swipe authorization cards."
  },
  {
    q: "What happens if a charger goes offline or has a coupler jam?",
    a: "Our NOC diagnostic telemetry center runs 24x7 monitoring. Jammed couplers or network drops trigger an automatic reset command. Physical faults are assigned to a localized MNIL field engineer, resolving under 24 hours."
  }
];

const Solutions = () => {
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCapacities, setSelectedCapacities] = useState([]);
  const [selectedConnectors, setSelectedConnectors] = useState([]);
  const [selectedUsages, setSelectedUsages] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  // UI state
  const [sortOption, setSortOption] = useState('best-selling');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [wishlist, setWishlist] = useState([]);
  const [comparedChargers, setComparedChargers] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [selectedDetailCharger, setSelectedDetailCharger] = useState(null);
  const [expandedSpecs, setExpandedSpecs] = useState([]); // Array of IDs expanded inline
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [faqIndex, setFaqIndex] = useState(null);


  // Inquiry form states
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Collapsible filters section in sidebar
  const [expandedFilterSections, setExpandedFilterSections] = useState({
    type: true,
    capacity: true,
    connector: true,
    usage: true,
    price: true
  });

  const toggleFilterSection = (section) => {
    setExpandedFilterSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleClearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedCapacities([]);
    setSelectedConnectors([]);
    setSelectedUsages([]);
    setSelectedPriceRanges([]);
    setSearchQuery('');
  };

  const handleTypeCheck = (typeVal) => {
    setSelectedTypes(prev => 
      prev.includes(typeVal) ? prev.filter(t => t !== typeVal) : [...prev, typeVal]
    );
  };

  const handleCapacityCheck = (cap) => {
    setSelectedCapacities(prev => 
      prev.includes(cap) ? prev.filter(c => c !== cap) : [...prev, cap]
    );
  };

  const handleConnectorCheck = (conn) => {
    setSelectedConnectors(prev => 
      prev.includes(conn) ? prev.filter(c => c !== conn) : [...prev, conn]
    );
  };

  const handleUsageCheck = (usageVal) => {
    setSelectedUsages(prev => 
      prev.includes(usageVal) ? prev.filter(u => u !== usageVal) : [...prev, usageVal]
    );
  };

  const handlePriceCheck = (range) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const handleWishlistToggle = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(wId => wId !== id) : [...prev, id]
    );
  };

  const handleCompareCheck = (charger) => {
    setComparedChargers(prev => {
      const isAlreadyChecked = prev.some(c => c.id === charger.id);
      if (isAlreadyChecked) {
        return prev.filter(c => c.id !== charger.id);
      } else {
        if (prev.length >= 3) {
          alert("You can compare up to 3 chargers at a time.");
          return prev;
        }
        return [...prev, charger];
      }
    });
  };

  const toggleInlineSpecs = (id) => {
    setExpandedSpecs(prev => 
      prev.includes(id) ? prev.filter(expId => expId !== id) : [...prev, id]
    );
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (inquiryName && inquiryPhone) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setInquiryName('');
        setInquiryPhone('');
        setInquiryEmail('');
        setInquiryMessage('');
        setSelectedDetailCharger(null);
      }, 3000);
    }
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return CHARGERS_DATASET.filter(charger => {
      // Search query check
      if (searchQuery && !charger.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Product Type check
      if (selectedTypes.length > 0 && !selectedTypes.includes(charger.type)) {
        return false;
      }
      // Capacity check
      if (selectedCapacities.length > 0 && !selectedCapacities.includes(charger.capacityGroup)) {
        return false;
      }
      // Connector check
      if (selectedConnectors.length > 0 && !selectedConnectors.includes(charger.connectorGroup)) {
        return false;
      }
      // Usage check
      if (selectedUsages.length > 0) {
        const matchesUsage = selectedUsages.some(u => charger.usage.toLowerCase().includes(u.toLowerCase()));
        if (!matchesUsage) return false;
      }
      // Price range check
      if (selectedPriceRanges.length > 0) {
        const matchesPrice = selectedPriceRanges.some(range => {
          if (range === 'low' && charger.priceVal < 5000) return true;
          if (range === 'med' && charger.priceVal >= 5000 && charger.priceVal <= 20000) return true;
          if (range === 'high' && charger.priceVal > 20000) return true;
          return false;
        });
        if (!matchesPrice) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === 'best-selling') {
        return b.reviews - a.reviews; // Best rating/reviews count
      }
      if (sortOption === 'power-asc') {
        const getKW = (str) => parseFloat(str.replace(/[^0-9.]/g, ''));
        return getKW(a.capacityGroup) - getKW(b.capacityGroup);
      }
      if (sortOption === 'power-desc') {
        const getKW = (str) => parseFloat(str.replace(/[^0-9.]/g, ''));
        return getKW(b.capacityGroup) - getKW(a.capacityGroup);
      }
      if (sortOption === 'price-asc') {
        return a.priceVal - b.priceVal;
      }
      if (sortOption === 'price-desc') {
        return b.priceVal - a.priceVal;
      }
      if (sortOption === 'rating-desc') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [searchQuery, selectedTypes, selectedCapacities, selectedConnectors, selectedUsages, selectedPriceRanges, sortOption]);

  const activeFiltersCount = useMemo(() => {
    return selectedTypes.length + selectedCapacities.length + selectedConnectors.length + selectedUsages.length + selectedPriceRanges.length + (searchQuery ? 1 : 0);
  }, [selectedTypes, selectedCapacities, selectedConnectors, selectedUsages, selectedPriceRanges, searchQuery]);

  return (
    <div className="solutions-page-container min-h-screen bg-slate-50 relative pb-10">
      


      {/* HEADER SECTION (DARK GRADIENT WITH GLOW) */}
      <section className="w-full bg-[#402e32] pt-44 sm:pt-48 pb-16 px-6 text-center text-white border-b border-slate-800 relative">
        <div className="absolute inset-0 bg-gradient-radial from-[#F18321] to-transparent opacity-10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-white text-3xl sm:text-5xl font-extrabold font-montserrat">
            EV Charger <span className="text-[#F18321]">Rental Solutions</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
            Rent premium EV smart charging hardware for your commercial parking properties, residential societies, or fleet depots. Select and filter below to find your setup.
          </p>
        </div>
      </section>

      {/* CORE SOLUTIONS CATALOG SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* A. SIDEBAR FILTERS (DESKTOP) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm sticky top-32 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-slate-900 font-extrabold text-base flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-[#F18321]" /> Filters
              </h3>
              {activeFiltersCount > 0 && (
                <button 
                  onClick={handleClearAllFilters}
                  className="text-xs text-[#F18321] hover:underline font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* SEARCH BOX */}
            <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="Search Charger Models..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-xs text-slate-800 focus:outline-none focus:border-[#F18321] focus:ring-1 focus:ring-[#F18321] font-medium"
              />
              <Search className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-900"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* FILTER COLLAPSIBLE - PRODUCT TYPE */}
            <div className="border-b border-slate-100 pb-4 mb-4">
              <button 
                onClick={() => toggleFilterSection('type')}
                className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-900 mb-3"
              >
                <span>Product Type</span>
                {expandedFilterSections.type ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {expandedFilterSections.type && (
                <div className="flex flex-col gap-2.5 pl-1">
                  {[
                    { label: 'Portable Chargers', value: 'portable' },
                    { label: 'Smart AC Wallboxes', value: 'ac' },
                    { label: 'DC Fast Chargers', value: 'dc' }
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900 select-none">
                      <input 
                        type="checkbox" 
                        checked={selectedTypes.includes(opt.value)}
                        onChange={() => handleTypeCheck(opt.value)}
                        className="rounded border-slate-300 text-[#F18321] focus:ring-[#F18321]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* FILTER COLLAPSIBLE - CAPACITY */}
            <div className="border-b border-slate-100 pb-4 mb-4">
              <button 
                onClick={() => toggleFilterSection('capacity')}
                className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-900 mb-3"
              >
                <span>Charging Capacity</span>
                {expandedFilterSections.capacity ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {expandedFilterSections.capacity && (
                <div className="flex flex-col gap-2.5 pl-1">
                  {['3.3 kW', '7.4 kW', '11 kW', '22 kW', '30 kW', '60 kW', '120 kW', '240 kW'].map(cap => (
                    <label key={cap} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900 select-none">
                      <input 
                        type="checkbox" 
                        checked={selectedCapacities.includes(cap)}
                        onChange={() => handleCapacityCheck(cap)}
                        className="rounded border-slate-300 text-[#F18321] focus:ring-[#F18321]"
                      />
                      <span>{cap}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* FILTER COLLAPSIBLE - CONNECTOR */}
            <div className="border-b border-slate-100 pb-4 mb-4">
              <button 
                onClick={() => toggleFilterSection('connector')}
                className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-900 mb-3"
              >
                <span>Connector Type</span>
                {expandedFilterSections.connector ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {expandedFilterSections.connector && (
                <div className="flex flex-col gap-2.5 pl-1">
                  {['Type 2', 'CCS2 Single Gun', 'CCS2 Dual Gun'].map(conn => (
                    <label key={conn} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900 select-none">
                      <input 
                        type="checkbox" 
                        checked={selectedConnectors.includes(conn)}
                        onChange={() => handleConnectorCheck(conn)}
                        className="rounded border-slate-300 text-[#F18321] focus:ring-[#F18321]"
                      />
                      <span>{conn}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* FILTER COLLAPSIBLE - RECOMMEND USAGE */}
            <div className="border-b border-slate-100 pb-4 mb-4">
              <button 
                onClick={() => toggleFilterSection('usage')}
                className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-900 mb-3"
              >
                <span>Recommended Usage</span>
                {expandedFilterSections.usage ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {expandedFilterSections.usage && (
                <div className="flex flex-col gap-2.5 pl-1">
                  {[
                    { label: 'Home / Private Parking', value: 'home' },
                    { label: 'Commercial Properties', value: 'commercial' },
                    { label: 'Workplace & Offices', value: 'workplace' },
                    { label: 'Highway Plazas & Food Courts', value: 'highway' },
                    { label: 'Fleet & Logistics Depots', value: 'fleet' }
                  ].map(usage => (
                    <label key={usage.value} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900 select-none">
                      <input 
                        type="checkbox" 
                        checked={selectedUsages.includes(usage.value)}
                        onChange={() => handleUsageCheck(usage.value)}
                        className="rounded border-slate-300 text-[#F18321] focus:ring-[#F18321]"
                      />
                      <span>{usage.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* FILTER COLLAPSIBLE - PRICE */}
            <div className="pb-2">
              <button 
                onClick={() => toggleFilterSection('price')}
                className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-900 mb-3"
              >
                <span>Monthly Rent</span>
                {expandedFilterSections.price ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {expandedFilterSections.price && (
                <div className="flex flex-col gap-2.5 pl-1">
                  {[
                    { label: 'Under ₹5,000 / mo', value: 'low' },
                    { label: '₹5,000 - ₹20,000 / mo', value: 'med' },
                    { label: 'Above ₹20,000 / mo', value: 'high' }
                  ].map(range => (
                    <label key={range.value} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900 select-none">
                      <input 
                        type="checkbox" 
                        checked={selectedPriceRanges.includes(range.value)}
                        onChange={() => handlePriceCheck(range.value)}
                        className="rounded border-slate-300 text-[#F18321] focus:ring-[#F18321]"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

          </aside>

          {/* B. MAIN CONTENT DECK */}
          <main className="col-span-1 lg:col-span-9 flex flex-col gap-6">
            
            {/* CATALOG CONTROL HEADER BAR */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-slate-900 font-extrabold text-base tracking-tight block">
                  {filteredProducts.length} Matching Results
                </span>
                <span className="text-slate-400 text-xs font-medium">
                  Showing solutions tailored for your filters
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Mobile Filters Trigger */}
                <button 
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 border border-slate-200 hover:border-slate-800 text-slate-800 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-colors"
                >
                  <SlidersHorizontal size={14} /> Filters
                </button>

                {/* Sort selector */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs font-medium whitespace-nowrap hidden md:inline">Sort By:</span>
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#F18321] font-bold"
                  >
                    <option value="best-selling">Best-Selling</option>
                    <option value="power-desc">Power: High to Low</option>
                    <option value="power-asc">Power: Low to High</option>
                    <option value="price-desc">Rent: High to Low</option>
                    <option value="price-asc">Rent: Low to High</option>
                    <option value="rating-desc">Rating</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-[#F18321] text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700'}`}
                    title="Grid View"
                  >
                    <Grid size={16} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-[#F18321] text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700'}`}
                    title="List View"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* ACTIVE FILTERS TAGS */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 bg-slate-100/50 p-4 rounded-2xl border border-slate-100">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active Filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-[#F18321] bg-opacity-10 text-[#F18321] text-[10px] font-bold px-3 py-1 rounded-full border border-[#F18321] border-opacity-10">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-black p-0.5"><X size={10} /></button>
                  </span>
                )}
                {selectedTypes.map(t => (
                  <span key={t} className="inline-flex items-center gap-1 bg-[#F18321] bg-opacity-10 text-[#F18321] text-[10px] font-bold px-3 py-1 rounded-full border border-[#F18321] border-opacity-10">
                    Type: {t.toUpperCase()}
                    <button onClick={() => handleTypeCheck(t)} className="hover:text-black p-0.5"><X size={10} /></button>
                  </span>
                ))}
                {selectedCapacities.map(c => (
                  <span key={c} className="inline-flex items-center gap-1 bg-[#F18321] bg-opacity-10 text-[#F18321] text-[10px] font-bold px-3 py-1 rounded-full border border-[#F18321] border-opacity-10">
                    Power: {c}
                    <button onClick={() => handleCapacityCheck(c)} className="hover:text-black p-0.5"><X size={10} /></button>
                  </span>
                ))}
                {selectedConnectors.map(conn => (
                  <span key={conn} className="inline-flex items-center gap-1 bg-[#F18321] bg-opacity-10 text-[#F18321] text-[10px] font-bold px-3 py-1 rounded-full border border-[#F18321] border-opacity-10">
                    Connector: {conn}
                    <button onClick={() => handleConnectorCheck(conn)} className="hover:text-black p-0.5"><X size={10} /></button>
                  </span>
                ))}
                {selectedUsages.map(u => (
                  <span key={u} className="inline-flex items-center gap-1 bg-[#F18321] bg-opacity-10 text-[#F18321] text-[10px] font-bold px-3 py-1 rounded-full border border-[#F18321] border-opacity-10">
                    Usage: {u}
                    <button onClick={() => handleUsageCheck(u)} className="hover:text-black p-0.5"><X size={10} /></button>
                  </span>
                ))}
                {selectedPriceRanges.map(p => (
                  <span key={p} className="inline-flex items-center gap-1 bg-[#F18321] bg-opacity-10 text-[#F18321] text-[10px] font-bold px-3 py-1 rounded-full border border-[#F18321] border-opacity-10">
                    Rent: {p === 'low' ? 'Under ₹5k' : p === 'med' ? '₹5k-₹20k' : 'Above ₹20k'}
                    <button onClick={() => handlePriceCheck(p)} className="hover:text-black p-0.5"><X size={10} /></button>
                  </span>
                ))}
                <button 
                  onClick={handleClearAllFilters}
                  className="text-slate-400 hover:text-slate-800 text-[10px] font-bold hover:underline ml-auto"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* PRODUCT LISTINGS */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
                <SlidersHorizontal size={48} className="mx-auto text-slate-300 mb-4" />
                <h4 className="text-slate-800 font-extrabold text-lg mb-2">No Charging Solutions Found</h4>
                <p className="text-slate-500 text-xs max-w-sm mx-auto mb-6">
                  We couldn't find any charger model matching your specific filter set. Adjust your checkboxes or reset the search to try again.
                </p>
                <button 
                  onClick={handleClearAllFilters}
                  className="btn-premium-green px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-white shadow-glow-orange"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <motion.div 
                layout
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "flex flex-col gap-6"
                }
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(charger => {
                    const isWishlisted = wishlist.includes(charger.id);
                    const isCompared = comparedChargers.some(c => c.id === charger.id);
                    const isExpanded = expandedSpecs.includes(charger.id);

                    return (
                      <motion.div
                        layout
                        key={charger.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35 }}
                        className={`bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-[#F18321]/30 hover:shadow-premium-glass transition-all duration-300 flex ${viewMode === 'grid' ? 'flex-col justify-between' : 'flex-col md:flex-row gap-6 justify-between'}`}
                      >
                        <div className={`${viewMode === 'list' ? 'flex-1 grid grid-cols-1 md:grid-cols-12 gap-6' : ''}`}>
                          
                          {/* Image Box */}
                          <div className={`relative bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center p-4 group ${viewMode === 'grid' ? 'w-full h-48 mb-5' : 'md:col-span-3 h-48 md:h-full min-h-[160px]'}`}>
                            <img 
                              src={charger.image || (charger.type === 'dc' ? dcCharger : acCharger)} 
                              alt={charger.name} 
                              className="h-full max-h-[130px] object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                            
                            {/* Compare Checkbox */}
                            <label className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-white/95 px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-100 cursor-pointer select-none">
                              <input 
                                type="checkbox" 
                                checked={isCompared}
                                onChange={() => handleCompareCheck(charger)}
                                className="rounded border-slate-300 text-[#F18321] focus:ring-[#F18321] h-3.5 w-3.5"
                              />
                              <span className="text-[9px] text-slate-600 font-extrabold uppercase tracking-wide">Compare</span>
                            </label>

                            {/* Wishlist Heart */}
                            <button 
                              onClick={() => handleWishlistToggle(charger.id)}
                              className={`absolute top-3.5 right-3.5 p-2 rounded-full shadow-sm border border-slate-100 transition-colors ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/95 hover:bg-slate-50 text-slate-400'}`}
                              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                            >
                              <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
                            </button>
                          </div>

                          {/* Info Deck */}
                          <div className={`${viewMode === 'list' ? 'md:col-span-9 flex flex-col justify-between' : ''}`}>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className={`px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wider ${charger.type === 'portable' ? 'bg-purple-100 text-purple-700' : charger.type === 'ac' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {charger.type === 'portable' ? 'Portable' : charger.type === 'ac' ? 'AC Wallbox' : 'DC Fast'}
                              </span>
                              <span className="text-slate-400 text-[10px] font-bold font-mono">{charger.power}</span>
                            </div>

                            <h3 className="text-slate-900 font-black text-base sm:text-lg mb-1 leading-snug line-clamp-1 hover:text-[#F18321] transition-colors cursor-pointer" onClick={() => setSelectedDetailCharger(charger)}>
                              {charger.name}
                            </h3>

                            {/* Stars rating */}
                            <div className="flex items-center gap-1.5 mb-3">
                              <div className="flex text-[#F18321]">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={12} fill={i < Math.floor(charger.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(charger.rating) ? 0 : 2} />
                                ))}
                              </div>
                              <span className="text-slate-800 text-[11px] font-bold font-mono">{charger.rating}</span>
                              <span className="text-slate-400 text-[10px]">({charger.reviews} reviews)</span>
                            </div>

                            {/* Dynamic Inline Specs */}
                            <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100 text-[11px] font-mono space-y-1 text-slate-500 mb-4">
                              <div className="flex justify-between">
                                <span>Connector:</span>
                                <span className="text-slate-800 font-bold">{charger.connectorGroup}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Efficiency:</span>
                                <span className="text-slate-800 font-bold">{charger.efficiency}</span>
                              </div>
                              
                              {isExpanded && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="pt-2 border-t border-slate-200 mt-2 space-y-1.5"
                                >
                                  <div>
                                    <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Input Voltage:</span>
                                    <span className="text-slate-800 font-semibold block">{charger.voltage}</span>
                                  </div>
                                  <div>
                                    <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Features:</span>
                                    <span className="text-slate-800 leading-tight block">{charger.features.join(', ')}</span>
                                  </div>
                                  <div>
                                    <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Recommended Deployment:</span>
                                    <span className="text-slate-800 leading-tight block">{charger.usage}</span>
                                  </div>
                                </motion.div>
                              )}

                              <button 
                                onClick={() => toggleInlineSpecs(charger.id)}
                                className="w-full text-center text-[#F18321] hover:underline font-bold text-[10px] mt-1 pt-1 flex items-center justify-center gap-1 border-t border-dashed border-slate-200"
                              >
                                {isExpanded ? (
                                  <>See Less <ChevronUp size={10} /></>
                                ) : (
                                  <>See More Specs <ChevronDown size={10} /></>
                                )}
                              </button>
                            </div>
                          </div>

                        </div>

                        {/* Price & CTA Area */}
                        <div className={`border-t border-slate-100 pt-4 flex flex-col justify-end ${viewMode === 'grid' ? '' : 'md:border-t-0 md:pt-0 md:border-l md:pl-6 md:w-56 md:justify-center'}`}>
                          <div className="mb-4">
                            <span className="text-slate-400 text-[10px] uppercase block tracking-wider font-mono">Lease Rate</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-slate-900 text-xl font-black font-mono">{charger.priceStr.split('/')[0]}</span>
                              <span className="text-slate-400 text-[11px]">/ mo</span>
                            </div>
                            <span className="text-slate-400 text-[10px] block mt-0.5">Purchase price: {charger.purchasePrice}</span>
                          </div>

                          <button 
                            onClick={() => setSelectedDetailCharger(charger)}
                            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#F18321] to-[#832800] text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-glow-orange"
                          >
                            Learn More <ArrowRight size={12} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}

            {/* RESULTS FOOTER */}
            {filteredProducts.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-3xl p-5 text-center shadow-sm">
                <span className="text-slate-600 text-xs font-mono">
                  Showing 1 - {filteredProducts.length} of {filteredProducts.length} Results
                </span>
              </div>
            )}

          </main>

        </div>
      </section>

      {/* 2. SIDE-BY-SIDE PRODUCT COMPARE DRAWER & MODAL */}
      <AnimatePresence>
        {comparedChargers.length >= 2 && (
          <motion.div 
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-8px_32px_rgba(0,0,0,0.08)] z-40 p-4"
          >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-amber-100 text-[#F18321] p-2.5 rounded-xl border border-amber-200">
                  <Info size={20} />
                </div>
                <div>
                  <h4 className="text-slate-900 font-extrabold text-sm sm:text-base leading-none">Compare Charger Models</h4>
                  <span className="text-slate-400 text-xs font-medium block mt-1">You have selected {comparedChargers.length} models for specification comparison</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {comparedChargers.map(c => (
                    <div key={c.id} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-slate-800 font-bold shrink-0">
                      {c.name.split(' ').slice(1, 4).join(' ')}
                      <button onClick={() => handleCompareCheck(c)} className="text-slate-400 hover:text-black"><X size={12} /></button>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setShowCompareModal(true)}
                  className="bg-[#F18321] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#832800] transition-colors ml-auto sm:ml-0"
                >
                  Compare Now
                </button>
                <button 
                  onClick={() => setComparedChargers([])}
                  className="text-slate-400 hover:text-slate-950 font-bold text-xs"
                >
                  Clear
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY: COMPARE DIALOG TABLE */}
      <AnimatePresence>
        {showCompareModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="bg-white rounded-3xl border border-slate-200 max-w-4xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                <h3 className="text-slate-900 font-extrabold text-lg sm:text-xl font-montserrat flex items-center gap-2">
                  <SlidersHorizontal size={22} className="text-[#F18321]" /> Side-by-Side Comparison
                </h3>
                <button onClick={() => setShowCompareModal(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 p-2 rounded-xl transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <th className="p-4 font-extrabold text-slate-400 uppercase tracking-wider font-mono text-[10px]">Specifications</th>
                      {comparedChargers.map(c => (
                        <th key={c.id} className="p-4 font-black text-slate-800 border-l border-slate-200 min-w-[180px]">
                          {c.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-xs text-slate-600">
                    <tr>
                      <td className="p-4 font-sans text-slate-900 font-bold">Category</td>
                      {comparedChargers.map(c => (
                        <td key={c.id} className="p-4 border-l border-slate-200 capitalize font-bold text-slate-800">{c.type}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-sans text-slate-900 font-bold">Capacity</td>
                      {comparedChargers.map(c => (
                        <td key={c.id} className="p-4 border-l border-slate-200 font-bold text-[#F18321]">{c.capacityGroup}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-sans text-slate-900 font-bold">Input Voltage</td>
                      {comparedChargers.map(c => (
                        <td key={c.id} className="p-4 border-l border-slate-200">{c.voltage}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-sans text-slate-900 font-bold">Connector Port</td>
                      {comparedChargers.map(c => (
                        <td key={c.id} className="p-4 border-l border-slate-200">{c.connector}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-sans text-slate-900 font-bold">Efficiency</td>
                      {comparedChargers.map(c => (
                        <td key={c.id} className="p-4 border-l border-slate-200">{c.efficiency}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-sans text-slate-900 font-bold">Lease Rental Rate</td>
                      {comparedChargers.map(c => (
                        <td key={c.id} className="p-4 border-l border-slate-200 font-bold text-slate-900">{c.priceStr}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-sans text-slate-900 font-bold">Recommended For</td>
                      {comparedChargers.map(c => (
                        <td key={c.id} className="p-4 border-l border-slate-200 font-sans text-slate-500 leading-normal">{c.usage}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-sans text-slate-900 font-bold">Key Integrations</td>
                      {comparedChargers.map(c => (
                        <td key={c.id} className="p-4 border-l border-slate-200">
                          <ul className="list-disc list-inside space-y-1 font-sans text-[11px] leading-relaxed">
                            {c.features.map((f, idx) => <li key={idx}>{f}</li>)}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  onClick={() => {
                    setShowCompareModal(false);
                    setComparedChargers([]);
                  }}
                  className="px-5 py-2.5 border border-slate-200 hover:border-slate-800 text-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Clear Selection
                </button>
                <button 
                  onClick={() => setShowCompareModal(false)}
                  className="bg-[#F18321] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#832800] transition-colors"
                >
                  Close Comparison
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. DETAILS MODAL (SPECIFICATIONS & CONSULTATION) */}
      <AnimatePresence>
        {selectedDetailCharger && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                <span className="text-[#F18321] text-xs font-extrabold uppercase tracking-widest font-mono">Product Spec Sheet</span>
                <button onClick={() => {
                  setSelectedDetailCharger(null);
                  setFormSubmitted(false);
                }} className="bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 p-2 rounded-xl transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-6">
                {/* Left: Spec Table */}
                <div className="md:col-span-7">
                  <h3 className="text-slate-900 font-extrabold text-xl sm:text-2xl font-poppins mb-2">{selectedDetailCharger.name}</h3>
                  <div className="flex items-center gap-1.5 mb-5">
                    <div className="flex text-[#F18321]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(selectedDetailCharger.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(selectedDetailCharger.rating) ? 0 : 2} />
                      ))}
                    </div>
                    <span className="text-slate-800 font-bold text-xs">{selectedDetailCharger.rating} / 5</span>
                    <span className="text-slate-400 text-xs">({selectedDetailCharger.reviews} clients)</span>
                  </div>

                  <h5 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider mb-2 font-mono text-[#F18321]">Specifications</h5>
                  <div className="border border-slate-100 rounded-2xl overflow-hidden mb-6 text-xs font-mono bg-slate-50/50 p-4 space-y-2">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-400">Power Rating:</span>
                      <span className="text-slate-900 font-bold">{selectedDetailCharger.power}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-400">Input Voltage:</span>
                      <span className="text-slate-900 font-bold">{selectedDetailCharger.voltage}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-400">Connector Port:</span>
                      <span className="text-slate-900 font-bold">{selectedDetailCharger.connector}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-400">Efficiency:</span>
                      <span className="text-slate-900 font-bold">{selectedDetailCharger.efficiency}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-slate-400">Lease Rate:</span>
                      <span className="text-slate-900 font-bold">{selectedDetailCharger.priceStr}</span>
                    </div>
                  </div>

                  <h5 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider mb-2 font-mono text-[#F18321]">Key Features</h5>
                  <ul className="flex flex-col gap-2 text-xs text-slate-600 list-disc list-inside">
                    {selectedDetailCharger.features.map((feat, index) => (
                      <li key={index} className="leading-relaxed">
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Booking Form */}
                <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 text-slate-900 relative">
                  {formSubmitted ? (
                    <div className="absolute inset-0 bg-white/95 rounded-3xl flex flex-col items-center justify-center text-center p-4">
                      <div className="w-12 h-12 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                        <Check size={24} />
                      </div>
                      <h4 className="text-slate-900 font-extrabold text-sm mb-1">Inquiry Submitted!</h4>
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        Our technical installation team will reach back in 24 hours.
                      </p>
                    </div>
                  ) : null}

                  <h4 className="text-slate-900 font-extrabold text-sm mb-1.5">Request Consultation</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed mb-4">
                    Send inquiry for site valuation details, grids connection limits and rental calculations.
                  </p>

                  <form onSubmit={handleInquirySubmit} className="flex flex-col gap-3">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Your Name *"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#F18321] font-medium"
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="Phone Number *"
                        required
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#F18321] font-medium"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Email Address"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#F18321] font-medium"
                      />
                    </div>
                    <div>
                      <textarea 
                        rows="3" 
                        placeholder="Installation details / Message"
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#F18321] font-medium resize-none"
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-[#F18321] hover:bg-[#832800] text-white font-extrabold text-[11px] uppercase tracking-wider py-2.5 rounded-xl transition-all duration-300 shadow-sm"
                    >
                      Submit Request
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MOBILE SLIDE-IN FILTERS PANEL */}
      <AnimatePresence>
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm"
            />
            
            {/* Filter Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="relative w-80 max-w-[90%] h-full bg-white shadow-xl flex flex-col p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <h3 className="text-slate-900 font-extrabold text-base flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-[#F18321]" /> Filters
                </h3>
                <button onClick={() => setShowMobileFilters(false)} className="text-slate-400 hover:text-slate-900 p-1">
                  <X size={18} />
                </button>
              </div>

              {/* SEARCH BOX */}
              <div className="relative mb-5">
                <input 
                  type="text" 
                  placeholder="Search Charger Models..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-xs text-slate-800 focus:outline-none"
                />
                <Search className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
              </div>

              {/* Filter List (Duplicated for mobile view) */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {/* PRODUCT TYPE */}
                <div className="border-b border-slate-100 pb-3">
                  <span className="block font-bold text-xs uppercase tracking-wider text-slate-900 mb-2">Product Type</span>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'Portable Chargers', value: 'portable' },
                      { label: 'Smart AC Wallboxes', value: 'ac' },
                      { label: 'DC Fast Chargers', value: 'dc' }
                    ].map(opt => (
                      <label key={opt.value} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedTypes.includes(opt.value)}
                          onChange={() => handleTypeCheck(opt.value)}
                          className="rounded border-slate-300 text-[#F18321]"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CAPACITY */}
                <div className="border-b border-slate-100 pb-3">
                  <span className="block font-bold text-xs uppercase tracking-wider text-slate-900 mb-2">Capacity</span>
                  <div className="flex flex-col gap-2">
                    {['3.3 kW', '7.4 kW', '11 kW', '22 kW', '30 kW', '60 kW', '120 kW', '240 kW'].map(cap => (
                      <label key={cap} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedCapacities.includes(cap)}
                          onChange={() => handleCapacityCheck(cap)}
                          className="rounded border-slate-300 text-[#F18321]"
                        />
                        <span>{cap}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CONNECTOR */}
                <div className="border-b border-slate-100 pb-3">
                  <span className="block font-bold text-xs uppercase tracking-wider text-slate-900 mb-2">Connector</span>
                  <div className="flex flex-col gap-2">
                    {['Type 2', 'CCS2 Single Gun', 'CCS2 Dual Gun'].map(conn => (
                      <label key={conn} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedConnectors.includes(conn)}
                          onChange={() => handleConnectorCheck(conn)}
                          className="rounded border-slate-300 text-[#F18321]"
                        />
                        <span>{conn}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* USAGE */}
                <div className="border-b border-slate-100 pb-3">
                  <span className="block font-bold text-xs uppercase tracking-wider text-slate-900 mb-2">Usage</span>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'Home / Private Parking', value: 'home' },
                      { label: 'Commercial Properties', value: 'commercial' },
                      { label: 'Workplace & Offices', value: 'workplace' },
                      { label: 'Highway Plazas & Food Courts', value: 'highway' },
                      { label: 'Fleet & Logistics Depots', value: 'fleet' }
                    ].map(usage => (
                      <label key={usage.value} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedUsages.includes(usage.value)}
                          onChange={() => handleUsageCheck(usage.value)}
                          className="rounded border-slate-300 text-[#F18321]"
                        />
                        <span>{usage.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* PRICE */}
                <div className="pb-2">
                  <span className="block font-bold text-xs uppercase tracking-wider text-slate-900 mb-2">Monthly Rent</span>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'Under ₹5,000 / mo', value: 'low' },
                      { label: '₹5,000 - ₹20,000 / mo', value: 'med' },
                      { label: 'Above ₹20,000 / mo', value: 'high' }
                    ].map(range => (
                      <label key={range.value} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedPriceRanges.includes(range.value)}
                          onChange={() => handlePriceCheck(range.value)}
                          className="rounded border-slate-300 text-[#F18321]"
                        />
                        <span>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex gap-3 mt-4">
                <button 
                  onClick={() => {
                    handleClearAllFilters();
                    setShowMobileFilters(false);
                  }}
                  className="flex-1 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-colors text-center"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 bg-[#F18321] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl hover:bg-[#832800] transition-colors text-center"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ROADMAP SECTION (PROCESS ROADMAP) */}
      <section className="py-24 px-6 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-slate-900 text-3xl font-extrabold">Installation Roadmap to Launch</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
              We guide you from property evaluation to full commissioning and digital deployment launch.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <span className="text-[#F18321] font-bold text-2xl mb-3 block">01. Site Survey</span>
              <h4 className="text-slate-900 font-extrabold text-sm mb-2">Feasibility Audit</h4>
              <p className="text-slate-600 text-xs leading-relaxed">MNIL field engineers conduct structural assessments and electrical check audits.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <span className="text-[#F18321] font-bold text-2xl mb-3 block">02. Design Approval</span>
              <h4 className="text-slate-900 font-extrabold text-sm mb-2">Technical Blueprint</h4>
              <p className="text-slate-600 text-xs leading-relaxed">We outline optimal charger configurations, cabling metrics, and safety isolators.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <span className="text-[#F18321] font-bold text-2xl mb-3 block">03. Deployment</span>
              <h4 className="text-slate-900 font-extrabold text-sm mb-2">Civil Works & Mounts</h4>
              <p className="text-slate-600 text-xs leading-relaxed">We pour structural base blocks, install couplers, and wire the terminals safely.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <span className="text-[#F18321] font-bold text-2xl mb-3 block">04. Telemetry Sync</span>
              <h4 className="text-slate-900 font-extrabold text-sm mb-2">Live Cloud Config</h4>
              <p className="text-slate-600 text-xs leading-relaxed">We map the terminal to public directories and connect cloud OCPP billing grids.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS FAQs */}
      <section className="max-w-4xl mx-auto py-24 px-6">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-slate-900 text-3xl font-extrabold">Deployment & Installation FAQs</h2>
        </motion.div>

        <div className="flex flex-col gap-5">
          {FAQS_LIST.map((faq, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ scale: 1.01 }}
              className="faq-item rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => setFaqIndex(faqIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
              >
                <span className="text-slate-700 font-medium text-sm sm:text-base">{faq.q}</span>
                <span className="text-[#F18321] text-xl font-bold">
                  {faqIndex === idx ? '−' : '+'}
                </span>
              </button>
              
              <div 
                className={`faq-answer-container transition-all duration-300 ease-in-out ${faqIndex === idx ? 'max-h-[300px] border-t border-slate-100 p-6' : 'max-h-0'}`}
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

      {/* REUSABLE TWO COLUMN CONTACT FORM */}
      <ContactForm />

    </div>
  );
};

export default Solutions;
