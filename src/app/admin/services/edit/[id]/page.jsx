"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaArrowLeft,
  FaFloppyDisk,
  FaUpload,
  FaTrashCan,
  FaPlus,
  FaCheck,
  FaCircleNotch,
  FaFolderOpen,
  FaImage,
  FaArrowUpRightFromSquare,
  FaRobot,
  FaBullhorn,
  FaPalette,
  FaLaptopCode,
  FaVideo,
  FaWrench,
  FaGear,
  FaFileLines,
  FaLayerGroup,
  FaUsers,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";
import { getAssetPath } from "@/utils/assetPath";

const ICONS_MAP = {
  robot: FaRobot,
  bullhorn: FaBullhorn,
  palette: FaPalette,
  "laptop-code": FaLaptopCode,
  video: FaVideo,
  wrench: FaWrench,
  gear: FaGear,
};

export default function AdminEditMainServicePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [isLoading, setIsLoading] = useState(true);

  // Main Category Details
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("wrench");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("published");

  // Hero Section
  const [heroHeading, setHeroHeading] = useState("");
  const [heroImage, setHeroImage] = useState("");

  // Bio / Narrative Section
  const [bioTitle, setBioTitle] = useState("");
  const [bioParagraphs, setBioParagraphs] = useState([""]);

  // Beyond [Category] Section
  const [beyondTitle, setBeyondTitle] = useState("BEYOND DIGITAL");
  const [beyondCards, setBeyondCards] = useState([
    {
      category: "",
      title: "",
      description: "",
      image: "",
      col1: [],
      col2: [],
    },
  ]);

  // Our Clients Section
  const [clientsTitle, setClientsTitle] = useState("OUR CLIENTS");
  const [showClients, setShowClients] = useState(true);

  // Sub-Services
  const [subServices, setSubServices] = useState([]);
  const [newSubTitle, setNewSubTitle] = useState("");
  const [newSubDesc, setNewSubDesc] = useState("");
  const [showAddSubInline, setShowAddSubInline] = useState(false);

  // SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [uploadingField, setUploadingField] = useState(false);
  const [activeBeyondCardTab, setActiveBeyondCardTab] = useState(0);

  const heroFileRef = useRef(null);

  // Load existing main service category
  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/admin/services/${id}/`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to load service category");
        }

        const cat = data.category || data.data;
        if (!cat) throw new Error("Category data not found");

        setName(cat.name || "");
        setSlug(cat.slug || "");
        setIcon(cat.icon || "wrench");
        setDescription(cat.description || "");
        setStatus(cat.status || "published");

        setHeroHeading(cat.heroHeading || "");
        setHeroImage(cat.heroImage || "");

        setBioTitle(cat.bioTitle || "");
        if (Array.isArray(cat.bioParagraphs) && cat.bioParagraphs.length > 0) {
          setBioParagraphs(cat.bioParagraphs);
        } else {
          setBioParagraphs([""]);
        }

        setBeyondTitle(cat.beyondTitle || `BEYOND ${(cat.name || "").toUpperCase()}`);
        if (Array.isArray(cat.beyondCards) && cat.beyondCards.length > 0) {
          setBeyondCards(
            cat.beyondCards.map((c) => ({
              category: c.category || "",
              title: c.title || "",
              description: c.description || "",
              image: c.image || "",
              col1: Array.isArray(c.col1) ? c.col1 : [],
              col2: Array.isArray(c.col2) ? c.col2 : [],
            }))
          );
        } else {
          setBeyondCards([]);
        }

        setClientsTitle(cat.clientsTitle || "OUR CLIENTS");
        setShowClients(cat.showClients !== undefined ? cat.showClients : true);

        setSubServices(Array.isArray(cat.subServices) ? cat.subServices : []);
        setMetaTitle(cat.metaTitle || "");
        setMetaDescription(cat.metaDescription || "");
      } catch (err) {
        setFeedback({ type: "error", message: err.message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

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
  const addParagraph = () => setBioParagraphs((prev) => [...prev, ""]);
  const updateParagraph = (index, val) => {
    setBioParagraphs((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };
  const removeParagraph = (index) => {
    setBioParagraphs((prev) => prev.filter((_, i) => i !== index));
  };

  // Beyond Cards helpers
  const addBeyondCard = () => {
    const newCard = {
      category: "",
      title: "New Pillar",
      description: "",
      image: "",
      col1: [],
      col2: [],
    };
    setBeyondCards((prev) => [...prev, newCard]);
    setActiveBeyondCardTab(beyondCards.length);
  };

  const removeBeyondCard = (index) => {
    if (!confirm("Are you sure you want to remove this Beyond card?")) return;
    setBeyondCards((prev) => prev.filter((_, i) => i !== index));
    if (activeBeyondCardTab >= index && activeBeyondCardTab > 0) {
      setActiveBeyondCardTab(activeBeyondCardTab - 1);
    }
  };

  const updateBeyondCardField = (cardIdx, field, val) => {
    setBeyondCards((prev) => {
      const copy = [...prev];
      copy[cardIdx] = { ...copy[cardIdx], [field]: val };
      return copy;
    });
  };

  const addBeyondSubLink = (cardIdx, colKey) => {
    setBeyondCards((prev) => {
      const copy = [...prev];
      const col = copy[cardIdx][colKey] ? [...copy[cardIdx][colKey]] : [];
      col.push({ title: "New Link", slug: "sub-slug" });
      copy[cardIdx] = { ...copy[cardIdx], [colKey]: col };
      return copy;
    });
  };

  const updateBeyondSubLink = (cardIdx, colKey, linkIdx, field, val) => {
    setBeyondCards((prev) => {
      const copy = [...prev];
      const col = [...(copy[cardIdx][colKey] || [])];
      col[linkIdx] = { ...col[linkIdx], [field]: val };
      copy[cardIdx] = { ...copy[cardIdx], [colKey]: col };
      return copy;
    });
  };

  const removeBeyondSubLink = (cardIdx, colKey, linkIdx) => {
    setBeyondCards((prev) => {
      const copy = [...prev];
      const col = [...(copy[cardIdx][colKey] || [])].filter((_, i) => i !== linkIdx);
      copy[cardIdx] = { ...copy[cardIdx], [colKey]: col };
      return copy;
    });
  };

  // Inline Sub-service Add helper
  const handleAddInlineSubService = async (e) => {
    e.preventDefault();
    if (!newSubTitle.trim()) return;

    try {
      const res = await fetch(`/api/admin/services/${id}/sub-services/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newSubTitle.trim(),
          description: newSubDesc.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add sub-service");
      }

      setSubServices(data.data?.subServices || []);
      setNewSubTitle("");
      setNewSubDesc("");
      setShowAddSubInline(false);
      setFeedback({ type: "success", message: "Sub-service added!" });
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    }
  };

  // Inline Sub-service Remove helper
  const handleRemoveSubService = async (subSlug) => {
    if (!confirm(`Are you sure you want to delete this sub-service?`)) return;

    try {
      const res = await fetch(`/api/admin/services/${id}/sub-services/?subSlug=${subSlug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setSubServices((prev) => prev.filter((s) => s.slug !== subSlug));
      setFeedback({ type: "success", message: "Sub-service removed!" });
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    }
  };

  // Save all changes
  const handleSubmit = async (targetStatus = status) => {
    if (!name.trim()) {
      setFeedback({ type: "error", message: "Main service name is required." });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      const cleanedParagraphs = bioParagraphs.filter((p) => p && p.trim().length > 0);

      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        icon,
        description: description.trim(),
        heroHeading: heroHeading.trim(),
        heroImage: heroImage.trim(),
        bioTitle: bioTitle.trim(),
        bioParagraphs: cleanedParagraphs,
        beyondTitle: beyondTitle.trim() || `BEYOND ${name.trim().toUpperCase()}`,
        beyondCards,
        clientsTitle: clientsTitle.trim() || "OUR CLIENTS",
        showClients,
        metaTitle: metaTitle.trim() || `${name.trim()} | Digital Latte`,
        metaDescription: metaDescription.trim() || description.trim() || "",
        status: targetStatus,
      };

      const res = await fetch(`/api/admin/services/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update service category");
      }

      setStatus(targetStatus);
      setFeedback({
        type: "success",
        message: `Main service "${name}" updated successfully! Changes are live.`,
      });

      // Update URL if slug was changed
      if (data.category?.slug && data.category.slug !== id) {
        window.history.replaceState(null, "", `/admin/services/edit/${data.category.slug}`);
      }
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <FaCircleNotch className="text-3xl text-[#ff7b00] animate-spin" />
        <span className="text-sm font-mono text-gray-400">Loading service details...</span>
      </div>
    );
  }

  const IconComp = ICONS_MAP[icon] || FaWrench;

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/services"
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition shadow-lg cursor-pointer"
          >
            <FaArrowLeft className="text-sm" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff7b00] uppercase tracking-wider mb-1 font-bold">
              <span>CMS</span>
              <span>•</span>
              <span>Edit Main Service Pillar</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <IconComp className="text-[#ff7b00]" />
              <span>{name || "Edit Service Category"}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          {slug && (
            <Link
              href={`/our-expertise/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-[#ff7b00] font-semibold text-xs transition shadow-lg"
            >
              <FaArrowUpRightFromSquare className="text-xs" />
              <span>View Public Page</span>
            </Link>
          )}

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
            <span>Save All Changes</span>
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 cols: Form Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Basic Details Card */}
          <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <FaFolderOpen className="text-[#ff7b00]" />
              <span>Main Service Pillar Info</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                  Service Pillar Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Digital Services or AI Excellence"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white placeholder-gray-500 text-sm font-semibold focus:outline-none focus:border-[#ff7b00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                  Pillar Icon
                </label>
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-xs font-semibold text-white focus:outline-none focus:border-[#ff7b00]"
                >
                  <option value="robot">🤖 Robot (AI / Emerging Tech)</option>
                  <option value="bullhorn">📢 Bullhorn (Digital / Marketing / SMM)</option>
                  <option value="palette">🎨 Palette (Design / Branding / UI)</option>
                  <option value="laptop-code">💻 Laptop Code (Web & App Development)</option>
                  <option value="video">🎬 Video (Production & Films)</option>
                  <option value="wrench">🔧 Wrench (Strategy & Consulting)</option>
                </select>
              </div>
            </div>

            {/* Slug URL */}
            <div className="pt-2">
              <span className="text-xs font-mono text-gray-400 font-semibold block mb-1">
                URL Slug:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-500">/our-expertise/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="digital-services"
                  className="flex-1 px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs font-mono text-[#ff7b00] font-semibold focus:outline-none focus:border-[#ff7b00]"
                />
              </div>
            </div>

            {/* Short overview description */}
            <div className="pt-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                Overview Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of what this core service pillar represents..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
              />
            </div>
          </div>

          {/* 2. Hero Banner & Right-Side Illustration (Screenshot 3) */}
          <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <FaImage className="text-[#ff7b00]" />
              <span>Hero Header Banner &amp; Right-Side Background Illustration</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                  Hero Big Headline
                </label>
                <textarea
                  rows={2}
                  value={heroHeading}
                  onChange={(e) => setHeroHeading(e.target.value)}
                  placeholder="e.g. <span class='font-bold'>WE BREW IDEAS</span> THAT CONNECT BRANDS..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white placeholder-gray-500 text-sm font-semibold focus:outline-none focus:border-[#ff7b00]"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Tip: Use HTML tags like <code>&lt;span class=&quot;font-bold&quot;&gt;Bold Words&lt;/span&gt;</code> and <code>&lt;br /&gt;</code> for custom multi-line bold treatment.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                  Right-Side Background Illustration (Desktop &amp; Mobile)
                </label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={heroFileRef}
                    accept="image/*,.webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploadingField(true);
                        handleFileUpload(file, (url) => {
                          setHeroImage(url);
                          setUploadingField(false);
                        });
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => heroFileRef.current?.click()}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition flex items-center gap-2 cursor-pointer"
                  >
                    {uploadingField ? (
                      <FaCircleNotch className="animate-spin text-xs text-[#ff7b00]" />
                    ) : (
                      <FaUpload className="text-xs text-[#ff7b00]" />
                    )}
                    <span>Upload Image</span>
                  </button>
                  <input
                    type="text"
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    placeholder="/img/services/brain-bg.webp"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                  />
                </div>
                {heroImage && (
                  <div className="relative w-full h-44 mt-3 rounded-xl overflow-hidden border border-white/10 bg-[#ececec] flex items-center justify-end p-4">
                    <div className="relative w-1/2 h-full">
                      <Image
                        src={getAssetPath(heroImage)}
                        alt="Hero Right-Side Illustration Preview"
                        fill
                        className="object-contain object-right-bottom"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3. Narrative & Bio Description Section */}
          <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FaFileLines className="text-[#ff7b00]" />
                  <span>Story &amp; Narrative Bio Section</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  The central descriptive narrative that introduces this pillar on the public page.
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

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                Bio Section Title / Heading
              </label>
              <input
                type="text"
                value={bioTitle}
                onChange={(e) => setBioTitle(e.target.value)}
                placeholder="e.g. We Craft Digital Experiences That's What We Do!"
                className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white placeholder-gray-500 text-sm font-semibold focus:outline-none focus:border-[#ff7b00]"
              />
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono text-gray-400 uppercase font-bold block">
                Bio Narrative Paragraphs:
              </span>
              {bioParagraphs.map((para, idx) => (
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

          {/* 4. Beyond [Category] Section Editor (Screenshot 1) */}
          <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FaLayerGroup className="text-[#ff7b00]" />
                  <span>&quot;Beyond [Pillar]&quot; Interactive 3-Card Showcase (Screenshot 1)</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  The 3 pillar cross-link cards shown at the bottom of the service page.
                </p>
              </div>
              <button
                type="button"
                onClick={addBeyondCard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] border border-white/10 text-xs font-semibold text-gray-300 transition cursor-pointer"
              >
                <FaPlus className="text-[10px]" />
                <span>Add Card</span>
              </button>
            </div>

            {/* Section Title */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                Beyond Section Title Heading
              </label>
              <input
                type="text"
                value={beyondTitle}
                onChange={(e) => setBeyondTitle(e.target.value)}
                placeholder="e.g. BEYOND DIGITAL"
                className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white placeholder-gray-500 text-sm font-semibold focus:outline-none focus:border-[#ff7b00]"
              />
            </div>

            {/* Beyond Cards Tab Navigation */}
            {beyondCards.length > 0 && (
              <div className="pt-2">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
                  {beyondCards.map((card, cIdx) => (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => setActiveBeyondCardTab(cIdx)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                        activeBeyondCardTab === cIdx
                          ? "bg-[#ff7b00] text-white"
                          : "bg-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      <span>Card #{cIdx + 1}: {card.title || "Untitled"}</span>
                    </button>
                  ))}
                </div>

                {/* Active Card Form */}
                {beyondCards[activeBeyondCardTab] && (
                  <div className="mt-4 p-4 rounded-xl bg-[#16110f] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#ff7b00] font-bold uppercase">
                        Editing Card #{activeBeyondCardTab + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeBeyondCard(activeBeyondCardTab)}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                      >
                        <FaTrashCan className="text-[10px]" />
                        <span>Delete this card</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                          Card Title (Pillar Name)
                        </label>
                        <input
                          type="text"
                          value={beyondCards[activeBeyondCardTab].title}
                          onChange={(e) =>
                            updateBeyondCardField(activeBeyondCardTab, "title", e.target.value)
                          }
                          placeholder="e.g. Design or Production"
                          className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                          Category Slug Link
                        </label>
                        <input
                          type="text"
                          value={beyondCards[activeBeyondCardTab].category}
                          onChange={(e) =>
                            updateBeyondCardField(activeBeyondCardTab, "category", e.target.value)
                          }
                          placeholder="e.g. design-services or production-services"
                          className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                        />
                      </div>
                    </div>

                    {/* Card Image */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                        Card Background Image (Illustration)
                      </label>
                      <div className="flex gap-2">
                        <label className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition flex items-center gap-2 cursor-pointer">
                          <FaUpload className="text-xs text-[#ff7b00]" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*,.webp"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) {
                                handleFileUpload(f, (url) => {
                                  updateBeyondCardField(activeBeyondCardTab, "image", url);
                                });
                              }
                            }}
                          />
                        </label>
                        <input
                          type="text"
                          value={beyondCards[activeBeyondCardTab].image}
                          onChange={(e) =>
                            updateBeyondCardField(activeBeyondCardTab, "image", e.target.value)
                          }
                          placeholder="/img/services/design-service.webp"
                          className="flex-1 px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                        />
                      </div>
                      {beyondCards[activeBeyondCardTab].image && (
                        <div className="relative w-32 h-32 mt-2 rounded-lg overflow-hidden border border-white/10 bg-neutral-900">
                          <Image
                            src={getAssetPath(beyondCards[activeBeyondCardTab].image)}
                            alt="Beyond card preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* Card Description */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                        Hover Overlay Description
                      </label>
                      <textarea
                        rows={2}
                        value={beyondCards[activeBeyondCardTab].description}
                        onChange={(e) =>
                          updateBeyondCardField(activeBeyondCardTab, "description", e.target.value)
                        }
                        placeholder="Brief summary shown on card hover..."
                        className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                      />
                    </div>

                    {/* Column 1 & Column 2 Sub Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {/* Column 1 */}
                      <div className="p-3 rounded-xl bg-[#120e0d] border border-white/5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-gray-400 uppercase font-bold">
                            Column 1 Sub-Links
                          </span>
                          <button
                            type="button"
                            onClick={() => addBeyondSubLink(activeBeyondCardTab, "col1")}
                            className="text-[10px] text-[#ff7b00] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <FaPlus className="text-[8px]" />
                            <span>Add Link</span>
                          </button>
                        </div>
                        {(beyondCards[activeBeyondCardTab].col1 || []).map((lnk, lIdx) => (
                          <div key={lIdx} className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={lnk.title}
                              onChange={(e) =>
                                updateBeyondSubLink(
                                  activeBeyondCardTab,
                                  "col1",
                                  lIdx,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Title"
                              className="flex-1 px-2 py-1 rounded-lg bg-[#16110f] border border-white/10 text-xs text-white"
                            />
                            <input
                              type="text"
                              value={lnk.slug}
                              onChange={(e) =>
                                updateBeyondSubLink(
                                  activeBeyondCardTab,
                                  "col1",
                                  lIdx,
                                  "slug",
                                  e.target.value
                                )
                              }
                              placeholder="slug"
                              className="w-24 px-2 py-1 rounded-lg bg-[#16110f] border border-white/10 text-[11px] font-mono text-[#ff7b00]"
                            />
                            <button
                              type="button"
                              onClick={() => removeBeyondSubLink(activeBeyondCardTab, "col1", lIdx)}
                              className="p-1.5 text-red-400 hover:text-red-300 text-xs cursor-pointer"
                            >
                              <FaTrashCan />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Column 2 */}
                      <div className="p-3 rounded-xl bg-[#120e0d] border border-white/5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-gray-400 uppercase font-bold">
                            Column 2 Sub-Links
                          </span>
                          <button
                            type="button"
                            onClick={() => addBeyondSubLink(activeBeyondCardTab, "col2")}
                            className="text-[10px] text-[#ff7b00] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <FaPlus className="text-[8px]" />
                            <span>Add Link</span>
                          </button>
                        </div>
                        {(beyondCards[activeBeyondCardTab].col2 || []).map((lnk, lIdx) => (
                          <div key={lIdx} className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={lnk.title}
                              onChange={(e) =>
                                updateBeyondSubLink(
                                  activeBeyondCardTab,
                                  "col2",
                                  lIdx,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Title"
                              className="flex-1 px-2 py-1 rounded-lg bg-[#16110f] border border-white/10 text-xs text-white"
                            />
                            <input
                              type="text"
                              value={lnk.slug}
                              onChange={(e) =>
                                updateBeyondSubLink(
                                  activeBeyondCardTab,
                                  "col2",
                                  lIdx,
                                  "slug",
                                  e.target.value
                                )
                              }
                              placeholder="slug"
                              className="w-24 px-2 py-1 rounded-lg bg-[#16110f] border border-white/10 text-[11px] font-mono text-[#ff7b00]"
                            />
                            <button
                              type="button"
                              onClick={() => removeBeyondSubLink(activeBeyondCardTab, "col2", lIdx)}
                              className="p-1.5 text-red-400 hover:text-red-300 text-xs cursor-pointer"
                            >
                              <FaTrashCan />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 5. Sub-Services Catalog */}
          <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Sub-Services Under This Pillar</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {subServices.length} sub-services configured for this category.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddSubInline(!showAddSubInline)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] border border-white/10 text-xs font-semibold text-gray-300 transition cursor-pointer"
              >
                <FaPlus className="text-[10px]" />
                <span>{showAddSubInline ? "Close Form" : "Add Sub-Service"}</span>
              </button>
            </div>

            {/* Inline Sub-Service Creator */}
            {showAddSubInline && (
              <form
                onSubmit={handleAddInlineSubService}
                className="p-4 rounded-xl bg-[#16110f] border border-[#ff7b00]/30 space-y-3"
              >
                <span className="text-xs font-mono uppercase text-[#ff7b00] font-bold block">
                  Quick Add Sub-Service
                </span>
                <input
                  type="text"
                  required
                  value={newSubTitle}
                  onChange={(e) => setNewSubTitle(e.target.value)}
                  placeholder="Sub-service title (e.g. AI Video Production)"
                  className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                />
                <textarea
                  rows={2}
                  value={newSubDesc}
                  onChange={(e) => setNewSubDesc(e.target.value)}
                  placeholder="Short description of this sub-service..."
                  className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-[#ff7b00] hover:bg-[#e06d00] text-white text-xs font-bold transition cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </form>
            )}

            {/* Sub-Services List */}
            <div className="space-y-2.5">
              {subServices.map((sub, sIdx) => (
                <div
                  key={sub.slug || sIdx}
                  className="p-3.5 rounded-xl bg-[#120e0d] border border-white/5 flex items-center justify-between"
                >
                  <div className="min-w-0 pr-3">
                    <p className="text-sm font-semibold text-gray-200 truncate">{sub.title}</p>
                    <p className="text-[11px] text-gray-500 font-mono">
                      /{slug}/{sub.slug}
                    </p>
                    {sub.description && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{sub.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/our-expertise/${slug}/${sub.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs transition"
                      title="View public sub-service"
                    >
                      <FaArrowUpRightFromSquare className="text-xs" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubService(sub.slug)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition cursor-pointer"
                      title="Delete sub-service"
                    >
                      <FaTrashCan className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 cols: Settings & SEO */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Box */}
          <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff7b00] font-bold">
              Publishing Settings
            </h3>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-sm font-semibold text-white focus:outline-none focus:border-[#ff7b00] cursor-pointer"
              >
                <option value="published">Published (Live On Site)</option>
                <option value="draft">Draft (Hidden)</option>
              </select>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSubmit("published")}
                className="w-full py-3 rounded-xl bg-[#ff7b00] hover:bg-[#e06d00] text-white font-bold text-sm transition shadow-lg shadow-[#ff7b00]/25 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <FaCircleNotch className="animate-spin text-xs" />
                ) : (
                  <FaCheck className="text-xs" />
                )}
                <span>Save All Changes</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSubmit("draft")}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-semibold text-xs transition disabled:opacity-50 cursor-pointer"
              >
                Save as Draft
              </button>
            </div>
          </div>

          {/* Our Clients Section Settings (Screenshot 2) */}
          <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff7b00] font-bold flex items-center gap-2">
              <FaUsers />
              <span>Our Clients Carousel (Screenshot 2)</span>
            </h3>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                Section Heading
              </label>
              <input
                type="text"
                value={clientsTitle}
                onChange={(e) => setClientsTitle(e.target.value)}
                placeholder="OUR CLIENTS"
                className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-xs text-gray-300 font-medium flex items-center gap-1.5">
                {showClients ? (
                  <FaEye className="text-emerald-400 text-xs" />
                ) : (
                  <FaEyeSlash className="text-gray-500 text-xs" />
                )}
                <span>Show on this page</span>
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showClients}
                  onChange={(e) => setShowClients(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff7b00]"></div>
              </label>
            </div>
          </div>

          {/* SEO Box */}
          <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff7b00] font-bold">
              Search Engine Optimization (SEO)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Digital Services & Marketing | Digital Latte"
                  className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Meta Description
                </label>
                <textarea
                  rows={4}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Concise search summary of this core service pillar..."
                  className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
