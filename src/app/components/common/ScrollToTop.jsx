"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let animFrameId;

    const checkScroll = () => {
      const scrollPos =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        (window.lenis ? window.lenis.scroll : 0) ||
        0;

      setVisible(scrollPos > 100);
      animFrameId = requestAnimationFrame(checkScroll);
    };

    animFrameId = requestAnimationFrame(checkScroll);

    return () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      if (window.lenis) {
        try {
          window.lenis.scrollTo(0, { immediate: false, duration: 1.2 });
        } catch {
          // ignore
        }
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      if (document.documentElement) {
        document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (document.body) {
        document.body.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <button
      onClick={scrollToTop}
      type="button"
      aria-label="Scroll to top"
      id="scroll-to-top-btn"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "18px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        backgroundColor: "#16110f",
        color: "#ffffff",
        border: "2px solid #e07f2a",
        boxShadow: "0 6px 24px rgba(0,0,0,0.55)",
        display: visible ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 9999999,
        transition: "transform 0.2s ease, background-color 0.2s ease",
      }}
      className="hover:!bg-[#e07f2a] active:scale-95"
    >
      <FaArrowUp style={{ fontSize: "16px", color: "#ffffff" }} />
    </button>
  );
}
