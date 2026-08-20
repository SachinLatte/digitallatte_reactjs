import TruncateText from '../ui/TruncateText';
import Link from 'next/link';

export default function CaseStudyCard({
  slug,
  title,
  description,
  image,
  category,
  stats = []
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div className="group relative bg-[#221f1f] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#e07f2a] transition-all duration-500 flex flex-col h-full shadow-lg">
      
      {/* Background Graphic / Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
        <img
          src={image || `${basePath}/img/home/who-we-are-1.webp`}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {category && (
          <span className="absolute top-4 left-4 bg-[#e07f2a] text-white text-[11px] font-bold uppercase tracking-[1.5px] px-3 py-1.5 rounded-full shadow-md">
            {category}
          </span>
        )}
      </div>

      {/* Text Info */}
      <div className="p-6 md:p-8 flex flex-col flex-grow text-left">
        <h3 className="text-white text-xl md:text-2xl font-bold uppercase tracking-wide group-hover:text-[#e07f2a] transition-colors duration-300 mb-3">
          {title}
        </h3>
        
        <p className="text-neutral-400 text-sm md:text-[15px] leading-relaxed mb-6 flex-grow">
          <TruncateText limit={140}>{description}</TruncateText>
        </p>

        {/* Dynamic Metrics / Stats (if available) */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-3 gap-2 py-4 mb-6 border-t border-b border-neutral-800">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <span className="block text-lg md:text-xl font-bold text-[#e07f2a]">
                  {stat.value}
                </span>
                <span className="block text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/case-studies/${slug}`}
          className="self-start text-[12px] uppercase font-bold tracking-[2px] text-[#e07f2a] hover:text-white transition duration-300 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#e07f2a] hover:after:w-full after:transition-all after:duration-300"
        >
          Read Case Study &rarr;
        </Link>
      </div>

    </div>
  );
}
