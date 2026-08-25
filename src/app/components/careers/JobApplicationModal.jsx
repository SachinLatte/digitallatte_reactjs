"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaXmark, FaRegUser, FaPhone, FaRegEnvelope, FaBriefcase, FaRegCommentDots } from "react-icons/fa6";
import { LuUpload, LuImage, LuFileSpreadsheet } from "react-icons/lu";

export default function JobApplicationModal({ isOpen, onClose, job, allOpenings }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    openingId: job?.id || "",
    photo: null,
    resume: null,
    message: "",
  });
  const [prevJobId, setPrevJobId] = useState(job?.id);
  if (job?.id !== prevJobId) {
    setPrevJobId(job?.id);
    setFormData((prev) => ({ ...prev, openingId: job?.id || "" }));
  }

  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent scroll of body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNameChange = (e) => {
    // Restrict name to text inputs, numbers not allowed
    const val = e.target.value.replace(/[0-9]/g, "");
    setFormData((prev) => ({ ...prev, name: val }));
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleMobileChange = (e) => {
    // Keep only numbers
    const val = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, mobile: val }));
    if (errors.mobile) {
      setErrors((prev) => ({ ...prev, mobile: "" }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPhotoName(file.name);

      // Generate image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);

      if (errors.photo) {
        setErrors((prev) => ({ ...prev, photo: "" }));
      }
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
      setResumeName(file.name);
      if (errors.resume) {
        setErrors((prev) => ({ ...prev, resume: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (/[0-9]/.test(formData.name)) {
      newErrors.name = "Numbers are not allowed in the name";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.openingId) newErrors.openingId = "Please select an opening";
    if (!formData.photo) newErrors.photo = "Photo attachment is required";
    if (!formData.resume) newErrors.resume = "Resume attachment is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate server submission before redirect
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      // Redirect to thank you page with current opening path to return back
      router.push(`/thank-you?from=/careers/${formData.openingId}`);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      {/* Modal Container */}
      <div
        className="bg-white text-[#16110f] rounded-2xl w-full max-w-lg shadow-2xl relative flex flex-col max-h-[90vh] animate-[scaleIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 transition p-1.5 rounded-full hover:bg-neutral-100 cursor-pointer"
            aria-label="Close modal"
          >
            <FaXmark className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 font-sans">
          {/* Name Field */}
          <div className="relative">
            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5 select-none">
              Full Name*
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <FaRegUser className="w-4 h-4" />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="John Doe"
                className={`w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white text-sm pl-11 pr-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 focus:ring-[#ff9000]/20'} outline-none focus:ring-4 focus:border-[#ff9000] transition duration-200`}
              />
            </div>
            {errors.name && <span className="text-red-500 text-xs mt-1 block font-libre">{errors.name}</span>}
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mobile Field */}
            <div>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5 select-none">
                Mobile Number*
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  <FaPhone className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="mobile"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleMobileChange}
                  placeholder="9876543210"
                  className={`w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white text-sm pl-11 pr-4 py-3 rounded-xl border ${errors.mobile ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 focus:ring-[#ff9000]/20'} outline-none focus:ring-4 focus:border-[#ff9000] transition duration-200`}
                />
              </div>
              {errors.mobile && <span className="text-red-500 text-xs mt-1 block font-libre">{errors.mobile}</span>}
            </div>

            {/* Email Field */}
            <div>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5 select-none">
                Email Address*
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  <FaRegEnvelope className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={`w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white text-sm pl-11 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 focus:ring-[#ff9000]/20'} outline-none focus:ring-4 focus:border-[#ff9000] transition duration-200`}
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs mt-1 block font-libre">{errors.email}</span>}
            </div>
          </div>

          {/* Position Selector */}
          <div>
            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5 select-none">
              Select Position*
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <FaBriefcase className="w-4 h-4" />
              </span>
              <select
                name="openingId"
                value={formData.openingId}
                onChange={handleInputChange}
                className={`w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white text-sm pl-11 pr-4 py-3 rounded-xl border ${errors.openingId ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 focus:ring-[#ff9000]/20'} outline-none focus:ring-4 focus:border-[#ff9000] appearance-none transition duration-200 cursor-pointer`}
              >
                <option value="">-- Choose Position --</option>
                {allOpenings.map((op) => (
                  <option key={op.id} value={op.id}>
                    {op.title}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-500 w-0 h-0"></span>
            </div>
            {errors.openingId && <span className="text-red-500 text-xs mt-1 block font-libre">{errors.openingId}</span>}
          </div>

          {/* Document Attachments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Photo Attachment */}
            <div>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5 select-none">
                Photo Attachment*
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <label
                  htmlFor="photo-upload"
                  className={`flex flex-col items-center justify-center w-full min-h-[100px] border-2 border-dashed rounded-xl cursor-pointer p-4 text-center transition hover:bg-neutral-50 ${errors.photo ? 'border-red-400 bg-red-50/20' : 'border-neutral-200 bg-neutral-50/40'}`}
                >
                  {photoPreview ? (
                    <div className="flex flex-col items-center gap-1.5 w-full">
                      <Image
                        src={photoPreview}
                        alt="Photo Preview"
                        width={48}
                        height={48}
                        unoptimized
                        className="w-12 h-12 rounded-full object-cover border border-[#ff9000]"
                      />
                      <span className="text-xs text-[#16110f] font-semibold truncate max-w-[150px]">
                        {photoName}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5">
                      <LuImage className="w-6 h-6 text-[#ff9000]" />
                      <span className="text-xs text-neutral-600 font-semibold font-libre">Upload Image</span>
                      <span className="text-[10px] text-neutral-400">JPG, PNG format</span>
                    </div>
                  )}
                </label>
              </div>
              {errors.photo && <span className="text-red-500 text-xs mt-1 block font-libre">{errors.photo}</span>}
            </div>

            {/* Resume Attachment */}
            <div>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5 select-none">
                Resume Attachment*
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="hidden"
                />
                <label
                  htmlFor="resume-upload"
                  className={`flex flex-col items-center justify-center w-full min-h-[100px] border-2 border-dashed rounded-xl cursor-pointer p-4 text-center transition hover:bg-neutral-50 ${errors.resume ? 'border-red-400 bg-red-50/20' : 'border-neutral-200 bg-neutral-50/40'}`}
                >
                  {formData.resume ? (
                    <div className="flex flex-col items-center gap-1.5 w-full">
                      <LuFileSpreadsheet className="w-8 h-8 text-emerald-600 animate-bounce" />
                      <span className="text-xs text-[#16110f] font-semibold truncate max-w-[150px]">
                        {resumeName}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5">
                      <LuUpload className="w-6 h-6 text-[#ff9000]" />
                      <span className="text-xs text-neutral-600 font-semibold font-libre">Upload Resume</span>
                      <span className="text-[10px] text-neutral-400">PDF, DOCX format</span>
                    </div>
                  )}
                </label>
              </div>
              {errors.resume && <span className="text-red-500 text-xs mt-1 block font-libre">{errors.resume}</span>}
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5 select-none">
              Your Message*
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-neutral-400">
                <FaRegCommentDots className="w-4 h-4" />
              </span>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Why do you want to join us?"
                className={`w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white text-sm pl-11 pr-4 py-3 rounded-xl border ${errors.message ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 focus:ring-[#ff9000]/20'} outline-none focus:ring-4 focus:border-[#ff9000] resize-none transition duration-200`}
              />
            </div>
            {errors.message && <span className="text-red-500 text-xs mt-1 block font-libre">{errors.message}</span>}
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-start gap-3 select-none">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-7 py-2.5 bg-[#16110f] hover:bg-[#e07f2a] text-white rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow hover:shadow-md cursor-pointer flex items-center gap-2 ${isSubmitting ? 'opacity-80 cursor-not-allowed bg-[#e07f2a]' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
