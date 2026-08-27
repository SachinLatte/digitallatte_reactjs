"use client";

import { getAssetPath } from "../utils/assetPath";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  LuPenTool,
  LuMonitor,
  LuLayoutGrid,
  LuPrinter,
  LuShapes,
  LuChevronLeft,
  LuChevronRight
} from "react-icons/lu";
import ContactSection from "../app/components/common/ContactSection";
import WorkShowcaseCarousel from "../app/components/ui/WorkShowcaseCarousel";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";

const recentPrintWork = [
  {
    title: "Print Creative 8",
    src: "/img/design/print/small-8.webp"
  },
  {
    title: "Print Creative 10",
    src: "/img/design/print/small-10.webp"
  },
  {
    title: "Print Creative 7",
    src: "/img/design/print/small-7.webp"
  },
  {
    title: "Print Creative 9",
    src: "/img/design/print/small-9.webp"
  },
  {
    title: "Print Creative 11",
    src: "/img/design/print/small-11.webp"
  },
  {
    title: "Print Creative 6",
    src: "/img/design/print/small-6.webp"
  },
  {
    title: "Print Creative 1",
    src: "/img/design/print/small-1.webp"
  },
  {
    title: "Print Creative 2",
    src: "/img/design/print/small-2.webp"
  },
  {
    title: "Print Creative 3",
    src: "/img/design/print/small-3.webp"
  },
  {
    title: "Print Creative 4",
    src: "/img/design/print/small-4.webp"
  },
  {
    title: "Print Creative 5",
    src: "/img/design/print/small-5.webp"
  }
];

const otherDesignServices = [
  { slug: "user-experience", title: "User Experience Design", icon: LuLayoutGrid },
  { slug: "brand-identity", title: "Brand Identity", icon: LuPenTool },
  { slug: "digital-designs", title: "Digital Design", icon: LuMonitor },
  { slug: "logo-designing", title: "Logo Designing", icon: LuShapes },
  { slug: "print-designs", title: "Print Design", icon: LuPrinter }
];

