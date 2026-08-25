import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts } from "../../../data/blog";
import ContactSection from "../../components/common/ContactSection";
import BlogCommentForm from "../../components/blog/BlogCommentForm";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} – Best Digital Marketing Blog | Social Media Review| India`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Get other recent blogs (exclude current slug, take first 5 from the base 6 posts list)
  const baseSlugs = [
    "the-dirty-dozen",
    "linkedin-launches-carousel-option-for-post",
    "instagram-adds-boost-option-for-reels",
    "the-perfect-10-a-decade-of-brewing-fresh-ideas",
    "instagram-introduces-insights-for-reels-and-live",
    "10-quick-facts-you-should-know-about-seo"
  ];

  // Find other posts from base blogPosts list that are in baseSlugs and have distinct slugs
  const otherBlogs = blogPosts
    .filter((p) => p.slug !== slug && baseSlugs.includes(p.slug.split("-page-")[0]))
    .reduce((unique, item) => {
      const baseSlug = item.slug.split("-page-")[0];
      if (!unique.some(u => u.slug.split("-page-")[0] === baseSlug)) {
        unique.push(item);
      }
      return unique;
    }, [])
    .slice(0, 5);

  const isHeading = (text) => {
    const subheadings = [
      "Not pretty, it was dirty!",
      "Mastering the art of hard work",
      "The truth about turning twelve",
      "Thanks a Latte!"
    ];
    return subheadings.includes(text) || (text.length < 50 && !text.endsWith('.') && !text.endsWith('?'));
  };

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white select-none">
      {/* 1. Hero Banner Section (Matches the live site layout) */}
      <section
        className="relative w-full h-[220px] w769:h-auto w769:py-12 bg-[#ececec] bg-cover bg-no-repeat bg-[position:0_20px] w1680:bg-[position:-160px_20px] w769:bg-none flex items-center"
      >
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto relative z-10">
          {/* Mobile Image (Visible only on mobile/tablet) */}
          <div className="hidden w769:block w-full mb-6">
            <Image
              src="/img/blog/blog-mobile.png"
              alt="What's Fresh"
              width={300}
              height={200}
              className="w-[50%] w501:w-[70%] mx-auto object-contain h-auto"
            />
          </div>

          <div className="max-w-2xl text-left w769:text-center w769:mx-auto">
            <h1 className="text-[48px] w1281:text-[40px] w769:text-[32px] w480:text-[26px] text-[#181414] uppercase leading-none tracking-[2px] font-bold select-none">
              WHATS <span className="font-light">FRESH</span>
            </h1>
          </div>
        </div>
      </section>

      {/* 2. Main Article Section */}
      <section className="py-16 bg-white text-[#16110f]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          {/* Breadcrumbs (Positioned at the top left of the article column) */}
          <div className="text-[12px] font-sans text-neutral-500 tracking-wide mb-8 select-none">
            <Link href="/digital-marketing-blog" className="hover:text-[#ff9000] font-bold transition duration-200">
              Digital Marketing Blog
            </Link>
            <span className="mx-2 text-neutral-300 font-light">&gt;</span>
            <span className="text-neutral-400 font-light truncate max-w-[200px] inline-block align-bottom">
              {post.title}
            </span>
          </div>

          <div className="grid grid-cols-12 gap-12 w1101:gap-8 w769:grid-cols-1 items-start">

            {/* Left Column - Article Body */}
            <div className="col-span-8 w769:col-span-12 flex flex-col pr-4 w769:pr-0">
              {/* Main Title */}
              <h1 className="text-[32px] w1281:text-[28px] w769:text-[24px] font-sans font-bold uppercase leading-snug tracking-wide text-[#16110f] mb-6">
                {post.title}
              </h1>

              {/* Body Content Paragraphs */}
              <div className="text-[#333333] text-[15px] font-sans font-light leading-relaxed">
                {post.paragraphs && post.paragraphs.length > 0 ? (
                  post.paragraphs.map((para, i) => {
                    // Check if it's a heading
                    if (isHeading(para)) {
                      return (
                        <h2 key={i} className="text-[20px] font-sans font-bold text-[#16110f] mt-10 mb-4 pt-4">
                          {para}
                        </h2>
                      );
                    }
                    return (
                      <p key={i} className="mb-6 text-justify w769:text-left">
                        {para}
                      </p>
                    );
                  })
                ) : (
                  <p className="mb-6 text-justify w769:text-left">{post.excerpt}</p>
                )}

                {/* Anniversary Graphic/Featured Image (Rendered in the lower text block layout) */}
                <div className="w-full my-10 flex justify-center">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="max-w-[600px] w-full h-auto object-contain border border-neutral-100 shadow-sm"
                  />
                </div>
              </div>

              {/* Interactive Comment Reply form (Client-side nested helper) */}
              <BlogCommentForm />
            </div>

            {/* Right Column - Sidebar */}
            <div className="col-span-4 w769:col-span-12 bg-white border border-neutral-200 p-8 rounded-lg">
              {/* Header */}
              <h3 className="text-[18px] font-sans font-extrabold uppercase tracking-wider text-[#16110f] border-b border-neutral-250 pb-3 mb-6 select-none">
                OTHER <span className="font-light text-[#555]">BLOGS</span>
              </h3>

              {/* Sidebar Recent Posts list */}
              <div className="space-y-6">
                {otherBlogs.map((otherPost) => (
                  <div key={otherPost.slug} className="flex gap-4 border-b border-neutral-100 pb-5 last:border-0 last:pb-0 group">
                    <Link
                      href={`/digital-marketing-blog/${otherPost.slug}`}
                      className="w-[80px] h-[80px] shrink-0 overflow-hidden bg-neutral-50 border border-neutral-200 relative block"
                    >
                      <Image
                        src={otherPost.image}
                        alt={otherPost.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </Link>
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="text-[12px] leading-tight font-sans font-extrabold uppercase tracking-wider text-[#16110f] hover:text-[#ff9000] transition duration-200 line-clamp-2">
                          <Link href={`/digital-marketing-blog/${otherPost.slug}`}>
                            {otherPost.title}
                          </Link>
                        </h4>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wide mt-1">
                          {otherPost.date}
                        </p>
                      </div>
                      <p className="text-[11px] text-neutral-500 line-clamp-1 font-light leading-relaxed mt-1">
                        {otherPost.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
