"use client";

import { useEffect, useState, useRef } from "react";

function CounterItem({ icon, title, target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let animationFrameId;

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <img src={icon} alt={title} className="h-16 w-16 mb-4 object-contain" />
      <h3 className="font-sans text-[16px] uppercase tracking-[2px] text-neutral-300 mb-2 font-semibold">
        {title}
      </h3>
      <h4 className="font-sans text-[60px] font-bold text-white tracking-[2px]">
        {count.toLocaleString()}
      </h4>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section
      className="relative w-full py-24 bg-cover bg-center bg-no-repeat bg-fixed flex items-center min-h-[440px] text-white"
      style={{ backgroundImage: "url('/img/counter_bg1.webp')" }}
    >
      {/* Dark tint overlay overlaying the parallax background */}
      <div className="absolute inset-0 bg-[#16110f]/60 z-0"></div>

      <div className="relative max-w-[1420px] mx-auto px-6 w-full grid grid-cols-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-x-6 gap-y-12 items-center text-center z-10">
        <CounterItem
          icon="/img/coffee_icon.png"
          title="Coffee Cups"
          target={20800}
        />

        <div className="hidden md:block w-[1px] h-40 bg-white"></div>

        <CounterItem
          icon="/img/projects_icon.png"
          title="Projects"
          target={575}
        />

        <div className="hidden md:block w-[1px] h-40 bg-white"></div>

        <CounterItem
          icon="/img/working_days_icon.png"
          title="Working Days"
          target={4412}
        />

        <div className="hidden md:block w-[1px] h-40 bg-white"></div>

        <CounterItem
          icon="/img/clients_icon.png"
          title="Clients"
          target={498}
        />
      </div>
    </section>
  );
}
