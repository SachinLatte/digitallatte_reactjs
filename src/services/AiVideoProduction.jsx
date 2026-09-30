"use client";

import { getAssetPath } from "../utils/assetPath";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import {
  LuSearch,
  LuLightbulb,
  LuFileText,
  LuLayoutGrid,
  LuSparkles,
  LuSlidersHorizontal,
  LuFilm,
  LuPackageCheck,
  LuArrowRight,
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuWand,
  LuUserCheck,
  LuBox,
  LuMic
} from "react-icons/lu";
import ContactSection from "../app/components/common/ContactSection";
import BeyondServicesCarousel from "../app/components/common/BeyondServicesCarousel";

// Batch 1 Mosaic Items (Initial 6 items)
const batch1Items = [
  {
    id: "1hlV4XszayY",
    image: "/img/ai-excellence/ai-video-production/ai_service_video.webp",
    type: "standard"
  },
  {
    id: "X9RP8UXkWVI",
    image: "/img/ai-excellence/ai-video-production/ai_service_video.webp",
    type: "standard"
  },
  {
    id: "oo6R7FYaJ7g",
    image: "/img/ai-excellence/ai-video-production/ai_service_video.webp",
    type: "standard"
  },
  {
    id: "BYigvQWqxU0",
    image: "/img/ai-excellence/ai-video-production/ai_service_video.webp",
    type: "standard"
  },
  {
    id: "I2AOEtLiERk",
    image: "/img/ai-excellence/ai-video-production/ai_service_video.webp",
    type: "featured"
  },
  {
    id: "WfKiGxjAJrY",
    image: "/img/ai-excellence/ai-video-production/ai_service_video1.webp",
    type: "standard"
  }
];

// Batch 2 Mosaic Items (Load More - 6 items)
const batch2Items = [
  {
    id: "l5gJVuoLclw",
    image: "/img/ai-excellence/ai-video-production/ai_service_video.webp",
    type: "featured"
  },
  {
    id: "YZgI_KNDBbk",
    image: "/img/ai-excellence/ai-video-production/ai_service_video1.webp",
    type: "standard"
  },
  {
    id: "LS4kyJACjus",
    image: "/img/ai-excellence/ai-video-production/ai_service_video.webp",
    type: "standard"
  },
  {
    id: "V1jxnhQmUyc",
    image: "/img/ai-excellence/ai-video-production/ai_service_video.webp",
    type: "standard"
  },
  {
    id: "dQhOUeFn_I0",
    image: "/img/ai-excellence/ai-video-production/ai_service_video.webp",
    type: "standard"
  },
  {
    id: "BYigvQWqxU0",
    image: "/img/ai-excellence/ai-video-production/ai_service_video.webp",
    type: "standard"
  }
];

// 8 Pipeline Stages
const pipelineStages = [
  {
    title: "Discover",
    icon: LuSearch,
    desc: "Deep-dive on brand positioning, audience segmentation, core messaging, and distribution channels."
  },
  {
    title: "Concept",
    icon: LuLightbulb,
    desc: "Brainstorming creative angles, visual moodboards, stylistic treatments, and aesthetic benchmarks."
  },
  {
    title: "Script",
    icon: LuFileText,
    desc: "Scriptwriting with timed voiceover beats, on-screen supers, character dialogue, and dramatic pacing."
  },
  {
    title: "Storyboard",
    icon: LuLayoutGrid,
    desc: "AI-synthesized keyframes, camera motion vectors, lens framing, and sequential animatics."
  },
  {
    title: "Generate",
    icon: LuSparkles,
    desc: "High-dimensional neural synthesis across Sora, Gen-3, Kling, and proprietary LoRA weights."
  },
  {
    title: "Direct & Refine",
    icon: LuSlidersHorizontal,
    desc: "Human directorial selection, inpainting, motion tracking, and micro-defect correction."
  },
  {
    title: "Edit & Finish",
    icon: LuFilm,
    desc: "Spatial Foley sound design, custom orchestral scores, HDR color grading, and typography."
  },
  {
    title: "Deliver",
    icon: LuPackageCheck,
    desc: "Omnichannel master packaging formatted for TV broadcast, YouTube, TikTok, and Meta Ads."
  }
];

