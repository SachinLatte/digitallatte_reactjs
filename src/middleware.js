import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const isAuthPage =
      pathname.startsWith("/admin/login") ||
      pathname.startsWith("/admin/forgot-password") ||
      pathname.startsWith("/admin/reset-password");

    const token = request.cookies.get("admin_token")?.value;

    // If trying to access admin dashboard without token, redirect immediately to login
    if (!isAuthPage && !token) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // If already logged in and visiting login page, redirect to admin dashboard
    if (isAuthPage && token) {
      const dashboardUrl = new URL("/admin", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
