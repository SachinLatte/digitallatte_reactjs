import { blogPosts } from "@/data/blog";
import { caseStudiesBrandingData } from "@/data/caseStudiesBrandingData";
import { openings } from "@/data/careers";
import services from "@/data/services";
import { SITE_URL } from "@/utils/seo";

export default function sitemap() {
  const now = new Date();

  // 1. Static Core Pages
  const staticRoutes = [
    {
      url: `${SITE_URL}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/who-we-are`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/our-motto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/what-we-brew`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/clientele`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/digital-marketing-blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/submit-resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 2. Category routes
  const categoryRoutes = Object.keys(services).map((category) => ({
    url: `${SITE_URL}/our-expertise/${category}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Service routes
  const serviceRoutes = [];
  Object.entries(services).forEach(([category, items]) => {
    items.forEach((item) => {
      serviceRoutes.push({
        url: `${SITE_URL}/our-expertise/${category}/${item.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  });

  // 4. Case Study routes
  const caseStudyRoutes = Object.keys(caseStudiesBrandingData).map((slug) => ({
    url: `${SITE_URL}/case-studies/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // 5. Blog routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${SITE_URL}/digital-marketing-blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 6. Career opening routes
  const careerRoutes = openings.map((job) => ({
    url: `${SITE_URL}/careers/${job.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...serviceRoutes,
    ...caseStudyRoutes,
    ...blogRoutes,
    ...careerRoutes,
  ];
}
