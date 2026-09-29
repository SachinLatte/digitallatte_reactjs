"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { getAssetPath } from "../../../../utils/assetPath";
import ContactSection from "../../../components/common/ContactSection";

const caseStudiesData = [
  {
    heading: (
      <>
        From brief to <br /> breakthrough
      </>
    ),
    lead: "High-quality, scalable original asset production built from the ground up.",
    checklist: [
      "AI can make the process faster.",
      "But great creative still needs direction.",
      "We bring strategy, creativity and AI together in a structured workflow designed to turn ideas into brand-ready output, not just interesting experiments.",
    ],
    image: "/img/ai-excellence/ai_case_fashion.webp",
    alt: "AI Creative Production",
  },
  {
    heading: (
      <>
        More versions. <br /> More possibilities.
      </>
    ),
    lead: "High-quality, scalable original asset production built from the ground up.",
    checklist: [
      "A campaign thought can become a film.",
      "A film can become multiple edits.",
      "A key visual can become an entire visual world.",
      "One market can become many languages, formats and audiences.",
      "AI helps us extend the life of an idea without sending every new execution back to the starting line.",
    ],
    image: "/img/ai-excellence/ai_case_product.webp",
    alt: "Photorealistic 3D Product Suite",
  },
  {
    heading: (
      <>
        Human thinking. <br /> AI-powered making
      </>
    ),
    lead: "High-quality, scalable original asset production built from the ground up.",
    checklist: [
      "AI can make more. We make it matter.",
      "AI brings speed, scale and possibility.",
      "We bring context, instinct, taste and intent.",
      "AI brings the possibilities. We bring the taste.",
      "The future isn't Human or AI, it is Human & AI.",
    ],
    image: "/img/ai-excellence/ai_case_character.webp",
    alt: "Character & Avatar Creation",
  },
  {
    heading: (
      <>
        From Possibility to <br /> Precision
      </>
    ),
    lead: "High-quality, scalable original asset production built from the ground up.",
    checklist: [
      "Great AI work is not about generating more.",
      "Getting every frame, expression & expression exactly right",
      "From visual consistency to final polish",
      "Until the work feels less like a generation.",
      "And more like a creative decision.",
    ],
    image: "/img/ai-excellence/ai_case_localization.webp",
    alt: "AI Transcreation & Localization",
  },
];

const aiServicesData = [
  {
    title: "AI Video Production",
    desc: "We combine creative concepts, scripting, storyboarding, AI-generated visuals, motion, editing, music and sound to create films without being restricted by conventional production setups.",
    image: "/img/ai-excellence/ai_service_video.webp",
    featured: true,
  },
  {
    title: "Generative AI",
    desc: "From concept films and performance creatives to social-first videos and campaign assets, we combine human creative direction with Generative AI to bring ambitious ideas to life.",
    image: "/img/ai-excellence/ai_service_generative.webp",
    featured: true,
  },
  {
    title: "AI Character Development",
    desc: "From mascots and fictional personalities to digital presenters and recurring brand characters, we develop distinctive AI-powered characters built for storytelling.",
    image: "/img/ai-excellence/ai_service_character.webp",
    featured: false,
  },
  {
    title: "AI Product Visualisation",
    desc: "Put your product anywhere. Without taking it everywhere. Create premium product imagery, environments and lifestyle compositions without organising a new shoot for every campaign, season or occasion.",
    image: "/img/ai-excellence/ai_service_product.webp",
    featured: false,
  },
  {
    title: "AI Audio Production",
    desc: "Multi-lingual studio-quality synthetic voices, voice cloning, sound design, and custom sonic branding.",
    image: "/img/ai-excellence/ai_service_voice.webp",
    featured: false,
  },
];

const uspData = [
  {
    title: "STRATEGY BEFORE PROMPTS",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    paragraphs: [
      'We don\'t begin by asking, "What can AI make?"'
    ],
  },
  {
    title: "BUILT AROUND YOUR BRAND",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    paragraphs: [
      "AI shouldn't make every brand look like it was made by AI."
    ],
  },
  {
    title: "HUMAN + AI",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="12" />
        <line x1="12" y1="12" x2="6" y2="6" />
        <line x1="12" y1="12" x2="18" y2="6" />
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="20" r="2.5" />
      </svg>
    ),
    paragraphs: [

      "AI accelerates exploration, production and iteration."
    ],
  },
  {
    title: "BUILT TO SCALE",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 19 22 12 13 5 13 19" />
        <polygon points="2 19 11 12 2 5 2 19" />
      </svg>
    ),
    paragraphs: [
      "One idea shouldn't have just one life."
    ],
  },
];

