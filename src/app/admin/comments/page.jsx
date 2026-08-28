"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FaMagnifyingGlass,
  FaFileCsv,
  FaTrashCan,
  FaEye,
  FaEnvelope,
  FaXmark,
  FaRotateRight,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

export default function AdminBlogCommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/comments", window.location.origin);
      if (search) url.searchParams.set("search", search);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setComments(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchComments();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchComments]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      const res = await fetch(`/api/admin/comments?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setComments((prev) => prev.filter((item) => item._id !== id));
        if (selectedComment?._id === id) setSelectedComment(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (comments.length === 0) return alert("No comments to export");

    const headers = ["Author Name", "Email", "Blog Article", "Date", "Comment"];
    const rows = comments.map((c) => [
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.email}"`,
      `"${(c.blogTitle || "").replace(/"/g, '""')}"`,
      `"${new Date(c.createdAt).toLocaleDateString()}"`,
      `"${(c.comment || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `digital_latte_blog_comments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Blog Comments</h1>
          <p className="text-sm text-gray-400 mt-1">
            View and manage user comments submitted across digital marketing blog articles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchComments}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors border border-white/5 cursor-pointer"
            title="Refresh"
          >
            <FaRotateRight className={`text-sm ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            <FaFileCsv className="text-base" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-[#16110f] border border-white/5">
        <div className="relative">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by author name, email, comment text or blog title..."
            className="w-full bg-[#120e0d] border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
          />
        </div>
      </div>

      {/* Comments Table */}
      <div className="bg-[#16110f] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#1c1614] text-xs uppercase font-semibold text-gray-400 border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Comment</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    <span className="inline-block w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-2" />
                    <p>Loading comments...</p>
                  </td>
                </tr>
              ) : comments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    No blog comments found.
                  </td>
                </tr>
              ) : (
                comments.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span>{item.name}</span>
                          <span className="block text-[11px] text-gray-400 font-normal">
                            {item.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs text-xs text-gray-300">
                      <span className="font-medium text-white block truncate">{item.blogTitle || "Article"}</span>
                      {item.blogSlug && (
                        <Link
                          href={`/digital-marketing-blog/${item.blogSlug}`}
                          target="_blank"
                          className="text-[11px] text-[#ff7b00] hover:underline inline-flex items-center gap-1 mt-0.5"
                        >
                          View Article <FaArrowUpRightFromSquare className="text-[9px]" />
                        </Link>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-md text-gray-300 text-xs">
                      <p className="line-clamp-2 leading-relaxed">{item.comment}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedComment(item)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                        title="View Full Comment"
                      >
                        <FaEye className="text-xs" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                        title="Delete Comment"
                      >
                        <FaTrashCan className="text-xs" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comment Detail Modal */}
      {selectedComment && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#191412] border border-white/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedComment(null)}
              className="absolute right-5 top-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
            >
              <FaXmark className="text-base" />
            </button>

            <h2 className="text-xl font-bold text-white mb-1">Blog Comment Details</h2>
            <p className="text-xs text-gray-400 mb-6">
              Posted on {new Date(selectedComment.createdAt).toLocaleString()}
            </p>

            <div className="space-y-4 text-sm">
              <div className="p-3.5 bg-[#120e0d] rounded-xl border border-white/5">
                <span className="text-xs text-gray-500 block mb-0.5">Author</span>
                <span className="font-semibold text-white">{selectedComment.name}</span>
                <span className="text-xs text-gray-400 block font-mono mt-0.5">{selectedComment.email}</span>
              </div>

              <div className="p-3.5 bg-[#120e0d] rounded-xl border border-white/5">
                <span className="text-xs text-gray-500 block mb-0.5">Article</span>
                <span className="font-semibold text-white">{selectedComment.blogTitle}</span>
              </div>

              <div className="p-3.5 bg-[#120e0d] rounded-xl border border-white/5">
                <span className="text-xs text-gray-500 block mb-1">Comment Text</span>
                <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {selectedComment.comment}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
              <a
                href={`mailto:${selectedComment.email}?subject=Regarding your comment on Digital Latte Blog`}
                className="py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors flex items-center gap-2"
              >
                <FaEnvelope /> Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
