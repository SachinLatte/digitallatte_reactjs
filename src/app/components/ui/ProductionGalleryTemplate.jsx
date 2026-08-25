"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuPlay,
  LuPlus,
  LuArrowLeft,
  LuArrowRight
} from "react-icons/lu";
import ContactSection from "../common/ContactSection";

export default function ProductionGalleryTemplate({
  client,
  bannerTitle,
  projectSummary,
  subheadQuote,
  items = [],
  prevPortfolio,
  nextPortfolio
}) {
  const [activeTab, setActiveTab] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Filter items based on active tab
  const filteredItems = items.filter((item) => {
    if (activeTab === "images") return item.type === "image";
    if (activeTab === "videos") return item.type === "video";
    return true;
  });

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  }, [lightboxIndex, filteredItems.length]);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, showPrev, showNext]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white select-none">

      {/* 1. Header Banner */}
      <section className="w-full bg-[#ececec] pt-32 pb-16 flex items-center justify-center min-h-[300px]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <h1 className="text-left font-sans text-[48px] w1470:text-[38px] w1281:text-[32px] w769:text-[24px] uppercase tracking-[1px] leading-tight">
            <span className="text-[#ff9000] font-bold">
              {bannerTitle?.highlight || client}
            </span>{" "}
            <span className="text-[#181414] font-medium">
              {bannerTitle?.regular || "Portfolio"}
            </span>
          </h1>
        </div>
      </section>

      {/* 2. Breadcrumbs */}
      <div className="w-full bg-white py-6 select-none border-b border-neutral-100">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-2 font-libre font-medium text-[14px] text-[#000] tracking-[1.5px] flex items-center flex-wrap gap-1 select-none">
          <Link href="/what-we-brew" className="hover:text-[#ff9000] transition-colors">
            Our Expertise
          </Link>
          <Image
            src="/img/right_arrow_new.png"
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1"
          />
          <Link href="/our-expertise/production-services" className="hover:text-[#ff9000] transition-colors">
            Photography &amp; Video Production
          </Link>
          <Image
            src="/img/right_arrow_new.png"
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1"
          />
          <span className="text-[#ff9000] font-medium">{client} Portfolio</span>
        </div>
      </div>

      {/* 3. Project Summary Info Section */}
      <section className="w-full py-20 bg-[#16110f] text-white">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="flex flex-row w769:flex-col items-start gap-12 w769:gap-8">
            {/* Left: Client Info */}
            <div className="w-1/4 w769:w-full flex flex-col justify-start">
              <span className="font-sans text-[18px] w769:text-[16px] text-[#ff9000] font-bold block mb-2">
                Client:
              </span>
              <p className="font-sans font-bold text-[32px] w1281:text-[26px] w769:text-[22px] text-white leading-tight">
                {client}
              </p>
              <div className="w-14 h-[3px] bg-[#ff9000] mt-3" />
            </div>

            {/* Right: Project Summary Copy */}
            <div className="w-3/4 w769:w-full flex flex-col justify-start">
              <h2 className="font-sans font-bold text-[32px] w1281:text-[26px] w769:text-[22px] text-[#ff9000] mb-6 uppercase tracking-wider">
                PROJECT SUMMARY
              </h2>
              <div className="font-libre text-gray-200 text-[16px] w769:text-[14px] leading-[1.8] flex flex-col gap-6 font-light text-justify">
                {projectSummary?.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Photo & Video Gallery Section */}
      <section className="w-full py-12 bg-white" id="gallery-section">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          {/* Subheading Quote */}
          {subheadQuote && (
            <div className="text-center max-w-4xl mx-auto mb-14">
              <h2 className="font-sans font-normal text-[26px] w1281:text-[22px] w769:text-[18px] text-[#16110f] leading-relaxed tracking-normal">
                &lsquo;{subheadQuote}&rsquo;
              </h2>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-8 mb-12 border-b border-neutral-200 pb-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`font-sans uppercase text-[15px] font-semibold tracking-wider transition-all duration-300 relative py-2 cursor-pointer ${
                activeTab === "all" ? "text-[#ff9000]" : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <span>All</span>
              {activeTab === "all" && (
                <div className="absolute bottom-[-17px] left-0 w-full h-[3px] bg-[#ff9000]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("images")}
              className={`font-sans uppercase text-[15px] font-semibold tracking-wider transition-all duration-300 relative py-2 cursor-pointer ${
                activeTab === "images" ? "text-[#ff9000]" : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <span>Image gallery</span>
              {activeTab === "images" && (
                <div className="absolute bottom-[-17px] left-0 w-full h-[3px] bg-[#ff9000]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("videos")}
              className={`font-sans uppercase text-[15px] font-semibold tracking-wider transition-all duration-300 relative py-2 cursor-pointer ${
                activeTab === "videos" ? "text-[#ff9000]" : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <span>Video gallery</span>
              {activeTab === "videos" && (
                <div className="absolute bottom-[-17px] left-0 w-full h-[3px] bg-[#ff9000]" />
              )}
            </button>
          </div>

          {/* Gallery Items Grid */}
          <div className="grid grid-cols-4 w1281:grid-cols-3 w769:grid-cols-2 w501:grid-cols-1 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id || index}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Thumbnail Image */}
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 501px) 100vw, (max-width: 769px) 50vw, (max-width: 1281px) 33vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Hover Shade Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {item.type === "video" ? (
                    <div className="w-14 h-14 rounded-full bg-[#ff9000] text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <LuPlay className="w-6 h-6 fill-current ml-1" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/90 text-[#16110f] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <LuPlus className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Bottom Info Banner */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-sans font-bold text-[14px] leading-tight mb-1 truncate text-[#ff9000]">
                    {item.title}
                  </h3>
                  <p className="font-libre text-[12px] text-gray-200">
                    {item.subtitle || (item.type === "video" ? "Play Video" : "View Large")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LightGallery Interactive Lightbox Modal */}
      {lightboxIndex !== null && currentItem && (
        <div
          className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none"
          onClick={closeLightbox}
        >
          {/* Top Bar Controls */}
          <div
            className="absolute top-6 left-6 right-6 flex items-center justify-between z-50 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-sans font-bold text-sm tracking-wider uppercase text-[#ff9000]">
                {currentItem.title}
              </span>
              <span className="text-neutral-500 text-sm">|</span>
              <span className="text-neutral-400 text-sm font-sans">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-white/10 hover:bg-[#ff9000] hover:text-white transition-colors duration-300 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <LuX className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Main Content */}
          <div
            className="relative w-full max-w-5xl h-[75vh] flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.type === "video" && currentItem.youtubeId ? (
              <div className="w-full h-full max-w-4xl max-h-[540px] aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${currentItem.youtubeId}?autoplay=1&rel=0`}
                  title={currentItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={currentItem.src}
                  alt={currentItem.title}
                  fill
                  sizes="100vw"
                  className="object-contain max-h-full max-w-full drop-shadow-2xl"
                  priority
                />
              </div>
            )}
          </div>

          {/* Lightbox Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous item"
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#ff9000] text-white transition-colors duration-300 cursor-pointer z-50"
          >
            <LuChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next item"
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#ff9000] text-white transition-colors duration-300 cursor-pointer z-50"
          >
            <LuChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* 6. Prev / Next Portfolio Bottom Bar */}
      <section className="w-full bg-[#16110f] border-t border-neutral-800 text-white select-none">
        <div className="w-full flex flex-row w769:flex-col">
          {prevPortfolio ? (
            <Link
              href={prevPortfolio.slug}
              className="w-1/2 w769:w-full py-12 px-8 flex items-center justify-center gap-4 group border-r w769:border-r-0 w769:border-b border-neutral-800 hover:bg-neutral-900 transition-colors"
            >
              <LuArrowLeft className="w-6 h-6 text-[#ff9000] group-hover:-translate-x-2 transition-transform duration-300" />
              <div className="text-left">
                <span className="block text-xs uppercase tracking-widest text-neutral-400">Previous Portfolio</span>
                <span className="font-sans font-bold text-[20px] text-white group-hover:text-[#ff9000] transition-colors">
                  {prevPortfolio.clientName || prevPortfolio.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="w-1/2 w769:w-full" />
          )}

          {nextPortfolio ? (
            <Link
              href={nextPortfolio.slug}
              className="w-1/2 w769:w-full py-12 px-8 flex items-center justify-center gap-4 group hover:bg-neutral-900 transition-colors"
            >
              <div className="text-right">
                <span className="block text-xs uppercase tracking-widest text-neutral-400">Next Portfolio</span>
                <span className="font-sans font-bold text-[20px] text-white group-hover:text-[#ff9000] transition-colors">
                  {nextPortfolio.clientName || nextPortfolio.title}
                </span>
              </div>
              <LuArrowRight className="w-6 h-6 text-[#ff9000] group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          ) : (
            <div className="w-1/2 w769:w-full" />
          )}
        </div>
      </section>

      {/* 7. CTA Let's Talk */}
      <ContactSection
        title="Let's Brew Great Creative Content"
        subtitle="Need professional photoshoot or videography production for your brand? Let's connect over coffee."
        theme="dark"
      />
    </main>
  );
}
