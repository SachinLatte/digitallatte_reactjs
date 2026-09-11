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
  FaHeading,
  FaParagraph,
  FaImage,
  FaQuoteLeft,
  FaListUl,
  FaEye,
  FaCheck,
  FaCircleNotch,
  FaCircleInfo,
  FaGripVertical,
} from "react-icons/fa6";

export default function AdminNewBlogPage() {
  const router = useRouter();

  // Basic Details
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("Digital Latte Team");
  const [status, setStatus] = useState("published");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [featuredImage, setFeaturedImage] = useState("");
  const [tagsInput, setTagsInput] = useState("Digital Marketing, Trends");

  // SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Content Blocks
  const [blocks, setBlocks] = useState([
    { id: "1", type: "paragraph", text: "" },
  ]);

  // Drag & drop state
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // UI state
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const featuredFileInputRef = useRef(null);

  // Auto slug generation from title
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!isSlugManual) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(generated);
    }
  };

  // Upload image helper with size & format validation
  const uploadImageFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to upload image");
    }
    return data.url;
  };

  // Featured image file select with 1000x1000, .webp, <250KB checks
  const handleFeaturedImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Size check: Max 250 KB
    const MAX_KB = 250;
    if (file.size > MAX_KB * 1024) {
      const currentKb = Math.round(file.size / 1024);
      alert(`⚠️ File size exceeds 250 KB (Current size: ${currentKb} KB).\nPlease compress the image below 250 KB before uploading.`);
      if (featuredFileInputRef.current) featuredFileInputRef.current.value = "";
      return;
    }

    // 2. Format check: .webp
    const isWebp = file.name.toLowerCase().endsWith(".webp") || file.type === "image/webp";
    if (!isWebp) {
      const proceed = confirm(
        "Recommended format is .WEBP for optimal site speed.\nYour selected file is not .webp. Do you want to proceed anyway?"
      );
      if (!proceed) {
        if (featuredFileInputRef.current) featuredFileInputRef.current.value = "";
        return;
      }
    }

    // 3. Dimension check: 1000x1000 px
    try {
      const dimensions = await new Promise((resolve) => {
        const img = new window.Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = () => resolve(null);
      });

      if (dimensions && (dimensions.width !== 1000 || dimensions.height !== 1000)) {
        const proceed = confirm(
          `📐 Recommended dimensions are 1000 × 1000 px.\nYour uploaded image is ${dimensions.width} × ${dimensions.height} px.\n\nDo you want to continue with this image?`
        );
        if (!proceed) {
          if (featuredFileInputRef.current) featuredFileInputRef.current.value = "";
          return;
        }
      }

      setIsUploadingImage(true);
      const url = await uploadImageFile(file);
      setFeaturedImage(url);
    } catch (err) {
      alert("Error uploading image: " + err.message);
    } finally {
      setIsUploadingImage(false);
      if (featuredFileInputRef.current) featuredFileInputRef.current.value = "";
    }
  };

  // Content block operations
  const addBlock = (type) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      text: "",
      src: "",
      alt: "",
      ordered: false,
      items: type === "list" ? [""] : [],
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  const updateBlock = (index, field, value) => {
    setBlocks((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const removeBlock = (index) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const moveBlock = (index, direction) => {
    setBlocks((prev) => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  // Drag & Drop Handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    setBlocks((prev) => {
      const updated = [...prev];
      const [movedItem] = updated.splice(draggedIndex, 1);
      updated.splice(dropIndex, 0, movedItem);
      return updated;
    });
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleBlockImageUpload = async (index, file) => {
    if (!file) return;
    if (file.size > 250 * 1024) {
      alert(`⚠️ Content image exceeds 250 KB (Current: ${Math.round(file.size / 1024)} KB). Please compress below 250 KB.`);
      return;
    }
    try {
      const url = await uploadImageFile(file);
      updateBlock(index, "src", url);
    } catch (err) {
      alert("Error uploading content image: " + err.message);
    }
  };

  const addListItem = (blockIndex) => {
    setBlocks((prev) => {
      const copy = [...prev];
      const currentItems = copy[blockIndex].items || [];
      copy[blockIndex] = { ...copy[blockIndex], items: [...currentItems, ""] };
      return copy;
    });
  };

  const updateListItem = (blockIndex, itemIndex, val) => {
    setBlocks((prev) => {
      const copy = [...prev];
      const items = [...(copy[blockIndex].items || [])];
      items[itemIndex] = val;
      copy[blockIndex] = { ...copy[blockIndex], items };
      return copy;
    });
  };

  const removeListItem = (blockIndex, itemIndex) => {
    setBlocks((prev) => {
      const copy = [...prev];
      const items = (copy[blockIndex].items || []).filter((_, i) => i !== itemIndex);
      copy[blockIndex] = { ...copy[blockIndex], items };
      return copy;
    });
  };

  // Submit article
  const handleSubmit = async (targetStatus = status) => {
    if (!title.trim()) {
      setFeedback({ type: "error", message: "Please enter an article title." });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const cleanedBlocks = blocks
        .filter((b) => {
          if (b.type === "paragraph" || b.type === "heading" || b.type === "quote") {
            return b.text && b.text.trim().length > 0;
          }
          if (b.type === "image") {
            return b.src && b.src.trim().length > 0;
          }
          if (b.type === "list") {
            return b.items && b.items.filter((it) => it.trim().length > 0).length > 0;
          }
          return false;
        })
        .map((b) => {
          const item = { type: b.type };
          if (b.text) item.text = b.text;
          if (b.src) item.src = b.src;
          if (b.alt) item.alt = b.alt;
          if (b.type === "list") {
            item.ordered = !!b.ordered;
            item.items = b.items.filter((it) => it.trim().length > 0);
          }
          return item;
        });

      const payload = {
        title: title.trim(),
        slug: slug.trim() || undefined,
        excerpt: excerpt.trim(),
        author: author.trim() || "Digital Latte Team",
        image: featuredImage || "/img/og-img.png",
        date,
        contentBlocks: cleanedBlocks,
        status: targetStatus,
        tags,
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || excerpt.trim(),
      };

      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to publish article");
      }

      setFeedback({ type: "success", message: "Article published successfully! Redirecting..." });
      setTimeout(() => {
        router.push("/admin/blogs");
      }, 1200);
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blogs"
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition shadow-lg cursor-pointer"
          >
            <FaArrowLeft className="text-sm" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff7b00] uppercase tracking-wider mb-1 font-bold">
              <span>CMS</span>
              <span>•</span>
              <span>New Article</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Create New Blog Article
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
            <span>Publish Article</span>
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

      {/* Live Preview Modal View */}
      {previewMode ? (
        <div className="bg-[#140f0d] text-white rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl border border-white/10">
          <div className="border-b border-white/10 pb-4 mb-6 flex justify-between items-center">
            <span className="text-xs font-mono uppercase text-[#ff7b00] font-bold">
              Article Preview
            </span>
            <button
              onClick={() => setPreviewMode(false)}
              className="text-xs font-semibold px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white cursor-pointer"
            >
              Close Preview
            </button>
          </div>

          <h1 className="text-3xl font-bold uppercase text-white leading-tight mb-4">
            {title || "Untitled Article"}
          </h1>

          <div className="flex items-center gap-4 text-xs text-gray-400 font-mono mb-6">
            <span>By {author || "Digital Latte"}</span>
            <span>•</span>
            <span>{date}</span>
          </div>

          {featuredImage && (
            <div className="relative w-full h-[380px] rounded-xl overflow-hidden mb-8 border border-white/10">
              <Image
                src={featuredImage}
                alt={title || "Featured Image"}
                fill
                className="object-cover"
              />
            </div>
          )}

          {excerpt && (
            <p className="text-lg text-gray-300 font-normal italic border-l-4 border-[#ff7b00] pl-4 mb-8">
              {excerpt}
            </p>
          )}

          <div className="space-y-6 text-gray-300 text-[17px] leading-relaxed">
            {blocks.map((block, idx) => {
              if (block.type === "paragraph") {
                return (
                  <p
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: block.html || block.text }}
                  />
                );
              }
              if (block.type === "heading") {
                return (
                  <h2
                    key={idx}
                    className="text-xl font-bold text-white mt-6 mb-2"
                    dangerouslySetInnerHTML={{ __html: block.text }}
                  />
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={idx}
                    className="p-4 rounded-xl bg-[#ff7b00]/10 border-l-4 border-[#ff7b00] text-gray-200 italic"
                    dangerouslySetInnerHTML={{ __html: block.text }}
                  />
                );
              }
              if (block.type === "image") {
                return (
                  block.src && (
                    <figure key={idx} className="my-6">
                      <div className="relative w-full max-w-2xl h-[340px] mx-auto rounded-xl overflow-hidden border border-white/10">
                        <Image
                          src={block.src}
                          alt={block.alt || "Inline Image"}
                          fill
                          className="object-contain"
                        />
                      </div>
                      {block.alt && (
                        <figcaption className="text-xs text-gray-400 mt-2 text-center">
                          {block.alt}
                        </figcaption>
                      )}
                    </figure>
                  )
                );
              }
              if (block.type === "list") {
                return block.ordered ? (
                  <ol key={idx} className="list-decimal pl-6 space-y-1">
                    {block.items?.map((it, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: it }} />
                    ))}
                  </ol>
                ) : (
                  <ul key={idx} className="list-disc pl-6 space-y-1">
                    {block.items?.map((it, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: it }} />
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>
        </div>
      ) : (
        /* Edit Form Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title & Slug Box */}
            <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. 10 Proven SEO Tactics for Modern Brands in 2026"
                  className="w-full px-4 py-3 rounded-xl bg-[#120e0d] border border-white/10 text-white placeholder-gray-500 text-lg font-bold focus:outline-none focus:border-[#ff7b00] transition"
                />
              </div>

              {/* Slug Preview & Edit */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-white/10">
                <span className="text-xs font-mono text-gray-400 font-semibold">URL Slug:</span>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-500">
                    /digital-marketing-blog/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setIsSlugManual(true);
                      setSlug(e.target.value);
                    }}
                    placeholder="article-url-slug"
                    className="flex-1 px-2.5 py-1 rounded-lg bg-[#120e0d] border border-white/10 text-xs font-mono text-[#ff7b00] font-semibold focus:outline-none focus:border-[#ff7b00]"
                  />
                </div>
              </div>

              {/* Excerpt / Summary */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                  Short Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A concise 1-2 sentence hook for cards and search engine previews..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00] transition"
                />
              </div>
            </div>

            {/* Content Blocks Section */}
            <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Article Content Blocks</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Assemble your story using modular paragraphs, headings, inline images, and lists.
                  </p>
                </div>
              </div>

              {/* Block List */}
              <div className="space-y-4">
                {blocks.map((block, idx) => {
                  const isDragging = draggedIndex === idx;
                  const isDragOver = dragOverIndex === idx && draggedIndex !== idx;

                  return (
                    <div
                      key={block.id || idx}
                      draggable
                      onDragStart={(e) => handleDragStart(e, idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDragEnd={handleDragEnd}
                      onDrop={(e) => handleDrop(e, idx)}
                      className={`p-4 rounded-xl border transition-all duration-200 space-y-3 relative group ${
                        isDragging
                          ? "opacity-30 border-dashed border-[#ff7b00] scale-[0.98] bg-[#ff7b00]/10"
                          : isDragOver
                          ? "border-[#ff7b00] ring-2 ring-[#ff7b00]/30 shadow-xl bg-[#ff7b00]/10 scale-[1.01]"
                          : "bg-[#16110f] border-white/10 hover:border-white/20"
                      }`}
                    >
                      {/* Block Toolbar Header */}
                      <div className="flex items-center justify-between text-xs text-gray-400 border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-[#ff7b00] p-1 rounded hover:bg-white/5 transition flex items-center"
                            title="Click and drag to reorder this block"
                          >
                            <FaGripVertical className="text-sm" />
                          </span>
                          <div className="flex items-center gap-2 font-mono uppercase text-[#ff7b00] font-bold">
                            {block.type === "paragraph" && <FaParagraph className="text-xs" />}
                            {block.type === "heading" && <FaHeading className="text-xs" />}
                            {block.type === "image" && <FaImage className="text-xs" />}
                            {block.type === "quote" && <FaQuoteLeft className="text-xs" />}
                            {block.type === "list" && <FaListUl className="text-xs" />}
                            <span>Block #{idx + 1} ({block.type})</span>
                          </div>
                        </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveBlock(idx, "up")}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 border border-white/10 transition cursor-pointer"
                          title="Move Up"
                        >
                          <FaArrowUp className="text-[10px]" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === blocks.length - 1}
                          onClick={() => moveBlock(idx, "down")}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 border border-white/10 transition cursor-pointer"
                          title="Move Down"
                        >
                          <FaArrowDown className="text-[10px]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBlock(idx)}
                          className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition ml-2 border border-red-500/20 cursor-pointer"
                          title="Delete Block"
                        >
                          <FaTrashCan className="text-[10px]" />
                        </button>
                      </div>
                    </div>

                    {/* Block Content Inputs Based on Type */}
                    {block.type === "paragraph" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-mono text-gray-400">
                          <span className="text-gray-500 mr-1 font-sans">Insert HTML:</span>
                          <button
                            type="button"
                            onClick={() => updateBlock(idx, "text", (block.text || "") + "<strong>bold text</strong>")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] border border-white/10 transition text-gray-300 cursor-pointer"
                          >
                            &lt;strong&gt;
                          </button>
                          <button
                            type="button"
                            onClick={() => updateBlock(idx, "text", (block.text || "") + "<em>italic text</em>")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] border border-white/10 transition text-gray-300 cursor-pointer"
                          >
                            &lt;em&gt;
                          </button>
                          <button
                            type="button"
                            onClick={() => updateBlock(idx, "text", (block.text || "") + "<span>highlighted</span>")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] border border-white/10 transition text-gray-300 cursor-pointer"
                          >
                            &lt;span&gt;
                          </button>
                          <button
                            type="button"
                            onClick={() => updateBlock(idx, "text", (block.text || "") + '<a href="https://" target="_blank">link text</a>')}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] border border-white/10 transition text-gray-300 cursor-pointer"
                          >
                            &lt;a href&gt;
                          </button>
                        </div>
                        <textarea
                          rows={4}
                          value={block.text || ""}
                          onChange={(e) => updateBlock(idx, "text", e.target.value)}
                          placeholder="Write your paragraph content here... HTML tags like <strong>, <em>, <a> are supported."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00] transition"
                        />
                      </div>
                    )}

                    {block.type === "heading" && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={block.text || ""}
                          onChange={(e) => updateBlock(idx, "text", e.target.value)}
                          placeholder="e.g. 1. Master Your Content Funnel"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-base font-bold text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                        />
                      </div>
                    )}

                    {block.type === "quote" && (
                      <div className="space-y-2">
                        <textarea
                          rows={3}
                          value={block.text || ""}
                          onChange={(e) => updateBlock(idx, "text", e.target.value)}
                          placeholder="Inspiring quote or key takeaway callout..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-sm text-gray-200 italic placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                        />
                      </div>
                    )}

                    {block.type === "image" && (
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition">
                            <FaUpload className="text-[#ff7b00]" />
                            <span>Upload Inline Image (.webp, max 250KB)</span>
                            <input
                              type="file"
                              accept="image/webp,image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleBlockImageUpload(idx, f);
                              }}
                            />
                          </label>
                          <span className="text-xs text-gray-500 font-mono">OR</span>
                          <input
                            type="text"
                            value={block.src || ""}
                            onChange={(e) => updateBlock(idx, "src", e.target.value)}
                            placeholder="Direct Image URL (e.g. /uploads/blogs/image.webp)"
                            className="flex-1 px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                          />
                        </div>

                        <input
                          type="text"
                          value={block.alt || ""}
                          onChange={(e) => updateBlock(idx, "alt", e.target.value)}
                          placeholder="Image Alt Text (e.g. Infographic diagram)"
                          className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                        />

                        {block.src && (
                          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/10 bg-[#0c0a09]">
                            <Image
                              src={block.src}
                              alt={block.alt || "Preview"}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {block.type === "list" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-xs font-mono text-gray-300">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`list-type-${idx}`}
                              checked={!block.ordered}
                              onChange={() => updateBlock(idx, "ordered", false)}
                              className="text-[#ff7b00] accent-[#ff7b00]"
                            />
                            <span>Bullet List</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`list-type-${idx}`}
                              checked={block.ordered}
                              onChange={() => updateBlock(idx, "ordered", true)}
                              className="text-[#ff7b00] accent-[#ff7b00]"
                            />
                            <span>Numbered (1, 2, 3)</span>
                          </label>
                        </div>

                        <div className="space-y-2">
                          {(block.items || [""]).map((it, itemIdx) => (
                            <div key={itemIdx} className="flex items-center gap-2">
                              <span className="text-xs font-mono text-gray-500 w-5 text-right">
                                {block.ordered ? `${itemIdx + 1}.` : "•"}
                              </span>
                              <input
                                type="text"
                                value={it}
                                onChange={(e) => updateListItem(idx, itemIdx, e.target.value)}
                                placeholder={`List point #${itemIdx + 1}`}
                                className="flex-1 px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                              />
                              <button
                                type="button"
                                onClick={() => removeListItem(idx, itemIdx)}
                                className="p-2 text-red-400 hover:text-red-300 transition cursor-pointer"
                                title="Remove Item"
                              >
                                <FaTrashCan className="text-[10px]" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => addListItem(idx)}
                          className="inline-flex items-center gap-1.5 text-xs text-[#ff7b00] hover:text-[#e06d00] font-semibold pt-1 cursor-pointer"
                        >
                          <FaPlus className="text-[10px]" />
                          <span>Add List Item</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

              {/* Add Block Toolbar */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-mono text-gray-400 mb-3 uppercase tracking-wider font-bold">
                  + Add Content Block
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  <button
                    type="button"
                    onClick={() => addBlock("paragraph")}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-[#ff7b00]/10 hover:border-[#ff7b00]/40 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition cursor-pointer"
                  >
                    <FaParagraph className="text-[#ff7b00]" />
                    <span>Paragraph</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock("heading")}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-[#ff7b00]/10 hover:border-[#ff7b00]/40 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition cursor-pointer"
                  >
                    <FaHeading className="text-[#ff7b00]" />
                    <span>Heading</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock("image")}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-[#ff7b00]/10 hover:border-[#ff7b00]/40 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition cursor-pointer"
                  >
                    <FaImage className="text-[#ff7b00]" />
                    <span>Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock("quote")}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-[#ff7b00]/10 hover:border-[#ff7b00]/40 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition cursor-pointer"
                  >
                    <FaQuoteLeft className="text-[#ff7b00]" />
                    <span>Quote</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock("list")}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-[#ff7b00]/10 hover:border-[#ff7b00]/40 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition col-span-2 sm:col-span-1 cursor-pointer"
                  >
                    <FaListUl className="text-[#ff7b00]" />
                    <span>List</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings (Right 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Publishing Settings */}
            <div className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-white/10 pb-3">
                Publishing Details
              </h3>

              {/* Status */}
              <div>
                <label className="block text-xs font-mono text-gray-400 font-semibold mb-2">
                  Status
                </label>
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

              {/* Author */}
              <div>
                <label className="block text-xs font-mono text-gray-400 font-semibold mb-1.5">
                  Author Name
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Digital Latte Team"
                  className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ff7b00]"
                />
              </div>

              {/* Publish Date */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-gray-400 font-semibold">
                    Publish Date
                  </label>
                  {date && (
                    <span className="text-[11px] font-mono text-[#ff7b00] font-semibold">
                      {(() => {
                        const parsed = new Date(date);
                        if (isNaN(parsed.getTime())) return "";
                        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        return `${months[parsed.getMonth()]} ${String(parsed.getDate()).padStart(2, "0")}, ${parsed.getFullYear()}`;
                      })()}
                    </span>
                  )}
                </div>
                <input
                  type="date"
                  value={date}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    const selected = e.target.value;
                    const todayStr = new Date().toISOString().split("T")[0];
                    if (selected > todayStr) {
                      alert("Future dates cannot be selected as published date.");
                      return;
                    }
                    setDate(selected);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ff7b00]"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-mono text-gray-400 font-semibold mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="SEO, Strategy, Marketing"
                  className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ff7b00]"
                />
              </div>
            </div>

            {/* Featured Image Box with Specifications */}
            <div className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-4">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Featured Banner Image
                </h3>
              </div>

              {/* Image Requirements Badges */}
              <div className="p-3 rounded-xl bg-[#ff7b00]/10 border border-[#ff7b00]/20 space-y-1.5 text-[11px] text-gray-300">
                <div className="flex items-center gap-1.5 font-bold text-[#ff7b00]">
                  <FaCircleInfo className="text-xs" />
                  <span>Image Requirements:</span>
                </div>
                <div className="grid grid-cols-1 gap-1 pl-4 list-disc text-gray-400 font-sans">
                  <div>• <strong className="text-white">Dimension:</strong> 1000 × 1000 px</div>
                  <div>• <strong className="text-white">Format:</strong> .WEBP</div>
                  <div>• <strong className="text-white">Max Size:</strong> Below 250 KB</div>
                </div>
              </div>

              {featuredImage ? (
                <div className="space-y-3">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-[#0c0a09]">
                    <Image
                      src={featuredImage}
                      alt="Featured Banner"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => featuredFileInputRef.current?.click()}
                      className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white border border-white/10 transition cursor-pointer"
                    >
                      Change Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeaturedImage("")}
                      className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-400 transition cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => featuredFileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/10 hover:border-[#ff7b00] rounded-2xl p-6 text-center cursor-pointer transition bg-[#120e0d]"
                >
                  <FaUpload className="text-2xl text-[#ff7b00] mx-auto mb-2" />
                  <p className="text-xs text-white font-bold">
                    {isUploadingImage ? "Uploading image..." : "Upload Featured Image"}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1 font-mono">
                    1000 × 1000 px • .WEBP • &lt; 250 KB
                  </p>
                </div>
              )}

              <input
                ref={featuredFileInputRef}
                type="file"
                accept="image/webp,image/*"
                className="hidden"
                onChange={handleFeaturedImageUpload}
              />

              <div className="pt-2">
                <label className="block text-[11px] font-mono text-gray-500 mb-1">
                  Or paste direct image path
                </label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="/img/blog/my-image.webp"
                  className="w-full px-3 py-2 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                />
              </div>
            </div>

            {/* SEO Metadata Box */}
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
                  placeholder={excerpt || "Search engine description snippet..."}
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
