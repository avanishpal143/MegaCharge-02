import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Check, 
  X, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Zap, 
  FileText, 
  TrendingUp, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { ALL_PRODUCTS, getProductById } from '../../data/chargersData';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = useMemo(() => getProductById(id), [id]);

  // Gallery State
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Active Tab for In-Page Navigation
  const [activeTab, setActiveTab] = useState('own');

  // Offers Slider State
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  // Calculator State
  const isHub = product.type === 'hub';
  const defaultCommit = isHub ? 50000 : (product.hubCost ? Math.round(product.hubCost * 0.2) : 10000);
  const [commitAmount, setCommitAmount] = useState(defaultCommit);

  // Reset when product changes
  useEffect(() => {
    setActivePhotoIndex(0);
    setCommitAmount(isHub ? 50000 : (product.hubCost ? Math.round(product.hubCost * 0.2) : 10000));
    window.scrollTo(0, 0);
  }, [product, isHub]);

  // Offers Auto-Rotation
  useEffect(() => {
    if (!product.offers || product.offers.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % product.offers.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [product.offers]);

  // Intersection Observer for In-Page Tabs
  useEffect(() => {
    const sectionIds = ['own', 'legal', 'returns', 'security', 'reviews', 'more'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );

    sectionIds.forEach((sId) => {
      const el = document.getElementById(sId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Calculations
  const calculations = useMemo(() => {
    const totalCost = product.hubCost || 1000000;
    const share = Math.min(1, Math.max(0, commitAmount / totalCost));
    const pct = (share * 100).toFixed(2);
    const monthlyPayout = Math.round(commitAmount * 0.0118);
    const fiveYearPayout = Math.round(commitAmount * 0.82);
    const kwhPerMo = Math.round(share * 3720);

    return {
      pct: `${pct}%`,
      monthlyPayout: `₹${monthlyPayout.toLocaleString('en-IN')}`,
      fiveYearPayout: `₹${fiveYearPayout.toLocaleString('en-IN')}`,
      kwhPerMo: `${kwhPerMo.toLocaleString('en-IN')} kWh/mo`
    };
  }, [commitAmount, product.hubCost]);

  // Modal State for "Commit / Rent This Model"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [modalSubmitted, setModalSubmitted] = useState(false);

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (modalForm.name && modalForm.phone) {
      setModalSubmitted(true);
    }
  };

  const currentGalleryItem = product.gallery[activePhotoIndex] || product.gallery[0];

  // Related Products
  const relatedProducts = useMemo(() => {
    const ids = product.relatedIds || [];
    return ids.map((rId) => getProductById(rId)).filter(Boolean);
  }, [product]);

  return (
    <div className="product-detail-page">
      <div className="wrap">
        
        {/* BREADCRUMB */}
        <div className="crumb">
          <Link to="/solutions">Rental Solutions</Link>
          <span>›</span>
          <Link to="/solutions">{isHub ? 'Owned Sites' : 'Charger Hardware'}</Link>
          <span>›</span>
          <b>{product.name}</b>
        </div>

        {/* HERO SECTION */}
        <div className="hero">
          
          {/* Gallery Stage (Left) */}
          <div className="gallery">
            <div className="stage">
              <figure className="stage-panel">
                <span className="badge">{product.badge}</span>
                <span className="kw mono">{product.kw}</span>

                <img 
                  src={currentGalleryItem.src} 
                  alt={currentGalleryItem.cap || product.name}
                  className="shot"
                />

                <span className="veil" />
                <figcaption className="cap mono">{currentGalleryItem.cap}</figcaption>
                <button 
                  type="button" 
                  className="gal"
                  onClick={() => setActivePhotoIndex((prev) => (prev + 1) % product.gallery.length)}
                >
                  NEXT VIEW · {product.gallery.length}
                </button>
              </figure>

              {/* Thumbnails */}
              <div className="thumbs">
                {product.gallery.map((g, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-pressed={activePhotoIndex === idx}
                    onClick={() => setActivePhotoIndex(idx)}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <img src={g.src} alt="" />
                    <span className="tn mono">{g.label || `0${idx + 1}`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Row */}
            <div className="stats">
              <div>
                <b>{isHub ? `${product.fundedPct}%` : product.efficiency}</b>
                <span className="mono">{isHub ? 'FUNDED' : 'EFFICIENCY'}</span>
              </div>
              <div>
                <b>{isHub ? product.coOwners : (product.unitCount || 'DUAL PORT')}</b>
                <span className="mono">{isHub ? 'CO-OWNERS' : 'OUTPUT GAUGE'}</span>
              </div>
              <div>
                <b>{product.uptime}</b>
                <span className="mono">UPTIME</span>
              </div>
            </div>
          </div>

          {/* Product Info & Specs (Right) */}
          <div>
            <div className="tagrow">
              {product.tags.map((tag, idx) => (
                <span key={idx} className={`pill ${idx % 2 === 0 ? 'mint' : 'amb'}`}>
                  {tag}
                </span>
              ))}
            </div>

            <h1>{product.heroTitle || product.name}</h1>
            <p className="sub">{product.tagline}</p>

            {/* Spec Box */}
            <div className="specbox">
              <div className="specrow">
                <span className="k mono">Location / Usage:</span>
                <span className="v mono">{product.location}</span>
              </div>
              <div className="specrow">
                <span className="k mono">Hardware:</span>
                <span className="v mono">{product.hardware}</span>
              </div>
              <div className="specrow">
                <span className="k mono">Live Status:</span>
                <span className="v mono">{product.liveSince}</span>
              </div>
              <div className="specrow">
                <span className="k mono">Tariff / Rate:</span>
                <span className="v mono">{product.tariff}</span>
              </div>
              <div className="specrow">
                <span className="k mono">O&amp;M Term:</span>
                <span className="v mono">{product.omTerm}</span>
              </div>
              <div className="specrow">
                <span className="k mono">Minimum Ticket:</span>
                <span className="v mono">{product.minTicket}</span>
              </div>
            </div>

            {/* Funded Progress Card */}
            <div className="funded">
              <div className="funded-top">
                <b>{product.fundedAmount}</b>
                <span>of {product.targetAmount} committed</span>
                <em className="mono">{product.daysLeft}</em>
              </div>
              <div className="track">
                <i style={{ width: `${Math.min(100, product.fundedPct)}%` }} />
              </div>
            </div>

            {/* Rotating Offers Card */}
            {product.offers && product.offers.length > 0 && (
              <div className="offer">
                <span className="offer-ic">
                  <Zap size={18} color="#bf5a08" strokeWidth={2.4} />
                </span>
                <div>
                  <b>{product.offers[currentOfferIndex].title}</b>
                  <span>{product.offers[currentOfferIndex].desc}</span>
                </div>
                <div className="offer-nav">
                  <div className="c mono">
                    <span>{currentOfferIndex + 1}</span>/{product.offers.length}
                  </div>
                  <div className="dots">
                    {product.offers.map((_, k) => (
                      <span
                        key={k}
                        className={`dot ${currentOfferIndex === k ? 'on' : ''}`}
                        onClick={() => setCurrentOfferIndex(k)}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Commit Button */}
            <div style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="btn btn-o"
                onClick={() => setIsModalOpen(true)}
              >
                {isHub ? 'COMMIT SHARE NOW' : 'RENT THIS MODEL NOW'}
              </button>
            </div>
          </div>
        </div>

        {/* IN-PAGE TABS BAR */}
        <div className="tabbar">
          <nav className="tabs" aria-label="Sections">
            <button
              type="button"
              aria-current={activeTab === 'own'}
              onClick={() => scrollToSection('own')}
            >
              {isHub ? 'Ownership' : 'Lease Calculator'}
            </button>
            <button
              type="button"
              aria-current={activeTab === 'legal'}
              onClick={() => scrollToSection('legal')}
            >
              {isHub ? 'What you own' : 'Engineering'}
            </button>
            <button
              type="button"
              aria-current={activeTab === 'returns'}
              onClick={() => scrollToSection('returns')}
            >
              Returns &amp; Yield
            </button>
            <button
              type="button"
              aria-current={activeTab === 'security'}
              onClick={() => scrollToSection('security')}
            >
              Safeguards
            </button>
            <button
              type="button"
              aria-current={activeTab === 'reviews'}
              onClick={() => scrollToSection('reviews')}
            >
              Reviews
            </button>
            <button
              type="button"
              aria-current={activeTab === 'more'}
              onClick={() => scrollToSection('more')}
            >
              Other sites
            </button>
          </nav>
        </div>

        {/* SECTION 1: OWNERSHIP / CALCULATOR */}
        <section id="own">
          <div className="sec-head">
            <div className="eyebrow mono">STEP 01</div>
            <h2>{isHub ? 'Choose your share' : 'Calculate Your Lease Return'}</h2>
            <p>
              {isHub 
                ? 'Your share of the hub is simply the amount you commit divided by what the hub cost to build. Move the slider to see what that looks like.'
                : 'See how your unit lease translates into monthly throughput, energy dispensed, and long-term operating yield.'}
            </p>
          </div>

          <div className="grid2">
            <div className="card">
              <div className="calc-top">
                <div className="own">
                  <div className="l mono">{isHub ? 'YOU OWN' : 'ALLOCATION SHARE'}</div>
                  <div className="n">{calculations.pct}</div>
                </div>
                <div className="amt">
                  <div className="l mono">YOU COMMIT</div>
                  <div className="n">₹{commitAmount.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <input
                type="range"
                min="10000"
                max={product.hubCost || 1490000}
                step="5000"
                value={commitAmount}
                onChange={(e) => setCommitAmount(Number(e.target.value))}
                aria-label="Amount you want to commit"
              />

              <div className="ends mono">
                <span>₹10,000</span>
                <span>₹{(product.hubCost || 1490000).toLocaleString('en-IN')}</span>
              </div>

              {/* Quick Chip Presets */}
              <div className="chips">
                {(product.chips || [50000, 100000, 250000, 500000]).map((amt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="chip"
                    aria-pressed={commitAmount === amt}
                    onClick={() => setCommitAmount(amt)}
                  >
                    ₹{amt >= 100000 ? `${(amt / 100000).toFixed(1).replace('.0', '')} lakh` : amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Dynamic Payout Figures */}
              <div className="payout">
                <div>
                  <span className="mono">TARGETED MONTHLY PAYOUT</span>
                  <b>{calculations.monthlyPayout}</b>
                </div>
                <div>
                  <span className="mono">TARGETED OVER 5 YEARS</span>
                  <b>{calculations.fiveYearPayout}</b>
                </div>
                <div>
                  <span className="mono">YOUR SHARE OF UNITS SOLD</span>
                  <b>{calculations.kwhPerMo}</b>
                </div>
              </div>
            </div>

            <div>
              {/* Cost Breakdown Card */}
              <div className="card breakdown">
                {product.costBreakdown.map((row, idx) => (
                  <div key={idx} className="brow">
                    <span className="k mono">{row.item}</span>
                    <span className="mono">{row.cost}</span>
                  </div>
                ))}
                <div className="total">
                  <span>Total Capital Cost</span>
                  <span className="mono">₹{(product.hubCost || 1490000).toLocaleString('en-IN')}</span>
                </div>
                <span 
                  className="linkline"
                  onClick={() => scrollToSection('legal')}
                >
                  View valuation &amp; audit report
                  <ArrowRight size={15} />
                </span>
              </div>

              <div className="desk-cta" style={{ marginTop: '18px' }}>
                <button
                  type="button"
                  className="btn btn-o"
                  onClick={() => setIsModalOpen(true)}
                >
                  {isHub ? 'COMMIT NOW' : 'RENT NOW'}
                </button>
                <button
                  type="button"
                  className="btn btn-g"
                  onClick={() => setIsModalOpen(true)}
                >
                  BUILD IT MONTHLY
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT YOU OWN / ENGINEERING */}
        <section id="legal">
          <div className="sec-head">
            <div className="eyebrow mono">STEP 02</div>
            <h2>What you actually own</h2>
            <p>Not a promise on paper — a filed partnership interest in the entity that holds the chargers and the registered site lease.</p>
          </div>

          <ol className="steps">
            <li>
              <h3>The LLP holds the hub</h3>
              <p>MegaCharge Grid Series LLP owns the hardware, transformer infrastructure, and registered lease agreement.</p>
            </li>
            <li>
              <h3>You become a partner</h3>
              <p>Your contribution buys a proportionate partnership interest — <span className="mono">{calculations.pct}</span> at your current amount.</p>
            </li>
            <li>
              <h3>Filed with the Ministry</h3>
              <p>The Company Secretary files official partnership disclosures with the MCA quarterly, issuing you a certified acknowledgment.</p>
            </li>
            <li>
              <h3>MNIL runs the site</h3>
              <p>Uptime, cloud billing, grid contracts, preventative servicing, and insurance stay 100% with MNIL for the full 5-year term.</p>
            </li>
          </ol>
        </section>

        {/* WIDE PHOTO BAND */}
        <div className="band">
          <img src={product.bandImage || bannerImg} alt={product.bandTitle} />
          <span className="veil2" />
          <div className="band-txt">
            <div className="eyebrow mono">ON THE GROUND</div>
            <h3>{product.bandTitle}</h3>
            <p>{product.bandDesc}</p>
          </div>
        </div>

        {/* SECTION 3: RETURNS & PERFORMANCE */}
        <section id="returns">
          <div className="sec-head">
            <div className="eyebrow mono">STEP 03</div>
            <h2>What the hub earns</h2>
            <p>Modelled on 62 kWh average daily throughput per gun at ₹11 a unit, with 8% annual tariff escalation and O&amp;M already deducted.</p>
          </div>

          <div className="grid2">
            <div className="card">
              <div className="chart">
                {(product.returns || [
                  { yr: '2Y', gain: '+26%', baseH: 64, retH: 81 },
                  { yr: '3Y', gain: '+44%', baseH: 64, retH: 106 },
                  { yr: '4Y', gain: '+63%', baseH: 64, retH: 137 },
                  { yr: '5Y', gain: '+82%', baseH: 64, retH: 168 }
                ]).map((r, idx) => (
                  <div key={idx} className="grp">
                    <span className="gain">{r.gain}</span>
                    <div className="bars">
                      <div className="bar base" style={{ height: `${r.baseH}px` }} />
                      <div className="bar ret" style={{ height: `${r.retH}px` }} />
                    </div>
                    <span className="yr mono">{r.yr}</span>
                  </div>
                ))}
              </div>

              <div className="legend">
                <span>
                  <i style={{ background: '#eee9e3' }} />
                  What you put in
                </span>
                <span>
                  <i style={{ background: 'linear-gradient(180deg, #f7a352, #bf5a08)' }} />
                  Targeted return
                </span>
              </div>
              <p className="note">
                Targeted, not guaranteed. Actual payouts move with utilization, tariff revisions and grid uptime. Read the projection report before you commit.
              </p>
            </div>

            {/* Advisor Box */}
            <div className="advisor">
              <h3>Still working the numbers?</h3>
              <p>Ask us how throughput at this site is measured, how payouts are calculated, or what happens if a gun goes down.</p>
              <button
                type="button"
                className="btn btn-o"
                onClick={() => setIsModalOpen(true)}
              >
                SCHEDULE A CALL
              </button>
              <a
                href="https://wa.me/919289555090?text=Hi%20MegaCharge,%20I%20am%20interested%20in%20learning%20more%20about%20your%20EV%20chargers."
                target="_blank"
                rel="noreferrer"
                className="btn-w"
              >
                CHAT ON WHATSAPP
              </a>
              <div className="who">
                <span className="av">MC</span>
                <div>
                  <b>MegaCharge Investor Desk</b>
                  <small>Mon–Sat, 10am to 7pm IST</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SAFEGUARDS & SECURITY */}
        <section id="security">
          <div className="sec-head">
            <div className="eyebrow mono">STEP 04</div>
            <h2>How your money is held</h2>
          </div>

          <div className="secgrid">
            <div className="srow">
              <span className="ic">
                <ShieldCheck size={22} color="#bf5a08" />
              </span>
              <div>
                <h3>ICICI Escrow Account</h3>
                <p>Your money goes into a dedicated account of the LLP, not into a generic MegaCharge or MNIL account.</p>
              </div>
            </div>

            <div className="srow">
              <span className="ic">
                <FileText size={22} color="#bf5a08" />
              </span>
              <div>
                <h3>Independent Trustee</h3>
                <p>Every withdrawal from the escrow is released by an outside trustee strictly against verified build milestones.</p>
              </div>
            </div>

            <div className="srow">
              <span className="ic">
                <TrendingUp size={22} color="#bf5a08" />
              </span>
              <div>
                <h3>Exit When You Want</h3>
                <p>We match your units with a waiting institutional or retail buyer and credit your bank within 7 working days.</p>
              </div>
            </div>

            <div className="srow">
              <span className="ic">
                <Zap size={22} color="#bf5a08" />
              </span>
              <div>
                <h3>Meter Data, Not Claims</h3>
                <p>Every unit dispensed at this site lands in your dashboard the next morning, straight from the OCPP live feed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: REVIEWS */}
        <section id="reviews">
          <div className="sec-head">
            <div className="eyebrow mono">FROM THE NETWORK</div>
            <h2>What co-owners &amp; clients say</h2>
          </div>

          <div className="scroller">
            {(product.reviews || []).map((rev, idx) => (
              <div key={idx} className="quote">
                <div className="stars">{'★'.repeat(rev.stars)}</div>
                <p>{rev.quote}</p>
                <div className="qwho">
                  <span className="qav">{rev.author.split(' ').map(n => n[0]).join('')}</span>
                  <div>
                    <b>{rev.author}</b>
                    <small>{rev.sub}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: OTHER SITES / OTHER CHARGERS */}
        <section id="more">
          <div className="sec-head">
            <div className="eyebrow mono">EXPLORE MORE</div>
            <h2>Other Live Models &amp; Sites</h2>
          </div>

          <div className="opps">
            {relatedProducts.map((rel) => (
              <div key={rel.id} className="opp">
                <div>
                  <div className="opp-top">
                    <span className="pill amb">{rel.badge}</span>
                    <span className="mono">{rel.kw}</span>
                  </div>
                  <div className="opp-img">
                    <img 
                      src={rel.gallery && rel.gallery[0] ? rel.gallery[0].src : bannerImg} 
                      alt={rel.name} 
                    />
                  </div>
                  <h3>{rel.name}</h3>
                  <div className="opp-spec">
                    <div className="r">
                      <span className="k mono">{rel.type === 'hub' ? 'Funded:' : 'Output:'}</span>
                      <span className="mono">{rel.type === 'hub' ? `${rel.fundedPct}%` : rel.power}</span>
                    </div>
                    <div className="r">
                      <span className="k mono">Uptime:</span>
                      <span className="mono">{rel.uptime}</span>
                    </div>
                  </div>
                  <div className="rate">
                    <span className="mono">FROM</span>
                    <b className="mono">{rel.minTicket}</b>
                  </div>
                </div>
                <Link to={`/chargers/${rel.id}`} className="btn btn-o" style={{ textDecoration: 'none' }}>
                  VIEW SITE / MODEL
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* LEGAL DISCLAIMER */}
        <p className="legalese">
          Mega Nirman &amp; Industries Limited (BSE: 539767), NSP Pitampura, New Delhi. Returns shown are targeted projections built on modelled site utilisation and are not assured or guaranteed. What you acquire is a partnership interest in a limited liability partnership that holds the charging assets; it is not a deposit and carries no assured return. Read the offer document, valuation report and projection report in full before committing.
        </p>

      </div>

      {/* FLOATING ACTIONS */}
      <a
        className="wa"
        href="https://wa.me/919289555090"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg width="27" height="27" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.6.1l-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 01-4-3.5c-.2-.3 0-.5.1-.6l.6-.7c.1-.2.1-.3 0-.5l-.9-2.2c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1a11 11 0 004.4 3.9c1.6.6 2 .5 2.4.5.4 0 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.5zM12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2z" />
        </svg>
      </a>

      <button
        type="button"
        className="top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="mfoot">
        <button
          type="button"
          className="btn btn-g"
          onClick={() => setIsModalOpen(true)}
        >
          MONTHLY
        </button>
        <button
          type="button"
          className="btn btn-o"
          onClick={() => setIsModalOpen(true)}
        >
          {isHub ? 'COMMIT NOW' : 'RENT NOW'}
        </button>
      </div>

      {/* COMMIT / RENT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(30, 18, 15, 0.75)',
              backdropFilter: 'blur(8px)',
              padding: '16px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => { setIsModalOpen(false); setModalSubmitted(false); }}
                style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', cursor: 'pointer', color: '#6b5751' }}
              >
                <X size={22} />
              </button>

              {modalSubmitted ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ddf3e4', color: '#1c7a49', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
                    <Check size={28} />
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 8px' }}>Application Recorded!</h3>
                  <p style={{ color: '#6b5751', fontSize: '14px', lineHeight: 1.5 }}>
                    Thank you, <strong>{modalForm.name}</strong>. Our investment desk will contact you at <strong>{modalForm.phone}</strong> with the allotment documents for <strong>{product.name}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setIsModalOpen(false); setModalSubmitted(false); }}
                    className="btn btn-o"
                    style={{ marginTop: '24px' }}
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              ) : (
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#f0801f', textTransform: 'uppercase' }}>
                    {isHub ? 'Hub Co-Ownership Tranche' : 'Charger Lease Application'}
                  </span>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0 16px', color: '#3a2723' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6b5751', margin: '0 0 20px' }}>
                    Target Allocation: <strong>₹{commitAmount.toLocaleString('en-IN')}</strong> ({calculations.pct} share)
                  </p>

                  <form onSubmit={handleModalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Rajesh Gupta"
                        value={modalForm.name}
                        onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e9e5e0', fontSize: '14px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={modalForm.phone}
                        onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e9e5e0', fontSize: '14px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Email Address</label>
                      <input
                        type="email"
                        placeholder="rajesh@example.com"
                        value={modalForm.email}
                        onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e9e5e0', fontSize: '14px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Remarks / City (Optional)</label>
                      <textarea
                        rows="2"
                        placeholder="Mention your city or specific questions..."
                        value={modalForm.message}
                        onChange={(e) => setModalForm({ ...modalForm, message: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e9e5e0', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-o"
                      style={{ marginTop: '8px' }}
                    >
                      CONFIRM &amp; GET PROJECTION PACK &rarr;
                    </button>
                    <p style={{ fontSize: '11px', color: '#9c8b85', textAlign: 'center', margin: 0 }}>
                      Backed by Mega Nirman &amp; Industries Ltd (BSE 539767).
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProductDetailPage;
