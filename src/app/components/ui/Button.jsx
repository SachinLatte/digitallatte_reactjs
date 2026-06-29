import React from 'react';
import Link from 'next/link';

export default function Button({
  href,
  onClick,
  variant = "outline",
  uppercase = true,
  tracking = "tracking-[2px]",
  children,
  className = ""
}) {
  const baseClasses = `px-8 py-3.5 rounded-full text-[13px] font-semibold transition duration-300 inline-block text-center cursor-pointer ${
    uppercase ? "uppercase" : ""
  } ${tracking}`;

  const variants = {
    outline: "border border-[#16110f] text-black bg-transparent hover:border-[#e07f2a] hover:bg-[#e07f2a] hover:text-white dark:border-white dark:text-white dark:hover:border-[#e07f2a] dark:hover:bg-[#e07f2a]",
    solid: "bg-[#16110f] text-white border border-[#16110f] hover:bg-[#e07f2a] hover:border-[#e07f2a] dark:bg-white dark:text-black dark:border-white dark:hover:bg-[#e07f2a] dark:hover:text-white",
    orangeOutline: "border border-[#e07f2a] text-[#e07f2a] bg-transparent hover:bg-[#e07f2a] hover:text-white",
    orangeSolid: "bg-[#e07f2a] text-white border border-[#e07f2a] hover:bg-transparent hover:text-[#e07f2a]"
  };

  const finalClasses = `${baseClasses} ${variants[variant] || variants.outline} ${className}`;

  if (href) {
    return (
      <Link href={href} className={finalClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={finalClasses}>
      {children}
    </button>
  );
}
