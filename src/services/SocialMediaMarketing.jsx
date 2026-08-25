"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  LuThumbsUp,
  LuFileText,
  LuSearch,
  LuTrendingUp,
  LuCoins,
  LuTarget,
  LuChevronLeft,
  LuChevronRight
} from "react-icons/lu";
import ContactSection from "../app/components/common/ContactSection";
import WorkShowcaseCarousel from "../app/components/ui/WorkShowcaseCarousel";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";

const recentWork = [
  { src: "/img/digital/social-meida-creatives/full-size/pinc2.png", alt: "PINC" },
  { src: "/img/digital/social-meida-creatives/full-size/bengal-warriors1.png", alt: "Bengal Warriors" },
  { src: "/img/digital/social-meida-creatives/full-size/dcb1.jpg", alt: "DCB Bank" },
  { src: "/img/digital/social-meida-creatives/full-size/goldiee1.jpg", alt: "Goldiee Masale" },
  { src: "/img/digital/social-meida-creatives/full-size/hocky1.jpg", alt: "Hockey Campaign" },
  { src: "/img/digital/social-meida-creatives/full-size/ku-1.png", alt: "Kaziranga University" },
  { src: "/img/digital/social-meida-creatives/full-size/puneripaltan1.jpg", alt: "Puneri Paltan" },
  { src: "/img/digital/social-meida-creatives/full-size/patna2.jpg", alt: "Patna Pirates" },
  { src: "/img/digital/social-meida-creatives/full-size/suhana.jpg", alt: "Suhana Masale" },
  { src: "/img/digital/social-meida-creatives/full-size/1-big.png", alt: "Creative 1" },
  { src: "/img/digital/social-meida-creatives/full-size/3-big.png", alt: "Creative 2" },
  { src: "/img/digital/social-meida-creatives/full-size/4-big.png", alt: "Creative 3" },
  { src: "/img/digital/social-meida-creatives/full-size/5-big.png", alt: "Creative 4" },
  { src: "/img/digital/social-meida-creatives/full-size/6-big.png", alt: "Creative 5" }
];

