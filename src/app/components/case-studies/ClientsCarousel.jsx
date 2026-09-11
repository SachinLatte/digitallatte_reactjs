"use client";

import { getAssetPath } from "../../../utils/assetPath";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { clients } from "../../../data/clientele";

// Import Swiper styles
import "swiper/css";

export default function ClientsCarousel({ title = "OUR CLIENTS" }) {
  const clientLogos = clients.map((c) => c.logo);

  const renderTitle = () => {
    if (!title) return null;
    const parts = title.trim().split(" ");
    if (parts.length === 1) {
      return <strong className="font-bold">{parts[0]}</strong>;
    }
    return (
      <>
        <strong className="font-bold">{parts[0]}</strong> {parts.slice(1).join(" ")}
      </>
    );
  };

  return (
    <section className="py-20 w769:py-16 w501:py-12 bg-white border-t border-b border-[#ff9000] select-none relative w-full overflow-hidden">

      {/* Title */}
      <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto text-center mb-12 select-none">
        <h2 className="text-[38px] w769:text-[20px] tracking-[1px] font-light text-[#211a0f] uppercase">
          {renderTitle()}
        </h2>
      </div>

      {/* Carousel Container with Fades */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade Overlay */}
        <div className="absolute top-0 bottom-0 left-0 w-48 w1025:w-32 w769:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />

        {/* Right Fade Overlay */}
        <div className="absolute top-0 bottom-0 right-0 w-48 w1025:w-32 w769:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        {/* Carousel Slider */}
        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={30}
          loop={true}
          speed={3500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            769: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
            1025: {
              slidesPerView: 6,
              spaceBetween: 60,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 50,
            }
          }}
          className="w-full flex items-center justify-center pointer-events-none"
        >
          {clientLogos.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center h-[90px] w501:h-[70px]">
              <Image
                src={getAssetPath(logo)}
                alt="Client Logo"
                width={160}
                height={60}
                className="max-h-[60px] max-w-[160px] w-auto h-auto object-contain select-none transition-transform duration-300"
                style={{ width: "auto", height: "auto" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
