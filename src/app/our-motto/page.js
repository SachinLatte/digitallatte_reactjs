import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import ContactSection from '../components/common/ContactSection';
import Button from '../components/ui/Button';

export const metadata = {
  title: "Our Motto | Creative Philosophy | Digital Latte",
  description: "Brewing fresh ideas is our motto. Read about the creative principles, values, and guidelines that drive Digital Latte to brew beyond the ordinary.",
};

export default function MottoPage() {
  const principles = [
    {
      num: "01",
      title: "Brew Fresh Ideas",
      desc: "We make sure to never run out of fresh ideas or hot coffee. We innovate to push beyond ordinary brand limits, producing engaging user experiences."
    },
    {
      num: "02",
      title: "Bold Execution",
      desc: "Ideas are only as good as their execution. We have the courage to implement creative layouts, native mobile codes, and high-performance ad buys."
    },
    {
      num: "03",
      title: "Data-Driven ROI",
      desc: "Analytics is our compass. Every visual, ad campaign, and search engine configuration is structured to boost organic leads and maximize business ROI."
    },
    {
      num: "04",
      title: "Collaborative Spirit",
      desc: "Our clients are our co-brewers. We build lasting relationship connections to collaboratively execute brand strategies that resonate across markets."
    }
  ];

  return (
    <main className="flex-grow flex flex-col w-full font-sans">
      
      {/* 1. Header Banner */}
      <section className="pt-32 pb-16 px-6 bg-[#ececec] text-[#16110f] text-center flex flex-col items-center">
        <SectionHeading 
          title={<><span className="font-bold">Our</span> motto</>}
          subtitle="BREWING FRESH IDEAS"
          theme="light"
          align="center"
        />
      </section>

      {/* 2. Motto Pillars Grid */}
      <section className="py-16 md:py-24 px-6 bg-[#16110f] text-white">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full mt-10">
            {principles.map((p, idx) => (
              <div 
                key={idx} 
                className="bg-[#221f1f] border border-neutral-800 p-8 rounded-2xl flex flex-col items-start text-left hover:border-[#e07f2a] transition duration-300 shadow-md group"
              >
                <span className="text-[#e07f2a] text-3xl font-black block mb-4 group-hover:scale-110 transition-transform duration-300">
                  {p.num}
                </span>
                <h3 className="text-white text-lg md:text-xl font-bold uppercase tracking-wide mb-3">
                  {p.title}
                </h3>
                <p className="text-neutral-400 text-sm md:text-[15px] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-neutral-400 max-w-xl text-sm leading-relaxed mb-8">
              Want to see our motto in action? Check out our dynamic case studies portfolio showcasing brand success campaigns.
            </p>
            <Button href="/case-studies" variant="orangeOutline">
              Explore Our Work
            </Button>
          </div>

        </div>
      </section>

      {/* 3. Let's Talk CTA */}
      <ContactSection 
        title="Let's Brew Together"
        subtitle="Bring your digital goals to the table and let's craft a strategic action plan."
        theme="dark"
      />

    </main>
  );
}
