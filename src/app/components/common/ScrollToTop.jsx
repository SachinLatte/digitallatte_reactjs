"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 flex items-center justify-center  w-[52px] h-[52px] right-5 p-3 rounded-full bg-[#ececec] text-[#16110f] shadow-lg hover:scale-103 hover:bg-[#f7941d] hover:text-white transition-all z-50 cursor-pointer"
      >
        <FaArrowUp />
      </button>
    )
  );
}
