"use client";

import { getAssetPath } from "../utils/assetPath";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import {
  LuUserCheck,
  LuSparkles,
  LuWand,
  LuSlidersHorizontal,
  LuLayers,
  LuShieldCheck,
  LuPackageCheck,
  LuArrowRight,
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuMaximize2,
  LuVideo,
  LuMic,
  LuBox,
  LuFileText
} from "react-icons/lu";
import ContactSection from "../app/components/common/ContactSection";
import BeyondServicesCarousel from "../app/components/common/BeyondServicesCarousel";

// Batch 1 Showcase Gallery (Initial 6 items)
const batch1Items = [
  {
    id: "char-1",
    title: "Emotive Digital Brand Ambassador",
    category: "Virtual Ambassador",
    image: "/img/ai-excellence/ai_service_character.webp",
    type: "standard"
  },
  {
    id: "char-2",
    title: "Photorealistic Persona Staging",
    category: "Character Design",
    image: "/img/ai-excellence/ai_case_character.webp",
    type: "standard"
  },
  {
    id: "char-3",
    title: "Haute Couture Virtual Influencer",
    category: "AI Fashion Model",
    image: "/img/ai-excellence/ai_case_fashion.webp",
    type: "standard"
  },
  {
    id: "char-4",
    title: "Editorial Style Character Portrait",
    category: "Studio Portrait",
    image: "/img/ai-excellence/ai-video-production/ai_service_image.webp",
    type: "standard"
  },
  {
    id: "char-5",
    title: "Hero Narrative Protagonist",
    category: "Cinematic Character",
    image: "/img/ai-excellence/ai_clients_astronaut.webp",
    type: "featured"
  },
  {
    id: "char-6",
    title: "Futuristic Cybernetic Archetype",
    category: "Sci-Fi Persona",
    image: "/img/ai-excellence/ai-video-production/ai_cta_astronaut.webp",
    type: "standard"
  }
];

// Batch 2 Showcase Gallery (Revealed on Load More)
const batch2Items = [
  {
    id: "char-7",
    image: "/img/ai-excellence/ai_case_localization.webp",
    type: "featured"
  },
  {
    id: "char-8",
    image: "/img/ai-excellence/ai_service_generative.webp",
    type: "standard"
  },
  {
    id: "char-9",
    image: "/img/ai-excellence/ai_service_product.webp",
    type: "standard"
  },
  {
    id: "char-10",
    image: "/img/ai-excellence/ai_case_product.webp",
    type: "standard"
  },
  {
    id: "char-11",
    image: "/img/ai-excellence/ai_service_voice.webp",
    type: "standard"
  },
  {
    id: "char-12",
    image: "/img/ai-excellence/ai-video-production/ai_service_motion.webp",
    type: "standard"
  }
];

// 8 Pipeline Stages for AI Character Development
const pipelineStages = [
  {
    title: "Archetype & Persona Blueprint",
    icon: LuUserCheck,
    desc: "Defining visual identity, emotional range, brand values, demographic resonance, and narrative backstory."
  },
  {
    title: "Facial Consistency Training",
    icon: LuSlidersHorizontal,
    desc: "Training custom LoRA neural checkpoints ensuring 100% facial, anatomical, and lighting consistency across angles."
  },
  {
    title: "Wardrobe & Styling Design",
    icon: LuLayers,
    desc: "Developing signature wardrobe collections, seasonal lookbooks, and brand-aligned apparel palettes."
  },
  {
    title: "Micro-Expressions & Posing",
    icon: LuSparkles,
    desc: "Synthesizing authentic micro-expressions, emotive eye contact, dynamic postures, and human body language."
  },
  {
    title: "Contextual Scene Integration",
    icon: LuMaximize2,
    desc: "Placing characters into hyper-realistic commercial environments, outdoor lifestyle settings, and studio sets."
  },
  {
    title: "Voice & Speech Lip-Sync",
    icon: LuMic,
    desc: "Integrating bespoke neural voice cloning with accurate phoneme-level lip synchronization across languages."
  },
  {
    title: "Brand Safety & Guardrails",
    icon: LuShieldCheck,
    desc: "Establishing rigorous behavioral frameworks, brand safety guidelines, and complete IP copyright safeguards."
  },
  {
    title: "Multi-Format Asset Master",
    icon: LuPackageCheck,
    desc: "Exporting high-resolution 8K key visuals, social media content packages, transparent cutouts, and video assets."
  }
];

