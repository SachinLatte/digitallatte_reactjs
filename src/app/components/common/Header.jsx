"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MegaMenu from "./MegaMenu";
import services from "../../../data/services";
import { FaCaretDown } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const [hoveringExpertise, setHoveringExpertise] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [grayscale, setGrayscale] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const closeMenu = () => {
    setMenuOpen(false);
    setExpertiseOpen(false);
    setHoveringExpertise(false);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  const handleMouseEnter = () => {
    if (window.innerWidth > 943) {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
      setHoveringExpertise(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 943) {
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
      if (menuOpen) {
        closeMenu();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
    { name: "our expertise", href: "/our-expertise", hasDropdown: true },
    { name: "Clientele", href: "/clientele" },
    { name: "case studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "careers", href: "/careers" },
    { name: "contact us", href: "/contact-us" },
  ];

  const isDarkHeader = menuOpen || scrolled;

  return (
    <>
      {/* Main Fixed Header */}
      <header
        className={`
          fixed top-0 left-0 w-full h-[69px] transition-colors duration-500 z-[9999] flex items-center justify-between font-sans 
          ${isDarkHeader && "bg-transparent"}
        `}
      >
        {/* Logo (left) */}
        <div className="flex-shrink-0 flex items-center h-full">
          <Link
            href="/"
            onClick={closeMenu}
            className="logo-container max-[480px]:hidden relative overflow-hidden w-[69px] hover:w-[265px] h-[69px] transition-all duration-1000 ease-[cubic-bezier(0,0.995,0.8,1.005)] block z-[10000]"
          >
            <img
              src="https://digitallatte.in/img/logo.png"
              alt="Digital Latte Logo"
              className="absolute left-0 top-0 h-[70px] z-10 max-w-none"
            />
            <img
              src="https://digitallatte.in/img/logo_strip.png"
              alt="Digital Latte Logo Strip"
              className="h-[59px] ml-[70px] mt-[12px] max-w-none block"
            />
          </Link>
        </div>

        {/* Sliding Menu Overlay Container */}
        <div
          className={`
            fixed top-0 right-0 h-screen md:h-[69px] w-full md:w-[94%] lg:w-[96%] xl:w-[100%] bg-[#16110f] transition-all duration-[600ms] ease-in-out flex md:flex-row flex-col items-center justify-start md:justify-between pt-24 md:pt-0 px-8 md:pr-25 md:pl-40 z-[9998]
            ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}
          `}
        >
          {/* Navigation Links */}
          <ul className="flex flex-col md:flex-row items-center w-full justify-center md:justify-start space-y-6 md:space-y-0 md:space-x-1 lg:space-x-2 xl:space-x-4 max-h-[80vh] md:max-h-none overflow-y-auto md:overflow-visible md:h-full">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.hasDropdown) {
                return (
                  <li
                    key={link.name}
                    className="relative group py-2 md:py-0 w-full md:w-auto text-center md:text-left md:h-full md:flex md:items-center"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Desktop Hover Link (Direct navigation) */}
                    <div className="hidden md:flex items-center">
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={`
                          text-[12px] lg:text-[13px] xl:text-[16px] font-medium uppercase tracking-[1.5px] transition duration-300 py-3 px-3 lg:px-4
                          ${isActive ? "text-[#e07f2a]" : "text-white hover:text-[#e07f2a]"}
                        `}
                      >
                        {link.name}
                      </Link>
                      <FaCaretDown
                        className={`text-xs ml-[-8px] transition-transform duration-300 ${hoveringExpertise ? "rotate-180" : ""} ${isActive ? "text-[#e07f2a]" : "text-white"}`}
                      />
                    </div>

                    {/* Mobile Accordion Trigger Link */}
                    <div className="md:hidden flex flex-col items-center">
                      <button
                        onClick={() => setExpertiseOpen(!expertiseOpen)}
                        className={`
                          flex items-center space-x-2 text-lg font-bold uppercase tracking-wider transition duration-300 py-2
                          ${isActive ? "text-[#e07f2a]" : "text-white"}
                        `}
                      >
                        <span>{link.name}</span>
                        <FaCaretDown
                          className={`text-sm transition-transform duration-300 ${expertiseOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Mobile Accordion Content */}
                      {expertiseOpen && (
                        <div className="w-full text-center bg-[#221f1f] rounded-lg mt-2 p-4 space-y-4 max-h-[300px] overflow-y-auto border border-neutral-800">
                          <Link
                            href="/our-expertise"
                            onClick={closeMenu}
                            className="text-[#e07f2a] font-bold text-xs uppercase block py-1 border-b border-neutral-800"
                          >
                            What We Brew
                          </Link>
                          {Object.entries(services).map(([cat, items]) => (
                            <div key={cat} className="space-y-1 text-left mt-3">
                              <Link
                                href={`/our-expertise/${cat}`}
                                onClick={closeMenu}
                                className="text-white text-xs font-bold block uppercase hover:text-[#e07f2a]"
                              >
                                {cat
                                  .replace("-services", "")
                                  .replace(/-/g, " ")}
                              </Link>
                              <ul className="pl-3 border-l border-neutral-850 space-y-1">
                                {items.map((s) => (
                                  <li key={s.slug}>
                                    <Link
                                      href={`/our-expertise/${cat}/${s.slug}`}
                                      onClick={closeMenu}
                                      className="text-neutral-400 text-xs hover:text-white block py-1 uppercase"
                                    >
                                      {s.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Desktop Hover Mega Menu */}
                    {hoveringExpertise && <MegaMenu closeMenu={closeMenu} />}
                  </li>
                );
              }

              return (
                <li
                  key={link.name}
                  className="py-2 md:py-0 w-full md:w-auto text-center md:text-left md:h-full md:flex md:items-center"
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`
                      text-[12px] lg:text-[13px] xl:text-[16px] font-medium uppercase tracking-[1.5px] transition duration-300 py-3 px-3 lg:px-4 block
                      ${isActive ? "text-[#e07f2a]" : "text-white hover:text-[#e07f2a]"}
                    `}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}

            {/* Desktop Grayscale ON / OFF Image Switch */}
            <li
              className="hidden md:block pl-4 flex-shrink-0 cursor-pointer select-none"
              onClick={() => setGrayscale(!grayscale)}
            >
              <img
                src={grayscale ? "/img/on-btn.png" : "/img/off-btn.png"}
                alt="Grayscale Toggle Switch"
                className="h-[33px] w-[120px] object-contain transition-opacity duration-300 hover:opacity-90"
              />
            </li>
          </ul>
        </div>

        {/* Floating Menu Toggle Button (Sits above sliding overlay) */}
        <div
          className="w-[55px] h-[50px] fixed md:absolute right-4 sm:right-5  lg:right-6 top-[9px] z-[9999] cursor-pointer flex flex-col justify-center items-center select-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {/* Top Bar */}
          <div
            className={`
              w-[44px] h-[3px] absolute transition-all duration-[600ms] ease-[cubic-bezier(0.53,0,0.15,1.3)]
              ${menuOpen
                ? "bg-white rotate-45 translate-y-0"
                : `${isDarkHeader ? "bg-white" : "bg-[#16110f]"} -translate-y-[8px]`
              }
            `}
          />
          {/* Bottom Bar */}
          <div
            className={`
              w-[44px] h-[3px] absolute transition-all duration-[600ms] ease-[cubic-bezier(0.53,0,0.15,1.3)]
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
