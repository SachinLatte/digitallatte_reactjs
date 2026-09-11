import { connectToDatabase } from "./mongodb";
import BlogPost from "../models/BlogPost";
import { blogPosts as staticBlogPosts } from "../data/blog";

let isSeeding = false;

// Initialize in-memory fallback blog store
if (!global._fallbackBlogs) {
  global._fallbackBlogs = staticBlogPosts.map((post) => ({
    ...post,
    _id: post.slug,
    status: post.status || "published",
    author: post.author || "Digital Latte Team",
    image: post.image || "/img/og-img.png",
    date: post.date || "Dec 18, 2023",
    day: post.day || "18",
    month: post.month || "DEC",
    year: post.year || "2023",
    tags: post.tags || ["Digital Marketing"],
    metaTitle: post.title || "",
    metaDescription: post.excerpt || "",
    contentBlocks: post.contentBlocks || [],
  }));
}

export function getFallbackBlogs() {
  return global._fallbackBlogs;
}

export async function ensureBlogsSeeded() {
  if (isSeeding) return;
  try {
    await connectToDatabase();
    const count = await BlogPost.countDocuments();
    if (count === 0 && Array.isArray(global._fallbackBlogs) && global._fallbackBlogs.length > 0) {
      isSeeding = true;
      const formattedStatic = global._fallbackBlogs.map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || "",
        author: post.author || "Digital Latte Team",
        image: post.image || "/img/og-img.png",
        date: post.date || "Dec 18, 2023",
        day: post.day || "18",
        month: post.month || "DEC",
        year: post.year || "2023",
        contentBlocks: post.contentBlocks || [],
        status: post.status || "published",
        tags: post.tags || [],
        metaTitle: post.title || "",
        metaDescription: post.excerpt || "",
      }));
      await BlogPost.insertMany(formattedStatic, { ordered: false });
    }
  } catch (err) {
    console.warn("[ensureBlogsSeeded] Error seeding blogs:", err.message);
  } finally {
    isSeeding = false;
  }
}

export async function getBlogPosts({ status = "published", search = "", limit = 0, page = 1 } = {}) {
  try {
    await connectToDatabase();
    await ensureBlogsSeeded();

    const query = {};
    if (status && status !== "all" && status !== "All") {
      query.status = status.toLowerCase();
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    let q = BlogPost.find(query).sort({ createdAt: -1 });
    if (limit > 0) {
      q = q.skip((page - 1) * limit).limit(limit);
    }

    const posts = await q.lean();
    if (posts && posts.length > 0) {
      return posts.map((p) => ({
        ...p,
        _id: p._id.toString(),
      }));
    }
  } catch (err) {
    console.warn("[getBlogPosts] Falling back to memory/static:", err.message);
  }

  // Fallback to in-memory store
  let filtered = [...global._fallbackBlogs];
  if (status && status !== "all" && status !== "All") {
    filtered = filtered.filter((p) => (p.status || "published").toLowerCase() === status.toLowerCase());
  }
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title?.toLowerCase().includes(s) ||
        p.excerpt?.toLowerCase().includes(s) ||
        p.author?.toLowerCase().includes(s)
    );
  }
  if (limit > 0) {
    filtered = filtered.slice((page - 1) * limit, page * limit);
  }
  return filtered;
}

export async function getBlogPostBySlug(slug) {
  if (!slug) return null;

  const cleanSlug = decodeURIComponent(slug).replace(/^\/+|\/+$/g, "").trim().toLowerCase();

  try {
    await connectToDatabase();
    await ensureBlogsSeeded();
    const post = await BlogPost.findOne({
      $or: [
        { slug: cleanSlug },
        { slug: { $regex: `^${cleanSlug}$`, $options: "i" } },
      ],
    }).lean();
    if (post) {
      return {
        ...post,
        _id: post._id.toString(),
      };
    }
  } catch (err) {
    console.warn("[getBlogPostBySlug] Falling back to memory/static:", err.message);
  }

  return (
    global._fallbackBlogs.find(
      (p) =>
        (p.slug && p.slug.toLowerCase() === cleanSlug) ||
        (p._id && p._id.toString().toLowerCase() === cleanSlug)
    ) || null
  );
}

export async function getAllBlogSlugs() {
  try {
    await connectToDatabase();
    await ensureBlogsSeeded();
    const posts = await BlogPost.find({ status: "published" }, { slug: 1 }).lean();
    if (posts && posts.length > 0) {
      return posts.map((p) => ({ slug: p.slug }));
    }
  } catch (err) {
    console.warn("[getAllBlogSlugs] Falling back to memory/static:", err.message);
  }

  return global._fallbackBlogs.map((post) => ({ slug: post.slug }));
}