// Kinetic Other AI Services
const kineticServices = [
  {
    title: "AI Video Production",
    slug: "ai-video-production",
    icon: LuVideo,
    desc: "Cinematic commercial films, motion visuals & generative video production."
  },
  {
    title: "Generative AI",
    slug: "generative-ai",
    icon: LuWand,
    desc: "Creative intelligence pipelines & multimodal generative engines."
  },
  {
    title: "AI Product Visualisation",
    slug: "ai-product-visualisation",
    icon: LuBox,
    desc: "Photorealistic 3D product staging, CGI visuals & hyper-detailed renderings."
  },
  {
    title: "AI Audio Production",
    slug: "ai-audio-production",
    icon: LuMic,
    desc: "Studio-quality synthetic voice synthesis, sonic branding & acoustic soundscapes."
  }
];

export default function AiCharacterDevelopment() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Load More state
  const [showBatch2, setShowBatch2] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Lightbox / Lightgallery state
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Kinetic Stream Active Index
  const [activeKineticIndex, setActiveKineticIndex] = useState(0);

  // All active gallery items combined based on whether batch 2 is loaded
  const allGalleryItems = showBatch2 ? [...batch1Items, ...batch2Items] : batch1Items;

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : allGalleryItems.length - 1));
  }, [allGalleryItems.length]);

  const handleNextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev < allGalleryItems.length - 1 ? prev + 1 : 0));
  }, [allGalleryItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };

    if (lightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [lightboxIndex, handlePrevImage, handleNextImage]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setShowBatch2(true);
      setIsLoadingMore(false);
    }, 450);
  };

  const scrollToContact = (e) => {
    if (e) e.preventDefault();
    const contactEl = document.getElementById("say_hello") || document.getElementById("contact-us") || document.querySelector("footer");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ActiveKineticIcon = kineticServices[activeKineticIndex]?.icon || LuVideo;
  const currentLightboxItem = lightboxIndex !== null ? allGalleryItems[lightboxIndex] : null;

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white text-[#16110f] overflow-x-hidden">
      {/* 1. Header Banner */}
      <section className="w-full bg-[#ececec] pt-32 pb-16 flex items-center justify-center min-h-[350px]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto flex flex-row items-center gap-8 w769:gap-4 select-none">
          <Image
            src={getAssetPath("/img/ai-excellence/ai-character-development.svg")}
            alt="AI Character Development Icon"
            width={85}
            height={85}
            priority
            className="w-[85px] h-[85px] object-contain flex-shrink-0 w769:w-[60px] w769:h-[60px]"
          />
          <h1 className="text-left leading-[1.5] uppercase tracking-[1px]">
            <span className="font-sans block text-[38px] w1470:text-[28px] w1281:text-[24px] w769:text-[18px] text-[#181414] font-bold">
              AI Character
            </span>
            <span className="font-sans block text-[38px] w1470:text-[40px] w1281:text-[34px] w769:text-[24px] text-[#181414] -mt-1 font-medium">
              Development
            </span>
          </h1>
        </div>
      </section>

      {/* 2. Breadcrumbs */}
      <div className="w-full bg-white py-4 sm:py-6 select-none border-b border-neutral-100">
        <div className="w-[85%] w1470:w-[88%] w1281:w-[90%] w769:w-[92%] mx-auto px-2 font-libre font-medium text-[12px] sm:text-[14px] text-[#000] tracking-[1px] sm:tracking-[1.5px] flex items-center gap-1 select-none flex-wrap">
          <Link href="/what-we-brew" className="hover:text-[#ff9000] transition-colors">
            Our Expertise
          </Link>
          <Image
            src={`${basePath}/img/right_arrow_new.webp`}
            alt="arrow"
            width={10}
            height={10}
            className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] object-contain select-none pointer-events-none mx-1"
          />
          <Link href="/our-expertise/ai-excellence" className="hover:text-[#ff9000] transition-colors">
            AI Excellence
          </Link>
          <Image
            src={`${basePath}/img/right_arrow_new.webp`}
            alt="arrow"
            width={10}
            height={10}
            className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] object-contain select-none pointer-events-none mx-1"
          />
          <span className="text-[#ff9000] font-medium">AI Character Development</span>
        </div>
      </div>

      {/* 3. Bio Description Section */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20 select-none">
        <div className="w-[85%] w1470:w-[88%] w1281:w-[90%] w769:w-[92%] mx-auto px-2 sm:px-4 flex flex-col text-center">
          <h2 className="font-sans text-[24px] sm:text-[30px] md:text-[36px] text-[#16110f] tracking-normal mb-6 sm:mb-8 leading-snug font-medium">
            <span>Distinctive Virtual Brand Ambassadors &amp; Avatars.</span>{" "}
            <br className="hidden sm:inline" />
            <span>Reimagined with AI.</span>
          </h2>
          <div className="font-libre text-[#16110f] text-[15px] sm:text-[16px] leading-[1.7] sm:leading-[1.8] flex flex-col gap-4 sm:gap-6 font-light mx-auto text-left sm:text-center max-w-4xl">
            <p>
              From bespoke brand mascots and hyper-realistic virtual influencers to emotive digital presenters and recurring narrative protagonists, we develop unforgettable AI characters engineered for multi-platform storytelling and deep audience connection.
            </p>
            <p>
              Our character development pipeline merges character archetype design, high-fidelity neural face consistency models, emotive rigging, and bespoke styling frameworks to ensure your virtual ambassador maintains identical facial features, wardrobe consistency, and brand personality across every campaign.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Process Pipeline Section ("From Persona Archetype to Living Character") */}
      <section className="w-full py-14 sm:py-20 bg-[#f8f9fb] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] select-none border-y border-neutral-200/60">
        <div className="w-[85%] w1470:w-[90%] w769:w-[92%] mx-auto px-2 sm:px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="font-sans font-bold text-[24px] sm:text-[30px] md:text-[38px] text-[#111111] uppercase tracking-[1px] sm:tracking-[1.5px] mb-3 sm:mb-4">
              From Persona Archetype to Living Character
            </h2>
            <p className="font-libre text-[14px] sm:text-[16px] text-neutral-600 font-normal leading-relaxed">
              A structured 8-stage neural character creation journey engineered for absolute consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {pipelineStages.map((stage, sIdx) => {
              const StageIcon = stage.icon;
              return (
                <div
                  key={sIdx}
                  className="bg-white border border-[#ffd39b] hover:border-[#ff9000] rounded-2xl p-5 sm:p-7 flex flex-col justify-start transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.08),0_0_20px_rgba(255,144,0,0.12)] group"
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="font-sans text-[18px] sm:text-[21px] font-semibold text-[#111111] tracking-[0.5px] uppercase">
                      {stage.title}
                    </h3>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#ff9000] text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm flex-shrink-0">
                      <StageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                  <p className="font-libre text-[13.5px] sm:text-[15px] leading-[1.6] text-neutral-600">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Start a Project CTA Button */}
          <div className="flex justify-center mt-10 sm:mt-12">
            <a
              href="#say_hello"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center px-7 sm:px-8 py-3 rounded-full border border-[#000] bg-[#000] text-[#fff] hover:bg-[#ff9000] hover:border-[#ff9000] transition-all duration-300 font-sans font-bold text-[12px] sm:text-[13px] tracking-widest uppercase cursor-pointer"
            >
              Start A Project
            </a>
          </div>
        </div>
      </section>

      {/* 5. MID-PAGE BANNER / QUOTE */}
      <section
        className="w-full min-h-[380px] sm:min-h-[480px] md:min-h-[580px] lg:min-h-[660px] bg-cover bg-center flex items-center py-14 sm:py-20 select-none bg-black relative"
        style={{ backgroundImage: `url('${getAssetPath("/img/ai-excellence/ai-excellence-bg.webp")}')` }}
      >
        <div className="w-[85%] w1470:w-[88%] w1281:w-[90%] w769:w-[92%] mx-auto relative z-10">
          <div className="max-w-[850px]">
            <h2 className="font-sans text-[26px] sm:text-[36px] md:text-[48px] lg:text-[56px] text-[#ffffff] font-medium uppercase tracking-[1.5px] sm:tracking-[2.5px] leading-[1.5] sm:leading-[1.5] mb-4 sm:mb-6">
              <span>CHARACTERS THAT DON&apos;T JUST LOOK REAL.</span>
            </h2>
            <p className="font-libre text-[15px] sm:text-[18px] md:text-[20px] text-[#ffffff] leading-[1.5] mb-6 sm:mb-8 max-w-2xl font-light">
              Build unforgettable brand equity with consistent, scalable virtual ambassadors that speak your language and evolve with your audience.
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white text-white hover:bg-white hover:text-[#16110f] font-libre text-[11px] sm:text-[12px] font-semibold tracking-[1.5px] uppercase transition-colors duration-300 cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* 6. Recent Work Showcase (Interactive Lightgallery / Lightbox Grid) */}
      <section className="py-16 sm:py-24 bg-[#f8f9fb] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:44px_44px] text-[#16110f] select-none overflow-hidden relative border-b border-neutral-200/80">
        {/* Ambient Corner Lighting Accents */}
        <div className="absolute top-0 right-0 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-gradient-to-bl from-[#ff9000]/10 via-[#ff9000]/[0.02] to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-gradient-to-tr from-[#ff9000]/8 via-[#ff9000]/[0.02] to-transparent blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60 pointer-events-none" />

        <div className="w-[85%] w1470:w-[90%] w769:w-[92%] mx-auto px-2 sm:px-4 relative z-10">
          <h2 className="font-sans font-bold text-[28px] sm:text-[36px] md:text-[42px] text-[#16110f] uppercase tracking-[1.5px] sm:tracking-[2px] text-center mb-10 sm:mb-16">
            <span className="font-sans font-light mr-2">Recent</span>
            <span>Work</span>
          </h2>

          {/* Batch 1 Mosaic Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 sm:gap-5 w-full h-auto lg:h-[680px] w1281:lg:h-[560px]">
            {/* Left Block (2/3 width on desktop): 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 sm:gap-5 h-full">
              {batch1Items.slice(0, 4).map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenLightbox(idx)}
                  className="relative rounded-xl overflow-hidden bg-[#11141b] border border-neutral-200 hover:border-[#ff9000]/70 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[220px] sm:h-[240px] lg:h-auto min-h-0 group flex items-center justify-center"
                >
                  <Image
                    src={getAssetPath(item.image)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                  />

                  {/* Hover Overlay with Zoom Icon & Meta */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-5">
                    <div className="w-10 h-10 rounded-full bg-[#ff9000] text-white flex items-center justify-center mb-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                      <LuMaximize2 className="w-4 h-4" />
                    </div>
                    <span className="text-[#ff9000] font-sans font-bold text-[11px] tracking-widest uppercase">
                      {item.category}
                    </span>
                    <h4 className="text-white font-sans font-semibold text-[15px] sm:text-[16px] leading-tight">
                      {item.title}
                    </h4>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Right Block (1/3 width on desktop): 1 Featured (2/3 flex) + 1 Standard (1/3 flex) */}
            <div className="flex flex-col gap-4 sm:gap-5 h-full">
              {/* Featured Card */}
              <div
                onClick={() => handleOpenLightbox(4)}
                className="relative rounded-xl overflow-hidden bg-[#11141b] border border-neutral-200 hover:border-[#ff9000]/70 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-[2] h-[260px] sm:h-[280px] lg:h-auto min-h-[220px] lg:min-h-0 group flex items-center justify-center"
              >
                <Image
                  src={getAssetPath(batch1Items[4].image)}
                  alt={batch1Items[4].title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-5">
                  <div className="w-10 h-10 rounded-full bg-[#ff9000] text-white flex items-center justify-center mb-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                    <LuMaximize2 className="w-4 h-4" />
                  </div>
                  <span className="text-[#ff9000] font-sans font-bold text-[11px] tracking-widest uppercase">
                    {batch1Items[4].category}
                  </span>
                  <h4 className="text-white font-sans font-semibold text-[16px] sm:text-[18px] leading-tight">
                    {batch1Items[4].title}
                  </h4>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Bottom Standard Card */}
              <div
                onClick={() => handleOpenLightbox(5)}
                className="relative rounded-xl overflow-hidden bg-[#11141b] border border-neutral-200 hover:border-[#ff9000]/70 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-[1] h-[200px] sm:h-[220px] lg:h-auto min-h-[180px] lg:min-h-0 group flex items-center justify-center"
              >
                <Image
                  src={getAssetPath(batch1Items[5].image)}
                  alt={batch1Items[5].title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-5">
                  <div className="w-10 h-10 rounded-full bg-[#ff9000] text-white flex items-center justify-center mb-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                    <LuMaximize2 className="w-4 h-4" />
                  </div>
                  <span className="text-[#ff9000] font-sans font-bold text-[11px] tracking-widest uppercase">
                    {batch1Items[5].category}
                  </span>
                  <h4 className="text-white font-sans font-semibold text-[15px] sm:text-[16px] leading-tight">
                    {batch1Items[5].title}
                  </h4>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Batch 2 (Flipped Grid Layout - Revealed on Load More) */}
          {showBatch2 && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 sm:gap-5 w-full h-auto lg:h-[680px] w1281:lg:h-[560px] mt-4 sm:mt-5 animate-fadeIn">
              {/* Left Block (1/3 width on desktop): 1 Featured + 1 Standard */}
              <div className="flex flex-col gap-4 sm:gap-5 h-full">
                {/* Featured Card */}
                <div
                  onClick={() => handleOpenLightbox(6)}
                  className="relative rounded-xl overflow-hidden bg-[#11141b] border border-neutral-200 hover:border-[#ff9000]/70 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-[2] h-[260px] sm:h-[280px] lg:h-auto min-h-[220px] lg:min-h-0 group flex items-center justify-center"
                >
                  <Image
                    src={getAssetPath(batch2Items[0].image)}
                    alt={batch2Items[0].title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-5">
                    <div className="w-10 h-10 rounded-full bg-[#ff9000] text-white flex items-center justify-center mb-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                      <LuMaximize2 className="w-4 h-4" />
                    </div>
                    <span className="text-[#ff9000] font-sans font-bold text-[11px] tracking-widest uppercase">
                      {batch2Items[0].category}
                    </span>
                    <h4 className="text-white font-sans font-semibold text-[16px] sm:text-[18px] leading-tight">
                      {batch2Items[0].title}
                    </h4>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Standard Card */}
                <div
                  onClick={() => handleOpenLightbox(7)}
                  className="relative rounded-xl overflow-hidden bg-[#11141b] border border-neutral-200 hover:border-[#ff9000]/70 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-[1] h-[200px] sm:h-[220px] lg:h-auto min-h-[180px] lg:min-h-0 group flex items-center justify-center"
                >
                  <Image
                    src={getAssetPath(batch2Items[1].image)}
                    alt={batch2Items[1].title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-5">
                    <div className="w-10 h-10 rounded-full bg-[#ff9000] text-white flex items-center justify-center mb-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                      <LuMaximize2 className="w-4 h-4" />
                    </div>
                    <span className="text-[#ff9000] font-sans font-bold text-[11px] tracking-widest uppercase">
                      {batch2Items[1].category}
                    </span>
                    <h4 className="text-white font-sans font-semibold text-[15px] sm:text-[16px] leading-tight">
                      {batch2Items[1].title}
                    </h4>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Right Block (2/3 width on desktop): 2x2 grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 sm:gap-5 h-full">
                {batch2Items.slice(2, 6).map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenLightbox(idx + 8)}
                    className="relative rounded-xl overflow-hidden bg-[#11141b] border border-neutral-200 hover:border-[#ff9000]/70 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[220px] sm:h-[240px] lg:h-auto min-h-0 group flex items-center justify-center"
                  >
                    <Image
                      src={getAssetPath(item.image)}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-5">
                      <div className="w-10 h-10 rounded-full bg-[#ff9000] text-white flex items-center justify-center mb-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                        <LuMaximize2 className="w-4 h-4" />
                      </div>
                      <span className="text-[#ff9000] font-sans font-bold text-[11px] tracking-widest uppercase">
                        {item.category}
                      </span>
                      <h4 className="text-white font-sans font-semibold text-[15px] sm:text-[16px] leading-tight">
                        {item.title}
                      </h4>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Load More Button */}
          {!showBatch2 && (
            <div className="text-center mt-10 sm:mt-12">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#16110f] hover:bg-white text-white hover:text-[#16110f] border-2 border-[#16110f] font-sans font-bold text-[12px] sm:text-[13px] tracking-widest uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
              >
                {isLoadingMore ? (
                  <>
                    <span>Loading...</span>
                    <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                  </>
                ) : (
                  <span>Load More Work</span>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 7. Other AI Services (Kinetic Stream Section) */}
      <section className="w-full bg-[#080808] text-[#f5f5f5] py-16 sm:py-24 select-none relative overflow-hidden">
        {/* Atmospheric Glow */}
        <div className="absolute top-1/4 right-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#ff9000]/10 blur-[100px] sm:blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-[5%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-[#ff9000]/5 blur-[80px] sm:blur-[100px] pointer-events-none" />

        <div className="w-[85%] w1470:w-[90%] w769:w-[92%] mx-auto px-2 sm:px-4 relative z-10">
          <h2 className="font-sans font-bold text-[28px] sm:text-[34px] md:text-[38px] text-[#ff9000] uppercase tracking-[1.5px] sm:tracking-[2px] text-center mb-10 sm:mb-16">
            <span className="font-light text-white mr-2">Other</span>
            <span>AI Services</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Stream Column */}
            <div className="lg:col-span-7 flex flex-col divide-y divide-white/10">
              {kineticServices.map((srv, idx) => {
                const Icon = srv.icon;
                const isActive = activeKineticIndex === idx;
                return (
                  <Link
                    key={srv.slug}
                    href={`/our-expertise/ai-excellence/${srv.slug}`}
                    onMouseEnter={() => setActiveKineticIndex(idx)}
                    className={`group relative py-5 sm:py-8 px-2 flex items-center justify-between transition-all duration-300 cursor-pointer ${isActive ? "translate-x-1 sm:translate-x-3 text-[#ff9000]" : "hover:translate-x-1 sm:hover:translate-x-2 text-white"
                      }`}
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span
                        className={`font-mono text-[14px] sm:text-[16px] transition-colors duration-300 ${isActive ? "text-[#ff9000] font-bold" : "text-neutral-500 group-hover:text-[#ff9000]"
                          }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3
                          className={`font-sans text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-wide transition-all duration-300 ${isActive
                            ? "text-[#ff9000] drop-shadow-[0_0_20px_rgba(255,144,0,0.4)]"
                            : "text-white group-hover:text-[#ff9000]"
                            }`}
                        >
                          {srv.title}
                        </h3>
                        <p className="font-libre text-[13.5px] sm:text-[15px] text-neutral-400 mt-1 font-light max-w-md hidden sm:block">
                          {srv.desc}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isActive
                        ? "bg-[#ff9000] text-black scale-105 sm:scale-110 shadow-[0_0_20px_rgba(255,144,0,0.5)]"
                        : "text-neutral-500 group-hover:text-[#ff9000] group-hover:scale-105"
                        }`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    {/* Active Bottom Line */}
                    <div
                      className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#ff9000] via-white/20 to-transparent transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-1/2"
                        }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right Sticky Spotlight Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center justify-center p-6 sm:p-8 backdrop-blur-md min-h-[320px] sm:min-h-[420px] text-center relative overflow-hidden rounded-2xl">
              {/* Huge Watermark Number */}
              <span className="font-sans font-extrabold text-[120px] sm:text-[160px] text-white/[0.03] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
                {String(activeKineticIndex + 1).padStart(2, "0")}
              </span>

              {/* Corona Animated Ring */}
              <div className="relative w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center mb-4 sm:mb-6">
                <div className="absolute inset-0 rounded-full border border-dashed border-[#ff9000]/30 animate-[spin_24s_linear_infinite]" />
                <div className="absolute inset-2 sm:inset-3 rounded-full border border-[#ff9000]/15" />
                <div className="absolute inset-[-10px] rounded-full bg-[#ff9000]/20 blur-xl pointer-events-none" />

                <div className="relative z-10 text-[#ff9000] transition-all duration-300 scale-100">
                  <ActiveKineticIcon className="w-12 h-12 sm:w-16 sm:h-16 filter drop-shadow-[0_0_20px_rgba(255,144,0,0.7)]" />
                </div>
              </div>

              {/* Spotlight Title & Link */}
              <div className="relative z-10 max-w-sm">
                <h3 className="font-sans font-bold text-[20px] sm:text-[24px] text-white leading-snug mb-2 sm:mb-3">
                  {kineticServices[activeKineticIndex]?.title}
                </h3>
                <Link
                  href={`/our-expertise/ai-excellence/${kineticServices[activeKineticIndex]?.slug}`}
                  className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] text-[#ff9000] hover:text-white font-medium transition-colors"
                >
                  <span>Learn More</span>
                  <LuArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Beyond AI Section */}
      <BeyondServicesCarousel currentCategory="ai-excellence" titleHighlight="AI" />

      {/* 9. Contact Section */}
      <div id="say_hello">
        <ContactSection
          title="Let's Develop Your Next Virtual Brand Character"
          subtitle="Ready to create bespoke virtual influencers, digital mascots, or interactive AI brand avatars? Let's connect over coffee."
          theme="dark"
        />
      </div>

      {/* 10. LIGHTGALLERY / LIGHTBOX MODAL */}
      {lightboxIndex !== null && currentLightboxItem && (
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-md animate-fadeIn select-none p-3 sm:p-6"
          onClick={handleCloseLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar (Counter & Close) */}
          <div
            className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-white font-sans text-[12px] sm:text-[13px] font-medium tracking-wider">
                {lightboxIndex + 1} / {allGalleryItems.length}
              </span>
              <span className="hidden sm:inline text-neutral-400 font-sans text-[13px]">
                {currentLightboxItem.title}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCloseLightbox}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-[#ff9000] text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg border border-white/15"
              aria-label="Close Lightbox"
            >
              <LuX className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-[#ff9000] text-white flex items-center justify-center transition-all duration-300 z-30 cursor-pointer border border-white/15 shadow-xl hover:scale-110"
            aria-label="Previous Image"
          >
            <LuChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-[#ff9000] text-white flex items-center justify-center transition-all duration-300 z-30 cursor-pointer border border-white/15 shadow-xl hover:scale-110"
            aria-label="Next Image"
          >
            <LuChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Center Main High-Res Image Display */}
          <div
            className="relative w-full max-w-5xl h-[65vh] sm:h-[75vh] max-h-[820px] flex items-center justify-center z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/60 flex items-center justify-center">
              <Image
                src={getAssetPath(currentLightboxItem.image)}
                alt={currentLightboxItem.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain object-center"
              />

              {/* Bottom Caption Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 text-center">
                <span className="text-[#ff9000] font-sans font-bold text-[11px] sm:text-[12px] uppercase tracking-widest block mb-1">
                  {currentLightboxItem.category}
                </span>
                <h3 className="text-white font-sans font-semibold text-[16px] sm:text-[20px]">
                  {currentLightboxItem.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
