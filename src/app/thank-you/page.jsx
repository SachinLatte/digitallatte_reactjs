"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ThankYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("from") || "/careers";
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Redirect after 5 seconds
    const timeout = setTimeout(() => {
      router.push(redirectPath);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [redirectPath, router]);

  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-[75vh] w-full bg-[#f6f6f6] px-6 select-none text-center">
      <div className="max-w-xl w-full flex flex-col items-center animate-[scaleIn_0.3s_ease-out]">
        {/* Main Heading */}
        <h1 className="text-[54px] w769:text-[40px] w480:text-[32px] text-[#16110f] font-sans font-medium tracking-wide leading-tight mb-4">
          Thank you for your interest
        </h1>

        {/* Subtitle */}
        <p className="text-[20px] w769:text-[18px] w480:text-[16px] text-[#ff9000] font-sans tracking-wide mb-10">
          Our team will get in touch with you.
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="bg-[#fbcbb5] text-[#16110f] font-sans font-bold text-xs uppercase tracking-[1.5px] px-8 py-3 rounded-full hover:bg-[#e07f2a] hover:text-white transition duration-300 shadow hover:shadow-md active:scale-95 inline-block mb-12"
        >
          Back To Home
        </Link>

        {/* Redirect Notice */}
        <span className="text-neutral-400 text-xs font-libre font-light tracking-wider animate-pulse">
          Redirecting back in <strong className="font-bold text-[#ff9000]">{countdown}</strong> seconds...
        </span>
      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex-grow flex items-center justify-center bg-[#f6f6f6] text-neutral-500 font-sans text-lg">
          Loading...
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
