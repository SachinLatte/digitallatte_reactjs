"use client";

import { getAssetPath } from "../../../../utils/assetPath";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  LuChevronLeft,
  LuChevronRight,
  LuArrowUpRight
} from "react-icons/lu";
import ContactSection from "../../../components/common/ContactSection";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";

const heroPortfolios = [
  {
    title: "MMF Group",
    image: "/img/photography/mmf-group-thumb.webp",
    description:
      "We executed a multi-location photography and video production project for Manoj Multifoods (MMF Group), a Super Stockist and Integrated Logistics Partner for FMCG and Food Brands.",
    link: "/our-expertise/digital-marketing-services/mmfgroup-corporate-warehouse-videoshoot"
  },
  {
    title: "Rentio Tea",
    image: "/img/photography/rentio-tea-thumb.webp",
    description:
      "Rentio Tea is a name synonymous with purity, tradition, and an uncompromising love for tea. Digital Latte is proud to present this beautifully crafted video that pays homage to the brand's legacy. Here's to a collaboration that's steeped in excellence.",
    link: "/our-expertise/digital-marketing-services/rentio-tea-photography-and-videoshoot"
  },
  {
    title: "Patna Pirates",
    image: "/img/photography/patna-pirates-thumb.webp",
    description:
      "Patna Pirates is one of the most successful kabaddi franchise in Pro Kabaddi League. We conceptualised thematic photoshoot & videography to bring out team's pride and the personality of the athletes.",
    link: "/our-expertise/digital-marketing-services/patna-pirates-photography-and-videoshoot"
  },
  {
    title: "Goldiee Masale",
    image: "/img/photography/goldiee-group-thumb.webp",
    description:
      "A pinch of tradition, a dash of creativity, and a whole lot of passion, this is how Digital Latte captured the magic of Goldiee Masale. Goldiee Masale is more than just spices it's an experience and we're thrilled to be part of its journey!",
    link: "/our-expertise/digital-marketing-services/goldiee-masale-photography-and-videoshoot"
  },
  {
    title: "J. Hampstead",
    image: "/img/photography/j-hampsted-thumb2.webp",
    description:
      "J. Hampstead stands for style, elegance, and craftsmanship. Digital Latte had the privilege of creating this captivating visual story that celebrates the brand's iconic legacy, from rich textures to contemporary designs.",
    link: "/our-expertise/digital-marketing-services/j-hampstead-photography-and-videoshoot"
  }
];

const productionServicesList = [
  {
    title: "Concept Shoot",
    icon: "/img/icon2.svg",
    description:
      "Capture your brand essence & bring imagination to life through concept photo & video shoot. Every element is personalised to your concept including studio, lighting, styling, hair and makeup, location, models and even poses."
  },
  {
    title: "Logo Reveal Videos",
    icon: "/img/icon4.svg",
    description:
      "Logo reveals are an excellent way to create buzz and awareness around your brand. Having a professional logo reveal will make your brand stand out from the others and stay in your audience's mind."
  },
  {
    title: "Digital Films",
    icon: "/img/icon3.svg",
    description:
      "We craft and create compelling narratives, stunning visuals and unforgettable experiences through high-quality video production services that drive conversions and helps meet goals."
  },
  {
    title: "Product Explainer Videos",
    icon: "/img/icon6.svg",
    description:
      "Captivate, educate & convert your audience. In this digital era, leverage Product explainer videos to simplify complex ideas, engage with your audiences and reinforce brand messaging."
  },
  {
    title: "Ecommerce Photography",
    icon: "/img/icon1.svg",
    description:
      "Boost your online sales with high-definition product photography for your online store and other marketplaces like Amazon, Myntra etc."
  },
  {
    title: "2D Animation Videos",
    icon: "/img/icon5.svg",
    description:
      "2D animated explainer videos are widely used for marketing, advertising, and educational purposes. Bring your concepts & designs to life through captivating 2D Animation videos."
  }
];

