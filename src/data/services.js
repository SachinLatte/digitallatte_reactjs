import BrandIdentity from "../services/BrandIdentity";
import SeoServices from "../services/SeoServices";
import WebsiteMicrosite from "../services/WebsiteMicrosite";
import SocialMediaMarketing from "../services/SocialMediaMarketing";

const digitalServicesList = [
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    component: SocialMediaMarketing,
    metaTitle: "Social Media Marketing Agency Mumbai | SMM Company India",
    metaDescription: "Boost your brand's presence on Facebook, Instagram, Twitter & LinkedIn with the best Social Media Marketing Agency in Mumbai.",
  },
  {
    slug: "Social-Media-Marketing",
    title: "Social Media Marketing",
    component: SocialMediaMarketing,
    metaTitle: "Social Media Marketing Agency Mumbai | SMM Company India",
    metaDescription: "Boost your brand's presence on Facebook, Instagram, Twitter & LinkedIn with the best Social Media Marketing Agency in Mumbai.",
  },
  {
    slug: "seo",
    title: "Search Engine Optimization(SEO)",
    component: SeoServices,
    metaTitle: "SEO Services in Mumbai | Search Engine Optimization Company",
    metaDescription: "Rank on the first page of Google with the best SEO Services in Mumbai. Drive organic traffic and boost sales with expert SEO solutions.",
  },
  {
    slug: "Search-Engine-Optimization-SEO",
    title: "Search Engine Optimization(SEO)",
    component: SeoServices,
    metaTitle: "SEO Services in Mumbai | Search Engine Optimization Company",
    metaDescription: "Rank on the first page of Google with the best SEO Services in Mumbai. Drive organic traffic and boost sales with expert SEO solutions.",
  },
  {
    slug: "digital-media-planning",
    title: "Digital Media Planning & Buying",
    component: null,
    metaTitle: "Digital Media Planning and Buying Services | Ad Agency Mumbai",
    metaDescription: "Get the highest ROI on your paid marketing. Expert digital media planning and buying services in Mumbai for Google Ads, Facebook Ads, and programmatic.",
  },
  {
    slug: "Digital-Media-Planning",
    title: "Digital Media Planning & Buying",
    component: null,
    metaTitle: "Digital Media Planning and Buying Services | Ad Agency Mumbai",
    metaDescription: "Get the highest ROI on your paid marketing. Expert digital media planning and buying services in Mumbai for Google Ads, Facebook Ads, and programmatic.",
  },
  {
    slug: "amazon-enhanced-brand-content",
    title: "Enhanced Brand Content (A+ Content)",
    component: null,
    metaTitle: "Amazon A+ Enhanced Brand Content Design | Mumbai",
    metaDescription: "Increase conversion rates on Amazon with customized A+ Enhanced Brand Content. Creative Amazon product page designs.",
  },
  {
    slug: "Amazon-Enhanced-Brand-Content",
    title: "Enhanced Brand Content (A+ Content)",
    component: null,
    metaTitle: "Amazon A+ Enhanced Brand Content Design | Mumbai",
    metaDescription: "Increase conversion rates on Amazon with customized A+ Enhanced Brand Content. Creative Amazon product page designs.",
  },
  {
    slug: "influencer-marketing",
    title: "Influencer & Celebrity Campaigns",
    component: null,
    metaTitle: "Influencer Marketing Agency Mumbai | Creator Campaigns",
    metaDescription: "Partner with top creators and micro-influencers. Creative influencer marketing campaigns that build trust and drive results.",
  },
  {
    slug: "Influencer-Marketing",
    title: "Influencer & Celebrity Campaigns",
    component: null,
    metaTitle: "Influencer Marketing Agency Mumbai | Creator Campaigns",
    metaDescription: "Partner with top creators and micro-influencers. Creative influencer marketing campaigns that build trust and drive results.",
  },
  {
    slug: "ecommerce-solutions",
    title: "Ecommerce & Quick Commerce Solutions",
    component: null,
    metaTitle: "Ecommerce & Quick Commerce Marketing | Mumbai",
    metaDescription: "Scale your D2C or Q-commerce brand. Comprehensive performance marketing and online store management solutions.",
  },
  {
    slug: "digital-strategy-consulting",
    title: "Digital Strategy Consulting",
    component: null,
    metaTitle: "Digital Strategy & Consultation | Creative Agency",
    metaDescription: "Grow your business online with custom digital roadmaps, competitor analysis, and complete brand transformation strategies.",
  },
  {
    slug: "Digital-Strategy-Consulting",
    title: "Digital Strategy Consulting",
    component: null,
    metaTitle: "Digital Strategy & Consultation | Creative Agency",
    metaDescription: "Grow your business online with custom digital roadmaps, competitor analysis, and complete brand transformation strategies.",
  },
  {
    slug: "google-analytics",
    title: "Google Analytics & Reporting",
    component: null,
    metaTitle: "Google Analytics Integration & Custom Dashboards",
    metaDescription: "Make data-driven decisions. Professional Google Analytics setup, GA4 migration, and custom business intelligence reports.",
  },
  {
    slug: "Google-Analytics",
    title: "Google Analytics & Reporting",
    component: null,
    metaTitle: "Google Analytics Integration & Custom Dashboards",
    metaDescription: "Make data-driven decisions. Professional Google Analytics setup, GA4 migration, and custom business intelligence reports.",
  },
];