const clientLogos = [
  { name: "Hell Energy", src: "/img/clientele/top_brands/hell-energy-logo.webp" },
  { name: "Cradle of Life", src: "/img/clientele/real-estate/cradleoflife_logo.webp" },
  { name: "Cravana", src: "/img/clientele/fmcg/cravana_logo.webp" },
  { name: "Suhana", src: "/img/clientele/top_brands/suhana.webp" },
  { name: "Parrys", src: "/img/clientele/fmcg/parrys-logo.webp" },
  { name: "Goldiee", src: "/img/clientele/top_brands/goldiee_logo.webp" },
  { name: "Puneri Paltan", src: "/img/clientele/top_brands/puneripaltan_logo.webp" },
  { name: "EPL Global", src: "/img/clientele/B2B/essel.webp" },
  { name: "Revae Beaute", src: "/img/clientele/beauty/revae_logo.webp" },
];

const beyondPillars = [
  {
    title: "PRODUCTION",
    href: "/our-expertise/production-services",
    image: "/img/ai-excellence/production-service-carousel.webp",
    desc: "Capture your brand essence & bring imagination to life through concept photo & video...",
    linksCol1: [
      { name: "Concept Shoot", href: "/our-expertise/production-services/concept-shoot" },
      { name: "Logo Reveal Videos", href: "/our-expertise/production-services/logo-reveal-videos" },
      { name: "Digital Films", href: "/our-expertise/production-services/digital-films" },
    ],
    linksCol2: [
      { name: "Product Explainer Videos", href: "/our-expertise/production-services/product-explainer-videos" },
      { name: "Ecommerce Photography", href: "/our-expertise/production-services/ecommerce-photography" },
      { name: "2D Animation Videos", href: "/our-expertise/production-services/two-d-animation-videos" },
    ],
  },
  {
    title: "DIGITAL",
    href: "/our-expertise/digital-services",
    image: "/img/ai-excellence/digital-service-carousel.webp",
    desc: "Many firms can build you a website, Mobile App, Digital and Social media presence. Bu...",
    linksCol1: [
      { name: "Social Media Marketing", href: "/our-expertise/digital-services/social-media-marketing" },
      { name: "Search Engine Optimization(SEO)", href: "/our-expertise/digital-services/seo" },
      { name: "Enhanced Brand Content (A+ Content)", href: "/our-expertise/digital-services/amazon-enhanced-brand-content" },
      { name: "Google Analytics & Reporting", href: "/our-expertise/digital-services/google-analytics" },
    ],
    linksCol2: [
      { name: "Digital Media Planning", href: "/our-expertise/digital-services/digital-media-planning" },
      { name: "Digital Strategy Consulting", href: "/our-expertise/digital-services/digital-strategy-consulting" },
      { name: "Influencer & Celebrity Campaigns", href: "/our-expertise/digital-services/influencer-marketing" },
      { name: "Ecommerce & Quick Commerce Solutions", href: "/our-expertise/digital-services/ecommerce-solutions" },
    ],
  },
  {
    title: "DESIGN",
    href: "/our-expertise/design-services",
    image: "/img/ai-excellence/design-service-carousel.webp",
    desc: "Design, in every sense, has always been at the heart of what we do; Design that isn't ...",
    linksCol1: [
      { name: "User Experience Design", href: "/our-expertise/design-services/user-experience" },
      { name: "Print Design", href: "/our-expertise/design-services/print-designs" },
      { name: "Logo Designing", href: "/our-expertise/design-services/logo-designing" },
    ],
    linksCol2: [
      { name: "Brand Identity", href: "/our-expertise/design-services/brand-identity" },
      { name: "Digital Design", href: "/our-expertise/design-services/digital-designs" },
    ],
  },
  {
    title: "DEVELOPMENT",
    href: "/our-expertise/web-development-services",
    image: "/img/ai-excellence/devlopment-service-carousel.webp",
    desc: "We're a curious bunch of problem solvers helping clients grow through new digital products, platforms, and experiences. With scrupulous attention to quality...",
    linksCol1: [
      { name: "Website & Microsite Development", href: "/our-expertise/web-development-services/website-microsite" },
      { name: "Mobile Apps & Websites", href: "/our-expertise/web-development-services/mobile-applications" },
      { name: "Content Management Systems (CMS)", href: "/our-expertise/web-development-services/content-management-systems" },
    ],
    linksCol2: [
      { name: "Website Maintenance & Security", href: "/our-expertise/web-development-services/website-maintenance" },
      { name: "Ecommerce Solutions", href: "/our-expertise/web-development-services/ecommerce-solutions" },
    ],
  },
];

