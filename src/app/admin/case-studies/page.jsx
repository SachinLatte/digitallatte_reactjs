"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFolderOpen,
  FaPlus,
  FaEye,
  FaPenToSquare,
  FaTrashCan,
  FaMagnifyingGlass,
  FaRotateRight,
  FaCircleNotch,
  FaXmark,
  FaBriefcase,
  FaChartLine,
} from "react-icons/fa6";
import { getAssetPath } from "@/utils/assetPath";

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [studyToDelete, setStudyToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCaseStudies = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/case-studies/", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (statusFilter && statusFilter !== "All") url.searchParams.set("status", statusFilter);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setStudies(data.data);
      }
    } catch (e) {
      console.error("Fetch case studies error:", e);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCaseStudies();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchCaseStudies]);

  const handleDelete = async () => {
    if (!studyToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/case-studies/${studyToDelete.slug || studyToDelete._id}/`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setStudies((prev) =>
          prev.filter((s) => s.slug !== studyToDelete.slug && s._id !== studyToDelete._id)
        );
        setStudyToDelete(null);
      } else {
        alert(data.message || "Failed to delete case study");
      }
    } catch (e) {
      alert("Error deleting case study: " + e.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff7b00] uppercase tracking-wider mb-1 font-bold">
            <span>Website CMS</span>
            <span>•</span>
            <span>Portfolio Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <FaFolderOpen className="text-[#ff7b00]" />
            Case Studies & Portfolios
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage client brand stories, campaign metrics, galleries, and client results.
          </p>
        </div>

        <Link
          href="/admin/case-studies/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7b00] hover:bg-[#e06d00] text-white font-semibold text-sm transition-all shadow-lg shadow-[#ff7b00]/25 self-start sm:self-auto cursor-pointer"
        >
          <FaPlus className="text-xs" />
          <span>Add New Case Study</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl flex items-center gap-4 hover:border-[#ff7b00]/40 transition">
          <div className="w-12 h-12 rounded-xl bg-[#ff7b00]/10 border border-[#ff7b00]/20 flex items-center justify-center text-[#ff7b00]">
            <FaFolderOpen className="text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-mono font-bold uppercase tracking-wider">Total Case Studies</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{studies.length}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl flex items-center gap-4 hover:border-purple-500/40 transition">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <FaChartLine className="text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-mono font-bold uppercase tracking-wider">Published Showcases</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">
              {studies.filter((s) => s.status === "published").length}
            </h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl flex items-center gap-4 hover:border-emerald-500/40 transition">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <FaBriefcase className="text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-mono font-bold uppercase tracking-wider">Featured Brands</p>
            <h3 className="text-sm font-bold text-gray-200 mt-1 truncate max-w-[200px]">
              Tim Hortons, Suhana, Kaziranga
            </h3>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, client, service..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00] transition"
          />
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto w-full md:w-auto justify-between md:justify-end">
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
            {["All", "Published", "Draft"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  statusFilter === st
                    ? "bg-[#ff7b00] text-white shadow-lg shadow-[#ff7b00]/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={fetchCaseStudies}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            title="Refresh List"
          >
            <FaRotateRight className={`text-xs ${loading ? "animate-spin text-[#ff7b00]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Case Studies Grid */}
      {loading && studies.length === 0 ? (
        <div className="py-24 text-center">
          <FaCircleNotch className="animate-spin text-3xl text-[#ff7b00] mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading case studies...</p>
        </div>
      ) : studies.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-[#120e0d] border border-dashed border-white/10">
          <FaFolderOpen className="text-4xl text-gray-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No Case Studies Found</h3>
          <p className="text-gray-400 text-xs mt-1 max-w-sm mx-auto">
            {search
              ? `No case studies matched "${search}".`
              : "No case studies in database yet. Click '+ Add New Case Study' to create one."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((cs, idx) => {
            const banner = cs.topBannerImg || cs.brandInfoImg || (cs.creativeGrid?.[0]?.images?.[0]?.src) || "/img/case-study-bg.webp";

            return (
              <div
                key={cs.slug || cs._id || idx}
                className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl flex flex-col justify-between hover:border-[#ff7b00]/50 hover:shadow-2xl transition duration-300 group"
              >
                <div>
                  {/* Top Bar: Client & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/5 font-semibold">
                      {cs.client || "Client Story"}
                    </span>
                    {cs.status === "draft" ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        Draft
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Published
                      </span>
                    )}
                  </div>

                  {/* Thumbnail / Hero Preview */}
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-[#0c0a09] border border-white/5">
                    <Image
                      src={getAssetPath(banner)}
                      alt={cs.title || "Banner"}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Title & Services */}
                  <h3 className="text-base font-bold text-white group-hover:text-[#ff7b00] transition line-clamp-1">
                    {cs.title}
                  </h3>
                  <p className="text-[11px] text-[#ff7b00] font-mono mt-1 line-clamp-1">
                    {cs.services || "Branding, Design, Digital"}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                    {Array.isArray(cs.description)
                      ? cs.description[0]
                      : cs.description || cs.metaDescription || "Digital marketing campaign case study."}
                  </p>
                </div>

                {/* Footer Action Bar */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-mono truncate max-w-[130px]">
                    /{cs.slug}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs transition"
                      title="View Live Page"
                    >
                      <FaEye />
                    </Link>

                    <Link
                      href={`/admin/case-studies/edit/${cs.slug || cs._id}`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] text-xs font-semibold text-gray-300 transition"
                      title="Edit Case Study"
                    >
                      <FaPenToSquare className="text-xs" />
                      <span>Edit</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => setStudyToDelete(cs)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition cursor-pointer"
                      title="Delete Case Study"
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {studyToDelete && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#191412] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">Delete Case Study</h3>
              <button
                onClick={() => setStudyToDelete(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <FaXmark />
              </button>
            </div>

            <p className="text-sm text-gray-300">
              Are you sure you want to delete <strong className="text-white">&ldquo;{studyToDelete.title}&rdquo;</strong>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStudyToDelete(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-red-600/20 cursor-pointer"
              >
                {isDeleting ? <FaCircleNotch className="animate-spin text-xs" /> : <FaTrashCan className="text-xs" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
