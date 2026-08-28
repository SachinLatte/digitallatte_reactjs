import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/mongodb";
import AdminUser from "../../../../../models/AdminUser";
import {
  signToken,
  COOKIE_NAME,
  ensureDefaultAdmin,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASS,
  getFallbackPassword,
} from "../../../../../lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Try Database authentication first
    let user = null;
    let isDbConnected = false;

    try {
      await connectToDatabase();
      await ensureDefaultAdmin();
      user = await AdminUser.findOne({ email: cleanEmail });
      isDbConnected = true;
    } catch (dbErr) {
      console.warn("[Login] MongoDB connection offline, checking fallback credentials:", dbErr.message);
    }

    if (isDbConnected && user) {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }

      const token = signToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      const response = NextResponse.json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });

      response.cookies.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    // 2. Fallback check (when DB is offline or before initial migration)
    if (cleanEmail === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
      const validPass = getFallbackPassword();
      if (password !== validPass) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }

      // Valid credentials under fallback
      const token = signToken({
        userId: "admin_master_sachin",
        email: DEFAULT_ADMIN_EMAIL,
        role: "superadmin",
      });

      const response = NextResponse.json({
        success: true,
        message: "Login successful",
        user: {
          id: "admin_master_sachin",
          email: DEFAULT_ADMIN_EMAIL,
          role: "superadmin",
        },
      });

      response.cookies.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    // Neither matched
    return NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Invalid email or password",
      },
      { status: 401 }
    );
  }
}
