"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  LuThumbsUp,
  LuMegaphone,
  LuSearch,
  LuTrendingUp,
  LuCoins,
  LuTarget,
  LuShoppingBag,
  LuChevronLeft,
  LuChevronRight,
  LuCheck
} from "react-icons/lu";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import ContactSection from "../app/components/common/ContactSection";

// Import Swiper styles
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";

const processList = [
  {
    icon: "/img/icon_1.svg",
    title: "Brand & Product Discovery",
  },
  {
    icon: "/img/icon_2.svg",
    title: "Creative Concept Development",
  },
  {
    icon: "/img/icon_3.svg",
    title: "Product Photography",
  },
  {
    icon: "/img/icon_4.svg",
    title: "Product Videography",
  },
  {
    icon: "/img/icon_5.svg",
    title: "Content & Design Creation",
  },
  {
    icon: "/img/icon_6.svg",
    title: "Multi-Platform Optimization",
  },
];

const shilajitImages = [
  "/img/digital/amazon-content/shilajit/shilajit-img1.webp",
  "/img/digital/amazon-content/shilajit/shilajit-img2.webp",
  "/img/digital/amazon-content/shilajit/shilajit-img3.webp",
  "/img/digital/amazon-content/shilajit/shilajit-img4.webp",
];

const coconutOilImages = [
  "/img/digital/amazon-content/coconut-oil/coconut-oil-img1.webp",
  "/img/digital/amazon-content/coconut-oil/coconut-oil-img2.webp",
  "/img/digital/amazon-content/coconut-oil/coconut-oil-img3.webp",
  "/img/digital/amazon-content/coconut-oil/coconut-oil-img4.webp",
];

const suhanaImages = [
  "/img/digital/amazon-content/suhana/suhana-img1.webp",
  "/img/digital/amazon-content/suhana/suhana-img2.webp",
  "/img/digital/amazon-content/suhana/suhana-img3.webp",
  "/img/digital/amazon-content/suhana/suhana-img4.webp",
  "/img/digital/amazon-content/suhana/suhana-img5.webp",
  "/img/digital/amazon-content/suhana/suhana-img6.webp",
  "/img/digital/amazon-content/suhana/suhana-img7.webp",
  "/img/digital/amazon-content/suhana/suhana-img8.webp",
  "/img/digital/amazon-content/suhana/suhana-img9.webp",
];

const otherServices = [
  { slug: "digital-strategy-consulting", title: "Digital Strategy Consulting", icon: LuTarget },
  { slug: "ecommerce-solutions", title: "Ecommerce Solutions", icon: LuShoppingBag },
  { slug: "influencer-marketing", title: "Influencer Campaigns", icon: LuMegaphone },
  { slug: "social-media-marketing", title: "Social Media Marketing", icon: LuThumbsUp },
  { slug: "digital-media-planning", title: "Digital Media Planning", icon: LuCoins },
  { slug: "seo", title: "Search Engine Optimization", icon: LuSearch },
  { slug: "google-analytics", title: "Google Analytics & Reporting", icon: LuTrendingUp },
];

const beyondDigital = [
  {
    category: "design-services",
    title: "Design",
    description:
      "Design, in every sense, has always been at the heart of what we do; Design that isn't just about what it looks like, but about how it works and the experience it creates...",
    image: "/img/services/design-service.png",
    col1: [
      { title: "User Experience Design", slug: "user-experience" },
      { title: "Brand Identity", slug: "brand-identity" },
      { title: "Print Design", slug: "print-designs" }
    ],
    col2: [
      { title: "Digital Design", slug: "digital-designs" },
      { title: "Logo Designing", slug: "logo-designing" }
    ]
  },
  {
    category: "web-development-services",
    title: "Development",
    description:
      "We're a curious bunch of problem solvers helping clients grow through new digital products, platforms, and experiences. With scrupulous attention to quality...",
    image: "/img/services/devlopment-service.png",
    col1: [
      { title: "Website & Microsite Development", slug: "website-microsite" },
      { title: "Content Management Systems (CMS)", slug: "content-management-systems" },
      { title: "Website Maintenance & Security", slug: "website-maintenance" }
    ],
    col2: [
      { title: "Mobile Apps & Websites", slug: "mobile-applications" },
      { title: "Ecommerce Solutions", slug: "ecommerce-solutions-dev" }
    ]
  },
  {
    category: "production-services",
    title: "Production",
    description:
      "Capture your brand essence & bring imagination to life through concept photo & video shoot. Every element is personalised to your...",
    image: "/img/services/production-services.png",
    col1: [
      { title: "Concept Shoot", slug: "concept-shoot" },
      { title: "Logo Reveal Videos", slug: "logo-reveal-videos" },
      { title: "Digital Films", slug: "digital-films" }
    ],
    col2: [
      { title: "Product Explainer Videos", slug: "product-explainer-videos" },
      { title: "Ecommerce Photography", slug: "ecommerce-photography" },
      { title: "2D Animation Videos", slug: "two-d-animation-videos" }
    ]
  }
];

