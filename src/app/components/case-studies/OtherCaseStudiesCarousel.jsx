"use client";

import { getAssetPath } from "../../../utils/assetPath";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { otherCaseStudies } from "../../../data/caseStudiesBrandingData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function OtherCaseStudiesCarousel({ currentSlug = "" }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Filter out current case study
  const list = otherCaseStudies.filter(
    (item) => !item.slug.includes(currentSlug)
  );

  return (
    <section className="py-20 w769:py-14 bg-white select-none w-full">
      <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
        {/* Header matching reference */}
        <h2 className="text-center font-sans text-[34px] w1281:text-[28px] w769:text-[22px] uppercase text-[#181414] tracking-wide mb-12">
          <span className="font-bold">OTHER</span>{" "}
          <span className="font-light">CASE STUDIES</span>
        </h2>

        {/* Carousel Wrapper with Custom Arrow Navigation */}
        <div className="relative w-full px-2 sm:px-8">
          {/* Left Arrow Button */}
          <button
            ref={prevRef}
            aria-label="Previous case study"
            className="absolute left-[-20px] sm:left-[-15px] top-1/2 -translate-y-1/2 z-30 text-neutral-400 hover:text-neutral-800 transition-colors p-2 cursor-pointer"
          >
            <LuChevronLeft className="w-8 h-8" />
          </button>

          {/* Right Arrow Button */}
          <button
            ref={nextRef}
            aria-label="Next case study"
            className="absolute right-[-20px] sm:right-[-15px] top-1/2 -translate-y-1/2 z-30 text-neutral-400 hover:text-neutral-800 transition-colors p-2 cursor-pointer"
          >
            <LuChevronRight className="w-8 h-8" />
          </button>

          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={1.2}
            spaceBetween={20}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              540: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              850: {
                slidesPerView: 3,
                spaceBetween: 24
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 24
              }
            }}
            className="w-full"
          >
            {list.map((item, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={item.slug}
                  className="group relative block w-full h-[360px] sm:h-[380px] md:h-[400px] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-neutral-100"
                >
                  {/* Thumbnail Image */}
                  <Image
                    src={getAssetPath(item.image)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Dark Gradient Overlay with Title at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 flex items-end p-5">
                    <h3 className="text-white font-sans font-medium text-[16px] sm:text-[17px] leading-snug transform group-hover:-translate-y-1 transition-transform duration-300">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
