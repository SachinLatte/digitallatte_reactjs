import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "../../../../../lib/mongodb";
import AdminUser from "../../../../../models/AdminUser";
import {
  hashPassword,
  validateFallbackResetToken,
  deleteFallbackResetToken,
  setFallbackPassword,
} from "../../../../../lib/auth";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: "Reset token and new password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    let updated = false;

    // 1. Try DB reset
    try {
      await connectToDatabase();
      const user = await AdminUser.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (user) {
        user.password = await hashPassword(password);
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();
        updated = true;
      }
    } catch (dbErr) {
      console.warn("[Reset-Password] MongoDB offline, checking fallback token store:", dbErr.message);
    }

    // 2. Check fallback store
    if (!updated) {
      const fallbackRecord = validateFallbackResetToken(token);
      if (fallbackRecord) {
        setFallbackPassword(password);
        deleteFallbackResetToken(token);
        updated = true;
      }
    }

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired password reset token" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully! You can now login with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}
