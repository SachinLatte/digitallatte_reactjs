import { connectToDatabase } from "./mongodb";
import ServiceCategory from "../models/ServiceCategory";

let isSeeding = false;

// Accurate data for all 5 core service pillars
const INITIAL_SERVICE_CATEGORIES = [
  {
    slug: "digital-services",
    name: "Digital Services",
    icon: "bullhorn",
    description: "Explore our Digital Marketing Services & embrace the Digital First approach to transform your brand.",
    heroHeading: "<span class='font-bold'>WE BREW IDEAS</span> THAT CONNECT <br class='hidden md:block' /> BRANDS TO THE PEOPLE WHO <br class='hidden md:block' /> MATTER MOST TO THEM.",
    heroImage: "/img/services/brain-bg.webp",
    bioTitle: "We Craft Digital Experiences That's What We Do!",
    bioParagraphs: [
      "Many firms can build you a website, Mobile App, Digital and Social media presence. But what about crafting a great Digital Experience?",
      "With expertise across every platform, every device, and every manner to communicate and connect with audiences online, We'll help you understand the complexity of our ever-changing digital world and simplify it for optimal impact. We create engaging content, use consumer insights to connect with your customers, build your brand, drive commerce and craft digital first experiences to help you create sustainable influence for engaging your audience and energising your organisation to thrive and grow.",
      "Explore our Digital Marketing Services & embrace the Digital First approach to transform your brand.",
    ],
    subServices: [
      {
        slug: "social-media-marketing",
        title: "Social Media Marketing",
        description: "Customers are more engaged than ever before, thanks to Social Media that gives them direct access to businesses...",
        metaTitle: "Social Media Marketing Agency Mumbai | SMM Company India",
        metaDescription: "Boost your brand's presence on Facebook, Instagram, Twitter & LinkedIn with the best Social Media Marketing Agency in Mumbai.",
      },
      {
        slug: "seo",
        title: "Search Engine Optimization",
        description: "If you regularly use Google then you've probably realised that when you search for something you don't typically scroll...",
        metaTitle: "SEO Services in Mumbai | Search Engine Optimization Company",
        metaDescription: "Rank on the first page of Google with the best SEO Services in Mumbai. Drive organic traffic and boost sales with expert SEO solutions.",
      },
      {
        slug: "digital-media-planning",
        title: "Digital Media Planning",
        description: "Despite the advances in targeting and segmentation, there is a lot of 'noise' digitally, distracting the online users...",
        metaTitle: "Digital Media Planning & Buying Agency | Mumbai | India",
        metaDescription: "Leading Digital Media Planning & Media Buying Agency based out of Mumbai, India. We offer media strategy for Display Banner Ads, PPC Campaigns, Social Media Ads",
      },
      {
        slug: "video-content-creation",
        title: "Video Content Creation",
        description: "Faster data speed, upgraded smart phones and the rise of content distribution network (CDN) have changed the way...",
        metaTitle: "Video Content Creation | Social Media Video Agency Mumbai",
        metaDescription: "Create thumb-stopping vertical videos, reels, and video storytelling assets.",
      },
      {
        slug: "content-marketing",
        title: "Content Marketing",
        description: "In the age of Digital, there is so much content being created every minute that even great content can be lost in...",
        metaTitle: "Content Marketing Agency Mumbai | Brand Storytelling",
        metaDescription: "Drive organic loyalty and customer trust through compelling content marketing.",
      },
      {
        slug: "google-analytics",
        title: "Google Analytics & Reporting",
        description: "Whether it's to better understand the effect of a campaign, to deep-dive into the user journey on your website...",
        metaTitle: "Google Analytics | Digital Marketing Services | India",
        metaDescription: "Harness the power of Google Analytics with the India's leading analytics & Creative Digital Agency. Google Analytics implementation, audits & optimization.",
      },
      {
        slug: "digital-strategy-consulting",
        title: "Digital Strategy Consulting",
        description: "Transform your digital strategy with our expert consulting services. We analyze your market, understand your target audience...",
        metaTitle: "Strategic Digital, Branding, Marketing Consulting India",
        metaDescription: "Consulting firm specialized in Digital growth, Marketing & Brand strategy for large corporates and promising start ups to scale their business.",
      },
      {
        slug: "influencer-marketing",
        title: "Influencer & Celebrity Campaigns",
        description: "Amplify your brand's reach with powerful influencer and celebrity campaigns. We connect your brand with influencers who align...",
        metaTitle: "Top Influencer Marketing Agency | Celebrity Promotion | India",
        metaDescription: "Leading influencer marketing agency in Mumbai, India helping brands launch campaigns with top social media influencers on Instagram, YouTube, Facebook.",
      },
      {
        slug: "ecommerce-solutions",
        title: "Ecommerce & Quick Commerce Solutions",
        description: "Grow your online sales with our comprehensive eCommerce and Quick Commerce solutions. We optimize your store for maximum...",
        metaTitle: "Ecommerce Design Development Solutions | Website Development",
        metaDescription: "We offer eCommerce design & development solutions to optimize user interface, sales & over all experience of your eCommerce website & Mobile Apps.",
      },
      {
        slug: "amazon-enhanced-brand-content",
        title: "Enhanced Brand Content (A+ Content)",
        description: "Stand out on Amazon with our Enhanced Brand Content (A+ Content) services. We create compelling product descriptions...",
        metaTitle: "Amazon A+ Enhanced Brand Content Design | Mumbai",
        metaDescription: "Increase conversion rates on Amazon with customized A+ Enhanced Brand Content. Creative Amazon product page designs.",
      },
    ],
    beyondTitle: "BEYOND DIGITAL",
    beyondCards: [
      {
        category: "design-services",
        title: "Design",
        description: "Design, in every sense, has always been at the heart of what we do; Design that isn't just about what it looks like, but about how it works and the experience it creates...",
        image: "/img/services/design-service.webp",
        col1: [
          { title: "User Experience Design", slug: "user-experience" },
          { title: "Print Design", slug: "print-designs" },
          { title: "Logo Designing", slug: "logo-designing" },
        ],
        col2: [
          { title: "Brand Identity", slug: "brand-identity" },
          { title: "Digital Design", slug: "digital-designs" },
        ],
      },
      {
        category: "production-services",
        title: "Production",
        description: "Capture your brand essence & bring imagination to life through concept photo & video shoot. Every element is personalised to your...",
        image: "/img/services/production-services.webp",
        col1: [
          { title: "Concept Shoot", slug: "concept-shoot" },
          { title: "Logo Reveal Videos", slug: "logo-reveal-videos" },
          { title: "Digital Films", slug: "digital-films" },
        ],
        col2: [
          { title: "Product Explainer Videos", slug: "product-explainer-videos" },
          { title: "Ecommerce Photography", slug: "ecommerce-photography" },
          { title: "2D Animation Videos", slug: "two-d-animation-videos" },
        ],
      },
      {
        category: "web-development-services",
        title: "Development",
        description: "We're a curious bunch of problem solvers helping clients grow through new digital products, platforms, and experiences. With scrupulous attention to quality...",
        image: "/img/services/devlopment-service.webp",
        col1: [
          { title: "Website & Microsite Development", slug: "website-microsite" },
          { title: "Content Management Systems (CMS)", slug: "content-management-systems" },
          { title: "Website Maintenance & Security", slug: "website-maintenance" },
        ],
        col2: [
          { title: "Mobile Apps & Websites", slug: "mobile-applications" },
          { title: "Ecommerce Solutions", slug: "ecommerce-solutions" },
        ],
      },
    ],
    clientsTitle: "OUR CLIENTS",
    showClients: true,
    metaTitle: "Digital Services & Marketing | Digital Latte",
    metaDescription: "We are a full service creative digital marketing agency offering social media marketing, online media planning, SEO, content creation, influencer marketing.",
    order: 1,
    status: "published",
  },
  {
    slug: "design-services",
    name: "Design Services",
    icon: "palette",
    description: "Good design is the art of planning, constructing, and projecting ideas and experiences with visual and textual content.",
    heroHeading: "We're passionate about <br class='hidden md:block' /> <span class='font-bold'>building brands</span> through <br class='hidden md:block' /> <span class='font-bold'>meaningful design</span>",
    heroImage: "/img/services/design-bg.webp",
    bioTitle: "Design is the Silent Ambassador of Your Brand!",
    bioParagraphs: [
      "Design, in every sense, has always been at the heart of what we do. Design that isn't just about what it looks like, but about how it works and the experience it creates.",
      "Good design is the art of planning, constructing, and projecting ideas and experiences with visual and textual content. We create functional visual strategies that are driven by user-behaviour & help communicate your message effectively.",
      "With the passion to build brands through meaningful design & transform ideas into visual communications, we help businesses grow by creating experiences people love. Explore our design services below.",
    ],
    subServices: [
      {
        slug: "user-experience",
        title: "User Experience Design",
        description: "What's the point of a great product if people can't use it? As designers and strategists, we create seamless user journeys.",
        metaTitle: "User Experience Design | Top UI/UX Design Agency | India",
        metaDescription: "User Experience Design & Creative Digital Agency based in Mumbai, India. We specialize in delivering best service design for apps, products & websites.",
      },
      {
        slug: "brand-identity",
        title: "Brand Identity",
        description: "A good brand strategy connects your business to your market. It drives every aspect of your business and brand persona.",
        metaTitle: "Brand Identity, Strategy & Design | Creative Agency India",
        metaDescription: "We are Mumbai based Creative Digital Marketing Company focused on creating and launching brands, and rebranding with innovative Brand Strategy & Brand Design.",
      },
      {
        slug: "print-designs",
        title: "Print Design",
        description: "Print Designs are not just a piece of art that needs appreciation, but they are astutely crafted to evoke a strong response.",
        metaTitle: "Print Design | Outdoor Branding | Creative Agency Mumbai",
        metaDescription: "Take your outdoor ad campaigns to next level with India’s top Print Design & Creative Digital Agency. We offer Billboards, Standees, Brochure & Packaging Design.",
      },
      {
        slug: "digital-designs",
        title: "Digital Design",
        description: "We are adept in creating bespoke digital experiences that are centred around customer behaviour and aesthetic appeal.",
        metaTitle: "Digital Design | Graphic Design | Creative Agency Mumbai",
        metaDescription: "We are a leading Creative Digital Agency specializing in Digital Design. We focus on Social Media, Emailers, Infographics, Web Banners & Newsletters Designs.",
      },
      {
        slug: "logo-designing",
        title: "Logo Designing",
        description: "Your Logo is a representational symbol of who or what you are and is one of the essential branding elements.",
        metaTitle: "Best Logo Design Company | Creative Digital Agency Mumbai",
        metaDescription: "Leading Logo Design Company & a Creative Digital Marketing Agency in Mumbai, we specialize in Custom Logo Design & Branding services for your business.",
      },
    ],
    beyondTitle: "BEYOND DESIGN",
    beyondCards: [
      {
        category: "web-development-services",
        title: "Development",
        description: "We're a curious bunch of problem solvers helping clients grow through new digital products, platforms, and experiences...",
        image: "/img/services/devlopment-service.webp",
        col1: [
          { title: "Website & Microsite Development", slug: "website-microsite" },
          { title: "Mobile Apps & Websites", slug: "mobile-applications" },
          { title: "Content Management Systems (CMS)", slug: "content-management-systems" },
        ],
        col2: [
          { title: "Website Maintenance & Security", slug: "website-maintenance" },
          { title: "Ecommerce Solutions", slug: "ecommerce-solutions" },
        ],
      },
      {
        category: "production-services",
        title: "Production",
        description: "Capture your brand essence & bring imagination to life through concept photo & video shoot...",
        image: "/img/services/production-services.webp",
        col1: [
          { title: "Concept Shoot", slug: "concept-shoot" },
          { title: "Logo Reveal Videos", slug: "logo-reveal-videos" },
          { title: "Digital Films", slug: "digital-films" },
        ],
        col2: [
          { title: "Product Explainer Videos", slug: "product-explainer-videos" },
          { title: "Ecommerce Photography", slug: "ecommerce-photography" },
          { title: "2D Animation Videos", slug: "two-d-animation-videos" },
        ],
      },
      {
        category: "digital-services",
        title: "Digital",
        description: "Many firms can build you a website, Mobile App, Digital and Social media presence...",
        image: "/img/services/digital-services.webp",
        col1: [
          { title: "Social Media Marketing", slug: "social-media-marketing" },
          { title: "SEO", slug: "seo" },
          { title: "Digital Media Planning", slug: "digital-media-planning" },
        ],
        col2: [
          { title: "Influencer Campaigns", slug: "influencer-marketing" },
          { title: "Ecommerce Solutions", slug: "ecommerce-solutions" },
        ],
      },
    ],
    clientsTitle: "OUR CLIENTS",
    showClients: true,
    metaTitle: "Creative Design Services & Branding | Digital Latte",
    metaDescription: "We are a Creative Digital Agency in Mumbai, India dedicated to create amazing design experience through User Experience, Digital & Print Designs, Branding.",
    order: 2,
    status: "published",
  },
  {
    slug: "web-development-services",
    name: "Web Development Services",
    icon: "laptop-code",
    description: "Engineering scalable, responsive, and secure digital platforms and web applications.",
    heroHeading: "Making the <span class='font-bold'>technology bend</span> <br class='hidden md:block' /> to the will of the <span class='font-bold'>user.</span>",
    heroImage: "/img/services/website-development-bg.webp",
    bioTitle: "A Digital First Approach To Problem Solving",
    bioParagraphs: [
      "We're a curious bunch of problem solvers helping clients grow through new digital products, platforms, and experiences. With scrupulous attention to quality, responsiveness, and speed, we turn complex technical requirements into intuitive experiences.",
      "From responsive corporate websites and interactive microsites to scalable eCommerce platforms and customized content management systems, our developers craft robust solutions that perform under pressure.",
    ],
    subServices: [
      {
        slug: "website-microsite",
        title: "Website & Microsite Development",
        description: "A professional web design, website development and digital marketing agency in India. We develop responsive website, microsites, Corporate & Ecommerce websites.",
        metaTitle: "Website Development Company | Web Design Agency | Mumbai",
        metaDescription: "A professional web design, website development and digital marketing agency in India. We develop responsive website, microsites, Corporate & Ecommerce websites.",
      },
      {
        slug: "mobile-applications",
        title: "Mobile Apps & Websites",
        description: "Leading mobile app development & full service creative digital company in Mumbai, India, offering custom iOS, Android & hybrid applications development services.",
        metaTitle: "Mobile App Development Agency Mumbai, India | iOS & Android",
        metaDescription: "Leading mobile app development & full service creative digital company in Mumbai, India, offering custom iOS, Android & hybrid applications development services.",
      },
      {
        slug: "content-management-systems",
        title: "Content Management Systems (CMS)",
        description: "Leading Content Management System (CMS) development & full service creative digital company in Mumbai, India, developing customized backend for your website.",
        metaTitle: "Content Management System (CMS) | Best Web Development Company",
        metaDescription: "Leading Content Management System (CMS) development & full service creative digital company in Mumbai, India, developing customized backend for your website.",
      },
      {
        slug: "website-maintenance",
        title: "Website Maintenance & Security",
        description: "Get the best website maintenance, monitoring and support service in Mumbai, India. We are full service creative Digital Marketing Agency.",
        metaTitle: "Best Website Maintenance Company | Web Development | India",
        metaDescription: "Get the best website maintenance, monitoring and support service in Mumbai, India. We are full service creative Digital Marketing Agency.",
      },
      {
        slug: "ecommerce-solutions-dev",
        title: "Ecommerce Solutions",
        description: "We offer eCommerce design & development solutions to optimize user interface, sales & over all experience of your eCommerce website & Mobile Apps.",
        metaTitle: "Ecommerce Design Development Solutions | Website Development",
        metaDescription: "We offer eCommerce design & development solutions to optimize user interface, sales & over all experience of your eCommerce website & Mobile Apps.",
      },
    ],
    beyondTitle: "BEYOND DEVELOPMENT",
    beyondCards: [
      {
        category: "design-services",
        title: "Design",
        description: "Design, in every sense, has always been at the heart of what we do; Design that isn't just about what it looks like, but about how it works...",
        image: "/img/services/design-service.webp",
        col1: [
          { title: "User Experience Design", slug: "user-experience" },
          { title: "Print Design", slug: "print-designs" },
        ],
        col2: [
          { title: "Brand Identity", slug: "brand-identity" },
          { title: "Digital Design", slug: "digital-designs" },
        ],
      },
      {
        category: "production-services",
        title: "Production",
        description: "Capture your brand essence & bring imagination to life through concept photo & video shoot...",
        image: "/img/services/production-services.webp",
        col1: [
          { title: "Concept Shoot", slug: "concept-shoot" },
          { title: "Digital Films", slug: "digital-films" },
        ],
        col2: [
          { title: "Product Explainer Videos", slug: "product-explainer-videos" },
          { title: "Ecommerce Photography", slug: "ecommerce-photography" },
        ],
      },
      {
        category: "digital-services",
        title: "Digital",
        description: "Many firms can build you a website, Mobile App, Digital and Social media presence...",
        image: "/img/services/digital-services.webp",
        col1: [
          { title: "Social Media Marketing", slug: "social-media-marketing" },
          { title: "SEO", slug: "seo" },
        ],
        col2: [
          { title: "Digital Media Planning", slug: "digital-media-planning" },
          { title: "Influencer Campaigns", slug: "influencer-marketing" },
        ],
      },
    ],
    clientsTitle: "OUR CLIENTS",
    showClients: true,
    metaTitle: "Best Web Development Company | Website Design Mumbai | Digital Latte",
    metaDescription: "We are a creative digital agency in Mumbai, India coding best web & mobile products through website development, mobile application, Ecommerce solutions.",
    order: 3,
    status: "published",
  },
  {
    slug: "production-services",
    name: "Production Services",
    icon: "video",
    description: "Full service creative photoshoot and video production agency in Mumbai, India.",
    heroHeading: "<span class='font-bold'>CAPTURE BRAND ESSENCE</span> & BRING <br class='hidden md:block' /> IMAGINATION TO LIFE THROUGH PRODUCTION",
    heroImage: "/img/services/production-services.webp",
    bioTitle: "Visual Storytelling Through High-End Production",
    bioParagraphs: [
      "Capture your brand essence & bring imagination to life through concept photo & video shoot. Every element is personalised to your storytelling needs.",
      "We produce high-impact brand commercials, 2D animations, product explainer videos, and e-commerce catalog photography that captivates audiences and elevates perception.",
    ],
    subServices: [
      {
        slug: "concept-shoot",
        title: "Concept Shoot",
        description: "Tell stories through imagery. Creative concept shoots, high-fashion photography, and campaign visual assets.",
        metaTitle: "Concept Shoot & Creative Photography Mumbai",
        metaDescription: "Tell stories through imagery. Creative concept shoots, high-fashion photography, and campaign visual assets.",
      },
      {
        slug: "logo-reveal-videos",
        title: "Logo Reveal Videos",
        description: "Make an impactful first impression. 2D/3D logo reveal animations and video intro assets for brands.",
        metaTitle: "Animated Logo Reveals & Intro Outro Videos",
        metaDescription: "Make an impactful first impression. 2D/3D logo reveal animations and video intro assets for brands.",
      },
      {
        slug: "digital-films",
        title: "Digital Films",
        description: "Professional video production for social media campaigns, brand commercials, and documentary-style digital films.",
        metaTitle: "Digital Film Production & Brand Storytelling Mumbai",
        metaDescription: "Professional video production for social media campaigns, brand commercials, and documentary-style digital films.",
      },
      {
        slug: "product-explainer-videos",
        title: "Product Explainer Videos",
        description: "Simplify complex features. Engaging animated or live-action product explainer videos that drive conversions.",
        metaTitle: "Explainer Video Production | 2D/3D Animation",
        metaDescription: "Simplify complex features. Engaging animated or live-action product explainer videos that drive conversions.",
      },
      {
        slug: "ecommerce-photography",
        title: "Ecommerce Photography",
        description: "High-quality white background product shoots, lifestyle catalog photography, and marketplace compliance visual assets.",
        metaTitle: "Product Photography for Amazon, Flipkart & Shopify",
        metaDescription: "High-quality white background product shoots, lifestyle catalog photography, and marketplace compliance visual assets.",
      },
      {
        slug: "two-d-animation-videos",
        title: "2D Animation Videos",
        description: "Fun, storytelling-focused 2D animation clips, vector animations, and corporate motion graphic presentations.",
        metaTitle: "2D Animation Services | Motion Graphics Company",
        metaDescription: "Fun, storytelling-focused 2D animation clips, vector animations, and corporate motion graphic presentations.",
      },
    ],
    beyondTitle: "BEYOND PRODUCTION",
    beyondCards: [
      {
        category: "design-services",
        title: "Design",
        description: "Design, in every sense, has always been at the heart of what we do; Design that isn't just about what it looks like...",
        image: "/img/services/design-service.webp",
        col1: [
          { title: "User Experience Design", slug: "user-experience" },
          { title: "Print Design", slug: "print-designs" },
        ],
        col2: [
          { title: "Brand Identity", slug: "brand-identity" },
          { title: "Digital Design", slug: "digital-designs" },
        ],
      },
      {
        category: "digital-services",
        title: "Digital",
        description: "Many firms can build you a website, Mobile App, Digital and Social media presence...",
        image: "/img/services/digital-services.webp",
        col1: [
          { title: "Social Media Marketing", slug: "social-media-marketing" },
          { title: "SEO", slug: "seo" },
        ],
        col2: [
          { title: "Digital Media Planning", slug: "digital-media-planning" },
          { title: "Influencer Campaigns", slug: "influencer-marketing" },
        ],
      },
      {
        category: "web-development-services",
        title: "Development",
        description: "We're a curious bunch of problem solvers helping clients grow through new digital products...",
        image: "/img/services/devlopment-service.webp",
        col1: [
          { title: "Website & Microsite Development", slug: "website-microsite" },
          { title: "Mobile Apps & Websites", slug: "mobile-applications" },
        ],
        col2: [
          { title: "Website Maintenance & Security", slug: "website-maintenance" },
          { title: "Ecommerce Solutions", slug: "ecommerce-solutions" },
        ],
      },
    ],
    clientsTitle: "OUR CLIENTS",
    showClients: true,
    metaTitle: "Photos and Video Production | Creative Agency Mumbai | Digital Latte",
    metaDescription: "Full service creative photoshoot and video production agency in Mumbai, India. We offer Concept Shoots, Digital Films, Explainer Videos, 2D Animation & Ecommerce Photography.",
    order: 4,
    status: "published",
  },
  {
    slug: "ai-excellence",
    name: "AI Excellence",
    icon: "robot",
    description: "Scale your brand with AI video production, generative design, character avatars, and synthetic voiceovers.",
    heroHeading: "<span class='font-bold'>NEXT-GEN AI</span> CREATIVE ENGINEERING <br class='hidden md:block' /> & SYNTHETIC MEDIA PRODUCTION",
    heroImage: "/img/services/brain-bg.webp",
    bioTitle: "Empowering Brands With Next-Generation AI Workflows",
    bioParagraphs: [
      "Harness the forefront of generative AI, synthetic video production, photorealistic 3D product staging, character avatars, and AI voiceovers to revolutionize your brand's digital presence.",
      "Accelerate creative ideation, scale commercial production, and deploy hyper-personalized visual assets with unprecedented speed and precision.",
    ],
    subServices: [
      {
        slug: "ai-video-production",
        title: "AI Video Production",
        description: "Produce high-impact AI-driven commercial videos, motion visuals, and hyper-realistic video content.",
        metaTitle: "AI Video Production Services | Digital Latte",
        metaDescription: "Produce high-impact AI-driven commercial videos, motion visuals, and hyper-realistic video content.",
      },
      {
        slug: "generative-ai",
        title: "Generative AI",
        description: "Harness generative AI creative engines for next-generation content, copy, and multimodal design generation.",
        metaTitle: "Generative AI Solutions | Digital Latte",
        metaDescription: "Harness generative AI creative engines for next-generation content, copy, and multimodal design generation.",
      },
      {
        slug: "character-development",
        title: "Character Development",
        description: "Create bespoke digital brand mascots, virtual influencers, and interactive AI character models.",
        metaTitle: "AI Character Development & Virtual Avatars | Digital Latte",
        metaDescription: "Create bespoke digital brand mascots, virtual influencers, and interactive AI character models.",
      },
      {
        slug: "product-visuals",
        title: "Product Visuals",
        description: "Generate photorealistic 3D/AI product photography, staging, and contextual visual assets instantly.",
        metaTitle: "AI Product Visuals & Virtual Shoots | Digital Latte",
        metaDescription: "Generate photorealistic 3D/AI product photography, staging, and contextual visual assets instantly.",
      },
      {
        slug: "ai-voiceovers-audio-production",
        title: "AI Voiceovers & Audio Production",
        description: "Multi-lingual studio-quality synthetic voices, voice cloning, sound design, and custom sonic branding.",
        metaTitle: "AI Voiceovers & Synthetic Audio Production | Digital Latte",
        metaDescription: "Multi-lingual studio-quality synthetic voices, voice cloning, sound design, and custom sonic branding.",
      },
    ],
    beyondTitle: "BEYOND AI",
    beyondCards: [
      {
        category: "design-services",
        title: "Design",
        description: "Design, in every sense, has always been at the heart of what we do...",
        image: "/img/services/design-service.webp",
        col1: [
          { title: "User Experience Design", slug: "user-experience" },
          { title: "Brand Identity", slug: "brand-identity" },
        ],
        col2: [
          { title: "Print Design", slug: "print-designs" },
          { title: "Digital Design", slug: "digital-designs" },
        ],
      },
      {
        category: "production-services",
        title: "Production",
        description: "Capture your brand essence & bring imagination to life through concept photo & video shoot...",
        image: "/img/services/production-services.webp",
        col1: [
          { title: "Concept Shoot", slug: "concept-shoot" },
          { title: "Digital Films", slug: "digital-films" },
        ],
        col2: [
          { title: "Product Explainer Videos", slug: "product-explainer-videos" },
          { title: "Ecommerce Photography", slug: "ecommerce-photography" },
        ],
      },
      {
        category: "digital-services",
        title: "Digital",
        description: "Many firms can build you a website, Mobile App, Digital and Social media presence...",
        image: "/img/services/digital-services.webp",
        col1: [
          { title: "Social Media Marketing", slug: "social-media-marketing" },
          { title: "SEO", slug: "seo" },
        ],
        col2: [
          { title: "Digital Media Planning", slug: "digital-media-planning" },
          { title: "Influencer Campaigns", slug: "influencer-marketing" },
        ],
      },
    ],
    clientsTitle: "OUR CLIENTS",
    showClients: true,
    metaTitle: "AI Excellence & Generative AI Production | Digital Latte",
    metaDescription: "Scale your brand with AI video production, generative design, character avatars, and synthetic voiceovers.",
    order: 5,
    status: "published",
  },
];

