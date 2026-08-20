"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
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
            <img
              src="/img/blog/blog-mobile.png"
              alt="What's Fresh"
              className="w-[60%] w501:w-[75%] mx-auto object-contain"
            />
          </div>

          <div className="max-w-2xl text-left w769:text-center w769:mx-auto select-none">
            <h1 className="text-[65px] w1601:text-[60px] w1281:text-[55px] w1025:text-[40px] w769:text-[32px] w480:text-[26px] text-[#181414] uppercase leading-[1.25] tracking-[2px] font-light">
              <strong className="font-bold">What's</strong> Fresh
            </h1>
            <p className="text-[22px] w1440:text-[18px] w1025:text-[16px] w480:text-[14px] text-[#222222] font-light leading-[1.65] mt-6 w480:mt-3">
              Change is constant and digital marketing is no exception. <br className="hidden md:block" /> Update yourself with the latest Digital Marketing News, <br className="hidden md:block" /> SEO & Social Media Insights, Analysis & Opinions.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Blog Posts Grid & Heading (Matches custom width container) */}
      <section ref={gridRef} className="py-20 bg-white text-[#16110f]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-16 select-none">
            <h2 className="text-[32px] w769:text-[26px] font-sans font-light uppercase tracking-[2.5px] text-[#16110f]">
              <span className="text-[#ff9000] font-extrabold">Digital</span> Marketing Blog
            </h2>
            <p className="text-[15px] text-[#555555] leading-relaxed max-w-[750px] mx-auto mt-4 font-sans font-light">
              From industry trends to best practices, the blog covers all the information you need to stay on top of digital marketing spectrum.
            </p>
          </div>

          {/* Grid of Posts */}
          <div className="grid grid-cols-3 w1025:grid-cols-2 w769:grid-cols-1 gap-x-8 gap-y-12">
            {currentPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-white border border-neutral-200/80 overflow-visible flex flex-col justify-between text-left group transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
              >
                {/* Image Section */}
                <div className="relative w-full aspect-[16/10] bg-neutral-50">
                  <Link href={`/digital-marketing-blog/${post.slug}`} className="block w-full h-full overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                  {/* Overlapping Date Badge */}
                  <div className="absolute bottom-0 left-6 translate-y-1/2 bg-[#ff9000] w-[75px] h-[75px] flex flex-col items-center justify-center text-white select-none z-10 shadow-md">
                    <h1 className="text-[30px] font-sans font-extrabold leading-none">{post.day}</h1>
                    <p className="text-[12px] font-sans font-bold tracking-[1.5px] mt-1 uppercase">{post.month}</p>
                  </div>
                </div>

                {/* Details Section */}
                <div className="pt-12 px-6 pb-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-[18px] mt-2 leading-snug font-sans font-bold uppercase tracking-wide text-[#16110f] hover:text-[#ff9000] transition duration-300">
                      <Link href={`/digital-marketing-blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h4>
                    <p className="text-black text-[15px] leading-relaxed font-sans font-light mt-2 line-clamp-3 leading-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Pagination Controls (Right-Aligned Design) */}
          {totalPages > 1 && (
            <div className="flex justify-end items-center mt-16 select-none font-sans font-bold text-sm">
              <nav className="flex items-center gap-6" aria-label="Posts pagination">
                {getPageNumbers().map((page, index) => {
                  if (page === "...") {
                    return (
                      <span key={`dots-${index}`} className="text-neutral-400 font-normal select-none">
                        &hellip;
                      </span>
                    );
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`transition-colors duration-200 cursor-pointer ${currentPage === page
                        ? "text-[#ff9000] text-[15px]"
                        : "text-neutral-500 hover:text-[#ff9000]"
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
                    className="text-[#ff9000] hover:text-[#e07f2a] transition duration-200 cursor-pointer flex items-center justify-center"
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
