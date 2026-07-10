import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import CaseStudyCard from '../components/cards/CaseStudyCard';
import ContactSection from '../components/common/ContactSection';
import { caseStudies } from '../../data/caseStudies';

export const metadata = {
  title: "Digital Marketing | Social Media | Case Studies | India",
  description: "We are a Digital Media Agency based in Mumbai, India. Check what we have brewed in the past on Digital & Social media marketing platforms.",
};

export default function CaseStudiesPage() {
  return (
    <main className="flex-grow flex flex-col w-full font-sans">
      
      {/* 1. Header Section */}
      <section className="pt-32 pb-16 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#ececec] text-[#16110f] text-center flex flex-col items-center">
        <SectionHeading 
          title={<><span className="font-bold">Case</span> studies</>}
          subtitle="EXPLORE THE BEST DIGITAL MARKETING CASE STUDIES"
          theme="light"
          align="center"
        />
      </section>

      {/* 2. Grid of Case Studies */}
      <section className="py-16 md:py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#16110f] text-white">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed text-center max-w-2xl mb-12">
            We're an ideas company that builds awesome digital experiences. Don't take our word for it, take a peek at what we've been up to.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
            {caseStudies.map((project) => (
              <CaseStudyCard
                key={project.slug}
                slug={project.slug}
                title={project.title}
                description={project.description}
                image={project.image}
                category={project.category}
                stats={project.stats}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Let's Talk CTA */}
      <ContactSection 
        title="Brew A Success Campaign"
        subtitle="Ready to build an award-winning digital marketing campaign? Let's talk strategy."
        theme="dark"
      />

    </main>
  );
}
