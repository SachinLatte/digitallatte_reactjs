import mongoose from "mongoose";

const BlogCommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    comment: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true,
    },
    blogSlug: {
      type: String,
      default: "general",
    },
    blogTitle: {
      type: String,
      default: "Digital Marketing Article",
    },
    status: {
      type: String,
      enum: ["Approved", "Pending", "Spam"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.BlogComment ||
  mongoose.model("BlogComment", BlogCommentSchema);
