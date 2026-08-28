"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FaLock, FaCircleCheck, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";
import { getAssetPath } from "../../../utils/assetPath";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token") || "";

  const [token, setToken] = useState(tokenFromUrl);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!token) {
      setStatus({ type: "error", message: "Reset token is missing." });
      return;
    }

    if (password.length < 6) {
      setStatus({ type: "error", message: "Password must be at least 6 characters long." });
      return;
    }

    if (password !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus({
          type: "error",
          message: data.message || "Failed to reset password. The link may have expired.",
        });
      } else {
        setStatus({
          type: "success",
          message: "Password reset successful! Redirecting to login...",
        });
        setTimeout(() => {
          router.push("/admin/login");
        }, 2000);
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
    <div className="w-full max-w-md bg-[#191412]/90 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative z-10">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-[#120e0d] border border-white/10 rounded-2xl shadow-xl shadow-[#ff7b00]/10 flex items-center justify-center">
            <Image
              src={getAssetPath("/img/logo.webp")}
              alt="Digital Latte Logo"
              width={52}
              height={52}
              className="w-13 h-13 object-contain"
              priority
            />
          </div>
        </div>
        <h1 className="text-1xl sm:text-2xl font-bold tracking-tight text-white">Set New Password</h1>
        <p className="text-sm text-gray-400 mt-1">Create a new password for your admin account</p>
      </div>

      {status.message && (
        <div
          className={`mb-6 p-4 rounded-xl text-sm border flex items-center gap-2 ${status.type === "success"
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
            : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
        >
          {status.type === "success" ? <FaCircleCheck className="text-base shrink-0" /> : <span>⚠️</span>}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {!tokenFromUrl && (
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Reset Token
            </label>
            <input
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste reset token here"
              className="w-full bg-[#120e0d] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00] font-mono text-xs"
            />
          </div>
        )}

        <div>
          <label className="block text-[14px] font-semibold text-gray-300  tracking-wider mb-2">
            New Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="w-full bg-[#120e0d] border border-white/10 rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00] transition-colors"
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
          <label className="block text-[14px] font-semibold text-gray-300  tracking-wider mb-2">
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
              placeholder="Re-enter password"
              className="w-full bg-[#120e0d] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff7b00] transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ff7b00] to-[#e65c00] hover:from-[#ff881a] hover:to-[#f0680a] text-white font-semibold text-sm shadow-lg shadow-[#ff7b00]/25 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer gap-2"
        >
          {isLoading ? (
            <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Save New Password"
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <Link
          href="/admin/login"
          className="inline-flex items-center text-xs text-gray-400 hover:text-white transition-colors gap-2"
        >
          <FaArrowLeft className="text-[10px]" /> Back to Login
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#0f0c0a] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff7b00]/10 rounded-full blur-[140px] pointer-events-none" />
      <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
