"use client";

import React, { useState } from "react";
import { LuBriefcase, LuMapPin, LuClock } from "react-icons/lu";
import JobApplicationModal from "./JobApplicationModal";

export default function JobSummaryCard({ job, allOpenings }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-[#16110f] text-white p-8 rounded-xl shadow-lg border border-neutral-900 select-none">
        <h3 className="text-xl font-bold uppercase tracking-wider text-white border-b border-neutral-800 pb-4 mb-6">
          Job Summary
        </h3>

        <div className="space-y-6 font-sans">
          {/* Experience */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-[#ff9000] shrink-0">
              <LuBriefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-neutral-400 block font-libre uppercase tracking-wider font-light">
                Experience Required
              </span>
              <span className="text-sm font-semibold">{job.experience}</span>
            </div>
          </div>

          {/* Job Type */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-[#ff9000] shrink-0">
              <LuClock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-neutral-400 block font-libre uppercase tracking-wider font-light">
                Job Type
              </span>
              <span className="text-sm font-semibold">Full-Time</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-[#ff9000] shrink-0">
              <LuMapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-neutral-400 block font-libre uppercase tracking-wider font-light">
                Location
              </span>
              <span className="text-sm font-semibold">Mumbai, India</span>
            </div>
          </div>

          {/* Skills tags */}
          {job.skills && job.skills.length > 0 && (
            <div className="border-t border-neutral-850 pt-6 mt-6">
              <span className="text-xs text-neutral-400 block font-libre uppercase tracking-wider font-light mb-3">
                Key Skills
              </span>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-neutral-800 text-neutral-200 text-xs px-3 py-1.5 rounded-full border border-neutral-750 font-medium font-libre"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full text-center block font-sans py-3.5 px-6 text-[#16110f] text-[14px] uppercase tracking-[1.5px] bg-white hover:bg-[#e07f2a] hover:text-white transition-all duration-300 rounded-[35px] font-bold mt-8 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg cursor-pointer"
        >
          Apply For this Job
        </button>
      </div>

      {/* Application Popup Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={job}
        allOpenings={allOpenings}
      />
    </>
  );
}
