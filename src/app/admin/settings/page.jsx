"use client";

import React, { useState } from "react";
import { FaLock, FaKey, FaShieldHalved, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa6";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (newPassword.length < 6) {
      setStatus({ type: "error", message: "New password must be at least 6 characters long." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", message: "New passwords do not match." });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus({
          type: "error",
          message: data.message || "Failed to update password. Please check your current password.",
        });
      } else {
        setStatus({
          type: "success",
          message: "Password updated successfully!",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Admin Account Settings</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your credentials, update your password, and view system status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Change Password Form */}
        <div className="lg:col-span-2 bg-[#16110f] border border-white/5 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
            <div className="p-2.5 rounded-xl bg-[#ff7b00]/10 text-[#ff7b00]">
              <FaKey />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Change Admin Password</h2>
              <p className="text-xs text-gray-400">Keep your account secure with a strong password</p>
            </div>
          </div>

          {status.message && (
            <div
              className={`mb-6 p-4 rounded-xl text-sm border flex items-center gap-2 ${
                status.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}
            >
              {status.type === "success" ? <FaCheck className="shrink-0" /> : <span>⚠️</span>}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Current Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full bg-[#120e0d] border border-white/10 rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                New Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full bg-[#120e0d] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full bg-[#120e0d] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="py-3 px-6 rounded-xl bg-[#ff7b00] hover:bg-[#ff881a] text-white font-semibold text-sm transition-all shadow-lg shadow-[#ff7b00]/20 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? "Saving..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Account Card */}
        <div className="space-y-6">
          <div className="bg-[#16110f] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <FaShieldHalved />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Active Account</h3>
                <span className="text-[11px] text-emerald-400 font-semibold">Superadmin</span>
              </div>
            </div>

            <div className="space-y-3 text-xs pt-2">
              <div>
                <span className="text-gray-500 block mb-0.5">Admin Email:</span>
                <span className="font-semibold text-white font-mono">sachin@digitallatte.in</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-0.5">Session:</span>
                <span className="text-gray-300">Secure HTTP-Only Cookie</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-0.5">Database:</span>
                <span className="text-gray-300">MongoDB Integration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
