import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import LogoGrid from '../components/clientele/LogoGrid';
import WorkShowcaseCarousel from '../components/ui/WorkShowcaseCarousel';
import ContactSection from '../components/common/ContactSection';
import { carouselImages } from '../../data/clientele';

import { constructMetadata } from "../../utils/seo";

export const metadata = constructMetadata({
  title: "Digital Marketing | SEO | Social Media Agency | Clients",
  description:
    "Check out the clients of India’s best creative digital marketing agency offering digital marketing, social media, SEO, design & web development services.",
  url: "/clientele",
});

export default function ClientelePage() {
  return (
    <main className="flex-grow flex flex-col w-full font-sans overflow-x-hidden">

      {/* 1. Hero Section */}
      <section className="relative w-full pt-[8%] pb-[4%] w769:py-16 w501:py-12 bg-[#ececec] text-[#16110f] select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto text-left">
          <h1 className="text-[45px] w1601:text-[40px] w1281:text-[40px] w1025:text-[35px] w769:text-[30px] w480:text-[26px] text-[#181414] uppercase leading-[1.25] tracking-[1px] font-light">
            <span className='font-medium'>Our</span>  Clientele
          </h1>
        </div>
      </section>

      {/* 2. Logo Filtering Section (White Background) */}
      <section className="py-24 w769:py-16 w501:py-12 bg-white text-[#16110f]">
        <div className="w-full mx-auto flex flex-col items-center">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto text-center mb-12 select-none">
            <h2 className="text-[40px] w769:text-[28px] w480:text-[22px] font-sans font-medium tracking-wider text-[#181414] mb-6">
              Brewing Fresh Ideas
            </h2>
            <p className="text-[#6110f] font-libre font-medium text-[16px] leading-[28px] w501:text-[14px]">
              Here&apos;s a look at the clients we&apos;ve worked with. If you&apos;d like to work with the best digital agency too, we&apos;d love to hear from you. Drop us a line and we&apos;ll look forward to brewing something fresh for you!
            </p>
          </div>

          <LogoGrid />
        </div>
      </section>

      {/* 3. Recent Portfolio Showcase (White Background) */}
      <section className="py-24 w769:py-16 w501:py-12 bg-white text-[#16110f] border-t border-neutral-100">
        <div className="w-[90%] mx-auto text-center flex flex-col items-center">
          <h2 className="text-[34px] w769:text-[28px] w480:text-[22px] text-[#181414] uppercase tracking-[1px] font-light text-center mb-5 select-none">
            <span className="font-medium">RECENT</span> WORK
          </h2>

          {/* Dynamic Reusable Carousel Component */}
          <div className="w-full mt-4">
            <WorkShowcaseCarousel
              items={carouselImages}
              slidesPerView={3}
              loop={true}
              autoplay={true}
            />
          </div>

        </div>
      </section>

      {/* 4. Let's Talk CTA */}
      <ContactSection
        title="Let's Talk Business"
        subtitle="Want to add your brand logo to our wall of fame? Let's connect over coffee and strategies."
        theme="dark"
      />

    </main>
  );
}
