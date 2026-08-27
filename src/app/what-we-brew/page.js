import { getAssetPath } from "../../utils/assetPath";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import services from "../../data/services";
import ContactSection from "../components/common/ContactSection";
import ClientsCarousel from "../components/case-studies/ClientsCarousel";

export const metadata = {
  title: "Our Expertise | Digital Latte",
  description: "A digital-first agency that combines data insights with design thinking to build strategies and experiences that transform businesses.",
};

const categoryDescriptions = {
  "digital-services": "Many firms can build you a website, Mobile App, Digital and Social media presence. But what about crafting a great Digital Experience...",
  "design-services": "Design, in every sense, has always been at the heart of what we do; Design that isn't just about what it looks like, but about how it works and the experience it creates...",
  "web-development-services": "We're a curious bunch of problem solvers helping clients grow through new digital products, platforms, and experiences. With scrupulous attention to quality...",
  "production-services": "Capture your brand essence & bring imagination to life through concept photo & video shoot. Every element is...",
};

const categoryTitles = {
  "digital-services": "Digital",
  "design-services": "Design",
  "web-development-services": "Development",
  "production-services": "Production",
};

const categoryImages = {
  "digital-services": "/img/services/digital-1.webp",
  "design-services": "/img/services/design-service.webp",
  "web-development-services": "/img/services/devlopment-service.webp",
  "production-services": "/img/services/production-services.webp",
};

export default function WhatWeBrewPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const categories = Object.keys(services);

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-[#16110f]">
      {/* 1. Header Banner */}
      <section 
        className="w-full bg-[#ececec] relative overflow-hidden select-none flex flex-col justify-center min-h-[770px] w1281:min-h-[680px] w1025:min-h-[555px] w769:min-h-0 pt-24 pb-12 w769:pt-32 bg-no-repeat bg-[position:right_top] bg-[size:35%_auto] w1470:bg-[size:38%_auto] w1281:bg-[size:40%_auto] w769:bg-none"
        style={{ backgroundImage: `url('${basePath}/img/services/service-bg.webp')` }}
      >
        {/* On mobile, display background image as centered inline element above text */}
        <div className="hidden w769:block w-full px-6 mb-8">
          <Image 
            src={`${basePath}/img/services/service-bg.webp`} 
            alt="Our Expertise banner illustration" 
            width={400}
            height={300}
            className="w-[45%] w501:w-[60%] mx-auto block object-contain h-auto"
          />
        </div>

        {/* Text content container */}
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 w769:text-center">
          <h1 className="font-sans font-bold text-[65px] w1281:text-[55px] w1025:text-[40px] w769:text-[30px] w501:text-[24px] uppercase leading-tight tracking-[2px] text-[#181414]">
            <strong className="font-bold">Our</strong> <span className="font-sans font-light text-neutral-800">Expertise</span>
          </h1>
          <p className="font-libre text-[22px] w1281:text-[18px] w1025:text-[16px] w501:text-[14px] text-[#222] font-light leading-[1.6] max-w-[650px] mt-8 w769:mx-auto">
            A digital-first agency that combines data insights with design thinking to build strategies and experiences that transform businesses
          </p>
        </div>
      </section>

      {/* 2. Alternating Service Categories Grid */}
      <section className="w-full bg-[#16110f] select-none flex flex-col">
        {categories.map((category, index) => {
          const list = services[category];
          const isEven = index % 2 === 0;
          const categoryLink = `/our-expertise/${category}`;

          return (
            <div 
              key={category}
              id={category}
              className={`w-full flex flex-col ${
                isEven ? "w769:flex-col md:flex-row-reverse" : "w769:flex-col md:flex-row"
              } border-b border-neutral-900/50 scroll-mt-20`}
            >
              {/* Image Block (Light background) */}
              <div className="w-1/2 w769:w-full bg-[#ececec] flex w1025:p-12 w769:p-8 aspect-[4/3] w769:aspect-square md:aspect-auto">
                <Link href={categoryLink} className="block w-full h-full relative">
                  <Image 
                    src={getAssetPath(categoryImages[category])} 
                    alt={categoryTitles[category]} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-contain"
                  />
                </Link>
              </div>

              {/* Content Block (Dark background) */}
              <div className="w-1/2 w769:w-full bg-[#16110f] flex flex-col justify-center py-24 px-20 w1470:px-16 w1281:px-12 w1025:px-8 w769:px-8 w501:px-6 w769:py-16">
                {/* Title */}
                <h2 className="font-sans font-bold text-[52px] w1281:text-[42px] w1025:text-[35px] w501:text-[28px] uppercase leading-none mb-6">
                  <Link href={categoryLink} className="text-white hover:text-[#ff9000] transition-colors duration-300">
                    {categoryTitles[category]}
                  </Link>
                </h2>

                {/* Description */}
                <p className="font-libre text-[19px] w1281:text-[17px] w1025:text-[16px] w501:text-[14px] text-[#b7b7b7] leading-[1.6] mb-8 max-w-[580px]">
                  <Link href={categoryLink} className="hover:text-white transition-colors duration-300">
                    {categoryDescriptions[category]}
                  </Link>
                </p>

                {/* Service Bullet Links Grid */}
                <div className="grid grid-cols-2 w501:grid-cols-1 gap-y-4 gap-x-8 mt-4">
                  {list.map((item) => (
                    <div key={item.slug} className="relative pl-6 group">
                      {/* Circular Bullet Indicator */}
                      <span className="absolute left-0 top-[11px] w-1.5 h-1.5 bg-[#868382] rounded-full transition-colors duration-300 group-hover:bg-white" />
                      
                      <Link
                        href={`/our-expertise/${category}/${item.slug}`}
                        className="font-libre text-[17px] w1281:text-[15px] w501:text-[14px] leading-relaxed text-[#ff9000] hover:text-white font-normal transition-colors duration-300 block"
                      >
                        {item.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Clients Carousel */}
      <ClientsCarousel />

      {/* 4. Let's Talk CTA */}
      <ContactSection 
        title="Brew Something Fresh"
        subtitle="Have a digital project, design challenge, or production need? Let's talk over coffee."
        theme="dark"
      />
    </main>
  );
}
