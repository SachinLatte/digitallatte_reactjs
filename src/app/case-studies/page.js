import { getAssetPath } from "../../utils/assetPath";
import React from 'react';
import Image from 'next/image';
import CaseStudiesGrid from '../components/case-studies/CaseStudiesGrid';
import ClientsCarousel from '../components/case-studies/ClientsCarousel';
import ContactSection from '../components/common/ContactSection';

import { constructMetadata } from "../../utils/seo";

export const metadata = constructMetadata({
  title: "Digital Marketing | Social Media | Case Studies | India",
  description:
    "We are a Digital Media Agency based in Mumbai, India. Check what we have brewed in the past on Digital & Social media marketing platforms.",
  url: "/case-studies",
});

export default function CaseStudiesPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <main className="flex-grow flex flex-col w-full font-sans overflow-x-hidden">

      <section
        className="relative w-full h-[773px] w1440:h-[730px] w1025:h-[555px] w769:h-auto w769:py-16 w501:py-12 bg-[#ececec] bg-no-repeat bg-[length:auto_70%] w1281:bg-[length:auto_78%] w1025:bg-[length:auto_70%] bg-[position:88%_43%] w1281:bg-[position:92%_43%] w1025:bg-[position:95%_43%] w769:bg-none flex items-center select-none"
        style={{ backgroundImage: `url('${basePath}/img/case-study-bg.webp')` }}
      >
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto relative z-10">

          <div className="hidden w769:block w-full mb-8">
            <Image
              src={`${basePath}/img/case-study-bg.webp`}
              alt="Case Studies"
              width={400}
              height={300}
              className="w-[60%] w501:w-[75%] mx-auto object-contain h-auto"
            />
          </div>

          <div className="text-left w769:text-center w769:mx-auto select-none">
            <h1 className="text-[65px] w1601:text-[60px] w1281:text-[55px] w1025:text-[40px] w769:text-[32px] w480:text-[26px] text-[#181414] uppercase leading-[1.25] tracking-[2px] font-light">
              <span className="font-medium">CASE</span> STUDIES
            </h1>
            <p className="text-[22px] w1440:text-[18px] w1025:text-[16px] w480:text-[14px] text-[#222222] font-light leading-[1.65] mt-6 w480:mt-3 max-w-[50%] w1281:max-w-[55%] w1025:max-w-[60%] w769:max-w-none">
              We&apos;re an ideas company that builds awesome digital experiences. <br className="hidden md:block" /> Don&apos;t take our word for it, take a peek at what we&apos;ve been upto.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Grid of Case Studies (White Background) */}
      <section className="py-24 w769:py-16 w501:py-12 bg-white text-[#16110f]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <CaseStudiesGrid />
        </div>
      </section>

      {/* 3. Our Clients Carousel */}
      <ClientsCarousel />

      {/* 4. Let's Talk CTA */}
      <ContactSection
        title="Brew A Success Campaign"
        subtitle="Ready to build an award-winning digital marketing campaign? Let's talk strategy."
        theme="dark"
      />

    </main>
  );
}
