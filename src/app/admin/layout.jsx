"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FaChartPie,
  FaAddressBook,
  FaBriefcase,
  FaFileLines,
  FaComments,
  FaGear,
  FaArrowRightFromBracket,
  FaGlobe,
  FaBars,
  FaXmark,
  FaShieldHalved,
} from "react-icons/fa6";
import { getAssetPath } from "../../utils/assetPath";

const NAV_ITEMS = [
  { name: "Overview", href: "/admin", icon: FaChartPie },
  { name: "Contact Leads", href: "/admin/contacts", icon: FaAddressBook },
  { name: "Job Applications", href: "/admin/careers", icon: FaBriefcase },
  { name: "Resume Submissions", href: "/admin/resumes", icon: FaFileLines },
  { name: "Blog Comments", href: "/admin/comments", icon: FaComments },
  { name: "Settings & Password", href: "/admin/settings", icon: FaGear },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if current route is an auth page (login/forgot-password/reset-password)
  const isAuthPage =
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/forgot-password") ||
    pathname.startsWith("/admin/reset-password");

  useEffect(() => {
    if (isAuthPage) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/me");
        if (!res.ok) {
          if (isMounted) {
            setUser(null);
            setLoading(true);
          }
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        if (data && data.success && data.user) {
          if (isMounted) {
            setUser(data.user);
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setUser(null);
            setLoading(true);
          }
          router.replace("/admin/login");
        }
      } catch (err) {
        if (isMounted) {
          setUser(null);
          setLoading(true);
        }
        router.replace("/admin/login");
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, isAuthPage, router]);

  const handleLogout = async () => {
    try {
      setUser(null);
      setLoading(true);
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.replace("/admin/login");
    } catch (e) {
      console.error(e);
      router.replace("/admin/login");
    }
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0f0c0a] text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#ff7b00]/30 border-t-[#ff7b00] rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0b0a] text-gray-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#16110f] border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-[#1c1614] border border-white/10 flex items-center justify-center">
            <FaShieldHalved className="text-[#ff7b00] text-lg" />
          </div>
          <div>
            <span className="font-bold text-white tracking-wide text-sm block">Digital Latte</span>
            <span className="text-[10px] text-gray-400 font-mono block uppercase tracking-wider">Admin Portal</span>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition"
          aria-label="Toggle Menu"
        >
          {sidebarOpen ? <FaXmark className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Sidebar Backdrop for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#140f0d] border-r border-white/10 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand / Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff7b00] to-[#b35600] flex items-center justify-center shadow-lg shadow-[#ff7b00]/20">
              <FaShieldHalved className="text-white text-lg" />
            </div>
            <div>
              <span className="font-bold text-white tracking-wide text-base block font-sans">
                Digital Latte
              </span>
              <span className="text-xs text-neutral-400 font-mono block">Control Panel</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white p-1"
          >
            <FaXmark className="text-lg" />
          </button>
        </div>

        {/* User Badge */}
        {user && (
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ff7b00]/20 border border-[#ff7b00]/40 flex items-center justify-center text-[#ff7b00] font-bold text-xs uppercase">
                {user.email ? user.email.substring(0, 2) : "AD"}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-gray-200 truncate">{user.email}</p>
                <span className="text-[10px] text-[#ff7b00] uppercase font-mono tracking-wider font-semibold">
                  {user.role || "Admin"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#ff7b00] text-white shadow-lg shadow-[#ff7b00]/25 font-semibold"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.05]"
                }`}
              >
                <Icon className={`text-base ${isActive ? "text-white" : "text-gray-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick External Links & Logout */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] transition"
          >
            <FaGlobe className="text-sm text-gray-400" />
            <span>Visit Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
          >
            <FaArrowRightFromBracket className="text-sm text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
