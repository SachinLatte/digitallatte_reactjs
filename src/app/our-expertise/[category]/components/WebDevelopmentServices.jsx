import { getAssetPath } from "../../../../utils/assetPath";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  LuCode, 
  LuSettings, 
  LuShieldCheck, 
  LuShoppingBag, 
  LuSmartphone 
} from "react-icons/lu";
import ContactSection from "../../../components/common/ContactSection";
import ClientsCarousel from "../../../components/case-studies/ClientsCarousel";

const devServices = [
  {
    slug: "website-microsite",
    title: "Website & Microsite Development",
    icon: LuCode,
    description: "Our team has the coding chops and the designer's acumen to develop interactive, engaging and aesthetically...",
  },
  {
    slug: "content-management-systems",
    title: "Content Management Systems (CMS)",
    icon: LuSettings,
    description: "Getting your website live is really just the beginning. The task of keeping content up to date adding pages...",
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance & Security",
    icon: LuShieldCheck,
    description: "Don't let your website's critical updates and security tasks distract affect your business operations. At Digital...",
  },
  {
    slug: "ecommerce-solutions",
    title: "Ecommerce Solutions",
    icon: LuShoppingBag,
    description: "From selecting the right e-commerce platform, simplifying processes, complete systems integration...",
  },
  {
    slug: "mobile-applications",
    title: "Mobile Apps & Websites",
    icon: LuSmartphone,
    description: "Looking to create a custom mobile app or a mobile website? Native iOS/Android App or Hybrid App?...",
  },
];

