/**
 * ========================================
 * Projects Page Component
 * Purpose:
 * Renders case studies and commercial deployment
 * portfolios across Indian states.
 *
 * Developer Notes:
 * Integrates visual status labels and details grids.
 *
 * ========================================
 */

import React from 'react';
import './ProjectsPage.css';

/* ==========================================
   PROJECTS COMPONENT
========================================== */

const ProjectsPage = () => {
  const PROJECTS = [
    {
      title: "Delhi-NCR Commercial Hub Integration",
      client: "DLF Cyber City & Commercial Segments",
      type: "Commercial",
      desc: "Deployed 14 smart AC wallboxes and 4 high-speed 60 kW DC chargers across multi-level corporate parking zones. Integrated with local building management grid limits.",
      stats: { bays: "18 active bays", power: "DC 60kW / AC 7.4kW", uptime: "99.9%" }
    },
    {
      title: "NH44 Highway Corridor Grid - Phase 1",
      client: "National Highway Alliances Program",
      type: "Highway Corridor",
      desc: "Established 6 ultra-fast charging plazas along the Delhi-Karnal highway. Every stopway houses 180 kW dual-gun CCS2 rapid rectifiers with active liquid cooling.",
      stats: { bays: "12 high-power bays", power: "DC 180kW Ultra Fast", uptime: "99.8%" }
    },
    {
      title: "E-Commerce Last-Mile Depot Hub",
      client: "Express Logistics Fleet Operator",
      type: "Fleet Depot",
      desc: "Designed and engineered a dynamic load-balancing charger depot for a fleet of 45 electric delivery vans. Prevents substation peak overload through smart sequencing.",
      stats: { bays: "24 fleet slots", power: "DC 30kW split rectifiers", uptime: "100%" }
    }
  ];

  return (
    <div className="projects-page-container bg-megacharge-dark pt-28 pb-20 px-6">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto mb-16 text-center">
        <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest block mb-2">
          Case Studies
        </span>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-poppins">
          Our Infrastructure <span className="text-gradient-green">Deployments</span>
        </h1>
        <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
          Explore large-scale charging grids designed and maintained by MegaCharge engineering divisions across major commercial, highway, and fleet depots.
        </p>
      </section>

      {/* PROJECTS LIST GRID */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROJECTS.map((project, i) => (
          <div 
            key={i}
            className="glass-panel p-6 md:p-8 rounded-3xl border border-megacharge-border flex flex-col justify-between hover:border-megacharge-green transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] text-megacharge-green bg-megacharge-green bg-opacity-10 px-3 py-1 rounded font-bold uppercase">
                  {project.type}
                </span>
                <span className="text-megacharge-text-secondary text-[11px] font-mono">Uptime: {project.stats.uptime}</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-2 font-poppins">{project.title}</h3>
              <span className="text-megacharge-text-secondary text-xs block mb-4">Client: <strong>{project.client}</strong></span>
              <p className="text-megacharge-text-secondary text-xs sm:text-sm leading-relaxed mb-6">
                {project.desc}
              </p>
            </div>

            <div className="border-t border-megacharge-border pt-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-megacharge-text-secondary text-[10px] block">Capacity</span>
                <span className="text-white text-xs font-bold font-poppins">{project.stats.power}</span>
              </div>
              <div>
                <span className="text-megacharge-text-secondary text-[10px] block">Bays Installed</span>
                <span className="text-white text-xs font-bold font-poppins">{project.stats.bays}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default ProjectsPage;
