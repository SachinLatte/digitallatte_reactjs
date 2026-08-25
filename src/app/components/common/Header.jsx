"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MegaMenu from "./MegaMenu";
import services from "../../../data/services";
import { FaCaretDown } from "react-icons/fa";

export default function Header() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [menuOpen, setMenuOpen] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const [hoveringExpertise, setHoveringExpertise] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [grayscale, setGrayscale] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const getCategoryName = (cat) => {
    if (cat === "web-development-services") return "DEVELOPMENT";
    return cat.replace("-services", "").toUpperCase();
  };

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setExpertiseOpen(false);
    setHoveringExpertise(false);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  }, [hoverTimeout]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  const handleMouseEnter = () => {
    if (window.innerWidth > 1025) {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
      setHoveringExpertise(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1025) {
      const timeout = setTimeout(() => {
        setHoveringExpertise(false);
      }, 150);
      setHoverTimeout(timeout);
    }
  };

  // Scroll handler to toggle solid background & collapse menu
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      // Only collapse the menu on scroll in desktop viewports.
      // On mobile/tablet (<= 1025px), we must allow scrolling to view all links.
      if (menuOpen && window.innerWidth > 1025) {
        closeMenu();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen, closeMenu]);

  // Disable background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen && window.innerWidth <= 1025) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);


  // Apply Grayscale Filter to HTML Root
  useEffect(() => {
    if (grayscale) {
      document.documentElement.classList.add("grayscale");
    } else {
      document.documentElement.classList.remove("grayscale");
    }
  }, [grayscale]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Who we are", href: "/who-we-are" },
    { name: "Our Motto", href: "/our-motto" },
    { name: "our expertise", href: "/what-we-brew", hasDropdown: true },
    { name: "Clientele", href: "/clientele" },
    { name: "case studies", href: "/case-studies" },
    { name: "Blog", href: "/digital-marketing-blog" },
    { name: "careers", href: "/careers" },
    { name: "contact us", href: "/contact-us" },
  ];

  const isDarkHeader = menuOpen || scrolled;

  return (
    <>
      {/* Main Fixed Header */}
      <header
        className={`
          fixed top-0 left-0 w-full h-[69px] w1101:h-[55px] transition-colors duration-500 z-[9999] flex items-center justify-between font-sans 
          ${isDarkHeader && "bg-transparent"}
        `}
      >
        {/* Logo (left) */}
        <div className="flex-shrink-0 flex items-center h-full">
          <Link
            href="/"
            onClick={closeMenu}
            className="logo-container relative overflow-hidden w-[69px] hover:w-[265px] h-[69px] w1101:h-[55px] transition-all duration-1000 ease-[cubic-bezier(0,0.995,0.8,1.005)] block z-[10000]"
          >
            <Image
              src="/img/logo.png"
              alt="Digital Latte Logo"
              width={70}
              height={70}
              priority
              className="absolute left-0 top-0 h-[70px] w-auto w1101:h-[55px] z-10 max-w-none"
            />
            <Image
              src="/img/logo_strip.png"
              alt="Digital Latte Logo Strip"
              width={195}
              height={59}
              priority
              className="h-[59px] w-auto ml-[70px] mt-[12px] max-w-none block"
            />
          </Link>
        </div>

        {/* Sliding Menu Overlay Container */}
        <div
          className={`fixed top-0 right-0 bg-[#16110f] transition-all duration-[600ms] ease-in-out z-[9998] h-screen md:h-[69px] w1101:h-[55px] w-full md:w-[94%] lg:w-[96%] xl:w-[100%] flex md:flex-row flex-col items-center justify-start pt-24 w501:pt-20 md:pt-0 px-8 pr-25 w1101:pr-10 pl-35 gap-1 w1367:pl-20 w1101:pl-5 md:overflow-visible w1025:fixed w1025:top-0 w1025:right-0 w1025:w-full w1025:h-[100dvh] w1025:flex w1025:flex-col w1025:items-start w1025:justify-start w1025:pt-24 w1025:px-8 w1025:pb-12 w1025:overflow-y-auto w1025:pl-8 w501:pl-6 w1025:pr-8 w1025:gap-6 ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}
        >
          {/* Navigation Links */}
          <ul className="flex flex-col md:flex-row items-center w-full justify-center md:justify-start space-y-6 md:space-y-0 w1281:space-x-2 space-x-3 max-h-[80vh] md:max-h-none overflow-y-auto md:overflow-visible md:h-full w1025:flex-col w1025:items-start w1025:justify-start w1025:space-y-2 w1025:space-x-0 w1025:max-h-none w1025:overflow-visible w1025:h-auto w1025:w-full">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.hasDropdown) {
                return (
                  <li
                    key={link.name}
                    className="relative group py-2 w-full md:w-auto text-center md:text-left md:h-full md:flex md:items-center w1025:w-full w1025:text-left w1025:block w1025:h-auto"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Desktop Hover Link (Direct navigation) */}
                    <div className="flex items-center w1025:hidden">
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={`
                          text-[16px] w1536:text-[14px] w1101:text-[12px] font-medium uppercase tracking-[1.5px] transition duration-300 py-3 px-1 w1536:px-2 w1601:px-4
                          ${isActive ? "text-[#e07f2a]" : "text-white hover:text-[#e07f2a]"}
                        `}
                      >
                        {link.name}
                      </Link>
                      <FaCaretDown
                        className={`text-xs ml-[-3px] transition-transform duration-300 ${hoveringExpertise ? "rotate-180" : ""} ${isActive ? "text-[#e07f2a]" : "text-white"}`}
                      />
                    </div>

                    {/* Mobile Accordion Trigger Link */}
                    <div className="hidden w1025:flex w1025:flex-col w1025:items-start w1025:w-full">
                      <button
                        onClick={() => setExpertiseOpen(!expertiseOpen)}
                        className={`flex items-center justify-between w-full text-lg font-bold uppercase tracking-wider transition duration-300 py-2 ${isActive ? "text-[#e07f2a]" : "text-white"} w1025:text-[15px] w1025:font-semibold w1025:py-1 w1025:tracking-[1.5px]`}
                      >
                        <span>{link.name}</span>
                        <div className="bg-white/10 hover:bg-white/20 p-2 rounded transition-colors duration-300 flex items-center justify-center">
                          <FaCaretDown
                            className={`text-sm text-[#e07f2a] transition-transform duration-300 ${expertiseOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>

                      {/* Mobile Accordion Content */}
                      {expertiseOpen && (
                        <div className="w-full text-left bg-transparent mt-2 pl-4 pr-2 space-y-6 transition-all duration-300 ease-in-out">
                          <Link
                            href="/what-we-brew"
                            onClick={closeMenu}
                            className="text-[#e07f2a] font-bold text-sm uppercase block py-2 border-b border-neutral-800 tracking-wider"
                          >
                            What We Brew
                          </Link>
                          {Object.entries(services)
                            .filter(([cat]) =>
                              [
                                "digital-services",
                                "design-services",
                                "web-development-services",
                                "production-services"
                              ].includes(cat)
                            )
                            .map(([cat, items]) => (
                            <div key={cat} className="space-y-3 mt-4">
                              <Link
                                href={`/our-expertise/${cat}`}
                                onClick={closeMenu}
                                className="text-[#e07f2a] text-[13px] font-bold block uppercase tracking-wider"
                              >
                                {getCategoryName(cat)}
                              </Link>
                              <ul className="pl-4 border-l border-neutral-850 space-y-3">
                                {items.map((s) => {
                                  const href =
                                    cat === "production-services"
                                      ? `/our-expertise/production-services#photography-grid`
                                      : `/our-expertise/${cat}/${s.slug}`;
                                  return (
                                    <li key={s.slug}>
                                      <Link
                                        href={href}
                                        onClick={closeMenu}
                                        className="text-neutral-300 text-[12px] font-medium hover:text-white block py-1 uppercase tracking-wide"
                                      >
                                        {s.title}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Desktop Hover Mega Menu */}
                    <div className="w1025:hidden">
                      {hoveringExpertise && <MegaMenu closeMenu={closeMenu} />}
                    </div>
                  </li>
                );
              }

              return (
                <li
                  key={link.name}
                  className="py-2 w1281:py-1 w-full md:w-auto text-center md:text-left md:h-full md:flex md:items-center w1025:w-full w1025:text-left w1025:py-1 w1025:h-auto"
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`
                      text-[16px] w1536:text-[13px] w1101:text-[12px] font-medium uppercase tracking-[1.5px] transition duration-300 py-3 px-4 w1601:px-1 block
                      ${isActive ? "text-[#e07f2a]" : "text-white hover:text-[#e07f2a]"}
                      w1025:text-[15px] w1025:py-1 w1025:px-0 w1025:font-semibold
                    `}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}

            {/* Desktop Grayscale ON / OFF Image Switch */}
            <li
              className="hidden md:block w1025:hidden pl-4 flex-shrink-0 cursor-pointer select-none"
              onClick={() => setGrayscale(!grayscale)}
            >
              <Image
                src={grayscale ? `${basePath}/img/on-btn.png` : `${basePath}/img/off-btn.png`}
                alt="Grayscale Toggle Switch"
                width={120}
                height={33}
                className="h-[33px] w-[120px] w1101:w-[100px] object-contain transition-opacity duration-300 hover:opacity-90"
              />
            </li>
          </ul>
        </div>

        {/* Floating Menu Toggle Button (Sits above sliding overlay) */}
        <div
          className="w-[55px] h-[50px] fixed md:absolute right-6 top-[9px] z-[9999] cursor-pointer flex flex-col justify-center items-center select-none w1025:fixed w1025:right-4 w1025:top-0 w1025:h-[55px] w1025:w-[55px]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {/* Top Bar */}
          <div
            className={`
              w-[44px] h-[3px] w1101:w-[35px] w1101:h-[2px] absolute transition-all duration-[600ms] ease-[cubic-bezier(0.53,0,0.15,1.3)]
              ${menuOpen
                ? "bg-white rotate-45 translate-y-0"
                : `${isDarkHeader ? "bg-white" : "bg-[#16110f]"} -translate-y-[8px]`
              }
            `}
          />
          {/* Bottom Bar */}
          <div
            className={`
              w-[44px] h-[3px] w1101:w-[35px] w1101:h-[2px] absolute transition-all duration-[600ms] ease-[cubic-bezier(0.53,0,0.15,1.3)]
              ${menuOpen
                ? "bg-white -rotate-45 translate-y-0"
                : `${isDarkHeader ? "bg-white" : "bg-[#16110f]"} translate-y-[8px]`
              }
            `}
          />
        </div>
      </header>
    </>
  );
}

