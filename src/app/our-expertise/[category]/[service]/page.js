import services from "@/data/services";
import { notFound, redirect } from "next/navigation";
import { constructMetadata, SITE_URL } from "@/utils/seo";
import JsonLd from "@/app/components/seo/JsonLd";

export async function generateStaticParams() {
  const params = [];
  Object.entries(services).forEach(([category, items]) => {
    items.forEach((service) => {
      params.push({
        category,
        service: service.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { category, service } = await params;
  const categoryKey =
    Object.keys(services).find((k) => k.toLowerCase() === category.toLowerCase()) || category;
  const categoryData = services[categoryKey];
  const pageData = categoryData?.find((item) => item.slug.toLowerCase() === service.toLowerCase());

  if (!pageData) return {};

  const title = pageData.metaTitle || pageData.title;
  const description =
    pageData.metaDescription ||
    pageData.subCopy ||
    `Expert ${pageData.title} by Digital Latte, leading creative digital agency in Mumbai, India.`;
  const image = pageData.icon || "/img/og-img.png";

  return constructMetadata({
    title,
    description,
    image,
    url: `/our-expertise/${category}/${service}`,
  });
}

export default async function Page({ params }) {
  const { category, service } = await params;
  const categoryKey =
    Object.keys(services).find((k) => k.toLowerCase() === category.toLowerCase()) || category;

  if (categoryKey === "production-services") {
    redirect("/our-expertise/production-services#photography-grid");
  }

  const categoryData = services[categoryKey];

  if (!categoryData) {
    notFound();
  }

  const pageData = categoryData.find((item) => item.slug.toLowerCase() === service.toLowerCase());

  if (!pageData) {
    notFound();
  }

  const categoryNameMap = {
    "digital-services": "Digital Services",
    "design-services": "Design Services",
    "web-development-services": "Web Development Services",
    "production-services": "Production Services",
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
        name: "Our Expertise",
        item: `${SITE_URL}/what-we-brew`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryNameMap[categoryKey] || categoryKey,
        item: `${SITE_URL}/our-expertise/${categoryKey}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: pageData.title,
        item: `${SITE_URL}/our-expertise/${categoryKey}/${service}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: pageData.title,
    provider: {
      "@type": "Organization",
      name: "Digital Latte",
      url: SITE_URL,
      logo: `${SITE_URL}/img/logo.png`,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    description: pageData.metaDescription || pageData.subCopy,
  };

  // If a custom page component exists, render it. Otherwise, render a styled fallback template.
  const Component = pageData.component;

  if (Component) {
    return (
      <>
        <JsonLd data={breadcrumbSchema} />
        <JsonLd data={serviceSchema} />
        <Component />
      </>
    );
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <div className="flex-grow bg-[#16110f] text-white pt-28 pb-16 px-6 sm:px-12 md:px-16 lg:px-24 flex items-center justify-center min-h-[70vh]">
        <div className="max-w-2xl w-full text-center md:text-left border border-neutral-800 bg-neutral-900/50 p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 font-sans tracking-tight text-[#ececec]">
            {pageData.title}
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8 font-libre">
            {pageData.subCopy || "Detailed service information coming soon."}
          </p>
        </div>
      </div>
    </>
  );
}
