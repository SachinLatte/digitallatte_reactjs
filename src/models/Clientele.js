import mongoose from "mongoose";

const ClienteleCategorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const ClienteleItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    showOnHome: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ClienteleCategory =
  mongoose.models.ClienteleCategory ||
  mongoose.model("ClienteleCategory", ClienteleCategorySchema);

export const ClienteleItem =
  mongoose.models.ClienteleItem ||
  mongoose.model("ClienteleItem", ClienteleItemSchema);
