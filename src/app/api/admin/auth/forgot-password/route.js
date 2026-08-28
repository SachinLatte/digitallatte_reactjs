import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "../../../../../lib/mongodb";
import AdminUser from "../../../../../models/AdminUser";
import { storeFallbackResetToken } from "../../../../../lib/auth";
import { sendPasswordResetEmail } from "../../../../../lib/email";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.trim()) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Generate crypto reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // 1. Try updating in MongoDB
    try {
      await connectToDatabase();
      const user = await AdminUser.findOne({ email: cleanEmail });
      if (user) {
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await user.save();
      }
    } catch (dbErr) {
      console.warn("[Forgot-Password] MongoDB offline, using fallback token store:", dbErr.message);
    }

    // 2. Always store in fallback store for resilience
    storeFallbackResetToken(resetToken, cleanEmail);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${appUrl}/admin/reset-password?token=${resetToken}`;

    // 3. Send email to recipient
    try {
      await sendPasswordResetEmail(cleanEmail, resetUrl);
    } catch (emailErr) {
      console.error("[Forgot-Password] Error sending email via SMTP:", emailErr.message);
    }

    // Return clean standard response matching production UI
    return NextResponse.json({
      success: true,
      message: "If the account exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}
