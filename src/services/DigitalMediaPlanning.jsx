"use client";

import { getAssetPath } from "../utils/assetPath";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  LuThumbsUp,
  LuMegaphone,
  LuSearch,
  LuTrendingUp,
  LuTarget,
  LuShoppingBag,
  LuLayers,
  LuChevronLeft,
  LuChevronRight
} from "react-icons/lu";
import ContactSection from "../app/components/common/ContactSection";
import BeyondServicesCarousel from "../app/components/common/BeyondServicesCarousel";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";

const otherServices = [
  { slug: "social-media-marketing", title: "Social Media Marketing", icon: LuThumbsUp },
  { slug: "seo", title: "Search Engine Optimization", icon: LuSearch },
  { slug: "amazon-enhanced-brand-content", title: "Enhanced Brand Content", icon: LuLayers },
  { slug: "influencer-marketing", title: "Influencer Campaigns", icon: LuMegaphone },
  { slug: "ecommerce-solutions", title: "Ecommerce Solutions", icon: LuShoppingBag },
  { slug: "digital-strategy-consulting", title: "Digital Strategy Consulting", icon: LuTarget },
  { slug: "google-analytics", title: "Google Analytics & Reporting", icon: LuTrendingUp }
];

export default function DigitalMediaPlanning() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const swiperServicesRef = useRef(null);

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white">

      {/* 1. Header Banner */}
      <section className="w-full bg-[#ececec] pt-32 pb-16 flex items-center justify-center min-h-[350px]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto flex flex-row items-center gap-8 w769:gap-4 select-none">
          <Image
            src={`${basePath}/img/digital-media-planning.webp`}
            alt="Digital Media Planning Icon"
            width={85}
            height={85}
            className="w-[85px] h-[85px] object-contain flex-shrink-0 w769:w-[60px] w769:h-[60px]"
          />
          <h1 className="text-left leading-[1.5] uppercase tracking-[1px]">
            <span className="font-sans block text-[38px] w1470:text-[28px] w1281:text-[24px] w769:text-[18px] text-[#181414] font-medium">Digital</span>
            <span className="font-sans block text-[38px] w1470:text-[40px] w1281:text-[34px] w769:text-[24px] text-[#181414] -mt-1 font-bold">Media Planning</span>
          </h1>
        </div>
      </section>

      {/* 2. Breadcrumbs */}
      <div className="w-full bg-white py-6 select-none border-b border-neutral-100">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-2 font-libre font-medium text-[14px] text-[#000] tracking-[1.5px] flex items-center gap-1 select-none">
          <Link href="/what-we-brew" className="hover:text-[#ff9000] transition-colors">
            Our Expertise
          </Link>
          <Image
            src={`${basePath}/img/right_arrow_new.webp`}
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1"
          />
          <Link href="/our-expertise/digital-services" className="hover:text-[#ff9000] transition-colors">
            Digital Services
          </Link>
          <Image
            src={`${basePath}/img/right_arrow_new.webp`}
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1"
          />
          <span className="text-[#ff9000] font-medium">Digital Media Planning</span>
        </div>
      </div>

      {/* 3. Bio Description Section */}
      <section className="w-full bg-white py-20 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 flex flex-col text-center">
          <h2 className="font-sans text-[36px] w769:text-[24px] text-[#16110f] tracking-normal mb-8 leading-snug font-medium">
            <span>Reach the right people</span>
            <br />
            <span> on the right budget.</span>
          </h2>
          <div className="font-libre text-[#16110f] text-[16px] w769:text-[14px] leading-[1.8] flex flex-col gap-6 font-light mx-auto text-justify md:text-center">
            <p>
              Despite the advances in targeting and segmentation, there is a lot of &apos;noise&apos; digitally, distracting the online users.
            </p>
            <p>
              We strive to create the most relevant ads, &apos;search engine friendly&apos; landing pages for higher quality scores, and get you the lowest cost-per-click with maximum conversions. Our Digital Media Buying &amp; Planning team not only makes your every penny count, but also keeps a track of it. Looking to run an effective Digital media campaign on Facebook, Google Search/ Display network? Get in touch with us!
            </p>
          </div>
        </div>
      </section>

      {/* 4. Other Digital Services Carousel */}
      <section className="w-full bg-[#16110f] py-24 select-none overflow-hidden relative">
        <div className="w-[90%] mx-auto px-4 relative">
          <h2 className="font-sans font-bold text-[42px] w769:text-[30px] text-white uppercase tracking-[2px] text-center mb-16">
            <span className="font-sans font-light">Other Digital</span> Services
          </h2>

          <div className="relative w-full flex items-center px-12 w769:px-0">
            {/* Left Button */}
            <button
              onClick={() => swiperServicesRef.current?.slidePrev()}
              aria-label="Previous service"
              className="absolute left-0 w769:-left-4 z-20 flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-white/5 transition-colors"
            >
              <LuChevronLeft className="w-8 h-8 text-neutral-500 hover:text-white transition-colors" />
            </button>

            {/* Carousel Slider */}
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              onBeforeInit={(swiper) => {
                swiperServicesRef.current = swiper;
              }}
              slidesPerView={2}
              spaceBetween={20}
              loop={true}
              breakpoints={{
                480: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                769: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1025: {
                  slidesPerView: 6,
                  spaceBetween: 40,
                }
              }}
              className="w-full"
            >
              {otherServices.concat(otherServices).map((service, index) => {
                const IconComp = service.icon;
                return (
                  <SwiperSlide key={index}>
                    <Link
                      href={`/our-expertise/digital-services/${service.slug}`}
                      className="flex flex-col items-center justify-center text-center group cursor-pointer"
                    >
                      <div className="flex items-center justify-center text-[#ff9000] group-hover:text-white transition-colors duration-300 p-4 rounded-full border border-neutral-800 bg-neutral-900/40 w-[80px] h-[80px] mb-4">
                        <IconComp className="w-[32px] h-[32px]" />
                      </div>
                      <span className="font-sans font-medium text-[17px] text-white group-hover:text-[#ff9000] tracking-wide leading-snug transition-colors duration-300 block max-w-[150px]">
                        {service.title}
                      </span>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Right Button */}
            <button
              onClick={() => swiperServicesRef.current?.slideNext()}
              aria-label="Next service"
              className="absolute right-0 w769:-right-4 z-20 flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-white/5 transition-colors"
            >
              <LuChevronRight className="w-8 h-8 text-neutral-500 hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Beyond Digital Section */}
      <BeyondServicesCarousel currentCategory="digital-services" titleHighlight="DIGITAL" />

      {/* 6. CTA Let's Talk */}
      <ContactSection
        title="Let's Talk Digital Campaigns"
        subtitle="Looking to run an effective digital media campaign on Facebook, Google Search, or Display network? Let's connect over coffee."
        theme="dark"
      />
    </main >
  );
}
