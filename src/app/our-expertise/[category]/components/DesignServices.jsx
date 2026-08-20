import React from "react";
import Link from "next/link";
import { 
  LuLayoutList, 
  LuPrinter, 
  LuPenTool, 
  LuFingerprint, 
  LuMonitor 
} from "react-icons/lu";
import ContactSection from "../../../components/common/ContactSection";
import ClientsCarousel from "../../../components/case-studies/ClientsCarousel";

const designServices = [
  {
    slug: "user-experience",
    title: "User Experience Design",
    icon: LuLayoutList,
    description: "What's the point of a great product if people can't use it? As designers and As designers and strategists, we...",
  },
  {
    slug: "print-designs",
    title: "Print Design",
    icon: LuPrinter,
    description: "Print Designs are not just a piece of art that needs appreciation, but they are astutely crafted to evoke a strong...",
  },
  {
    slug: "logo-designing",
    title: "Logo Designing",
    icon: LuPenTool,
    description: "Your Logo is a representational symbol of who or what you are is one of the essential branding elements It's the...",
  },
  {
    slug: "brand-identity",
    title: "Brand Identity",
    icon: LuFingerprint,
    description: "A good brand strategy connects your business to your market. It drives every aspect of your business and...",
  },
  {
    slug: "digital-designs",
    title: "Digital Design",
    icon: LuMonitor,
    description: "We are adept in creating bespoke digital experiences that are centred around customer behaviour Our team of...",
  },
];

const beyondDesign = [
  {
    category: "web-development-services",
    title: "Development",
    description: "We're a curious bunch of problem solvers helping clients grow through new digital products, platforms, and experiences. With scrupulous attention to quality...",
    image: "/img/services/devlopment-service.png",
    col1: [
      { title: "Website & Microsite Development", slug: "website-microsite" },
      { title: "Mobile Apps & Websites", slug: "mobile-applications" },
      { title: "Content Management Systems (CMS)", slug: "content-management-systems" },
    ],
    col2: [
      { title: "Website Maintenance & Security", slug: "website-maintenance" },
      { title: "Ecommerce Solutions", slug: "ecommerce-solutions" },
    ]
  },
  {
    category: "digital-services",
    title: "Digital",
    description: "Many firms can build you a website, Mobile App, Digital and Social media presence. But what about crafting a great Digital Experience...",
    image: "/img/services/digital-services.png",
    col1: [
      { title: "Social Media Marketing", slug: "social-media-marketing" },
      { title: "Search Engine Optimization(SEO)", slug: "seo" },
      { title: "Enhanced Brand Content (A+ Content)", slug: "amazon-enhanced-brand-content" },
      { title: "Google Analytics & Reporting", slug: "google-analytics" },
    ],
    col2: [
      { title: "Digital Media Planning", slug: "digital-media-planning" },
      { title: "Digital Strategy Consulting", slug: "digital-strategy-consulting" },
      { title: "Influencer & Celebrity Campaigns", slug: "influencer-marketing" },
      { title: "Ecommerce & Quick Commerce Solutions", slug: "ecommerce-solutions" },
    ]
  },
  {
    category: "production-services",
    title: "Production",
    description: "Capture your brand essence & bring imagination to life through concept photo & video shoot. Every element is personalised to your...",
    image: "/img/services/production-services.png",
    col1: [
      { title: "Concept Shoot", slug: "concept-shoot" },
      { title: "Logo Reveal Videos", slug: "logo-reveal-videos" },
      { title: "Digital Films", slug: "digital-films" },
    ],
    col2: [
      { title: "Product Explainer Videos", slug: "product-explainer-videos" },
      { title: "Ecommerce Photography", slug: "ecommerce-photography" },
      { title: "2D Animation Videos", slug: "two-d-animation-videos" },
    ]
  }
];

