import React from "react";
import { notFound } from "next/navigation";
import { blogPosts } from "../../../data/blog";
import BlogDetailTemplate from "../../components/ui/BlogDetailTemplate";

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

  // Get other recent blogs (exclude current slug, take first 5)
  const otherBlogs = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 5);

  return <BlogDetailTemplate post={post} otherBlogs={otherBlogs} />;
}
