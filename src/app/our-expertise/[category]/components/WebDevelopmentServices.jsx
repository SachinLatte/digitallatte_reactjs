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
import BeyondServicesCarousel from "../../../components/common/BeyondServicesCarousel";

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

export default function WebDevelopmentServices({ data, categoryKey }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const categoryName = data?.name || "Web Development Services";
  const heroHeading =
    data?.heroHeading ||
    "Making the <span class='font-bold'>technology bend</span> <br class='hidden md:block' /> to the will of the <span class='font-bold'>user.</span>";
  const heroImage = data?.heroImage || "/img/services/website-development-bg.webp";
  const bioTitle = data?.bioTitle || "A Digital First Approach To Problem Solving";
  const bioParagraphs =
    data?.bioParagraphs && data.bioParagraphs.length > 0
      ? data.bioParagraphs
      : [
          "We're a curious bunch of problem solvers helping clients grow through new digital products, platforms, and experiences. With scrupulous attention to quality, we develop digital products that are fast, secure, scalable and delight your users.",
          "Our approach combines creative and strategic thinking with technical expertise and customized solution. Flexibility is built into our process, as every unique challenge requires its own bespoke solution. we're always experimenting, prototyping and testing to stay ahead of the curve. Quality is at the core of everything we do.",
          "Let us help you plan, design, develop and launch your next website, microsite, or a mobile app.",
        ];

  const getSubServiceIcon = (slug, fallbackIndex = 0) => {
    const found = devServices.find((s) => s.slug === slug);
    if (found?.icon) return found.icon;
    const fallbackList = [
      LuCode,
      LuSettings,
      LuShieldCheck,
      LuShoppingBag,
      LuSmartphone,
    ];
    return fallbackList[fallbackIndex % fallbackList.length] || LuCode;
  };

  const subServicesList =
    data?.subServices && data.subServices.length > 0
      ? data.subServices.map((sub, idx) => ({
          slug: sub.slug,
          title: sub.title,
          description: sub.description || sub.metaDescription || "",
          icon: getSubServiceIcon(sub.slug, idx),
        }))
      : devServices;

  const clientsTitle = data?.clientsTitle || "OUR CLIENTS";
  const showClients = data?.showClients !== undefined ? data.showClients : true;

  const currentSlug = data?.slug || categoryKey || "web-development-services";

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
          <h1 className="font-sans text-[44px] w1470:text-[38px] w1281:text-[32px] w1025:text-[26px] w769:text-[22px] text-[#181414] leading-[1.35] tracking-[2px] uppercase select-none">
            {typeof heroHeading === "string" && (heroHeading.includes("<") || heroHeading.includes("\n")) ? (
              <span dangerouslySetInnerHTML={{ __html: heroHeading.replace(/\n/g, "<br/>") }} />
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

      {/* 4. Development Services Grid (Dark Background) */}
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
              const IconComp = service.icon || LuCode;
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

      {/* 5. Beyond Dev Section */}
      <BeyondServicesCarousel currentCategory="web-development-services" titleHighlight="DEVELOPMENT" />

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
