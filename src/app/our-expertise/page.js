import React from "react";
import Link from "next/link";
import services from "../../data/services";
import ContactSection from "../components/common/ContactSection";
import { LuChevronRight } from "react-icons/lu";

export const metadata = {
  title: "Our Expertise | Digital Latte",
  description: "A digital-first agency that combines data insights with design thinking to build strategies and experiences that transform businesses.",
};

const categoryDescriptions = {
  "digital-services": "We believe that everything digital starts with a Strategy. We help brands connect with their consumers through creative storytelling and digital marketing campaigns.",
  "design-services": "From pixels to print, we craft visually stunning brand assets that communicate your values. We combine user-centric UI/UX design with creative brand identity packages.",
  "web-development-services": "We build secure, robust, and lightning-fast websites and mobile applications tailored to your business scale. From custom headless architectures to popular CMS solutions.",
  "production-services": "High-impact storytelling through concept photography, dynamic explainer videos, brand films, and motion graphics that inspire actions.",
};

const categoryTitles = {
  "digital-services": "Digital Services",
  "design-services": "Design Services",
  "web-development-services": "Web Development Services",
  "production-services": "Production Services",
};

const categoryImages = {
  "digital-services": "https://digitallatte.in/img/digital-1.png",
  "design-services": "https://digitallatte.in/img/design-service.png",
  "web-development-services": "https://digitallatte.in/img/devlopment-service.png",
  "production-services": "https://digitallatte.in/img/production-services.png",
};

export default function OurExpertisePage() {
  const categories = Object.keys(services);

  return (
    <main 
      className="flex-grow flex flex-col w-full font-sans bg-white"
      style={{
        backgroundImage: 'url("https://digitallatte.in/img/service-bg.png")',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* 1. Header Banner */}
      <section className="py-24 w769:py-16 text-center select-none border-b border-neutral-100/60 bg-white/40 backdrop-blur-[1px]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <h1 className="text-[52px] w1025:text-[40px] w769:text-[32px] w480:text-[26px] font-sans font-extrabold uppercase text-[#16110f] tracking-[1.5px] leading-tight">
            OUR <span className="text-[#ff9000]">EXPERTISE</span>
          </h1>
          <p className="text-[18px] w1025:text-[16px] w480:text-[14px] text-[#555555] font-sans font-light max-w-[850px] mx-auto mt-6 leading-relaxed">
            A digital-first agency that combines data insights with design thinking to build strategies and experiences that transform businesses.
          </p>
        </div>
      </section>

      {/* 2. Alternating Service Categories Sections */}
      <section className="py-20 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto flex flex-col gap-32 w769:gap-24">
          {categories.map((category, index) => {
            const list = services[category];
            const isEven = index % 2 === 0;

            return (
              <div 
                key={category}
                className="grid grid-cols-12 gap-16 w1025:gap-8 w992:grid-cols-1 items-center"
              >
                {/* Text Content Column */}
                <div 
                  className={`col-span-6 w992:col-span-12 w992:order-2 flex flex-col ${
                    isEven ? "pr-8 w992:pr-0" : "pl-8 w992:pl-0"
                  }`}
                >
                  {/* Category Title */}
                  <h2 className="text-[30px] w1025:text-[24px] font-sans font-extrabold uppercase tracking-wide text-[#16110f] hover:text-[#ff9000] transition duration-300">
                    <Link href={`/our-expertise/${category}`}>
                      {categoryTitles[category]}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className="text-neutral-600 text-[15px] font-sans font-light leading-relaxed mt-4 mb-8">
                    {categoryDescriptions[category]}
                  </p>

                  {/* Sub-services links list (2-columns matching original layout) */}
                  <div className="grid grid-cols-2 w480:grid-cols-1 gap-y-3.5 gap-x-6">
                    {list.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/our-expertise/${category}/${item.slug}`}
                        className="group flex items-center gap-1.5 text-neutral-800 hover:text-[#ff9000] font-sans font-semibold text-[13px] tracking-wide transition duration-200"
                      >
                        <LuChevronRight className="w-3.5 h-3.5 text-[#ff9000] shrink-0 transform transition-transform duration-200 group-hover:translate-x-1" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Graphic Illustration Column */}
                <div 
                  className={`col-span-6 w992:col-span-12 w992:order-1 flex justify-center items-center ${
                    isEven ? "w992:mb-8" : "w992:mb-8"
                  }`}
                >
                  <Link 
                    href={`/our-expertise/${category}`}
                    className="block overflow-hidden rounded-lg max-w-[500px] w-full aspect-[4/3] relative bg-transparent"
                  >
                    <img 
                      src={categoryImages[category]} 
                      alt={categoryTitles[category]} 
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Let's Talk CTA */}
      <ContactSection 
        title="Brew Something Fresh"
        subtitle="Have a digital project, design challenge, or production need? Let's talk over coffee."
        theme="dark"
      />
    </main>
  );
}
