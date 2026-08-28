"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FaMagnifyingGlass,
  FaFileCsv,
  FaTrashCan,
  FaEye,
  FaPhone,
  FaEnvelope,
  FaXmark,
  FaFilePdf,
  FaRotateRight,
  FaDownload,
} from "react-icons/fa6";

export default function AdminCareersPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/careers", window.location.origin);
      url.searchParams.set("type", "job");
      if (search) url.searchParams.set("search", search);
      if (statusFilter && statusFilter !== "All") url.searchParams.set("status", statusFilter);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setApplications(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchApplications();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchApplications]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/careers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedApp?._id === id) {
          setSelectedApp((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      const res = await fetch(`/api/admin/careers?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) => prev.filter((item) => item._id !== id));
        if (selectedApp?._id === id) setSelectedApp(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const downloadResume = async (resumeData, resumeName) => {
    if (!resumeData) return alert("No resume file attached.");
    try {
      if (resumeData.startsWith("data:")) {
        const res = await fetch(resumeData);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = resumeName || "Applicant_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        const a = document.createElement("a");
        a.href = resumeData;
        a.download = resumeName || "Applicant_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (e) {
      console.error(e);
      const a = document.createElement("a");
      a.href = resumeData;
      a.download = resumeName || "Applicant_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (applications.length === 0) return alert("No applications to export");

    const headers = ["Applicant Name", "Email", "Phone", "Applied Role", "Status", "Date", "Notes"];
    const rows = applications.map((a) => [
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.email}"`,
      `"${a.contact}"`,
      `"${a.jobTitle || "General"}"`,
      `"${a.status}"`,
      `"${new Date(a.createdAt).toLocaleDateString()}"`,
      `"${(a.coverNote || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `digital_latte_careers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Career Applications</h1>
          <p className="text-sm text-gray-400 mt-1">
            Review applicant resumes, portfolios, and manage recruitment pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchApplications}
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-[#16110f] border border-white/5">
        <div className="flex-1 relative">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone or job role..."
            className="w-full bg-[#120e0d] border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["All", "New", "Reviewed", "Interview Scheduled", "Shortlisted", "Rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#16110f] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#1c1614] text-xs uppercase font-semibold text-gray-400 border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Applied Role</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Resume</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    <span className="inline-block w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-2" />
                    <p>Loading applications...</p>
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    No career applications found.
                  </td>
                </tr>
              ) : (
                applications.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">
                      {item.name}
                      <span className="block text-[11px] text-gray-500 font-normal">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {item.jobTitle || "General Application"}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-y-1 text-xs">
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaEnvelope className="text-gray-500 text-[10px]" />
                        <a href={`mailto:${item.email}`} className="hover:text-[#ff7b00] transition-colors">
                          {item.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <FaPhone className="text-gray-500 text-[10px]" />
                        <a href={`tel:${item.contact}`} className="hover:text-[#ff7b00] transition-colors">
                          {item.contact}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.resumeData ? (
                        <button
                          onClick={() => downloadResume(item.resumeData, item.resumeName)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-400 text-xs font-medium border border-white/5 transition-colors cursor-pointer"
                        >
                          <FaFilePdf />
                          <span>{item.resumeName || "Download CV"}</span>
                          <FaDownload className="text-[10px] ml-1 opacity-70" />
                        </button>
                      ) : (
                        <span className="text-xs text-gray-500 italic">No file</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={item.status}
                        disabled={updatingId === item._id}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className="text-xs px-2.5 py-1 rounded-lg border border-white/10 bg-[#120e0d] text-white focus:outline-none cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Hired">Hired</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedApp(item)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                        title="View Application"
                      >
                        <FaEye className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <FaTrashCan className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#191412] border border-white/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute right-5 top-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
            >
              <FaXmark className="text-base" />
            </button>

            <h2 className="text-xl font-bold text-white mb-1">Applicant Profile</h2>
            <p className="text-xs text-gray-400 mb-6">
              Applied for <span className="text-amber-400 font-semibold">{selectedApp.jobTitle}</span> on{" "}
              {new Date(selectedApp.createdAt).toLocaleDateString()}
            </p>

            <div className="space-y-4 text-sm">
              <div className="p-3.5 bg-[#120e0d] rounded-xl border border-white/5">
                <span className="text-xs text-gray-500 block mb-0.5">Full Name</span>
                <span className="font-semibold text-white">{selectedApp.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#120e0d] rounded-xl border border-white/5">
                  <span className="text-xs text-gray-500 block mb-0.5">Email</span>
                  <a href={`mailto:${selectedApp.email}`} className="text-amber-400 hover:underline break-all">
                    {selectedApp.email}
                  </a>
                </div>
                <div className="p-3.5 bg-[#120e0d] rounded-xl border border-white/5">
                  <span className="text-xs text-gray-500 block mb-0.5">Contact</span>
                  <a href={`tel:${selectedApp.contact}`} className="text-amber-400 hover:underline">
                    {selectedApp.contact}
                  </a>
                </div>
              </div>

              {selectedApp.coverNote && (
                <div className="p-3.5 bg-[#120e0d] rounded-xl border border-white/5">
                  <span className="text-xs text-gray-500 block mb-1">Cover Note / Message</span>
                  <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {selectedApp.coverNote}
                  </p>
                </div>
              )}

              {selectedApp.resumeData && (
                <div className="p-3.5 bg-[#120e0d] rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block">Attached Resume</span>
                    <span className="text-xs text-white font-mono">{selectedApp.resumeName || "Resume.pdf"}</span>
                  </div>
                  <button
                    onClick={() => downloadResume(selectedApp.resumeData, selectedApp.resumeName)}
                    className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaDownload /> Download
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-400">Application Stage:</span>
                <select
                  value={selectedApp.status}
                  onChange={(e) => handleStatusChange(selectedApp._id, e.target.value)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-[#120e0d] text-white focus:outline-none"
                >
                  <option value="New">New</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Hired">Hired</option>
                </select>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
              <a
                href={`mailto:${selectedApp.email}?subject=Application for ${selectedApp.jobTitle} at Digital Latte`}
                className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-colors flex items-center gap-2"
              >
                <FaEnvelope /> Contact Candidate
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
