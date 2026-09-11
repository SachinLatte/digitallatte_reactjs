import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/mongodb";
import BlogPost from "../../../../models/BlogPost";
import { ensureBlogsSeeded, getFallbackBlogs } from "../../../../lib/blogs";

export async function GET(req) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "15", 10);
    const skip = (page - 1) * limit;

    let isDb = false;
    let posts = [];
    let total = 0;

    try {
      await connectToDatabase();
      await ensureBlogsSeeded();

      const query = {};
      if (status && status !== "All") {
        query.status = status.toLowerCase();
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { slug: { $regex: search, $options: "i" } },
          { excerpt: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
        ];
      }

      total = await BlogPost.countDocuments(query);
      posts = await BlogPost.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
      isDb = true;
    } catch (dbErr) {
      console.warn("[Admin Blogs API] Using fallback static data:", dbErr.message);
    }

    if (!isDb) {
      const fallbackList = getFallbackBlogs();
      let filtered = [...fallbackList];
      if (status && status !== "All") {
        filtered = filtered.filter((p) => (p.status || "published").toLowerCase() === status.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title?.toLowerCase().includes(s) ||
            p.slug?.toLowerCase().includes(s) ||
            p.excerpt?.toLowerCase().includes(s) ||
            p.author?.toLowerCase().includes(s)
        );
      }
      total = filtered.length;
      posts = filtered.slice(skip, skip + limit);
    }

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    console.error("Admin fetch blogs error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug: customSlug,
      excerpt,
      author,
      image,
      date: customDate,
      contentBlocks,
      status = "published",
      tags,
      metaTitle,
      metaDescription,
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
    }

    // Auto-generate slug if not provided
    let slug = (customSlug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    if (!slug) {
      slug = `article-${Date.now()}`;
    }

    // Date formatting
    const d = customDate ? new Date(customDate) : new Date();
    const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthsUpper = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const formattedDate = `${monthsShort[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}, ${d.getFullYear()}`;
    const day = String(d.getDate()).padStart(2, "0");
    const month = monthsUpper[d.getMonth()];
    const year = String(d.getFullYear());

    let newPost = null;

    try {
      await connectToDatabase();
      await ensureBlogsSeeded();

      // Check slug uniqueness
      const existing = await BlogPost.findOne({ slug });
      if (existing) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }

      newPost = await BlogPost.create({
        slug,
        title: title.trim(),
        excerpt: excerpt || "",
        author: author || "Digital Latte Team",
        image: image || "/img/og-img.png",
        date: formattedDate,
        day,
        month,
        year,
        contentBlocks: Array.isArray(contentBlocks) ? contentBlocks : [],
        status: status === "draft" ? "draft" : "published",
        tags: Array.isArray(tags) ? tags : [],
        metaTitle: metaTitle || title.trim(),
        metaDescription: metaDescription || excerpt || "",
      });
    } catch (dbErr) {
      console.warn("[Admin Create Blog] DB offline, storing in fallback:", dbErr.message);
    }

    if (!newPost) {
      newPost = {
        _id: slug,
        slug,
        title: title.trim(),
        excerpt: excerpt || "",
        author: author || "Digital Latte Team",
        image: image || "/img/og-img.png",
        date: formattedDate,
        day,
        month,
        year,
        contentBlocks: Array.isArray(contentBlocks) ? contentBlocks : [],
        status: status === "draft" ? "draft" : "published",
        tags: Array.isArray(tags) ? tags : [],
        metaTitle: metaTitle || title.trim(),
        metaDescription: metaDescription || excerpt || "",
      };
      if (global._fallbackBlogs) {
        global._fallbackBlogs.unshift(newPost);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Blog post published successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("Admin create blog error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create blog post" },
      { status: 500 }
    );
  }
}
