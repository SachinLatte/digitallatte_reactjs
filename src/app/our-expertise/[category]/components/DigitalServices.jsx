import { getAssetPath } from "../../../../utils/assetPath";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LuThumbsUp,
  LuSearch,
  LuCoins,
  LuPlay,
  LuFileText,
  LuTrendingUp,
  LuTarget,
  LuMegaphone,
  LuShoppingBag
} from "react-icons/lu";
import ContactSection from "../../../components/common/ContactSection";
import ClientsCarousel from "../../../components/case-studies/ClientsCarousel";

const digitalServices = [
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    icon: LuThumbsUp,
    description: "Customers are more engaged than ever before, thanks to Social Media that gives them direct access to businesses...",
  },
  {
    slug: "seo",
    title: "Search Engine Optimization",
    icon: LuSearch,
    description: "If you regularly use Google then you've probably realised that when you search for something you don't typically scroll...",
  },
  {
    slug: "digital-media-planning",
    title: "Digital Media Planning",
    icon: LuCoins,
    description: "Despite the advances in targeting and segmentation, there is a lot of 'noise' digitally, distracting the online users...",
  },
  {
    slug: "video-content-creation",
    title: "Video Content Creation",
    icon: LuPlay,
    description: "Faster data speed, upgraded smart phones and the rise of content distribution network (CDN) have changed the way...",
  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    icon: LuFileText,
    description: "In the age of Digital, there is so much content being created every minute that even great content can be lost in...",
  },
  {
    slug: "google-analytics",
    title: "Google Analytics & Reporting",
    icon: LuTrendingUp,
    description: "Whether it's to better understand the effect of a campaign, to deep-dive into the user journey on your website...",
  },
  {
    slug: "digital-strategy-consulting",
    title: "Digital Strategy Consulting",
    icon: LuTarget,
    description: "Transform your digital strategy with our expert consulting services. We analyze your market, understand your target audience...",
  },
  {
    slug: "influencer-marketing",
    title: "Influencer & Celebrity Campaigns",
    icon: LuMegaphone,
    description: "Amplify your brand's reach with powerful influencer and celebrity campaigns. We connect your brand with influencers who align...",
  },
  {
    slug: "ecommerce-solutions",
    title: "Ecommerce & Quick Commerce Solutions",
    icon: LuShoppingBag,
    description: "Grow your online sales with our comprehensive eCommerce and Quick Commerce solutions. We optimize your store for maximum...",
  },
  {
    slug: "amazon-enhanced-brand-content",
    title: "Enhanced Brand Content (A+ Content)",
    icon: LuFileText,
    description: "Stand out on Amazon with our Enhanced Brand Content (A+ Content) services. We create compelling product descriptions...",
  },
];

const beyondDigital = [
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
  },
  {
    category: "web-development-services",
    title: "Development",
    description: "We're a curious bunch of problem solvers helping clients grow through new digital products, platforms, and experiences. With scrupulous attention to quality...",
    image: "/img/services/devlopment-service.webp",
    col1: [
      { title: "Website & Microsite Development", slug: "website-microsite" },
      { title: "Content Management Systems (CMS)", slug: "content-management-systems" },
      { title: "Website Maintenance & Security", slug: "website-maintenance" },
    ],
    col2: [
      { title: "Mobile Apps & Websites", slug: "mobile-applications" },
      { title: "Ecommerce Solutions", slug: "ecommerce-solutions" },
    ]
  }
];