const beyondDesign = [
  {
    category: "digital-services",
    title: "Digital",
    description:
      "Many firms can build you a website, Mobile App, Digital and Social media presence. But what about crafting a great Digital Experience that drives tangible growth...",
    image: "/img/services/digital-services.webp",
    col1: [
      { title: "Social Media Marketing", slug: "social-media-marketing" },
      { title: "SEO", slug: "seo" },
      { title: "Digital Media Planning", slug: "digital-media-planning" },
      { title: "Amazon A+ Content", slug: "amazon-enhanced-brand-content" }
    ],
    col2: [
      { title: "Influencer Campaigns", slug: "influencer-marketing" },
      { title: "Ecommerce Solutions", slug: "ecommerce-solutions" },
      { title: "Digital Strategy", slug: "digital-strategy-consulting" },
      { title: "Google Analytics", slug: "google-analytics" }
    ]
  },
  {
    category: "web-development-services",
    title: "Development",
    description:
      "We're a curious bunch of problem solvers helping clients grow through new digital products, platforms, and experiences. With scrupulous attention to quality...",
    image: "/img/services/devlopment-service.webp",
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
    image: "/img/services/production-services.webp",
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

export default function PrintDesigns() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const swiperServicesRef = useRef(null);

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white">

      {/* 1. Header Banner */}
      <section className="w-full bg-[#ececec] pt-32 pb-16 flex items-center justify-center min-h-[350px]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto flex flex-row items-center gap-8 w769:gap-4 select-none">
          <Image
            src={`${basePath}/img/print-design.webp`}
            alt="Print Design Icon"
            width={85}
            height={85}
            className="w-[85px] h-[85px] object-contain flex-shrink-0 w769:w-[60px] w769:h-[60px]"
          />
          <h1 className="text-left leading-[1.5] uppercase tracking-[1px]">
            <span className="font-sans block text-[38px] w1470:text-[28px] w1281:text-[24px] w769:text-[18px] text-[#181414] font-bold">Print</span>
            <span className="font-sans block text-[38px] w1470:text-[40px] w1281:text-[34px] w769:text-[24px] text-[#181414] -mt-1 font-medium">Design</span>
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
          <Link href="/our-expertise/design-services" className="hover:text-[#ff9000] transition-colors">
            Design Services
          </Link>
          <Image
            src={`${basePath}/img/right_arrow_new.webp`}
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1"
          />
          <span className="text-[#ff9000] font-medium">Print Design</span>
        </div>
      </div>

      {/* 3. Bio Description Section */}
      <section className="w-full bg-white py-20 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 flex flex-col text-center">
          <h2 className="font-sans text-[36px] w769:text-[24px] text-[#16110f] tracking-normal mb-8 leading-snug font-medium">
            <span>Don&apos;t design for brands, Design</span>
            <br className="hidden sm:inline" />
            <span> for people interacting with brands.</span>
          </h2>
          <div className="font-libre text-[#16110f] text-[16px] w769:text-[14px] leading-[1.8] flex flex-col gap-6 font-light mx-auto text-justify md:text-center">
            <p>
              Print Designs are not just a piece of art that need appreciation, but they are astutely crafted to evoke a strong response from the target audience. Creating design solutions that are both aesthetically beautiful and strategic, with clear, consistent messaging, results in higher success of a marketing campaign.
            </p>
            <p>
              We have been consistently delivering high quality designs across mediums like - (Out Of Home) Billboards, Standees, Tent Cards, Company Stationery &amp; Brochures, Packaging Designs, Backdrops, etc.
            </p>
            <p>
              If you&apos;re looking for quality design, you can be assured you will get the very best of us, each and every time.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Statement Banner (Dark Background) */}
      <section className="w-full bg-[#16110f] py-20 px-6 sm:px-12 text-center text-white relative overflow-hidden select-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff9000]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="mx-auto relative z-10">
          <p className="font-sans text-[35px] w1281:text-[24px] w769:text-[18px] leading-relaxed tracking-wide text-gray-300 uppercase">
            <span className="font-sans font-bold text-white">Good Design is beyond</span>{" "}
            <span className="text-[#ff9000] font-sans font-bold">colours &amp; pixels,</span>
            <br />
            <span>it is</span>{" "}
            <span className="text-[#ff9000] font-sans font-bold">visual identity.</span>
          </p>
        </div>
      </section>

      {/* 5. Recent Work Showcase (Full Height Squares with Lightbox) */}
      <section className="py-24 w769:py-16 bg-[#f6f6f6] text-[#16110f] select-none overflow-hidden relative">
        <div className="w-[85%] w1470:w-[90%] mx-auto px-4 relative">
          <h2 className="font-sans font-bold text-[42px] w769:text-[30px] text-[#16110f] uppercase tracking-[2px] text-center mb-12">
            <span className="font-sans font-light mr-2">Recent</span>
            <span>Work</span>
          </h2>

          <div className="w-full mt-4">
            <WorkShowcaseCarousel
              items={recentPrintWork}
              slidesPerView={3}
              loop={true}
              autoplay={true}
            />
          </div>
        </div>
      </section>

      {/* 6. Other Design Services Carousel */}
      <section className="w-full bg-[#16110f] py-24 select-none overflow-hidden relative">
        <div className="w-[90%] mx-auto px-4 relative">
          <h2 className="font-sans font-bold text-[42px] w769:text-[30px] text-white uppercase tracking-[2px] text-center mb-16">
            <span className="font-sans font-light">Other Design</span> Services
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
                  slidesPerView: 5,
                  spaceBetween: 40,
                }
              }}
              className="w-full"
            >
              {otherDesignServices.concat(otherDesignServices).map((service, index) => {
                const IconComp = service.icon;
                return (
                  <SwiperSlide key={index}>
                    <Link
                      href={`/our-expertise/design-services/${service.slug}`}
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

      {/* 7. Beyond Design Section */}
      <section className="w-full bg-white pt-24 select-none">
        <div className="w-full flex flex-col">
          <h2 className="font-sans font-bold text-[42px] w769:text-[30px] uppercase tracking-[3px] text-center text-[#16110f] mb-16">
            <span className="font-sans font-light mr-2">Beyond</span>
            <span>Design</span>
          </h2>

          <div className="w-full flex flex-row w769:flex-col overflow-hidden bg-[#16110f]">
            {beyondDesign.map((block) => (
              <div
                key={block.category}
                className="w-1/3 w769:w-full relative overflow-hidden aspect-square group bg-neutral-900"
              >
                <Image
                  src={getAssetPath(block.image)}
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

      {/* 8. CTA Let's Talk */}
      <ContactSection
        title="Let's Talk Print Design"
        subtitle="Looking to create premium packaging, brochures, billboards, or event backdrops? Let's connect over coffee."
        theme="dark"
      />
    </main>
  );
}
