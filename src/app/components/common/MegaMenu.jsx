import Link from "next/link";
// import services from "../data/services";

import services from "../../../data/services";

export default function MegaMenu({ closeMenu }) {
  const categoryTitles = {
    "digital-services": "DIGITAL",
    "design-services": "DESIGN",
    "web-development-services": "DEVELOPMENT",
    "production-services": "PRODUCTION",
  };

  return (
    <div className="fixed top-[69px] right-0 w-full md:w-[94%] lg:w-[96%] xl:w-[100%] bg-[#221f1f] border-t border-neutral-900 z-50 py-10 px-8 md:pr-25 md:pl-40 flex shadow-2xl">
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
        {Object.entries(services).map(([category, items]) => (
          <div key={category} className="flex flex-col">
            {/* Category Header Link */}
            <Link
              href={`/our-expertise/${category}`}
              onClick={closeMenu}
              className="text-[#e07f2a] hover:text-[#fff] font-bold text-[17px] tracking-wider uppercase mb-5 pb-2 border-b border-neutral-800 transition duration-300 block"
            >
              {categoryTitles[category] || category}
            </Link>

            {/* Service Submenu Items */}
            <ul className="flex flex-col space-y-2">
              {items.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/our-expertise/${category}/${service.slug}`}
                    onClick={closeMenu}
                    className="text-[14px] text-white hover:text-[#e07f2a] hover:translate-x-[15px] transition-transform duration-500 block py-1 uppercase tracking-wider font-medium"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
