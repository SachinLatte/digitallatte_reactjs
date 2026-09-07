import services from "../../../data/services";
import Link from "next/link";
import { notFound } from "next/navigation";
import DigitalServices from "./components/DigitalServices";
import DesignServices from "./components/DesignServices";
import WebDevelopmentServices from "./components/WebDevelopmentServices";
import ProductionServices from "./components/ProductionServices";
import { constructMetadata, SITE_URL } from "../../../utils/seo";
import JsonLd from "../../components/seo/JsonLd";

export async function generateStaticParams() {
  return Object.keys(services).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const categoryData = services[category];

  if (!categoryData) return {};

  const metadataMap = {
    "digital-services": {
      title: "Digital Services & Marketing",
      description:
        "We are a full service creative digital marketing agency offering social media marketing, online media planning, SEO, content creation, influencer marketing.",
    },
    "design-services": {
      title: "Creative Design Services & Branding",
      description:
        "We are a Creative Digital Agency in Mumbai, India dedicated to create amazing design experience through User Experience, Digital & Print Designs, Branding.",
    },
    "web-development-services": {
      title: "Best Web Development Company | Website Design Mumbai",
      description:
        "We are a creative digital agency in Mumbai, India coding best web & mobile products through website development, mobile application, Ecommerce solutions.",
    },
    "production-services": {
      title: "Photos and Video Production | Creative Agency Mumbai",
      description:
        "Full service creative photoshoot and video production agency in Mumbai, India. We offer Concept Shoots, Digital Films, Explainer Videos, 2D Animation & Ecommerce Photography.",
    },
  };

  const meta = metadataMap[category] || {
    title: category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: `Explore our professional services and capabilities in ${category.replace(/-/g, " ")}.`,
  };

  return constructMetadata({
    title: meta.title,
    description: meta.description,
    url: `/our-expertise/${category}`,
  });
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const categoryData = services[category];

  if (!categoryData) {
    notFound();
  }

  const categoryNameMap = {
    "digital-services": "Digital Services",
    "design-services": "Design Services",
    "web-development-services": "Web Development Services",
    "production-services": "Production Services",
  };

  const categoryName = categoryNameMap[category] || category;

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
        name: "Our Expertise",
        item: `${SITE_URL}/what-we-brew`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: `${SITE_URL}/our-expertise/${category}`,
      },
    ],
  };

  const renderContent = () => {
    switch (category) {
      case "digital-services":
        return <DigitalServices data={categoryData} categoryKey={category} />;
      case "design-services":
        return <DesignServices data={categoryData} categoryKey={category} />;
      case "web-development-services":
        return <WebDevelopmentServices data={categoryData} categoryKey={category} />;
      case "production-services":
        return <ProductionServices data={categoryData} categoryKey={category} />;
      default:
        return <div>Category not found</div>;
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {renderContent()}
    </>
  );
}
