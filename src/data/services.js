import BrandIdentity from "../services/BrandIdentity";
import SeoServices from "../services/SeoServices";
import WebsiteMicrosite from "../services/WebsiteMicrosite";
import SocialMediaMarketing from "../services/SocialMediaMarketing";
import DigitalMediaPlanning from "../services/DigitalMediaPlanning";
import AmazonEnhancedBrandContent from "../services/AmazonEnhancedBrandContent";
import InfluencerMarketing from "../services/InfluencerMarketing";
import EcommerceSolutions from "../services/EcommerceSolutions";
import DigitalStrategyConsulting from "../services/DigitalStrategyConsulting";
import GoogleAnalytics from "../services/GoogleAnalytics";
import UserExperience from "../services/UserExperience";
import PrintDesigns from "../services/PrintDesigns";
import DigitalDesigns from "../services/DigitalDesigns";
import LogoDesigning from "../services/LogoDesigning";
import MobileApplications from "../services/MobileApplications";
import ContentManagementSystems from "../services/ContentManagementSystems";
import WebsiteMaintenance from "../services/WebsiteMaintenance";
import EcommerceSolutionsDev from "../services/EcommerceSolutionsDev";
import RentioTeaPortfolio from "../services/RentioTeaPortfolio";
import MmfGroupPortfolio from "../services/MmfGroupPortfolio";
import PatnaPiratesPortfolio from "../services/PatnaPiratesPortfolio";
import GoldieeMasalePortfolio from "../services/GoldieeMasalePortfolio";
import JHampsteadPortfolio from "../services/JHampsteadPortfolio";

