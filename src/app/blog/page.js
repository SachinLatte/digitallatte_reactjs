import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import ContactSection from '../components/common/ContactSection';
import Link from 'next/link';
import { blogPosts } from '../../data/blog';

export const metadata = {
  title: "Best Digital Marketing Blog | Social Media Review | India",
  description: "Stay updated with the latest in social media, search engine optimization, web design trends, and digital strategies from Digital Latte.",
};

export default function BlogPage() {
  return (
    <main className="flex-grow flex flex-col w-full font-sans">
      
      {/* 1. Header Section */}
      <section className="pt-32 pb-16 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#16110f] text-white text-center flex flex-col items-center">
        <SectionHeading 
          title={<><span className="font-bold">Our</span> blog</>}
          subtitle="BREWING FRESH DIGITAL INSIGHTS"
          theme="dark"
          align="center"
        />
      </section>

      {/* 2. Blog Posts Grid */}
      <section className="py-16 md:py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#ececec] text-[#16110f]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full mt-4">
            {blogPosts.map((post) => (
              <article 
                key={post.slug}
                className="bg-white border border-neutral-200 hover:border-[#e07f2a] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="aspect-[16/9] relative bg-neutral-100 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-[#e07f2a] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md">
                      {post.date}
                    </span>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide text-neutral-800 hover:text-[#e07f2a] transition duration-300 mb-4 line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8 pt-0 mt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-neutral-400 text-xs font-semibold uppercase tracking-wider">
                    By Digital Latte Crew
                  </span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-[#e07f2a] font-bold text-xs uppercase tracking-widest hover:underline"
                  >
                    Read Article &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Simple Pagination Controls (replicates original pagination) */}
          <div className="flex justify-center items-center mt-16 space-x-2 font-bold text-xs tracking-widest">
            <span className="bg-[#e07f2a] text-white w-9 h-9 rounded-full flex items-center justify-center cursor-default shadow">1</span>
            <span className="text-[#16110f] hover:text-[#e07f2a] hover:bg-white/80 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition">2</span>
            <span className="text-[#16110f] hover:text-[#e07f2a] hover:bg-white/80 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition">3</span>
            <span className="text-[#16110f] select-none">...</span>
            <span className="text-[#16110f] hover:text-[#e07f2a] hover:bg-white/80 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition">7</span>
            <span className="text-[#16110f] hover:text-[#e07f2a] pl-2 cursor-pointer transition uppercase tracking-wider">&rarr;</span>
          </div>

        </div>
      </section>

      {/* 3. Let's Talk CTA */}
      <ContactSection 
        title="Share Your Story"
        subtitle="Want to discuss digital trends or collaborate on a guest insight? Get in touch."
        theme="dark"
      />

    </main>
  );
}
