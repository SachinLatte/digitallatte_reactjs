import { getAssetPath } from "../../utils/assetPath";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactSection from '../components/common/ContactSection';

import { constructMetadata } from "../../utils/seo";

export const metadata = constructMetadata({
  title: "Digital Marketing Agency | Social Media Company | Mumbai",
  description:
    "Explore the best digital agency in Mumbai, India brewing social media marketing, SEO, website development & design services. Talk to our Digital Experts Now!",
  url: "/our-motto",
});

export default function MottoPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <main className="flex-grow flex flex-col w-full font-sans overflow-x-hidden">

      {/* 1. Hero Banner */}
      <section className="relative w-full pt-[8%] pb-[4%] w769:py-16 w501:py-12 bg-[#ececec] text-[#16110f] select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto text-left">
          <h1 className="text-[65px] w1601:text-[60px] w1281:text-[55px] w1025:text-[40px] w769:text-[32px] w480:text-[26px] text-[#181414] uppercase leading-[1.25] tracking-[2px] font-light">
            Our <strong className="font-bold">Motto</strong>
          </h1>
        </div>
      </section>

      {/* 2. Philosophy Intro Section */}
      <section className="w-full bg-[#16110f] text-[#868382] py-24 w769:py-16 w501:py-12">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto text-center">
          <p className="font-libre font-light text-[16px] w501:text-[15px] leading-[32px] w501:leading-[26px] tracking-wide select-none">
            Ideas excite us, they shape the future, add value, and signal change. Through fresh ideas, we blend together beautiful designs, functional digital strategies, and engaging experiences.
            <br />
            Here are values that define us, principles that guide us, and words that we live by.
          </p>
        </div>
      </section>

      {/* 3. Motto Infographic Section */}
      <section className="w-full bg-[#ebebeb] pb-32">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto flex flex-col items-center">

          {/* Infographic Image: Desktop / Mobile toggle */}
          <div className="w-full">
            {/* Desktop Graphic */}
            <Image
              src={`${basePath}/img/who-we-are-motto.webp`}
              alt="Digital Latte Motto Graphic"
              width={1000}
              height={1400}
              className="block w769:hidden mx-auto max-w-[85%] lg:max-w-[70%] h-auto object-contain transition-all duration-300"
            />
            {/* Mobile Graphic */}
            <Image
              src={`${basePath}/img/who-we-are-motto-mob.webp`}
              alt="Digital Latte Motto Graphic Mobile"
              width={600}
              height={1200}
              className="hidden w769:block mx-auto max-w-[90%] w501:max-w-full h-auto object-contain transition-all duration-300"
            />
          </div>

          {/* Bottom CTA Paragraph */}
          <p className="text-center text-[#222222] font-libre font-light text-[16px] leading-[26px] mt-16 w769:mt-8 px-4">
            <span className="font-bold text-[#16110f] text-[20px] block mb-2 font-sans select-none">
              Like what you see?
            </span>
            Let our experts take care of your{' '}
            <Link
              href="/our-expertise/digital-services"
              className="text-[#ff9000] font-semibold hover:underline transition-colors duration-300"
            >
              digital
            </Link>
            {' '}&{' '}
            <Link
              href="/our-expertise/digital-services/social-media-marketing"
              className="text-[#ff9000] font-semibold hover:underline transition-colors duration-300"
            >
              social media
            </Link>
            {' '}presence or explore the{' '}
            <Link
              href="/case-studies"
              className="text-[#ff9000] font-semibold hover:underline transition-colors duration-300"
            >
              best digital marketing case studies.
            </Link>
          </p>

        </div>
      </section>

      {/* 4. Contact Section */}
      <ContactSection
        title="Work With Us"
        subtitle="Need a creative boost to launch a campaign, build a product, or grow your audience? Let's connect."
        theme="dark"
      />

    </main>
  );
}
