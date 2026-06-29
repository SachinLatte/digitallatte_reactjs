import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import ContactSection from '../components/sections/ContactSection';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export const metadata = {
  title: "Digital Agency | Best Social Media Marketing Firm | India",
  description: "Say Hello to the Best Digital Agency in Mumbai, India. Get in touch with us for Digital Marketing, Social Media, SEO, Website Development, Branding & Design.",
};

export default function ContactUsPage() {
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-xl text-[#e07f2a] mt-1" />,
      title: "Our Address",
      details: [
        "Digital Latte, 511, Skyline Status,",
        "Near Vidyavihar Railway Station (West),",
        "Vidyavihar West, Mumbai, Maharashtra 400086"
      ]
    },
    {
      icon: <FaPhoneAlt className="text-lg text-[#e07f2a] mt-1" />,
      title: "Call Us",
      details: [
        "+91 22 2511 1121",
        "+91 98200 98200"
      ]
    },
    {
      icon: <FaEnvelope className="text-lg text-[#e07f2a] mt-1" />,
      title: "Email Us",
      details: [
        "ideas@digitallatte.in",
        "careers@digitallatte.in"
      ]
    }
  ];

  return (
    <main className="flex-grow flex flex-col w-full font-sans">
      
      {/* 1. Header Section */}
      <section className="pt-32 pb-16 px-6 bg-[#ececec] text-[#16110f] text-center flex flex-col items-center">
        <SectionHeading 
          title={<><span className="font-bold">Contact</span> us</>}
          subtitle="BREW CONVERSATIONS WITH US"
          theme="light"
          align="center"
        />
      </section>

      {/* 2. Contact Info & Map Details Section */}
      <section className="py-16 md:py-24 px-6 bg-[#16110f] text-white border-t border-neutral-850">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <h3 className="text-2xl font-bold uppercase tracking-wider text-[#e07f2a] mb-6">
              Get in Touch
            </h3>
            <p className="text-neutral-450 text-sm md:text-[15px] leading-relaxed mb-8">
              We emerged from our love for a good cuppa coffee and everything digital. Drop by our office or call us directly to see how we can elevate your brand.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex gap-4 items-start border-l-2 border-neutral-800 pl-4 py-2 hover:border-[#e07f2a] transition duration-300">
                  {info.icon}
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1.5">
                      {info.title}
                    </h4>
                    {info.details.map((line, lIdx) => (
                      <p key={lIdx} className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Google Maps Container */}
          <div className="lg:col-span-7 w-full h-[350px] sm:h-[450px] bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.472852269999!2d72.8943444!3d19.0868875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c87c53d9e837%3A0xe54e63d3fb6682b1!2sSkyline%20Status%2C%20Vidyavihar%20West%2C%20Mumbai%2C%20Maharashtra%20400086!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="absolute inset-0 w-full h-full border-0 grayscale invert contrast-110 opacity-80 hover:opacity-100 hover:grayscale-0 hover:invert-0 transition-all duration-700" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Digital Latte Office Location Map"
            />
          </div>

        </div>
      </section>

      {/* 3. Reusable Contact Form CTA */}
      <ContactSection 
        title="Let's Talk Strategy"
        subtitle="Need a comprehensive digital layout audit or custom proposal quote? Submit our strategist query form below."
        theme="dark"
      />

    </main>
  );
}
