import { getAssetPath } from "../../utils/assetPath";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import CareerApplicationForm from "../components/careers/CareerApplicationForm";
import ContactSection from "../components/common/ContactSection";

export const metadata = {
  title: "Social Media Careers | Digital Marketing Jobs | Mumbai",
  description:
    "Work with the best Creative Digital Marketing Agency in Mumbai. Submit your resume and explore a career in Digital Marketing, Social Media, Graphic Design & Web Development.",
};

export default function SubmitResumePage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <main className="flex-grow flex flex-col w-full font-sans overflow-x-hidden bg-white text-[#16110f]">
      {/* 1. Hero Banner Section */}
      <section className="relative w-full pt-[8%] pb-[4%] w769:py-16 w501:py-12 bg-[#ececec] text-[#16110f] select-none border-b border-neutral-200">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto text-left">
          <h1 className="text-[45px] w1601:text-[40px] w1281:text-[40px] w1025:text-[35px] w769:text-[30px] w480:text-[26px] text-[#181414] uppercase leading-[1.25] tracking-[1px] font-light">
            <strong className="font-bold">Work</strong> With Us
          </h1>
        </div>
      </section>

      {/* 2. Main Form Content Section */}
      <section className="py-16 w769:py-12 w501:py-8 w-full bg-white">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="mb-12">
            <div className="flex items-center gap-2 text-sm font-libre font-light text-neutral-500">
              <Link
                href="/careers"
                className="hover:text-[#ff9000] font-bold text-neutral-800 transition"
              >
                Careers
              </Link>
              <span className="text-neutral-400">&gt;</span>
              <span className="text-[#ff9000] font-medium">Application Form</span>
            </div>
          </div>

          {/* Application Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Form Intro & Branding Asset */}
            <div className="lg:col-span-4 flex flex-col items-start text-left">
              <h2 className="text-[26px] md:text-[30px] font-bold text-[#16110f] uppercase tracking-wide font-sans mb-2">
                Personal Information
              </h2>
              <span className="text-[16px] text-neutral-500 font-libre font-light block mb-8">
                Tell us something about yourself
              </span>

              <div className="relative w-full max-w-[240px] opacity-90 hidden lg:block">
                <Image
                  src={`${basePath}/img/big-logo.webp`}
                  alt="Digital Latte Branding"
                  width={240}
                  height={240}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Right Column: Reusable Application Form */}
            <div className="lg:col-span-8 bg-white">
              <CareerApplicationForm jobId="0" jobTitle="General Application" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Global Contact Section */}
      <ContactSection />
    </main>
  );
}
