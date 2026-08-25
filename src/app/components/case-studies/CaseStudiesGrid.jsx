"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { leftColumnProjects, rightColumnProjects } from "../../../data/caseStudies";

export default function CaseStudiesGrid() {
  const [visibleCount, setVisibleCount] = useState(3);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Slice visible items for each column
  const visibleLeft = leftColumnProjects.slice(0, visibleCount);
  const visibleRight = rightColumnProjects.slice(0, visibleCount);

  // Check if we have more items to load
  const hasMore = visibleCount < Math.max(leftColumnProjects.length, rightColumnProjects.length);

  const handleLoadMore = () => {
    setVisibleCount(Math.max(leftColumnProjects.length, rightColumnProjects.length));
  };

  useEffect(() => {
    if (visibleCount > 3) {
      if (typeof window !== "undefined") {
        if (window.lenis) {
          window.lenis.resize();
        }
        window.dispatchEvent(new Event("resize"));

        // Delayed check to ensure all new images have layout spaces recalculated
        const timer = setTimeout(() => {
          if (window.lenis) {
            window.lenis.resize();
          }
          window.dispatchEvent(new Event("resize"));
        }, 300);

        return () => clearTimeout(timer);
      }
    }
  }, [visibleCount]);

  // Reusable Project Card rendering
  const renderCard = (project) => (
    <div
      key={project.slug}
      className="relative w-full overflow-hidden cursor-pointer group mb-12 select-none border border-neutral-100 shadow-sm"
    >
      <Link href={`/case-studies/${project.slug}`} className="block relative w-full h-full overflow-hidden">
        {/* Main image */}
        <Image
          src={`${basePath}${project.image}`}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-auto object-cover group-hover:scale-105 group-hover:grayscale transition-all duration-500 ease-out"
        />

        {/* Default dark overlay details (Fades out on hover) */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 select-none bg-gradient-to-t from-black/85 via-black/35 to-transparent group-hover:opacity-0 transition-opacity duration-500 ease-out z-10">
          <h4 className="text-white text-[20px] font-sans font-medium mb-2 select-none tracking-wide leading-tight">
            {project.title}
          </h4>
          <p className="text-neutral-300 text-sm text-[15px] leading-relaxed mb-4 font-libre select-none font-light">
            {project.description}
          </p>
          <span className="text-[#ff9000] text-[14px] text-xs font-semibold hover:underline select-none tracking-wider">
            Read More
          </span>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center">

      {/* 2-Column Split Grid */}
      <div className="w-full flex flex-row w769:flex-col justify-between items-start gap-[250px]">

        {/* Left Column (flips to right column values based on HTML order: displayed on left on desktop) */}
        <div className="w-[46%] w769:w-full flex flex-col">
          {visibleLeft.map(renderCard)}
        </div>

        {/* Right Column (displayed on right on desktop) */}
        <div className="w-[46%] w769:w-full flex flex-col">
          {/* Header Card (sitting at the top of Right Column) */}
          <div className="mb-12 mt-4 text-left pr-4 w769:pr-0 select-none">
            <h4 className="text-[40px] w1025:text-[28px] w769:text-[26px] font-sans font-light uppercase text-[#211a0f] leading-[60px] w1025:leading-[36px] select-none tracking-wide">
              <strong className="font-bold">Explore</strong> the best <br className="hidden md:block" /> Digital Marketing Case Studies
            </h4>
          </div>
          {visibleRight.map(renderCard)}
        </div>

      </div>

      {/* Load More Pagination Button */}
      {hasMore && (
        <div className="mt-8 mb-4 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3.5 border border-[#16110f] rounded-full text-xs font-bold uppercase tracking-widest text-[#16110f] bg-transparent hover:bg-[#16110f] hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
          >
            Load More
          </button>
        </div>
      )}

    </div>
  );
}
