"use client";

import React from "react";
import { FaUsersGear, FaUserPlus, FaShieldHalved } from "react-icons/fa6";

export default function AdminUsersPage() {
  const users = [
    {
      email: "sachin@digitallatte.in",
      role: "Super Admin",
      status: "Active",
      access: "Full Control (CMS + Leads + System)",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff7b00] uppercase tracking-wider mb-1 font-bold">
            <span>System & Settings</span>
            <span>•</span>
            <span>Access Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <FaUsersGear className="text-[#ff7b00]" />
            User Management & Roles
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage admin users, team invitations, and role-based permissions (Super Admin, Editor, Lead Viewer).
          </p>
        </div>

        <button
          onClick={() => alert("Invite New User feature is coming in the multi-user update!")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7b00] hover:bg-[#e06d00] text-white font-semibold text-sm transition-all shadow-lg shadow-[#ff7b00]/25 self-start sm:self-auto cursor-pointer"
        >
          <FaUserPlus className="text-xs" />
          <span>Invite New User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-[#140f0d] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Active Team Members</h2>
          <span className="text-xs text-gray-400 font-mono">1 Registered User</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#191412] text-xs uppercase font-bold text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Access Scope</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {users.map((user, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#ff7b00]/20 border border-[#ff7b00]/40 flex items-center justify-center text-[#ff7b00] font-bold text-xs uppercase">
                      {user.email.substring(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{user.email}</p>
                      <p className="text-xs text-gray-400">Master Account</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#ff7b00]/10 text-[#ff7b00] border border-[#ff7b00]/30">
                      <FaShieldHalved className="text-[10px]" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400 font-medium font-mono">
                    {user.access}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
