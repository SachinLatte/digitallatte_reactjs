import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { openings } from "../../../data/careers";
import ContactSection from "../../components/common/ContactSection";
import JobSummaryCard from "../../components/careers/JobSummaryCard";
import { constructMetadata, SITE_URL } from "../../../utils/seo";
import JsonLd from "../../components/seo/JsonLd";

export async function generateStaticParams() {
  return openings.map((job) => ({
    id: job.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = openings.find((o) => o.id === id);

  if (!job) {
    return constructMetadata({
      title: "Career Opportunity",
      description: "Explore career opportunities at Digital Latte.",
      url: `/careers/${id}`,
    });
  }

  return constructMetadata({
    title: `${job.title} Jobs | Digital Marketing Careers | Mumbai`,
    description: `Explore careers and job openings for ${job.title} at Digital Latte, the best Creative Digital Marketing Agency in Mumbai, India.`,
    url: `/careers/${id}`,
  });
}

export default async function JobDetailPage({ params }) {
  const { id } = await params;
  const job = openings.find((o) => o.id === id);

  if (!job) {
    notFound();
  }

  const jobSchema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: Array.isArray(job.description)
      ? job.description.join(". ")
      : job.description || "Career opportunity at Digital Latte",
    identifier: {
      "@type": "PropertyValue",
      name: "Digital Latte",
      value: job.id,
    },
    datePosted: "2024-01-01",
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Digital Latte",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/img/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Andheri West",
        addressLocality: "Mumbai",
        addressRegion: "MH",
        postalCode: "400053",
        addressCountry: "IN",
      },
    },
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
        name: "Careers",
        item: `${SITE_URL}/careers`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: job.title,
        item: `${SITE_URL}/careers/${id}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={jobSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="flex-grow flex flex-col w-full font-sans overflow-x-hidden bg-white text-[#16110f]">
        {/* 1. Hero Banner Section */}
        <section className="relative w-full pt-[8%] pb-[4%] bg-[#ececec] flex items-center select-none border-b border-neutral-200">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
            <div className="max-w-3xl text-left">
              <h1 className="text-[32px] w1025:text-[34px] w769:text-[28px] w480:text-[24px] text-[#16110f] uppercase leading-[1.25] font-light tracking-[1px]">
                <strong className="font-bold">{job.title}</strong>
              </h1>
            </div>
          </div>
        </section>

        {/* 2. Main content container */}
        <section className="py-16 w-full">
          <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto">
            {/* Breadcrumb Navigation */}
            <div className="mb-12">
              <div className="flex items-center gap-2 text-sm font-libre font-light text-neutral-500">
                <Link
                  href="/careers"
                  className="hover:text-[#ff9000] font-bold text-neutral-800 transition"
                >
                  Current Opening
                </Link>
                <span className="text-neutral-400">&gt;</span>
                <span className="text-[#ff9000] font-medium">{job.title}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Left Content Column */}
              <div className="lg:col-span-2 space-y-12">
                {/* Job Description list */}
                {job.description && job.description.length > 0 && (
                  <div>
                    <h2 className="text-[24px] w480:text-[20px] font-bold uppercase tracking-wider text-[#16110f] mb-6 flex items-center gap-3 select-none">
                      <span className="w-1.5 h-6 bg-[#ff9000] rounded"></span>
                      Job Description
                    </h2>
                    <ul className="space-y-4">
                      {job.description.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-[#555] font-libre font-light leading-[26px]"
                        >
                          <span className="text-[#ff9000] mt-1.5 font-bold text-sm">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements list */}
                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <h2 className="text-[24px] w480:text-[20px] font-bold uppercase tracking-wider text-[#16110f] mb-6 flex items-center gap-3 select-none">
                      <span className="w-1.5 h-6 bg-[#ff9000] rounded"></span>
                      Requirements
                    </h2>
                    <ul className="space-y-4">
                      {job.requirements.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-[#555] font-libre font-light leading-[26px]"
                        >
                          <span className="text-[#ff9000] mt-1.5 font-bold text-sm">▪</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Sticky Sidebar Column */}
              <div className="lg:col-span-1 lg:sticky lg:top-28">
                <JobSummaryCard job={job} allOpenings={openings} />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Contact CTA Section */}
        <ContactSection
          title="Work With Us"
          subtitle="Need a creative boost to launch a campaign, build a product, or grow your audience? Let's connect."
          theme="dark"
        />
      </main>
    </>
  );
}
