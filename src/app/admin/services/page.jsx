"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FaWrench,
  FaPlus,
  FaEye,
  FaLaptopCode,
  FaPalette,
  FaBullhorn,
  FaVideo,
  FaRobot,
  FaGear,
  FaTrashCan,
  FaPenToSquare,
  FaMagnifyingGlass,
  FaCircleNotch,
  FaXmark,
  FaLayerGroup,
  FaArrowUpRightFromSquare,
  FaFolderTree,
} from "react-icons/fa6";

const ICONS_MAP = {
  robot: FaRobot,
  bullhorn: FaBullhorn,
  palette: FaPalette,
  "laptop-code": FaLaptopCode,
  video: FaVideo,
  wrench: FaWrench,
  gear: FaGear,
};

export default function AdminServicesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal states
  const [showAddMainModal, setShowAddMainModal] = useState(false);
  const [showAddSubModal, setShowAddSubModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // New Main Service Form
  const [mainName, setMainName] = useState("");
  const [mainSlug, setMainSlug] = useState("");
  const [isMainSlugManual, setIsMainSlugManual] = useState(false);
  const [mainDescription, setMainDescription] = useState("");
  const [mainIcon, setMainIcon] = useState("robot");

  // New Sub-Service Form
  const [subTargetCatSlug, setSubTargetCatSlug] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [subSlug, setSubSlug] = useState("");
  const [isSubSlugManual, setIsSubSlugManual] = useState(false);
  const [subDescription, setSubDescription] = useState("");
  const [subMetaTitle, setSubMetaTitle] = useState("");
  const [subMetaDesc, setSubMetaDesc] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type: 'category' | 'sub', catSlug, subSlug, name }

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/services/", window.location.origin);
      if (search) url.searchParams.set("search", search);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setCategories(data.data);
      }
    } catch (e) {
      console.error("Fetch services error:", e);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServices();
    }, 200);
    return () => clearTimeout(timer);
  }, [fetchServices]);

  // Handle auto slug for main service
  const handleMainNameChange = (val) => {
    setMainName(val);
    if (!isMainSlugManual) {
      setMainSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      );
    }
  };

  // Handle auto slug for sub service
  const handleSubTitleChange = (val) => {
    setSubTitle(val);
    if (!isSubSlugManual) {
      setSubSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      );
    }
  };

  // Create Main Service
  const handleCreateMainService = async (e) => {
    e.preventDefault();
    if (!mainName.trim()) return;

    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await fetch("/api/admin/services/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: mainName.trim(),
          slug: mainSlug.trim() || undefined,
          description: mainDescription.trim(),
          icon: mainIcon,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create main service");
      }

      setFeedback({ type: "success", message: `Main service "${mainName}" created successfully!` });
      setShowAddMainModal(false);
      setMainName("");
      setMainSlug("");
      setIsMainSlugManual(false);
      setMainDescription("");
      fetchServices();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create Sub-Service
  const handleCreateSubService = async (e) => {
    e.preventDefault();
    if (!subTargetCatSlug || !subTitle.trim()) return;

    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await fetch(`/api/admin/services/${subTargetCatSlug}/sub-services/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: subTitle.trim(),
          slug: subSlug.trim() || undefined,
          description: subDescription.trim(),
          metaTitle: subMetaTitle.trim(),
          metaDescription: subMetaDesc.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add sub-service");
      }

      setFeedback({ type: "success", message: `Sub-service "${subTitle}" added successfully!` });
      setShowAddSubModal(false);
      setSubTitle("");
      setSubSlug("");
      setIsSubSlugManual(false);
      setSubDescription("");
      setSubMetaTitle("");
      setSubMetaDesc("");
      fetchServices();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Action Execution
  const executeDelete = async () => {
    if (!deleteConfirm) return;
    setIsSubmitting(true);

    try {
      if (deleteConfirm.type === "category") {
        const res = await fetch(`/api/admin/services/${deleteConfirm.catSlug}/`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        setFeedback({ type: "success", message: `Category "${deleteConfirm.name}" deleted.` });
      } else if (deleteConfirm.type === "sub") {
        const res = await fetch(
          `/api/admin/services/${deleteConfirm.catSlug}/sub-services/?subSlug=${deleteConfirm.subSlug}`,
          { method: "DELETE" }
        );
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        setFeedback({ type: "success", message: `Sub-service "${deleteConfirm.name}" removed.` });
      }
      setDeleteConfirm(null);
      fetchServices();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSubServices = categories.reduce(
    (acc, cat) => acc + (cat.subServices ? cat.subServices.length : 0),
    0
  );

  const getCategoryIcon = (iconName, slug = "") => {
    if (iconName && ICONS_MAP[iconName]) {
      const IconComp = ICONS_MAP[iconName];
      return <IconComp className="text-[#ff7b00]" />;
    }
    if (slug.includes("ai")) return <FaRobot className="text-[#ff7b00]" />;
    if (slug.includes("digital")) return <FaBullhorn className="text-amber-500" />;
    if (slug.includes("design")) return <FaPalette className="text-purple-400" />;
    if (slug.includes("web")) return <FaLaptopCode className="text-sky-400" />;
    return <FaVideo className="text-rose-400" />;
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff7b00] uppercase tracking-wider mb-1 font-bold">
            <span>Website CMS</span>
            <span>•</span>
            <span>Services & Pillars</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <FaWrench className="text-[#ff7b00]" />
            Services & Expertise
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your {categories.length} core pillars and {totalSubServices} specialized sub-services.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => {
              if (categories.length > 0) {
                setSubTargetCatSlug(categories[0].slug);
              }
              setShowAddSubModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-semibold text-xs transition cursor-pointer"
          >
            <FaPlus className="text-xs text-[#ff7b00]" />
            <span>+ Add Sub-Service</span>
          </button>

          <button
            onClick={() => setShowAddMainModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7b00] hover:bg-[#e06d00] text-white font-semibold text-sm transition shadow-lg shadow-[#ff7b00]/25 cursor-pointer"
          >
            <FaPlus className="text-xs" />
            <span>+ Add Main Service</span>
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

      {/* Metrics Summary Bar & Search */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#140f0d] border border-white/10 text-xs">
            <span className="font-mono text-gray-400 uppercase font-bold">Main Pillars:</span>
            <span className="font-mono font-bold text-white text-sm">{categories.length}</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#140f0d] border border-white/10 text-xs">
            <span className="font-mono text-gray-400 uppercase font-bold">Sub-Services:</span>
            <span className="font-mono font-bold text-[#ff7b00] text-sm">{totalSubServices}</span>
          </div>
        </div>

        <div className="md:col-span-4 relative">
          <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service pillars or sub-services..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#140f0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
          />
        </div>
      </div>

      {/* Main Services Categories Cards */}
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center gap-3">
          <FaCircleNotch className="text-3xl text-[#ff7b00] animate-spin" />
          <span className="text-xs font-mono text-gray-400">Loading services catalog...</span>
        </div>
      ) : categories.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#140f0d] border border-white/10 text-center space-y-3">
          <FaLayerGroup className="text-4xl text-gray-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No services found</h3>
          <p className="text-xs text-gray-400">Try adjusting your search query or add a new main service pillar.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => (
            <div
              key={cat.slug || cat._id}
              className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4 transition hover:border-white/20"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shadow-lg">
                    {getCategoryIcon(cat.icon, cat.slug)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-white tracking-wide">{cat.name}</h2>
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#ff7b00] uppercase font-bold">
                        /{cat.slug}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {cat.subServices ? cat.subServices.length : 0} specialized offerings
                      {cat.description ? ` • ${cat.description}` : ""}
                    </p>
                  </div>
                </div>

                {/* Category Actions */}
                <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                  <Link
                    href={`/admin/services/edit/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-200 hover:text-white border border-white/10 text-xs font-semibold transition cursor-pointer"
                    title="Edit Main Service Details"
                  >
                    <FaPenToSquare className="text-[11px] text-[#ff7b00]" />
                    <span>Edit Pillar</span>
                  </Link>

                  <button
                    onClick={() => {
                      setSubTargetCatSlug(cat.slug);
                      setShowAddSubModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] border border-white/10 text-xs font-semibold text-gray-300 transition cursor-pointer"
                  >
                    <FaPlus className="text-[10px]" />
                    <span>Add Sub-Service</span>
                  </button>

                  <Link
                    href={`/our-expertise/${cat.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white text-xs transition"
                    title="View public category page"
                  >
                    <FaArrowUpRightFromSquare className="text-[11px]" />
                  </Link>

                  <button
                    onClick={() =>
                      setDeleteConfirm({
                        type: "category",
                        catSlug: cat.slug,
                        name: cat.name,
                      })
                    }
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs transition cursor-pointer"
                    title="Delete Category"
                  >
                    <FaTrashCan className="text-[11px]" />
                  </button>
                </div>
              </div>

              {/* Sub-Services Grid */}
              {cat.subServices && cat.subServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {cat.subServices.map((sub, sIdx) => (
                    <div
                      key={sub.slug || sIdx}
                      className="p-3.5 rounded-xl bg-[#120e0d] border border-white/5 hover:border-white/15 hover:bg-white/[0.03] transition flex items-center justify-between group"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff7b00]" />
                          <p className="text-sm font-semibold text-gray-200 truncate">{sub.title}</p>
                        </div>
                        <p className="text-[11px] text-gray-500 font-mono truncate pl-3.5 mt-0.5">
                          /{cat.slug}/{sub.slug}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                        <Link
                          href={`/our-expertise/${cat.slug}/${sub.slug}`}
                          target="_blank"
                          className="p-1.5 text-gray-400 hover:text-white transition"
                          title="View public sub-service"
                        >
                          <FaEye className="text-xs" />
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteConfirm({
                              type: "sub",
                              catSlug: cat.slug,
                              subSlug: sub.slug,
                              name: sub.title,
                            })
                          }
                          className="p-1.5 text-gray-500 hover:text-red-400 transition cursor-pointer"
                          title="Remove sub-service"
                        >
                          <FaTrashCan className="text-xs" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#120e0d] border border-dashed border-white/10 text-center text-xs text-gray-500">
                  No sub-services yet. Click &quot;+ Add Sub-Service&quot; to create one.
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal 1: Add Main Service */}
      {showAddMainModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#140f0d] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FaFolderTree className="text-[#ff7b00]" />
                <h3 className="text-base font-bold text-white">Add Main Service Pillar</h3>
              </div>
              <button
                onClick={() => setShowAddMainModal(false)}
                className="p-1 text-gray-400 hover:text-white rounded-lg"
              >
                <FaXmark className="text-base" />
              </button>
            </div>

            <form onSubmit={handleCreateMainService} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                  Main Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={mainName}
                  onChange={(e) => handleMainNameChange(e.target.value)}
                  placeholder="e.g. AI Excellence or Design or Digital"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white placeholder-gray-500 text-sm font-semibold focus:outline-none focus:border-[#ff7b00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1">
                  URL Slug:
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-500">/our-expertise/</span>
                  <input
                    type="text"
                    value={mainSlug}
                    onChange={(e) => {
                      setIsMainSlugManual(true);
                      setMainSlug(e.target.value);
                    }}
                    placeholder="e.g. ai-excellence or design or digital"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs font-mono text-[#ff7b00] font-semibold focus:outline-none focus:border-[#ff7b00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                  Pillar Icon
                </label>
                <select
                  value={mainIcon}
                  onChange={(e) => setMainIcon(e.target.value)}
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

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={mainDescription}
                  onChange={(e) => setMainDescription(e.target.value)}
                  placeholder="Short overview of what this main service pillar encompasses..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddMainModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !mainName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#ff7b00] hover:bg-[#e06d00] text-white font-bold text-xs transition shadow-lg shadow-[#ff7b00]/25 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? <FaCircleNotch className="animate-spin text-xs" /> : <FaPlus className="text-xs" />}
                  <span>Save Main Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Add Sub-Service */}
      {showAddSubModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#140f0d] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FaPlus className="text-[#ff7b00]" />
                <h3 className="text-base font-bold text-white">Add New Sub-Service</h3>
              </div>
              <button
                onClick={() => setShowAddSubModal(false)}
                className="p-1 text-gray-400 hover:text-white rounded-lg"
              >
                <FaXmark className="text-base" />
              </button>
            </div>

            <form onSubmit={handleCreateSubService} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                  Parent Main Service Pillar *
                </label>
                <select
                  required
                  value={subTargetCatSlug}
                  onChange={(e) => setSubTargetCatSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-xs font-semibold text-white focus:outline-none focus:border-[#ff7b00]"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name} (/{c.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                  Sub-Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={subTitle}
                  onChange={(e) => handleSubTitleChange(e.target.value)}
                  placeholder="e.g. AI Video Production or Generative AI"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white placeholder-gray-500 text-sm font-semibold focus:outline-none focus:border-[#ff7b00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1">
                  URL Slug:
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-500">/{subTargetCatSlug}/</span>
                  <input
                    type="text"
                    value={subSlug}
                    onChange={(e) => {
                      setIsSubSlugManual(true);
                      setSubSlug(e.target.value);
                    }}
                    placeholder="ai-video-production"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs font-mono text-[#ff7b00] font-semibold focus:outline-none focus:border-[#ff7b00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                  Description / Service Summary
                </label>
                <textarea
                  rows={3}
                  value={subDescription}
                  onChange={(e) => setSubDescription(e.target.value)}
                  placeholder="Brief description of this offering..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-mono text-gray-400 font-semibold mb-1">
                    Meta Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={subMetaTitle}
                    onChange={(e) => setSubMetaTitle(e.target.value)}
                    placeholder="SEO Title | Digital Latte"
                    className="w-full px-3 py-1.5 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-gray-400 font-semibold mb-1">
                    Meta Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={subMetaDesc}
                    onChange={(e) => setSubMetaDesc(e.target.value)}
                    placeholder="Search snippet summary..."
                    className="w-full px-3 py-1.5 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddSubModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !subTitle.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#ff7b00] hover:bg-[#e06d00] text-white font-bold text-xs transition shadow-lg shadow-[#ff7b00]/25 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? <FaCircleNotch className="animate-spin text-xs" /> : <FaPlus className="text-xs" />}
                  <span>Add Sub-Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#140f0d] border border-white/10 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-white">Confirm Deletion</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Are you sure you want to delete{" "}
              <strong className="text-white">&quot;{deleteConfirm.name}&quot;</strong>?
              {deleteConfirm.type === "category" &&
                " All sub-services under this category will also be removed."}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={executeDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition shadow-lg shadow-red-600/25 flex items-center gap-2"
              >
                {isSubmitting && <FaCircleNotch className="animate-spin text-xs" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