export default function AiExcellenceServices({ data, categoryKey }) {
  const sectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToContact = (e) => {
    e?.preventDefault?.();
    const contactEl = document.getElementById("contact-us") || document.querySelector("footer");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSlide = (index) => {
    const section = sectionRef.current || document.getElementById("ai-case-studies");
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollable = sectionHeight - windowHeight;
    if (totalScrollable <= 0) return;
    const targetScroll = sectionTop + (index / (caseStudiesData.length - 1)) * totalScrollable;
    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const section = sectionRef.current || document.getElementById("ai-case-studies");
    if (!section) return;

    const numSlides = caseStudiesData.length;
    let animFrameId = null;
    let targetProgress = 0;
    let currentProgress = 0;

    const updateScrollTargets = () => {
      const isMobile = window.innerWidth <= 991;
      if (isMobile) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalScrollable = sectionHeight - windowHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      targetProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
    };

    const render = () => {
      const isMobile = window.innerWidth <= 991;
      const stepEls = section.querySelectorAll(".ai-case-step");
      const dotEls = section.querySelectorAll(".ai-case-dot");

      if (isMobile) {
        stepEls.forEach((step) => {
          step.classList.add("active");
          step.style.pointerEvents = "auto";
          const media = step.querySelector(".ai-case-step-media");
          const content = step.querySelector(".ai-case-step-content");
          if (media) {
            media.style.transform = "";
            media.style.opacity = "";
            media.style.zIndex = "";
          }
          if (content) {
            content.style.transform = "";
            content.style.opacity = "";
            content.style.visibility = "visible";
          }
        });
        animFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth lerp for buttery 60/120fps motion
      currentProgress += (targetProgress - currentProgress) * 0.14;
      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }

      const floatIndex = currentProgress * (numSlides - 1);
      const activeIdx = Math.min(numSlides - 1, Math.max(0, Math.round(floatIndex)));

      stepEls.forEach((step, i) => {
        const diff = i - floatIndex;
        const media = step.querySelector(".ai-case-step-media");
        const content = step.querySelector(".ai-case-step-content");

        // 1. Media Cards (Stacked Cards Motion)
        if (media) {
          let translateY = 0;
          let scale = 1;
          let rotate = 0;
          let opacity = 1;
          let zIndex = 10;

          if (diff < 0) {
            // Card being scrolled past (drifts up slightly, scales down and fades out)
            translateY = diff * 120;
            scale = Math.max(0.88, 1 + diff * 0.05);
            rotate = diff * 4;
            opacity = Math.max(0, 1 + diff * 1.5);
            zIndex = Math.round(15 + i);
          } else if (diff <= 1.2) {
            // Current or next incoming card
            translateY = Math.max(0, diff * 540);
            scale = Math.max(0.92, 1 - diff * 0.04);
            rotate = diff * 3;
            opacity = 1;
            zIndex = Math.round(30 + i * 2);
          } else {
            // Future cards further down
            translateY = 650;
            scale = 0.9;
            opacity = 0;
            zIndex = 5;
          }

          media.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`;
          media.style.opacity = `${opacity}`;
          media.style.zIndex = `${zIndex}`;
          media.style.willChange = "transform, opacity";
        }

        // 2. Text Content (Clean Crossfade, Zero Overlap)
        if (content) {
          const absDiff = Math.abs(diff);
          if (absDiff < 0.55) {
            // Smooth fade and slight slide
            const textOpacity = Math.max(0, 1 - Math.pow(absDiff / 0.55, 2));
            const textTranslateY = diff * -30;
            content.style.transform = `translate3d(0, ${textTranslateY}px, 0)`;
            content.style.opacity = `${textOpacity}`;
            content.style.visibility = textOpacity > 0.02 ? "visible" : "hidden";
            content.style.pointerEvents = absDiff < 0.35 ? "auto" : "none";
          } else {
            content.style.opacity = "0";
            content.style.visibility = "hidden";
            content.style.pointerEvents = "none";
          }
          content.style.willChange = "transform, opacity";
        }

        step.classList.toggle("active", Math.abs(diff) < 0.5);
      });

      setActiveSlide(activeIdx);
      dotEls.forEach((dot, idx) => {
        dot.classList.toggle("active", (idx % numSlides) === activeIdx);
      });

      animFrameId = requestAnimationFrame(render);
    };

    updateScrollTargets();
    animFrameId = requestAnimationFrame(render);

    window.addEventListener("scroll", updateScrollTargets, { passive: true });
    window.addEventListener("resize", updateScrollTargets, { passive: true });
    if (window.lenis) {
      window.lenis.on("scroll", updateScrollTargets);
    }

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener("scroll", updateScrollTargets);
      window.removeEventListener("resize", updateScrollTargets);
      if (window.lenis) {
        window.lenis.off("scroll", updateScrollTargets);
      }
    };
  }, []);

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white">
      {/* 1. HERO BANNER */}
      <section className="w-full bg-[#ececec] relative overflow-hidden flex flex-row w992:flex-col items-center justify-between min-h-[700px] w1281:min-h-[600px] w992:min-h-0 pt-24 pb-12 w992:py-16 px-[13%] w1281:px-[8%] w992:px-6 select-none">
        <div className="relative z-10 max-w-[50%] w992:max-w-full w992:text-center select-none">
          <h1 className="font-sans text-[44px] w1470:text-[38px] w1281:text-[32px] w1025:text-[26px] w769:text-[22px] text-[#181414] leading-[1.55] tracking-[2px] uppercase select-none">
            WE&apos;RE PASSIONATE ABOUT <br />
            <span className="font-bold">BUILDING BRANDS</span> THROUGH <br />
            <span className="font-bold">MEANINGFUL DESIGN</span>
          </h1>
        </div>
        <div className="w-[48%] w1281:w-[50%] w992:w-full max-w-[620px] flex items-center justify-end w992:justify-center mt-0 w992:mt-8">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-auto max-h-[620px] w1470:max-h-[560px] w1281:max-h-[490px] object-contain rounded-2xl"
          >
            <source src={getAssetPath("/img/ai-excellence/ai-excellence-right-video.mp4")} type="video/mp4" />
          </video>
        </div>
      </section>

      {/* 2. BREADCRUMBS */}
      <div className="w-full bg-white py-6 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto font-libre font-bold text-[14px] text-[#000] tracking-[1.5px] flex items-center gap-1">
          <Link href="/" className="hover:text-[#ff9000] transition-colors">
            Home
          </Link>
          <Image
            src={getAssetPath("/img/right_arrow_new.webp")}
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1"
          />
          <Link href="/what-we-brew" className="hover:text-[#ff9000] transition-colors">
            Our Expertise
          </Link>
          <Image
            src={getAssetPath("/img/right_arrow_new.webp")}
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1"
          />
          <span className="text-[#ff9000] font-medium">AI Excellence</span>
        </div>
      </div>

      {/* 2.5 INTRO STATEMENT */}
      <section className="w-full bg-white py-16 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 flex flex-col text-center">
          <h2 className="font-sans text-[36px] w769:text-[28px] text-[#16110f] tracking-normal mb-8 select-none">
            <span className="block font-medium">
              AI Can Make Almost Anything. Still can&apos;t do the thinking.
            </span>
          </h2>
          <div className="font-libre text-center mx-auto text-[#000] text-[16px] w769:text-[14px] leading-[1.8] flex flex-col gap-6 select-none max-w-[950px]">
            <p className="font-light text-[#16110f] text-[16px] w769:text-[16px] leading-[1.6]">
              We bring strategy, creativity and AI together in a structured workflow designed to turn ideas into brand-ready output, not just interesting experiments.
            </p>
            <p className="font-light text-[#16110f] text-[16px] w769:text-[16px] leading-[1.6]">
              Because AI brings the speed. We bring the taste.
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CASE STUDIES STICKY STACK */}
      <section className="ai-case-studies-section relative w-full bg-[#ececec] h-[400vh] w992:h-auto w992:py-16" id="ai-case-studies" ref={sectionRef}>
        <div className="ai-sticky-track relative w-full h-full">
          <div className="ai-sticky-viewport sticky top-0 left-0 w-full h-screen w992:relative w992:h-auto flex items-center bg-[#ececec] overflow-hidden">
            <div className="custom_container w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto relative flex items-center">
              {/* Left Side Dot Progress Indicators (Desktop) */}
              <div className="ai-case-nav absolute -left-10 w1470:-left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40 w992:hidden">
                {caseStudiesData.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => scrollToSlide(dotIdx)}
                    className={`ai-case-dot cursor-pointer transition-all duration-300 ${activeSlide === dotIdx
                      ? "active w-[5px] h-[22px] bg-[#ff9000] rounded-full"
                      : "w-[5px] h-[5px] bg-[#999999]/60 hover:bg-[#ff9000] rounded-full"
                      }`}
                    data-slide={dotIdx}
                    aria-label={`Slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <div className="ai-case-steps-container relative w-full min-h-[560px] w992:min-h-auto w992:flex w992:flex-col w992:gap-16">
                {caseStudiesData.map((item, idx) => (
                  <div
                    key={idx}
                    className={`ai-case-step absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center justify-between gap-12 pointer-events-none w992:relative w992:top-auto w992:left-auto w992:translate-y-0 w992:flex-col-reverse w992:gap-8 w992:pointer-events-auto ${activeSlide === idx ? "active" : ""}`}
                    data-index={idx}
                  >
                    {/* Left Content */}
                    <div className="ai-case-step-content w-[48%] shrink-0 w992:w-full flex flex-col text-left">
                      <h3 className="ai-case-heading font-sans text-[50px] w1470:text-[42px] w1281:text-[36px] w769:text-[28px] font-semibold leading-[65px] w1281:leading-[1.2] text-[#111111] mb-[45px] tracking-[1px] uppercase">
                        {item.heading}
                      </h3>
                      <h2 className="ai-case-lead font-libre text-[22px] w1281:text-[18px] w769:text-[16px] font-medium leading-[32px] text-[#111111] mb-[45px] max-w-[535px] normal-case">
                        {item.lead}
                      </h2>
                      <ul className="ai-case-checklist flex flex-col gap-3.5 list-none p-0 m-0">
                        {item.checklist.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-[14px]">
                            <span className="ai-case-check-icon flex-shrink-0 w-[22px] h-[22px] rounded-full bg-[#111111] text-[#ffffff] flex items-center justify-center mt-[1px] shadow-sm">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                            <span className="flex items-center gap-[14px] font-libre text-[16px] leading-[1.5] text-[#2b2b2b] font-medium">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right 3D Media Card */}
                    <div className="ai-case-step-media w-[48%] shrink-0 w992:w-full flex items-center justify-end w992:justify-center">
                      <div className="ai-case-img-holder w-full max-w-[520px] h-[500px] w1281:h-[450px] w992:h-[360px] w501:h-[280px] rounded-[24px] overflow-hidden shadow-2xl bg-[#111111] border border-black/5 relative origin-center">
                        <Image
                          src={getAssetPath(item.image)}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 991px) 100vw, 520px"
                          priority={idx === 0}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AI SERVICES MOSAIC GRID */}
      <section className="w-full bg-white py-24 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="mb-12">
            <h2 className="font-sans text-[44px] w1470:text-[38px] w769:text-[28px] font-semibold leading-[1.2] text-[#111111] mb-[24px]  capitalize">
              <span className="font-semibold">AI-first</span> creative production
            </h2>
            <p className="font-libre text-[16px] w769:text-[14px] text-[#555555] leading-relaxed max-w-[850px]">
              You&apos;re under pressure to do more: faster, cheaper, and with fewer resources, while figuring out how to use AI safely and effectively. That&apos;s where we come in.
            </p>
          </div>

          <div className="grid grid-cols-6 w1200:grid-cols-2 w769:grid-cols-1 gap-6">
            {aiServicesData.map((item, idx) => (
              <div
                key={idx}
                onClick={scrollToContact}
                className={`${item.featured ? "col-span-3 w1200:col-span-1 min-h-[560px] w769:min-h-[420px]" : "col-span-2 w1200:col-span-1 min-h-[600px] w769:min-h-[400px]"
                  } relative rounded-[16px] overflow-hidden bg-[#121212] flex flex-col justify-end p-8 w769:p-6 shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-pointer group`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${getAssetPath(item.image)})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none transition-colors duration-300 group-hover:via-black/75" />
                <div className="relative z-10 text-left">
                  <h3 className="font-sans text-[28px] w1281:text-[23px] font-medium text-white mb-2.5 drop-shadow">
                    {item.title}
                  </h3>
                  <p className="font-libre text-[14.5px] w1281:text-[13.5px] text-white/90 leading-relaxed drop-shadow-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MID-PAGE BANNER / QUOTE */}
      <section
        className="w-full min-h-[660px] w769:min-h-[420px] bg-cover bg-center flex items-center py-20 select-none bg-black"
        style={{ backgroundImage: `url('${getAssetPath("/img/ai-excellence/ai-excellence-bg.webp")}')` }}
      >
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="max-w-[850px]">
            <h2 className="font-sans text-[4em] w1470:text-[4em] w1281:text-[3.2em] w769:text-[2.2em] w501:text-[1.8em] text-[#ffffff] font-medium uppercase tracking-[3px] leading-[85px] w1470:leading-[1.15] mb-[20px]">
              THE BEST AI DOESN&apos;T <br /> LOOK LIKE AI.
            </h2>
            <p className="font-libre text-[20px] w769:text-[16px] text-[#ffffff] leading-[1.5] mb-8">
              It doesn&apos;t ask for attention. It gives the idea more room to earn it.
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              className="px-8 py-3 rounded-full border border-white text-white hover:bg-white hover:text-[#16110f] font-libre text-[12px] font-semibold tracking-[1.5px] uppercase transition-colors duration-300 cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* 6. AI USP SECTION */}
      <section className="w-full bg-white py-24 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans text-[44px] w1470:text-[38px] w769:text-[28px] font-semibold leading-[1.2] text-[#111111] text-center mb-[24px] capitalize">
              Because AI can generate. <br /> Taste still needs humans
            </h2>
            <p className="font-libre text-[16px] w769:text-[14px] text-[#555555] text-center max-w-[850px] mx-auto leading-relaxed">
              Everyone has access to AI tools. What matters is the thinking, taste and creative judgment behind them. We bring years of brand, digital, design and content experience into AI-powered production, so the technology serves the idea, rather than becoming the idea.
            </p>
          </div>

          <div className="grid grid-cols-4 w1200:grid-cols-2 w769:grid-cols-1 gap-8">
            {uspData.map((usp, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
                <div className="w-[54px] h-[54px] rounded-[10px] bg-[#ff9000] group-hover:bg-[#16110f] text-white flex items-center justify-center mb-5 transition-colors duration-300 shadow-sm">
                  {usp.icon}
                </div>
                <h4 className="font-libre text-[22px] w1281:text-[18px] w769:text-[16px] font-medium leading-[30px] text-[#111111] mb-[12px] capitalize text-center">
                  {usp.title}
                </h4>
                {usp.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="font-libre text-[16px] w769:text-[14px] leading-[26px] text-[#4a4a4a] text-center mb-2 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AI CLIENTS / CREATIVE ADVANTAGE */}
      <section className="w-full bg-white pb-24 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="flex flex-row w992:flex-col gap-12 items-stretch">
            {/* Left Astronaut Image */}
            <div className="w-[38%] w992:w-full min-h-[480px] w992:min-h-[360px] rounded-[20px] overflow-hidden shadow-xl relative bg-black flex">
              <Image
                src={getAssetPath("/img/ai-excellence/ai_clients_astronaut.webp")}
                alt="Creative Advantage"
                fill
                sizes="(max-width: 991px) 100vw, 40vw"
                className="w-full h-full object-cover rounded-[20px] transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Right Copy & 9-Logo Grid */}
            <div className="w-[58%] w992:w-full flex flex-col justify-between">
              <div>
                <h2 className="font-sans text-[44px] w1470:text-[38px] w769:text-[28px] font-semibold leading-[1.2] text-[#111111] mb-[24px] capitalize">
                  Fresh Ideas. Now with infinite possibilities
                </h2>
                <p className="font-libre text-[16px] text-[#4a4a4a] leading-relaxed mb-8">
                  Built for brands that need to move at the speed of culture. Strategy. Content. Design. Digital. Production. And now AI. Different capabilities, one integrated creative partner.
                </p>
              </div>

              <div className="grid grid-cols-3 w501:grid-cols-2 gap-4">
                {clientLogos.map((logo, idx) => (
                  <div
                    key={idx}
                    className="relative bg-[#f8f9fa] border border-[#e9ecef] hover:border-[#ff9000] rounded-[14px] h-[125px] w769:h-[90px] flex items-center justify-center px-[22px] shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-md hover:-translate-y-1 transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group"
                    title={logo.name}
                  >
                    <Image
                      src={getAssetPath(logo.src)}
                      alt={logo.name}
                      width={120}
                      height={60}
                      className="w-[70%]  object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. AI CTA CARD */}
      <section className="w-full bg-[#16110f] py-20 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="max-w-[700px]">
            <h2 className="font-sans text-[42px] w1470:text-[36px] w769:text-[28px] text-white font-medium leading-tight mb-4 tracking-[0.8px]">
              Ready to put AI to work <br /> for your brand?
            </h2>
            <p className="font-libre text-[17px] text-neutral-300 leading-relaxed mb-8 max-w-[650px]">
              Just sharper ideas, faster experimentation, smarter production and more ways to bring great creative to life. Tell us what you want to create. We&apos;ll explore how far we can take it.
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              className="px-8 py-3 rounded-full bg-white text-[#16110f] hover:bg-[#ff9000] hover:text-white font-libre text-[13px] font-semibold tracking-[1.5px] uppercase transition-colors duration-300 cursor-pointer"
            >
              LET&apos;S TALK AI
            </button>
          </div>
        </div>
      </section>

      {/* 9. BEYOND AI SERVICES CAROUSEL */}
      <section className="w-full bg-white pt-20 pb-24 select-none overflow-hidden">
        {/* Section Heading */}
        <h2 className="font-sans text-[42px] w769:text-[30px] uppercase tracking-[3px] text-center text-[#16110f] select-none mb-16">
          <span className="font-light mr-2">BEYOND</span>
          <span className="font-medium">AI</span>
        </h2>

        {/* Carousel aligned flush to container on the left, trailing off on the right */}
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
              {(beyondPillars.length < 8 ? [...beyondPillars, ...beyondPillars] : beyondPillars).map((pillar, idx) => (
                <SwiperSlide key={idx} className="h-auto">
                  <div className="relative rounded-[16px] overflow-hidden bg-[#ebebeb] w-full group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                    {/* Clean Background Image */}
                    <Image
                      src={getAssetPath(pillar.image)}
                      alt={pillar.title}
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover object-center transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none block"
                    />

                    {/* Hover Overlay Container (fades in on hover) */}
                    <div className="absolute inset-0 bg-[#16110f]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-8 w1281:p-6 text-white z-10 rounded-[16px] overflow-y-auto">
                      {/* Category Title (Orange) */}
                      <h3 className="font-sans text-[45px] w1281:text-[28px] uppercase font-medium tracking-wide text-[#ff9000] mb-4">
                        <Link href={pillar.href} className="text-[#ff9000] hover:text-white transition-colors duration-300">
                          {pillar.title}
                        </Link>
                      </h3>

                      {/* Description Copy */}
                      <p className="font-libre text-[16px] w1281:text-[16px] text-white leading-relaxed mb-8">
                        <Link href={pillar.href} className="text-white hover:text-neutral-200 transition-colors">
                          {pillar.desc}
                        </Link>
                      </p>

                      {/* Subservice List links (Two columns with small white square bullets) */}
                      <div className="flex flex-row gap-6 w-full text-left">
                        <ul className="w-1/2 flex flex-col gap-3.5 list-none p-0 m-0">
                          {pillar.linksCol1.map((item, lIdx) => (
                            <li
                              key={lIdx}
                              className="relative pl-3.5 before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:bg-white before:rounded-none"
                            >
                              <Link
                                href={item.href}
                                className="font-sans text-[15px] w1281:text-[13px] text-[#ff9000] hover:text-white transition-colors duration-200 block leading-[26px] font-normal"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <ul className="w-1/2 flex flex-col gap-3.5 list-none p-0 m-0">
                          {pillar.linksCol2.map((item, lIdx) => (
                            <li
                              key={lIdx}
                              className="relative pl-3.5 before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:bg-white before:rounded-none"
                            >
                              <Link
                                href={item.href}
                                className="font-sans text-[15px] w1281:text-[13px] text-[#ff9000] hover:text-white transition-colors duration-200 block leading-[26px] font-normal"
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

      {/* 10. CONTACT SECTION */}
      <div id="contact-us">
        <ContactSection />
      </div>
    </main>
  );
}
