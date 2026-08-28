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

    // Verify session
    fetch("/api/admin/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.success) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [pathname, isAuthPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0c0a] text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#ff7b00]/30 border-t-[#ff7b00] rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading admin dashboard...</p>
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
            <Image
              src={getAssetPath("/img/logo.webp")}
              alt="Digital Latte"
              width={26}
              height={26}
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="font-bold text-white tracking-wide">Digital Latte Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white"
        >
          {sidebarOpen ? <FaXmark className="text-lg" /> : <FaBars className="text-lg" />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 bottom-0 left-0 z-50 w-64 bg-[#140f0e] border-r border-white/10 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <div className="p-2 bg-[#1c1614] border border-white/10 rounded-xl shadow-md flex items-center justify-center">
              <Image
                src={getAssetPath("/img/logo.webp")}
                alt="Digital Latte Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
                priority
              />
            </div>
            <div>
              <h2 className="font-bold text-white tracking-tight leading-tight">Digital Latte</h2>
              <span className="text-[11px] text-[#ff7b00] uppercase font-semibold tracking-wider">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="p-4 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const currentPath = (pathname || "").replace(/\/$/, "");
              const targetPath = item.href.replace(/\/$/, "");
              const isActive =
                targetPath === "/admin"
                  ? currentPath === "/admin" || currentPath === ""
                  : currentPath.startsWith(targetPath);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 outline-none select-none cursor-pointer ${
                    isActive
                      ? "bg-[#ff7b00] text-white shadow-lg shadow-[#ff7b00]/30 font-bold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`text-base ${isActive ? "text-white" : "text-gray-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom user card & logout */}
        <div className="p-4 border-t border-white/5 space-y-3">
          <div className="px-4 py-3 rounded-xl bg-[#1c1614] border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs font-bold">
              <FaShieldHalved />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">
                {user?.email || "sachin@digitallatte.in"}
              </p>
              <p className="text-[10px] text-emerald-400">Authenticated Admin</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors"
            >
              <FaGlobe className="text-xs text-gray-400" />
              <span>Visit Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs text-red-400 transition-colors cursor-pointer"
            >
              <FaArrowRightFromBracket className="text-xs" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen bg-[#0e0b0a] overflow-y-auto">
        <div className="p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
