import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { connectToDatabase } from "./mongodb";
import AdminUser from "../models/AdminUser";

const JWT_SECRET = process.env.JWT_SECRET || "digitallatte_super_secret_jwt_key_2026_secure";
const COOKIE_NAME = "admin_token";

export const DEFAULT_ADMIN_EMAIL = "sachin@digitallatte.in";
export const DEFAULT_ADMIN_PASS = "Iamdagad@365";

// Global fallback state for offline / initial development mode
if (!global._fallbackAdminPass) {
  global._fallbackAdminPass = DEFAULT_ADMIN_PASS;
}
if (!global._fallbackResetTokens) {
  global._fallbackResetTokens = new Map();
}

export function getFallbackPassword() {
  return global._fallbackAdminPass || DEFAULT_ADMIN_PASS;
}

export function setFallbackPassword(newPass) {
  global._fallbackAdminPass = newPass;
}

export function storeFallbackResetToken(token, email) {
  global._fallbackResetTokens.set(token, {
    email: email.toLowerCase(),
    expires: Date.now() + 60 * 60 * 1000, // 1 hour
  });
}

export function validateFallbackResetToken(token) {
  const record = global._fallbackResetTokens.get(token);
  if (!record) return null;
  if (record.expires < Date.now()) {
    global._fallbackResetTokens.delete(token);
    return null;
  }
  return record;
}

export function deleteFallbackResetToken(token) {
  global._fallbackResetTokens.delete(token);
}

// Sign a JWT token
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

// Verify a JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// Hash password
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Ensure default admin exists in MongoDB if DB is connected
export async function ensureDefaultAdmin() {
  try {
    await connectToDatabase();
    const count = await AdminUser.countDocuments();
    if (count === 0) {
      const currentPass = getFallbackPassword();
      const hashedPassword = await hashPassword(currentPass);
      await AdminUser.create({
        email: DEFAULT_ADMIN_EMAIL,
        password: hashedPassword,
        role: "superadmin",
      });
      console.log("[Auth] Default admin seeded in database:", DEFAULT_ADMIN_EMAIL);
    }
  } catch (err) {
    console.warn("[Auth] Database not available for seed, using fallback auth:", err.message);
  }
}

// Helper to authenticate request from cookies
export async function getAuthenticatedAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) return null;

    try {
      await connectToDatabase();
      const admin = await AdminUser.findById(decoded.userId).select("-password");
      if (admin) return admin;
    } catch {
      // Fallback if DB is offline but token is valid
    }

    // Return decoded token user as fallback
    if (decoded.email === DEFAULT_ADMIN_EMAIL || decoded.role) {
      return {
        _id: decoded.userId,
        email: decoded.email,
        role: decoded.role || "superadmin",
      };
    }

    return null;
  } catch (error) {
    console.error("Auth verification error:", error);
    return null;
  }
}

export { COOKIE_NAME };
