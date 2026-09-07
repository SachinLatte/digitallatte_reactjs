import React from "react";
import { notFound } from "next/navigation";
import { blogPosts } from "../../../data/blog";
import BlogDetailTemplate from "../../components/ui/BlogDetailTemplate";
import { constructMetadata, SITE_URL } from "../../../utils/seo";
import JsonLd from "../../components/seo/JsonLd";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return constructMetadata({
      title: "Blog",
      description: "Read digital marketing insights on Digital Latte.",
      url: `/digital-marketing-blog/${slug}`,
    });
  }

  const title = `${post.title} – Best Digital Marketing Blog | Social Media Review| India`;
  const description =
    post.excerpt ||
    "Stay updated with the latest in social media, SEO, web design trends, and digital strategies.";
  const image = post.image || "/img/og-img.png";

  return constructMetadata({
    title,
    description,
    image,
    url: `/digital-marketing-blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    authors: [post.author || "Digital Latte"],
  });
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Get other recent blogs (exclude current slug, take first 5)
  const otherBlogs = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 5);

  const fullImageUrl = post.image?.startsWith("http")
    ? post.image
    : `${SITE_URL}${post.image?.startsWith("/") ? post.image : `/${post.image || "img/og-img.png"}`}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [fullImageUrl],
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author || "Digital Latte",
    },
    publisher: {
      "@type": "Organization",
      name: "Digital Latte",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/img/logo.png`,
      },
    },
    description: post.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/digital-marketing-blog/${slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Digital Marketing Blog",
        item: `${SITE_URL}/digital-marketing-blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/digital-marketing-blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <BlogDetailTemplate post={post} otherBlogs={otherBlogs} />
    </>
  );
}
