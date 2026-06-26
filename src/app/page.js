import Link from "next/link";

export const metadata = {
  title: "Best Digital Agency Mumbai | Social Media Marketing | India",
  description: "Digital Latte is a full-service Creative Digital Marketing Agency in Mumbai, India. Get the best digital experts to boost your social media & digital presence.",
};

export default function Home() {
  return (
    <main className="flex-grow flex flex-col w-full font-sans">

      {/* 1. Hero Banner Section */}
      <section className="w-full min-h-screen flex items-center bg-[#ececec]">
        <div className="w-full max-w-[1420px] mx-auto  pt-24 pb-12 md:pt-32 md:pb-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          {/* Left Side: Content */}
          <div className="md:col-span-7 flex flex-col items-start text-left order-2 md:order-1">
            <h1 className="text-[38px] sm:text-[48px] md:text-[60px] lg:text-[55px] text-[#181414] uppercase leading-[1.5] tracking-[2px] font-normal">
              A <span className="font-bold">Full-Service Creative</span> Digital Agency
            </h1>
            <p className="text-neutral-700 text-[16px] md:text-[20px] font-medium leading-[1.6] max-w-2xl mt-6">
              Boost your social media & digital marketing strategies with beautiful designs, superior content, and engaging experiences.
            </p>
            <Link
              href="/who-we-are"
              className="mt-8 px-8 py-3.5 border border-[#16110f] rounded-full text-[13px] uppercase font-semibold tracking-[2px] text-black bg-transparent hover:border-[#ff9000] hover:bg-[#ff9000] hover:text-white transition duration-300 block"
            >
              Watch Video
            </Link>
          </div>

          {/* Right Side: Video Container */}
          <div className="md:col-span-5 flex justify-center order-1 md:order-2 w-full max-w-[380px] md:max-w-none mx-auto">
            <div className="w-full flex justify-center items-center">
              <video
                muted
                playsInline
                autoPlay
                loop
                className="w-full h-auto object-contain"
              >
                <source src="/img/coffee-cup.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Who We Are Section */}
      <section className="home-who-we-are w-full bg-[#16110f] text-white">
        <div className="max-w-[1420px] mx-auto  py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          {/* Left Column: Description Content */}
          <div className="md:col-span-6 flex flex-col items-start text-left">
            <h2 className="text-[36px] md:text-[45px] text-white uppercase tracking-[2.5px] font-light mb-8 leading-tight">
              <span className="font-bold">Who</span> we are
            </h2>

            <p className="text-[#868382] text-[15px] md:text-[16px] leading-[1.8] text-justify max-w-xl mb-6">
              Digital Latte is a full-service creative digital agency with core expertise in Digital, Design & Development. We emerged from our love for a good cuppa coffee and everything digital. Ever since we've made sure to never run out of coffee or fresh ideas.
            </p>

            <p className="text-[#868382] text-[15px] md:text-[16px] leading-[1.8] text-justify max-w-xl mb-8">
              A team of creative young souls who are passionate about their work and fuelled by our drive to come up with extraordinary ideas, we innovate to brew beyond the ordinary and have the courage to execute these innovative ideas...
            </p>

            <Link
              href="/who-we-are"
              className="text-[#868382] hover:text-[#ff9000] text-[12px] uppercase tracking-[2px] font-bold underline transition duration-300"
            >
              Read More
            </Link>
          </div>

          {/* Right Column: Custom Caricature and Brain Images Side-by-side */}
          <div className="hidden md:grid md:col-span-6 grid-cols-2 gap-6 w-full max-w-[500px] md:max-w-none mx-auto">

            {/* Polaroid 1 (Coffee Caricature) */}
            <div className="pt-[20px]">
              <img
                src="/img/who-we-are-1.webp"
                alt="Digital Latte Coffee Character Caricature"
                className="w-full h-auto object-contain hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
            </div>

            {/* Polaroid 2 (Creative Brain Bulb) */}
            <div>
              <img
                src="/img/who-we-are-2.png"
                alt="Digital Latte Creative Brain Lightbulb"
                className="w-full h-auto object-contain hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
