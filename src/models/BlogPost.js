import mongoose from "mongoose";

const ContentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["paragraph", "heading", "image", "quote", "list"],
    },
    text: { type: String, default: "" },
    src: { type: String, default: "" },
    alt: { type: String, default: "" },
    ordered: { type: Boolean, default: false },
    items: { type: [String], default: [] },
  },
  { _id: false }
);

const BlogPostSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "Digital Latte Team",
    },
    image: {
      type: String,
      default: "/img/og-img.png",
    },
    date: {
      type: String,
      default: () => {
        const d = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}, ${d.getFullYear()}`;
      },
    },
    day: {
      type: String,
      default: () => String(new Date().getDate()).padStart(2, "0"),
    },
    month: {
      type: String,
      default: () => {
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        return months[new Date().getMonth()];
      },
    },
    year: {
      type: String,
      default: () => String(new Date().getFullYear()),
    },
    contentBlocks: {
      type: [ContentBlockSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
    tags: {
      type: [String],
      default: [],
    },
    metaTitle: {
      type: String,
      default: "",
    },
    metaDescription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
