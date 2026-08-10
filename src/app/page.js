import Link from "next/link";
import Button from "./components/ui/Button";
import SectionHeading from "./components/ui/SectionHeading";
import StatsCounter from "./components/home/StatsCounter";
import ContactSection from "./components/common/ContactSection";
import TruncateText from "./components/ui/TruncateText";
import services from "../data/services";
import { BsArrowRight } from "react-icons/bs";
import { caseStudies } from "../data/caseStudies";
import { clients } from "../data/clientele";


export const metadata = {
  title: "Best Digital Agency Mumbai | Social Media Marketing | India",
  description: "Digital Latte is a full-service Creative Digital Marketing Agency in Mumbai, India. Get the best digital experts to boost your social media & digital presence.",
};

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const homepageCaseStudies = caseStudies.slice(0, 2);

  const categoryTitles = {
    "digital-services": "Digital Services",
    "design-services": "Creative Design",
    "web-development-services": "Web Development",
    "production-services": "Production & Shoots",
  };

  return (
    <main className="flex-grow flex flex-col w-full font-sans">

      {/* 1. Hero Banner Section */}
      <section className="w-full min-h-screen flex items-center bg-[#ececec]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] mx-auto pt-24 pb-12 md:pt-20 md:pb-20 flex w769:flex-col gap-8 w1025:gap-1 items-center">

          {/* Left Side: Content */}
          <div className=" flex flex-col items-start text-left order-1 w769:order-2">
            <h1 className="text-[60px] w1601:text-[42px]  w1101:text-[36px] text-[#181414] uppercase leading-[1.4] tracking-[2px] font-light">
              A <span className="font-bold">Full-Service Creative</span> <br className="hidden" /> Digital Agency
            </h1>
            <p className="text-neutral-700 text-[16px] md:text-[20px] w1101:text-[17px] font-medium leading-[1.6] max-w-2xl mt-6">
              Boost your social media & digital marketing strategies with beautiful designs, superior content, and engaging experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/who-we-are" variant="solid">
                Watch Video
              </Button>
            </div>
          </div>

          {/* Right Side: Video Container */}
          <div className="flex justify- order-2 w769:order-1 w-full max-w-[500px] w1536:max-w-[445px] w1367:max-w-[440px] w1101:MSX-w-[400px] w1025:max-w-[400px] w769:max-w-[450px] w501:max-w-[350px] mx-auto">
            <div className="w-full flex justify-center items-center">
              <video
                muted
                playsInline
                autoPlay
                loop
                className="w-full h-auto object-contain"
              >
                <source src={`${basePath}/img/coffee-cup.mp4`} type="video/mp4" />
              </video>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Who We Are Section */}
      <section className="home-who-we-are w-full bg-[#16110f] text-white">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] mx-auto">
          <div className="py-32 w1367::py-15 w769:py-10 grid grid-cols-12 w769:grid-cols-1  w769:py-10 items-center">
            {/* Left Column: Description Content */}
            <div className="md:col-span-6 flex flex-col items-start text-left order-1 w769:order-2 w769:mt-8 w501:mt-0">
              <SectionHeading
                title={<><span className="font-bold">Who</span> we are</>}
                theme="dark"
              />
              <p className="text-[#868382] text-[15px] md:text-[16px] leading-[1.8] text-justify max-w-xl mt-8 w501:mt-6 mb-6">
                Digital Latte is a full-service creative digital agency with core expertise in Digital, Design & Development. We emerged from our love for a good cuppa coffee and everything digital. Ever since we've made sure to never run out of coffee or fresh ideas.
              </p>
              <p className="text-[#868382] text-[15px] md:text-[16px] leading-[1.8] text-justify max-w-xl mb-8">
                A team of creative young souls who are passionate about their work and fuelled by our drive to come up with extraordinary ideas, we innovate to brew beyond the ordinary and have the courage to execute these innovative ideas...
              </p>
              <Link
                href="/who-we-are"
                className="text-[#e07f2a] hover:text-[#fff] text-[13px] flex items-center gap-1 uppercase tracking-[1px] font-bold  transition duration-300"
              >
                Read More <BsArrowRight className="text-[14px]" />
              </Link>
            </div>
            <div className="hidden md:grid md:col-span-6 grid-cols-2 order-2 w769:order-1  w-full max-w-[500px] md:max-w-none mx-auto">
              <div className="pt-[20px]">
                <img
                  src={`${basePath}/img/who-we-are-1.webp`}
                  alt="Digital Latte Coffee Character Caricature"
                  className="w-full h-auto object-contain hover:scale-[1.03] transition-transform duration-500 ease-out rounded-xl shadow-lg"
                />
              </div>
              <div>
                <img
                  src={`${basePath}/img/who-we-are-2.png`}
                  alt="Digital Latte Creative Brain Lightbulb"
                  className="w-full h-auto object-contain hover:scale-[1.03] transition-transform duration-500 ease-out rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Expertise Section */}
      <section className="w-full py-32 w1367:py-15 w769:py-10 bg-white text-[#16110f] font-sans">
        <div className="w-[90%] w1470:w-[100%] mx-auto flex flex-col items-center">

          {/* Header */}
          <div className="text-center mb-10 w1367:mb-5 w1025:mb-0 w-full">
            <h2 className="w1367:text-[34px] text-[45px] font-light uppercase tracking-[4px] leading-tight text-[#16110f]">
              <span className="font-extrabold">Our</span> Expertise
            </h2>
            <p className="text-[#222222] common-para font-sans mt-8 w501:mt-5 text-sm sm:text-base leading-relaxed tracking-[0.5px] max-w-5xl mx-auto font-medium">
              We combine data insights with design thinking to build strategies and experiences that <br className="hidden md:block" /> transform businesses.
            </p>

            {/* Centered Loop Video */}
            <div className="mt-8 w-full md:w-[85%] w1101:w-[90%] mx-auto rounded-2xl overflow-hidden">
              <video muted playsInline autoPlay loop className="w-full h-auto w769:h-[100px] w501:h-[70px] object-cover block">
                <source src={`${basePath}/img/text.mp4`} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="w-full mt-5">
            <div className="grid grid-cols-4 w1025:grid-cols-2 w501:grid-cols-1 gap-0 w1025:gap-1 w-full overflow-hidden shadow-sm">
              {[
                {
                  key: "digital-services",
                  title: "Digital",
                  icon: `${basePath}/img/digital_icon.png`,
                  bgClass: "bg-[#16110f]"
                },
                {
                  key: "design-services",
                  title: "Design",
                  icon: `${basePath}/img/design_icon.png`,
                  bgClass: "bg-[#221d1b]"
                },
                {
                  key: "web-development-services",
                  title: "Development",
                  icon: `${basePath}/img/development_icon.png`,
                  bgClass: "bg-[#16110f]"
                },
                {
                  key: "production-services",
                  title: "Production",
                  icon: `${basePath}/img/production_icon.png`,
                  bgClass: "bg-[#221d1b]"
                }

              ].map((cat) => {
                const items = services[cat.key] || [];
                return (
                  <div key={cat.key} className={`${cat.bgClass} text-white py-12 w1367:py-10 px-8 w1367:px-5 text-center flex flex-col items-center`}>
                    <img src={cat.icon} alt={`${cat.title} Services`} className="h-12 w-12 mb- object-contain" />
                    <h1 className="mb-5 mt-2">
                      <Link href={`/our-expertise/${cat.key}`} className="text-[#e07f2a] hover:text-white transition duration-300 text-xl font-bold uppercase tracking-[2px]">
                        {cat.title}
                      </Link>
                    </h1>
                    <ul className="space-y-3 flex-1 flex flex-col justify-start">
                      {items.map((item) => {
                        let href = `/our-expertise/${cat.key}/${item.slug}`;
                        return (
                          <li key={item.slug} className="leading-[20px]">
                            <Link
                              href={href}
                              className="font-sans text-[16px] w1367:text-[15px] w501:text-[16px] font-light leading-[14px] text-white hover:text-[#e07f2a] transition duration-300 capitilize tracking-wide"
                            >
                              {item.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* 4. Top Brands Section */}
      <section className="w-full py-32 w1367:py-15 w501:py-10 bg-[#16110f] text-white font-sans">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] mx-auto">
          <div className="flex flex-col items-center">
            <div className="text-center mb-16 w769:mb-10 w-full">
              <h2 className="w1367:text-[34px] text-[45px] font-light uppercase tracking-[4px] leading-tight text-white">
                <span className="font-extrabold">Top</span> Brands
              </h2>
              <p className="text-neutral-400 font-sans mt-8 text-sm sm:text-base leading-relaxed tracking-[0.5px] max-w-5xl mx-auto font-medium">
                Here's a look at the clients we've worked with. If you'd like to work with the best digital agency too, we'd love to hear from you. Drop us a line and we'll look forward to brewing something fresh for you!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w501:gap-6 auto-rows-[230px] w1101:auto-rows-auto w501:auto-rows-[190px] w-full">
              {clients.map((brand, i) => (
                <div
                  key={i}
                  className="relative flex items-center justify-center p-6 bg-[#ddd] rounded-lg transition-all duration-300 group hover:bg-white"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-[140px] max-w-[80%] object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Link
                href="/clientele"
                className="px-7 py-3 mt-5 w501:mt-0 border border-white text-white rounded-full text-[13px] font-semibold uppercase tracking-[2px] hover:bg-white hover:text-[#16110f] transition-all duration-300 inline-block text-center cursor-pointer hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Load More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 Stats Counter Section */}
      <StatsCounter />
      {/* 5. Case Studies Section */}
      <section className="w-full py-32 w1367:py-15 w769:py-10 w501:py-5 bg-[#ececec] text-[#16110f] font-sans">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] mx-auto">
          {/* Mobile-only Heading */}
          <h2 className="block md:hidden w1367:text-[34px] text-[45px] font-light uppercase tracking-[4px] leading-tight text-[#16110f] mb-12 w501:mb-7 text-left">
            <span className="font-extrabold">case</span> studies
          </h2>

          <div className="flex flex-col md:flex-row md:justify-between items-start gap-65 w1601:gap-45 w1025:gap-25 w769:flex-col w769:gap-10 w-full">

            <div className="w-full md:w-[46%] w769:w-[100%] flex flex-col order-1 w769:order-2">
              <div className="relative overflow-hidden rounded-xl mb-10 w1025:mb-5 group shadow-sm">
                <Link href="/our-expertise/digital-services/kaziranga-university-branding">
                  <img
                    src={`${basePath}/img/case-studies/kaziranga-university/kaziranga-case-study-thumb.webp`}
                    alt="It all starts at Kaziranga University"
                    className="w-full h-auto object-cover transition duration-500 group-hover:scale-110 group-hover:grayscale"
                  />
                  {/* Text Overlay */}
                  <div className="absolute inset-0 p-8 w1025:p-5 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/60 to-transparent transition-opacity duration-500 opacity-100 group-hover:opacity-0 pointer-events-none">
                    <h4 className="font-sans text-white text-[22px] w1367:text-[19px] font-medium leading-[30px] mb-2 text-left capitalize">
                      It all starts at Kaziranga University
                    </h4>
                    <p className="font-sans text-neutral-300 text-[15px] leading-[27px] w1367:leading-[24px] text-left mb-4">
                      <TruncateText limit={100}>Kaziranga University, a prestigious educational institution nestled in the heart of Assam, India, has established itself as a hub of innovation, and academic excellence in higher education.</TruncateText>
                    </p>
                    <span className="text-[#ff9000] text-[14px] font-medium underline text-left">
                      Read More
                    </span>
                  </div>
                </Link>
              </div>
              {/* Note and Button at bottom of Left Column (Desktop only) */}
              <div className="hidden md:flex flex-col items-end w-full mt-4 w769:items-start">
                <h3 className="font-sans text-[17px] text-[#16110f] text-right font-medium tracking-wide">
                  Check out more digital marketing case studies
                </h3>
                <Link
                  href="/case-studies"
                  className="inline-block mt-4 px-6 py-3 bg-black  rounded-full text-xs font-sans uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#ff9000] hover:text-white"
                >
                  View More
                </Link>
              </div>
            </div>

            <div className="w-full md:w-[46%] w769:w-[100%] flex flex-col md:mt-0 order-2 w769:order-1">
              {/* Desktop-only Heading */}
              <h2 className="hidden md:block w1367:text-[34px] text-[45px] font-light uppercase tracking-[4px] leading-tight text-[#16110f] my-14 w769:mt-0 w769:mb-8 text-left">
                <span className="font-extrabold">case</span> studies
              </h2>
              <div className="relative overflow-hidden rounded-xl group shadow-sm">
                <Link href="/our-expertise/digital-services/tim-hortons-branding">
                  <img
                    src={`${basePath}/img/case-studies/tim-hortons/tim-hortons-case-study-thumb.webp`}
                    alt="Tim Hortons"
                    className="w-full h-auto object-cover transition duration-500 group-hover:scale-110 group-hover:grayscale"
                  />
                  {/* Text Overlay */}
                  <div className="absolute inset-0 p-8 w1025:p-5 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/60 to-transparent transition-opacity duration-500 opacity-100 group-hover:opacity-0 pointer-events-none">
                    <h4 className="font-sans text-white text-[21px] w1367:text-[19px] font-medium leading-[30px] mb-2 text-left capitalize">
                      Tim Hortons
                    </h4>
                    <p className="font-sans text-neutral-300 text-[15px] leading-[27px] w1367:leading-[24px] text-left mb-4">
                      <TruncateText limit={100}>Tim Hortons®, a global iconic coffee and donut brand with over 5,100 restaurants worldwide entered the Indian market in August 2022.</TruncateText>
                    </p>
                    <span className="text-[#ff9000] text-[14px] font-medium underline text-left">
                      Read More
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* Mobile-only View More section */}
          <div className="flex md:hidden flex-col items-center w-full mt-12 w501:mt-3">
            <h3 className="font-sans text-[17px] text-[#16110f] text-center font-medium tracking-wide">
              Check out more digital marketing case studies
            </h3>
            <Link
              href="/case-studies"
              className="inline-block mt-4 px-8 py-3 bg-black rounded-full text-xs font-sans uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#ff9000] hover:text-white text-center w-full max-w-[280px]"
            >
              View More
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Dynamic Contact Section */}
      <ContactSection
        title="Let's Talk Strategy"
        subtitle="Fuelled by a drive to come up with extraordinary ideas. Drop us a line to discuss your brand goals."
        theme="dark"
      />
    </main>
  );
}
