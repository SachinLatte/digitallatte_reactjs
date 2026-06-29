import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import LogoGrid from '../components/sections/LogoGrid';
import ContactSection from '../components/sections/ContactSection';
import { recentWork } from '../../data/clientele';

export const metadata = {
  title: "Digital Marketing | SEO | Social Media Agency | Clients",
  description: "Check out the clients of India’s best creative digital marketing agency offering digital marketing, social media, SEO, design & web development services.",
};

export default function ClientelePage() {
  return (
    <main className="flex-grow flex flex-col w-full font-sans">
      
      {/* 1. Header Section */}
      <section className="pt-32 pb-16 px-6 bg-[#16110f] text-white text-center flex flex-col items-center">
        <SectionHeading 
          title={<><span className="font-bold">Our</span> clientele</>}
          subtitle="BREWING FRESH IDEAS"
          theme="dark"
          align="center"
        />
      </section>

      {/* 2. Logo Filtering Section */}
      <section className="py-16 md:py-24 px-6 bg-[#16110f] text-white border-t border-neutral-850">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <p className="text-[#868382] text-sm md:text-base leading-relaxed text-center max-w-xl mb-12 uppercase tracking-widest font-semibold">
            We work with brands across various sectors including FMCG, retail, sports, lifestyle, hospitality & corporate.
          </p>

          <LogoGrid />
        </div>
      </section>

      {/* 3. Recent Portfolio Showcase (Light Section) */}
      <section className="py-16 md:py-24 px-6 bg-[#ececec] text-[#16110f]">
        <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">
          <SectionHeading 
            title={<><span className="font-bold">Recent</span> work showcase</>}
            subtitle="Explore some social creatives and marketing highlights we've crafted."
            theme="light"
            align="center"
            className="mb-12"
          />

          {/* Simple Grid Showcase (replaces Carousel for clean SSR/Next compatibility) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-4">
            {recentWork.map((work) => (
              <div 
                key={work.id} 
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-[#e07f2a] transition duration-300 shadow-sm flex flex-col group"
              >
                <div className="aspect-square relative bg-neutral-100 overflow-hidden">
                  <img 
                    src={work.img} 
                    alt={work.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-black text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-neutral-150">
                    {work.category}
                  </span>
                </div>
                <div className="p-5 text-left">
                  <h4 className="text-neutral-800 text-sm font-bold uppercase tracking-wider">
                    {work.title}
                  </h4>
                </div>
              </div>
            ))}
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
