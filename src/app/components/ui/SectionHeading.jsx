import React from 'react';

export default function SectionHeading({
  title,
  subtitle,
  theme = "dark",
  align = "left",
  className = ""
}) {
  const isDark = theme === "dark";

  // Alignment classes
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end"
  };

  return (
    <div className={`flex flex-col ${alignClasses[align]} ${className}`}>
      <h2 className={`text-[32px] sm:text-[38px] md:text-[45px] uppercase tracking-[2.5px] leading-tight font-light ${
        isDark ? 'text-white' : 'text-[#16110f]'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-[15px] md:text-[16px] leading-[1.8] mt-6 max-w-2xl ${
          isDark ? 'text-[#868382]' : 'text-neutral-650'
        } ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
