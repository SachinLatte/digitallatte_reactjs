"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { getAssetPath } from "../../../utils/assetPath";
import { beyondPillars } from "../../../data/beyondPillars";

export default function BeyondServicesCarousel({
  currentCategory,
  filterCurrent = true,
  titlePrefix = "BEYOND",
  titleHighlight = "AI",
  title,
  className = "",
}) {
  // Filter pillars if currentCategory is provided and filterCurrent is true
  const items = React.useMemo(() => {
    if (filterCurrent && currentCategory) {
      const filtered = beyondPillars.filter(
        (pillar) =>
          pillar.category !== currentCategory &&
          pillar.href !== `/our-expertise/${currentCategory}`
      );
      return filtered.length > 0 ? filtered : beyondPillars;
    }
    return beyondPillars;
  }, [currentCategory, filterCurrent]);

  // Ensure enough slides for seamless Swiper infinite looping
  const slides = items.length < 8 ? [...items, ...items] : items;

  return (
    <section className={`w-full bg-white pt-20 pb-24 select-none overflow-hidden ${className}`}>
      {/* Section Heading */}
      {title ? (
        <h2 className="font-sans text-[42px] w769:text-[30px] uppercase tracking-[3px] text-center text-[#16110f] select-none mb-16">
          {title}
        </h2>
      ) : (
        <h2 className="font-sans text-[42px] w769:text-[30px] uppercase tracking-[3px] text-center text-[#16110f] select-none mb-16">
          <span className="font-light mr-2">{titlePrefix}</span>
          <span className="font-medium">{titleHighlight}</span>
        </h2>
      )}

      {/* Carousel Container */}
      <div className="w-full overflow-hidden select-none">
        <div className="pr-0">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 5,
              },
              1471: {
                slidesPerView: 3.35,
                spaceBetween: 20,
              },
            }}
            className="w-full !overflow-visible"
          >
            {slides.map((pillar, idx) => (
              <SwiperSlide key={`${pillar.title}-${idx}`} className="h-auto">
                <div className="relative rounded-[16px] overflow-hidden bg-[#ebebeb] w-full group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                  {/* Background Image */}
                  <Image
                    src={getAssetPath(pillar.image)}
                    alt={pillar.title}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover object-center transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none block"
                  />

                  {/* Hover Overlay Container */}
                  <div className="absolute inset-0 bg-[#16110f]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-8 w1281:p-6 text-white z-10 rounded-[16px] overflow-y-auto">
                    {/* Category Title */}
                    <h3 className="font-sans text-[42px] w1281:text-[28px] uppercase font-medium tracking-wide text-[#ff9000] mb-4">
                      <Link
                        href={pillar.href}
                        className="text-[#ff9000] hover:text-white transition-colors duration-300"
                      >
                        {pillar.title}
                      </Link>
                    </h3>

                    {/* Description Copy */}
                    <p className="font-libre text-[16px] w1281:text-[16px] text-white leading-relaxed mb-8">
                      <Link
                        href={pillar.href}
                        className="text-white hover:text-neutral-200 transition-colors"
                      >
                        {pillar.desc}
                      </Link>
                    </p>

                    {/* Subservice List links */}
                    <div className="flex flex-row gap-6 w-full text-left">
                      <ul className="w-1/2 flex flex-col gap-3.5 list-none p-0 m-0">
                        {pillar.linksCol1?.map((item, lIdx) => (
                          <li
                            key={lIdx}
                            className="relative pl-3.5 before:content-[''] before:absolute before:left-0 before:top-[11px] before:w-1 before:h-1 before:bg-white before:rounded-none"
                          >
                            <Link
                              href={item.href}
                              className="font-sans text-[16px] w1281:text-[13px] text-[#ff9000] hover:text-white transition-colors duration-200 block leading-[26px] font-normal"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <ul className="w-1/2 flex flex-col gap-3.5 list-none p-0 m-0">
                        {pillar.linksCol2?.map((item, lIdx) => (
                          <li
                            key={lIdx}
                            className="relative pl-3.5 before:content-[''] before:absolute before:left-0 before:top-[11px] before:w-1 before:h-1 before:bg-white before:rounded-none"
                          >
                            <Link
                              href={item.href}
                              className="font-sans text-[16px] w1281:text-[13px] text-[#ff9000] hover:text-white transition-colors duration-200 block leading-[26px] font-normal"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
