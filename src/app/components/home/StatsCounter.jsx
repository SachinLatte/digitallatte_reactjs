"use client";

import { getAssetPath } from "../../../utils/assetPath";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

function CounterItem({ icon, title, target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let animationFrameId;
    const currentElement = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const end = target;
          const duration = 2000; // 2 seconds duration
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Quadratic ease-out easing
            const easedProgress = progress * (2 - progress);

            const currentCount = Math.floor(easedProgress * end);
            setCount(currentCount);

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setCount(0);
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        }
      },
      { threshold: 0.1 },
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target]);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const fullIcon = icon.startsWith("http") ? icon : `${basePath}${icon}`;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <Image
        src={fullIcon}
        alt={title}
        width={64}
        height={64}
        className="h-16 w-auto w1367:h-13 mb-4 object-contain"
        style={{ width: "auto", height: "auto" }}
      />
      <h3 className="font-sans text-[16px] w1367:text-[15px] uppercase tracking-[2px] text-neutral-300 mb-2 w501:mb-0 font-semibold">
        {title}
      </h3>
      <h4 className="font-sans text-[55px] w1367:text-[45px] w1025:text-[38px] font-bold text-white tracking-[2px]">
        {count.toLocaleString()}
      </h4>
    </div>
  );
}

export default function StatsCounter() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section
      className="relative w-full py-24 w1367:py-15 w501:py-10 bg-cover bg-center bg-no-repeat bg-fixed flex items-center min-h-[440px] w1025:min-h-auto text-white"
      style={{ backgroundImage: `url('${basePath}/img/home/counter_bg1.webp')` }}
    >
      <div className="absolute inset-0 bg-[#16110f]/60 z-0"></div>
      <div className="relative max-w-[1420px] mx-auto px-6 sm:px-12 md:px-16 w769:px-10 w501:px-5 lg:px-24 w-full grid grid-cols-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] w769:grid-cols-[1fr_1fr] gap-x-6 gap-y-12 items-center text-center z-10">
        <CounterItem
          icon="/img/home/coffee_icon.webp"
          title="Coffee Cups"
          target={20800}
        />
        <div className="w769:hidden block w-[1px] h-40 bg-white"></div>
        <CounterItem
          icon="/img/home/projects_icon.webp"
          title="Projects"
          target={575}
        />
        <div className="w769:hidden block w-[1px] h-40 bg-white"></div>
        <CounterItem
          icon="/img/home/working_days_icon.webp"
          title="Working Days"
          target={4412}
        />
        <div className="w769:hidden block w-[1px] h-40 bg-white"></div>
        <CounterItem
          icon="/img/home/clients_icon.webp"
          title="Clients"
          target={498}
        />
      </div>
    </section>
  );
}