const beyondDev = [
  {
    category: "digital-services",
    title: "Digital",
    description: "Many firms can build you a website, Mobile App, Digital and Social media presence. But what about crafting a great Digital Experience...",
    image: "/img/services/digital-services.webp",
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
    category: "design-services",
    title: "Design",
    description: "Design, in every sense, has always been at the heart of what we do; Design that isn't just about what it looks like, but about how it works and the experience it creates...",
    image: "/img/services/design-service.webp",
    col1: [
      { title: "User Experience Design", slug: "user-experience" },
      { title: "Print Design", slug: "print-designs" },
      { title: "Logo Designing", slug: "logo-designing" },
    ],
    col2: [
      { title: "Brand Identity", slug: "brand-identity" },
      { title: "Digital Design", slug: "digital-designs" },
    ]
  },
  {
    category: "production-services",
    title: "Production",
    description: "Capture your brand essence & bring imagination to life through concept photo & video shoot. Every element is personalised to your...",
    image: "/img/services/production-services.webp",
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

export default function WebDevelopmentServices() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white">
      
      {/* 1. Header Banner */}
      <section 
        className="w-full bg-[#ececec] relative overflow-hidden select-none flex flex-col justify-center min-h-[770px] w1281:min-h-[680px] w1025:min-h-[555px] w769:min-h-0 pt-24 pb-12 w769:pt-32 bg-no-repeat bg-[position:right_bottom] bg-[size:50%_auto] w1470:bg-[size:43%_auto] w1281:bg-[size:43%_auto] w769:bg-none"
        style={{ backgroundImage: `url('${basePath}/img/services/website-development-bg.webp')` }}
      >
        {/* On mobile, display illustration inline above text */}
        <div className="hidden w769:block w-full px-6 mb-8">
          <Image 
            src={`${basePath}/img/services/website-development-bg.webp`} 
            alt="Web Development Services Banner Illustration" 
            width={400}
            height={300}
            className="w-[45%] w501:w-[60%] mx-auto block object-contain h-auto"
          />
        </div>

        {/* Text content container */}
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 w769:text-center select-none">
          <h1 className="font-sans text-[44px] w1470:text-[38px] w1281:text-[32px] w1025:text-[26px] w769:text-[22px] text-[#181414] leading-[1.35] tracking-[2px] uppercase select-none">
            Making the <span className="font-sans font-bold">technology bend</span> <br className="hidden md:block" /> to the will of the <span className="font-sans font-bold">user.</span>
          </h1>
        </div>
      </section>

      {/* 2. Breadcrumbs */}
      <div className="w-full bg-white py-6 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-2 font-libre font-bold text-[14px] text-[#000] tracking-[1.5px] flex items-center gap-1 select-none">
          <Link href="/what-we-brew" className="hover:text-[#ff9000] transition-colors">
            Our Expertise
          </Link>
          <Image 
            src={`${basePath}/img/right_arrow_new.webp`} 
            alt="arrow" 
            width={10}
            height={10}
            className="w-[10px] h-[10px] object-contain select-none pointer-events-none mx-1" 
          />
          <span className="text-[#ff9000] font-medium">Web Development Services</span>
        </div>
      </div>

      {/* 3. Bio Description Section */}
      <section className="w-full bg-white py-16 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 flex flex-col text-center">
          <h1 className="font-sans text-[36px] w769:text-[28px] text-[#16110f] tracking-normal mb-8 select-none">
            <span className="block font-medium">We connect brands to customers</span>
            <span className="block font-medium text-[36px] w769:text-[28px] mt-1">
              through robust web &amp; mobile products
            </span>
          </h1>
          <div className="font-libre text-center mx-auto text-[#000] text-[16px] w769:text-[14px] leading-[1.8] flex flex-col gap-6 select-none">
            <p className="font-light text-[#16110f] text-[16px] w769:text-[16px] leading-[1.6]">
              We&apos;re a curious bunch of problem solvers helping clients grow through new digital products, platforms, and experiences. With scrupulous attention to quality, we develop digital products that are fast, secure, scalable and delight your users.
            </p>
            <p className="font-light">
              Our approach combines creative and strategic thinking with technical expertise and customized solution. Flexibility is built into our process, as every unique challenge requires its own bespoke solution. we&apos;re always experimenting, prototyping and testing to stay ahead of the curve. Quality is at the core of everything we do.
            </p>
            <p className="font-light select-none">
              Let us help you plan, design, develop and launch your next website, microsite, or a mobile app.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Development Services Grid (Dark Background) */}
      <section className="w-full bg-[#16110f] py-24 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 flex flex-col">
          {/* Section Heading */}
          <h2 className="font-sans text-[42px] w769:text-[30px] uppercase tracking-[3px] text-center text-white select-none mb-16">
            <span className="font-medium mr-2">Development</span>
            <span className="font-light">Services</span>
          </h2>

          {/* Grid Container */}
          <div className="grid grid-cols-3 w1025:grid-cols-2 w769:grid-cols-1 gap-12 w1281:gap-8 gap-y-16">
            {devServices.map((service) => {
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
                        href={`/our-expertise/web-development-services/${service.slug}`}
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

      {/* 5. Beyond Dev Section (Light background, Hover overlays) */}
      <section className="w-full bg-white pt-15 select-none">
        <div className="w-full flex flex-col">
          {/* Section Title */}
          <h2 className="font-sans text-[42px] w769:text-[30px] uppercase tracking-[3px] text-center text-[#16110f] select-none mb-16">
            <span className="font-light mr-2">Beyond</span>
            <span className="font-medium">Web Development</span>
          </h2>

          {/* 3-Column Grid Block (Alternating image overlay cards) */}
          <div className="w-full flex flex-row w769:flex-col overflow-hidden bg-[#16110f]">
            {beyondDev.map((block) => (
              <div 
                key={block.category}
                className="w-1/3 w769:w-full relative overflow-hidden aspect-square group bg-neutral-900"
              >
                {/* Default: category illustration image */}
                <Image 
                  src={getAssetPath(block.image)} 
                  alt={block.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-all duration-700 select-none"
                />

                {/* Hover Overlay: fades in absolute dark overlay container */}
                <div className="absolute inset-0 bg-[#16110f]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] flex flex-col justify-center p-15 w1281:p-6 text-white overflow-y-auto z-10">
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
                            href={block.category === "production-services" ? "/our-expertise/production-services#photography-grid" : item.slug.startsWith("javascript") ? item.slug : `/our-expertise/${block.category}/${item.slug}`}
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
                            href={block.category === "production-services" ? "/our-expertise/production-services#photography-grid" : item.slug.startsWith("javascript") ? item.slug : `/our-expertise/${block.category}/${item.slug}`}
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
