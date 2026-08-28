import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";
import BlogComment from "../../../../models/BlogComment";
import { DUMMY_COMMENTS } from "../../../../data/dummyLeads";

if (!global._fallbackComments) {
  global._fallbackComments = [...DUMMY_COMMENTS];
}

export async function POST(req) {
  try {
    const { name, email, comment, blogSlug, blogTitle } = await req.json();

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    }
    if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "Valid email is required" }, { status: 400 });
    }
    if (!comment || !comment.trim()) {
      return NextResponse.json({ success: false, message: "Comment text is required" }, { status: 400 });
    }

    const newCommentData = {
      _id: `comment_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      comment: comment.trim(),
      blogSlug: blogSlug || "general",
      blogTitle: blogTitle || "Blog Post",
      createdAt: new Date().toISOString(),
    };

    try {
      await connectToDatabase();
      await BlogComment.create(newCommentData);
    } catch {
      // Fallback
    }

    if (!global._fallbackComments) global._fallbackComments = [...DUMMY_COMMENTS];
    global._fallbackComments.unshift(newCommentData);

    return NextResponse.json(
      {
        success: true,
        message: "Your comment has been posted successfully!",
        data: newCommentData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Post comment error:", error);
    return NextResponse.json({ success: false, message: "Failed to post comment" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const blogSlug = searchParams.get("slug");

    let comments = [];

    try {
      await connectToDatabase();
      const query = {};
      if (blogSlug) query.blogSlug = blogSlug;
      comments = await BlogComment.find(query).sort({ createdAt: -1 });
    } catch {
      // Fallback
    }

    if (!comments || comments.length === 0) {
      const all = global._fallbackComments || DUMMY_COMMENTS;
      comments = all.filter((c) => !blogSlug || c.blogSlug === blogSlug);
    }

    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    console.error("Fetch comments error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch comments" }, { status: 500 });
  }
}
