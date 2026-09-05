/**
 * ==========================================
 * MEGACHARGE MASTER PRODUCTS & HUBS DATASET
 * ==========================================
 */

import zenergize60 from '../assets/zenergize_60.jpg';
import zenergize120 from '../assets/zenergize_120.jpg';
import zenergize240 from '../assets/zenergize_240.jpg';
import acCharger from '../assets/ac_charger.png';
import acChargerReal from '../assets/ac_charger_real.png';
import dcCharger from '../assets/dc_charger.png';
import teslaCharging from '../assets/tesla_charging.jpg';
import chargingCars from '../assets/charging_station_cars.jpg';
import bannerImg from '../assets/megacharge_banner.png';

export const ALL_PRODUCTS = [
  /* ===================================================
     1. HUB & CO-OWNERSHIP SITES (From User Template)
     =================================================== */
  {
    id: 'nh44-panipat',
    type: 'hub',
    name: 'NH-44 Panipat Hub',
    heroTitle: 'NH-44 Panipat Hub',
    badge: 'DC FAST HUB',
    kw: '2 × 60 kW',
    tagline: 'Own a share of a working highway charging hub. MegaCharge builds it, runs it and pays out the charging revenue every month.',
    tags: ['LIVE & CHARGING', 'CO-OWNERSHIP'],
    status: 'Live & Charging',
    location: 'Panipat, Haryana (NH-44 Southbound)',
    hardware: '2 × Zenergize 60 kW Dual CCS2',
    liveSince: 'Feb 2026',
    tariff: '₹11.00 / unit',
    omTerm: '5 years, MNIL maintained',
    minTicket: '₹10,000',
    fundedAmount: '₹9.40 L',
    targetAmount: '₹14.90 L',
    fundedPct: 63,
    daysLeft: '11 DAYS LEFT',
    coOwners: 18,
    uptime: '97.4%',
    unitCount: '2 × 60 kW Dual Gun',
    power: '120 kW Combined DC Fast',
    voltage: '415V AC Three Phase Grid',
    connector: 'Dual CCS2 Guns (4 Guns Total)',
    efficiency: '96.5%',
    hubCost: 1490000,
    costBreakdown: [
      { item: '2 × 60 kW DC charger', cost: '₹11,79,980' },
      { item: 'Civil, cabling, canopy', cost: '₹2,10,020' },
      { item: 'Signage & commissioning', cost: '₹1,00,000' }
    ],
    offers: [
      { title: '5% deployment bonus', desc: 'On commitments above ₹5,00,000' },
      { title: 'Zero platform fee', desc: 'For the first 25 co-owners at this site' },
      { title: 'Payouts by the 7th', desc: 'Credited to your bank every month' },
      { title: 'Build it monthly', desc: 'Add to your share from ₹10,000 a month' }
    ],
    gallery: [
      { src: zenergize60, cap: 'NH-44 SOUTHBOUND · GUN A LIVE · FEB 2026', label: '01' },
      { src: chargingCars, cap: 'APPROACH FROM THE SERVICE ROAD', label: '02' },
      { src: dcCharger, cap: '7-INCH SCREEN · UPI AND RFID BILLING', label: '03' },
      { src: teslaCharging, cap: 'TRANSFORMER YARD AND LT PANEL', label: '+9' }
    ],
    bandImage: bannerImg,
    bandTitle: 'Built, energised and running since February',
    bandDesc: 'Transformer sanctioned, LT panel commissioned, both guns on the OCPP network. You are buying into a site that already sells units.',
    returns: [
      { yr: '2Y', gain: '+26%', baseH: 64, retH: 81 },
      { yr: '3Y', gain: '+44%', baseH: 64, retH: 106 },
      { yr: '4Y', gain: '+63%', baseH: 64, retH: 137 },
      { yr: '5Y', gain: '+82%', baseH: 64, retH: 168 }
    ],
    chips: [50000, 100000, 250000, 500000],
    reviews: [
      {
        stars: 5,
        quote: 'Bought into the Panipat hub during launch. Payout has landed on the 7th every single month, and being able to see the actual kWh dispensed is what sold me on it.',
        author: 'Rohit Khanna',
        sub: 'Agra-NCR Highway Corridor · 14 months'
      },
      {
        stars: 5,
        quote: 'I wanted infrastructure exposure without buying a whole charger. Started at ₹25,000 and added monthly. The LLP filings were handled without me chasing anyone.',
        author: 'Sneha Mehra',
        sub: 'Kurukshetra AC Cluster · 9 months'
      },
      {
        stars: 4,
        quote: 'Exited half my units in March to free up cash. Money was in the account in five days. High uptime and transparent billing through the OCPP dashboard.',
        author: 'Arjun Verma',
        sub: 'Rae Bareli Depot · 18 months'
      }
    ],
    relatedIds: ['agra-expressway', 'kurukshetra-cluster', 'raebareli-depot']
  },

  {
    id: 'agra-expressway',
    type: 'hub',
    name: 'Agra Expressway Hub',
    heroTitle: 'Agra Expressway Hub',
    badge: 'DC FAST HUB',
    kw: '180 kW · 3 guns',
    tagline: 'Strategic intercity EV charging terminal on the high-density Yamuna & Agra Expressway corridor with restaurant amenity.',
    tags: ['HIGHWAY ULTRA', 'HIGH FOOTFALL'],
    status: 'Live & Charging',
    location: 'Agra Expressway Km 84, Uttar Pradesh',
    hardware: '1 × 120 kW Dual CCS2 + 1 × 60 kW Single Gun',
    liveSince: 'Nov 2025',
    tariff: '₹12.50 / unit',
    omTerm: '5 years, MNIL maintained',
    minTicket: '₹10,000',
    fundedAmount: '₹19.30 L',
    targetAmount: '₹22.00 L',
    fundedPct: 88,
    daysLeft: '4 DAYS LEFT',
    coOwners: 34,
    uptime: '98.1%',
    unitCount: '3 High-Power Fast Guns',
    power: '180 kW Total Fast Charging',
    voltage: '415V HT Dedicated Transformer',
    connector: 'Triple CCS2 Liquid-Cooled Guns',
    efficiency: '97%',
    hubCost: 2200000,
    costBreakdown: [
      { item: '180 kW DC Ultra Charger Setup', cost: '₹16,50,000' },
      { item: 'HT Transformer & Civil Canopy', cost: '₹3,80,000' },
      { item: 'Signage, CCTV & Lighting', cost: '₹1,70,000' }
    ],
    offers: [
      { title: 'Fast Payback Yield', desc: 'Highest vehicular throughput in the northern grid' },
      { title: '88% Already Funded', desc: 'Final co-owner tranche closing this weekend' },
      { title: 'Direct Bank NEFT', desc: 'Payouts deposited every 5th of the month' }
    ],
    gallery: [
      { src: zenergize120, cap: 'AGRA EXPRESSWAY REST STOP BAY · 180 kW ULTRA', label: '01' },
      { src: chargingCars, cap: 'HEAVY WEEKEND HIGHWAY EV COMMUTE', label: '02' },
      { src: dcCharger, cap: 'DUAL CCS2 HEAVY-DUTY CHARGER TERMINALS', label: '03' },
      { src: bannerImg, cap: 'NIGHT ILLUMINATION & SURVEILLANCE', label: '+6' }
    ],
    bandImage: chargingCars,
    bandTitle: 'Prime Golden Quadrilateral Highway Location',
    bandDesc: 'Over 4,500 daily vehicles pass this plaza. Fast 20-minute turnaround times guarantee steady high session volume.',
    returns: [
      { yr: '2Y', gain: '+30%', baseH: 64, retH: 84 },
      { yr: '3Y', gain: '+52%', baseH: 64, retH: 112 },
      { yr: '4Y', gain: '+74%', baseH: 64, retH: 144 },
      { yr: '5Y', gain: '+96%', baseH: 64, retH: 182 }
    ],
    chips: [50000, 100000, 250000, 500000],
    reviews: [
      {
        stars: 5,
        quote: 'Agra hub has delivered beyond projections. Throughput on weekends exceeds 180 kWh daily per gun.',
        author: 'Vikramaditya S.',
        sub: 'Expressway Partner · 11 months'
      }
    ],
    relatedIds: ['nh44-panipat', 'dc120', 'raebareli-depot']
  },

  {
    id: 'kurukshetra-cluster',
    type: 'hub',
    name: 'Kurukshetra Cluster',
    heroTitle: 'Kurukshetra AC Cluster',
    badge: 'AC CLUSTER',
    kw: '4 × 7.4 kW',
    tagline: 'High-density commercial hotel & retail complex charging cluster catering to tourists, day-trippers and hospitality guests.',
    tags: ['AC SMART', 'COMMERCIAL HUB'],
    status: 'Live & Charging',
    location: 'Kurukshetra Heritage Hotel Strip, Haryana',
    hardware: '4 × MegaCharge 7.4 kW Smart AC Units',
    liveSince: 'Dec 2025',
    tariff: '₹9.50 / unit',
    omTerm: '3 years, MNIL maintained',
    minTicket: '₹10,000',
    fundedAmount: '₹3.28 L',
    targetAmount: '₹8.00 L',
    fundedPct: 41,
    daysLeft: '19 DAYS LEFT',
    coOwners: 12,
    uptime: '99.0%',
    unitCount: '4 Dedicated AC Parking Bays',
    power: '29.6 kW Total Grid Output',
    voltage: '230V / 415V Commercial Grid',
    connector: 'Type 2 Universal Connectors',
    efficiency: '97.5%',
    hubCost: 800000,
    costBreakdown: [
      { item: '4 × Smart AC Wallbox Chargers', cost: '₹4,80,000' },
      { item: 'Dedicated EV Submeter & Wiring', cost: '₹1,90,000' },
      { item: 'Custom Bay Marking & Stencils', cost: '₹1,30,000' }
    ],
    offers: [
      { title: 'Zero Maintenance Liability', desc: '100% replacement warranty covered by MNIL' },
      { title: 'Predictable Overnight Dwell', desc: 'Hotel guests stay 8-12 hours per session' }
    ],
    gallery: [
      { src: acChargerReal, cap: 'HOTEL PORTE-COCHERE PARKING CLUSTER', label: '01' },
      { src: acCharger, cap: 'TYPE 2 SMART RFID ACCESS POINT', label: '02' },
      { src: bannerImg, cap: 'BAY MARKING AND LIGHTING', label: '03' }
    ],
    bandImage: bannerImg,
    bandTitle: 'Perfect for Destination & Hospitality Stays',
    bandDesc: 'Hotel guests plug in overnight and wake up to 100% full battery. Seamless QR code app billing.',
    returns: [
      { yr: '2Y', gain: '+22%', baseH: 64, retH: 78 },
      { yr: '3Y', gain: '+38%', baseH: 64, retH: 98 },
      { yr: '4Y', gain: '+54%', baseH: 64, retH: 122 },
      { yr: '5Y', gain: '+70%', baseH: 64, retH: 150 }
    ],
    chips: [25000, 50000, 100000, 200000],
    reviews: [
      {
        stars: 5,
        quote: 'Extremely clean execution. As a hotel partner, our guests love the seamless charging experience.',
        author: 'Harpreet Singh',
        sub: 'Hotelier & Co-owner · 6 months'
      }
    ],
    relatedIds: ['nh44-panipat', 'ac7', 'ac22']
  },

  {
    id: 'raebareli-depot',
    type: 'hub',
    name: 'Rae Bareli Depot',
    heroTitle: 'Rae Bareli Fleet Depot',
    badge: 'FLEET DEPOT',
    kw: '6 × 30 kW',
    tagline: 'Dedicated commercial logistics & delivery fleet depot with scheduled night charging bays and peak turnaround efficiency.',
    tags: ['FLEET DEDICATED', 'B2B CONTRACT'],
    status: 'Live & Charging',
    location: 'Industrial Estate Phase 2, Rae Bareli, UP',
    hardware: '6 × MegaCharge 30 kW DC Compact Rapid',
    liveSince: 'Jan 2026',
    tariff: '₹10.50 / unit',
    omTerm: '5 years institutional lease',
    minTicket: '₹10,000',
    fundedAmount: '₹18.00 L',
    targetAmount: '₹25.00 L',
    fundedPct: 72,
    daysLeft: '8 DAYS LEFT',
    coOwners: 26,
    uptime: '96.8%',
    unitCount: '6 Fleet Charging Terminals',
    power: '180 kW Heavy Fleet Grid',
    voltage: '415V Three Phase Industrial',
    connector: 'CCS2 High Cycle Guns',
    efficiency: '95.5%',
    hubCost: 2500000,
    costBreakdown: [
      { item: '6 × 30 kW DC Compact Units', cost: '₹18,00,000' },
      { item: 'Industrial Yard Concrete & Plinths', cost: '₹4,50,000' },
      { item: 'Heavy Fire Safety & Security Kit', cost: '₹2,50,000' }
    ],
    offers: [
      { title: 'Guaranteed Fleet Utilization', desc: 'Anchor commercial EV fleet contract signed' },
      { title: 'Daily Fixed Shift Cycles', desc: 'Predictable 3-shift day & night charging' }
    ],
    gallery: [
      { src: dcCharger, cap: 'COMMERCIAL FLEET BAY DOCKING LANES', label: '01' },
      { src: zenergize60, cap: '30 kW DUAL GUN RECTIFIER RACKS', label: '02' },
      { src: chargingCars, cap: 'COMMERCIAL FLEET VEHICLES AT DAWN', label: '03' }
    ],
    bandImage: chargingCars,
    bandTitle: 'Commercial B2B Fleet Mobility Backbone',
    bandDesc: 'Serving last-mile delivery 3-wheelers and commercial 4-wheeler vans on a guaranteed monthly kWh contract.',
    returns: [
      { yr: '2Y', gain: '+28%', baseH: 64, retH: 82 },
      { yr: '3Y', gain: '+48%', baseH: 64, retH: 108 },
      { yr: '4Y', gain: '+68%', baseH: 64, retH: 138 },
      { yr: '5Y', gain: '+88%', baseH: 64, retH: 172 }
    ],
    chips: [50000, 100000, 250000, 500000],
    reviews: [
      {
        stars: 5,
        quote: 'Fleet charging offers unbeatable predictability. Zero vacancy risk because the vans have to recharge daily.',
        author: 'Manoj Bajpayee',
        sub: 'Logistics Investor · 12 months'
      }
    ],
    relatedIds: ['dc30', 'nh44-panipat', 'agra-expressway']
  },

  /* ===================================================
     2. HARDWARE CHARGERS DATASET (Full Details)
     =================================================== */
  {
    id: 'dc60',
    type: 'dc',
    name: 'MegaCharge 60 kW Dual Gun DC Fast Charger',
    heroTitle: 'Zenergize 60 kW Dual Gun DC',
    badge: 'HIGHWAY STANDARD',
    kw: '60 kW Dual CCS2',
    tagline: 'High-speed dual gun DC fast charger with intelligent load distribution, OCPP 1.6 cloud telemetry, and 24x7 remote uptime support.',
    tags: ['OCPP 1.6 CLOUD', 'HIGH SPEED DC'],
    status: 'In Production & Shipping',
    location: 'Highway Plazas, Malls, Fleet Hubs',
    hardware: 'Zenergize 60 kW Rectifier System',
    liveSince: 'Continuous Grid Standard',
    tariff: '₹18,990 / month lease',
    omTerm: '5 Years Comprehensive MNIL Care',
    minTicket: '₹18,990/mo',
    fundedAmount: '₹5.89 L',
    targetAmount: '₹5.89 L',
    fundedPct: 100,
    daysLeft: 'READY TO SHIP',
    coOwners: 140,
    uptime: '99.2%',
    unitCount: 'Dual CCS2 Ports',
    power: '60 kW (30kW+30kW or 60kW Single)',
    voltage: '415V AC ± 10% Three Phase',
    connector: 'Dual CCS2 Guns with 5m Cable',
    efficiency: '96%',
    purchasePrice: '₹5,89,990',
    hubCost: 589990,
    costBreakdown: [
      { item: '60 kW DC Fast Hardware', cost: '₹4,40,000' },
      { item: 'OCPP 1.6 Billing & Modem Kit', cost: '₹60,000' },
      { item: 'Dual CCS2 5m Cable & Guns', cost: '₹89,990' }
    ],
    offers: [
      { title: 'Zero Setup Hassle', desc: 'Free site survey & electrical topology design' },
      { title: 'Dynamic Load Sharing', desc: 'Automatically splits 60 kW when two cars plug in' }
    ],
    gallery: [
      { src: zenergize60, cap: 'ZENERGIZE 60 kW DC FAST CHARGER ENCLOSURE', label: '01' },
      { src: dcCharger, cap: '7-INCH SUNLIGHT-READABLE LCD TOUCH PANEL', label: '02' },
      { src: teslaCharging, cap: 'FAST CHARGING SESSIONS WITH DUAL GUNS', label: '03' }
    ],
    bandImage: bannerImg,
    bandTitle: 'Proven Highway Corridor Performance',
    bandDesc: 'Installed across 120+ commercial plazas in India. Reliable power dispensation even under extreme 48°C Indian summers.',
    returns: [
      { yr: '2Y', gain: '+32%', baseH: 64, retH: 86 },
      { yr: '3Y', gain: '+56%', baseH: 64, retH: 114 },
      { yr: '4Y', gain: '+78%', baseH: 64, retH: 146 },
      { yr: '5Y', gain: '+102%', baseH: 64, retH: 190 }
    ],
    chips: [18990, 37980, 75960, 150000],
    reviews: [
      {
        stars: 5,
        quote: 'Installed this 60 kW unit at our highway hotel. Customers love charging in 35 minutes while having food.',
        author: 'Sunil Choudhary',
        sub: 'Murthal Highway Plaza · 15 months'
      }
    ],
    relatedIds: ['dc120', 'dc240', 'nh44-panipat']
  },

  {
    id: 'dc120',
    type: 'dc',
    name: 'MegaCharge 120 kW High-Power DC Charger',
    heroTitle: 'Zenergize 120 kW High-Power DC',
    badge: 'EXPWAY CHARGER',
    kw: '120 kW High-Power',
    tagline: 'Liquid-cooled dual gun DC charger capable of adding 250+ km of driving range in under 20 minutes.',
    tags: ['ULTRA RAPID', 'LIQUID COOLED'],
    status: 'In Production',
    location: 'Expressways, Fleet Depots, Transit Centers',
    hardware: 'Dual Liquid-Cooled Power Module',
    liveSince: 'Commercial Standard',
    tariff: '₹29,990 / month lease',
    omTerm: '5 Years Comprehensive Care',
    minTicket: '₹29,990/mo',
    fundedAmount: '₹11.49 L',
    targetAmount: '₹11.49 L',
    fundedPct: 100,
    daysLeft: 'SHIPS IN 7 DAYS',
    coOwners: 65,
    uptime: '99.4%',
    unitCount: 'Dual CCS2 Liquid Guns',
    power: '120 kW Ultra Rapid',
    voltage: '415V AC Three Phase LT/HT',
    connector: 'Dual CCS2 High-Current Couplers',
    efficiency: '96.5%',
    purchasePrice: '₹11,49,990',
    hubCost: 1149990,
    costBreakdown: [
      { item: '120 kW Power Converter Unit', cost: '₹8,50,000' },
      { item: 'Liquid Coolant Management System', cost: '₹1,50,000' },
      { item: 'Heavy Couplers & Protection Gear', cost: '₹1,49,990' }
    ],
    offers: [
      { title: 'Sub-20 Min Fast Top-Up', desc: 'Ideal for modern 800V and 400V EV battery architectures' },
      { title: 'Automated Revenue Telemetry', desc: 'Instant UPI billing synced to your mobile bank app' }
    ],
    gallery: [
      { src: zenergize120, cap: 'ZENERGIZE 120 kW ULTRA RAPID CHARGER', label: '01' },
      { src: chargingCars, cap: 'SIMULTANEOUS CHARGING OF TWO EV SUVS', label: '02' },
      { src: dcCharger, cap: 'MODULAR POWER CABINET ARCHITECTURE', label: '03' }
    ],
    bandImage: chargingCars,
    bandTitle: 'Designed for High-Turnaround Corridors',
    bandDesc: 'Handles high traffic peaks effortlessly with active temperature throttling and surge suppression.',
    returns: [
      { yr: '2Y', gain: '+36%', baseH: 64, retH: 90 },
      { yr: '3Y', gain: '+60%', baseH: 64, retH: 122 },
      { yr: '4Y', gain: '+84%', baseH: 64, retH: 156 },
      { yr: '5Y', gain: '+110%', baseH: 64, retH: 200 }
    ],
    chips: [29990, 59980, 119960, 250000],
    reviews: [
      {
        stars: 5,
        quote: 'Unbeatable charging speed. EV owners actively seek out our location on plugshare because of the 120kW speed.',
        author: 'Naveen Jindal',
        sub: 'Rest Stop Operator · 8 months'
      }
    ],
    relatedIds: ['dc240', 'dc60', 'agra-expressway']
  },

  {
    id: 'dc240',
    type: 'dc',
    name: 'MegaCharge 240 kW Liquid-Cooled Hyper Charger',
    heroTitle: 'Zenergize 240 kW Hyper Charger',
    badge: 'HYPER SPEED',
    kw: '240 kW Hyper Power',
    tagline: 'The pinnacle of EV fast-charging technology. Delivers extreme power for heavy electric buses, logistics trucks, and luxury EVs.',
    tags: ['240 kW HYPER', 'BUS & FLEET COMPATIBLE'],
    status: 'Enterprise Order',
    location: 'Bus Terminals, Freight Corridors, Luxury Plazas',
    hardware: 'Dual Liquid Hyper Charging Column',
    liveSince: 'Enterprise Deployment',
    tariff: '₹54,990 / month lease',
    omTerm: '5 Years Priority SLA',
    minTicket: '₹54,990/mo',
    fundedAmount: '₹19.49 L',
    targetAmount: '₹19.49 L',
    fundedPct: 100,
    daysLeft: 'SHIPS IN 14 DAYS',
    coOwners: 32,
    uptime: '99.8%',
    unitCount: 'Dual Liquid Hyper Guns',
    power: '240 kW Hyper DC',
    voltage: 'Dedicated HT Transformer 415V',
    connector: 'Dual CCS2 Liquid-Cooled 500A Couplers',
    efficiency: '96.8%',
    purchasePrice: '₹19,49,990',
    hubCost: 1949990,
    costBreakdown: [
      { item: '240 kW Liquid Power Substation', cost: '₹14,50,000' },
      { item: 'Active Liquid Chiller Unit', cost: '₹2,80,000' },
      { item: 'High-Amperage Cables & Isolators', cost: '₹2,19,990' }
    ],
    offers: [
      { title: 'Top Tier EV Charging', desc: 'Charges standard passenger EVs in 12-15 minutes' },
      { title: 'Dedicated Priority NOC', desc: 'Direct 24x7 monitoring hotline with 2-hour technician SLA' }
    ],
    gallery: [
      { src: zenergize240, cap: 'ZENERGIZE 240 kW ULTRA FAST HYPER TERMINAL', label: '01' },
      { src: dcCharger, cap: 'INTERNAL RECTIFIER AND COOLANT TANK', label: '02' },
      { src: teslaCharging, cap: 'HEAVY ELECTRIC TRUCK & CAR CHARGING', label: '03' }
    ],
    bandImage: bannerImg,
    bandTitle: 'Future-Proof Your EV Infrastructure',
    bandDesc: 'Built for the next generation of 800V EV batteries and heavy commercial fleet electrification.',
    returns: [
      { yr: '2Y', gain: '+40%', baseH: 64, retH: 94 },
      { yr: '3Y', gain: '+68%', baseH: 64, retH: 132 },
      { yr: '4Y', gain: '+94%', baseH: 64, retH: 172 },
      { yr: '5Y', gain: '+124%', baseH: 64, retH: 220 }
    ],
    chips: [54990, 109980, 219960, 500000],
    reviews: [
      {
        stars: 5,
        quote: 'Installed for our intercity electric bus fleet. Reliability has been 100% across thousands of charging hours.',
        author: 'Rameshwar Roy',
        sub: 'Transit Fleet Manager · 10 months'
      }
    ],
    relatedIds: ['dc120', 'dc60', 'raebareli-depot']
  },

  {
    id: 'dc30',
    type: 'dc',
    name: 'MegaCharge 30 kW DC Compact Rapid',
    heroTitle: 'MegaCharge 30 kW DC Compact',
    badge: 'COMPACT DC',
    kw: '30 kW Single CCS2',
    tagline: 'Cost-effective commercial DC fast charger tailored for urban shopping centers, car dealerships, and valet parking.',
    tags: ['COMPACT DC', 'URBAN COMMERCIAL'],
    status: 'In Stock',
    location: 'Offices, Hotels, Auto Dealerships, Valets',
    hardware: 'MegaCharge 30 kW Compact Cabinet',
    liveSince: 'Commercial Standard',
    tariff: '₹9,990 / month lease',
    omTerm: '3 to 5 Years Maintenance',
    minTicket: '₹9,990/mo',
    fundedAmount: '₹2.49 L',
    targetAmount: '₹2.49 L',
    fundedPct: 100,
    daysLeft: 'IN STOCK',
    coOwners: 89,
    uptime: '98.5%',
    unitCount: 'Single CCS2 Gun',
    power: '30 kW DC Rapid Output',
    voltage: '415V Three Phase AC',
    connector: 'CCS2 Single High-Efficiency Gun',
    efficiency: '95%',
    purchasePrice: '₹2,49,990',
    hubCost: 249990,
    costBreakdown: [
      { item: '30 kW DC Rapid Core Unit', cost: '₹1,90,000' },
      { item: 'Smart Telemetry & Display', cost: '₹30,000' },
      { item: 'CCS2 Cable & Mounting Kit', cost: '₹29,990' }
    ],
    offers: [
      { title: 'Low Power Requirement', desc: 'Operates on standard 30 kW commercial LT connection' },
      { title: 'Ideal for 1-Hour Dwell', desc: 'Charges an EV battery by 60% in one hour' }
    ],
    gallery: [
      { src: dcCharger, cap: 'COMPACT 30 kW DC FAST CHARGING CABINET', label: '01' },
      { src: zenergize60, cap: 'WEATHERPROOF POWDER-COATED SHELL', label: '02' }
    ],
    bandImage: chargingCars,
    bandTitle: 'The Urban DC Fast Charging Champion',
    bandDesc: 'Small footprint with fast DC turnaround. Easily mounted against walls or freestanding pedestals.',
    returns: [
      { yr: '2Y', gain: '+25%', baseH: 64, retH: 80 },
      { yr: '3Y', gain: '+42%', baseH: 64, retH: 104 },
      { yr: '4Y', gain: '+60%', baseH: 64, retH: 130 },
      { yr: '5Y', gain: '+78%', baseH: 64, retH: 160 }
    ],
    chips: [9990, 19980, 39960, 80000],
    reviews: [
      {
        stars: 5,
        quote: 'Perfect for our car dealership service bay. Fast charging without needing a massive transformer upgrade.',
        author: 'Anil Singhania',
        sub: 'Auto Dealership Owner · 9 months'
      }
    ],
    relatedIds: ['dc60', 'ac22', 'raebareli-depot']
  },

  {
    id: 'ac7',
    type: 'ac',
    name: 'MegaCharge 7.4 kW AC Smart Box',
    heroTitle: 'MegaCharge 7.4 kW AC Smart Box',
    badge: 'SMART AC WALLBOX',
    kw: '7.4 kW Single Phase',
    tagline: 'Sleek, intelligent AC wallbox with Wi-Fi, Bluetooth, RFID tap card, and smartphone app schedule control.',
    tags: ['BESTSELLER', 'HOME & WORKPLACE'],
    status: 'In Stock',
    location: 'Homes, Villas, Private Offices, Societies',
    hardware: 'Smart AC Wallbox Model MC-07',
    liveSince: 'National Standard',
    tariff: '₹1,490 / month lease',
    omTerm: '3 Years Full Replacement Warranty',
    minTicket: '₹1,490/mo',
    fundedAmount: '₹39,990',
    targetAmount: '₹39,990',
    fundedPct: 100,
    daysLeft: 'SHIPS TODAY',
    coOwners: 320,
    uptime: '99.5%',
    unitCount: 'Single Type 2 Coupler',
    power: '7.4 kW (Single Phase 32A)',
    voltage: '230V AC ± 15% Standard Domestic',
    connector: 'Type 2 Plug with 5m Cable',
    efficiency: '97%',
    purchasePrice: '₹39,990',
    hubCost: 39990,
    costBreakdown: [
      { item: '7.4 kW Smart AC Hardware', cost: '₹29,990' },
      { item: 'RFID Cards & Smart Gateway', cost: '₹5,000' },
      { item: 'Wall Mount Plate & 5m Cable', cost: '₹5,000' }
    ],
    offers: [
      { title: 'Free Home Delivery', desc: 'Shipped to your doorstep across 500+ Indian cities' },
      { title: 'App Remote Scheduling', desc: 'Charge during low-tariff off-peak night hours' }
    ],
    gallery: [
      { src: acChargerReal, cap: 'MEGACHARGE 7.4 kW SLIM WALL MOUNT BOX', label: '01' },
      { src: acCharger, cap: 'TYPE 2 ERGONOMIC GUN AND STATUS RING', label: '02' }
    ],
    bandImage: bannerImg,
    bandTitle: 'Your Reliable Daily EV Charging Companion',
    bandDesc: 'Wake up to a full tank every morning. Safe, waterproof, and certified to all international safety standards.',
    returns: [
      { yr: '2Y', gain: '+20%', baseH: 64, retH: 76 },
      { yr: '3Y', gain: '+36%', baseH: 64, retH: 94 },
      { yr: '4Y', gain: '+50%', baseH: 64, retH: 116 },
      { yr: '5Y', gain: '+65%', baseH: 64, retH: 142 }
    ],
    chips: [1490, 2980, 5960, 15000],
    reviews: [
      {
        stars: 5,
        quote: 'Using it for my Nexon EV since 8 months. Flawless charging, app schedules charging at night when electricity is cheap.',
        author: 'Deepak Sharma',
        sub: 'Private EV Owner, Gurgaon · 8 months'
      }
    ],
    relatedIds: ['ac11', 'ac22', 'kurukshetra-cluster']
  },

  {
    id: 'ac11',
    type: 'ac',
    name: 'MegaCharge Premium 11 kW AC Wallbox',
    heroTitle: 'MegaCharge Premium 11 kW AC',
    badge: '3-PHASE AC',
    kw: '11 kW Three Phase',
    tagline: 'High-power 3-phase AC wallbox engineered for premium EVs, residential villas, and commercial parking spaces.',
    tags: ['THREE PHASE', 'FAST AC HOME'],
    status: 'In Stock',
    location: 'Villas, Office Parks, Hotels, Residential Societies',
    hardware: 'Smart AC Wallbox Model MC-11',
    liveSince: 'Commercial Standard',
    tariff: '₹1,990 / month lease',
    omTerm: '3 Years Comprehensive Warranty',
    minTicket: '₹1,990/mo',
    fundedAmount: '₹49,990',
    targetAmount: '₹49,990',
    fundedPct: 100,
    daysLeft: 'SHIPS TODAY',
    coOwners: 110,
    uptime: '99.5%',
    unitCount: 'Type 2 3-Phase Port',
    power: '11 kW (Three Phase 16A)',
    voltage: '415V AC ± 10%',
    connector: 'Type 2 Plug with 5m Cable',
    efficiency: '97%',
    purchasePrice: '₹49,990',
    hubCost: 49990,
    costBreakdown: [
      { item: '11 kW 3-Phase AC Unit', cost: '₹37,990' },
      { item: 'Dynamic Load Balancer', cost: '₹6,000' },
      { item: 'Type 2 Cable & RFID Sensors', cost: '₹6,000' }
    ],
    offers: [
      { title: 'Dynamic Load Balancing', desc: 'Prevents home circuit overload when ACs are running' },
      { title: '3x Faster than 3.3kW', desc: 'Full recharge in 4-6 hours for luxury EVs' }
    ],
    gallery: [
      { src: acCharger, cap: '11 kW THREE PHASE PREMIUM WALLBOX', label: '01' },
      { src: acChargerReal, cap: 'COMMERCIAL OFFICE BAY INSTALLATION', label: '02' }
    ],
    bandImage: bannerImg,
    bandTitle: 'Three-Phase Power for High-Capacity Batteries',
    bandDesc: 'Ideal for BMW, Mercedes, Audi, Hyundai Ioniq, and Kia EV6 with native 11 kW AC onboard chargers.',
    returns: [
      { yr: '2Y', gain: '+22%', baseH: 64, retH: 78 },
      { yr: '3Y', gain: '+38%', baseH: 64, retH: 98 },
      { yr: '4Y', gain: '+54%', baseH: 64, retH: 122 },
      { yr: '5Y', gain: '+72%', baseH: 64, retH: 152 }
    ],
    chips: [1990, 3980, 7960, 20000],
    reviews: [
      {
        stars: 5,
        quote: 'Recharges our Ioniq 5 in 5 hours flat. The dynamic load balancer ensures zero tripping at home.',
        author: 'Kunal Kapoor',
        sub: 'Luxury EV Owner, Mumbai · 6 months'
      }
    ],
    relatedIds: ['ac7', 'ac22', 'portable3']
  },

  {
    id: 'ac22',
    type: 'ac',
    name: 'MegaCharge Dual 22 kW AC Commercial',
    heroTitle: 'MegaCharge Dual 22 kW AC Commercial',
    badge: 'DUAL AC PILLAR',
    kw: '22 kW Dual Ports',
    tagline: 'Heavy-duty dual socket commercial charging pillar with OCPP 1.6 cloud billing, RFID cards, and dual car simultaneous charging.',
    tags: ['COMMERCIAL DUAL', 'OCPP 1.6 CLOUD'],
    status: 'In Stock',
    location: 'Commercial Offices, Malls, Hotels, Paid Parking',
    hardware: 'MegaCharge Dual Socket Pillar MC-22D',
    liveSince: 'Commercial Standard',
    tariff: '₹2,990 / month lease',
    omTerm: '5 Years Institutional Care',
    minTicket: '₹2,990/mo',
    fundedAmount: '₹79,990',
    targetAmount: '₹79,990',
    fundedPct: 100,
    daysLeft: 'SHIPS IN 48 HOURS',
    coOwners: 160,
    uptime: '99.0%',
    unitCount: 'Dual Type 2 Sockets',
    power: '22 kW (11kW + 11kW or 22kW Single)',
    voltage: '415V AC ± 10% Three Phase',
    connector: 'Dual Universal Type 2 Sockets',
    efficiency: '97.5%',
    purchasePrice: '₹79,990',
    hubCost: 79990,
    costBreakdown: [
      { item: 'Dual 22 kW Pillar Shell & Core', cost: '₹59,990' },
      { item: 'Dual Energy Meters & 4G Modem', cost: '₹12,000' },
      { item: 'Weatherproof Foundation Pedestal', cost: '₹8,000' }
    ],
    offers: [
      { title: 'Charge 2 Cars at Once', desc: 'Maximizes parking revenue per square foot' },
      { title: 'Automatic Billing Engine', desc: 'Prepaid wallet & UPI QR payment gateway included' }
    ],
    gallery: [
      { src: acChargerReal, cap: 'DUAL 22 kW FREESTANDING COMMERCIAL PILLAR', label: '01' },
      { src: acCharger, cap: 'DUAL RFID TAP SENSORS AND LED RINGS', label: '02' }
    ],
    bandImage: bannerImg,
    bandTitle: 'The Workhorse for Commercial Parking Garages',
    bandDesc: 'Built in robust stainless steel and IP55 rated for high-traffic office basements, mall podiums, and outdoor lots.',
    returns: [
      { yr: '2Y', gain: '+26%', baseH: 64, retH: 80 },
      { yr: '3Y', gain: '+44%', baseH: 64, retH: 106 },
      { yr: '4Y', gain: '+62%', baseH: 64, retH: 134 },
      { yr: '5Y', gain: '+84%', baseH: 64, retH: 170 }
    ],
    chips: [2990, 5980, 11960, 30000],
    reviews: [
      {
        stars: 5,
        quote: 'Installed 4 dual pillars in our tech park basement. Employees pay via UPI and the management dashboard is crystal clear.',
        author: 'Siddharth Rao',
        sub: 'Facility Director, Bangalore · 14 months'
      }
    ],
    relatedIds: ['ac7', 'dc30', 'kurukshetra-cluster']
  },

  {
    id: 'portable3',
    type: 'portable',
    name: 'MegaCharge Portable Go 3.3 kW',
    heroTitle: 'MegaCharge Portable Go 3.3 kW',
    badge: 'PORTABLE TRAVEL',
    kw: '3.3 kW Plug-in',
    tagline: 'Ultra-portable 16A 3-pin plug-in EV charger for road trips, vacation homes, and emergency top-ups anywhere in India.',
    tags: ['PLUG & PLAY', 'TRAVEL READY'],
    status: 'In Stock',
    location: 'Trunk Portable, Farmhouses, Emergency Backups',
    hardware: 'MegaCharge Portable Go IP67 Unit',
    liveSince: 'Consumer Standard',
    tariff: '₹490 / month lease',
    omTerm: '2 Years Replacement Guarantee',
    minTicket: '₹490/mo',
    fundedAmount: '₹12,990',
    targetAmount: '₹12,990',
    fundedPct: 100,
    daysLeft: 'SHIPS TODAY',
    coOwners: 540,
    uptime: '99.9%',
    unitCount: '16A 3-Pin to Type 2',
    power: '3.3 kW (Single Phase 15A/16A)',
    voltage: '230V AC ± 15%',
    connector: '16A 3-Pin Power Plug to Type 2',
    efficiency: '98%',
    purchasePrice: '₹12,990',
    hubCost: 12990,
    costBreakdown: [
      { item: 'Portable Smart In-Cable Control Box', cost: '₹8,990' },
      { item: '5m Heavy-Duty Copper Cable', cost: '₹2,500' },
      { item: 'Shockproof Travel Carry Bag', cost: '₹1,500' }
    ],
    offers: [
      { title: 'Any 16A Wall Socket', desc: 'Plugs directly into common geyser/AC power sockets' },
      { title: 'Zero Installation Required', desc: 'Simply keep in your boot and charge on the move' }
    ],
    gallery: [
      { src: acCharger, cap: 'COMPACT WATERPROOF PORTABLE IN-LINE UNIT', label: '01' },
      { src: acChargerReal, cap: 'PLUGS INTO ANY STANDARD 16A DOMESTIC SOCKET', label: '02' }
    ],
    bandImage: bannerImg,
    bandTitle: 'Peace of Mind in Your Car Trunk',
    bandDesc: 'Never experience range anxiety. Whether you visit a remote farmhouse or highway hotel, you can always plug in.',
    returns: [
      { yr: '2Y', gain: '+15%', baseH: 64, retH: 72 },
      { yr: '3Y', gain: '+28%', baseH: 64, retH: 88 },
      { yr: '4Y', gain: '+40%', baseH: 64, retH: 104 },
      { yr: '5Y', gain: '+55%', baseH: 64, retH: 125 }
    ],
    chips: [490, 980, 1960, 5000],
    reviews: [
      {
        stars: 5,
        quote: 'Carried it on our road trip to Himachal Pradesh. Charged at every hotel without any issues.',
        author: 'Varun Nair',
        sub: 'EV Traveler, Delhi · 5 months'
      }
    ],
    relatedIds: ['ac7', 'ac11', 'dc30']
  }
];

export const getProductById = (id) => {
  if (!id) return ALL_PRODUCTS[0];
  const found = ALL_PRODUCTS.find((p) => p.id === id || p.id.toLowerCase() === id.toLowerCase());
  return found || ALL_PRODUCTS[0];
};
