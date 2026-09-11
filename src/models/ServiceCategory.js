import mongoose from "mongoose";

const SubServiceSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  metaTitle: {
    type: String,
    default: "",
    trim: true,
  },
  metaDescription: {
    type: String,
    default: "",
    trim: true,
  },
  status: {
    type: String,
    enum: ["published", "draft"],
    default: "published",
  },
  order: {
    type: Number,
    default: 0,
  },
});

const BeyondSubLinkSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  slug: { type: String, default: "" },
});

const BeyondCardSchema = new mongoose.Schema({
  category: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  col1: [BeyondSubLinkSchema],
  col2: [BeyondSubLinkSchema],
});

const ServiceCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    heroHeading: {
      type: String,
      default: "",
      trim: true,
    },
    heroImage: {
      type: String,
      default: "",
      trim: true,
    },
    bioTitle: {
      type: String,
      default: "",
      trim: true,
    },
    bioParagraphs: {
      type: [String],
      default: [],
    },
    subServices: [SubServiceSchema],
    beyondTitle: {
      type: String,
      default: "",
      trim: true,
    },
    beyondCards: [BeyondCardSchema],
    clientsTitle: {
      type: String,
      default: "OUR CLIENTS",
      trim: true,
    },
    showClients: {
      type: Boolean,
      default: true,
    },
    metaTitle: {
      type: String,
      default: "",
      trim: true,
    },
    metaDescription: {
      type: String,
      default: "",
      trim: true,
    },
    icon: {
      type: String,
      default: "wrench",
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ServiceCategory ||
  mongoose.model("ServiceCategory", ServiceCategorySchema);
