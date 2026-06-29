"use client";

import { useEffect, useState, useRef } from "react";

function CounterItem({ icon, title, target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
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
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <img src={icon} alt={title} className="h-16 w-16 mb-4 object-contain" />
      <h3 className="font-libre text-[16px] uppercase tracking-[2px] text-neutral-300 mb-2 font-semibold">
        {title}
      </h3>
      <p className="font-libre text-[35px] font-bold text-white tracking-[2px]">
        {count.toLocaleString()}
      </p>
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
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative max-w-[1200px] mx-auto px-6 w-full grid grid-cols-2 md:grid-cols-4 gap-12 text-center z-10">
        <CounterItem icon="/img/coffee_icon.png" title="Coffee Cups" target={20800} />
        <CounterItem icon="/img/projects_icon.png" title="Projects" target={575} />
        <CounterItem icon="/img/working_days_icon.png" title="Working Days" target={4412} />
        <CounterItem icon="/img/clients_icon.png" title="Clients" target={498} />
      </div>
    </section>
  );
}
