import services from "../../../../data/services";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { category, service } = await params;
  const categoryData = services[category];
  const pageData = categoryData?.find(item => item.slug === service);

  if (!pageData) return {};

  return {
    title: `${pageData.metaTitle} | Digital Latte`,
    description: pageData.metaDescription,
  };
}

export default async function Page({ params }) {
  const { category, service } = await params;
  const categoryData = services[category];

  if (!categoryData) {
    notFound();
  }

  const pageData = categoryData.find(item => item.slug === service);

  if (!pageData) {
    notFound();
  }

  // If a custom page component exists, render it. Otherwise, render a styled fallback template.
  const Component = pageData.component;

  if (Component) {
    return <Component />;
  }

  return (
    <div className="flex-grow bg-[#16110f] text-white pt-28 pb-16 px-6 sm:px-12 md:px-16 lg:px-24 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-2xl w-full text-center md:text-left border border-neutral-800 bg-neutral-900/50 p-8 rounded-2xl shadow-xl">
        <span className="text-sm font-semibold tracking-widest text-[#e07f2a] uppercase block mb-3">
          Our Expertise / {category.replace("-services", "").replace(/-/g, " ")}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white mb-6">
          {pageData.title}
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          {pageData.metaDescription}
        </p>
        <div className="pt-6 border-t border-neutral-850 text-gray-500 text-sm">
          This is a dynamic service page of Digital Latte. The navigation structure is fully configured and active.
        </div>
      </div>
    </div>
  );
}