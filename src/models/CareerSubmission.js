import mongoose from "mongoose";

const CareerSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Applicant name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    jobId: {
      type: String,
      default: "general",
    },
    jobTitle: {
      type: String,
      default: "General Application",
    },
    photoData: {
      type: String, // Base64 data URL or path
      default: null,
    },
    resumeName: {
      type: String,
      default: "",
    },
    resumeData: {
      type: String, // Base64 data URL or path
      default: null,
    },
    coverNote: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["New", "Reviewed", "Interview Scheduled", "Shortlisted", "Rejected", "Hired"],
      default: "New",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.CareerSubmission ||
  mongoose.model("CareerSubmission", CareerSubmissionSchema);
