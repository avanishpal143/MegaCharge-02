/**
 * ========================================
 * Careers Page Component
 * Purpose:
 * Showcases corporate values, active job listings,
 * and a resume submission form.
 *
 * Developer Notes:
 * Uses state to manage selected jobs and submission.
 *
 * ========================================
 */

import React, { useState } from 'react';
import './CareersPage.css';

/* ==========================================
   CAREERS COMPONENT
========================================== */

const CareersPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'eng', cv: '' });
  const [submitted, setSubmitted] = useState(false);

  const JOBS = [
    { id: 'eng', title: 'Embedded Firmware Engineer (EV Chargers)', dept: 'R&D', location: 'Delhi NSP Office', type: 'Full-time' },
    { id: 'sales', title: 'Corporate BD Manager (Highway Alliances)', dept: 'Sales', location: 'Mumbai Office', type: 'Full-time' },
    { id: 'ops', title: 'Network Operations Executive (OCPP Telemetry)', dept: 'Operations', location: 'Delhi NSP Office', type: 'Full-time' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="careers-page-container bg-megacharge-dark pt-28 pb-20 px-6">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto mb-16 text-center">
        <span className="text-megacharge-green text-xs font-bold uppercase tracking-widest block mb-2">
          Join the Future
        </span>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-poppins">
          Drive Clean Mobility <span className="text-gradient-green">Forward</span>
        </h1>
        <p className="text-megacharge-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
          Become a part of the engineering division at Mega Nirman & Industries Ltd (MNIL). We build high-voltage hardware and software that powers millions of EV kilometres daily.
        </p>
      </section>

      {/* JOBS LIST */}
      <section className="max-w-4xl mx-auto mb-20">
        <h3 className="text-white text-xl font-bold mb-6">Open Opportunities</h3>
        <div className="flex flex-col gap-4">
          {JOBS.map((job) => (
            <div 
              key={job.id}
              className="glass-panel p-6 rounded-2xl border border-megacharge-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-megacharge-green transition-all duration-300"
            >
              <div>
                <h4 className="text-white font-bold text-base font-poppins">{job.title}</h4>
                <div className="flex items-center gap-4 text-megacharge-text-secondary text-xs mt-1">
                  <span>Dept: {job.dept}</span>
                  <span>&bull;</span>
                  <span>Loc: {job.location}</span>
                  <span>&bull;</span>
                  <span>{job.type}</span>
                </div>
              </div>
              <a href="#cv-form" onClick={() => setFormData({...formData, role: job.id})} className="bg-megacharge-green bg-opacity-10 text-megacharge-green hover:bg-megacharge-green hover:text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-all duration-300">
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SUBMISSION FORM */}
      <section id="cv-form" className="max-w-3xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-megacharge-border">
        <div className="text-center mb-8">
          <h3 className="text-white text-2xl font-bold">Submit Your Application</h3>
          <p className="text-megacharge-text-secondary text-xs mt-1">
            Fill out the details, and our human resources group will review your credentials.
          </p>
        </div>

        {submitted ? (
          <div className="text-center p-8 border border-megacharge-green rounded-2xl bg-megacharge-green bg-opacity-5">
            <span className="text-3xl block mb-3">✓</span>
            <h4 className="text-white font-bold text-lg mb-2">Application Submitted</h4>
            <p className="text-megacharge-text-secondary text-xs leading-relaxed max-w-md mx-auto">
              We have received your application successfully. Our talent division will reach out to you if your background aligns with our engineering grid vacancies.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Your Full Name *</label>
                <input 
                  type="text" required
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
                  placeholder="e.g. Priya Nair"
                />
              </div>
              <div>
                <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Email Address *</label>
                <input 
                  type="email" required
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
                  placeholder="e.g. priya@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Select Position Applying For *</label>
              <select 
                value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
              >
                <option value="eng">Embedded Firmware Engineer</option>
                <option value="sales">Corporate BD Manager</option>
                <option value="ops">Network Operations Executive</option>
                <option value="other">Other / General Application</option>
              </select>
            </div>

            <div>
              <label className="text-megacharge-text-secondary text-xs block mb-2 font-semibold">Resume / CV Link *</label>
              <input 
                type="url" required
                value={formData.cv} onChange={(e) => setFormData({...formData, cv: e.target.value})}
                className="w-full bg-megacharge-dark border border-megacharge-border text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-megacharge-green transition-colors"
                placeholder="Google Drive, Dropbox, or LinkedIn PDF URL"
              />
            </div>

            <button type="submit" className="w-full py-4 bg-megacharge-green hover:bg-opacity-95 text-white font-bold text-xs uppercase rounded-xl transition-all duration-300 shadow-glow-green mt-2">
              Submit Application
            </button>
          </form>
        )}
      </section>

    </div>
  );
};

export default CareersPage;
