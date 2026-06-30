import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import ContactSection from '../components/common/ContactSection';
import Button from '../components/ui/Button';

export const metadata = {
  title: "Digital Marketing | Best Social Media Agency | Mumbai, India",
  description: "Leverage digital and social media marketing with India's best Digital agency. We offer social media, website development, SEO, design, influencer marketing.",
};

export default function Page() {
  return (
    <main className="flex-grow flex flex-col w-full font-sans">
      
      {/* 1. Header Banner */}
      <section className="pt-32 pb-16 px-6 bg-[#16110f] text-white text-center flex flex-col items-center">
        <SectionHeading 
          title={<><span className="font-bold">Who</span> we are</>}
          subtitle="Brewing fresh ideas and building superior digital experiences since 2011."
          theme="dark"
          align="center"
        />
      </section>

      {/* 2. Brand Story Section (Dark Section) */}
      <section className="py-16 md:py-24 px-6 bg-[#16110f] text-white border-t border-neutral-850">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="flex justify-center">
            <img 
              src="/img/who-we-are-1.webp" 
              alt="Digital Latte Story Caricature" 
              className="w-full max-w-[400px] h-auto rounded-2xl shadow-xl hover:scale-102 transition duration-500"
            />
          </div>

          <div className="space-y-6 text-left">
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-[#e07f2a]">
              Brewing Beyond The Ordinary
            </h3>
            <p className="text-neutral-400 text-[15px] md:text-[16px] leading-[1.8] text-justify">
              Digital Latte is a full-service creative digital agency with core expertise in Digital, Design & Development. We emerged from our love for a good cuppa coffee and everything digital. Ever since we've made sure to never run out of coffee or fresh ideas.
            </p>
            <p className="text-neutral-400 text-[15px] md:text-[16px] leading-[1.8] text-justify">
              A team of creative young souls who are passionate about their work and fuelled by our drive to come up with extraordinary ideas, we innovate to brew beyond the ordinary and have the courage to execute these innovative ideas.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Core Values Section (Light Section) */}
      <section className="py-16 md:py-24 px-6 bg-[#ececec] text-[#16110f]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 order-2 md:order-1 text-left">
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-[#16110f]">
              Our Creative Process
            </h3>
            <p className="text-neutral-700 text-[15px] md:text-[16px] leading-[1.8] text-justify">
              At Digital Latte, we believe a great brand is like a great blend: it requires the right ingredients, roasted to perfection, and served fresh. We work closely with our clients to customize digital strategy roadmaps, configure robust SEO, design UI/UX paths, and shoot product commercials that captivate audiences.
            </p>
            <p className="text-neutral-700 text-[15px] md:text-[16px] leading-[1.8] text-justify">
              Our workspace is an active laboratory of developers, media planners, copywriters, and shoot producers collaborating to elevate brand standards and drive measurable ROAS performance.
            </p>
            <div className="pt-2">
              <Button href="/our-motto" variant="solid">
                Read Our Motto
              </Button>
            </div>
          </div>

          <div className="flex justify-center order-1 md:order-2">
            <img 
              src="/img/who-we-are-2.png" 
              alt="Digital Latte Lightbulb Process" 
              className="w-full max-w-[400px] h-auto rounded-2xl shadow-xl hover:scale-102 transition duration-500"
            />
          </div>

        </div>
      </section>

      {/* 4. Let's Talk CTA */}
      <ContactSection 
        title="Work With Us"
        subtitle="Need a creative boost to launch a campaign, build a product, or grow your audience? Let's connect."
        theme="dark"
      />

    </main>
  );
}
