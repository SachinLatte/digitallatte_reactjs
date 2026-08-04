"use client";

import React, { useState, useEffect } from "react";

export default function CaseStudiesGrid() {
  const [visibleCount, setVisibleCount] = useState(3);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // 1. Left Column Items (Total: 7)
  const leftColumnProjects = [
    {
      slug: "digital-marketing-case-study-tim-hortons-branding",
      image: "/img/case-studies/tim-hortons/tim-hortons-case-study-thumb.webp",
      title: "Tim Hortons",
      description: "Tim Hortons®, a global iconic coffee",
    },
    {
      slug: "digital-marketing-case-study-kaziranga-university-branding",
      image: "/img/case-studies/kaziranga-university/kaziranga-case-study-thumb.webp",
      title: "It all starts at Kaziranga University",
      description: "Kaziranga University, a prestigious educational",
    },
    {
      slug: "digital-marketing-ugc-case-study-thanks-to-suhana",
      image: "/img/thanx__to__suhana.jpg",
      title: "#ThanksToSuhana",
      description: "To leverage User Generated Content...",
    },
    {
      slug: "digital-marketing-case-study-paltan-sobat-aarti",
      image: "/img/Case_Studies_paltan.jpg",
      title: "#PaltanSobatAarti",
      description: "Engage with the fans during...",
    },
    {
      slug: "digital-marketing-case-study-puneri-paltan",
      image: "/img/pune-study.jpg",
      title: "ABC OF KABADDI",
      description: "Increase fan loyalty and engagement",
    },
    {
      slug: "digital-marketing-case-study-bengal-warriors",
      image: "/img/bengal-warriors-study.jpg",
      title: "workout with the warriors",
      description: "Sustaining off-season buzz and fan loyalty.",
    },
    {
      slug: "digital-marketing-case-study-readify",
      image: "/img/case_study2.jpg",
      title: "Connecting Through Design",
      description: "To create a visual identity for Readify to evoke...",
    }
  ];

  // 2. Right Column Items (Total: 8)
  const rightColumnProjects = [
    {
      slug: "digital-marketing-case-study-kumar-resorts",
      image: "/img/case-studies/kumar-resorts/kumar-resorts-thumb-img.webp",
      title: "From Nostalgia to New Beginnings",
      description: "For every Millennial in Mumbai and Pune...",
    },
    {
      slug: "digital-marketing-case-study-patna-pirates",
      image: "/img/case-studies/patna-pirates/patna-pirates-case-study-thumb.webp",
      title: "Redefining Sports Marketing",
      description: "Patna Pirates is one of the most successful...",
    },
    {
      slug: "digital-marketing-case-study-puneri-paltan-branding",
      image: "/img/case-studies/puneri-paltan-branding/puneri-paltan-case-study-thumb.webp",
      title: "Spirit of Pune Pride of Maharashtra",
      description: "Carrying forward Maharashtra's Kabaddi legacy has been Puneri Paltan's...",
    },
    {
      slug: "digital-marketing-instagram-ar-filter-case-study",
      image: "/img/pp__contest__case__study.jpg",
      title: "Instagram AR Filter",
      description: "How a sports brand leveraged AR filter",
    },
    {
      slug: "social-media-case-study-ipl-indian-food-league-campaign",
      image: "/img/case_study_goldee.png",
      title: "Increase engagement around IPL 2020",
      description: "Increase engagement around IPL 2020",
    },
    {
      slug: "digital-marketing-case-study-reevive",
      image: "/img/revive_case_study.jpg",
      title: "#ReeviveALife",
      description: "To build an unique Crowd-Funding Platform...",
    },
    {
      slug: "digital-marketing-case-study-colors-of-freedom",
      image: "/img/indigo-case-study.jpg",
      title: "Colours Of Freedom",
      description: "Promote Muktrang (Colours of Freedom) an initiative by Indigo Paints...",
    },
    {
      slug: "digital-marketing-case-study-shades-of-summer",
      image: "/img/case-study-shades.jpg",
      title: "#Shadesofsummer",
      description: "Generate excitement & sales...",
    }
  ];

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
      <a href={`/case-studies/${project.slug}`} className="block relative w-full h-full overflow-hidden">
        {/* Main image */}
        <img
          src={`${basePath}${project.image}`}
          alt={project.title}
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
      </a>
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