// Kinetic Other AI Services
const kineticServices = [
  {
    title: "Generative AI",
    slug: "generative-ai",
    icon: LuWand,
    desc: "Creative intelligence pipelines & multimodal generative engines."
  },
  {
    title: "AI Character Development",
    slug: "ai-character-development",
    icon: LuUserCheck,
    desc: "Hyper-realistic virtual ambassadors, digital twins & emotive avatars."
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

export default function AiVideoProduction() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Hover preview state
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const debounceTimerRef = useRef(null);

  // Active Video Modal state
  const [activeModalVideoId, setActiveModalVideoId] = useState(null);

  // Load More state
  const [showBatch2, setShowBatch2] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Kinetic Stream Active Index
  const [activeKineticIndex, setActiveKineticIndex] = useState(0);

  // Swiper Ref for Beyond AI carousel
  const swiperBeyondRef = useRef(null);

  // Handle preview hover with debounce
  const handleMouseEnter = (videoId) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      setHoveredVideoId(videoId);
    }, 180);
  };

  const handleMouseLeave = () => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setHoveredVideoId(null);
  };

  const handleOpenModal = (videoId) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setHoveredVideoId(null);
    setActiveModalVideoId(videoId);
  };

  const handleCloseModal = () => {
    setActiveModalVideoId(null);
  };

  // Keyboard close for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    if (activeModalVideoId) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalVideoId]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setShowBatch2(true);
      setIsLoadingMore(false);
    }, 400);
  };

  const scrollToContact = (e) => {
    e?.preventDefault?.();
    const contactEl = document.getElementById("say_hello") || document.getElementById("contact-us") || document.querySelector("footer");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ActiveKineticIcon = kineticServices[activeKineticIndex]?.icon || LuWand;

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white text-[#16110f] overflow-x-hidden">
      {/* 1. Header Banner */}
      <section className="w-full bg-[#ececec] pt-32 pb-16 flex items-center justify-center min-h-[350px]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto flex flex-row items-center gap-8 w769:gap-4 select-none">
          <Image
            src={getAssetPath("/img/ai-excellence/ai-video-production.svg")}
            alt="AI Video Production Icon"
            width={85}
            height={85}
            priority
            className="w-[85px] h-[85px] object-contain flex-shrink-0 w769:w-[60px] w769:h-[60px]"
          />
          <h1 className="text-left leading-[1.5] uppercase tracking-[1px]">
            <span className="font-sans block text-[38px] w1470:text-[28px] w1281:text-[24px] w769:text-[18px] text-[#181414] font-bold">
              AI Video
            </span>
            <span className="font-sans block text-[38px] w1470:text-[40px] w1281:text-[34px] w769:text-[24px] text-[#181414] -mt-1 font-medium">
              Production
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
          <span className="text-[#ff9000] font-medium">AI Video Production</span>
        </div>
      </div>

      {/* 3. Bio Description Section */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20 select-none">
        <div className="w-[85%] w1470:w-[88%] w1281:w-[90%] w769:w-[92%] mx-auto px-2 sm:px-4 flex flex-col text-center">
          <h2 className="font-sans text-[24px] sm:text-[30px] md:text-[36px] text-[#16110f] tracking-normal mb-6 sm:mb-8 leading-snug font-medium">
            <span>Cinematic Video Production.</span>{" "}
            <br className="hidden sm:inline" />
            <span>Reimagined with AI.</span>
          </h2>
          <div className="font-libre text-[#16110f] text-[15px] sm:text-[16px] leading-[1.7] sm:leading-[1.8] flex flex-col gap-4 sm:gap-6 font-light mx-auto text-left sm:text-center max-w-4xl">
            <p>
              Create high-impact brand films, photorealistic product showcases, global multilingual campaigns, and high-velocity social content without physical set limitations, weather delays, or multi-million dollar overhead.
            </p>
            <p>
              Our video production pipeline merges state-of-the-art diffusion neural engines with seasoned human creative direction, spatial audio engineering, and Hollywood color grading to deliver unforgettable cinematic motion.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Process Pipeline Section ("From Brief to Final Frame") */}
      <section className="w-full py-14 sm:py-20 bg-[#f8f9fb] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] select-none border-y border-neutral-200/60">
        <div className="w-[85%] w1470:w-[90%] w769:w-[92%] mx-auto px-2 sm:px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="font-sans font-bold text-[24px] sm:text-[30px] md:text-[38px] text-[#111111] uppercase tracking-[1px] sm:tracking-[1.5px] mb-3 sm:mb-4">
              From Brief to Final Frame
            </h2>
            <p className="font-libre text-[14px] sm:text-[16px] text-neutral-600 font-normal leading-relaxed">
              A streamlined, transparent 8-stage production journey delivering studio master excellence.
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
                    <div className="flex items-center gap-2">

                      <h3 className="font-sans text-[18px] sm:text-[21px] font-semibold text-[#111111] tracking-[0.5px] uppercase">
                        {stage.title}
                      </h3>
                    </div>
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
            <h2 className="font-sans text-[26px] sm:text-[36px] md:text-[48px] lg:text-[56px] text-[#ffffff] font-medium uppercase tracking-[1.5px] sm:tracking-[2.5px] leading-[1.2] sm:leading-[1.5] mb-4 sm:mb-6">
              <span>THE BEST AI DOESN&apos;T</span>{" "}
              <br className="hidden sm:inline" />
              <span>LOOK LIKE AI.</span>
            </h2>
            <p className="font-libre text-[15px] sm:text-[18px] md:text-[20px] text-[#ffffff] leading-[1.5] mb-6 sm:mb-8 max-w-2xl font-light">
              It doesn&apos;t ask for attention. It gives the idea more room to earn it.
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

      {/* 6. Recent Work Showcase (Interactive Mosaic Video Gallery) */}
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

          {/* Batch 1 Mosaic Grid: Left 2x2 (4 boxes) + Right (1 featured + 1 standard) */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 sm:gap-5 w-full h-auto lg:h-[680px] w1281:lg:h-[560px]">
            {/* Left Block (2/3 width on desktop): 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 sm:gap-5 h-full">
              {batch1Items.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenModal(item.id)}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative rounded-xl overflow-hidden bg-[#11141b] border border-neutral-200 hover:border-[#ff9000]/60 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[200px] sm:h-[220px] lg:h-auto min-h-0 group flex items-center justify-center"
                >
                  <Image
                    src={getAssetPath(item.image)}
                    alt="AI Video Production Work"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                  />

                  {/* Hover Video Preview */}
                  {hoveredVideoId === item.id && (
                    <div className="absolute inset-0 z-10 overflow-hidden bg-black transition-opacity duration-300 opacity-100 pointer-events-none">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=off`}
                        title="AI Video Preview"
                        className="absolute top-1/2 left-1/2 w-[320%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                        allow="autoplay; encrypted-media"
                      />
                    </div>
                  )}

                  {/* Vignette Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-300 z-10 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Right Block (1/3 width on desktop): 1 Featured (2/3 flex) + 1 Standard (1/3 flex) */}
            <div className="flex flex-col gap-4 sm:gap-5 h-full">
              {/* Featured Card */}
              <div
                onClick={() => handleOpenModal(batch1Items[4].id)}
                onMouseEnter={() => handleMouseEnter(batch1Items[4].id)}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-xl overflow-hidden bg-[#11141b] border border-neutral-200 hover:border-[#ff9000]/60 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-[2] h-[240px] sm:h-[260px] lg:h-auto min-h-[220px] lg:min-h-0 group flex items-center justify-center"
              >
                <Image
                  src={getAssetPath(batch1Items[4].image)}
                  alt="Featured AI Video Work"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                />

                {hoveredVideoId === batch1Items[4].id && (
                  <div className="absolute inset-0 z-10 overflow-hidden bg-black transition-opacity duration-300 opacity-100 pointer-events-none">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${batch1Items[4].id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=off`}
                      title="Featured AI Video Preview"
                      className="absolute top-1/2 left-1/2 w-[220%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                      allow="autoplay; encrypted-media"
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-300 z-10 pointer-events-none" />
              </div>

              {/* Bottom Standard Card */}
              <div
                onClick={() => handleOpenModal(batch1Items[5].id)}
                onMouseEnter={() => handleMouseEnter(batch1Items[5].id)}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-xl overflow-hidden bg-[#11141b] border border-neutral-200 hover:border-[#ff9000]/60 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-[1] h-[190px] sm:h-[200px] lg:h-auto min-h-[180px] lg:min-h-0 group flex items-center justify-center"
              >
                <Image
                  src={getAssetPath(batch1Items[5].image)}
                  alt="AI Video Production Work"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                />

                {hoveredVideoId === batch1Items[5].id && (
                  <div className="absolute inset-0 z-10 overflow-hidden bg-black transition-opacity duration-300 opacity-100 pointer-events-none">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${batch1Items[5].id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=off`}
                      title="AI Video Preview"
                      className="absolute top-1/2 left-1/2 w-[320%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                      allow="autoplay; encrypted-media"
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-300 z-10 pointer-events-none" />
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
                  onClick={() => handleOpenModal(batch2Items[0].id)}
                  onMouseEnter={() => handleMouseEnter(batch2Items[0].id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative rounded-xl overflow-hidden bg-[#11141b] border border-neutral-200 hover:border-[#ff9000]/60 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-[2] h-[240px] sm:h-[260px] lg:h-auto min-h-[220px] lg:min-h-0 group flex items-center justify-center"
                >
                  <Image
                    src={getAssetPath(batch2Items[0].image)}
                    alt="Featured AI Video Work"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                  />

                  {hoveredVideoId === batch2Items[0].id && (
                    <div className="absolute inset-0 z-10 overflow-hidden bg-black transition-opacity duration-300 opacity-100 pointer-events-none">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${batch2Items[0].id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=off`}
                        title="Featured AI Video Preview"
                        className="absolute top-1/2 left-1/2 w-[220%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                        allow="autoplay; encrypted-media"
                      />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-300 z-10 pointer-events-none" />
                </div>

                {/* Standard Card */}
                <div
                  onClick={() => handleOpenModal(batch2Items[1].id)}
                  onMouseEnter={() => handleMouseEnter(batch2Items[1].id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative rounded-xl overflow-hidden bg-[#11141b] border border-neutral-200 hover:border-[#ff9000]/60 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-[1] h-[190px] sm:h-[200px] lg:h-auto min-h-[180px] lg:min-h-0 group flex items-center justify-center"
                >
                  <Image
                    src={getAssetPath(batch2Items[1].image)}
                    alt="AI Video Production Work"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                  />

                  {hoveredVideoId === batch2Items[1].id && (
                    <div className="absolute inset-0 z-10 overflow-hidden bg-black transition-opacity duration-300 opacity-100 pointer-events-none">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${batch2Items[1].id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=off`}
                        title="AI Video Preview"
                        className="absolute top-1/2 left-1/2 w-[320%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                        allow="autoplay; encrypted-media"
                      />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-300 z-10 pointer-events-none" />
                </div>
              </div>

              {/* Right Block (2/3 width on desktop): 2x2 grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 sm:gap-5 h-full">
                {batch2Items.slice(2, 6).map((item) => (
                  <div
                    key={item.id + "_b2"}
                    onClick={() => handleOpenModal(item.id)}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                    className="relative rounded-xl overflow-hidden bg-[#11141b] border border-neutral-200 hover:border-[#ff9000]/60 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[200px] sm:h-[220px] lg:h-auto min-h-0 group flex items-center justify-center"
                  >
                    <Image
                      src={getAssetPath(item.image)}
                      alt="AI Video Production Work"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                    />

                    {hoveredVideoId === item.id && (
                      <div className="absolute inset-0 z-10 overflow-hidden bg-black transition-opacity duration-300 opacity-100 pointer-events-none">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&mute=1&controls=0&playsinline=1&showinfo=0&rel=0&disablekb=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=off`}
                          title="AI Video Preview"
                          className="absolute top-1/2 left-1/2 w-[320%] h-[140%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
                          allow="autoplay; encrypted-media"
                        />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-300 z-10 pointer-events-none" />
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
                        {srv.index || String(idx + 1).padStart(2, "0")}
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
            <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center justify-center p-6 sm:p-8 backdrop-blur-md min-h-[320px] sm:min-h-[420px] text-center relative overflow-hidden rounded-2xl ">
              {/* Huge Watermark Number */}
              <span className="font-sans font-extrabold text-[120px] sm:text-[160px] text-white/[0.03] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
                {kineticServices[activeKineticIndex]?.index || String(activeKineticIndex + 1).padStart(2, "0")}
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
          title="Let's Produce Your Next AI Video"
          subtitle="Ready to create cutting-edge AI commercial films, character stories, or product motion? Let's connect over coffee."
          theme="dark"
        />
      </div>

      {/* 10. Interactive Full Video Modal */}
      {activeModalVideoId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              aria-label="Close Video Modal"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm"
            >
              <LuX className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Video Player */}
            <iframe
              src={`https://www.youtube.com/embed/${activeModalVideoId}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=off`}
              title="YouTube Video Player"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  );
}
