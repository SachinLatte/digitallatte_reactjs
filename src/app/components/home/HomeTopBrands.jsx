"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/assetPath";
import { clients as defaultClients } from "@/data/clientele";

export default function HomeTopBrands({ initialClients = defaultClients }) {
  const [brands, setBrands] = useState(initialClients);

  useEffect(() => {
    async function loadHomeClients() {
      try {
        const res = await fetch("/api/clientele?showOnHome=true");
        const data = await res.json();
        if (data.success && Array.isArray(data.clients) && data.clients.length > 0) {
          setBrands(data.clients);
        }
      } catch (err) {
        console.warn("[HomeTopBrands] Using fallback clients:", err);
      }
    }
    loadHomeClients();
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w501:gap-6 auto-rows-[230px] w1101:auto-rows-auto w501:auto-rows-[190px] w-full">
        {brands.map((brand, i) => (
          <div
            key={brand.id || brand._id || i}
            className="relative flex items-center justify-center p-6 bg-[#ddd] rounded-lg transition-all duration-300 group hover:bg-white"
          >
            <Image
              src={getAssetPath(brand.logo)}
              alt={brand.name}
              width={180}
              height={100}
              className="max-h-[140px] max-w-[80%] w-auto h-auto object-contain transition duration-500 group-hover:scale-105"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/clientele"
          className="px-7 py-3 mt-5 w501:mt-0 border border-white text-white rounded-full text-[13px] font-semibold uppercase tracking-[2px] hover:bg-white hover:text-[#16110f] transition-all duration-300 inline-block text-center cursor-pointer hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        >
          Load More
        </Link>
      </div>
    </div>
  );
}
