"use client";

import { getAssetPath } from "../../../utils/assetPath";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { LuUpload, LuImage, LuFileCheck, LuX } from "react-icons/lu";

export default function CareerApplicationForm({ jobId = "0", jobTitle = "General Application" }) {
  const router = useRouter();
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    photo: null,
    cv: null,
    coverLetter: "",
    jobId: jobId,
  });

  const [photoName, setPhotoName] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [cvName, setCvName] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e) => {
    const val = e.target.value.replace(/[^a-zA-Z\s.-]/g, "");
    setFormData((prev) => ({ ...prev, name: val }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
  };

  const handleContactChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, contact: val }));
    if (errors.contact) setErrors((prev) => ({ ...prev, contact: "" }));
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "name") {
      value = value.replace(/[^a-zA-Z\s.-]/g, "");
    } else if (name === "contact") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isJpg =
        file.type === "image/jpeg" ||
        file.name.toLowerCase().endsWith(".jpg") ||
        file.name.toLowerCase().endsWith(".jpeg");

      if (!isJpg) {
        setErrors((prev) => ({ ...prev, photo: "Photo must be in JPG/JPEG format" }));
        return;
      }

      if (file.size > 1024 * 1024) {
        setErrors((prev) => ({ ...prev, photo: "Photo size must be below 1 MB" }));
        return;
      }

      setFormData((prev) => ({ ...prev, photo: file }));
      setPhotoName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);

      if (errors.photo) setErrors((prev) => ({ ...prev, photo: "" }));
    }
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isPdf =
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf");

      if (!isPdf) {
        setErrors((prev) => ({ ...prev, cv: "Resume must be in PDF format" }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, cv: "Resume size must be below 5 MB" }));
        return;
      }

      setFormData((prev) => ({ ...prev, cv: file }));
      setCvName(file.name);
      if (errors.cv) setErrors((prev) => ({ ...prev, cv: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (/[0-9]/.test(formData.name) || !/^[a-zA-Z\s.-]{2,50}$/.test(formData.name.trim())) {
      newErrors.name = "Numbers are not allowed in name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Phone number is required";
    } else if (formData.contact.length !== 10 || !/^[0-9]{10}$/.test(formData.contact)) {
      newErrors.contact = "Phone number must be exactly 10 digits";
    }

    if (!formData.cv) {
      newErrors.cv = "Please upload your CV / Resume in PDF format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("contact", formData.contact);
      data.append("jobId", formData.jobId || "general");
      data.append("jobTitle", jobTitle || "General Application");
      data.append("coverNote", formData.coverLetter || "");

      if (formData.photo) {
        data.append("photo", formData.photo);
      }
      if (formData.cv) {
        data.append("resume", formData.cv);
      }

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: data,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setErrors((prev) => ({
          ...prev,
          server: json.message || "Failed to submit application. Please try again.",
        }));
      } else {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("thank_you_from", pathname || "/submit-resume");
        }
        router.push("/thank-you");
      }
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        server: "Network error. Please try again later.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#fcfaf8] border border-[#ff9000]/30 rounded-2xl p-8 sm:p-12 text-left animate-[fadeIn_0.5s_ease-out]">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#ff9000] mb-4 uppercase tracking-wider font-sans">
          Thank you for your interest in Digital Latte!
        </h2>
        <p className="text-[#555] text-base leading-relaxed font-libre font-light mb-6">
          We have received your application. Our talent acquisition team will review your profile and get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 text-left font-sans">
      {/* Full Name */}
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Full name*"
          required
          className="w-full bg-[#f9f9f9] border border-neutral-300 rounded-lg px-5 py-3.5 text-[#16110f] placeholder-neutral-400 text-[15px] outline-none focus:border-[#ff9000] focus:bg-white transition duration-200"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
      </div>

      {/* Email Address */}
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email Address*"
          required
          className="w-full bg-[#f9f9f9] border border-neutral-300 rounded-lg px-5 py-3.5 text-[#16110f] placeholder-neutral-400 text-[15px] outline-none focus:border-[#ff9000] focus:bg-white transition duration-200"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
      </div>

      {/* Phone Number */}
      <div>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleContactChange}
          maxLength={10}
          placeholder="Phone number*"
          required
          className="w-full bg-[#f9f9f9] border border-neutral-300 rounded-lg px-5 py-3.5 text-[#16110f] placeholder-neutral-400 text-[15px] outline-none focus:border-[#ff9000] focus:bg-white transition duration-200"
        />
        {errors.contact && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.contact}</p>}
      </div>

      {/* Photo Upload */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
          Photo <span className="text-neutral-400 font-normal">(JPG only, Max 1 MB)</span>
        </p>
        <div className="relative">
          <label className="flex items-center gap-4 w-full bg-[#f9f9f9] border border-dashed border-neutral-300 hover:border-[#ff9000] rounded-lg px-4 py-2.5 cursor-pointer transition group">
            <div className="flex items-center gap-2 bg-[#16110f] group-hover:bg-[#e07f2a] text-white px-4 py-2 rounded-md font-semibold text-xs uppercase tracking-wider transition-colors duration-200 shrink-0">
              <LuImage className="text-base text-[#ff9000] group-hover:text-white" />
              <span>Browse</span>
            </div>
            <span className="text-sm text-neutral-500 truncate font-libre font-light">
              {photoName ? photoName : "Choose profile photo (JPG format, Max 1 MB)"}
            </span>
            <input
              type="file"
              name="photo"
              accept=".jpg,.jpeg,image/jpeg"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>
        {photoPreview && (
          <div className="mt-3 flex items-center gap-3 bg-neutral-50 p-2 rounded-lg border border-neutral-200 w-fit">
            <Image
              src={photoPreview}
              alt="Photo preview"
              width={48}
              height={48}
              className="w-12 h-12 object-cover rounded-md"
            />
            <span className="text-xs text-neutral-600 font-medium truncate max-w-[200px]">{photoName}</span>
          </div>
        )}
        {errors.photo && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.photo}</p>}
      </div>

      {/* CV / Resume Upload */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
          CV / Resume <span className="text-[#ff9000] font-normal">(PDF only, Max 5 MB)*</span>
        </p>
        <div className="relative">
          <label className="flex items-center gap-4 w-full bg-[#f9f9f9] border border-dashed border-neutral-300 hover:border-[#ff9000] rounded-lg px-4 py-2.5 cursor-pointer transition group">
            <div className="flex items-center gap-2 bg-[#16110f] group-hover:bg-[#e07f2a] text-white px-4 py-2 rounded-md font-semibold text-xs uppercase tracking-wider transition-colors duration-200 shrink-0">
              <LuUpload className="text-base text-[#ff9000] group-hover:text-white" />
              <span>Upload PDF</span>
            </div>
            <span className="text-sm text-neutral-500 truncate font-libre font-light">
              {cvName ? cvName : "Upload Resume (PDF format, Max 5 MB)*"}
            </span>
            <input
              type="file"
              name="cv"
              accept=".pdf,application/pdf"
              onChange={handleCvChange}
              required
              className="hidden"
            />
          </label>
        </div>
        {cvName && (
          <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600 font-medium">
            <LuFileCheck className="text-sm" />
            <span>{cvName}</span>
          </div>
        )}
        {errors.cv && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.cv}</p>}
      </div>

      {/* Cover Letter */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Cover Letter</p>
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleInputChange}
          rows={4}
          placeholder="Insert your cover letter here..."
          className="w-full bg-[#f9f9f9] border border-neutral-300 rounded-lg px-5 py-3.5 text-[#16110f] placeholder-neutral-400 text-[15px] outline-none focus:border-[#ff9000] focus:bg-white transition duration-200 resize-none font-sans"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center bg-[#16110f] hover:bg-[#e07f2a] text-white font-sans font-bold text-[14px] uppercase tracking-[1.5px] px-10 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer active:scale-95"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
}
