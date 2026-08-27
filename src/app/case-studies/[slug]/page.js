import React from "react";
import { notFound } from "next/navigation";
import CaseStudyBrandingTemplate from "@/app/components/ui/CaseStudyBrandingTemplate";
import { caseStudiesBrandingData } from "@/data/caseStudiesBrandingData";

export async function generateStaticParams() {
  return Object.keys(caseStudiesBrandingData).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = caseStudiesBrandingData[slug];

  if (!data) {
    return {
      title: "Case Study | Digital Latte",
      description: "Explore our digital marketing and branding case studies at Digital Latte."
    };
  }

  return {
    title: data.metaTitle || `${data.title} Case Study | Digital Latte`,
    description: data.metaDescription || `Read about the ${data.title} case study by Digital Latte.`,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const data = caseStudiesBrandingData[slug];

  if (!data) {
    notFound();
  }

  return <CaseStudyBrandingTemplate {...data} />;
}
