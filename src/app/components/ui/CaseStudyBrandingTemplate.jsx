"use client";

import { getAssetPath } from "../../../utils/assetPath";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaTimes } from "react-icons/fa";
import OtherCaseStudiesCarousel from "../case-studies/OtherCaseStudiesCarousel";
import ContactSection from "../common/ContactSection";

function AnimatedCounter({ end, duration = 1800, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId;
    if (!isVisible) {
      setCount(0);
      return;
    }

    const target = typeof end === "string" ? parseInt(end.replace(/[^0-9]/g, ""), 10) : Number(end);
    if (isNaN(target) || target === 0) {
      setCount(end);
      return;
    }

    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export default function CaseStudyBrandingTemplate({
  slug,
  client,
  breadcrumbText,
  title,
  services,
  heroType = "banner", // "banner" | "classic"
  heroTitle,
  heroBg,
  topBannerImg,
  brandInfoImg,
  storyVideoUrl,
  description = [],
  storyTitle,
  storyObjective,
  storyLabel,
  storyContent,
  challenge,
  insightAndIdea,
  multiPointStory,
  sustainedStrategy,
  successStories,
  executionSections = [],
  impact,
  takeaway,
  performanceIntro,
  objective,
  approach = [],
  stats = [],
  creativeGrid = [],
  quote
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [activeVideo, setActiveVideo] = useState(null);
  const counterSectionRef = useRef(null);
  const [isCounterInView, setIsCounterInView] = useState(false);

  useEffect(() => {
    const el = counterSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsCounterInView(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white select-none">
      {/* 1. Hero Header Section */}
      {heroType === "classic" ? (
        <section className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] bg-[#ececec] flex items-center justify-start pt-20">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
            <h1 className="font-sans font-bold text-[36px] sm:text-[46px] md:text-[54px] text-[#181414] tracking-wide uppercase">
              {heroTitle || title}
            </h1>
          </div>
        </section>
      ) : (
        topBannerImg && (
          <section className="w-full relative">
            <div className="w-full relative block">
              <Image
                src={getAssetPath(topBannerImg)}
                alt={title || client || "Case Study Banner"}
                width={1920}
                height={820}
                priority
                sizes="100vw"
                className="w-full h-auto object-contain block"
              />
            </div>
          </section>
        )
      )}

      {/* 2. Breadcrumbs */}
      <div className="w-full bg-white py-5 select-none border-b border-neutral-100">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-2 font-libre font-medium text-[14px] text-[#000] tracking-[1.5px] flex items-center flex-wrap gap-1 select-none">
          <Link href="/case-studies" className="hover:text-[#ff9000] transition-colors font-semibold">
            Case Study
          </Link>
          <Image
            src={`${basePath}/img/right_arrow_new.webp`}
            alt="arrow"
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-2"
          />
          <span className="text-[#ff9000] font-medium">{breadcrumbText || client || title}</span>
        </div>
      </div>

      {/* 3. Story Section */}
      <section className="w-full py-14 md:py-20 bg-white">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Story Narrative on Left */}
            <div className={`${(storyVideoUrl || brandInfoImg) ? "lg:col-span-7" : "lg:col-span-12"} flex flex-col justify-center`}>
              <div className="mb-6">
                <h1 className="font-sans font-bold text-[34px] w1281:text-[30px] w769:text-[24px] text-[#181414] uppercase tracking-wide leading-tight mb-2">
                  {storyTitle || title || client}
                </h1>
                {services && (
                  <p className="font-sans font-medium text-[17px] text-[#ff9000] tracking-wide">
                    {services}
                  </p>
                )}
                <div className="w-16 h-[3px] bg-[#ff9000] mt-3" />
              </div>

              {/* Optional Inline Objective */}
              {storyObjective && (
                <div className="mb-5">
                  <p className="font-sans font-bold text-[18px] text-[#ff9000] uppercase mb-1">
                    Objective:
                  </p>
                  <p className="font-sans font-medium text-[#181414] text-[15px] sm:text-[16px] leading-[1.85]">
                    {storyObjective}
                  </p>
                </div>
              )}

              {storyLabel && (
                <p className="font-sans font-bold text-[18px] text-[#ff9000] uppercase mb-3">
                  {storyLabel}
                </p>
              )}

              {/* Story Copy */}
              {storyContent ? (
                <div className="font-sans font-medium text-[#181414] text-[15px] sm:text-[16px] leading-[1.85] space-y-4 text-justify">
                  {storyContent}
                </div>
              ) : (
                <div className="font-sans font-medium text-[#181414] text-[15px] sm:text-[16px] leading-[1.85] space-y-4 text-justify">
                  {description.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Visual (Video or Image) on Right */}
            {(storyVideoUrl || brandInfoImg) && (
              <div className="lg:col-span-5 flex justify-center items-center">
                {storyVideoUrl ? (
                  <div className="relative w-full max-w-[480px] aspect-video drop-shadow-xl rounded-xl overflow-hidden bg-black shadow-lg">
                    <iframe
                      src={storyVideoUrl}
                      title={`${title || client} Featured Video`}
                      className="w-full h-full object-cover rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative w-full max-w-[380px] aspect-[4/5] drop-shadow-xl rounded-xl overflow-hidden">
                    <Image
                      src={getAssetPath(brandInfoImg)}
                      alt={`${title || client} Featured`}
                      fill
                      sizes="(max-width: 768px) 80vw, 400px"
                      className="object-contain object-center"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Multi-Point Story (e.g. Challenge, Approach & Strategy with Side Video) */}
      {multiPointStory && (
        <section className="w-full pb-14 bg-white">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 space-y-6 text-[#181414]">
                {multiPointStory.sections.map((sec, sIdx) => (
                  <div key={sIdx}>
                    <h2 className="font-sans font-bold text-[22px] sm:text-[26px] text-[#181414] uppercase mb-2">
                      {sec.title} {sec.highlight && <span className="text-[#ff9000]">{sec.highlight}</span>}
                    </h2>
                    <p className="text-[15px] sm:text-[16px] leading-[1.85] text-justify text-[#181414] font-normal">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Side Video Card */}
              {multiPointStory.videoImage && (
                <div className="lg:col-span-5 flex justify-center items-center">
                  <div
                    onClick={() => multiPointStory.videoUrl && setActiveVideo(multiPointStory.videoUrl)}
                    className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                  >
                    <Image
                      src={getAssetPath(multiPointStory.videoImage)}
                      alt="Campaign Video Story"
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-colors flex items-center justify-center rounded-2xl">
                      <div className="w-16 h-16 rounded-full bg-white/95 group-hover:bg-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                        <FaPlay className="text-[#ff9000] text-[20px] ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. The Challenge (Card style) */}
      {challenge && (
        <section className="w-full pb-14 bg-white">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
            <div className="p-8 sm:p-10 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-4">
              <h2 className="font-sans font-bold text-[24px] sm:text-[28px] text-[#181414] uppercase">
                The Challenge
              </h2>
              {challenge.points && (
                <div className="space-y-2 text-[#181414] font-medium text-[16px] sm:text-[17px]">
                  {challenge.points.map((pt, pIdx) => (
                    <p key={pIdx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff9000]" />
                      {pt}
                    </p>
                  ))}
                </div>
              )}
              {challenge.summary && (
                <p className="text-[#181414] font-normal text-[15px] sm:text-[16px] leading-relaxed pt-2">
                  {challenge.summary}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6. The Insight & The Idea */}
      {insightAndIdea && (
        <section className="w-full pb-14 bg-white">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 space-y-6 text-[#181414]">
                {insightAndIdea.insightPoints && (
                  <div>
                    <h2 className="font-sans font-bold text-[24px] sm:text-[28px] text-[#181414] uppercase mb-3">
                      The Insight
                    </h2>
                    {insightAndIdea.insightPoints.map((ip, ipIdx) => (
                      <p key={ipIdx} className={`text-[15px] sm:text-[16px] leading-[1.85] text-justify ${ipIdx === 0 ? "font-semibold text-[17px] mb-2" : "mb-3"}`}>
                        {ip}
                      </p>
                    ))}
                  </div>
                )}

                {insightAndIdea.ideaPoints && (
                  <div>
                    <h2 className="font-sans font-bold text-[24px] sm:text-[28px] text-[#181414] uppercase mb-3">
                      The Idea: <span className="text-[#ff9000]">{insightAndIdea.ideaTitle || "#ReliveYourMemories"}</span>
                    </h2>
                    {insightAndIdea.ideaPoints.map((idp, idpIdx) => (
                      <p key={idpIdx} className="text-[15px] sm:text-[16px] leading-[1.85] text-justify mb-3">
                        {idp}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {insightAndIdea.videoImage && (
                <div className="lg:col-span-5 flex justify-center items-center">
                  <div
                    onClick={() => insightAndIdea.videoUrl && setActiveVideo(insightAndIdea.videoUrl)}
                    className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                  >
                    <Image
                      src={getAssetPath(insightAndIdea.videoImage)}
                      alt="Campaign Video Story"
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-colors flex items-center justify-center rounded-2xl">
                      <div className="w-16 h-16 rounded-full bg-white/95 group-hover:bg-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                        <FaPlay className="text-[#ff9000] text-[20px] ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 7. Sustained Engagement Strategy (Multi-format sections) */}
      {sustainedStrategy && (
        <section className="w-full pb-14 bg-white">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto space-y-12">
            <div>
              <h2 className="font-sans font-bold text-[28px] sm:text-[34px] text-[#181414] uppercase mb-3">
                {sustainedStrategy.title || "Sustained Engagement Strategy"}
              </h2>
              {sustainedStrategy.intro && (
                <p className="text-[#181414] text-[15px] sm:text-[16px] leading-relaxed">
                  {sustainedStrategy.intro}
                </p>
              )}
            </div>

            {/* Sub-item 1: Player Announcements */}
            {sustainedStrategy.playerAnnouncements && (
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-[20px] text-[#ff9000]">
                  {sustainedStrategy.playerAnnouncements.title}
                </h3>
                <p className="text-[#181414] text-[15px] sm:text-[16px] leading-relaxed">
                  {sustainedStrategy.playerAnnouncements.description}
                </p>
                <div className="w-full rounded-xl overflow-hidden shadow-sm pt-2">
                  <Image
                    src={getAssetPath(sustainedStrategy.playerAnnouncements.image)}
                    alt="Player Announcements"
                    width={1200}
                    height={900}
                    sizes="100vw"
                    className="w-full h-auto object-contain rounded-xl block"
                  />
                </div>
              </div>
            )}

            {/* Sub-item 2: Countdown Comic Book Series */}
            {sustainedStrategy.countdownSeries && (
              <div className="space-y-4 pt-4">
                <h3 className="font-sans font-bold text-[20px] text-[#ff9000]">
                  {sustainedStrategy.countdownSeries.title}
                </h3>
                <p className="text-[#181414] text-[15px] sm:text-[16px] leading-relaxed">
                  {sustainedStrategy.countdownSeries.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                  {sustainedStrategy.countdownSeries.cards.map((card, cIdx) => (
                    <div
                      key={cIdx}
                      onClick={() => card.videoUrl && setActiveVideo(card.videoUrl)}
                      className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    >
                      <Image
                        src={getAssetPath(card.src)}
                        alt={`Countdown Card ${cIdx + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center rounded-xl">
                        <div className="w-14 h-14 rounded-full bg-white/95 group-hover:bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <FaPlay className="text-[#ff9000] text-[18px] ml-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 8. Success Stories (Videos & Graphics Grid with Captions) */}
      {successStories && (
        <section className="w-full pb-14 bg-white">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto space-y-10">
            <div>
              <h2 className="font-sans font-bold text-[28px] sm:text-[34px] text-[#181414] uppercase mb-2">
                {successStories.title || "Success Stories"}
              </h2>
              {successStories.subtitle && (
                <p className="text-[#181414] text-[15px] sm:text-[16px] leading-relaxed">
                  {successStories.subtitle}
                </p>
              )}
            </div>

            {/* Row 1: Left video + Right graphic */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Video */}
              <div className="lg:col-span-4 space-y-3">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-sm bg-neutral-900">
                  <video
                    src={successStories.row1Left.video}
                    autoPlay
                    muted
                    playsInline
                    loop
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <p className="text-[#181414] text-[14px] sm:text-[15px] leading-relaxed">
                  {successStories.row1Left.caption}
                </p>
              </div>

              {/* Right Graphic */}
              <div className="lg:col-span-8 space-y-3">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={getAssetPath(successStories.row1Right.image)}
                    alt="Success Story Graphic"
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover rounded-xl"
                  />
                </div>
                <p className="text-[#181414] text-[14px] sm:text-[15px] leading-relaxed">
                  {successStories.row1Right.caption}
                </p>
              </div>
            </div>

            {/* Row 2: Left newspaper + Right opponent video */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
              {/* Left Newspaper Graphic */}
              <div className="lg:col-span-6 space-y-3">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={getAssetPath(successStories.row2Left.image)}
                    alt="Newspaper coverage"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover rounded-xl"
                  />
                </div>
                <p className="text-[#181414] text-[14px] sm:text-[15px] leading-relaxed">
                  {successStories.row2Left.caption}
                </p>
              </div>

              {/* Right Video */}
              <div className="lg:col-span-6 space-y-3">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm bg-neutral-900">
                  <video
                    src={successStories.row2Right.video}
                    autoPlay
                    muted
                    playsInline
                    loop
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <p className="text-[#181414] text-[14px] sm:text-[15px] leading-relaxed">
                  {successStories.row2Right.caption}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. Campaign Execution Subsections */}
      {executionSections && executionSections.length > 0 && (
        <section className="w-full pb-14 bg-white">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto space-y-12">
            <h2 className="font-sans font-bold text-[28px] sm:text-[34px] text-[#181414] uppercase">
              Campaign Execution
            </h2>

            {executionSections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-4">
                <h3 className="font-sans font-bold text-[20px] text-[#ff9000]">
                  {sec.title}
                </h3>
                {sec.description && (
                  <p className="text-[#181414] text-[15px] sm:text-[16px] leading-relaxed">
                    {sec.description}
                  </p>
                )}
                {sec.list && (
                  <ul className="list-disc pl-6 space-y-1.5 text-[#181414] text-[15px] sm:text-[16px]">
                    {sec.list.map((li, lIdx) => (
                      <li key={lIdx}>{li}</li>
                    ))}
                  </ul>
                )}
                {sec.footer && (
                  <p className="text-[#181414] text-[15px] sm:text-[16px] leading-relaxed">
                    {sec.footer}
                  </p>
                )}

                {/* Sub-grid images with uniform rounded-xl corners */}
                {sec.images && (
                  <div
                    className={`grid gap-6 pt-4 ${
                      sec.layout === "grid-2"
                        ? "grid-cols-1 sm:grid-cols-2"
                        : "grid-cols-1 sm:grid-cols-3"
                    }`}
                  >
                    {sec.images.map((img, iIdx) => (
                      <div
                        key={iIdx}
                        onClick={() => img.video && setActiveVideo(img.video)}
                        className={`relative ${
                          sec.layout === "grid-2" ? "aspect-[16/10]" : "aspect-square"
                        } rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group ${
                          img.video ? "cursor-pointer" : ""
                        }`}
                      >
                        <Image
                          src={getAssetPath(img.src)}
                          alt={`${sec.title} Asset ${iIdx + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. The Impact & The Takeaway Sections */}
      {(impact || takeaway || performanceIntro) && (
        <section className="w-full pb-14 bg-white">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto space-y-10">
            {impact && (
              <div className="p-8 sm:p-10 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-4">
                <h2 className="font-sans font-bold text-[26px] sm:text-[30px] text-[#181414] uppercase">
                  The Impact
                </h2>
                {impact.intro && (
                  <p className="text-[#181414] text-[15px] sm:text-[16px]">
                    {impact.intro}
                  </p>
                )}
                {impact.points && (
                  <ul className="list-disc pl-6 space-y-2 text-[#181414] text-[15px] sm:text-[16px]">
                    {impact.points.map((ip, pIdx) => (
                      <li key={pIdx}>{ip}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {takeaway && (
              <div className="space-y-4">
                <h2 className="font-sans font-bold text-[26px] sm:text-[30px] text-[#181414] uppercase">
                  The Takeaway
                </h2>
                <p className="text-[#181414] text-[15px] sm:text-[16px] leading-[1.85] text-justify">
                  {takeaway}
                </p>
              </div>
            )}

            {performanceIntro && (
              <div className="space-y-4 pt-4">
                <h2 className="font-sans font-bold text-[26px] sm:text-[30px] text-[#181414] uppercase">
                  Campaign Performance
                </h2>
                <p className="text-[#181414] text-[15px] sm:text-[16px] leading-[1.85] text-justify">
                  {performanceIntro}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 11. Middle Quote Banner */}
      {quote && (
        <section className="w-full py-16 md:py-20 bg-[#16110f] text-white">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto text-center">
            <p className="font-sans font-light text-[22px] sm:text-[26px] md:text-[34px] leading-relaxed text-white max-w-4xl mx-auto italic">
              &lsquo;{quote}&rsquo;
            </p>
          </div>
        </section>
      )}

      {/* 12. Objective, Approach & Clean Animated Metrics Section */}
      {(objective || (approach && approach.length > 0) || (stats && stats.length > 0)) && (
        <section className="w-full py-16 bg-white">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto space-y-10">
            {objective && (
              <div>
                <p className="font-sans font-bold text-[18px] text-[#ff9000] uppercase mb-3">
                  Objective:
                </p>
                <div className="font-sans font-medium text-[#181414] text-[15px] sm:text-[16px] leading-[1.85] text-justify">
                  {objective}
                </div>
              </div>
            )}

            {approach && approach.length > 0 && (
              <div>
                <p className="font-sans font-bold text-[18px] text-[#ff9000] uppercase mb-3">
                  Approach:
                </p>
                <div className="font-sans font-medium text-[#181414] text-[15px] sm:text-[16px] leading-[1.85] space-y-4 text-justify">
                  {approach.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Metric Animated Counters (Directly on white background with aligned '+' and viewport re-trigger) */}
            {stats && stats.length > 0 && (
              <div ref={counterSectionRef} className="pt-4 pb-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-12 text-left">
                  {stats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex flex-col items-start">
                      <span className="font-libre font-semibold text-[17px] text-[#e07f2a] mb-2 uppercase tracking-wide">
                        {stat.label}
                      </span>
                      <div className="flex items-baseline font-sans font-bold text-[40px] sm:text-[48px] text-[#181414] leading-none">
                        <AnimatedCounter
                          end={stat.number}
                          duration={1800}
                          isVisible={isCounterInView}
                        />
                        {stat.suffix && (
                          <span className="ml-1 text-[36px] sm:text-[44px] font-bold text-[#181414] leading-none select-none">
                            {stat.suffix}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 13. Campaign Creatives Grid with Uniform Border Radius (rounded-xl) across all cards */}
      {creativeGrid && creativeGrid.length > 0 && (
        <section className="w-full pb-20 bg-white">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto space-y-6">
            {creativeGrid.map((row, rowIdx) => {
              if (row.layout === "grid-3") {
                return (
                  <div
                    key={rowIdx}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start"
                  >
                    {row.images.map((img, imgIdx) => (
                      <div
                        key={imgIdx}
                        onClick={() => img.videoUrl && setActiveVideo(img.videoUrl)}
                        className={`relative w-full ${img.aspect || "aspect-[454/422]"} rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-neutral-50 group ${
                          img.videoUrl ? "cursor-pointer" : ""
                        }`}
                      >
                        <Image
                          src={getAssetPath(img.src)}
                          alt={img.alt || "Creative Asset"}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 block rounded-xl"
                        />
                        {/* Circular Play Button */}
                        {img.videoUrl && (
                          <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center rounded-xl">
                            <div className="w-14 h-14 rounded-full bg-white/95 group-hover:bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                              <FaPlay className="text-[#ff9000] text-[18px] ml-1" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              }

              if (row.layout === "grid-2") {
                return (
                  <div
                    key={rowIdx}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start"
                  >
                    {row.images.map((img, imgIdx) => (
                      <div
                        key={imgIdx}
                        onClick={() => img.videoUrl && setActiveVideo(img.videoUrl)}
                        className={`relative w-full ${img.aspect || "aspect-[4/3]"} rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-neutral-50 group ${
                          img.videoUrl ? "cursor-pointer" : ""
                        }`}
                      >
                        <Image
                          src={getAssetPath(img.src)}
                          alt={img.alt || "Creative Asset"}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 block rounded-xl"
                        />
                        {img.videoUrl && (
                          <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center rounded-xl">
                            <div className="w-14 h-14 rounded-full bg-white/95 group-hover:bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                              <FaPlay className="text-[#ff9000] text-[18px] ml-1" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              }

              // Default grid-1 (Full width banner)
              return (
                <div key={rowIdx} className="w-full">
                  {row.images.map((img, imgIdx) => (
                    <div
                      key={imgIdx}
                      onClick={() => img.videoUrl && setActiveVideo(img.videoUrl)}
                      className={`relative w-full ${img.aspect || "aspect-[1377/422]"} rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-neutral-50 group ${
                        img.videoUrl ? "cursor-pointer" : ""
                      }`}
                    >
                      <Image
                        src={getAssetPath(img.src)}
                        alt={img.alt || "Creative Asset"}
                        fill
                        sizes="100vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 block rounded-xl"
                      />
                      {img.videoUrl && (
                        <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center rounded-xl">
                          <div className="w-14 h-14 rounded-full bg-white/95 group-hover:bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            <FaPlay className="text-[#ff9000] text-[18px] ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Video Lightbox Modal (YouTube & MP4 support) */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/85 z-[99999] flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
              className="absolute top-4 right-4 z-50 text-white bg-black/60 hover:bg-[#ff9000] p-3 rounded-full transition-colors cursor-pointer"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            {activeVideo.includes("youtube.com") || activeVideo.includes("youtu.be") ? (
              <iframe
                src={
                  activeVideo.startsWith("//")
                    ? `https:${activeVideo}?autoplay=1`
                    : activeVideo.includes("autoplay=1")
                    ? activeVideo
                    : `${activeVideo}${activeVideo.includes("?") ? "&" : "?"}autoplay=1`
                }
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={activeVideo}
                controls
                autoPlay
                className="w-full max-h-[80vh] object-contain"
              />
            )}
          </div>
        </div>
      )}

      {/* 14. Other Case Studies Slider */}
      <OtherCaseStudiesCarousel currentSlug={slug} />

      {/* 15. Contact Section CTA */}
      <ContactSection
        title="Brew A Success Campaign"
        subtitle="Ready to build an award-winning digital marketing campaign? Let's talk strategy."
        theme="dark"
      />
    </main>
  );
}
