import React from "react";
import { notFound } from "next/navigation";
import CaseStudyBrandingTemplate from "@/app/components/ui/CaseStudyBrandingTemplate";
import { caseStudiesBrandingData } from "@/data/caseStudiesBrandingData";
import { constructMetadata, SITE_URL } from "@/utils/seo";
import JsonLd from "@/app/components/seo/JsonLd";

export async function generateStaticParams() {
  return Object.keys(caseStudiesBrandingData).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = caseStudiesBrandingData[slug];

  if (!data) {
    return constructMetadata({
      title: "Case Study",
      description: "Explore our digital marketing and branding case studies at Digital Latte.",
      url: `/case-studies/${slug}`,
    });
  }

  const title = data.metaTitle || `${data.title} Case Study`;
  const description =
    data.metaDescription || `Read about the ${data.title} case study by Digital Latte.`;
  const image = data.heroImage || "/img/og-img.png";

  return constructMetadata({
    title,
    description,
    image,
    url: `/case-studies/${slug}`,
  });
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const data = caseStudiesBrandingData[slug];

  if (!data) {
    notFound();
  }

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
        name: "Case Studies",
        item: `${SITE_URL}/case-studies`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title || "Case Study",
        item: `${SITE_URL}/case-studies/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CaseStudyBrandingTemplate {...data} />
    </>
  );
}
