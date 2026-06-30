"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Force a resize calculation shortly after mount/page transition
    const resizeTimer = setTimeout(() => {
      lenis.resize();
    }, 150);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}