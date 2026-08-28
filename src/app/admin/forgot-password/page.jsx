"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaArrowLeft, FaCheck } from "react-icons/fa6";
import { getAssetPath } from "../../../utils/assetPath";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus({
          type: "error",
          message: data.message || "Failed to send reset link. Please try again.",
        });
      } else {
        setStatus({
          type: "success",
          message: data.message || "If the account exists, a password reset link has been sent.",
        });
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
    <div className="min-h-screen bg-[#0f0c0a] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff7b00]/10 rounded-full blur-[140px] pointer-events-none" />

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
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Reset Password</h1>
          <p className="text-sm text-gray-400 mt-1">
            Enter your email to receive a reset link
          </p>
        </div>

        {status.message && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm border flex items-center gap-3 ${status.type === "success"
              ? "bg-blue-950/40 border-blue-500/40 text-blue-300"
              : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}
          >
            {status.type === "success" ? (
              <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 text-xs">
                <FaCheck />
              </div>
            ) : (
              <span>⚠️</span>
            )}
            <p className="leading-relaxed">{status.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-300 text-[14px] tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
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
              "Send Reset Link"
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
    </div>
  );
}
