"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";

const WORDS = ["Digital", "Strategy", "Business", "Creative", "Ideas"];

export default function ThankYouPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Text typing animation matching the reference
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setVisible(true);
      }, 400);
    }, 1900);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex-grow flex flex-col w-full font-sans overflow-x-hidden min-h-[85vh] justify-center bg-[#16110f]">
      <section
        id="say_hello"
        className="w-full bg-[#16110f] text-white py-28 w992:py-20 w769:py-16 w501:py-12 px-24 w1101:px-13 w501:px-6"
      >
        <div className="max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 w1281:gap-12 items-center">
            {/* Left Column: Let's Talk & Social Links */}
            <div className="flex flex-col justify-start w-full">
              <h4 className="font-libre text-white text-[45px] w501:text-[36px] md:text-[60px] lg:text-[75px] w1470:text-[60px] font-black capitalize tracking-[2px] leading-[1.15] md:leading-[102px] w1536:leading-[80px] mb-8 text-left">
                Let&apos;s Talk <br />
                <span
                  className={`text-[#ff9000] transition-opacity duration-300 block ${
                    visible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {WORDS[wordIndex]}
                </span>
              </h4>

              <h5 className="text-white text-[20px] w1367:text-[18px] w501:text-[16px] font-normal tracking-[1px] mb-10 text-left">
                Let&apos;s discuss your project at{" "}
                <a
                  href="mailto:ideas@digitallatte.in"
                  className="text-[#ff9000] hover:underline font-semibold transition-colors duration-300"
                >
                  ideas@digitallatte.in
                </a>
              </h5>

              <ul
                className="flex items-center space-x-2"
                style={{ "--hover-cup": `url('${basePath}/img/hover-cup.webp')` }}
              >
                <li className="group inline-flex items-center justify-center m-0 w-[62px] h-[62px] transition-all duration-300 ease-in-out hover:bg-[image:var(--hover-cup)] hover:bg-contain hover:bg-center hover:bg-no-repeat">
                  <a
                    href="https://www.facebook.com/AgencyDigitalLatte"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="flex items-center justify-center w-[54px] h-[54px] rounded-full text-[#675b57] text-[26px] transition-all duration-300 ease-in-out group-hover:text-[#ff9000]"
                  >
                    <FaFacebookF />
                  </a>
                </li>
                <li className="group inline-flex items-center justify-center m-0 w-[62px] h-[62px] transition-all duration-300 ease-in-out hover:bg-[image:var(--hover-cup)] hover:bg-contain hover:bg-center hover:bg-no-repeat">
                  <a
                    href="https://twitter.com/Digitallatte"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                    className="flex items-center justify-center w-[54px] h-[54px] rounded-full text-[#675b57] text-[26px] transition-all duration-300 ease-in-out group-hover:text-[#ff9000]"
                  >
                    <FaTwitter />
                  </a>
                </li>
                <li className="group inline-flex items-center justify-center m-0 w-[62px] h-[62px] transition-all duration-300 ease-in-out hover:bg-[image:var(--hover-cup)] hover:bg-contain hover:bg-center hover:bg-no-repeat">
                  <a
                    href="https://www.linkedin.com/company/digital-latte/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    className="flex items-center justify-center w-[54px] h-[54px] rounded-full text-[#675b57] text-[26px] transition-all duration-300 ease-in-out group-hover:text-[#ff9000]"
                  >
                    <FaLinkedinIn />
                  </a>
                </li>
                <li className="group inline-flex items-center justify-center m-0 w-[62px] h-[62px] transition-all duration-300 ease-in-out hover:bg-[image:var(--hover-cup)] hover:bg-contain hover:bg-center hover:bg-no-repeat">
                  <a
                    href="https://www.instagram.com/digitallatte/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="flex items-center justify-center w-[54px] h-[54px] rounded-full text-[#675b57] text-[26px] transition-all duration-300 ease-in-out group-hover:text-[#ff9000]"
                  >
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column: Thank You Message Box */}
            <div className="say_hello_main_right w-full flex flex-col justify-center">
              <div className="thank_msg_body bg-[#1c1613] border border-neutral-800/80 p-8 sm:p-12 md:p-14 rounded-2xl w-full text-left shadow-2xl animate-[fadeIn_0.5s_ease-out]">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ff9000] mb-6 uppercase tracking-wider font-sans leading-snug">
                  Thank you for getting in touch!
                </h2>
                
                <p className="text-neutral-300 text-base sm:text-lg leading-[1.8] font-libre font-light mb-8">
                  We will get back to you soon. In the meantime,
                  <br />
                  you can explore our{" "}
                  <Link
                    href="/case-studies"
                    className="text-[#ff9000] underline font-medium hover:text-[#e07f2a] transition-colors duration-300"
                  >
                    Digital Marketing case studies
                  </Link>{" "}
                  <br />
                  or update yourself with the latest from the world of <br className="hidden sm:inline" />
                  digital through our{" "}
                  <Link
                    href="/digital-marketing-blog"
                    className="text-[#ff9000] underline font-medium hover:text-[#e07f2a] transition-colors duration-300"
                  >
                    blog.
                  </Link>
                </p>

                <div className="pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-white text-[#16110f] hover:bg-[#e07f2a] hover:text-white font-sans font-bold text-[14px] uppercase tracking-[1.5px] px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                  >
                    Go To Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
