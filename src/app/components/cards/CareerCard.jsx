import React from 'react';
import Button from '../ui/Button';

export default function CareerCard({
  id,
  title,
  experience,
  skills = [],
  description
}) {
  return (
    <div className="bg-[#221f1f] border border-neutral-800 p-6 md:p-8 rounded-2xl flex flex-col justify-between hover:border-[#e07f2a] transition duration-300 text-left h-full shadow-lg">
      <div>
        {/* Job Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h3 className="text-white text-lg md:text-xl font-bold uppercase tracking-wide">
            {title}
          </h3>
          <span className="bg-neutral-800 text-neutral-400 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold border border-neutral-750">
            {experience}
          </span>
        </div>

        {/* Short Job Description */}
        <p className="text-neutral-400 text-sm md:text-[15px] leading-relaxed mb-6">
          {description}
        </p>

        {/* Required Skills Tags */}
        {skills && skills.length > 0 && (
          <div className="mb-6">
            <h4 className="text-[#e07f2a] text-[11px] font-bold uppercase tracking-widest mb-3">
              Required Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-neutral-900 text-neutral-350 text-[11px] px-2.5 py-1 rounded-md border border-neutral-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Application Call to Action */}
      <div className="pt-4 border-t border-neutral-850 mt-4 flex items-center justify-between">
        <span className="text-neutral-500 text-xs uppercase tracking-wider font-medium">
          Full-Time / Mumbai
        </span>
        <Button
          href={`/careers?apply=${id}`}
          variant="orangeOutline"
          className="!px-5 !py-2.5 !text-[11px] font-bold"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
}