// Initialize in-memory fallback store
if (!global._fallbackServiceCategories) {
  global._fallbackServiceCategories = INITIAL_SERVICE_CATEGORIES.map((cat, idx) => ({
    _id: "cat_" + cat.slug,
    ...cat,
    order: idx + 1,
    subServices: cat.subServices.map((sub, sIdx) => ({
      _id: "sub_" + sub.slug,
      ...sub,
      status: "published",
      order: sIdx + 1,
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function getFallbackServiceCategories() {
  return global._fallbackServiceCategories;
}

export async function ensureServiceCategoriesSeeded() {
  if (isSeeding) return;
  try {
    await connectToDatabase();
    const count = await ServiceCategory.countDocuments();
    if (count === 0) {
      isSeeding = true;
      await ServiceCategory.insertMany(global._fallbackServiceCategories, { ordered: false });
    }
  } catch (err) {
    console.warn("[ensureServiceCategoriesSeeded] Seeding warning:", err.message);
  } finally {
    isSeeding = false;
  }
}

export async function getServiceCategories({ search = "" } = {}) {
  try {
    await connectToDatabase();
    await ensureServiceCategoriesSeeded();

    const query = {};
    if (search && search.trim()) {
      const q = search.trim();
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { slug: { $regex: q, $options: "i" } },
        { "subServices.title": { $regex: q, $options: "i" } },
      ];
    }

    const categories = await ServiceCategory.find(query)
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return {
      success: true,
      data: categories.map((c) => ({
        ...c,
        _id: c._id.toString(),
        subServices: (c.subServices || []).map((s) => ({
          ...s,
          _id: s._id ? s._id.toString() : s.slug,
        })),
      })),
    };
  } catch (err) {
    console.warn("[getServiceCategories] MongoDB fallback:", err.message);

    let list = [...global._fallbackServiceCategories];
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q) ||
          c.subServices.some((s) => s.title.toLowerCase().includes(q))
      );
    }

    return {
      success: true,
      data: list,
    };
  }
}

export async function getServiceCategoryBySlug(slug) {
  if (!slug) return null;
  try {
    await connectToDatabase();
    await ensureServiceCategoriesSeeded();

    const cat = await ServiceCategory.findOne({
      $or: [{ slug }, { _id: slug.length === 24 ? slug : null }],
    }).lean();

    if (cat) {
      return {
        ...cat,
        _id: cat._id.toString(),
        subServices: (cat.subServices || []).map((s) => ({
          ...s,
          _id: s._id ? s._id.toString() : s.slug,
        })),
      };
    }
  } catch (err) {
    console.warn("[getServiceCategoryBySlug] MongoDB fallback:", err.message);
  }

  return (
    global._fallbackServiceCategories.find(
      (c) => c.slug === slug || c._id === slug
    ) || null
  );
}

export async function createServiceCategory(data) {
  const slug = (data.slug || data.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const newCategoryData = {
    name: data.name.trim(),
    slug,
    description: data.description?.trim() || "",
    heroHeading: data.heroHeading?.trim() || "",
    heroImage: data.heroImage?.trim() || "/img/services/brain-bg.webp",
    bioTitle: data.bioTitle?.trim() || "",
    bioParagraphs: Array.isArray(data.bioParagraphs) ? data.bioParagraphs.filter(Boolean) : [],
    subServices: Array.isArray(data.subServices) ? data.subServices : [],
    beyondTitle: data.beyondTitle?.trim() || `BEYOND ${data.name.toUpperCase()}`,
    beyondCards: Array.isArray(data.beyondCards) ? data.beyondCards : [],
    clientsTitle: data.clientsTitle?.trim() || "OUR CLIENTS",
    showClients: data.showClients !== undefined ? data.showClients : true,
    metaTitle: data.metaTitle?.trim() || `${data.name} | Digital Latte`,
    metaDescription: data.metaDescription?.trim() || data.description || "",
    icon: data.icon || "wrench",
    order: data.order || global._fallbackServiceCategories.length + 1,
    status: data.status || "published",
  };

  try {
    await connectToDatabase();
    await ensureServiceCategoriesSeeded();

    const created = await ServiceCategory.create(newCategoryData);
    const obj = created.toObject();

    global._fallbackServiceCategories.push({
      ...obj,
      _id: obj._id.toString(),
    });

    return { success: true, data: { ...obj, _id: obj._id.toString() } };
  } catch (err) {
    console.warn("[createServiceCategory] MongoDB fallback creation:", err.message);

    const fallbackCat = {
      _id: "cat_" + Date.now(),
      ...newCategoryData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    global._fallbackServiceCategories.push(fallbackCat);

    return { success: true, data: fallbackCat };
  }
}

export async function updateServiceCategory(idOrSlug, data) {
  try {
    await connectToDatabase();
    await ensureServiceCategoriesSeeded();

    const query =
      idOrSlug.length === 24
        ? { _id: idOrSlug }
        : { $or: [{ slug: idOrSlug }, { _id: idOrSlug }] };

    const updated = await ServiceCategory.findOneAndUpdate(
      query,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();

    if (updated) {
      const idx = global._fallbackServiceCategories.findIndex(
        (c) => c.slug === idOrSlug || c._id === idOrSlug || c._id === updated._id.toString()
      );
      if (idx !== -1) {
        global._fallbackServiceCategories[idx] = {
          ...global._fallbackServiceCategories[idx],
          ...updated,
          _id: updated._id.toString(),
        };
      }
      return { success: true, data: { ...updated, _id: updated._id.toString() } };
    }
  } catch (err) {
    console.warn("[updateServiceCategory] MongoDB fallback:", err.message);
  }

  const idx = global._fallbackServiceCategories.findIndex(
    (c) => c.slug === idOrSlug || c._id === idOrSlug
  );
  if (idx !== -1) {
    global._fallbackServiceCategories[idx] = {
      ...global._fallbackServiceCategories[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return { success: true, data: global._fallbackServiceCategories[idx] };
  }

  return { success: false, message: "Service category not found" };
}

export async function deleteServiceCategory(idOrSlug) {
  try {
    await connectToDatabase();
    const query =
      idOrSlug.length === 24
        ? { _id: idOrSlug }
        : { $or: [{ slug: idOrSlug }, { _id: idOrSlug }] };

    await ServiceCategory.deleteOne(query);

    global._fallbackServiceCategories = global._fallbackServiceCategories.filter(
      (c) => c.slug !== idOrSlug && c._id !== idOrSlug
    );

    return { success: true, message: "Category deleted successfully" };
  } catch (err) {
    console.warn("[deleteServiceCategory] MongoDB fallback:", err.message);
    global._fallbackServiceCategories = global._fallbackServiceCategories.filter(
      (c) => c.slug !== idOrSlug && c._id !== idOrSlug
    );
    return { success: true, message: "Category deleted from memory" };
  }
}

// Sub-Service Operations
export async function addSubService(categorySlug, subData) {
  const subSlug = (subData.slug || subData.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const newSub = {
    title: subData.title.trim(),
    slug: subSlug,
    description: subData.description?.trim() || "",
    metaTitle: subData.metaTitle?.trim() || `${subData.title} | Digital Latte`,
    metaDescription: subData.metaDescription?.trim() || subData.description || "",
    status: subData.status || "published",
    order: subData.order || 0,
  };

  try {
    await connectToDatabase();
    await ensureServiceCategoriesSeeded();

    const category = await ServiceCategory.findOne({
      $or: [{ slug: categorySlug }, { _id: categorySlug.length === 24 ? categorySlug : null }],
    });

    if (category) {
      category.subServices.push(newSub);
      await category.save();
      const updatedObj = category.toObject();

      const idx = global._fallbackServiceCategories.findIndex(
        (c) => c.slug === categorySlug || c._id === categorySlug
      );
      if (idx !== -1) {
        global._fallbackServiceCategories[idx] = {
          ...global._fallbackServiceCategories[idx],
          subServices: updatedObj.subServices,
        };
      }

      return { success: true, data: updatedObj };
    }
  } catch (err) {
    console.warn("[addSubService] MongoDB fallback:", err.message);
  }

  const idx = global._fallbackServiceCategories.findIndex(
    (c) => c.slug === categorySlug || c._id === categorySlug
  );
  if (idx !== -1) {
    const memorySub = {
      _id: "sub_" + Date.now(),
      ...newSub,
    };
    global._fallbackServiceCategories[idx].subServices.push(memorySub);
    return { success: true, data: global._fallbackServiceCategories[idx] };
  }

  return { success: false, message: "Category not found" };
}

export async function deleteSubService(categorySlug, subSlugOrId) {
  try {
    await connectToDatabase();
    await ensureServiceCategoriesSeeded();

    const category = await ServiceCategory.findOne({
      $or: [{ slug: categorySlug }, { _id: categorySlug.length === 24 ? categorySlug : null }],
    });

    if (category) {
      category.subServices = category.subServices.filter(
        (s) => s.slug !== subSlugOrId && s._id.toString() !== subSlugOrId
      );
      await category.save();
      const updatedObj = category.toObject();

      const idx = global._fallbackServiceCategories.findIndex(
        (c) => c.slug === categorySlug || c._id === categorySlug
      );
      if (idx !== -1) {
        global._fallbackServiceCategories[idx] = {
          ...global._fallbackServiceCategories[idx],
          subServices: updatedObj.subServices,
        };
      }

      return { success: true, message: "Sub-service deleted successfully", data: updatedObj };
    }
  } catch (err) {
    console.warn("[deleteSubService] MongoDB fallback:", err.message);
  }

  const idx = global._fallbackServiceCategories.findIndex(
    (c) => c.slug === categorySlug || c._id === categorySlug
  );
  if (idx !== -1) {
    global._fallbackServiceCategories[idx].subServices = global._fallbackServiceCategories[
      idx
    ].subServices.filter((s) => s.slug !== subSlugOrId && s._id !== subSlugOrId);
    return { success: true, message: "Sub-service deleted from memory", data: global._fallbackServiceCategories[idx] };
  }

  return { success: false, message: "Category not found" };
}
