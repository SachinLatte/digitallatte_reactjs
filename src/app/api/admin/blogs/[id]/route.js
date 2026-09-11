import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "../../../../../lib/auth";
import { connectToDatabase } from "../../../../../lib/mongodb";
import BlogPost from "../../../../../models/BlogPost";
import { ensureBlogsSeeded, getFallbackBlogs } from "../../../../../lib/blogs";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    let post = null;

    try {
      await connectToDatabase();
      await ensureBlogsSeeded();

      if (mongoose.Types.ObjectId.isValid(decodedId)) {
        post = await BlogPost.findById(decodedId).lean();
      }
      if (!post) {
        post = await BlogPost.findOne({ slug: decodedId }).lean();
      }
    } catch (dbErr) {
      console.warn("[Admin GET Blog] DB error, using fallback:", dbErr.message);
    }

    // Fallback store lookup
    if (!post) {
      const fallbackList = getFallbackBlogs();
      post = fallbackList.find(
        (p) => p.slug === decodedId || (p._id && p._id.toString() === decodedId)
      );
    }

    if (!post) {
      return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error("Admin get single blog error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      author,
      image,
      date,
      contentBlocks,
      status,
      tags,
      metaTitle,
      metaDescription,
    } = body;

    const updateFields = {};
    if (title !== undefined) updateFields.title = title.trim();
    if (slug !== undefined) updateFields.slug = slug.trim().toLowerCase();
    if (excerpt !== undefined) updateFields.excerpt = excerpt;
    if (author !== undefined) updateFields.author = author;
    if (image !== undefined) updateFields.image = image;
    if (contentBlocks !== undefined) updateFields.contentBlocks = contentBlocks;
    if (status !== undefined) updateFields.status = status;
    if (tags !== undefined) updateFields.tags = tags;
    if (metaTitle !== undefined) updateFields.metaTitle = metaTitle;
    if (metaDescription !== undefined) updateFields.metaDescription = metaDescription;

    if (date) {
      const d = new Date(date);
      if (!isNaN(d.getTime())) {
        const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthsUpper = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        updateFields.date = `${monthsShort[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}, ${d.getFullYear()}`;
        updateFields.day = String(d.getDate()).padStart(2, "0");
        updateFields.month = monthsUpper[d.getMonth()];
        updateFields.year = String(d.getFullYear());
      }
    }

    let updatedPost = null;

    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(decodedId)) {
        updatedPost = await BlogPost.findByIdAndUpdate(decodedId, { $set: updateFields }, { new: true });
      }
      if (!updatedPost) {
        updatedPost = await BlogPost.findOneAndUpdate({ slug: decodedId }, { $set: updateFields }, { new: true });
      }
    } catch (dbErr) {
      console.warn("[Admin PUT Blog] DB error, updating fallback:", dbErr.message);
    }

    // Update in fallback store
    const fallbackList = getFallbackBlogs();
    const idx = fallbackList.findIndex(
      (p) => p.slug === decodedId || (p._id && p._id.toString() === decodedId)
    );

    if (idx !== -1) {
      const newSlug = updateFields.slug || fallbackList[idx].slug;
      fallbackList[idx] = {
        ...fallbackList[idx],
        ...updateFields,
        _id: fallbackList[idx]._id && !mongoose.Types.ObjectId.isValid(fallbackList[idx]._id) ? newSlug : fallbackList[idx]._id,
        slug: newSlug,
      };
      if (!updatedPost) {
        updatedPost = fallbackList[idx];
      }
    }

    if (!updatedPost) {
      return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Article updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Admin update blog error:", error);
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    let deleted = false;

    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(decodedId)) {
        await BlogPost.findByIdAndDelete(decodedId);
        deleted = true;
      } else {
        await BlogPost.findOneAndDelete({ slug: decodedId });
        deleted = true;
      }
    } catch (dbErr) {
      console.warn("[Admin DELETE Blog] DB error, deleting from fallback:", dbErr.message);
    }

    if (global._fallbackBlogs) {
      const initialLen = global._fallbackBlogs.length;
      global._fallbackBlogs = global._fallbackBlogs.filter(
        (p) => p.slug !== decodedId && (p._id ? p._id.toString() !== decodedId : true)
      );
      if (global._fallbackBlogs.length < initialLen) {
        deleted = true;
      }
    }

    return NextResponse.json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    console.error("Admin delete blog error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
