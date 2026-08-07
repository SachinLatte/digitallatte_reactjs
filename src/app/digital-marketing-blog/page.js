import React, { Suspense } from "react";
import ContactSection from "../components/common/ContactSection";
import BlogGrid from "../components/blog/BlogGrid";
import { blogPosts } from "../../data/blog";

export const metadata = {
  title: "Best Digital Marketing Blog | Social Media Review | India",
  description: "Stay updated with the latest in social media, search engine optimization, web design trends, and digital strategies from Digital Latte.",
};

export default function BlogPage() {
  return (
    <main className="flex-grow flex flex-col w-full font-sans">
      <Suspense fallback={<div className="py-20 text-center font-sans text-neutral-500">Loading...</div>}>
        <BlogGrid initialPosts={blogPosts} />
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
