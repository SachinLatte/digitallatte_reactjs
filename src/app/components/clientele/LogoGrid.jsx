"use client";

import { getAssetPath } from "../../../utils/assetPath";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import clienteleLogos from "../../../data/clienteleLogos.json";

const defaultCategories = [
  { id: "top-brands", name: "Top Brands" },
  { id: "beauty", name: "Beauty" },
  { id: "bfsi", name: "BFSI" },
  { id: "fashion-retail", name: "Fashion & Retail" },
  { id: "materials-manufacturing", name: "Materials Manufacturing" },
  { id: "education", name: "Education" },
  { id: "fmcg", name: "FMCG" },
  { id: "health", name: "Health & Pharma" },
  { id: "restaurants", name: "Restaurants" },
  { id: "real-estate", name: "Real Estate" },
  { id: "sports", name: "Sports" },
  { id: "sporting-equipments", name: "Sporting Equipments" },
  { id: "B2B", name: "B2B" },
  { id: "travel-hospitality", name: "Travel-Hospitality" },
  { id: "web-mobile-IT", name: "Web-App-IT" },
  { id: "events", name: "Events & Entertainment" },
  { id: "non-profit-organization", name: "Non Profit Organization" },
  { id: "others", name: "Others" },
];

export default function LogoGrid() {
  const [activeCategory, setActiveCategory] = useState("top-brands");
  const [categories, setCategories] = useState(defaultCategories);
  const [dynamicClients, setDynamicClients] = useState(null);

  // Fetch dynamic clientele data
  useEffect(() => {
    async function loadClientele() {
      try {
        const res = await fetch("/api/clientele");
        const data = await res.json();
        if (data.success) {
          if (data.categories && data.categories.length > 0) {
            setCategories(data.categories);
          }
          if (data.clients && data.clients.length > 0) {
            setDynamicClients(data.clients);
          }
        }
      } catch (err) {
        console.warn("[LogoGrid] Using local fallback clientele:", err);
      }
    }
    loadClientele();
  }, []);

  // Compute active logos from dynamic clients if available, or static JSON fallback
  let activeLogos = [];
  if (dynamicClients && dynamicClients.length > 0) {
    activeLogos = dynamicClients
      .filter((c) => c.category === activeCategory)
      .map((c) => ({
        src: c.logo,
        name: c.name,
      }));
  } else {
    const staticPaths = clienteleLogos[activeCategory] || [];
    activeLogos = staticPaths.map((logoPath) => {
      const filename = logoPath.split("/").pop() || "";
      const brandName = filename
        .replace("-logo", "")
        .replace("-", " ")
        .split(".")[0];
      return {
        src: logoPath,
        name: brandName,
      };
    });
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Sector Selector (Dropdown style matching live site) */}
      <div className="w-full flex justify-center mb-16 w769:mb-10 px-4">
        <div className="flex items-center justify-center w-full max-w-lg select-none">
          {/* Label Span */}
          <span className="bg-[#16110f] text-white text-[15px] w480:text-[13px] px-[18px] py-[10px] inline-block font-sans font-normal border border-[#16110f] select-none whitespace-nowrap">
            Filter By Sector
          </span>
          {/* Dropdown Selector */}
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="font-sans w-[55%] w480:w-[65%] px-[12px] py-[10.5px] text-[15px] w480:text-[13px] text-black bg-white outline-none border border-[#16110f] hover:border-[#ff9000] focus:border-[#ff9000] cursor-pointer transition-colors duration-300 rounded-none"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="text-black bg-white">
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Responsive Logo Grid */}
      <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] grid grid-cols-4 w1025:grid-cols-3 w769:grid-cols-2 gap-8 px-4">
        {activeLogos.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#ddd] flex items-center justify-center p-6 h-[230px] w1281:h-[160px] w769:h-[130px] border border-transparent hover:shadow-xl transition duration-300 relative group overflow-hidden"
          >
            <div className="w-full h-full flex items-center justify-center relative">
              {/* Brand Logo */}
              <Image
                src={getAssetPath(item.src)}
                alt={`${item.name} Logo`}
                width={180}
                height={90}
                className="max-h-[55%] max-w-[75%] w-auto h-auto object-contain relative z-10 transition-all duration-300 select-none group-hover:scale-105"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
        ))}

        {activeLogos.length === 0 && (
          <div className="col-span-full py-16 bg-[#16110f] text-center text-neutral-400 uppercase tracking-widest text-xs font-semibold rounded-2xl">
            No brand logos found in this sector.
          </div>
        )}
      </div>
    </div>
  );
}