const services = {
  "digital-services": digitalServicesList,
  "digital-marketing-services": digitalServicesList,
  "design-services": [
    {
      slug: "user-experience",
      title: "User Experience Design",
      component: null,
      metaTitle: "UI/UX Design Services Mumbai | Website & App Design",
      metaDescription: "Design intuitive interfaces. Expert user experience (UX) and user interface (UI) design solutions for web and mobile apps.",
    },
    {
      slug: "brand-identity",
      title: "Brand Identity",
      component: BrandIdentity,
      metaTitle: "Brand Identity Design Agency Mumbai | Logo Design",
      metaDescription: "Craft a unique voice. Professional logo design, corporate color palettes, typography, and comprehensive brand guideline documentation.",
    },
    {
      slug: "print-designs",
      title: "Print Design",
      component: null,
      metaTitle: "Print Media & Brochure Design | Creative Agency",
      metaDescription: "Premium print design services including brochures, packaging, flyers, print advertisements, and event banners.",
    },
    {
      slug: "digital-designs",
      title: "Digital Design",
      component: null,
      metaTitle: "Creative Digital Design Services | Social Media Creatives",
      metaDescription: "High-impact digital designs, email newsletters, website banners, and display ads to engage your digital audience.",
    },
    {
      slug: "logo-designing",
      title: "Logo Designing",
      component: null,
      metaTitle: "Logo Design Company Mumbai | Custom Logo Maker",
      metaDescription: "Stand out with a modern, memorable corporate logo. Professional logo designing services for startups and established brands.",
    },
  ],

  "web-development-services": [
    {
      slug: "website-microsite",
      title: "Website & Microsite Development",
      component: WebsiteMicrosite,
      metaTitle: "Website & Microsite Development Company Mumbai",
      metaDescription: "Build lightning-fast, responsive web experiences. Top-tier front-end and back-end web development services.",
    },
    {
      slug: "mobile-applications",
      title: "Mobile Apps & Websites",
      component: null,
      metaTitle: "Mobile App Development Mumbai | iOS & Android Apps",
      metaDescription: "Native and cross-platform mobile application development. Create high-performing apps for iOS and Android.",
    },
    {
      slug: "content-management-systems",
      title: "Content Management Systems (CMS)",
      component: null,
      metaTitle: "Custom CMS Development | WordPress & Webflow Services",
      metaDescription: "Manage your content easily. Custom WordPress, Webflow, and headless CMS development tailored to your workflows.",
    },
    {
      slug: "website-maintenance",
      title: "Website Maintenance & Security",
      component: null,
      metaTitle: "Website Support & Maintenance Services | Mumbai",
      metaDescription: "Keep your site secure, updated, and fast. Monthly support packages, server management, and security audits.",
    },
    {
      slug: "ecommerce-solutions-dev",
      title: "Ecommerce Solutions",
      component: null,
      metaTitle: "Shopify & WooCommerce Development Company Mumbai",
      metaDescription: "Launch your online store. Customized Shopify, WooCommerce, and custom checkout integrations to boost sales.",
    },
  ],

  "production-services": [
    {
      slug: "concept-shoot",
      title: "Concept Shoot",
      component: null,
      metaTitle: "Concept Shoot & Creative Photography Mumbai",
      metaDescription: "Tell stories through imagery. Creative concept shoots, high-fashion photography, and campaign visual assets.",
    },
    {
      slug: "logo-reveal-videos",
      title: "Logo Reveal Videos",
      component: null,
      metaTitle: "Animated Logo Reveals & Intro Outro Videos",
      metaDescription: "Make an impactful first impression. 2D/3D logo reveal animations and video intro assets for brands.",
    },
    {
      slug: "digital-films",
      title: "Digital Films",
      component: null,
      metaTitle: "Digital Film Production & Brand Storytelling Mumbai",
      metaDescription: "Professional video production for social media campaigns, brand commercials, and documentary-style digital films.",
    },
    {
      slug: "product-explainer-videos",
      title: "Product Explainer Videos",
      component: null,
      metaTitle: "Explainer Video Production | 2D/3D Animation",
      metaDescription: "Simplify complex features. Engaging animated or live-action product explainer videos that drive conversions.",
    },
    {
      slug: "ecommerce-photography",
      title: "Ecommerce Photography",
      component: null,
      metaTitle: "Product Photography for Amazon, Flipkart & Shopify",
      metaDescription: "High-quality white background product shoots, lifestyle catalog photography, and marketplace compliance visual assets.",
    },
    {
      slug: "two-d-animation-videos",
      title: "2D Animation Videos",
      component: null,
      metaTitle: "2D Animation Services | Motion Graphics Company",
      metaDescription: "Fun, storytelling-focused 2D animation clips, vector animations, and corporate motion graphic presentations.",
    },
  ],
};

export default services;