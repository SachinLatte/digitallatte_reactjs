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
  LuChevronRight,
  LuExternalLink
} from "react-icons/lu";
import ContactSection from "../app/components/common/ContactSection";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";

const recentWorkWebsites = [
  {
    title: "i-stron Website",
    image: "/img/development/website/i-stron-website.webp",
    link: "https://www.i-stron.com/"
  },
  {
    title: "Meshiva Website",
    image: "/img/development/website/meshiva-website.webp",
    link: "https://www.meshiva.in/"
  },
  {
    title: "MPL T20 Website",
    image: "/img/development/website/mpleaguet20-website.webp",
    link: "https://mpleaguet20.com/"
  },
  {
    title: "Puneri Paltan Website",
    image: "/img/development/website/puneri-paltan-website.webp",
    link: "https://www.puneri-paltan.com/"
  },
  {
    title: "Reves Travels Website",
    image: "/img/development/website/reves-travels-website.webp",
    link: "https://www.revestravels.com/"
  }
];

const otherDesignServices = [
  { slug: "brand-identity", title: "Brand Identity", icon: LuPenTool },
  { slug: "digital-designs", title: "Digital Design", icon: LuMonitor },
  { slug: "user-experience", title: "User Experience Design", icon: LuLayoutGrid },
  { slug: "print-designs", title: "Print Design", icon: LuPrinter },
  { slug: "logo-designing", title: "Logo Designing", icon: LuShapes }
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

export default function UserExperience() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const swiperWorkRef = useRef(null);
  const swiperServicesRef = useRef(null);

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white">

      {/* 1. Header Banner */}
      <section className="w-full bg-[#ececec] pt-32 pb-16 flex items-center justify-center min-h-[350px]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto flex flex-row items-center gap-8 w769:gap-4 select-none">
          <Image
            src={`${basePath}/img/user-experience.webp`}
            alt="User Experience Design Icon"
            width={85}
            height={85}
            className="w-[85px] h-[85px] object-contain flex-shrink-0 w769:w-[60px] w769:h-[60px]"
          />
          <h1 className="text-left leading-[1.5] uppercase tracking-[1px]">
            <span className="font-sans block text-[38px] w1470:text-[28px] w1281:text-[24px] w769:text-[18px] text-[#181414] font-bold">User</span>
            <span className="font-sans block text-[38px] w1470:text-[40px] w1281:text-[34px] w769:text-[24px] text-[#181414] -mt-1 font-medium">Experience Design</span>
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
          <span className="text-[#ff9000] font-medium">User Experience Design</span>
        </div>
      </div>

      {/* 3. Bio Description Section */}
      <section className="w-full bg-white py-20 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 flex flex-col text-center">
          <h2 className="font-sans text-[36px] w769:text-[24px] text-[#16110f] tracking-normal mb-6 leading-snug font-medium">
            <span>User Experience</span>
            <br className="hidden sm:inline" />
            <span> Is Never An Afterthought</span>
          </h2>
          <p className="font-sans font-medium text-[18px] w769:text-[16px] text-[#16110f] mb-6">
            What&apos;s the point of a great product if people can&apos;t use it?
          </p>
          <div className="font-libre text-[#16110f] text-[16px] w769:text-[14px] leading-[1.8] flex flex-col gap-5 font-light mx-auto text-justify md:text-center">
            <p>
              As designers and strategists, we immerse users in experiences, intuitively.
            </p>
            <p>
              Our expertise in User Experience Design (UX) helps us make complex simple and enhance the interaction between the brand and its customers. Be it on a website, mobile application, email campaign, social media campaign or an Ad banner, our designs define a path-breaking digital experience.
            </p>
            <p>
              We strive to enhance the user&apos;s overall experience and delight them.
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
            <span className="font-sans font-bold text-white">User Experience (UX)</span>{" "}
            <span className="text-[#ff9000] font-sans font-bold">should be the</span>
            <br />
            <span>core of</span>{" "}
            <span className="text-[#ff9000] font-sans font-bold">everything you do.</span>
          </p>
        </div>
      </section>

      {/* 5. Recent Work Showcase (Interactive Website Scroll Showcase) */}
      <section className="py-24 w769:py-16 bg-[#f6f6f6] text-[#16110f] select-none overflow-hidden relative">
        <div className="w-[85%] w1470:w-[90%] mx-auto px-4 relative">
          <h2 className="font-sans font-bold text-[42px] w769:text-[30px] text-[#16110f] uppercase tracking-[2px] text-center mb-16">
            <span className="font-sans font-light mr-2">Recent</span>
            <span>Work</span>
          </h2>

          <div className="relative w-full flex items-center px-12 w769:px-0">
            {/* Left Button */}
            <button
              onClick={() => swiperWorkRef.current?.slidePrev()}
              aria-label="Previous work"
              className="absolute left-0 w769:-left-4 z-20 flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-neutral-200 transition-colors"
            >
              <LuChevronLeft className="w-8 h-8 text-neutral-400 hover:text-[#16110f] transition-colors" />
            </button>

            {/* Carousel Slider */}
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              onBeforeInit={(swiper) => {
                swiperWorkRef.current = swiper;
              }}
              slidesPerView={1}
              spaceBetween={24}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                }
              }}
              className="w-full"
            >
              {recentWorkWebsites.map((item, index) => (
                <SwiperSlide key={index}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="relative w-full h-[520px] w1281:h-[440px] w769:h-[360px] w501:h-[280px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-neutral-200 transition-all duration-300 cursor-n-resize">
                      <Image
                        src={getAssetPath(item.image)}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top transition-[object-position] duration-[8000ms] ease-in-out group-hover:object-bottom select-none pointer-events-none"
                      />

                      {/* Top Right Live Link Badge */}
                      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#16110f]/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-md">
                        <span>Visit Site</span>
                        <LuExternalLink className="w-3.5 h-3.5 text-[#ff9000]" />
                      </div>
                    </div>
                    <p className="mt-4 text-center font-sans font-medium text-[16px] text-neutral-800 group-hover:text-[#ff9000] transition-colors">
                      {item.title}
                    </p>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Right Button */}
            <button
              onClick={() => swiperWorkRef.current?.slideNext()}
              aria-label="Next work"
              className="absolute right-0 w769:-right-4 z-20 flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-neutral-200 transition-colors"
            >
              <LuChevronRight className="w-8 h-8 text-neutral-400 hover:text-[#16110f] transition-colors" />
            </button>
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
        title="Let's Talk UX & Design"
        subtitle="Have a product to build, an app to redesign, or a digital experience to elevate? Let's connect over coffee."
        theme="dark"
      />
    </main>
  );
}
