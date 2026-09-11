import mongoose from "mongoose";

const CreativeImageSchema = new mongoose.Schema(
  {
    src: { type: String, default: "" },
    alt: { type: String, default: "" },
  },
  { _id: false }
);

const CreativeGridSectionSchema = new mongoose.Schema(
  {
    layout: {
      type: String,
      enum: ["grid-1", "grid-2", "grid-3"],
      default: "grid-2",
    },
    images: [CreativeImageSchema],
  },
  { _id: false }
);

const StatItemSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    value: { type: String, default: "" },
  },
  { _id: false }
);

const CaseStudySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      index: true,
    },
    client: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    breadcrumbText: {
      type: String,
      default: "",
    },
    services: {
      type: String,
      default: "Branding, Graphic Design, Print, Digital",
    },
    heroType: {
      type: String,
      enum: ["banner", "classic"],
      default: "banner",
    },
    heroTitle: {
      type: String,
      default: "",
    },
    heroBg: {
      type: String,
      default: "",
    },
    topBannerImg: {
      type: String,
      default: "",
    },
    brandInfoImg: {
      type: String,
      default: "",
    },
    storyVideoUrl: {
      type: String,
      default: "",
    },
    description: {
      type: [String],
      default: [],
    },
    quote: {
      type: String,
      default: "",
    },
    stats: {
      type: [StatItemSchema],
      default: [],
    },
    creativeGrid: {
      type: [CreativeGridSectionSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
      index: true,
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

export default mongoose.models.CaseStudy ||
  mongoose.model("CaseStudy", CaseStudySchema);