const services = {
  "digital-services": [
    {
      slug: "social-media-marketing",
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
      slug: "digital-media-planning",
      title: "Digital Media Planning",
      component: DigitalMediaPlanning,
      metaTitle: "Digital Media Planning & Buying Agency | Mumbai | India",
      metaDescription: "Leading Digital Media Planning & Media Buying Agency based out of Mumbai, India. We offer media strategy for Display Banner Ads, PPC Campaigns, Social Media Ads",
    },
    {
      slug: "amazon-enhanced-brand-content",
      title: "Enhanced Brand Content (A+ Content)",
      component: AmazonEnhancedBrandContent,
      metaTitle: "Amazon A+ Enhanced Brand Content Design | Mumbai",
      metaDescription: "Increase conversion rates on Amazon with customized A+ Enhanced Brand Content. Creative Amazon product page designs.",
    },
    {
      slug: "influencer-marketing",
      title: "Influencer & Celebrity Campaigns",
      component: InfluencerMarketing,
      metaTitle: "Top Influencer Marketing Agency | Celebrity Promotion | India",
      metaDescription: "Leading influencer marketing agency in Mumbai, India helping brands launch campaigns with top social media influencers on Instagram, YouTube, Facebook.",
    },
    {
      slug: "ecommerce-solutions",
      title: "Ecommerce & Quick Commerce Solutions",
      component: EcommerceSolutions,
      metaTitle: "Ecommerce Design Development Solutions | Website Development",
      metaDescription: "We offer eCommerce design & development solutions to optimize user interface, sales & over all experience of your eCommerce website & Mobile Apps.",
    },
    {
      slug: "digital-strategy-consulting",
      title: "Digital Strategy Consulting",
      component: DigitalStrategyConsulting,
      metaTitle: "Strategic Digital, Branding, Marketing Consulting India",
      metaDescription: "Consulting firm specialized in Digital growth, Marketing & Brand strategy for large corporates and promising start ups to scale their business.",
    },
    {
      slug: "google-analytics",
      title: "Google Analytics & Reporting",
      component: GoogleAnalytics,
      metaTitle: "Google Analytics | Digital Marketing Services | India",
      metaDescription: "Harness the power of Google Analytics with the India's leading analytics & Creative Digital Agency. Google Analytics implementation, audits & optimization.",
    },
  ],

  "design-services": [
    {
      slug: "user-experience",
      title: "User Experience Design",
      component: UserExperience,
      metaTitle: "User Experience Design | Top UI/UX Design Agency | India",
      metaDescription: "User Experience Design & Creative Digital Agency based in Mumbai, India. We specialize in delivering best service design for apps, products & websites.",
    },
    {
      slug: "brand-identity",
      title: "Brand Identity",
      component: BrandIdentity,
      metaTitle: "Brand Identity, Strategy & Design | Creative Agency India",
      metaDescription: "We are Mumbai based Creative Digital Marketing Company focused on creating and launching brands, and rebranding with innovative Brand Strategy & Brand Design.",
    },
    {
      slug: "print-designs",
      title: "Print Design",
      component: PrintDesigns,
      metaTitle: "Print Design | Outdoor Branding | Creative Agency Mumbai",
      metaDescription: "Take your outdoor ad campaigns to next level with India’s top Print Design & Creative Digital Agency. We offer Billboards, Standees, Brochure & Packaging Design.",
    },
    {
      slug: "digital-designs",
      title: "Digital Design",
      component: DigitalDesigns,
      metaTitle: "Digital Design | Graphic Design | Creative Agency Mumbai",
      metaDescription: "We are a leading Creative Digital Agency specializing in Digital Design. We focus on Social Media, Emailers, Infographics, Web Banners & Newsletters Designs.",
    },
    {
      slug: "logo-designing",
      title: "Logo Designing",
      component: LogoDesigning,
      metaTitle: "Best Logo Design Company | Creative Digital Agency Mumbai",
      metaDescription: "Leading Logo Design Company & a Creative Digital Marketing Agency in Mumbai, we specialize in Custom Logo Design & Branding services for your business.",
    },
  ],

  "web-development-services": [
    {
      slug: "website-microsite",
      title: "Website & Microsite Development",
      component: WebsiteMicrosite,
      metaTitle: "Website Development Company | Web Design Agency | Mumbai",
      metaDescription: "A professional web design, website development and digital marketing agency in India. We develop responsive website, microsites, Corporate & Ecommerce websites.",
    },
    {
      slug: "mobile-applications",
      title: "Mobile Apps & Websites",
      component: MobileApplications,
      metaTitle: "Mobile App Development Agency Mumbai, India | iOS & Android",
      metaDescription: "Leading mobile app development & full service creative digital company in Mumbai, India, offering custom iOS, Android & hybrid applications development services",
    },
    {
      slug: "content-management-systems",
      title: "Content Management Systems (CMS)",
      component: ContentManagementSystems,
      metaTitle: "Content Management System (CMS) | Best Web Development Company",
      metaDescription: "Leading Content Management System (CMS) development & full service creative digital company in Mumbai, India, developing customized backend for your website.",
    },
    {
      slug: "website-maintenance",
      title: "Website Maintenance & Security",
      component: WebsiteMaintenance,
      metaTitle: "Best Website Maintenance Company | Web Development | India",
      metaDescription: "Get the best website maintenance, monitoring and support service in Mumbai, India. We are full service creative Digital Marketing Agency.",
    },
    {
      slug: "ecommerce-solutions-dev",
      title: "Ecommerce Solutions",
      component: EcommerceSolutionsDev,
      metaTitle: "Ecommerce Design Development Solutions | Website Development",
      metaDescription: "We offer eCommerce design & development solutions to optimize user interface, sales & over all experience of your eCommerce website & Mobile Apps.",
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

  "ai-excellence": [
    {
      slug: "ai-video-production",
      title: "AI Video Production",
      component: null,
      metaTitle: "AI Video Production Services | Digital Latte",
      metaDescription: "Produce high-impact AI-driven commercial videos, motion visuals, and hyper-realistic video content.",
    },
    {
      slug: "generative-ai",
      title: "Generative AI",
      component: null,
      metaTitle: "Generative AI Solutions | Digital Latte",
      metaDescription: "Harness generative AI creative engines for next-generation content, copy, and multimodal design generation.",
    },
    {
      slug: "character-development",
      title: "Character Development",
      component: null,
      metaTitle: "AI Character Development & Virtual Avatars | Digital Latte",
      metaDescription: "Create bespoke digital brand mascots, virtual influencers, and interactive AI character models.",
    },
    {
      slug: "product-visuals",
      title: "Product Visuals",
      component: null,
      metaTitle: "AI Product Visuals & Virtual Shoots | Digital Latte",
      metaDescription: "Generate photorealistic 3D/AI product photography, staging, and contextual visual assets instantly.",
    },
    {
      slug: "ai-voiceovers-audio-production",
      title: "AI Voiceovers & Audio Production",
      component: null,
      metaTitle: "AI Voiceovers & Synthetic Audio Production | Digital Latte",
      metaDescription: "Multi-lingual studio-quality synthetic voices, voice cloning, sound design, and custom sonic branding.",
    },
  ],
};

export default services;