import React, { Suspense } from "react";
import ContactSection from "../components/common/ContactSection";
import BlogGrid from "../components/blog/BlogGrid";
import { getBlogPosts } from "../../lib/blogs";
import { constructMetadata } from "../../utils/seo";

export const metadata = constructMetadata({
  title: "Best Digital Marketing Blog | Social Media Review | India",
  description:
    "Stay updated with the latest in social media, search engine optimization, web design trends, and digital strategies from Digital Latte.",
  url: "/digital-marketing-blog",
});

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPosts({ status: "published" });

  return (
    <main className="flex-grow flex flex-col w-full font-sans">
      <Suspense fallback={<div className="py-20 text-center font-sans text-neutral-500">Loading...</div>}>
        <BlogGrid initialPosts={posts} />
      </Suspense>

      {/* Let's Talk CTA */}
      <ContactSection 
        title="Share Your Story"
        subtitle="Want to discuss digital trends or collaborate on a guest insight? Get in touch."
        theme="dark"
      />
    </main>
  );
}
