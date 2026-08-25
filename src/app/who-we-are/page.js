import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LuTablet, LuTarget, LuUser } from 'react-icons/lu';
import ContactSection from '../components/common/ContactSection';

export const metadata = {
  title: "Digital Marketing | Best Social Media Agency | Mumbai, India",
  description: "Leverage digital and social media marketing with India's best Digital agency. We offer social media, website development, SEO, design, influencer marketing.",
};

export default function Page() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <main className="flex-grow flex flex-col w-full font-sans overflow-x-hidden">

      {/* 1. Hero Banner Section */}
      <section
        className="relative w-full h-[773px] w1281:h-[680px] w1025:h-[555px] w769:h-auto w769:py-16 w501:py-12 bg-[#ececec] bg-cover bg-no-repeat bg-[position:0_20px] w1680:bg-[position:-160px_20px] w769:bg-none flex items-center"
        style={{ backgroundImage: `url('${basePath}/img/who_we_are_bg.jpg')` }}
      >
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto relative z-10">

          {/* Mobile Image (Visible only on mobile/tablet) */}
          <div className="hidden w769:block w-full mb-8">
            <Image
              src={`${basePath}/img/who_we_are_mobile-bg.png`}
              alt="Who We Are"
              width={400}
              height={300}
              className="w-[60%] w501:w-[75%] mx-auto object-contain h-auto"
            />
          </div>

          <div className="max-w-2xl text-left w769:text-center w769:mx-auto select-none">
            <h1 className="text-[65px] w1601:text-[60px] w1281:text-[55px] w1025:text-[40px] w769:text-[32px] w480:text-[26px] text-[#181414] uppercase leading-[1.25] tracking-[2px] font-light">
              <strong className="font-bold">Who</strong> We Are
            </h1>
            <p className="text-[22px] w1440:text-[18px] w1025:text-[16px] w480:text-[14px] text-[#222222] font-light leading-[1.65] mt-6 w480:mt-3">
              We brew ideas that connect brands to <br className="hidden md:block" /> the people who matter most to them.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Who We Are Detail Section */}
      <section className="w-full bg-[#16110f] text-white py-[150px] pb-[350px] w1440:py-[120px] w1440:pb-[280px] w1025:py-[85px] w1025:pb-[230px] w769:py-[60px] w769:pb-[180px] w501:py-[40px] w501:pb-[120px]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="grid grid-cols-12 gap-12 w1025:gap-8 w769:grid-cols-1 items-start">

            {/* Left Box: Title & Pillars */}
            <div className="col-span-7 w769:col-span-12 flex flex-col">
              <h3 className="text-[50px] w1600:text-[40px] w1025:text-[35px] w769:text-[30px] w480:text-[22px] uppercase font-light leading-[1.2] tracking-[2px] mb-16 w769:mb-10 w480:mb-6 w769:text-center">
                A <span className="font-extrabold text-white">Creative</span><br />Digital Agency
              </h3>

              <ul className="grid grid-cols-3 gap-6 w501:grid-cols-1 w501:gap-8 mt-4">
                <li className="flex flex-col items-start text-left">
                  <LuTablet className="w-16 h-16 text-white stroke-[1.2] transition-transform duration-300 hover:scale-105" />
                  <p className="text-[#868382] font-libre text-base w1367:text-[16px] leading-relaxed mt-4 font-medium">
                    Data <br />Driven Experiences
                  </p>
                </li>
                <li className="flex flex-col items-start text-left">
                  <LuTarget className="w-16 h-16 text-white stroke-[1.2] transition-transform duration-300 hover:scale-105" />
                  <p className="text-[#868382] font-libre text-base w1367:text-[16px] leading-relaxed mt-4 font-medium">
                    ROI <br />based Strategies
                  </p>
                </li>
                <li className="flex flex-col items-start text-left">
                  <LuUser className="w-16 h-16 text-white stroke-[1.2] transition-transform duration-300 hover:scale-105" />
                  <p className="text-[#868382] font-libre text-base w1367:text-[16px] leading-relaxed mt-4 font-medium">
                    Engagement <br />worthy communication
                  </p>
                </li>
              </ul>
            </div>

            {/* Right Box: Paragraphs */}
            <div className="col-span-5 w769:col-span-12 text-[#868382] font-libre text-[16px] leading-[30px] w769:leading-[25px] w480:text-[14px] font-light text-justify w769:text-left">
              <p className="mb-6">
                Digital Latte is a 12-year-old full-service creative digital agency based out of Mumbai, India. With core expertise in Digital, Design & Development, we brew fresh ideas for ambitious start-ups as well as multi-national companies across India, USA, Middle East, and UK.
              </p>
              <p className="mb-6">
                We emerged from our love for a good cuppa coffee and everything digital. Ever since we&apos;ve made sure to never run out of coffee or fresh ideas.
              </p>
              <p className="mb-6">
                A team of creative young souls who are passionate about their work and fuelled by our drive to come up with extraordinary ideas, we innovate to brew beyond the ordinary and have the courage to execute these innovative ideas. We create engaging content, use consumer insights to connect with your customers, build your brand & drive commerce.
              </p>
              <p className="font-medium  w769:text-center">
                Check out the video that encapsulates us
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Motto Video Section */}
      <section className="w-full bg-[#ebebeb] pb-24 w769:pb-16 relative select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto relative">

          {/* Overlapping container */}
          <div className="relative -mt-[250px] w1440:-mt-[200px] w1025:-mt-[160px] w769:-mt-[120px] z-10 flex flex-col items-center w-full">

            {/* Responsive Video Wrapper */}
            <div className="w-full max-w-[850px] aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/n6bNxvVKXkE?rel=0&showinfo=0"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full object-cover"
                title="Digital Latte Motto Video"
              />
            </div>

            {/* Description & Button */}
            <p className="text-[#16110f] text-[16px] text-center mt-8 font-semibold tracking-wide font-sans px-4">
              Find out what keeps us inspired to brew fresh ideas.
            </p>

            <Link
              href="/our-motto"
              className="mt-6 px-9 py-3.5 border border-[#16110f] rounded-full text-[12px] font-bold text-[#16110f] uppercase tracking-[2px] bg-transparent hover:bg-[#16110f] hover:text-white transition-all duration-300 ease-in-out inline-block hover:scale-[1.03] active:scale-95 shadow-sm hover:shadow-md"
            >
              Our Motto
            </Link>

          </div>

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
