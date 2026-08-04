import React from 'react';
import Link from 'next/link';
import ContactSection from '../components/common/ContactSection';

export const metadata = {
  title: "Digital Agency | Best Social Media Marketing Firm | India",
  description: "Say Hello to the Best Digital Agency in Mumbai, India. Get in touch with us for Digital Marketing, Social Media, SEO, Website Development, Branding & Design.",
};

export default function ContactUsPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <main className="flex-grow flex flex-col w-full font-sans overflow-x-hidden">

      {/* 1. Hero Banner Section */}
      <section
        className="relative w-full h-[773px] w1440:h-[640px] w1025:h-[555px] w769:h-auto w769:py-16 w501:py-12 bg-[#ececec] bg-no-repeat bg-[length:auto_73%] w1281:bg-[length:auto_68%] w1025:bg-[length:auto_60%] bg-[position:88%_43%] w1281:bg-[position:92%_43%] w1025:bg-[position:95%_43%] w769:bg-none flex items-center"
        style={{ backgroundImage: `url('${basePath}/img/contact-us-bg.png')` }}
      >
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto relative z-10">

          {/* Mobile Image (Visible only on mobile/tablet) */}
          <div className="hidden w769:block w-full mb-8">
            <img
              src={`${basePath}/img/contact-us-bg.png`}
              alt="Say Hello"
              className="w-[60%] w501:w-[75%] mx-auto object-contain"
            />
          </div>

          <div className="max-w-4xl text-left w769:text-center w769:mx-auto pt-[6%] w1440:pt-[10%] w1025:pt-[4%] w769:pt-0 select-none">
            <h1 className="text-[65px] w1601:text-[60px] w1281:text-[55px] w1025:text-[40px] w769:text-[32px] w480:text-[26px] text-[#181414] uppercase leading-[1.25] tracking-[2px] font-light mb-6">
              <strong className="font-bold">Say</strong> Hello
            </h1>
            <p className="text-[22px] w1440:text-[18px] w1025:text-[16px] w480:text-[14px] text-[#222222] font-light leading-[1.65] mt-6 w480:mt-3 w769:max-w-none">
              Tell us your business goals and we'll see how we can create something  amazing together. Be it Social Media Marketing, Website Development,  Search Engine Optimization, or Digital Design Services,  fresh ideas are sure-fire.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Work & Join Section */}
      <section className="w-full bg-[#16110f] text-white py-32 w1025:py-24 w769:py-16 w480:py-12">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          <div className="grid grid-cols-2 gap-16 w769:grid-cols-1 w769:gap-12 items-center">

            {/* Work Column */}
            <div className="flex flex-col items-start w769:items-center text-left w769:text-center">
              <h3 className="text-[112px] w1281:text-[90px] w769:text-[60px] w480:text-[45px] text-white font-semibold uppercase leading-[1.05] tracking-tight mb-2 font-sans select-none">
                Work.
              </h3>
              <a
                href="mailto:ideas@digitallatte.in"
                className="text-[#ff9000] text-[35px] w1281:text-[24px] w769:text-[21px] w480:text-[16px] font-semibold leading-normal hover:text-white transition-colors duration-300 block font-sans"
              >
                ideas@digitallatte.in
              </a>
            </div>

            {/* Join Column */}
            <div className="flex flex-col items-end w769:items-center text-right w769:text-center">
              <h3 className="text-[112px] w1281:text-[90px] w769:text-[60px] w480:text-[45px] text-white font-semibold uppercase leading-[1.05] tracking-tight mb-2 font-sans select-none">
                Join.
              </h3>
              <a
                href="mailto:careers@digitallatte.in"
                className="text-[#ff9000] text-[35px] w1281:text-[24px] w769:text-[21px] w480:text-[16px] font-semibold leading-normal hover:text-white transition-colors duration-300 block font-sans"
              >
                careers@digitallatte.in
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Address & Map Section */}
      <section className="contact-head-sec bg-white text-[#16110f] w-full border-b border-neutral-100">
        <div className="grid grid-cols-2 w769:grid-cols-1 w-full items-stretch">

          {/* Left Column: Details */}
          <div className="py-20 lg:py-24 px-6 md:px-12 lg:pl-[24%] flex flex-col justify-center bg-white">

            {/* Address Info */}
            <div className="flex flex-col items-start">
              <img
                src={`${basePath}/img/location-pin.png`}
                alt="Location Pin Icon"
                className="w-10 h-auto mb-4 object-contain"
              />
              <h4 className="text-[22px] font-bold text-[#ff9000] uppercase tracking-wider mb-2 font-sans select-none">
                Address
              </h4>
              <p className="text-[16px] leading-[22px] text-[#16110f] font-libre font-light max-w-md text-left">
                Office No. 601/602, 6th floor,<br />
                Skyline Epitome, Next to Jolly Gymkhana,<br />
                Opp. Fatima School, Vidyavihar West,<br />
                Mumbai-400086.
              </p>
            </div>

            {/* Call Us Info */}
            <div className="flex flex-col items-start mt-12">
              <img
                src={`${basePath}/img/call-img.png`}
                alt="Call Us Icon"
                className="w-10 h-auto mb-4 object-contain"
              />
              <h4 className="text-[22px] font-bold text-[#ff9000] uppercase tracking-wider mb-1 font-sans select-none">
                Call Us
              </h4>
              <span className="text-[15px] font-medium text-[#16110f] block mb-2 font-libre select-none">
                For Business Enquiries:
              </span>
              <p className="text-[16px] leading-[22px] text-[#16110f] font-libre font-light text-left">
                Chintan (Founder & Director) -{' '}
                <a
                  href="tel:+919664088787"
                  className="font-medium text-[#16110f] hover:text-[#ff9000] hover:underline transition-colors duration-300"
                >
                  9664088787
                </a>
              </p>
            </div>

          </div>

          {/* Right Column: Google Maps */}
          <div className="w-full h-full relative overflow-hidden bg-neutral-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.2185202619086!2d72.89518887588147!3d19.09703665137277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f42ccdfb8f%3A0x2863be246d6eb100!2sSkyline%20Epitome!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Digital Latte Office Location Map"
            />
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
