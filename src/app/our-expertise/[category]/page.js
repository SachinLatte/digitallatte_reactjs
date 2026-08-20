import services from "../../../data/services";
import Link from "next/link";
import { notFound } from "next/navigation";
import DigitalServices from "./components/DigitalServices";
import DesignServices from "./components/DesignServices";
import WebDevelopmentServices from "./components/WebDevelopmentServices";

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
      title: "Digital Services & Marketing | Digital Latte",
      description: "We are a full service creative digital marketing agency offering social media marketing, online media planning, SEO, content creation, influencer marketing."
    },
    "design-services": {
      title: "Creative Design Services & Branding | Digital Latte",
      description: "We are a Creative Digital Agency in Mumbai, India dedicated to create amazing design experience through User Experience, Digital & Print Designs, Branding."
    },
    "web-development-services": {
      title: "Best Web Development Company | Website Design Mumbai | India",
      description: "We are a creative digital agency in Mumbai, India coding best web & mobile products through website development, mobile application, Ecommerce solutions."
    }
  };

  if (metadataMap[category]) {
    return metadataMap[category];
  }

  const titleMap = {
    "production-services": "Photos and Video Production"
  };
  
  return {
    title: `${titleMap[category] || category.toUpperCase()} | Digital Latte`,
    description: `Explore our professional services and capabilities in ${category.replace("-", " ")}.`
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const categoryData = services[category];
  
  if (!categoryData) {
    notFound();
  }
  
  if (category === "digital-services") {
    return <DigitalServices />;
  }
  if (category === "design-services") {
    return <DesignServices />;
  }
  if (category === "web-development-services") {
    return <WebDevelopmentServices />;
  }

  const displayTitle = category.replace(/-/g, " ").toUpperCase();
  
  return (
    <div className="flex-1 bg-[#16110f] text-white pt-24 pb-16 px-6 sm:px-12 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold uppercase tracking-wider text-[#e07f2a] mb-4">
          {displayTitle}
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Discover how we brew fresh ideas and bring results to your brand.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {categoryData.map((service) => (
            <Link 
              key={service.slug} 
              href={`/our-expertise/${category}/${service.slug}`}
              className="block p-6 rounded-lg border border-neutral-800 bg-neutral-900/50 hover:border-[#e07f2a] transition duration-300 group"
            >
              <h3 className="text-xl font-semibold uppercase tracking-wide group-hover:text-[#e07f2a] transition duration-300 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2">
                {service.metaDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
