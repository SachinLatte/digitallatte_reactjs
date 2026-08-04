"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function WorkShowcaseCarousel({ 
  items = [], 
  slidesPerView = 3, 
  loop = true, 
  autoplay = false 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Open Lightbox
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  // Close Lightbox
  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  // Navigate Prev
  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  }, [items.length]);

  // Navigate Next
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  }, [items.length]);

  // Handle Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeLightbox, handlePrev, handleNext]);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full relative px-10 w769:px-6">
      {/* Custom Left Navigation Arrow */}
      <button className="prev-work-btn absolute left-0 top-[50%] -translate-y-[50%] z-20 text-[#bfbfbf] hover:text-[#16110f] active:text-[#ff9000] transition-colors duration-300 cursor-pointer select-none text-[32px] w769:text-[24px]">
        <FiChevronLeft className="stroke-[1.5]" />
      </button>

      {/* Custom Right Navigation Arrow */}
      <button className="next-work-btn absolute right-0 top-[50%] -translate-y-[50%] z-20 text-[#bfbfbf] hover:text-[#16110f] active:text-[#ff9000] transition-colors duration-300 cursor-pointer select-none text-[32px] w769:text-[24px]">
        <FiChevronRight className="stroke-[1.5]" />
      </button>

      {/* 1. Swiper Slider */}
      <div className="recent-work-swiper-container relative py-2">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={slidesPerView}
          loop={loop}
          autoplay={autoplay ? { delay: 4000, disableOnInteraction: false } : false}
          navigation={{
            prevEl: ".prev-work-btn",
            nextEl: ".next-work-btn",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="w-full select-none"
        >
          {items.map((item, idx) => (
            <SwiperSlide key={idx} className="flex justify-center items-center py-2">
              <div 
                onClick={() => openLightbox(idx)}
                className="w-full aspect-square overflow-hidden cursor-zoom-in group"
              >
                <img 
                  src={item.thumb || item.src} 
                  alt={item.title || `Portfolio creative ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/95 flex flex-col justify-between select-none">
          
          {/* Header Bar */}
          <div className="w-full flex justify-between items-center px-6 py-4 text-white bg-black/40 backdrop-blur-sm relative z-50">
            <span className="text-sm font-semibold tracking-wider font-sans select-none">
              {currentIndex + 1} / {items.length}
            </span>
            <button 
              onClick={closeLightbox}
              className="text-white hover:text-[#ff9000] text-3xl focus:outline-none transition-colors duration-300 cursor-pointer"
              title="Close Lightbox"
            >
              <IoCloseOutline size={36} />
            </button>
          </div>

          {/* Center Content: Left arrow, Active image, Right arrow */}
          <div className="flex-grow flex items-center justify-between px-4 sm:px-12 relative">
            
            {/* Left Prev Arrow Button */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 text-white hover:text-[#ff9000] z-50 bg-black/50 hover:bg-black/80 p-3 rounded-full transition-all duration-300 focus:outline-none cursor-pointer"
              title="Previous Image"
            >
              <IoChevronBackOutline size={28} />
            </button>

            {/* Main Active Image wrapper */}
            <div className="mx-auto max-w-[85%] max-h-[75vh] flex items-center justify-center p-2">
              <img 
                src={items[currentIndex].src} 
                alt={items[currentIndex].title || `Lightbox creative ${currentIndex + 1}`}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl animate-fade-in transition-all duration-300"
              />
            </div>

            {/* Right Next Arrow Button */}
            <button 
              onClick={handleNext}
              className="absolute right-4 sm:right-8 text-white hover:text-[#ff9000] z-50 bg-black/50 hover:bg-black/80 p-3 rounded-full transition-all duration-300 focus:outline-none cursor-pointer"
              title="Next Image"
            >
              <IoChevronForwardOutline size={28} />
            </button>

          </div>

          {/* Footer Text Bar */}
          <div className="w-full text-center py-4 bg-black/40 backdrop-blur-sm text-neutral-400 text-xs font-libre font-light select-none">
            {items[currentIndex].title || "Digital Latte Creatives"}
          </div>

        </div>
      )}

      {/* Global CSS tweaks to styling navigation arrows & dots of Swiper */}
      <style jsx global>{`
        .recent-work-swiper-container .swiper-button-next,
        .recent-work-swiper-container .swiper-button-prev {
          color: #bfbfbf !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          width: auto !important;
          height: auto !important;
          transition: all 0.3s;
        }
        .recent-work-swiper-container .swiper-button-next:hover,
        .recent-work-swiper-container .swiper-button-prev:hover {
          color: #ff9000 !important;
        }
        .recent-work-swiper-container .swiper-button-next::after,
        .recent-work-swiper-container .swiper-button-prev::after {
          font-size: 28px !important;
          font-weight: bold;
        }
        .recent-work-swiper-container .swiper-pagination-bullet-active {
          background: #ff9000 !important;
        }
        .recent-work-swiper-container .swiper-pagination {
          position: relative !important;
          bottom: -15px !important;
        }
        .animate-fade-in {
          animation: fadeIn 0.35s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>
  );
}
