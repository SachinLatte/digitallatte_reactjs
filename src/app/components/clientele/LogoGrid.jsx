"use client";

import React, { useState } from "react";
import { sectors, clients } from "../../../data/clientele";

export default function LogoGrid() {
  const [activeSector, setActiveSector] = useState("all");

  const filteredClients = activeSector === "all"
    ? clients
    : clients.filter(c => c.sector === activeSector);

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Sector Filter Tabs / Select Options */}
      <div className="w-full max-w-4xl mb-12 px-4">
        
        {/* Desktop Filter Tabs (Visible on md+) */}
        <div className="hidden md:flex flex-wrap justify-center gap-3">
          {sectors.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSector(s.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeSector === s.id
                  ? "bg-[#e07f2a] border-[#e07f2a] text-white shadow-md"
                  : "bg-transparent border-neutral-700 text-neutral-450 hover:border-[#e07f2a] hover:text-[#e07f2a]"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Mobile Filter Dropdown (Visible on mobile) */}
        <div className="md:hidden w-full max-w-xs mx-auto">
          <label htmlFor="sector-filter" className="block text-[11px] font-bold uppercase tracking-widest text-[#e5e5e5] mb-2 text-center">
            Filter By Sector
          </label>
          <select
            id="sector-filter"
            value={activeSector}
            onChange={(e) => setActiveSector(e.target.value)}
            className="w-full bg-[#221f1f] text-white border border-neutral-750 px-4 py-3 rounded-xl focus:border-[#e07f2a] focus:outline-none uppercase text-xs tracking-wider font-bold"
          >
            {sectors.map((s) => (
              <option key={s.id} value={s.id} className="uppercase bg-[#221f1f] text-white">
                {s.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Dynamic Grid of Client Logos */}
      <div className="w-full max-w-[1200px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        {filteredClients.map((client, idx) => (
          <div
            key={idx}
            className="bg-white flex items-center justify-center p-8 aspect-[4/3] group relative hover:z-10 hover:shadow-2xl transition duration-300"
          >
            {/* Fallback image helper (displays logo image, else stylized name) */}
            <div className="w-full h-full flex items-center justify-center relative">
              <span className="absolute inset-0 flex items-center justify-center text-[#16110f] font-bold text-center text-sm md:text-base uppercase tracking-wider group-hover:scale-95 transition-transform duration-300 select-none">
                {client.name}
              </span>
              
              {/* Grayscale layout overlay logo */}
              <img
                src={client.logo}
                alt={`${client.name} Logo`}
                onError={(e) => {
                  e.target.style.display = 'none'; // hide broken images, show the fallback text behind
                }}
                className="max-h-[60%] max-w-[80%] object-contain relative z-10 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out bg-white"
              />
            </div>
          </div>
        ))}

        {filteredClients.length === 0 && (
          <div className="col-span-full py-16 bg-[#16110f] text-center text-neutral-500 uppercase tracking-widest text-sm font-semibold">
            No brands found in this sector.
          </div>
        )}
      </div>

    </div>
  );
}
