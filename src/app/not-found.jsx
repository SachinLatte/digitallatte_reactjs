import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "../utils/assetPath";

export const metadata = {
  title: "404 - Page Not Found | Digital Latte",
  description: "Looks like the brew isn't strong enough here. Let's find you a perfect brew.",
};

export default function NotFound() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <main className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center select-none">
      <div 
        className="w-full min-h-[85vh] lg:min-h-[90vh] bg-[#eee] md:bg-transparent bg-no-repeat bg-cover md:bg-[length:100%_auto] bg-center md:bg-left-top flex flex-col justify-center px-6 sm:px-12 md:pl-[10%] lg:pl-[12%] py-20 md:py-32 text-center md:text-left transition-all duration-300"
        style={{
          backgroundImage: `url('${basePath}/img/error_bg.webp')`,
        }}
      >
        {/* Mobile-Only Illustration */}
        <div className="block md:hidden w-full max-w-[320px] mx-auto mb-8">
          <Image
            src={getAssetPath("/img/error_mobile.webp")}
            alt="404 Error - Brew not found"
            width={563}
            height={406}
            priority
            className="w-[75%] max-w-[280px] h-auto mx-auto object-contain"
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        {/* Big Oops Title */}
        <h1 className="font-sans text-[55px] sm:text-[80px] md:text-[110px] lg:text-[150px] font-bold text-[#f99d1e] uppercase leading-none tracking-tight">
          Oops!
        </h1>

        {/* Subtitle */}
        <h4 className="font-sans text-[18px] sm:text-[22px] lg:text-[25px] font-semibold text-[#16110f] uppercase mt-3 md:mt-2 tracking-wide">
          Looks like the brew isn't strong enough here
        </h4>

        {/* Call to Action with Brew Logo */}
        <div className="mt-8 md:mt-16 lg:mt-24 flex flex-col md:flex-row items-center md:items-center gap-4">
          <div className="hidden md:block flex-shrink-0">
            <Image
              src={getAssetPath("/img/error_logo.webp")}
              alt="Coffee cup"
              width={75}
              height={75}
              className="w-14 lg:w-16 h-auto object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          </div>

          <p className="font-sans text-[20px] sm:text-[24px] lg:text-[32px] text-[#16110f] uppercase leading-snug font-semibold">
            Let's find you a <br className="hidden md:block" />
            <span className="font-bold">
              perfect brew{" "}
              <Link 
                href="/" 
                className="text-[#f99d1e] underline hover:text-[#d88210] transition-colors duration-300 inline-block font-bold"
              >
                here
              </Link>
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
