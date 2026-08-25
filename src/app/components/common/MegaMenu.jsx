import Link from "next/link";
import services from "../../../data/services";

export default function MegaMenu({ closeMenu }) {
  const categoryTitles = {
    "digital-services": "DIGITAL",
    "design-services": "DESIGN",
    "web-development-services": "DEVELOPMENT",
    "production-services": "PRODUCTION",
  };

  return (
    <div className="fixed top-[69px] w1101:top-[55px] right-0 w-full md:w-[94%] lg:w-[96%] xl:w-[100%] bg-[#16110f] border-t border-neutral-900/60 z-50 py-10 px-8 md:pr-25 md:pl-40 flex shadow-2xl">
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 text-left">
        {Object.entries(services)
          .filter(([category]) => categoryTitles[category])
          .map(([category, items]) => (
            <div key={category} className="flex flex-col">
            {/* Category Header Link */}
            <Link
              href={`/our-expertise/${category}`}
              onClick={closeMenu}
              className="text-[#e07f2a] hover:text-white font-bold text-[16px] tracking-[1.5px] uppercase mb-6 transition-colors duration-300 block select-none"
            >
              {categoryTitles[category] || category}
            </Link>

            {/* Service Submenu Items */}
            <ul className="flex flex-col space-y-2.5">
              {items.map((service) => {
                const href =
                  category === "production-services"
                    ? `/our-expertise/production-services#photography-grid`
                    : `/our-expertise/${category}/${service.slug}`;
                return (
                  <li key={service.slug}>
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className="text-[13px] text-[#dedede] hover:text-[#e07f2a] transition-colors duration-200 block py-0.5 uppercase tracking-wider font-normal leading-relaxed"
                    >
                      {service.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
