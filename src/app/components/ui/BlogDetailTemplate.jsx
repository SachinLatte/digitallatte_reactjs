import React from "react";
import Link from "next/link";
import Image from "next/image";
import ContactSection from "../common/ContactSection";
import BlogCommentForm from "../blog/BlogCommentForm";

export default function BlogDetailTemplate({ post, otherBlogs = [] }) {
  if (!post) return null;

  return (
    <main className="flex-grow flex flex-col w-full font-sans bg-white select-none">
      {/* 1. Hero Banner Section (.home_banner.service-original-bg) */}
      <section
        className="relative w-full h-[460px] w1281:h-[400px] w1025:h-[350px] w769:h-auto w769:py-12 bg-[#ececec] bg-contain bg-no-repeat bg-right w769:bg-none flex items-center"
        style={{
          backgroundImage: 'url("/img/blog/bog-main-bg.png")',
        }}
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
            <h4 className="font-sans text-[55px] w1281:text-[45px] w769:text-[32px] w480:text-[26px] text-[#181414] uppercase leading-none tracking-[2px] font-light">
              <strong className="font-bold">Whats</strong> Fresh
            </h4>
          </div>
        </div>
      </section>

      {/* 2. Main Article Section (.service-bio .custom_container) */}
      <section className="py-12 bg-white text-[#16110f]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="text-[13px] font-sans text-neutral-500 tracking-wide mb-8 select-none">
            <Link href="/digital-marketing-blog" className="hover:text-[#ff9000] font-bold text-[#16110f] transition duration-200">
              Digital Marketing Blog
            </Link>
            <span className="mx-2 text-neutral-300 font-light">&gt;</span>
            <span className="text-[#ff9000] font-normal truncate max-w-[280px] inline-block align-bottom">
              {post.title}
            </span>
          </div>

          {/* Two-Column Grid: Left Article (64%), Right Sidebar (30%) */}
          <div className="grid grid-cols-12 gap-12 w1101:gap-8 w769:grid-cols-1 items-start">

            {/* Left Column - Article Body (.blog-details-left) */}
            <div className="col-span-8 w1101:col-span-8 w769:col-span-12 flex flex-col pr-4 w769:pr-0">
              {/* Main Title (h1 26px bold uppercase) */}
              <h1 className="text-[26px] w1281:text-[24px] w769:text-[20px] font-sans font-bold uppercase leading-[34px] tracking-wide text-[#16110f] mb-6">
                {post.title}
              </h1>

              {/* Body Content Blocks in exact sequence */}
              <div className="text-[#222222] text-[18px] font-sans font-light leading-[30px]">
                {post.contentBlocks && post.contentBlocks.length > 0 ? (
                  post.contentBlocks.map((block, i) => {
                    if (block.type === "heading") {
                      return (
                        <p key={i} className="my-5 text-[18px] font-sans font-bold text-[#222222] leading-[30px]">
                          <strong>{block.text}</strong>
                        </p>
                      );
                    }
                    if (block.type === "list") {
                      if (block.ordered) {
                        return (
                          <ol key={i} className="list-decimal pl-6 my-4 space-y-2 text-[18px] font-light leading-[30px]">
                            {block.items.map((item, idx) => (
                              <li key={idx} className="pl-1">
                                {item}
                              </li>
                            ))}
                          </ol>
                        );
                      }
                      return (
                        <ul key={i} className="list-disc pl-6 my-4 space-y-2 text-[18px] font-light leading-[30px]">
                          {block.items.map((item, idx) => (
                            <li key={idx} className="pl-1">
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.type === "image") {
                      return (
                        <figure key={i} className="my-8 w-full max-w-[600px] flex flex-col items-center mx-auto">
                          <Image
                            src={block.src}
                            alt={block.alt || post.title}
                            width={600}
                            height={600}
                            className="max-w-[600px] w-full h-auto object-contain border border-neutral-100 shadow-sm"
                          />
                          {block.caption && (
                            <figcaption className="text-center text-[13px] text-neutral-500 mt-2 font-sans italic">
                              {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    }
                    if (block.type === "quote") {
                      return (
                        <blockquote key={i} className="border-l-4 border-[#ff9000] pl-4 italic text-[18px] text-[#444444] my-5">
                          {block.text}
                        </blockquote>
                      );
                    }
                    if (block.html) {
                      return (
                        <p
                          key={i}
                          className="my-4 text-justify w769:text-left text-[18px] font-light leading-[30px]"
                          dangerouslySetInnerHTML={{ __html: block.html }}
                        />
                      );
                    }
                    return (
                      <p key={i} className="my-4 text-justify w769:text-left text-[18px] font-light leading-[30px]">
                        {block.text}
                      </p>
                    );
                  })
                ) : (
                  <p className="my-4 text-justify w769:text-left text-[18px] font-light leading-[30px]">{post.excerpt}</p>
                )}
              </div>

              {/* Interactive Comment Reply form */}
              <BlogCommentForm />
            </div>

            {/* Right Column - Sidebar (.blog-details-right) */}
            <div className="col-span-4 w1101:col-span-4 w769:col-span-12 bg-[#f8f8f8] border border-[#cccccc]">
              {/* Header (.other_blog_heading) */}
              <div className="border-b border-[#cccccc] px-6 py-4 bg-[#f8f8f8]">
                <h1 className="text-[22px] font-sans font-bold uppercase text-[#16110f] m-0 select-none">
                  Other <span className="font-light">Blogs</span>
                </h1>
              </div>

              {/* Sidebar Recent Posts list (.other_blog_content) */}
              <div className="p-6 space-y-6">
                {otherBlogs.map((otherPost) => (
                  <div key={otherPost.slug} className="flex gap-4 border-b border-[#e5e5e5] pb-5 last:border-0 last:pb-0 group">
                    <Link
                      href={`/digital-marketing-blog/${otherPost.slug}`}
                      className="w-[114px] h-[97px] shrink-0 overflow-hidden bg-white border border-[#e5e5e5] relative block"
                    >
                      <Image
                        src={otherPost.image}
                        alt={otherPost.title}
                        fill
                        sizes="114px"
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </Link>
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h2 className="text-[13px] leading-[18px] font-sans font-bold text-[#222222] hover:text-[#ff9000] transition duration-200 line-clamp-2">
                          <Link href={`/digital-marketing-blog/${otherPost.slug}`}>
                            {otherPost.title}
                          </Link>
                        </h2>
                        <h5 className="text-[12px] text-[#222222] my-1 font-normal">
                          {otherPost.date}
                        </h5>
                      </div>
                      <p className="text-[12px] text-[#222222] line-clamp-2 font-light leading-[18px]">
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
