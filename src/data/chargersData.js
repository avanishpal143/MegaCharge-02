/**
 * ==========================================
 * MEGACHARGE MASTER PRODUCTS & HUBS DATASET
 * Features MC-101 Agra Expressway Hub (Safexpress Linked)
 * and 2 matching Expressway Fleet Hubs
 * ==========================================
 */

import agraStationCloseup from '../assets/agra_station_closeup.jpg';
import agraStationNight from '../assets/agra_station_night.jpg';
import agraStationGate from '../assets/agra_station_gate.jpg';
import agraStationWide from '../assets/agra_station_wide.jpg';
import expresswayPortrait from '../assets/expressway_front_portrait.jpg';
import zenergize240 from '../assets/zenergize_240.jpg';
import zenergize120 from '../assets/zenergize_120.jpg';
import zenergize60 from '../assets/zenergize_60.jpg';
import chargingCars from '../assets/charging_station_cars.jpg';
import teslaCharging from '../assets/tesla_charging.jpg';

export const ALL_PRODUCTS = [
  /* ===================================================
     1. MC-101 | AGRA EXPRESSWAY HUB (FROM OFFICIAL PDF & PHOTOS)
     =================================================== */
  {
    id: 'agra-expressway',
    code: 'MC-101',
    type: 'hub',
    name: 'MC-101 | Agra Expressway Hub (180 kW)',
    heroTitle: 'MC-101 | Agra Expressway Hub',
    badge: 'SAFEXPRESS GUARANTEED',
    kw: '180 kW · Dual CCS2',
    tagline: 'Own the charger this Diwali. Safexpress guarantees the demand. 180 kW DC fast-charging hub at Prem Vehicles Pvt Ltd, Agra with 5-year guaranteed corporate fleet income.',
    tags: ['SAFEXPRESS CONTRACT', '5 YR ASSURED INCOME', 'DIWALI OFFER'],
    status: 'Live 1 Oct 2026',
    location: 'Prem Vehicles Pvt Ltd, Agra (Agra Expressway Corridor, UP)',
    hardware: '180 kW DC Fast Dual-Gun Charger with Eicher EVCS Canopy',
    liveSince: '1 Oct 2026',
    tariff: '₹15 / unit (Yr 1) · ₹13 / unit (Yr 2+)',
    omTerm: '5 + 3 years, MNIL maintained',
    minTicket: '₹10,000',
    mrp: '₹42.50 L',
    diwaliPrice: '₹40.00 L + GST',
    savings: '₹2.5 Lakh',
    fundedAmount: '₹34.00 L',
    targetAmount: '₹40.00 L',
    fundedPct: 85,
    daysLeft: 'FESTIVE OFFER',
    coOwners: 38,
    uptime: '99.2%',
    unitCount: '180 kW Dual Gun Fast Terminal',
    power: '180 kW Total Fast Charging',
    voltage: '415V Three Phase Dedicated HT Grid',
    connector: 'Dual CCS2 High-Power Couplers',
    efficiency: '97.2%',
    hubCost: 4000000, // ₹40 Lakhs Diwali Price
    expectedEarnings5Yrs: '₹105–140 Lakh',
    guaranteedFloor: '₹27.5 Lakh net',
    paybackPeriod: '1.4–2 yrs',
    irr: '43–64%',
    locationDesc: 'Commercial & express freight logistics corridor (Prem Vehicles)',
    dailyEnergy: '~1,400–1,750 kWh',
    dailyEnergyDesc: 'Per day (39,400–52,600 units/mo projected)',
    tariffDesc: 'Contracted corporate tariff with ₹10/unit operating cost',
    hardwareDesc: '180 kW dual gun with 24x7 smart cloud telemetry and Eicher canopy',
    payoutSchedule: [
      { year: 1, yr: 2760000, cum: 2760000, label: 'Yr 1 (30–40% util.)' },
      { year: 2, yr: 1900000, cum: 4660000, label: 'Yr 2 (35–46% util.)' },
      { year: 3, yr: 2190000, cum: 6850000, label: 'Yr 3 (40–53% util.)' },
      { year: 4, yr: 2520000, cum: 9370000, label: 'Yr 4 (46–61% util.)' },
      { year: 5, yr: 2890000, cum: 12260000, label: 'Yr 5 (52–70% util.)' }
    ],
    costBreakdown: [
      { item: '180 kW DC Dual-Gun Rapid System', cost: '₹32,00,000' },
      { item: 'Civil Plinth, Canopy & Cabling', cost: '₹5,50,000' },
      { item: 'HT Metering, CCTV & Telemetry', cost: '₹2,50,000' }
    ],
    offers: [
      { title: 'Diwali Price: Save ₹2.5 Lakh', desc: 'MRP ₹42.5 Lakh, now ₹40 Lakh + GST' },
      { title: 'Demand Guaranteed by Safexpress', desc: '14,000+ trucks fleet committed for 5 years minimum volume' },
      { title: 'Shortfall Protection', desc: 'Any usage gap below minimum is billed directly to Safexpress' },
      { title: 'Expected 5-Yr Earnings: ₹105–140 Lakh', desc: 'Guaranteed floor of ₹27.5 L net with 1.4–2 yr payback' }
    ],
    gallery: [
      { src: agraStationCloseup, cap: 'MC-101 AGRA · 180 kW DUAL GUN CHARGER AT PREM VEHICLES', label: '01' },
      { src: expresswayPortrait, cap: 'FRONT OPERATIONAL BAY · DUAL CCS2 HIGH-POWER GUNS', label: '02' },
      { src: agraStationNight, cap: 'ILLUMINATED EVCS CANOPY & EICHER SIGNBOARD AT NIGHT', label: '03' },
      { src: agraStationGate, cap: 'PREM AUTO ENTERPRISES AGRA HIGHWAY FACING ENTRANCE', label: '04' },
      { src: agraStationWide, cap: 'EVCS CHARGING BAY WITH HEAVY-DUTY GROUND PLINTH', label: '05' }
    ],
    bandImage: agraStationNight,
    bandTitle: 'Income backed by a contract, not by hope.',
    bandDesc: 'Safexpress commits its vendors and operators to a minimum monthly charging volume for 5 years. Operated by Mega Nirman & Industries Limited (BSE: 539767).',
    returns: [
      { yr: '1Y', gain: '+24%', baseH: 64, retH: 79 },
      { yr: '2Y', gain: '+48%', baseH: 64, retH: 95 },
      { yr: '3Y', gain: '+72%', baseH: 64, retH: 114 },
      { yr: '4Y', gain: '+94%', baseH: 64, retH: 136 },
      { yr: '5Y', gain: '+140%', baseH: 64, retH: 154 }
    ],
    chips: [10000, 50000, 100000, 500000],
    reviews: [
      {
        stars: 5,
        quote: 'Safexpress anchor demand makes this an unbeatable asset. Having a contractually guaranteed monthly floor eliminates traffic uncertainty.',
        author: 'Vikramaditya S.',
        sub: 'Agra Corridor Investor · 11 months'
      },
      {
        stars: 5,
        quote: 'The 180 kW station at Prem Vehicles is strategically located on the expressway. High commercial footfall and zero maintenance liability.',
        author: 'Rajat Singhania',
        sub: 'Fleet Infrastructure Partner · 8 months'
      }
    ],
    relatedIds: ['yamuna-expressway', 'delhi-mumbai-expressway']
  },

  /* ===================================================
     2. MC-102 | YAMUNA EXPRESSWAY SUPER HUB (COMING SOON)
     =================================================== */
  {
    id: 'yamuna-expressway',
    code: 'MC-102',
    type: 'hub',
    isComingSoon: true,
    name: 'MC-102 | Yamuna Expressway Super Hub (240 kW)',
    heroTitle: 'MC-102 | Yamuna Expressway Super Hub',
    badge: 'COMING SOON',
    kw: '240 kW · Quad CCS2',
    tagline: 'Coming Soon · High-speed flagship expressway terminal at Jewar Airport Logistics Corridor. Pre-registration now open for early investor allocation.',
    tags: ['COMING SOON', 'JEWAR LOGISTICS', 'PRE-REGISTRATION'],
    status: 'Coming Soon',
    location: 'Jewar Logistics Interchange, Yamuna Expressway Milestone 68, UP',
    hardware: '240 kW DC Hyper Terminal with Dual Dispenser Columns',
    liveSince: 'Coming Soon',
    tariff: '₹15 / unit (Yr 1) · ₹13 / unit (Yr 2+)',
    omTerm: '5 + 3 years, MNIL maintained',
    minTicket: '₹10,000',
    mrp: '₹52.00 L',
    diwaliPrice: '₹48.00 L + GST',
    savings: '₹4.0 Lakh',
    fundedAmount: '₹38.50 L',
    targetAmount: '₹48.00 L',
    fundedPct: 80,
    daysLeft: 'LAUNCHING SOON',
    coOwners: 44,
    uptime: '99.4%',
    unitCount: '4 Ultra-Fast Liquid-Cooled Guns',
    power: '240 kW Combined Hyper Charging',
    voltage: '415V Three Phase Dedicated HT Grid',
    connector: 'Quad CCS2 Liquid-Cooled Couplers',
    efficiency: '97.5%',
    hubCost: 4800000, // ₹48 Lakhs Diwali Price
    expectedEarnings5Yrs: '₹135–175 Lakh',
    guaranteedFloor: '₹34.5 Lakh net',
    paybackPeriod: '1.3–1.8 yrs',
    irr: '46–68%',
    locationDesc: 'Expressway toll interchange & freight corridor (Jewar Node)',
    dailyEnergy: '~1,800–2,200 kWh',
    dailyEnergyDesc: 'Per day (45,000–60,000 units/mo projected)',
    tariffDesc: 'Contracted corporate tariff with ₹10/unit operating cost',
    hardwareDesc: '240 kW hyper terminal with quad CCS2 liquid-cooled guns',
    payoutSchedule: [
      { year: 1, yr: 3400000, cum: 3400000, label: 'Yr 1' },
      { year: 2, yr: 2400000, cum: 5800000, label: 'Yr 2' },
      { year: 3, yr: 2800000, cum: 8600000, label: 'Yr 3' },
      { year: 4, yr: 3200000, cum: 11800000, label: 'Yr 4' },
      { year: 5, yr: 3700000, cum: 15500000, label: 'Yr 5' }
    ],
    costBreakdown: [
      { item: '240 kW Dual-Column Hyper Unit', cost: '₹38,50,000' },
      { item: 'HT Substation, Canopy & Civil Yard', cost: '₹6,50,000' },
      { item: 'Telemetry, Surveillance & Signage', cost: '₹3,00,000' }
    ],
    offers: [
      { title: 'Corridor Allocation Coming Soon', desc: 'Pre-registration now open for priority allocation' },
      { title: 'Jewar Airport Logistics Link', desc: 'Anchor commercial freight volume contracted for 5 years' },
      { title: 'Shortfall Protection', desc: 'Any usage gap below minimum is billed to fleet operators' },
      { title: 'Expected 5-Yr Earnings: ₹135–175 Lakh', desc: 'Guaranteed floor of ₹34.5 L net with 1.3–1.8 yr payback' }
    ],
    gallery: [
      { src: zenergize240, cap: 'MC-102 YAMUNA · 240 kW HYPER TERMINAL (CONCEPT RENDER)', label: '01' },
      { src: chargingCars, cap: 'HIGHWAY COMMERCIAL FLEET CHARGING HUB CONCEPT', label: '02' },
      { src: teslaCharging, cap: 'HIGH-SPEED DUAL DISPENSER BAY (CONCEPT DESIGN)', label: '03' }
    ],
    bandImage: zenergize240,
    bandTitle: 'High-Volume Express Corridor Asset',
    bandDesc: 'Connecting Delhi NCR to the upcoming Jewar International Airport and Agra. Guaranteed baseline volume with automated monthly NEFT payouts.',
    returns: [
      { yr: '1Y', gain: '+26%', baseH: 64, retH: 81 },
      { yr: '2Y', gain: '+52%', baseH: 64, retH: 98 },
      { yr: '3Y', gain: '+78%', baseH: 64, retH: 119 },
      { yr: '4Y', gain: '+105%', baseH: 64, retH: 142 },
      { yr: '5Y', gain: '+155%', baseH: 64, retH: 165 }
    ],
    chips: [10000, 50000, 100000, 500000],
    reviews: [
      {
        stars: 5,
        quote: 'The Yamuna Expressway hub sees heavy weekend and night logistics rush. Payouts are transparently reflected on the investor portal.',
        author: 'Arjun Singhal',
        sub: 'Expressway Co-owner · 6 months'
      }
    ],
    relatedIds: ['agra-expressway', 'delhi-mumbai-expressway']
  },

  /* ===================================================
     3. MC-103 | DELHI-MUMBAI EXPRESSWAY TERMINAL (COMING SOON)
     =================================================== */
  {
    id: 'delhi-mumbai-expressway',
    code: 'MC-103',
    type: 'hub',
    isComingSoon: true,
    name: 'MC-103 | Delhi-Mumbai Expressway Hub (120 kW)',
    heroTitle: 'MC-103 | Delhi-Mumbai Expressway Hub',
    badge: 'COMING SOON',
    kw: '120 kW · Dual CCS2',
    tagline: 'Coming Soon · Prime wayside logistics charging terminal on the new NE-4 Greenfield corridor. Pre-registration now open for early investor allocation.',
    tags: ['COMING SOON', 'GREENFIELD NE-4', 'PRE-REGISTRATION'],
    status: 'Coming Soon',
    location: 'NE-4 Delhi-Mumbai Expressway Km 112, Dausa Logistics Rest Area',
    hardware: '120 kW DC Dual CCS2 Fast Charger with Highway Canopy',
    liveSince: 'Coming Soon',
    tariff: '₹15 / unit (Yr 1) · ₹13 / unit (Yr 2+)',
    omTerm: '5 + 3 years, MNIL maintained',
    minTicket: '₹10,000',
    mrp: '₹32.00 L',
    diwaliPrice: '₹29.50 L + GST',
    savings: '₹2.5 Lakh',
    fundedAmount: '₹23.50 L',
    targetAmount: '₹29.50 L',
    fundedPct: 79,
    daysLeft: 'FESTIVE OFFER',
    coOwners: 31,
    uptime: '98.9%',
    unitCount: '2 Fast CCS2 Charging Guns',
    power: '120 kW Dual High-Speed DC',
    voltage: '415V Three Phase Industrial Grid',
    connector: 'Dual CCS2 Fast Couplers',
    efficiency: '96.8%',
    hubCost: 2950000, // ₹29.5 Lakhs Diwali Price
    expectedEarnings5Yrs: '₹82–110 Lakh',
    guaranteedFloor: '₹22.5 Lakh net',
    paybackPeriod: '1.5–2.1 yrs',
    irr: '40–60%',
    locationDesc: 'Greenfield 8-lane freight expressway rest plaza (NE-4)',
    dailyEnergy: '~1,100–1,400 kWh',
    dailyEnergyDesc: 'Per day (30,000–40,000 units/mo projected)',
    tariffDesc: 'Contracted corporate tariff with ₹10/unit operating cost',
    hardwareDesc: '120 kW dual CCS2 high-speed terminal with canopy',
    payoutSchedule: [
      { year: 1, yr: 2100000, cum: 2100000, label: 'Yr 1' },
      { year: 2, yr: 1500000, cum: 3600000, label: 'Yr 2' },
      { year: 3, yr: 1700000, cum: 5300000, label: 'Yr 3' },
      { year: 4, yr: 2000000, cum: 7300000, label: 'Yr 4' },
      { year: 5, yr: 2300000, cum: 9600000, label: 'Yr 5' }
    ],
    costBreakdown: [
      { item: '120 kW Dual CCS2 Fast Unit', cost: '₹23,50,000' },
      { item: 'Civil Plinth, Canopy & Earthing', cost: '₹4,00,000' },
      { item: 'Signage & Telemetry Controller', cost: '₹2,00,000' }
    ],
    offers: [
      { title: 'Diwali Price: Save ₹2.5 Lakh', desc: 'MRP ₹32 Lakh, now ₹29.5 Lakh + GST' },
      { title: 'National Expressway Priority', desc: 'Designated Wayside Freight Amenity Zone on NE-4' },
      { title: 'Shortfall Protection', desc: 'Any usage gap below minimum is billed to fleet operators' },
      { title: 'Expected 5-Yr Earnings: ₹82–110 Lakh', desc: 'Guaranteed floor of ₹22.5 L net with 1.5–2.1 yr payback' }
    ],
    gallery: [
      { src: zenergize120, cap: 'MC-103 NE-4 · 120 kW DUAL CCS2 FAST CHARGER (CONCEPT RENDER)', label: '01' },
      { src: zenergize60, cap: 'COMPACT DC FAST CHARGING TERMINAL ARCHITECTURE', label: '02' },
      { src: chargingCars, cap: 'WAYSIDE AMENITY REST AREA CORRIDOR CONCEPT', label: '03' }
    ],
    bandImage: zenergize120,
    bandTitle: 'India’s Flagship Green Freight Corridor',
    bandDesc: 'Positioned on the prestigious 8-lane expressway connecting Delhi directly with the financial hub. 100% hardware upkeep handled by MegaCharge.',
    returns: [
      { yr: '1Y', gain: '+22%', baseH: 64, retH: 78 },
      { yr: '2Y', gain: '+44%', baseH: 64, retH: 92 },
      { yr: '3Y', gain: '+68%', baseH: 64, retH: 110 },
      { yr: '4Y', gain: '+90%', baseH: 64, retH: 130 },
      { yr: '5Y', gain: '+130%', baseH: 64, retH: 148 }
    ],
    chips: [10000, 50000, 100000, 500000],
    reviews: [
      {
        stars: 5,
        quote: 'Being part of the Delhi-Mumbai expressway project gives tremendous confidence. Highly transparent dashboard and monthly payouts.',
        author: 'Sanjay Deshmukh',
        sub: 'Highway Investor · 6 months'
      }
    ],
    relatedIds: ['agra-expressway', 'yamuna-expressway']
  }
];

export const getProductById = (id) => {
  if (!id) return ALL_PRODUCTS[0];
  const found = ALL_PRODUCTS.find((p) => p.id === id || p.id.toLowerCase() === id.toLowerCase() || p.code?.toLowerCase() === id.toLowerCase());
  return found || ALL_PRODUCTS[0];
};