const otherServices = [
  { slug: "social-media-marketing", title: "Social Media Marketing", icon: LuThumbsUp },
  { slug: "content-marketing", title: "Content Marketing", icon: LuFileText },
  { slug: "seo", title: "Search Engine Optimization", icon: LuSearch },
  { slug: "google-analytics", title: "Google Analytics & Reporting", icon: LuTrendingUp },
  { slug: "digital-media-planning", title: "Digital Media Planning", icon: LuCoins },
  { slug: "digital-strategy-consulting", title: "Digital Strategy Consulting", icon: LuTarget }
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
      { title: "Ecommerce Solutions", slug: "ecommerce-solutions" }
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

export default function SocialMediaMarketing() {
  const swiperServicesRef = useRef(null);

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white">

      {/* 1. Header Banner */}
      <section className="w-full bg-[#ececec] pt-32 pb-16  flex items-center justify-center min-h-[350px]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto flex flex-row items-center gap-8 w769:gap-4 select-none">
          <Image
            src="/img/social-media-marketing.png"
            alt="Social Media Marketing Icon"
            width={85}
            height={85}
            className="w-[85px] h-[85px] object-contain flex-shrink-0 w769:w-[60px] w769:h-[60px]"
          />
          <h1 className="text-left leading-[1.5] uppercase tracking-[1px]">
            <span className="font-sans block text-[38px] w1470:text-[28px] w1281:text-[24px] w769:text-[18px] text-[#181414] font-medium">Social Media</span>
            <span className="font-sans block text-[38px] w1470:text-[40px] w1281:text-[34px] w769:text-[24px] text-[#181414] -mt-1 font-bold"> Marketing</span>
          </h1>
        </div>
      </section>

      {/* 2. Breadcrumbs */}
      <div className="w-full bg-white py-6 select-none border-b border-neutral-100">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-2 font-libre font-bold text-[14px] text-[#000] tracking-[1.5px] flex items-center gap-1 select-none">
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
          <span className="text-[#ff9000] font-medium">Social Media Marketing</span>
        </div>
      </div>

      {/* 3. Bio Description Section */}
      <section className="w-full bg-white py-20 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 flex flex-col text-center">
          <h2 className="font-sans text-[36px] w769:text-[24px] text-[#16110f] tracking-normal mb-8 leading-snug font-medium">
            Don&apos;t Just Connect With People, Connect With The Right People.
          </h2>
          <div className="font-libre text-[#16110f] text-[16px] w769:text-[14px] leading-[1.8] flex flex-col gap-6 font-light mx-auto">
            <p>
              Customers today are more engaged than ever before, thanks to the Social Media that gives them direct access to businesses.
              But the story isn&apos;t the same for the brands. Not only is it difficult for brands to find the right Social Media Strategy,
              but cutting through the noise is overwhelming.
            </p>
            <p>
              Social media can be the cornerstone of your online content mix, supporting aspects like website traffic driving, PR outreach,
              remarketing via paid adverts, and provide a genuine input to your CRM. We isolate key Social Media Marketing platforms that
              present opportunities for your brand and outline strategies to develop, manage, and grow those platforms.
            </p>
            <p>
              Our Social Media Marketing team can help your brand engage with your audience through compelling designs, unique applications,
              meaningful interactions, and relevant content primed to entice participation and feedback.
            </p>
            <p>
              If you&apos;re looking for creative &amp; fresh ways to leverage Social Media Marketing &amp; build an online community, we can help you
              realise your social media marketing goals.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Orange Statement Banner (Dark Background) */}
      <section className="w-full bg-[#16110f] py-20 px-6 sm:px-12 text-center text-white relative overflow-hidden select-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff9000]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="mx-auto relative z-10">
          <p className="font-sans text-[35px] w1281:text-[24px] w769:text-[18px] leading-relaxed tracking-wide text-gray-300 uppercase">
            <span className="font-sans font-bold text-white">Social Media</span> <span className="text-[#ff9000] font-sans font-bold">is not a marketing tool,</span> it’s a <br />
            conversation – and it’s <span className="text-[#ff9000] font-sans font-bold">happening with or without you.</span>
          </p>
        </div>
      </section>

      {/* 5. Recent Work Grid with Carousel */}
      <section className="py-24 w769:py-16 w501:py-12 bg-white text-[#16110f] border-t border-neutral-100">
        <div className="w-[90%] mx-auto text-center flex flex-col items-center">
          <h2 className="font-bold text-[42px] w769:text-[30px] text-[#181414] uppercase tracking-[1px] font-light text-center mb-5 select-none">
            <span className="font-medium">RECENT</span> WORK
          </h2>

          {/* Dynamic Reusable Carousel Component */}
          <div className="w-full mt-4">
            <WorkShowcaseCarousel
              items={recentWork.map((item) => ({
                src: item.src,
                title: item.alt,
              }))}
              slidesPerView={3}
              loop={true}
              autoplay={true}
            />
          </div>
        </div>
      </section>

      {/* 6. Other Digital Services Carousel */}
      <section className="w-full bg-[#16110f] py-24 select-none overflow-hidden relative">
        <div className="w-[90%] mx-auto px-4 relative">
          <h2 className="font-sans font-bold text-[42px] w769:text-[30px] text-white uppercase tracking-[2px] text-center mb-16">
            <span className="font-sans font-light">Other Digital</span> Services
          </h2>

          <div className="relative w-full flex items-center px-12 w769:px-0">
            {/* Left Button */}
            <button
              onClick={() => swiperServicesRef.current?.slidePrev()}
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
              className="absolute right-0 w769:-right-4 z-20 flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-white/5 transition-colors"
            >
              <LuChevronRight className="w-8 h-8 text-neutral-500 hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Beyond Digital Section (Hover overlays) */}
      <section className="w-full bg-white pt-24 select-none">
        <div className="w-full flex flex-col">
          {/* Section Title */}
          <h2 className="font-sans font-bold text-[42px] w769:text-[30px] uppercase tracking-[3px] text-center text-[#16110f] mb-16">
            <span className="font-sans font-light mr-2">Beyond</span>
            <span>Digital</span>
          </h2>

          {/* 3-Column Grid Block */}
          <div className="w-full flex flex-row w769:flex-col overflow-hidden bg-[#16110f]">
            {beyondDigital.map((block) => (
              <div
                key={block.category}
                className="w-1/3 w769:w-full relative overflow-hidden aspect-square group bg-neutral-900"
              >
                {/* Default Category Image */}
                <Image
                  src={block.image}
                  alt={block.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-all duration-700 select-none"
                />

                {/* Hover Overlay */}
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

                  {/* Subservice List links */}
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
        title="Brew Something Fresh"
        subtitle="Have a digital project, design challenge, or production need? Let's talk over coffee."
        theme="dark"
      />
    </main>
  );
}
