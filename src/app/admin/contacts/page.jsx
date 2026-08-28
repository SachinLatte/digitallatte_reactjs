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
  FaRotateRight,
} from "react-icons/fa6";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedContact, setSelectedContact] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/contacts", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (statusFilter && statusFilter !== "All") url.searchParams.set("status", statusFilter);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchContacts();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchContacts]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedContact?._id === id) {
          setSelectedContact((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setContacts((prev) => prev.filter((item) => item._id !== id));
        if (selectedContact?._id === id) setSelectedContact(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (contacts.length === 0) return alert("No contacts to export");

    const headers = ["Name", "Contact", "Email", "Status", "Source Page", "Date", "Message"];
    const rows = contacts.map((c) => [
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.contact}"`,
      `"${c.email}"`,
      `"${c.status}"`,
      `"${c.sourcePage || "Contact Us"}"`,
      `"${new Date(c.createdAt).toLocaleDateString()}"`,
      `"${(c.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `digital_latte_contacts_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Contact Us Inquiries</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and respond to website leads submitted via the Contact page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchContacts}
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

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-[#16110f] border border-white/5">
        {/* Search */}
        <div className="flex-1 relative">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone or message..."
            className="w-full bg-[#120e0d] border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["All", "New", "In Progress", "Contacted", "Archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-[#ff7b00] text-white shadow-md shadow-[#ff7b00]/20"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-[#16110f] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#1c1614] text-xs uppercase font-semibold text-gray-400 border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Message Snippet</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    <span className="inline-block w-6 h-6 border-2 border-[#ff7b00]/30 border-t-[#ff7b00] rounded-full animate-spin mb-2" />
                    <p>Loading inquiries...</p>
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    No contact submissions found.
                  </td>
                </tr>
              ) : (
                contacts.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">
                      {item.name}
                      <span className="block text-[11px] text-gray-500 font-normal">
                        {item.sourcePage || "Contact Us"}
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
                    <td className="px-6 py-4 max-w-xs truncate text-gray-400 text-xs">
                      {item.message}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={item.status}
                        disabled={updatingId === item._id}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`text-xs px-2.5 py-1 rounded-lg border bg-[#120e0d] focus:outline-none cursor-pointer ${
                          item.status === "New"
                            ? "border-emerald-500/40 text-emerald-400"
                            : item.status === "In Progress"
                            ? "border-amber-500/40 text-amber-400"
                            : item.status === "Contacted"
                            ? "border-blue-500/40 text-blue-400"
                            : "border-gray-600 text-gray-400"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedContact(item)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                        title="View Full Inquiry"
                      >
                        <FaEye className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                        title="Delete Inquiry"
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

      {/* Inquiry Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#191412] border border-white/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute right-5 top-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
            >
              <FaXmark className="text-base" />
            </button>

            <h2 className="text-xl font-bold text-white mb-1">Inquiry Details</h2>
            <p className="text-xs text-gray-400 mb-6">
              Submitted on {new Date(selectedContact.createdAt).toLocaleString()}
            </p>

            <div className="space-y-4 text-sm">
              <div className="p-3.5 bg-[#120e0d] rounded-xl border border-white/5">
                <span className="text-xs text-gray-500 block mb-0.5">Sender Name</span>
                <span className="font-semibold text-white">{selectedContact.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#120e0d] rounded-xl border border-white/5">
                  <span className="text-xs text-gray-500 block mb-0.5">Email</span>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-[#ff7b00] hover:underline break-all"
                  >
                    {selectedContact.email}
                  </a>
                </div>
                <div className="p-3.5 bg-[#120e0d] rounded-xl border border-white/5">
                  <span className="text-xs text-gray-500 block mb-0.5">Contact</span>
                  <a
                    href={`tel:${selectedContact.contact}`}
                    className="text-[#ff7b00] hover:underline"
                  >
                    {selectedContact.contact}
                  </a>
                </div>
              </div>

              <div className="p-3.5 bg-[#120e0d] rounded-xl border border-white/5">
                <span className="text-xs text-gray-500 block mb-1">Message</span>
                <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {selectedContact.message}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-400">Current Status:</span>
                <select
                  value={selectedContact.status}
                  onChange={(e) => handleStatusChange(selectedContact._id, e.target.value)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-[#120e0d] text-white focus:outline-none"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
              <a
                href={`mailto:${selectedContact.email}?subject=Regarding your inquiry on Digital Latte`}
                className="py-2.5 px-4 rounded-xl bg-[#ff7b00] hover:bg-[#ff881a] text-white font-semibold text-xs transition-colors flex items-center gap-2"
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
