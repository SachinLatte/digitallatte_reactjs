import React from 'react';
import Link from 'next/link';
import { LuBriefcase, LuPenTool } from 'react-icons/lu';

export default function CareerCard({
  id,
  title,
  experience,
  skills = [],
  description,
  isEven
}) {
  return (
    <div className={`transition-all duration-300 rounded-[10px] p-8 flex flex-col justify-between text-left h-full shadow-[0_4px_20px_rgba(0,0,0,0.05)] ${isEven ? 'bg-career-dark' : 'bg-career-darker'}`}>
      <div className="flex-grow flex flex-col">
        {/* Job Title */}
        <h3 className="text-[#fff] text-[25px] leading-[36px] font-bold tracking-wide mb-6 min-h-[52px] flex items-center">
          {title}
        </h3>

        {/* Info Block */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-neutral-600 text-sm font-libre font-light">
            <LuBriefcase className="w-6 h-6 text-[#ff9000] flex-shrink-0" />
            <span className="text-[17px] text-white">{experience}</span>
          </div>
          {skills && skills.length > 0 && (
            <div className="flex items-start gap-3 text-neutral-600 text-sm font-libre font-light">
              <LuPenTool className="w-6 h-6 text-[#ff9000] mt-0.5 flex-shrink-0" />
              <span className="text-[17px] text-white">{skills.join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Application CTA */}
      <div className="pt-4 mt-auto flex items-center justify-between">
        <Link
          href={`/careers/${id}`}
          className="px-4 py-2.5 border border-white rounded-full text-[11px] font-bold text-white uppercase tracking-[1.5px] bg-transparent hover:bg-[#16110f] hover:text-white transition-all duration-300 ease-in-out inline-block hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-md"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}


