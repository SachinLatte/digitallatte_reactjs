"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { LuChevronRight } from "react-icons/lu";

export default function BlogGrid({ initialPosts }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gridRef = useRef(null);

  // Read page parameter from URL
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 6;

  // Calculate pagination details
  const totalPages = Math.ceil(initialPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = initialPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      router.push(`/digital-marketing-blog?page=${pageNum}`);
    }
  };

  // Smooth scroll back to grid top when page changes
  useEffect(() => {
    if (pageParam && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pageParam]);

  // Generates page number sequence with optional truncation dots
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="w-full flex flex-col font-sans bg-white select-none">
      {/* 1. Hero Banner Section (Matches who-we-are style, height, and typography) */}
      <section
        className="relative w-full h-[773px] w1281:h-[680px] w1025:h-[555px] w769:h-auto w769:py-16 w501:py-12 bg-[#ececec] bg-size-[45%] bg-no-repeat bg-right w769:bg-none flex items-center"
        style={{
          backgroundImage: 'url("/img/blog/bog-main-bg.png")'
        }}
      >
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto relative z-10">
          {/* Mobile Image (Visible only on mobile/tablet) */}
          <div className="hidden w769:block w-full mb-8">
            <Image
              src="/img/blog/blog-mobile.png"
              alt="What's Fresh"
              width={350}
              height={350}
              className="w-[60%] w501:w-[75%] mx-auto object-contain"
            />
          </div>

          <div className="max-w-2xl text-left w769:text-center w769:mx-auto select-none">
            <h1 className="text-[65px] w1601:text-[60px] w1281:text-[55px] w1025:text-[40px] w769:text-[32px] w480:text-[26px] text-[#181414] uppercase leading-[1.25] tracking-[2px] font-light">
              <strong className="font-bold">What&apos;s</strong> Fresh
            </h1>
            <p className="text-[22px] w1440:text-[18px] w1025:text-[16px] w480:text-[14px] text-[#222222] font-light leading-[1.65] mt-6 w480:mt-3">
              Change is constant and digital marketing is no exception. <br className="hidden md:block" /> Update yourself with the latest Digital Marketing News, <br className="hidden md:block" /> SEO & Social Media Insights, Analysis & Opinions.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Blog Posts Grid & Heading (Matches custom width container and reference typography) */}
      <section ref={gridRef} className="py-20 bg-white text-[#16110f]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          {/* Section Heading (Matches live reference avantgrade uppercase style) */}
          <div className="text-center mb-16 select-none">
            <h4 className="text-[45px] w1281:text-[38px] w769:text-[28px] w480:text-[24px] font-sans font-light uppercase tracking-[4px] text-[#16110f] leading-none mb-6">
              <strong className="font-bold">DIGITAL</strong> MARKETING BLOG
            </h4>
            <p className="text-[22px] w1281:text-[18px] w769:text-[16px] text-[#222222] font-light leading-[36px] w769:leading-[28px] max-w-[900px] mx-auto">
              From industry trends to best practices, the blog covers all the information you need to stay on top of digital marketing spectrum.
            </p>
          </div>

          {/* Grid of Posts (.main_blog matching reference styles) */}
          <div className="grid grid-cols-3 w1101:grid-cols-2 w769:grid-cols-1 gap-[50px] w769:gap-8">
            {currentPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-white border border-[#cccccc] overflow-visible flex flex-col justify-between text-left group transition-all duration-500 hover:bg-[#ff9000] cursor-pointer"
              >
                <Link href={`/digital-marketing-blog/${post.slug}`} className="flex flex-col h-full">
                  {/* Image Section */}
                  <div className="relative w-full aspect-[16/10] bg-neutral-50 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Details Section (.details with overlapping .blog-date) */}
                  <div className="relative pt-[90px] px-[25px] pb-[25px] w769:pt-[75px] flex-grow flex flex-col justify-between">
                    {/* Overlapping Date Badge (.blog-date: 100x100, top: -50px, left: 25px) */}
                    <div className="absolute -top-[50px] left-[25px] bg-[#ff9000] w-[100px] h-[100px] w769:w-[90px] w769:h-[90px] pt-[10px] w769:pt-[6px] text-center text-white select-none z-10">
                      <h1 className="text-[45px] w769:text-[40px] font-sans font-black leading-[50px] m-0 text-white">
                        {post.day}
                      </h1>
                      <p className="text-[16px] font-sans text-center text-white m-0 uppercase tracking-wide">
                        {post.month}
                      </p>
                    </div>

                    <div>
                      {/* Title (h4: 18px, uppercase, letter-spacing 3px, turns white on hover) */}
                      <h4 className="text-[18px] leading-[28px] font-sans font-semibold uppercase tracking-[3px] text-[#16110f] group-hover:text-white transition-colors duration-500 break-words">
                        {post.title}
                      </h4>

                      {/* Excerpt (p: 16px, line-height 25px, turns white on hover) */}
                      <p className="text-[#222222] group-hover:text-white text-[16px] leading-[25px] font-sans font-light mt-[15px] transition-colors duration-500 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* 3. Pagination Controls (.listing-pagination: right-aligned) */}
          {totalPages > 1 && (
            <div className="flex justify-end items-center mt-[50px] select-none font-sans text-[15px]">
              <nav className="flex items-center gap-2" aria-label="Posts pagination">
                {getPageNumbers().map((page, index) => {
                  if (page === "...") {
                    return (
                      <span key={`dots-${index}`} className="px-[13px] py-[8px] text-[#4b545a] select-none">
                        &hellip;
                      </span>
                    );
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-[13px] py-[8px] transition-colors duration-200 cursor-pointer ${
                        currentPage === page
                          ? "text-[#ff9000] font-bold"
                          : "text-[#4b545a] hover:text-[#ff9000]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* Next arrow icon */}
                {currentPage < totalPages && (
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-[13px] py-[8px] text-[#ff9000] hover:text-[#e07f2a] transition duration-200 cursor-pointer flex items-center justify-center"
                    aria-label="Next page"
                  >
                    <LuChevronRight className="w-5 h-5 stroke-[2.5px]" />
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