export default function AmazonEnhancedBrandContent() {
  const swiperServicesRef = useRef(null);

  // Lightbox state for product showcases
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
  };

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white">

      {/* 1. Header Banner */}
      <section className="w-full bg-[#ececec] pt-32 pb-16 flex items-center justify-center min-h-[350px]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto flex flex-row items-center gap-8 w769:gap-4 select-none">
          <Image
            src="/img/production_icon_orange.png"
            alt="Amazon Enhanced Brand Content Icon"
            width={85}
            height={85}
            className="w-[85px] h-[85px] object-contain flex-shrink-0 w769:w-[60px] w769:h-[60px]"
          />
          <h1 className="text-left leading-[1.5] uppercase tracking-[1px]">
            <span className="font-sans block text-[38px] w1470:text-[28px] w1281:text-[24px] w769:text-[18px] text-[#181414] font-medium">Amazon</span>
            <span className="font-sans block text-[38px] w1470:text-[40px] w1281:text-[34px] w769:text-[24px] text-[#181414] -mt-1 font-bold">Enhanced Brand Content</span>
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
            src="/img/right_arrow_new.png"
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1"
          />
          <Link href="/our-expertise/digital-services" className="hover:text-[#ff9000] transition-colors">
            Digital Services
          </Link>
          <Image
            src="/img/right_arrow_new.png"
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1"
          />
          <span className="text-[#ff9000] font-medium">Enhanced Brand Content</span>
        </div>
      </div>

      {/* 3. Bio Description Section */}
      <section className="w-full bg-white py-20 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 flex flex-col text-center">
          <h2 className="font-sans text-[36px] w769:text-[24px] text-[#16110f] tracking-normal mb-8 leading-snug font-medium">
            <span>Want your Amazon product listings to stand</span>
            <br className="hidden sm:inline" />
            <span> out and convert better?</span>
          </h2>
          <div className="font-libre text-[#16110f] text-[16px] w769:text-[14px] leading-[1.8] flex flex-col gap-6 font-light mx-auto text-justify md:text-center">
            <p>
              With Amazon A+ Content, also known as Enhanced Brand Content (EBC), your brand can do more than just list. A+ pages combine visuals, comparison modules, and storytelling to build trust and drive sales. Whether you&apos;re launching a new product or scaling on e-commerce or quick commerce platforms, we help you create content that performs beautifully and effectively.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Amazon A+ Content & Process Grid Section */}
      <section className="w-full bg-[#fafafa] py-24 select-none border-t border-b border-neutral-200/60">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="grid grid-cols-12 gap-12 w1025:gap-8 items-start">

            {/* Left Column: Why Choose Amazon A+ Content */}
            <div className="col-span-12 lg:col-span-5 flex flex-col text-left">
              <h3 className="font-sans text-[28px] w769:text-[22px] font-bold text-[#16110f] uppercase tracking-wide mb-6">
                Why choose Amazon A+ Content?
              </h3>
              <p className="font-libre text-[#4a4a4a] text-[15px] leading-[1.8] mb-4">
                Enhanced Brand Content gives Amazon brand-registered sellers the tools to go beyond plain listings. With custom visuals, branded modules, comparison charts, and strong copy, your product page turns into a full-fledged brand experience.
              </p>
              <p className="font-libre text-[#4a4a4a] text-[15px] leading-[1.8] mb-8">
                Whether on Amazon or quick commerce platforms, EBC helps reduce bounce rates, increase product understanding, and improve conversion rates, especially in competitive categories.
              </p>

              <ul className="flex flex-col space-y-3.5">
                {[
                  "Better conversion rates (up to 10% higher)",
                  "Fewer returns and higher customer trust",
                  "SEO-optimized visuals and content",
                  "Differentiation from competitors",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[#16110f] font-libre text-[14.5px] font-medium">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#ff9000]/15 text-[#ff9000] flex items-center justify-center text-xs">
                      <LuCheck className="stroke-[3]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: 6 Process Boxes Grid */}
            <div className="col-span-12 lg:col-span-7">
              <div className="grid grid-cols-2 w501:grid-cols-1 gap-6">
                {processList.map((proc, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white rounded-xl border border-neutral-200/80 hover:border-[#ff9000] hover:shadow-md transition-all duration-300 flex items-center gap-5 group"
                  >
                    <div className="w-[50px] h-[50px] flex-shrink-0 relative flex items-center justify-center p-2 rounded-lg bg-[#faf6f2] group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={proc.icon}
                        alt={proc.title}
                        width={36}
                        height={36}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h4 className="font-sans text-[15px] font-semibold text-[#16110f] leading-snug tracking-wide group-hover:text-[#ff9000] transition-colors">
                      {proc.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Statement Banner (Dark Background) */}
      <section className="w-full bg-[#16110f] py-20 px-6 sm:px-12 text-center text-white relative overflow-hidden select-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff9000]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="mx-auto relative z-10">
          <p className="font-sans text-[35px] w1281:text-[24px] w769:text-[18px] leading-relaxed tracking-wide text-gray-300 uppercase">
            <span className="font-sans font-bold text-white">Your customers are scrolling fast,</span>{" "}
            <span className="text-[#ff9000] font-sans font-bold">Amazon A+ content</span>
            <br />
            <span>is your only chance to slow them down.</span>
          </p>
        </div>
      </section>

      {/* 6. Recent Work Showcase (3 Brand Case Studies) */}
      <section className="py-24 w769:py-16 w501:py-12 bg-[#f6f6f6] text-[#16110f] select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto flex flex-col items-center">
          
          <h2 className="font-bold text-[42px] w769:text-[30px] text-[#181414] uppercase tracking-[1px] font-light text-center mb-12 select-none">
            <span className="font-medium">RECENT</span> WORK
          </h2>

          {/* Showcase Card 1: Shilajit */}
          <div className="w-full bg-[#f5f5f5] rounded-2xl p-8 w769:p-5 shadow-sm border border-neutral-200/60 mb-12 flex flex-col">
            {/* Top Row Carousel */}
            <div className="relative w-full">
              <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                navigation={{
                  prevEl: ".prev-shilajit-btn",
                  nextEl: ".next-shilajit-btn",
                }}
                slidesPerView={1}
                spaceBetween={16}
                loop={true}
                breakpoints={{
                  480: { slidesPerView: 2, spaceBetween: 16 },
                  769: { slidesPerView: 3, spaceBetween: 20 },
                }}
                className="w-full"
              >
                {shilajitImages.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      onClick={() => openLightbox(shilajitImages, idx)}
                      className="w-full aspect-square relative rounded-xl overflow-hidden cursor-zoom-in group border border-neutral-200/60 bg-white"
                    >
                      <Image
                        src={img}
                        alt={`Shilajit Creative ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                className="prev-shilajit-btn absolute -left-4 top-[50%] -translate-y-[50%] z-20 bg-black/60 hover:bg-[#ff9000] text-white p-2 rounded-full shadow transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <button
                className="next-shilajit-btn absolute -right-4 top-[50%] -translate-y-[50%] z-20 bg-black/60 hover:bg-[#ff9000] text-white p-2 rounded-full shadow transition-all cursor-pointer"
                aria-label="Next image"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </div>

            {/* Bottom Full Width Image with 8s smooth vertical scroll on hover */}
            <div className="w-[70%] w1025:w-[85%] w769:w-full mx-auto mt-9 rounded-[15px] overflow-hidden border border-neutral-200/80 shadow-sm cursor-n-resize bg-white">
              <Image
                src="/img/digital/amazon-content/shilajit/shilajit-full-img.webp"
                alt="Shilajit Amazon A+ Full Banner"
                width={1200}
                height={1800}
                onClick={() => openLightbox(["/img/digital/amazon-content/shilajit/shilajit-full-img.webp"], 0)}
                className="w-full h-[520px] w769:h-[350px] w501:h-[260px] object-cover object-top rounded-[15px] transition-[object-position] duration-[8000ms] ease-in-out hover:object-bottom cursor-pointer select-none"
              />
            </div>
          </div>

          {/* Showcase Card 2: Coconut Oil */}
          <div className="w-full bg-[#f5f5f5] rounded-2xl p-8 w769:p-5 shadow-sm border border-neutral-200/60 mb-12 flex flex-col">
            {/* Top Row Carousel */}
            <div className="relative w-full">
              <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 3800, disableOnInteraction: false }}
                navigation={{
                  prevEl: ".prev-coconut-btn",
                  nextEl: ".next-coconut-btn",
                }}
                slidesPerView={1}
                spaceBetween={16}
                loop={true}
                breakpoints={{
                  480: { slidesPerView: 2, spaceBetween: 16 },
                  769: { slidesPerView: 3, spaceBetween: 20 },
                }}
                className="w-full"
              >
                {coconutOilImages.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      onClick={() => openLightbox(coconutOilImages, idx)}
                      className="w-full aspect-square relative rounded-xl overflow-hidden cursor-zoom-in group border border-neutral-200/60 bg-white"
                    >
                      <Image
                        src={img}
                        alt={`Coconut Oil Creative ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                className="prev-coconut-btn absolute -left-4 top-[50%] -translate-y-[50%] z-20 bg-black/60 hover:bg-[#ff9000] text-white p-2 rounded-full shadow transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <button
                className="next-coconut-btn absolute -right-4 top-[50%] -translate-y-[50%] z-20 bg-black/60 hover:bg-[#ff9000] text-white p-2 rounded-full shadow transition-all cursor-pointer"
                aria-label="Next image"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </div>

            {/* Bottom Full Width Image with 8s smooth vertical scroll on hover */}
            <div className="w-[70%] w1025:w-[85%] w769:w-full mx-auto mt-9 rounded-[15px] overflow-hidden border border-neutral-200/80 shadow-sm cursor-n-resize bg-white">
              <Image
                src="/img/digital/amazon-content/coconut-oil/coconut-oil-full-img.webp"
                alt="House of Veda Virgin Coconut Oil Amazon A+ Banner"
                width={1200}
                height={1800}
                onClick={() => openLightbox(["/img/digital/amazon-content/coconut-oil/coconut-oil-full-img.webp"], 0)}
                className="w-full h-[520px] w769:h-[350px] w501:h-[260px] object-cover object-top rounded-[15px] transition-[object-position] duration-[8000ms] ease-in-out hover:object-bottom cursor-pointer select-none"
              />
            </div>
          </div>

          {/* Showcase Card 3: Suhana Spices */}
          <div className="w-full bg-[#f5f5f5] rounded-2xl p-8 w769:p-5 shadow-sm border border-neutral-200/60 flex flex-col">
            <div className="relative w-full">
              <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 3200, disableOnInteraction: false }}
                navigation={{
                  prevEl: ".prev-suhana-btn",
                  nextEl: ".next-suhana-btn",
                }}
                slidesPerView={1}
                spaceBetween={16}
                loop={true}
                breakpoints={{
                  480: { slidesPerView: 2, spaceBetween: 16 },
                  769: { slidesPerView: 3, spaceBetween: 20 },
                }}
                className="w-full"
              >
                {suhanaImages.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      onClick={() => openLightbox(suhanaImages, idx)}
                      className="w-full aspect-square relative rounded-xl overflow-hidden cursor-zoom-in group border border-neutral-200/60 bg-white"
                    >
                      <Image
                        src={img}
                        alt={`Suhana Spices Creative ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                className="prev-suhana-btn absolute -left-4 top-[50%] -translate-y-[50%] z-20 bg-black/60 hover:bg-[#ff9000] text-white p-2 rounded-full shadow transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <button
                className="next-suhana-btn absolute -right-4 top-[50%] -translate-y-[50%] z-20 bg-black/60 hover:bg-[#ff9000] text-white p-2 rounded-full shadow transition-all cursor-pointer"
                aria-label="Next image"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/95 flex flex-col justify-between select-none">
          <div className="w-full flex justify-between items-center px-6 py-4 text-white bg-black/40 backdrop-blur-sm relative z-50">
            <span className="text-sm font-semibold tracking-wider font-sans">
              {lightboxIndex + 1} / {lightboxImages.length}
            </span>
            <button
              onClick={closeLightbox}
              className="text-white hover:text-[#ff9000] text-3xl focus:outline-none transition-colors cursor-pointer"
              title="Close Lightbox"
            >
              <IoCloseOutline size={36} />
            </button>
          </div>

          <div className="flex-grow flex items-center justify-between px-4 sm:px-12 relative">
            {lightboxImages.length > 1 && (
              <button
                onClick={prevLightbox}
                className="absolute left-4 sm:left-8 text-white hover:text-[#ff9000] z-50 bg-black/50 hover:bg-black/80 p-3 rounded-full transition-all cursor-pointer"
                title="Previous Image"
              >
                <IoChevronBackOutline size={28} />
              </button>
            )}

            <div className="mx-auto max-w-[85%] max-h-[75vh] flex items-center justify-center p-2">
              <Image
                src={lightboxImages[lightboxIndex]}
                alt="Amazon A+ Content Creative"
                width={1200}
                height={800}
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-2xl animate-fade-in transition-all duration-300"
              />
            </div>

            {lightboxImages.length > 1 && (
              <button
                onClick={nextLightbox}
                className="absolute right-4 sm:right-8 text-white hover:text-[#ff9000] z-50 bg-black/50 hover:bg-black/80 p-3 rounded-full transition-all cursor-pointer"
                title="Next Image"
              >
                <IoChevronForwardOutline size={28} />
              </button>
            )}
          </div>

          <div className="w-full text-center py-4 bg-black/40 backdrop-blur-sm text-neutral-400 text-xs font-libre font-light">
            Amazon Enhanced Brand Content Creatives
          </div>
        </div>
      )}

      {/* 7. Other Digital Services Carousel */}
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

      {/* 8. Beyond Digital Section */}
      <section className="w-full bg-white pt-24 select-none">
        <div className="w-full flex flex-col">
          <h2 className="font-sans font-bold text-[42px] w769:text-[30px] uppercase tracking-[3px] text-center text-[#16110f] mb-16">
            <span className="font-sans font-light mr-2">Beyond</span>
            <span>Digital</span>
          </h2>

          <div className="w-full flex flex-row w769:flex-col overflow-hidden bg-[#16110f]">
            {beyondDigital.map((block) => (
              <div
                key={block.category}
                className="w-1/3 w769:w-full relative overflow-hidden aspect-square group bg-neutral-900"
              >
                <Image
                  src={block.image}
                  alt={block.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-all duration-700 select-none"
                />

                <div className="absolute inset-0 bg-[#16110f]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] flex flex-col justify-center p-15 w1281:p-6 text-white overflow-y-auto z-10">
                  <h3 className="font-sans text-[38px] w1281:text-[22px] uppercase font-medium leading-none mb-8 text-[#ff9000]">
                    <Link
                      href={`/our-expertise/${block.category}`}
                      className="text-[#ff9000] hover:text-white transition-colors duration-300"
                    >
                      {block.title}
                    </Link>
                  </h3>

                  <p className="font-libre text-[16px] text-white leading-relaxed mb-6">
                    <Link
                      href={`/our-expertise/${block.category}`}
                      className="text-white"
                    >
                      {block.description}
                    </Link>
                  </p>

                  <div className="flex flex-row gap-6 mt-2 w-full text-left">
                    <ul className="w-1/2 flex flex-col gap-4.5">
                      {block.col1.map((item) => (
                        <li
                          key={item.slug}
                          className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:bg-[#ff9000] before:rounded-none"
                        >
                          <Link
                            href={item.slug.startsWith("javascript") ? item.slug : `/our-expertise/${block.category}/${item.slug}`}
                            className="font-sans text-[16px] text-[#ff9000] hover:text-white transition-colors duration-300 tracking-wide font-normal block leading-snug"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <ul className="w-1/2 flex flex-col gap-4.5">
                      {block.col2.map((item) => (
                        <li
                          key={item.slug}
                          className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:bg-[#ff9000] before:rounded-none"
                        >
                          <Link
                            href={item.slug.startsWith("javascript") ? item.slug : `/our-expertise/${block.category}/${item.slug}`}
                            className="font-sans text-[16px] text-[#ff9000] hover:text-white transition-colors duration-300 tracking-wide font-normal block leading-snug"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA Let's Talk */}
      <ContactSection
        title="Let's Talk Brand Growth"
        subtitle="Want to scale your brand on Amazon and quick-commerce platforms? Let's connect over coffee and strategies."
        theme="dark"
      />
    </main>
  );
}
