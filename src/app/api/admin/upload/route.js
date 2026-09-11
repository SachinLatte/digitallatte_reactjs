import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "../../../../lib/auth";
import path from "path";
import fs from "fs/promises";

export async function POST(req) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    // Size validation: max 250 KB (250 * 1024 = 256,000 bytes)
    const MAX_SIZE_BYTES = 250 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      const currentKb = Math.round(file.size / 1024);
      return NextResponse.json(
        {
          success: false,
          message: `File size exceeds 250 KB (Current: ${currentKb} KB). Please compress your image below 250 KB.`,
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate extension
    const originalName = file.name || "image.webp";
    const extension = path.extname(originalName).toLowerCase() || ".webp";
    const allowedExtensions = [".webp", ".png", ".jpg", ".jpeg", ".svg"];

    if (!allowedExtensions.includes(extension)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid file format. Please upload a .webp format image.",
        },
        { status: 400 }
      );
    }

    const safeBaseName = path
      .basename(originalName, extension)
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .toLowerCase();

    const fileName = `${safeBaseName}-${Date.now()}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "blogs");

    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/blogs/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    });
  } catch (error) {
    console.error("Upload blog image error:", error);
    return NextResponse.json({ success: false, message: "Failed to upload file" }, { status: 500 });
  }
}
