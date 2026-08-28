import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/mongodb";
import BlogComment from "../../../../models/BlogComment";
import { DUMMY_COMMENTS } from "../../../../data/dummyLeads";

if (!global._fallbackComments) {
  global._fallbackComments = [...DUMMY_COMMENTS];
}

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
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    let isDb = false;
    let comments = [];
    let total = 0;

    try {
      await connectToDatabase();
      const count = await BlogComment.countDocuments();
      if (count === 0) {
        await BlogComment.insertMany(DUMMY_COMMENTS);
      }

      const query = {};
      if (status && status !== "All") {
        query.status = status;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { comment: { $regex: search, $options: "i" } },
          { blogTitle: { $regex: search, $options: "i" } },
        ];
      }

      total = await BlogComment.countDocuments(query);
      comments = await BlogComment.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      isDb = true;
    } catch (dbErr) {
      console.warn("[Admin Comments] Using fallback data:", dbErr.message);
    }

    if (!isDb) {
      let filtered = [...global._fallbackComments];
      if (status && status !== "All") {
        filtered = filtered.filter((c) => c.status === status);
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.name.toLowerCase().includes(s) ||
            c.email.toLowerCase().includes(s) ||
            c.comment.toLowerCase().includes(s) ||
            (c.blogTitle && c.blogTitle.toLowerCase().includes(s))
        );
      }
      total = filtered.length;
      comments = filtered.slice(skip, skip + limit);
    }

    return NextResponse.json({
      success: true,
      data: comments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch comments error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    let updated = null;

    try {
      await connectToDatabase();
      updated = await BlogComment.findByIdAndUpdate(id, { status }, { new: true });
    } catch {
      // Fallback
    }

    if (!updated) {
      const idx = global._fallbackComments.findIndex((c) => c._id === id);
      if (idx !== -1) {
        global._fallbackComments[idx].status = status;
        updated = global._fallbackComments[idx];
      }
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update comment error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    try {
      await connectToDatabase();
      await BlogComment.findByIdAndDelete(id);
    } catch {
      // Fallback
    }

    global._fallbackComments = global._fallbackComments.filter((c) => c._id !== id);

    return NextResponse.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete comment error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
