"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaArrowLeft,
  FaFloppyDisk,
  FaUpload,
  FaTrashCan,
  FaPlus,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaCheck,
  FaCircleNotch,
  FaCircleInfo,
  FaFolderOpen,
  FaChartLine,
  FaImage,
  FaQuoteLeft,
} from "react-icons/fa6";
import CaseStudyBrandingTemplate from "@/app/components/ui/CaseStudyBrandingTemplate";
import { getAssetPath } from "@/utils/assetPath";

export default function AdminNewCaseStudyPage() {
  const router = useRouter();

  // Basic Details
  const [client, setClient] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [breadcrumbText, setBreadcrumbText] = useState("");
  const [services, setServices] = useState("Branding, Graphic Design, Print, Digital");
  const [status, setStatus] = useState("published");

  // Media
  const [topBannerImg, setTopBannerImg] = useState("");
  const [brandInfoImg, setBrandInfoImg] = useState("");
  const [storyVideoUrl, setStoryVideoUrl] = useState("");

  // Description Paragraphs
  const [description, setDescription] = useState([""]);

  // Stats / Performance Metrics
  const [stats, setStats] = useState([
    { label: "Reach", value: "5M+" },
    { label: "Engagement Rate", value: "8.2%" },
  ]);

  // Creative Showcase Grid Sections
  const [creativeGrid, setCreativeGrid] = useState([
    {
      layout: "grid-2",
      images: [
        { src: "", alt: "Creative Visual 1" },
        { src: "", alt: "Creative Visual 2" },
      ],
    },
  ]);

  // Quote
  const [quote, setQuote] = useState("");

  // SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [uploadingField, setUploadingField] = useState(null);

  const bannerFileRef = useRef(null);
  const brandInfoFileRef = useRef(null);

  // Auto slug from client / title
  const handleClientChange = (val) => {
    setClient(val);
    if (!isSlugManual) {
      const base = "digital-marketing-case-study-" + val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      setSlug(base);
    }
  };

  // Upload image helper
  const handleFileUpload = async (file, onUploaded) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload image");
      }
      onUploaded(data.url);
    } catch (err) {
      alert("Upload error: " + err.message);
    }
  };

  // Paragraph helpers
  const addParagraph = () => setDescription((prev) => [...prev, ""]);
  const updateParagraph = (index, val) => {
    setDescription((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };
  const removeParagraph = (index) => {
    setDescription((prev) => prev.filter((_, i) => i !== index));
  };

  // Stat helpers
  const addStat = () => setStats((prev) => [...prev, { label: "", value: "" }]);
  const updateStat = (index, field, val) => {
    setStats((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };
  const removeStat = (index) => {
    setStats((prev) => prev.filter((_, i) => i !== index));
  };

  // Creative Grid helpers
  const addGridSection = (layout = "grid-2") => {
    const count = layout === "grid-1" ? 1 : layout === "grid-2" ? 2 : 3;
    const images = Array.from({ length: count }, (_, i) => ({
      src: "",
      alt: `Creative Showcase Image ${i + 1}`,
    }));
    setCreativeGrid((prev) => [...prev, { layout, images }]);
  };

  const updateGridSectionLayout = (secIdx, newLayout) => {
    setCreativeGrid((prev) => {
      const copy = [...prev];
      const count = newLayout === "grid-1" ? 1 : newLayout === "grid-2" ? 2 : 3;
      let imgs = [...(copy[secIdx].images || [])];
      if (imgs.length < count) {
        while (imgs.length < count) {
          imgs.push({ src: "", alt: `Image ${imgs.length + 1}` });
        }
      } else {
        imgs = imgs.slice(0, count);
      }
      copy[secIdx] = { layout: newLayout, images: imgs };
      return copy;
    });
  };

  const updateGridImage = (secIdx, imgIdx, field, val) => {
    setCreativeGrid((prev) => {
      const copy = [...prev];
      const imgs = [...copy[secIdx].images];
      imgs[imgIdx] = { ...imgs[imgIdx], [field]: val };
      copy[secIdx] = { ...copy[secIdx], images: imgs };
      return copy;
    });
  };

  const moveGridSection = (index, direction) => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= creativeGrid.length) return;
    setCreativeGrid((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.splice(target, 0, item);
      return copy;
    });
  };

  const removeGridSection = (secIdx) => {
    setCreativeGrid((prev) => prev.filter((_, i) => i !== secIdx));
  };

  // Submit handler
  const handleSubmit = async (targetStatus = status) => {
    if (!client.trim() || !title.trim()) {
      setFeedback({ type: "error", message: "Client name and Case Study title are required." });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      const cleanedDescriptions = description.filter((d) => d && d.trim().length > 0);
      const cleanedStats = stats.filter((s) => s.label?.trim() || s.value?.trim());
      const cleanedGrid = creativeGrid
        .filter((sec) => sec.images && sec.images.some((img) => img.src && img.src.trim()))
        .map((sec) => ({
          layout: sec.layout,
          images: sec.images.filter((img) => img.src && img.src.trim()),
        }));

      const payload = {
        client: client.trim(),
        title: title.trim(),
        slug: slug.trim() || undefined,
        breadcrumbText: breadcrumbText.trim() || title.trim(),
        services: services.trim(),
        heroType: "banner",
        topBannerImg: topBannerImg.trim(),
        brandInfoImg: brandInfoImg.trim(),
        storyVideoUrl: storyVideoUrl.trim(),
        description: cleanedDescriptions,
        stats: cleanedStats,
        creativeGrid: cleanedGrid,
        quote: quote.trim(),
        status: targetStatus,
        metaTitle: metaTitle.trim() || `${title.trim()} | Case Study | Digital Latte`,
        metaDescription: metaDescription.trim() || cleanedDescriptions[0] || "",
      };

      const res = await fetch("/api/admin/case-studies/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create case study");
      }

      setFeedback({ type: "success", message: "Case study created successfully! Redirecting..." });
      setTimeout(() => {
        router.push("/admin/case-studies");
      }, 1200);
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/case-studies"
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition shadow-lg cursor-pointer"
          >
            <FaArrowLeft className="text-sm" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff7b00] uppercase tracking-wider mb-1 font-bold">
              <span>CMS</span>
              <span>•</span>
              <span>New Portfolio Story</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Create New Case Study
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-semibold text-sm transition shadow-lg cursor-pointer"
          >
            <FaEye className="text-xs text-[#ff7b00]" />
            <span>{previewMode ? "Exit Preview" : "Live Preview"}</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("draft")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 font-semibold text-sm transition disabled:opacity-50 cursor-pointer"
          >
            <FaFloppyDisk className="text-xs" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("published")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7b00] hover:bg-[#e06d00] text-white font-semibold text-sm transition shadow-lg shadow-[#ff7b00]/25 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <FaCircleNotch className="text-xs animate-spin" />
            ) : (
              <FaCheck className="text-xs" />
            )}
            <span>Publish Case Study</span>
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback.message && (
        <div
          className={`p-4 rounded-xl text-sm font-medium border ${
            feedback.type === "error"
              ? "bg-red-500/10 border-red-500/30 text-red-400"
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* Live Preview Mode */}
      {previewMode ? (
        <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-white">
          <div className="bg-[#140f0d] p-4 border-b border-white/10 flex justify-between items-center text-white">
            <span className="text-xs font-mono uppercase text-[#ff7b00] font-bold">
              Case Study Full Preview
            </span>
            <button
              onClick={() => setPreviewMode(false)}
              className="text-xs font-semibold px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white cursor-pointer"
            >
              Close Preview
            </button>
          </div>
          <CaseStudyBrandingTemplate
            slug={slug || "preview-study"}
            client={client || "Brand Client"}
            breadcrumbText={breadcrumbText || title || "Case Study"}
            title={title || "Campaign Title"}
            services={services}
            topBannerImg={topBannerImg}
            brandInfoImg={brandInfoImg}
            storyVideoUrl={storyVideoUrl}
            description={description.filter(Boolean)}
            stats={stats.filter((s) => s.label || s.value)}
            creativeGrid={creativeGrid}
            quote={quote}
          />
        </div>
      ) : (
        /* Form Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Basic Details Card */}
            <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <FaFolderOpen className="text-[#ff7b00]" />
                <span>Case Study Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                    Client / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={client}
                    onChange={(e) => handleClientChange(e.target.value)}
                    placeholder="e.g. Tim Hortons"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white placeholder-gray-500 text-sm font-semibold focus:outline-none focus:border-[#ff7b00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                    Case Study Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Tim Hortons India Launch"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white placeholder-gray-500 text-sm font-semibold focus:outline-none focus:border-[#ff7b00]"
                  />
                </div>
              </div>

              {/* Slug URL */}
              <div className="pt-2">
                <span className="text-xs font-mono text-gray-400 font-semibold block mb-1">
                  URL Slug:
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-500">/case-studies/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setIsSlugManual(true);
                      setSlug(e.target.value);
                    }}
                    placeholder="digital-marketing-case-study-brand"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs font-mono text-[#ff7b00] font-semibold focus:outline-none focus:border-[#ff7b00]"
                  />
                </div>
              </div>

              {/* Services & Breadcrumb */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                    Services Delivered
                  </label>
                  <input
                    type="text"
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    placeholder="e.g. Branding, Graphic Design, Social Media"
                    className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                    Breadcrumb Header Text
                  </label>
                  <input
                    type="text"
                    value={breadcrumbText}
                    onChange={(e) => setBreadcrumbText(e.target.value)}
                    placeholder="e.g. Tim Hortons India Story"
                    className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Hero Media Card */}
            <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <FaImage className="text-[#ff7b00]" />
                <span>Hero & Brand Banners</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Top Banner Image */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold">
                    Top Hero Banner Image
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={bannerFileRef}
                      accept="image/*,.webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadingField("banner");
                          handleFileUpload(file, (url) => {
                            setTopBannerImg(url);
                            setUploadingField(null);
                          });
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => bannerFileRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition flex items-center gap-2 cursor-pointer"
                    >
                      {uploadingField === "banner" ? (
                        <FaCircleNotch className="animate-spin text-xs text-[#ff7b00]" />
                      ) : (
                        <FaUpload className="text-xs text-[#ff7b00]" />
                      )}
                      <span>Upload Banner</span>
                    </button>
                    <input
                      type="text"
                      value={topBannerImg}
                      onChange={(e) => setTopBannerImg(e.target.value)}
                      placeholder="/img/case-studies/...top.webp"
                      className="flex-1 px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                    />
                  </div>
                  {topBannerImg && (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/10 bg-[#0c0a09]">
                      <Image src={getAssetPath(topBannerImg)} alt="Top Banner" fill className="object-cover" />
                    </div>
                  )}
                </div>

                {/* Brand Info Image */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold">
                    Brand Graphic / Product Cutout
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={brandInfoFileRef}
                      accept="image/*,.webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadingField("brandInfo");
                          handleFileUpload(file, (url) => {
                            setBrandInfoImg(url);
                            setUploadingField(null);
                          });
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => brandInfoFileRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition flex items-center gap-2 cursor-pointer"
                    >
                      {uploadingField === "brandInfo" ? (
                        <FaCircleNotch className="animate-spin text-xs text-[#ff7b00]" />
                      ) : (
                        <FaUpload className="text-xs text-[#ff7b00]" />
                      )}
                      <span>Upload Graphic</span>
                    </button>
                    <input
                      type="text"
                      value={brandInfoImg}
                      onChange={(e) => setBrandInfoImg(e.target.value)}
                      placeholder="/img/case-studies/...cup.webp"
                      className="flex-1 px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                    />
                  </div>
                  {brandInfoImg && (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/10 bg-[#0c0a09]">
                      <Image src={getAssetPath(brandInfoImg)} alt="Brand Info" fill className="object-contain" />
                    </div>
                  )}
                </div>
              </div>

              {/* Story Video URL (Optional) */}
              <div className="pt-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                  Story Video URL (Optional mp4 / YouTube)
                </label>
                <input
                  type="text"
                  value={storyVideoUrl}
                  onChange={(e) => setStoryVideoUrl(e.target.value)}
                  placeholder="e.g. https://www.youtube.com/watch?v=... or /video/campaign.mp4"
                  className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                />
              </div>
            </div>

            {/* 3. Description Paragraphs */}
            <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white">Story Narrative & Brand Background</h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Add narrative paragraphs describing the challenge, strategy, and execution.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addParagraph}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] border border-white/10 text-xs font-semibold text-gray-300 transition cursor-pointer"
                >
                  <FaPlus className="text-[10px]" />
                  <span>Add Paragraph</span>
                </button>
              </div>

              <div className="space-y-3">
                {description.map((para, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <span className="text-xs font-mono text-gray-500 pt-3 w-5">#{idx + 1}</span>
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => updateParagraph(idx, e.target.value)}
                      placeholder={`Paragraph #${idx + 1} narrative...`}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00] transition"
                    />
                    <button
                      type="button"
                      onClick={() => removeParagraph(idx)}
                      className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition mt-1 cursor-pointer"
                      title="Remove Paragraph"
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Performance Metrics / Stats Card */}
            <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <FaChartLine className="text-[#ff7b00]" />
                    <span>Campaign Results & Key Stats</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Showcase key quantitative metrics (e.g. Reach, ROAS, Engagements, Direct Bookings).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addStat}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] border border-white/10 text-xs font-semibold text-gray-300 transition cursor-pointer"
                >
                  <FaPlus className="text-[10px]" />
                  <span>Add Metric</span>
                </button>
              </div>

              <div className="space-y-3">
                {stats.map((st, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-3 items-center p-3 rounded-xl bg-[#16110f] border border-white/5">
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => updateStat(idx, "label", e.target.value)}
                      placeholder="Metric Label (e.g. Total Reach)"
                      className="flex-1 w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                    />
                    <input
                      type="text"
                      value={st.value}
                      onChange={(e) => updateStat(idx, "value", e.target.value)}
                      placeholder="Result Value (e.g. 5M+ or 120%)"
                      className="w-full sm:w-48 px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs font-mono font-bold text-[#ff7b00] placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                    />
                    <button
                      type="button"
                      onClick={() => removeStat(idx)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition cursor-pointer"
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Creative Showcase Grid Sections */}
            <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <FaImage className="text-[#ff7b00]" />
                    <span>Creative Visual Showcase Grids</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Build multi-row visual grids with 1-column full width, 2-column split, or 3-column triple cards.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => addGridSection("grid-1")}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] border border-white/10 text-xs font-semibold text-gray-300 transition cursor-pointer"
                  >
                    + 1 Col
                  </button>
                  <button
                    type="button"
                    onClick={() => addGridSection("grid-2")}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] border border-white/10 text-xs font-semibold text-gray-300 transition cursor-pointer"
                  >
                    + 2 Col
                  </button>
                  <button
                    type="button"
                    onClick={() => addGridSection("grid-3")}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] border border-white/10 text-xs font-semibold text-gray-300 transition cursor-pointer"
                  >
                    + 3 Col
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {creativeGrid.map((sec, secIdx) => (
                  <div key={secIdx} className="p-4 rounded-xl bg-[#16110f] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-400 border-b border-white/10 pb-2">
                      <div className="flex items-center gap-2 font-mono uppercase text-[#ff7b00] font-bold">
                        <span>Row #{secIdx + 1} ({sec.layout})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={sec.layout}
                          onChange={(e) => updateGridSectionLayout(secIdx, e.target.value)}
                          className="px-2 py-1 rounded bg-[#120e0d] border border-white/10 text-xs text-white cursor-pointer"
                        >
                          <option value="grid-1">1 Column (Full Width)</option>
                          <option value="grid-2">2 Columns (Split)</option>
                          <option value="grid-3">3 Columns (Triple)</option>
                        </select>

                        <button
                          type="button"
                          disabled={secIdx === 0}
                          onClick={() => moveGridSection(secIdx, "up")}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 border border-white/10 cursor-pointer"
                          title="Move Up"
                        >
                          <FaArrowUp className="text-[10px]" />
                        </button>
                        <button
                          type="button"
                          disabled={secIdx === creativeGrid.length - 1}
                          onClick={() => moveGridSection(secIdx, "down")}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 border border-white/10 cursor-pointer"
                          title="Move Down"
                        >
                          <FaArrowDown className="text-[10px]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeGridSection(secIdx)}
                          className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 cursor-pointer"
                          title="Delete Row"
                        >
                          <FaTrashCan className="text-[10px]" />
                        </button>
                      </div>
                    </div>

                    {/* Image slots */}
                    <div className={`grid gap-3 ${sec.layout === "grid-1" ? "grid-cols-1" : sec.layout === "grid-2" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
                      {sec.images.map((img, imgIdx) => (
                        <div key={imgIdx} className="space-y-2 p-3 rounded-xl bg-[#120e0d] border border-white/5">
                          <span className="text-[10px] font-mono text-gray-500 block">Image #{imgIdx + 1}</span>
                          <div className="flex gap-2">
                            <label className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition flex items-center justify-center cursor-pointer">
                              <FaUpload className="text-[#ff7b00]" />
                              <input
                                type="file"
                                accept="image/*,.webp"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleFileUpload(file, (url) => {
                                      updateGridImage(secIdx, imgIdx, "src", url);
                                    });
                                  }
                                }}
                              />
                            </label>
                            <input
                              type="text"
                              value={img.src}
                              onChange={(e) => updateGridImage(secIdx, imgIdx, "src", e.target.value)}
                              placeholder="/img/case-studies/...webp"
                              className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#0c0a09] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                            />
                          </div>

                          <input
                            type="text"
                            value={img.alt || ""}
                            onChange={(e) => updateGridImage(secIdx, imgIdx, "alt", e.target.value)}
                            placeholder="Alt text description"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0c0a09] border border-white/10 text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                          />

                          {img.src && (
                            <div className="relative w-full h-24 rounded-lg overflow-hidden border border-white/10 bg-[#0c0a09]">
                              <Image src={getAssetPath(img.src)} alt={img.alt || "Preview"} fill className="object-contain" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Campaign Quote */}
            <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FaQuoteLeft className="text-[#ff7b00]" />
                <span>Standout Strategy Quote</span>
              </h2>
              <textarea
                rows={2}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="e.g. A strong branding campaign connects with diverse audiences through tailored messages."
                className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-sm text-gray-200 italic placeholder-gray-500 focus:outline-none focus:border-[#ff7b00] transition"
              />
            </div>
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Status Card */}
            <div className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-white/10 pb-3">
                Publication Status
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus("published")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    status === "published"
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  Published
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("draft")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    status === "draft"
                      ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-lg"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>

            {/* SEO & Meta Settings */}
            <div className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-white/10 pb-3">
                SEO & Meta Settings
              </h3>

              <div>
                <label className="block text-xs font-mono text-gray-400 font-semibold mb-1.5">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={title || "SEO optimized title..."}
                  className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 font-semibold mb-1.5">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Concise overview for search engines and social share previews..."
                  className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
