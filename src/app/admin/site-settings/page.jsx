"use client";

import React, { useState } from "react";
import { FaSliders, FaFloppyDisk, FaPhone, FaTag } from "react-icons/fa6";

export default function AdminSiteSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff7b00] uppercase tracking-wider mb-1 font-bold">
            <span>System & Settings</span>
            <span>•</span>
            <span>Global Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <FaSliders className="text-[#ff7b00]" />
            Global Site & SEO Settings
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Configure business contact info, tracking IDs (GTM, GA4), social profiles, and SEO defaults.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7b00] hover:bg-[#e06d00] text-white font-semibold text-sm transition-all shadow-lg shadow-[#ff7b00]/25 self-start sm:self-auto cursor-pointer"
        >
          <FaFloppyDisk className="text-xs" />
          <span>Save Changes</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
          Settings configuration saved successfully!
        </div>
      )}

      {/* Settings Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Info Card */}
        <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FaPhone className="text-[#ff7b00] text-sm" />
            Company & Contact Information
          </h2>
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Business Phone</label>
              <input
                type="text"
                defaultValue="+91-9664088787"
                className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff7b00]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Inquiry Email</label>
              <input
                type="email"
                defaultValue="chintan@digitallatte.in"
                className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff7b00]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Office Address</label>
              <textarea
                rows={3}
                defaultValue="Skyline Epitome, Ghatkopar / Andheri, Mumbai 400086, Maharashtra, India"
                className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff7b00]"
              />
            </div>
          </div>
        </div>

        {/* Tracking & Analytics Card */}
        <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FaTag className="text-[#ff7b00] text-sm" />
            Tracking & Analytics IDs
          </h2>
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Google Tag Manager (GTM)</label>
              <input
                type="text"
                defaultValue="GTM-T7NRNDM"
                className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#ff7b00]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Google Analytics 4 (GA4)</label>
              <input
                type="text"
                defaultValue="G-MKQJY21F5V"
                className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#ff7b00]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Meta Pixel ID</label>
              <input
                type="text"
                defaultValue="211014609966458"
                className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#ff7b00]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