export default function DesignServices() {
  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white">
      
      {/* 1. Header Banner */}
      <section 
        className="w-full bg-[#ececec] relative overflow-hidden select-none flex flex-col justify-center min-h-[770px] w1281:min-h-[680px] w1025:min-h-[555px] w769:min-h-0 pt-24 pb-12 w769:pt-32 bg-[url('/img/services/design-bg.png')] bg-no-repeat bg-[position:right_bottom] bg-[size:50%_auto] w1470:bg-[size:43%_auto] w1281:bg-[size:43%_auto] w769:bg-none"
      >
        {/* On mobile, display illustration inline above text */}
        <div className="hidden w769:block w-full px-6 mb-8">
          <img 
            src="/img/services/design-bg.png" 
            alt="Design Services Banner Illustration" 
            className="w-[45%] w501:w-[60%] mx-auto block object-contain"
          />
        </div>

        {/* Text content container */}
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 w769:text-center select-none">
          <h1 className="font-sans text-[44px] w1470:text-[38px] w1281:text-[32px] w1025:text-[26px] w769:text-[22px] text-[#181414] leading-[1.35] tracking-[2px] uppercase select-none">
            We're passionate about <br className="hidden md:block" /> <span className="font-sans font-bold">building brands</span> through <br className="hidden md:block" /> <span className="font-sans font-bold">meaningful design</span>
          </h1>
        </div>
      </section>

      {/* 2. Breadcrumbs */}
      <div className="w-full bg-white py-6 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-2 font-libre font-bold text-[14px] text-[#000] tracking-[1.5px] flex items-center gap-1 select-none">
          <Link href="/what-we-brew" className="hover:text-[#ff9000] transition-colors">
            Our Expertise
          </Link>
          <img 
            src="/img/right_arrow_new.png" 
            alt="arrow" 
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1" 
          />
          <span className="text-[#ff9000] font-medium">Design Services</span>
        </div>
      </div>

      {/* 3. Bio Description Section */}
      <section className="w-full bg-white py-16 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 flex flex-col text-center">
          <h1 className="font-sans text-[36px] w769:text-[28px] text-[#16110f] tracking-normal mb-8 select-none">
            <span className="block font-medium">Design is the Silent Ambassador</span>
            <span className="block font-medium text-[36px] w769:text-[28px] mt-1">
              of Your Brand!
            </span>
          </h1>
          <div className="font-libre text-center mx-auto text-[#000] text-[16px] w769:text-[14px] leading-[1.8] flex flex-col gap-6 select-none">
            <p className="font-light text-[#16110f] text-[16px] w769:text-[16px] leading-[1.6]">
              Design, in every sense, has always been at the heart of what we do. Design that isn't just about what it looks like, but about how it works and the experience it creates.
            </p>
            <p className="font-light">
              Good design is the art of planning, constructing, and projecting ideas and experiences with visual and textual content. We create functional visual strategies that are driven by user-behaviour & help communicate your message effectively.
            </p>
            <p className="font-light select-none">
              With the passion to build brands through meaningful design & transform ideas into visual communications, we help businesses grow by creating experiences people love.Explore our design services below.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Design Services Grid (Dark Background) */}
      <section className="w-full bg-[#16110f] py-24 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 flex flex-col">
          {/* Section Heading */}
          <h2 className="font-sans text-[42px] w769:text-[30px] uppercase tracking-[3px] text-center text-white select-none mb-16">
            <span className="font-medium mr-2">Design</span>
            <span className="font-light">Services</span>
          </h2>

          {/* Grid Container */}
          <div className="grid grid-cols-3 w1025:grid-cols-2 w769:grid-cols-1 gap-12 w1281:gap-8 gap-y-16">
            {designServices.map((service) => {
              const IconComp = service.icon;
              return (
                <div key={service.slug} className="flex flex-row items-start gap-4">
                  {/* Left Column: Orange outline icon */}
                  <div className="flex-shrink-0 flex items-center justify-center text-[#ff9000] p-1 mt-1 select-none">
                    <IconComp className="w-[38px] h-[38px] stroke-[1.2]" />
                  </div>
                  {/* Right Column: Title and details */}
                  <div className="flex flex-col text-left">
                    <h3 className="font-sans font-medium text-[20px] w1281:text-[15px] tracking-wider mb-2 leading-snug">
                      <Link 
                        href={`/our-expertise/design-services/${service.slug}`}
                        className="text-white hover:text-[#ff9000] transition-colors duration-300"
                      >
                        {service.title}
                      </Link>
                    </h3>
                    <p className="font-libre text-[#a3a3a3] text-[14px] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Beyond Design Section (Light background, Hover overlays) */}
      <section className="w-full bg-white pt-15 select-none">
        <div className="w-full flex flex-col">
          {/* Section Title */}
          <h2 className="font-sans text-[42px] w769:text-[30px] uppercase tracking-[3px] text-center text-[#16110f] select-none mb-16">
            <span className="font-light mr-2">Beyond</span>
            <span className="font-medium">Design</span>
          </h2>

          {/* 3-Column Grid Block (Alternating image overlay cards) */}
          <div className="w-full flex flex-row w769:flex-col overflow-hidden bg-[#16110f]">
            {beyondDesign.map((block) => (
              <div 
                key={block.category}
                className="w-1/3 w769:w-full relative overflow-hidden aspect-square group bg-neutral-900"
              >
                {/* Default: category illustration image */}
                <img 
                  src={block.image} 
                  alt={block.title} 
                  className="w-full h-full object-cover transition-all duration-700 select-none"
                />

                {/* Hover Overlay: fades in absolute dark overlay container */}
                <div className="absolute inset-0 bg-[#16110f]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] flex flex-col justify-center p-15 w1281:p-6 text-white overflow-y-auto">
                  {/* Category Link Header (Orange text, No border-bottom) */}
                  <h3 className="font-sans text-[38px] w1281:text-[22px] uppercase font-medium leading-none mb-8 text-[#ff9000]">
                    <Link 
                      href={`/our-expertise/${block.category}`} 
                      className="text-[#ff9000] hover:text-white transition-colors duration-300"
                    >
                      {block.title}
                    </Link>
                  </h3>

                  {/* Description copy (wrapped in a Link) */}
                  <p className="font-libre text-[16px] text-white leading-relaxed mb-6">
                    <Link 
                      href={`/our-expertise/${block.category}`} 
                      className="text-white"
                    >
                      {block.description}
                    </Link>
                  </p>

                  {/* Subservice List links (Grouped by two columns side-by-side) */}
                  <div className="flex flex-row gap-6 mt-2 w-full text-left">
                    <ul className="w-1/2 flex flex-col gap-4.5">
                      {block.col1.map((item) => (
                        <li 
                          key={item.slug}
                          className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:bg-[#ff9000] before:rounded-none"
                        >
                          <Link 
                            href={item.slug.startsWith("javascript") ? item.slug : `/our-expertise/${block.category}/${item.slug}`}
                            className="font-sans text-[16px] text-[#ff9000] hover:text-white transition-colors duration-300 tracking-wide font-normal block leading-snug"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <ul className="w-1/2 flex flex-col gap-4.5">
                      {block.col2.map((item) => (
                        <li 
                          key={item.slug}
                          className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:bg-[#ff9000] before:rounded-none"
                        >
                          <Link 
                            href={item.slug.startsWith("javascript") ? item.slug : `/our-expertise/${block.category}/${item.slug}`}
                            className="font-sans text-[16px] text-[#ff9000] hover:text-white transition-colors duration-300 tracking-wide font-normal block leading-snug"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Clients Carousel */}
      <ClientsCarousel />

      {/* 7. Let's Talk CTA */}
      <ContactSection 
        title="Brew Something Fresh"
        subtitle="Have a digital project, design challenge, or production need? Let's talk over coffee."
        theme="dark"
      />
    </main>
  );
}
