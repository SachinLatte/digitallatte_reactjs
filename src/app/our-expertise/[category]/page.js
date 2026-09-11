import services from "../../../data/services";
import Link from "next/link";
import { notFound } from "next/navigation";
import DigitalServices from "./components/DigitalServices";
import DesignServices from "./components/DesignServices";
import WebDevelopmentServices from "./components/WebDevelopmentServices";
import ProductionServices from "./components/ProductionServices";
import { constructMetadata, SITE_URL } from "../../../utils/seo";
import JsonLd from "../../components/seo/JsonLd";
import { getServiceCategoryBySlug, getServiceCategories } from "@/lib/services";

export const dynamicParams = true;

export async function generateStaticParams() {
  const result = await getServiceCategories();
  if (result.success && Array.isArray(result.data) && result.data.length > 0) {
    return result.data.map((cat) => ({
      category: cat.slug,
    }));
  }
  return Object.keys(services).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const catData = await getServiceCategoryBySlug(category);
  const categoryData = services[category];

  if (!catData && !categoryData) return {};

  const title =
    catData?.metaTitle ||
    `${catData?.name || category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | Digital Latte`;
  const description =
    catData?.metaDescription ||
    catData?.description ||
    `Explore our professional services and capabilities in ${category.replace(/-/g, " ")}.`;

  return constructMetadata({
    title,
    description,
    url: `/our-expertise/${category}`,
  });
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const catData = await getServiceCategoryBySlug(category);
  const categoryData = services[category];

  if (!catData && !categoryData) {
    notFound();
  }

  const categoryName =
    catData?.name ||
    category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

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
        return <DigitalServices data={catData} categoryKey={category} />;
      case "design-services":
        return <DesignServices data={catData || categoryData} categoryKey={category} />;
      case "web-development-services":
        return <WebDevelopmentServices data={catData || categoryData} categoryKey={category} />;
      case "production-services":
        return <ProductionServices data={catData || categoryData} categoryKey={category} />;
      default:
        return <DigitalServices data={catData} categoryKey={category} />;
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {renderContent()}
    </>
  );
}
