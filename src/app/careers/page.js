"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import CareerCard from "../components/cards/CareerCard";
import Button from "../components/ui/Button";

// Import list of openings
import { openings } from "../../data/careers";

export default function CareersPage() {
  const [selectedJobId, setSelectedJobId] = useState("general");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    jobRole: "general",
    coverLetter: "",
    resume: null
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  // Watch query params to pre-select job roles
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const applyJob = params.get("apply");
      if (applyJob && openings.some(o => o.id === applyJob)) {
        setSelectedJobId(applyJob);
        setFormData(prev => ({ ...prev, jobRole: applyJob }));
        
        // Smooth scroll to the form element
        const formEl = document.getElementById("apply-form-section");
        if (formEl) {
          formEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    setTimeout(() => {
      setStatus({
        submitting: false,
        success: true,
        error: null
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        jobRole: "general",
        coverLetter: "",
        resume: null
      });
    }, 1500);
  };

  return (
    <main className="flex-grow flex flex-col w-full font-sans">
      
      {/* 1. Header Section */}
      <section className="pt-32 pb-16 px-6 bg-[#16110f] text-white text-center flex flex-col items-center">
        <SectionHeading 
          title={<><span className="font-bold">Careers</span> with us</>}
          subtitle="BREW FRESH IDEAS WITH US!"
          theme="dark"
          align="center"
        />
      </section>

      {/* 2. Openings Section (Light Section) */}
      <section className="py-16 md:py-24 px-6 bg-[#ececec] text-[#16110f]">
        <div className="max-w-[1200px] mx-auto text-center">
          <SectionHeading 
            title={<><span className="font-bold">Current</span> openings</>}
            subtitle="Explore our active vacancies. If you don't find a direct match, submit a general application."
            theme="light"
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
            {openings.map((job) => (
              <CareerCard
                key={job.id}
                id={job.id}
                title={job.title}
                experience={job.experience}
                skills={job.skills}
                description={job.description}
              />
            ))}
          </div>

          <div className="mt-12 bg-white p-6 rounded-2xl border border-neutral-200 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between shadow-sm">
            <span className="text-[#16110f] text-sm font-bold uppercase tracking-wider mb-4 sm:mb-0">
              No vacancy matches your profile?
            </span>
            <Button
              onClick={() => {
                setSelectedJobId("general");
                setFormData(prev => ({ ...prev, jobRole: "general" }));
                document.getElementById("apply-form-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              variant="solid"
              className="!py-2.5 !text-xs !px-5"
            >
              Submit General Application
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Submit Resume Form Section (Dark Section) */}
      <section id="apply-form-section" className="py-16 md:py-24 px-6 bg-[#16110f] text-white border-t border-neutral-850">
        <div className="max-w-[800px] mx-auto text-center flex flex-col items-center">
          <SectionHeading 
            title={<><span className="font-bold">Join</span> the crew</>}
            subtitle="Drop your details and attach your CV. We will look into it and brew new opportunities."
            theme="dark"
            align="center"
            className="mb-10"
          />

          {status.success && (
            <div className="w-full bg-green-950/40 border border-green-850 text-green-300 px-6 py-4 rounded-xl text-sm max-w-xl text-left mb-6">
              <span className="font-bold block mb-1">Application Submitted!</span>
              Your resume has been uploaded successfully. Our HR team will reach out if your profile matches our requirements.
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full mt-6 space-y-6 text-left max-w-xl">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase tracking-widest mb-2 text-neutral-405">
                  Full Name *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="px-4 py-3 rounded-xl border border-neutral-800 bg-[#221f1f] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#e07f2a] transition duration-300"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase tracking-widest mb-2 text-neutral-405">
                  Phone Number *
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 99999 99999"
                  className="px-4 py-3 rounded-xl border border-neutral-800 bg-[#221f1f] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#e07f2a] transition duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email Address */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase tracking-widest mb-2 text-neutral-405">
                  Email Address *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane.doe@example.com"
                  className="px-4 py-3 rounded-xl border border-neutral-800 bg-[#221f1f] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#e07f2a] transition duration-300"
                />
              </div>

              {/* Job Role Select */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase tracking-widest mb-2 text-neutral-405">
                  Select Role *
                </label>
                <select
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedJobId(e.target.value);
                  }}
                  className="px-4 py-3 rounded-xl border border-neutral-800 bg-[#221f1f] text-white text-sm focus:outline-none focus:border-[#e07f2a] transition duration-300 uppercase tracking-wider font-bold text-xs"
                >
                  <option value="general">General Application</option>
                  {openings.map(o => (
                    <option key={o.id} value={o.id}>{o.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resume Upload File */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 text-neutral-405">
                Attach Resume (PDF / DOCX) *
              </label>
              <input
                type="file"
                required
                accept=".pdf,.docx,.doc"
                onChange={handleFileChange}
                className="text-sm text-neutral-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:bg-neutral-800 file:text-white file:cursor-pointer hover:file:bg-[#e07f2a] transition duration-300 file:transition-colors"
              />
            </div>

            {/* Cover Letter text area */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 text-neutral-405">
                Brief Introduction / Cover Letter
              </label>
              <textarea
                name="coverLetter"
                rows={4}
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Why do you want to brew with us?..."
                className="px-4 py-3 rounded-xl border border-neutral-800 bg-[#221f1f] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#e07f2a] resize-none transition duration-300"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center sm:text-left">
              <Button
                variant="orangeSolid"
                type="submit"
                className="w-full sm:w-auto"
              >
                {status.submitting ? "Uploading..." : "Submit Application"}
              </Button>
            </div>

          </form>
        </div>
      </section>

    </main>
  );
}