export default function DigitalServices({ data, categoryKey }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const categoryName = data?.name || "Digital Services";
  const heroHeading =
    data?.heroHeading ||
    "We brew ideas that connect brands to the people who matter most to them.";
  const heroImage = data?.heroImage || "/img/services/brain-bg.webp";
  const bioTitle = data?.bioTitle || "We Craft Digital Experiences That's What We Do!";
  const bioParagraphs =
    data?.bioParagraphs && data.bioParagraphs.length > 0
      ? data.bioParagraphs
      : [
          "Many firms can build you a website, Mobile App, Digital and Social media presence. But what about crafting a great Digital Experience?",
          "With expertise across every platform, every device, and every manner to communicate and connect with audiences online, We'll help you understand the complexity of our ever-changing digital world and simplify it for optimal impact. We create engaging content, use consumer insights to connect with your customers, build your brand, drive commerce and craft digital first experiences to help you create sustainable influence for engaging your audience and energising your organisation to thrive and grow.",
          "Explore our Digital Marketing Services & embrace the Digital First approach to transform your brand.",
        ];

  const getSubServiceIcon = (slug, fallbackIndex = 0) => {
    const found = digitalServices.find((s) => s.slug === slug);
    if (found?.icon) return found.icon;
    const fallbackList = [
      LuThumbsUp,
      LuSearch,
      LuCoins,
      LuPlay,
      LuFileText,
      LuTrendingUp,
      LuTarget,
      LuMegaphone,
      LuShoppingBag,
      LuFileText,
    ];
    return fallbackList[fallbackIndex % fallbackList.length] || LuThumbsUp;
  };

  const subServicesList =
    data?.subServices && data.subServices.length > 0
      ? data.subServices.map((sub, idx) => ({
          slug: sub.slug,
          title: sub.title,
          description: sub.description || sub.metaDescription || "",
          icon: getSubServiceIcon(sub.slug, idx),
        }))
      : digitalServices;

  const beyondTitle = data?.beyondTitle || "BEYOND DIGITAL";
  const beyondCards =
    data?.beyondCards && data.beyondCards.length > 0
      ? data.beyondCards
      : beyondDigital;
  const clientsTitle = data?.clientsTitle || "OUR CLIENTS";
  const showClients = data?.showClients !== undefined ? data.showClients : true;

  const currentSlug = data?.slug || categoryKey || "digital-services";

  const renderBeyondTitle = () => {
    if (!beyondTitle) return null;
    const parts = beyondTitle.trim().split(" ");
    if (parts.length === 1) {
      return <span className="font-medium">{parts[0]}</span>;
    }
    return (
      <>
        <span className="font-light mr-2">{parts[0]}</span>
        <span className="font-medium">{parts.slice(1).join(" ")}</span>
      </>
    );
  };

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white">

      {/* 1. Header Banner */}
      <section
        className="w-full bg-[#ececec] relative overflow-hidden select-none flex flex-col justify-center min-h-[770px] w1281:min-h-[680px] w1025:min-h-[555px] w769:min-h-0 pt-24 pb-12 w769:pt-32 bg-no-repeat bg-[position:right_bottom] bg-[size:50%_auto] w1470:bg-[size:43%_auto] w1281:bg-[size:43%_auto] w769:bg-none"
        style={{ backgroundImage: `url('${getAssetPath(heroImage)}')` }}
      >
        {/* On mobile, display illustration inline above text */}
        <div className="hidden w769:block w-full px-6 mb-8">
          <Image
            src={getAssetPath(heroImage)}
            alt={`${categoryName} Banner Illustration`}
            width={400}
            height={300}
            className="w-[45%] w501:w-[60%] mx-auto block object-contain h-auto"
          />
        </div>

        {/* Text content container */}
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 w769:text-center select-none">
          <h1 className="font-sans text-[44px] w1470:text-[38px] w1281:text-[32px] w1025:text-[26px] w769:text-[22px] text-[#181414] leading-[1.35] tracking-[2px] uppercase select-none font-light">
            {typeof heroHeading === "string" && (heroHeading.includes("<") || heroHeading.includes("\n")) ? (
              <span dangerouslySetInnerHTML={{ __html: heroHeading.replace(/\n/g, "<br/>") }} />
            ) : typeof heroHeading === "string" && heroHeading.toLowerCase().includes("we brew ideas") ? (
              <>
                <span className="font-bold">WE BREW IDEAS</span> THAT CONNECT <br className="hidden md:block" />
                BRANDS TO THE PEOPLE WHO <br className="hidden md:block" />
                MATTER MOST TO THEM.
              </>
            ) : (
              heroHeading
            )}
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
          <span className="text-[#ff9000] font-medium">{categoryName}</span>
        </div>
      </div>

      {/* 3. Bio Description Section */}
      <section className="w-full bg-white py-16 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 flex flex-col text-center">
          <h1 className="font-sans text-[36px] w769:text-[28px] text-[#16110f] tracking-normal mb-8 select-none">
            <span className="block font-medium">{bioTitle}</span>
          </h1>
          <div className="font-libre text-center mx-auto text-[#000] text-[16px] w769:text-[14px] leading-[1.8] flex flex-col gap-6 select-none">
            {bioParagraphs.map((p, pIdx) => (
              <p key={pIdx} className="font-light text-[#16110f] text-[16px] w769:text-[16px] leading-[1.6]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Digital Services Grid (Dark Background) */}
      <section className="w-full bg-[#16110f] py-24 select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto px-4 flex flex-col">
          {/* Section Heading */}
          <h2 className="font-sans text-[42px] w769:text-[30px] uppercase tracking-[3px] text-center text-white select-none mb-16">
            <span className="font-medium mr-2">{categoryName.split(" ")[0]}</span>
            <span className="font-light">{categoryName.split(" ").slice(1).join(" ") || "Services"}</span>
          </h2>

          {/* Grid Container */}
          <div className="grid grid-cols-3 w1025:grid-cols-2 w769:grid-cols-1 gap-12 w1281:gap-8 gap-y-16">
            {subServicesList.map((service) => {
              const IconComp = service.icon || LuThumbsUp;
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
                        href={`/our-expertise/${currentSlug}/${service.slug}`}
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

      {/* 5. Beyond Digital Section (Light background, Hover overlays) */}
      {beyondCards && beyondCards.length > 0 && (
        <section className="w-full bg-white pt-15 select-none">
          <div className="w-full flex flex-col">
            {/* Section Title */}
            <h2 className="font-sans text-[42px] w769:text-[30px] uppercase tracking-[3px] text-center text-[#16110f] select-none mb-16">
              {renderBeyondTitle()}
            </h2>

            {/* 3-Column Grid Block (Alternating image overlay cards) */}
            <div className="w-full flex flex-row w769:flex-col overflow-hidden bg-[#16110f]">
              {beyondCards.map((block, bIdx) => (
                <div
                  key={block.category || bIdx}
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
                      {Array.isArray(block.col1) && block.col1.length > 0 && (
                        <ul className="w-1/2 flex flex-col gap-4.5">
                          {block.col1.map((item, iIdx) => (
                            <li
                              key={item.slug || iIdx}
                              className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:bg-[#ff9000] before:rounded-none"
                            >
                              <Link 
                                href={block.category === "production-services" ? "/our-expertise/production-services#photography-grid" : item.slug?.startsWith("javascript") ? item.slug : `/our-expertise/${block.category}/${item.slug}`}
                                className="font-sans text-[16px] text-[#ff9000] hover:text-white transition-colors duration-300 tracking-wide font-normal block leading-snug"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                      {Array.isArray(block.col2) && block.col2.length > 0 && (
                        <ul className="w-1/2 flex flex-col gap-4.5">
                          {block.col2.map((item, iIdx) => (
                            <li 
                              key={item.slug || iIdx}
                              className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:bg-[#ff9000] before:rounded-none"
                            >
                              <Link 
                                href={block.category === "production-services" ? "/our-expertise/production-services#photography-grid" : item.slug?.startsWith("javascript") ? item.slug : `/our-expertise/${block.category}/${item.slug}`}
                                className="font-sans text-[16px] text-[#ff9000] hover:text-white transition-colors duration-300 tracking-wide font-normal block leading-snug"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Clients Carousel */}
      {showClients && <ClientsCarousel title={clientsTitle} />}

      {/* 7. Let's Talk CTA */}
      <ContactSection
        title="Brew Something Fresh"
        subtitle="Have a digital project, design challenge, or production need? Let's talk over coffee."
        theme="dark"
      />
    </main>
  );
}