const beyondProduction = [
  {
    category: "design-services",
    title: "Design",
    description:
      "Design, in every sense, has always been at the heart of what we do; Design that isn't just about what it looks like, but about how it works and the experience it creates...",
    image: "/img/services/design-service.webp",
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
      { title: "Mobile Apps & Websites", slug: "mobile-applications" },
      { title: "Content Management Systems (CMS)", slug: "content-management-systems" }
    ],
    col2: [
      { title: "Website Maintenance & Security", slug: "website-maintenance" },
      { title: "Ecommerce Solutions", slug: "ecommerce-solutions-dev" }
    ]
  }
];

import ClientsCarousel from "../../../components/case-studies/ClientsCarousel";

export default function ProductionServices({ data, categoryKey }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const swiperHeroRef = useRef(null);

  const categoryName = data?.name || "Production Services";
  const beyondTitle = data?.beyondTitle || "BEYOND PRODUCTION";
  const beyondCards =
    data?.beyondCards && data.beyondCards.length > 0
      ? data.beyondCards
      : beyondProduction;
  const clientsTitle = data?.clientsTitle || "OUR CLIENTS";
  const showClients = data?.showClients !== undefined ? data.showClients : true;

  const currentSlug = data?.slug || categoryKey || "production-services";

  const renderBeyondTitle = () => {
    if (!beyondTitle) return null;
    const parts = beyondTitle.trim().split(" ");
    if (parts.length === 1) {
      return <span className="font-medium">{parts[0]}</span>;
    }
    return (
      <>
        <span className="font-light mr-2">{parts[0]}</span>
        <span className="font-medium">{parts.slice(1).join(" ")}</span>
      </>
    );
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactElem = document.getElementById("contact-section");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white">

      {/* 1. Hero Showcase 100vh Carousel Banner (3-Slide View with Center Heading Overlay) */}
      <section className="relative w-full h-screen min-h-[600px] bg-[#16110f] overflow-hidden select-none">
        
        {/* Swiper 3-Slide Carousel */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          onBeforeInit={(swiper) => {
            swiperHeroRef.current = swiper;
          }}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 0
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 0
            }
          }}
          className="w-full h-full"
        >
          {heroPortfolios.map((item, index) => (
            <SwiperSlide key={index} className="relative w-full h-full group overflow-hidden border-r border-black/20">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={getAssetPath(item.image)}
                  alt={item.title}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle base gradient for title legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />

                {/* Default State: Bottom-left title with orange underline */}
                <div className="absolute bottom-12 left-10 z-10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                  <h3 className="text-white text-[32px] w1470:text-[26px] w769:text-[22px] font-sans font-medium mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <div className="w-14 h-[3px] bg-[#fe9000]" />
                </div>

                {/* Hover State Overlay */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-xs p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15">
                  <h3 className="text-white text-[32px] w1470:text-[26px] font-sans font-medium mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <div className="w-14 h-[3px] bg-[#fe9000] mb-4" />
                  <p className="font-libre text-[14px] text-gray-200 leading-relaxed font-light mb-6 line-clamp-4">
                    {item.description}
                  </p>
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-2 self-start px-6 py-2.5 rounded-full border border-[#fe9000] text-white hover:bg-[#fe9000] transition-colors duration-300 uppercase tracking-widest text-xs font-semibold"
                  >
                    <span>View Gallery</span>
                    <LuArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Center Heading Overlay (Photos & Video Production) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="text-center select-none drop-shadow-2xl">
            <h1 className="font-sans uppercase tracking-[2px] leading-tight">
              <span className="text-[#fe9000] font-bold text-[56px] w1470:text-[46px] w1281:text-[38px] w769:text-[30px] block drop-shadow-md">
                Photos &amp; Video
              </span>
              <span className="text-white font-medium text-[56px] w1470:text-[46px] w1281:text-[38px] w769:text-[30px] block -mt-2 drop-shadow-md">
                Production
              </span>
            </h1>
          </div>
        </div>

        {/* Carousel Navigation Chevrons */}
        <button
          onClick={() => swiperHeroRef.current?.slidePrev()}
          aria-label="Previous portfolio"
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-[#fe9000] text-white flex items-center justify-center transition-colors duration-300 backdrop-blur-sm cursor-pointer"
        >
          <LuChevronLeft className="w-7 h-7" />
        </button>
        <button
          onClick={() => swiperHeroRef.current?.slideNext()}
          aria-label="Next portfolio"
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-[#fe9000] text-white flex items-center justify-center transition-colors duration-300 backdrop-blur-sm cursor-pointer"
        >
          <LuChevronRight className="w-7 h-7" />
        </button>
      </section>

      {/* 2. Breadcrumbs */}
      <div className="w-full bg-white py-6 select-none border-b border-neutral-100">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-2 font-libre font-medium text-[14px] text-[#000] tracking-[1.5px] flex items-center gap-1 select-none">
          <Link href="/" className="hover:text-[#fe9000] transition-colors">
            Home
          </Link>
          <Image
            src={`${basePath}/img/right_arrow_new.webp`}
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1"
          />
          <Link href="/what-we-brew" className="hover:text-[#fe9000] transition-colors">
            Our Expertise
          </Link>
          <Image
            src={`${basePath}/img/right_arrow_new.webp`}
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1"
          />
          <span className="text-[#fe9000] font-medium">{categoryName}</span>
        </div>
      </div>

      {/* 3. Production Services 6-Card Grid */}
      <section className="w-full bg-white py-24 w769:py-16 select-none" id="photography-grid">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="grid grid-cols-3 w1101:grid-cols-2 w769:grid-cols-1 gap-10 w769:gap-8">
            {productionServicesList.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-100 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-20 h-20 mb-6 flex items-center justify-center p-4 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={getAssetPath(item.icon)}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="font-sans font-bold text-[22px] w769:text-[20px] text-[#16110f] uppercase tracking-wide mb-4 group-hover:text-[#fe9000] transition-colors">
                  {item.title}
                </h3>
                <p className="font-libre text-[15px] w769:text-[14px] text-neutral-600 leading-relaxed font-light mb-8 flex-grow">
                  {item.description}
                </p>
                <button
                  onClick={scrollToContact}
                  className="px-6 py-2.5 rounded-full border border-[#16110f] text-[#16110f] group-hover:border-[#fe9000] group-hover:bg-[#fe9000] group-hover:text-white transition-all duration-300 uppercase tracking-widest text-xs font-semibold cursor-pointer"
                >
                  Request a quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Beyond Production Section */}
      {beyondCards && beyondCards.length > 0 && (
        <section className="w-full bg-white pt-12 select-none">
          <div className="w-full flex flex-col">
            <h2 className="font-sans font-bold text-[42px] w769:text-[30px] uppercase tracking-[3px] text-center text-[#16110f] mb-16">
              {renderBeyondTitle()}
            </h2>

            <div className="w-full flex flex-row w769:flex-col overflow-hidden bg-[#16110f]">
              {beyondCards.map((block, bIdx) => (
                <div
                  key={block.category || bIdx}
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
                      {Array.isArray(block.col1) && block.col1.length > 0 && (
                        <ul className="w-1/2 flex flex-col gap-4.5">
                          {block.col1.map((item, iIdx) => (
                            <li
                              key={item.slug || iIdx}
                              className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:bg-[#ff9000] before:rounded-none"
                            >
                              <Link
                                href={item.slug?.startsWith("javascript") ? item.slug : `/our-expertise/${block.category}/${item.slug}`}
                                className="font-sans text-[16px] text-[#ff9000] hover:text-white transition-colors duration-300 tracking-wide font-normal block leading-snug"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                      {Array.isArray(block.col2) && block.col2.length > 0 && (
                        <ul className="w-1/2 flex flex-col gap-4.5">
                          {block.col2.map((item, iIdx) => (
                            <li
                              key={item.slug || iIdx}
                              className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:bg-[#ff9000] before:rounded-none"
                            >
                              <Link
                                href={item.slug?.startsWith("javascript") ? item.slug : `/our-expertise/${block.category}/${item.slug}`}
                                className="font-sans text-[16px] text-[#ff9000] hover:text-white transition-colors duration-300 tracking-wide font-normal block leading-snug"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Clients Carousel */}
      {showClients && <ClientsCarousel title={clientsTitle} />}

      {/* 6. CTA Let's Talk */}
      <div id="contact-section">
        <ContactSection
          title="Let's Talk Production"
          subtitle="Ready to bring your brand essence to life with high-impact photoshoot & video production? Let's connect over coffee."
          theme="dark"
        />
      </div>
    </main>
  );
}
