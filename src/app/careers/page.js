import React from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "../components/ui/SectionHeading";
import CareerCard from "../components/cards/CareerCard";
import ContactSection from "../components/common/ContactSection";

// Import list of openings
import { openings } from "../../data/careers";

export const metadata = {
  title: "Digital Marketing Careers | Social Media Jobs | Mumbai",
  description: "Explore a career in Digital Marketing, Social Media, Graphic Design, Web Development and work with the best Creative Digital Marketing Agency in Mumbai, India.",
};

export default function CareersPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <main className="flex-grow flex flex-col w-full font-sans overflow-x-hidden">

      {/* 1. Hero Banner Section */}
      <section
        className="relative w-full h-[773px] w1281:h-[680px] w1025:h-[555px] w769:h-auto w769:py-16 w501:py-12 bg-[#ececec] bg-size-[50%] bg-right bg-no-repeat bg-[position:0_20px] w1680:bg-[position:-160px_20px] w769:bg-none flex items-center"
        style={{ backgroundImage: `url('${basePath}/img/career-bg.webp')` }}
      >
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto relative z-10">

          {/* Mobile Image (Visible only on mobile/tablet) */}
          <div className="hidden w769:block w-full mb-8">
            <Image
              src={`${basePath}/img/career-bg.webp`}
              alt="Careers at Digital Latte"
              width={400}
              height={300}
              className="w-[60%] w501:w-[75%] mx-auto object-contain h-auto"
            />
          </div>

          <div className="max-w-2xl text-left w769:text-center w769:mx-auto select-none">
            <h1 className="text-[65px] w1601:text-[60px] w1281:text-[55px] w1025:text-[40px] w769:text-[32px] w480:text-[26px] text-[#181414] uppercase leading-[1.25] tracking-[2px] font-light">
              <strong className="font-bold">BReW Fresh Ideas</strong> <br /> With US!
            </h1>
            <p className="text-[22px] w1440:text-[18px] w1025:text-[16px] w480:text-[14px] text-[#222222] font-light leading-[1.65] mt-6 w480:mt-3">
              We&apos;re brewing fresh ideas every day to ensure that we come with something beyond ordinary. Whether it&apos;s building beautiful Websites, Apps or leveraging Social Media, there&apos;s plenty to sink your teeth into.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Openings Section (Light Section) */}
      <section className="py-24 w1025:py-20 w769:py-16 w501:py-12 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#fff] text-[#16110f]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">

          <SectionHeading
            title={<><span className="font-bold">Current</span> openings</>}
            theme="light"
            align="center"
            className="mb-16 w769:mb-10 w480:mb-6"
          />

          <div className="grid grid-cols-3 w1101:grid-cols-2 w769:grid-cols-1 gap-8 w-full mt-12 w769:mt-8">
            {openings.map((job, index) => (
              <CareerCard
                key={job.id}
                id={job.id}
                title={job.title}
                experience={job.experience}
                skills={job.skills}
                description={job.description}
                isEven={index % 2 === 0}
              />
            ))}
          </div>

          <div className="mt-16 w769:mt-12 text-center max-w-2xl mx-auto">
            <h4 className="text-[22px] w769:text-[18px] w480:text-[16px] font-bold text-[#16110f] tracking-wider mb-2 select-none">
              Didn&apos;t find a job of your interest?
            </h4>
            <p className="text-[16px] w480:text-[14px] font-libre font-light text-neutral-600">
              Submit your resume{" "}
              <Link
                href="/submit-resume"
                className="font-medium text-[#ff9000] hover:underline hover:text-[#16110f] transition-colors duration-300"
              >
                here
              </Link>{" "}
              & let us find the right one for you!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Let's Talk CTA */}
      <ContactSection
        title="Work With Us"
        subtitle="Need a creative boost to launch a campaign, build a product, or grow your audience? Let's connect."
        theme="dark"
      />

    </main>
  );
}
