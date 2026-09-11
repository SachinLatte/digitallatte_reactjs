"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FaPenNib,
  FaPlus,
  FaEye,
  FaCalendarDay,
  FaUserCheck,
  FaLayerGroup,
  FaMagnifyingGlass,
  FaPenToSquare,
  FaTrashCan,
  FaRotateRight,
  FaChevronLeft,
  FaChevronRight,
  FaXmark,
  FaCircleNotch,
} from "react-icons/fa6";

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1, limit: 12 });

  // Delete modal state
  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/blogs", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (statusFilter && statusFilter !== "All") url.searchParams.set("status", statusFilter);
      url.searchParams.set("page", page.toString());
      url.searchParams.set("limit", "12");

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setPosts(data.data);
        if (data.pagination) {
          setPagination(data.pagination);
        }
      }
    } catch (e) {
      console.error("Fetch blogs error:", e);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchBlogs]);

  const handleDelete = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    try {
      const idOrSlug = postToDelete._id || postToDelete.slug;
      const res = await fetch(`/api/admin/blogs/${idOrSlug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setPostToDelete(null);
        fetchBlogs();
      } else {
        alert("Failed to delete: " + data.message);
      }
    } catch (err) {
      alert("Error deleting article: " + err.message);
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
            <span>Content Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <FaPenNib className="text-[#ff7b00]" />
            Blogs & Articles
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Create, edit, schedule, and publish search-optimized blog posts for Digital Latte.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7b00] hover:bg-[#e06d00] text-white font-semibold text-sm transition-all shadow-lg shadow-[#ff7b00]/25 self-start sm:self-auto cursor-pointer"
        >
          <FaPlus className="text-xs" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl flex items-center gap-4 hover:border-[#ff7b00]/40 transition">
          <div className="w-12 h-12 rounded-xl bg-[#ff7b00]/10 border border-[#ff7b00]/20 flex items-center justify-center text-[#ff7b00]">
            <FaLayerGroup className="text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">Total Articles</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{pagination.total || posts.length}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl flex items-center gap-4 hover:border-emerald-500/40 transition">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <FaCalendarDay className="text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">Latest Published</p>
            <h3 className="text-sm font-bold text-gray-200 mt-1 truncate max-w-[200px]">
              {posts[0]?.title || "No posts yet"}
            </h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl flex items-center gap-4 hover:border-sky-500/40 transition">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <FaUserCheck className="text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">Authors / Contributors</p>
            <h3 className="text-xl font-bold text-white mt-0.5">Digital Latte Team</h3>
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
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by title, author, keyword..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00] transition"
          />
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto w-full md:w-auto justify-between md:justify-end">
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
            {["All", "Published", "Draft"].map((st) => (
              <button
                key={st}
                onClick={() => {
                  setStatusFilter(st);
                  setPage(1);
                }}
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
            onClick={fetchBlogs}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            title="Refresh List"
          >
            <FaRotateRight className={`text-xs ${loading ? "animate-spin text-[#ff7b00]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-[#140f0d] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Live Articles in Database</h2>
          <span className="text-xs text-gray-400 font-mono font-semibold">
            Showing {posts.length} of {pagination.total || posts.length} posts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#191412] text-xs uppercase font-mono text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Title & Excerpt</th>
                <th className="px-6 py-4">Author / Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {loading && posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-mono text-xs">
                    <FaCircleNotch className="text-xl text-[#ff7b00] animate-spin mx-auto mb-2" />
                    Loading articles...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-mono text-xs">
                    No articles found matching your criteria.
                  </td>
                </tr>
              ) : (
                posts.map((post, idx) => (
                  <tr key={post._id || post.slug || idx} className="hover:bg-white/[0.02] transition">
                    <td className="px-6 py-4 max-w-md">
                      <p className="font-bold text-white truncate">{post.title}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {post.excerpt || "/digital-marketing-blog/" + post.slug}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">
                      <p className="text-gray-200 font-medium">{post.author || "Digital Latte"}</p>
                      <p className="font-mono text-gray-500 mt-0.5">{post.date || "2026"}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.status === "draft" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          Draft
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Published
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/digital-marketing-blog/${post.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
                          title="View Live Page"
                        >
                          <FaEye className="text-xs" />
                          <span className="hidden sm:inline">View</span>
                        </Link>

                        <Link
                          href={`/admin/blogs/edit/${post._id || post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs text-[#ff7b00] hover:text-[#e06d00] font-semibold transition"
                          title="Edit Article"
                        >
                          <FaPenToSquare className="text-xs" />
                          <span className="hidden sm:inline">Edit</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => setPostToDelete(post)}
                          className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition cursor-pointer"
                          title="Delete Article"
                        >
                          <FaTrashCan className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {pagination.totalPages > 1 && (
          <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-20 text-gray-300 transition cursor-pointer"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <button
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-20 text-gray-300 transition cursor-pointer"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#191412] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">Delete Article</h3>
              <button
                onClick={() => setPostToDelete(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <FaXmark />
              </button>
            </div>

            <p className="text-sm text-gray-300">
              Are you sure you want to delete <strong className="text-white">&ldquo;{postToDelete.title}&rdquo;</strong>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPostToDelete(null)}
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
