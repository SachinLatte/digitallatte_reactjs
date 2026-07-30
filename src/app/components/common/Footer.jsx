"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="w-full flex flex-col font-sans">
      {/* 2. Main Footer Section */}
      <footer className="w-full bg-white text-[#181414] py-8 px-24 w1101:px-13">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center gap-30 w1601:gap-10">
          {/* Footer Logo */}
          <div className="footer_logo flex-shrink-0">
            <Link href="/">
              <img
                src={`${basePath}/img/footer_logo.png`}
                alt="Digital Latte Logo"
                className="h-16 w1470:h-12 object-contain"
              />
            </Link>
          </div>

          {/* Footer Nav links */}
          <div className="w-full md:w-auto">
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-end lg:justify-start items-center gap-4 w1536:gap-3">
              <li>
                <Link
                  href="/our-expertise/digital-services"
                  className="text-[#181414] hover:text-[#e07f2a] transition-all duration-300 ease-in-out text-[14px] w1470:text-[12px] font-bold tracking-[1px] uppercase"
                >
                  Digital Marketing Services
                </Link>
              </li>
              <li>
                <Link
                  href="/our-expertise/design-services"
                  className="text-[#181414] hover:text-[#e07f2a] transition-all duration-300 ease-in-out text-[14px] w1470:text-[12px] font-bold tracking-[1px] uppercase"
                >
                  Design Services
                </Link>
              </li>
              <li>
                <Link
                  href="/our-expertise/web-development-services"
                  className="text-[#181414] hover:text-[#e07f2a] transition-all duration-300 ease-in-out text-[14px] w1470:text-[12px] font-bold tracking-[1px] uppercase"
                >
                  Web Development Services
                </Link>
              </li>
              <li>
                <Link
                  href="/our-expertise/digital-services/social-media-marketing"
                  className="text-[#181414] hover:text-[#e07f2a] transition-all duration-300 ease-in-out text-[14px] w1470:text-[12px] font-bold tracking-[1px] uppercase"
                >
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/our-expertise/digital-services/search-engine-optimization-seo"
                  className="text-[#181414] hover:text-[#e07f2a] transition-all duration-300 ease-in-out text-[14px] w1470:text-[12px] font-bold tracking-[1px] uppercase"
                >
                  Search Engine Optimization
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyrights and Privacy Policy */}
        <div className="max-w-[1420px] mx-auto   pt-6  text-center copyrights w-full">
          <p className="text-neutral-500 text-[11px] font-libre">
            Copyright <span>{year}</span>. Digital Latte -{" "}
            <Link
              href="/"
              className="hover:text-[#e07f2a] text-[#181414] font-medium transition-colors duration-300"
            >
              Best Digital Agency Mumbai, India
            </Link>
            . All rights are reserved.{" "}
            <Link
              href="/privacy-policy"
              className="hover:text-[#e07f2a] text-neutral-500 font-medium ml-1 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
