"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaAddressBook,
  FaBriefcase,
  FaFileLines,
  FaComments,
  FaArrowRight,
  FaRotateRight,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa6";

export default function AdminDashboardOverview() {
  const [data, setData] = useState({
    stats: {
      totalContacts: 0,
      newContacts: 0,
      totalCareers: 0,
      newCareers: 0,
      totalResumes: 0,
      newResumes: 0,
      totalComments: 0,
      pendingComments: 0,
      totalLeads: 0,
    },
    recentContacts: [],
    recentCareers: [],
    recentResumes: [],
    recentComments: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-gray-400 mt-1">
            Monitor real-time leads from all 4 website forms across Digital Latte.
          </p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="self-start sm:self-auto inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium transition-colors border border-white/5 cursor-pointer disabled:opacity-50"
        >
          <FaRotateRight className={`text-xs ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. Contact Leads Total */}
        <div className="p-6 rounded-2xl bg-[#16110f] border border-white/5 relative overflow-hidden group hover:border-[#ff7b00]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Contact Leads
            </span>
            <div className="p-3 rounded-xl bg-[#ff7b00]/10 text-[#ff7b00]">
              <FaAddressBook className="text-lg" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">
              {data.stats.totalContacts}
            </span>
            <span className="text-xs text-gray-400">inquiries</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-medium">
              {data.stats.newContacts} new / unread
            </span>
            <Link href="/admin/contacts" className="text-[#ff7b00] hover:underline inline-flex items-center gap-1">
              View <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>

        {/* 2. Job Applications Total */}
        <div className="p-6 rounded-2xl bg-[#16110f] border border-white/5 relative overflow-hidden group hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Job Applications
            </span>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <FaBriefcase className="text-lg" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">
              {data.stats.totalCareers}
            </span>
            <span className="text-xs text-gray-400">applicants</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-medium">
              {data.stats.newCareers} unreviewed
            </span>
            <Link href="/admin/careers" className="text-amber-400 hover:underline inline-flex items-center gap-1">
              View <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>

        {/* 3. Resume Submissions Total */}
        <div className="p-6 rounded-2xl bg-[#16110f] border border-white/5 relative overflow-hidden group hover:border-teal-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              General Resumes
            </span>
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
              <FaFileLines className="text-lg" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">
              {data.stats.totalResumes}
            </span>
            <span className="text-xs text-gray-400">candidates</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-teal-400 font-medium">
              {data.stats.newResumes} new
            </span>
            <Link href="/admin/resumes" className="text-teal-400 hover:underline inline-flex items-center gap-1">
              View <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>

        {/* 4. Blog Comments Total */}
        <div className="p-6 rounded-2xl bg-[#16110f] border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Blog Comments
            </span>
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <FaComments className="text-lg" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">
              {data.stats.totalComments}
            </span>
            <span className="text-xs text-gray-400">comments</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-amber-400 font-medium">
              {data.stats.pendingComments} pending review
            </span>
            <Link href="/admin/comments" className="text-purple-400 hover:underline inline-flex items-center gap-1">
              View <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Recent Activity Sections (2x2 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Recent Contact Submissions */}
        <div className="bg-[#16110f] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-white">Recent Contact Inquiries</h2>
              <p className="text-xs text-gray-400 mt-0.5">Submitted via Contact Us page</p>
            </div>
            <Link
              href="/admin/contacts"
              className="text-xs text-[#ff7b00] hover:text-[#ff9e40] font-medium flex items-center gap-1"
            >
              View All →
            </Link>
          </div>

          {data.recentContacts.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-white/10 rounded-xl text-gray-500 text-xs">
              No contact inquiries yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.recentContacts.slice(0, 3).map((item) => (
                <div
                  key={item._id}
                  className="p-3.5 rounded-xl bg-[#1c1614] border border-white/5 flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-white">{item.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{item.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. Recent Job Applications */}
        <div className="bg-[#16110f] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-white">Recent Job Applications</h2>
              <p className="text-xs text-gray-400 mt-0.5">Submitted for specific job openings</p>
            </div>
            <Link
              href="/admin/careers"
              className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
            >
              View All →
            </Link>
          </div>

          {data.recentCareers.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-white/10 rounded-xl text-gray-500 text-xs">
              No job applications yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.recentCareers.slice(0, 3).map((item) => (
                <div
                  key={item._id}
                  className="p-3.5 rounded-xl bg-[#1c1614] border border-white/5 flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-white">{item.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-medium">
                      {item.jobTitle || "Role"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{item.email}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Recent General Resumes */}
        <div className="bg-[#16110f] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-white">General Resume Submissions</h2>
              <p className="text-xs text-gray-400 mt-0.5">Submitted via Submit Resume page</p>
            </div>
            <Link
              href="/admin/resumes"
              className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1"
            >
              View All →
            </Link>
          </div>

          {data.recentResumes.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-white/10 rounded-xl text-gray-500 text-xs">
              No general resume submissions yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.recentResumes.slice(0, 3).map((item) => (
                <div
                  key={item._id}
                  className="p-3.5 rounded-xl bg-[#1c1614] border border-white/5 flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-white">{item.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 font-medium">
                      {item.resumeName || "Resume.pdf"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{item.email}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Recent Blog Comments */}
        <div className="bg-[#16110f] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-white">Recent Blog Comments</h2>
              <p className="text-xs text-gray-400 mt-0.5">Submitted on digital marketing articles</p>
            </div>
            <Link
              href="/admin/comments"
              className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
            >
              View All →
            </Link>
          </div>

          {data.recentComments.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-white/10 rounded-xl text-gray-500 text-xs">
              No blog comments yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.recentComments.slice(0, 3).map((item) => (
                <div
                  key={item._id}
                  className="p-3.5 rounded-xl bg-[#1c1614] border border-white/5 flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-white">{item.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        item.status === "Approved"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : item.status === "Pending"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">&quot;{item.comment}&quot;</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
