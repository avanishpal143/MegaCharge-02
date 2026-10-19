/**
 * ProductDetailPage.jsx
 * Exact replica of megacharge-live-station.html layout
 * Works for all 11 products from chargersData.js
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Check, Clock, MessageCircle, ShieldCheck, FileText, TrendingUp, Zap, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { ALL_PRODUCTS, getProductById } from '../../data/chargersData';
import { processRazorpayPayment } from '../../services/razorpayService';
import './ProductDetailPage.css';

const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getProductById(id), [id]);
  const isHub = product.type === 'hub';

  /* ── state ── */
  const [photo, setPhoto]           = useState(0);
  const [offerIdx, setOfferIdx]     = useState(0);
  const [calcYears, setCalcYears]   = useState(5);
  const [openFaq, setOpenFaq]       = useState(0);
  const [modalOpen, setModalOpen]   = useState(false);
  const [form, setForm]             = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted]   = useState(false);
  const [payData, setPayData]       = useState(null);
  const [paying, setPaying]         = useState(false);
  const [payStage, setPayStage]     = useState('');
  const [payError, setPayError]     = useState('');
  const [showStick, setShowStick]   = useState(false);
  const buyRef = useRef(null);

  /* photo navigation helpers */
  const nextPhoto = (e) => {
    if (e) e.stopPropagation();
    if (!product.gallery?.length) return;
    setPhoto((p) => (p + 1) % product.gallery.length);
  };
  const prevPhoto = (e) => {
    if (e) e.stopPropagation();
    if (!product.gallery?.length) return;
    setPhoto((p) => (p - 1 + product.gallery.length) % product.gallery.length);
  };

  /* reset on product change */
  useEffect(() => {
    setPhoto(0); setOfferIdx(0); setCalcYears(5);
    window.scrollTo(0, 0);
  }, [product.id]);

  /* offer ticker */
  useEffect(() => {
    if (!product.offers?.length) return;
    const t = setInterval(() => setOfferIdx(p => (p + 1) % product.offers.length), 4200);
    return () => clearInterval(t);
  }, [product.offers]);

  /* sticky bar */
  useEffect(() => {
    if (!buyRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setShowStick(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0.1 }
    );
    obs.observe(buyRef.current);
    return () => obs.disconnect();
  }, []);

  /* body lock */
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  /* ── calc ── */
  const hubCost = product.hubCost || 39990;
  const commitAmount = isHub ? 50000 : hubCost;

  /* monthly payout: distribute cost over 18 months with 8% escalation */
  const monthlyPayout = useMemo(() => {
    let units = 0;
    for (let m = 0; m < 18; m++) units += Math.pow(1.08, Math.floor(m / 12));
    return Math.ceil(hubCost / units / 5) * 5;
  }, [hubCost]);

  const payoutsList = useMemo(() => {
    if (product.payoutSchedule && product.payoutSchedule.length === 5) {
      return product.payoutSchedule;
    }
    let cum = 0;
    return Array.from({ length: 5 }, (_, i) => {
      const yr = Math.round(monthlyPayout * 12 * Math.pow(1.08, i));
      cum += yr;
      return { year: i + 1, yr, cum };
    });
  }, [product.payoutSchedule, monthlyPayout]);

  const selectedCum = payoutsList[calcYears - 1]?.cum || 0;
  const maxCum = payoutsList[4]?.cum || 1;

  /* ── related ── */
  const related = useMemo(() =>
    (product.relatedIds || []).map(rid => ALL_PRODUCTS.find(p => p.id === rid)).filter(Boolean),
  [product]);

  /* ── payment (Tareeqa B: Secure Backend Order + Signature Verification) ── */
  const handlePay = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      alert('Please fill Name and Phone.');
      return;
    }
    setPayError('');
    setPaying(true);

    processRazorpayPayment({
      amount: hubCost,
      productName: product.name,
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email?.trim() || '',
      },
      notes: {
        message: form.message || '',
        productId: product.id,
        kw: product.kw || '',
      },
      setStage: (stage) => setPayStage(stage),
      onSuccess: (receipt) => {
        setPaying(false);
        setPayStage('');
        setPayData(receipt);
        setSubmitted(true);
      },
      onError: (errMsg) => {
        setPaying(false);
        setPayStage('');
        setPayError(errMsg);
      },
      onDismiss: () => {
        setPaying(false);
        setPayStage('');
      },
    });
  };

  const FAQ = [
    { q: 'What exactly do I own?',
      a: isHub
        ? 'You own the 180 kW DC fast-charging dual-gun hardware registered in your name/entity under the executed agreement, placed at the high-traffic Prem Vehicles Agra site on the expressway corridor.'
        : 'The charging station hardware itself, registered in your name or firm, and 100% of the net earnings from the electricity units it dispenses to EV drivers.' },
    { q: 'How does the Safexpress demand guarantee work?',
      a: 'Safexpress commits its commercial EV fleet (14,000+ trucks network) to a guaranteed minimum volume every month for 5 years. If actual usage falls below the contractual minimum, the gap is billed directly to Safexpress and not absorbed by you.' },
    { q: 'How are net earnings calculated and paid?',
      a: 'Net earnings are derived from units dispensed at the contracted tariff of ₹15/unit in Year 1 and ₹13/unit from Year 2, after deducting operating costs of ₹10/unit (electricity ₹7, site ₹2, O&M ₹1). Net earnings are credited directly to your bank account monthly.' },
    { q: 'Who operates and maintains the charging hub?',
      a: 'Complete hands-free ownership. Installation, DISCOM liaison, 24x7 cloud telemetry, preventative maintenance, billing and collections are managed by MegaCharge, operated by BSE-listed Mega Nirman & Industries Limited (BSE: 539767).' },
    { q: 'What happens at the end of the 5-year contract?',
      a: 'The agreement comes with a 3-year renewal option on the exact same asset, meaning Years 6–8 continue to generate high-yield cashflows without requiring any fresh capex investment.' },
    { q: 'Can I sell my station asset if needed?',
      a: 'Yes. MegaCharge facilitates secondary transfers. You can exit your asset with assistance from our investor desk, transferring ownership to verified buyers with settlements completed in 7 business days.' },
  ];

  const galImg = product.gallery?.[photo];

  /* ═══════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════ */
  return (
    <div className="pdp">
      <div className="wrap">

        {/* BREADCRUMB */}
        <nav className="crumb">
          <Link to="/solutions">Stations for sale</Link><span>›</span>
          <Link to="/solutions">Live stations</Link><span>›</span>
          <b>{product.name}</b>
        </nav>

        {/* ══ HERO ══ */}
        <section className="hero">
          <div className="inner">

            {/* LEFT — gallery + spec + stats */}
            <div className="hero-left">
              <div className="gal">
                <div className="gallery-main">
                  <img src={galImg?.src} alt={galImg?.cap || product.name} />

                  {/* Status badge on photo */}
                  <div className={`live-pill ${product.isComingSoon ? 'coming-soon-pill' : ''}`}>
                    <span className={`live-dot ${product.isComingSoon ? 'coming-soon-dot' : ''}`} />
                    {product.isComingSoon ? 'COMING SOON' : `LIVE SINCE ${product.liveSince || 'OCT 2026'}`}
                  </div>

                  <div className="kw-tag">{product.kw}</div>

                  {/* Navigation Arrows DIRECTLY ON PHOTO */}
                  {product.gallery?.length > 1 && (
                    <>
                      <button 
                        type="button" 
                        className="gal-nav gal-nav-prev" 
                        onClick={prevPhoto} 
                        aria-label="Previous photo"
                      >
                        <ChevronLeft size={22} />
                      </button>
                      <button 
                        type="button" 
                        className="gal-nav gal-nav-next" 
                        onClick={nextPhoto} 
                        aria-label="Next photo"
                      >
                        <ChevronRight size={22} />
                      </button>
                    </>
                  )}

                  {/* Photo counter */}
                  {product.gallery?.length > 1 && (
                    <div className="photo-counter">
                      {photo + 1} / {product.gallery.length}
                    </div>
                  )}

                  {/* Caption overlay on bottom of photo */}
                  {galImg?.cap && (
                    <div className="gal-caption">
                      <span>{galImg.cap}</span>
                    </div>
                  )}

                  {/* Clean, non-vibrating thumbnail selector centered on photo */}
                  {product.gallery?.length > 1 && (
                    <div className="thumbs">
                      {product.gallery.map((g, i) => (
                        <button 
                          key={i} 
                          type="button" 
                          aria-pressed={photo === i} 
                          onClick={(e) => { e.stopPropagation(); setPhoto(i); }} 
                          aria-label={`View photo ${i + 1}`}
                        >
                          <img src={g.src} alt="" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT — title + buybox */}
            <div className="intro">
              {/* badges & brand in one line */}
              <div className="badges">
                {product.isComingSoon && (
                  <span className="badge" style={{ background: '#FEF3C7', color: '#92400E', borderColor: '#FCD34D', fontWeight: 800 }}>
                    COMING SOON
                  </span>
                )}
                {product.tags?.map((t, i) => (
                  <span key={i} className={`badge ${i % 2 === 0 ? 'badge-green' : 'badge-peach'}`}>{t}</span>
                ))}
                <span className="badge badge-brand">MegaCharge</span>
              </div>

              <h1>{product.heroTitle || product.name}</h1>

              {/* BUYBOX */}
              <div className="buybox" ref={buyRef} id="buy">
                <div className="prices">
                  <div>
                    <div className="lbl">
                      {product.isComingSoon ? 'Estimated Price' : `You pay ${product.diwaliPrice ? '(Diwali Price)' : ''}`}
                    </div>
                    <div className="big">{product.diwaliPrice || inr(hubCost)}</div>
                    {product.mrp && (
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>
                        MRP <span style={{ textDecoration: 'line-through' }}>{product.mrp}</span>
                        {product.savings && <span style={{ color: '#22c55e', marginLeft: '6px', fontWeight: 600 }}>Save {product.savings}</span>}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="lbl">{product.guaranteedFloor ? '5-Yr Guaranteed Minimum' : 'Target payout, year one'}</div>
                    <div className="big earn">
                      {product.guaranteedFloor || `~${inr(monthlyPayout)}`}
                      {!product.guaranteedFloor && <span className="per-mo"> a month</span>}
                    </div>
                    {product.expectedEarnings5Yrs && (
                      <div style={{ fontSize: '12px', color: '#F6A460', marginTop: '3px', fontWeight: 600 }}>
                        Expected: {product.expectedEarnings5Yrs}
                      </div>
                    )}
                  </div>
                </div>

                <div className="payback-row">
                  <Clock size={14} color="#F6A460" />
                  <span>Pays for itself in about <b>{product.paybackPeriod || '1.4–2 years'}</b> ({product.irr ? `IRR ${product.irr}` : 'High Yield'})</span>
                </div>

                <p className="box-note">
                  {product.isComingSoon 
                    ? `Coming Soon · Priority Allocation: Pre-register your interest today to get first notification and guaranteed allocation when this expressway terminal launches.`
                    : (product.guaranteedFloor 
                        ? `Demand guaranteed by Safexpress (14,000+ trucks fleet). Contractual floor of ${product.guaranteedFloor} net earnings over 5 years with shortfall protection.`
                        : 'Payouts and payback are targets, not a promise. They go up or down with how much drivers use the station.')}
                </p>

                <button 
                  type="button" 
                  className="btn btn-buy" 
                  onClick={() => setModalOpen(true)}
                  style={product.isComingSoon ? { background: '#D97706', borderColor: '#B45309' } : {}}
                >
                  {product.isComingSoon ? 'Pre-Register Interest' : 'Buy now'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-line" 
                  onClick={() => {
                    navigate('/contact');
                    setTimeout(() => {
                      const el = document.getElementById('contact-form') || document.querySelector('form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }}
                >
                  Talk to us first
                </button>

                <div className="reassure">
                  <span><Check size={13} color="#F6A460" /> All upkeep by us</span>
                  <span><Check size={13} color="#F6A460" /> 3-yr warranty</span>
                  <span><Check size={13} color="#F6A460" /> Resell any time</span>
                </div>
              </div>

              <p className="lead">{product.tagline}</p>
            </div>
          </div>
        </section>

        {/* ══ STEP 01 — HOW IT WORKS ══ */}
        <div className="block">
          <div className="sec-head">
            <span className="eyebrow">Step 01</span>
            <h2>How it works</h2>
            <p>No technical know-how needed. You own the station; we do the work.</p>
          </div>
          <div className="steps">
            <div className="step">
              <h3>You buy the station</h3>
              <p>Pick a live station, read the offer document and pay online. The station is registered in your name.</p>
            </div>
            <div className="step">
              <h3>We look after it</h3>
              <p>Repairs, maintenance, billing drivers and customer support are all on us.</p>
            </div>
            <div className="step">
              <h3>You get paid monthly</h3>
              <p>Your payout lands in your bank every month. You can see every unit sold in your dashboard the next morning.</p>
            </div>
          </div>
        </div>

        {/* ══ STEP 02 — CALCULATOR ══ */}
        <div className="block">
          <div className="calc">
            <span className="eyebrow" style={{ color: '#F6A460' }}>Step 02</span>
            <h2>What could you earn?</h2>

            <p className="sentence">
              If I buy this station for{' '}
              <span style={{ color: '#fff', fontWeight: 800, textDecoration: 'underline', textDecorationColor: '#EE8A33' }}>{inr(hubCost)}</span>
              {' '}and keep it for{' '}
              <span className="yrs" role="group" aria-label="Years">
                {[1,2,3,4,5].map(y => (
                  <button key={y} type="button" aria-pressed={calcYears === y} onClick={() => setCalcYears(y)}>{y}</button>
                ))}
              </span>
              {' '}{calcYears === 1 ? 'year' : 'years'},{' '}
              I could get about <span className="answer">{inr(selectedCum)}</span> back in payouts.
            </p>

            {/* meter */}
            <div className="meter">
              <div className="barwrap">
                <div className="bar">
                  <div className="bar-fill" style={{ width: `${Math.min(100, Math.round(selectedCum / maxCum * 100))}%` }} />
                </div>
                <div className="mark" style={{ left: `${Math.min(97, Math.round(hubCost / maxCum * 100))}%` }}>
                  <em>Money back</em>
                </div>
              </div>
              <div className="bar-labels">
                <span>
                  {selectedCum >= hubCost
                    ? `Paid back by month 18. ${inr(selectedCum - hubCost)} more than you paid.`
                    : `${Math.round(selectedCum / hubCost * 100)}% of what you paid`}
                </span>
                <span>What you paid: <b style={{ color: '#fff' }}>{inr(hubCost)}</b></span>
              </div>
            </div>

            {/* years table */}
            <div className="years-table">
              {payoutsList.map(p => (
                <div key={p.year} className={`yr-cell${calcYears === p.year ? ' on' : ''}`} onClick={() => setCalcYears(p.year)}>
                  <div className="lbl">Year {p.year}</div>
                  <b>{inr(p.yr)}</b>
                  <div className="cum">Total {inr(p.cum)}</div>
                </div>
              ))}
            </div>

            <p className="calc-note">
              {product.id === 'agra-expressway'
                ? 'Modelled on 180 kW dual-gun terminal at Prem Vehicles Agra with Safexpress contracted fleet volume. Contracted tariff of ₹15/unit (Yr 1) and ₹13/unit (Yr 2+), with net operating cost of ₹10/unit. Guaranteed floor of ₹27.5 L net backed by Safexpress shortfall protection. 3-year renewal option on same asset.'
                : `Based on modelled commercial fleet throughput at contracted tariffs with ₹10/unit operating costs taken out. Expected payback: ${product.paybackPeriod || '1.4–2 years'}. Operated by Mega Nirman & Industries Ltd (BSE: 539767).`}
            </p>

            <div className="talkrow" id="talk">
              <div className="desk">
                <span className="av">MC</span>
                <div>
                  <b>Still working the numbers?</b>
                  <small>MegaCharge Owner Desk · Mon–Sat, 10am to 7pm IST</small>
                </div>
              </div>
              <button type="button" className="btn btn-buy btn-inline" onClick={() => {
                navigate('/contact');
                setTimeout(() => {
                  const el = document.getElementById('contact-form') || document.querySelector('form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 120);
              }}>Schedule a call</button>
              <a
                href={`https://wa.me/919289555890?text=${encodeURIComponent(`Hi MegaCharge, I want to discuss ${product.name}.`)}`}
                target="_blank" rel="noreferrer"
                className="btn btn-line btn-inline"
              >Chat on WhatsApp</a>
            </div>
          </div>
        </div>

        {/* ══ STEP 03 — FACTS ══ */}
        <div className="block">
          <div className="sec-head">
            <span className="eyebrow">Step 03</span>
            <h2>About this station</h2>
          </div>
          <div className="facts">
            <div className="fact">
              <div className="k">Where it is</div>
              <div className="v sm">{product.location}</div>
              <div className="d">{product.locationDesc || 'Highway commercial & fleet logistics corridor'}</div>
            </div>
            <div className="fact">
              <div className="k">Power</div>
              <div className="v">{product.kw}</div>
              <div className="d">{product.connector}</div>
            </div>
            <div className="fact">
              <div className="k">Working time</div>
              <div className="v">{product.uptime}</div>
              <div className="d">Online and ready to charge</div>
            </div>
            <div className="fact">
              <div className="k">Energy sold</div>
              <div className="v">{product.dailyEnergy || '~1,400–1,750 kWh'}</div>
              <div className="d">{product.dailyEnergyDesc || 'Per day, commercial fleet volume'}</div>
            </div>
            <div className="fact">
              <div className="k">Charging price</div>
              <div className="v">{product.tariff}</div>
              <div className="d">{product.tariffDesc || 'Contracted corporate tariff'}</div>
            </div>
            <div className="fact">
              <div className="k">Efficiency</div>
              <div className="v">{product.efficiency}</div>
              <div className="d">Very little power wasted</div>
            </div>
            <div className="fact">
              <div className="k">Charger model</div>
              <div className="v sm">{product.hardware}</div>
              <div className="d">{product.hardwareDesc || 'Dual CCS2 guns with cloud telemetry'}</div>
            </div>
            <div className="fact">
              <div className="k">Contract Term</div>
              <div className="v sm" style={{ color: 'var(--green)' }}>5 + 3 Years</div>
              <div className="d">Zero new capex renewal option</div>
            </div>
          </div>
        </div>

        {/* ══ STEP 04 + 05 ══ */}
        <div className="block">
          <div className="two">

            {/* cost breakdown */}
            <div>
              <span className="eyebrow">Step 04</span>
              <h2 style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 'clamp(19px,2vw,24px)', textTransform: 'uppercase', color: 'var(--ink)', margin: '4px 0 14px' }}>
                What your {inr(hubCost)} covers
              </h2>
              <div className="panel">
                <div className="rows">
                  {(product.costBreakdown || []).map((r, i) => (
                    <div key={i} className="row"><span>{r.item}</span><span>{r.cost}</span></div>
                  ))}
                  <div className="row"><span>Total</span><span>{inr(hubCost)}</span></div>
                </div>
                <span className="audit-link" onClick={() => setModalOpen(true)}>
                  See the valuation and audit report →
                </span>
              </div>
            </div>

            {/* escrow */}
            <div>
              <span className="eyebrow">Step 05</span>
              <h2 style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 'clamp(19px,2vw,24px)', textTransform: 'uppercase', color: 'var(--ink)', margin: '4px 0 14px' }}>
                Your money stays protected
              </h2>
              <div className="safe">
                <div className="safe-item">
                  <div className="safe-ic"><ShieldCheck size={18} color="#C4600F" /></div>
                  <div>
                    <h3>Held in a separate account</h3>
                    <p>You pay into a dedicated ICICI escrow account, not a general MegaCharge or MNIL account.</p>
                  </div>
                </div>
                <div className="safe-item">
                  <div className="safe-ic"><FileText size={18} color="#C4600F" /></div>
                  <div>
                    <h3>Checked by an outsider</h3>
                    <p>An independent trustee releases money only after the work is verified.</p>
                  </div>
                </div>
                <div className="safe-item">
                  <div className="safe-ic"><TrendingUp size={18} color="#C4600F" /></div>
                  <div>
                    <h3>Real meter readings</h3>
                    <p>Units sold come straight from the charger itself, so you see facts, not estimates.</p>
                  </div>
                </div>
                <div className="safe-item">
                  <div className="safe-ic"><Zap size={18} color="#C4600F" /></div>
                  <div>
                    <h3>Easy to sell</h3>
                    <p>Want out? We find a buyer and pay you within 7 working days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ FAQ ══ */}
        <div className="block">
          <div className="sec-head">
            <span className="eyebrow">Good to know</span>
            <h2>Questions people ask us</h2>
          </div>
          <div className="faq">
            {FAQ.map((f, i) => (
              <div key={i} className="faq-item">
                <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  {f.q}
                  <span className={`faq-icon${openFaq === i ? ' open' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <motion.div
                    className="faq-a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {f.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ══ RELATED ══ */}
        {related.length > 0 && (
          <div className="block">
            <div className="sec-head">
              <span className="eyebrow">Explore more</span>
              <h2>Other live stations for sale</h2>
            </div>
            <div className="more">
              {related.map(rel => (
                <Link key={rel.id} to={`/chargers/${rel.id}`} className="station">
                  <img src={rel.gallery?.[0]?.src} alt={rel.name} />
                  <div className="in">
                    <div className="stag">{rel.badge} <span style={{ opacity: .5 }}>·</span> {rel.kw}</div>
                    <h3>{rel.name}</h3>
                    <div className="meta">
                      <span>{rel.location?.split(',')[0]}</span>
                      <span>{rel.uptime} uptime</span>
                    </div>
                    <div className="foot">
                      <span className="price">{rel.minTicket}</span>
                      <span className="view-btn">View Station</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>{/* /wrap */}

      {/* ══ STICKY BAR ══ */}
      <div className={`pdp-stick${showStick ? ' show' : ''}`}>
        <div className="pdp-stick-inner">
          <div className="pdp-stick-t">
            <b>{product.diwaliPrice || inr(hubCost)}</b>
            {product.isComingSoon ? 'Coming Soon · Priority Allocation' : `Live ${product.kw} station`} · {product.expectedEarnings5Yrs ? `${product.expectedEarnings5Yrs} (5-Yr)` : `~${inr(monthlyPayout)}/mo`} · payback {product.paybackPeriod || '1.4–2 yrs'}
          </div>
          <button 
            type="button" 
            className="pdp-stick-btn" 
            onClick={() => setModalOpen(true)}
            style={product.isComingSoon ? { background: '#D97706', borderColor: '#B45309' } : {}}
          >
            {product.isComingSoon ? 'Pre-Register' : 'Buy now'}
          </button>
        </div>
      </div>

      {/* ══ MODAL ══ */}
      {modalOpen && createPortal(
        <div className="pdp-modal-bg" onClick={e => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="pdp-modal">
            <button className="pdp-modal-close" onClick={() => setModalOpen(false)}>✕</button>

            {submitted ? (
              <div className="pdp-modal-success">
                <div className="check-ic"><ShieldCheck size={28} color="#16a34a" /></div>
                <h3>{product.isComingSoon ? 'Pre-Registration Confirmed!' : 'Booking Confirmed & Verified!'}</h3>
                
                {product.isComingSoon ? (
                  <div style={{ background: '#f8fafc', padding: 16, borderRadius: 10, margin: '14px 0', border: '1px solid #e2e8f0', textAlign: 'left', fontSize: 13 }}>
                    <p style={{ margin: '0 0 10px 0', color: '#0f172a', fontWeight: 600 }}>
                      Thank you, {form.name}!
                    </p>
                    <p style={{ margin: 0, color: '#475569', lineHeight: 1.6 }}>
                      Your pre-registration for <b>{product.name}</b> has been received. Our investment desk will contact you at <b>{form.phone}</b> with draft concession documents and priority allotment notice prior to official launch.
                    </p>
                  </div>
                ) : (
                  <div style={{ background: '#f8fafc', padding: 14, borderRadius: 10, margin: '14px 0', border: '1px solid #e2e8f0', textAlign: 'left', fontSize: 13 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ color: '#64748b' }}>Payment ID:</span>
                      <b style={{ fontFamily: 'monospace', color: '#0f172a' }}>{payData?.paymentId}</b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ color: '#64748b' }}>Order ID:</span>
                      <b style={{ fontFamily: 'monospace', color: '#0f172a' }}>{payData?.orderId}</b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ color: '#64748b' }}>Amount Paid:</span>
                      <b style={{ color: '#16a34a' }}>{inr(payData?.amount)}</b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Date & Time:</span>
                      <span>{payData?.date} at {payData?.time}</span>
                    </div>
                  </div>
                )}

                <p style={{ fontSize: 12, color: 'var(--mute)', lineHeight: 1.5 }}>
                  {product.isComingSoon
                    ? 'MegaCharge Owner Desk will assist you with corridor traffic projections and contract term sheets.'
                    : 'Payment verified with Razorpay HMAC-SHA256 signature. Our executive team will contact you within 24 hours with onboarding documents.'}
                </p>
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <a
                    href={`https://wa.me/919289555890?text=${encodeURIComponent(
                      product.isComingSoon 
                        ? `Hi MegaCharge, I have pre-registered for ${product.name}. Please share corridor feasibility details.`
                        : `Hi MegaCharge, I just completed payment of ${inr(payData?.amount)} for ${product.name}. Payment ID: ${payData?.paymentId}. Please share onboarding documents.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-buy"
                    style={{ flex: 1, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#25D366' }}
                  >
                    <MessageCircle size={16} /> WhatsApp Support
                  </a>
                  <button
                    type="button"
                    className="btn btn-line"
                    onClick={() => { setModalOpen(false); setSubmitted(false); setPayData(null); }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2>{product.isComingSoon ? 'Pre-Register for Priority Allocation' : 'Book this station'}</h2>
                <div className="pdp-modal-sum">
                  <div className="row"><span>Station</span><span>{product.name}</span></div>
                  <div className="row"><span>Status</span><span className="earn" style={{ color: product.isComingSoon ? '#D97706' : 'var(--green)' }}>{product.status || 'Live'}</span></div>
                  <div className="row"><span>Corridor</span><span>{product.location?.split(',')[0]}</span></div>
                </div>

                {payError && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '10px 14px', borderRadius: 8, fontSize: 12, margin: '12px 0', textAlign: 'left' }}>
                    <b>Payment Notice:</b> {payError}
                  </div>
                )}

                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!form.name.trim() || !form.phone.trim()) {
                    alert('Please fill Name and Phone.');
                    return;
                  }
                  if (product.isComingSoon) {
                    setSubmitted(true);
                    return;
                  }
                  handlePay(e);
                }}>
                  <label>Full Name *</label>
                  <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} required />
                  <label>Phone *</label>
                  <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} required />
                  <label>Email (optional)</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} />
                  <label>Message (optional)</label>
                  <textarea placeholder={product.isComingSoon ? "Any specific investor queries or preferred allocation…" : "Any questions…"} value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} />
                  
                  <button 
                    type="submit" 
                    className="btn btn-buy" 
                    style={{ marginTop: 16, ...(product.isComingSoon ? { background: '#D97706', borderColor: '#B45309' } : {}) }} 
                    disabled={paying}
                  >
                    {product.isComingSoon ? 'Submit Pre-Registration →' : (
                      <>
                        {payStage === 'creating_order' && 'Creating Secure Order…'}
                        {payStage === 'awaiting_payment' && 'Awaiting Razorpay…'}
                        {payStage === 'verifying' && 'Verifying Signature…'}
                        {!payStage && (paying ? 'Processing…' : `Continue to payment →`)}
                      </>
                    )}
                  </button>

                  <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, color: '#64748b' }}>
                    <Lock size={12} color="#16a34a" /> {product.isComingSoon ? 'Zero Cost Pre-Registration · Priority Notification' : '256-Bit Encrypted Razorpay Checkout'}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
