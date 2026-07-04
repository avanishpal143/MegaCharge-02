/**
 * ========================================
 * Blog Page Component
 * Purpose:
 * Renders corporate blog entries, press releases,
 * and EV grid infrastructure guidelines.
 *
 * Developer Notes:
 * Uses structured layout cards and text excerpts.
 *
 * ========================================
 */

import React from 'react';
import './BlogPage.css';

/* ==========================================
   BLOG COMPONENT
========================================== */

const BlogPage = () => {
  const POSTS = [
    {
      title: "Corporate Governance & Infrastructure Vision 2027",
      date: "June 24, 2026",
      author: "MNIL Corporate Board",
      category: "Press Release",
      excerpt: "Mega Nirman & Industries Ltd (MNIL) announces its strategic blueprint to align MegaCharge fast-charging networks with solar microgrid installations, targeting net-zero logistics operations by 2028."
    },
    {
      title: "Understanding OCPP 1.6J Central Software Operations",
      date: "May 12, 2026",
      author: "EV Systems R&D Division",
      category: "Technical Guide",
      excerpt: "A deep dive into how OCPP 1.6JSON protocol telemetry maintains continuous connectivity between highway chargers and mobile applications, ensuring automated UPI receipts."
    },
    {
      title: "State Subsidy Guidelines for EV Chargers",
      date: "April 08, 2026",
      author: "Alliances Development Division",
      category: "Regulatory Notice",
      excerpt: "An overview of state-level electricity board permissions and financial subsidies available to franchise partners installing dual-gun DC chargers on national expressways."
    }
  ];

  return (
    <div className="blog-page-container bg-megacharge-dark pt-28 pb-20 px-6">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto mb-16 text-center">
        <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest block mb-2">
          News & Updates
        </span>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-poppins">
          MegaCharge Corporate <span className="text-gradient-green">Insights</span>
        </h1>
        <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
          Read the latest updates from our engineering laboratories, franchise alliance groups, and MNIL corporate press boards.
        </p>
      </section>

      {/* ARTICLES GRID */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {POSTS.map((post, i) => (
          <article 
            key={i}
            className="glass-panel p-6 md:p-8 rounded-3xl border border-megacharge-border flex flex-col justify-between hover:border-megacharge-green transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-megacharge-green text-[10px] bg-megacharge-green bg-opacity-10 px-2.5 py-1 rounded font-bold uppercase">
                  {post.category}
                </span>
                <span className="text-megacharge-text-secondary text-[11px]">{post.date}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3 font-poppins leading-snug">{post.title}</h3>
              <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
            </div>
            
            <div className="border-t border-megacharge-border pt-4 flex items-center justify-between">
              <span className="text-megacharge-text-secondary text-xs font-mono">By: {post.author}</span>
              <button className="text-megacharge-green hover:underline text-xs font-bold font-poppins">
                Read Article &rarr;
              </button>
            </div>
          </article>
        ))}
      </section>

    </div>
  );
};

export default BlogPage;
