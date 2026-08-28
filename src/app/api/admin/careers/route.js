import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/mongodb";
import CareerSubmission from "../../../../models/CareerSubmission";
import { DUMMY_CAREERS, DUMMY_RESUMES } from "../../../../data/dummyLeads";

const ALL_SEED_CAREERS = [...DUMMY_CAREERS, ...DUMMY_RESUMES];

if (!global._fallbackCareers) {
  global._fallbackCareers = [...ALL_SEED_CAREERS];
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
    const type = searchParams.get("type") || ""; // "resume" | "job"
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    let isDb = false;
    let applications = [];
    let total = 0;

    try {
      await connectToDatabase();
      const count = await CareerSubmission.countDocuments();
      if (count === 0) {
        await CareerSubmission.insertMany(ALL_SEED_CAREERS);
      }

      const query = {};
      if (status && status !== "All") {
        query.status = status;
      }
      if (type === "resume") {
        query.jobId = "0";
      } else if (type === "job") {
        query.jobId = { $ne: "0" };
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { contact: { $regex: search, $options: "i" } },
          { jobTitle: { $regex: search, $options: "i" } },
        ];
      }

      total = await CareerSubmission.countDocuments(query);
      applications = await CareerSubmission.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      isDb = true;
    } catch (dbErr) {
      console.warn("[Admin Careers] Using fallback data:", dbErr.message);
    }

    if (!isDb) {
      let filtered = [...global._fallbackCareers];

      if (type === "resume") {
        filtered = filtered.filter((c) => c.jobId === "0");
      } else if (type === "job") {
        filtered = filtered.filter((c) => c.jobId !== "0");
      }

      if (status && status !== "All") {
        filtered = filtered.filter((c) => c.status === status);
      }

      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.name.toLowerCase().includes(s) ||
            c.email.toLowerCase().includes(s) ||
            c.contact.includes(s) ||
            c.jobTitle.toLowerCase().includes(s)
        );
      }
      total = filtered.length;
      applications = filtered.slice(skip, skip + limit);
    }

    return NextResponse.json({
      success: true,
      data: applications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch career applications error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id, status, notes } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    let updated = null;

    try {
      await connectToDatabase();
      const updateData = {};
      if (status) updateData.status = status;
      if (typeof notes === "string") updateData.notes = notes;

      updated = await CareerSubmission.findByIdAndUpdate(id, updateData, { new: true });
    } catch {
      // Fallback
    }

    if (!global._fallbackCareers) {
      global._fallbackCareers = [...ALL_SEED_CAREERS];
    }

    const idx = global._fallbackCareers.findIndex((c) => c._id === id);
    if (idx !== -1) {
      if (status) global._fallbackCareers[idx].status = status;
      if (typeof notes === "string") global._fallbackCareers[idx].notes = notes;
      updated = global._fallbackCareers[idx];
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update career application error:", error);
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
      await CareerSubmission.findByIdAndDelete(id);
    } catch {
      // Fallback
    }

    if (global._fallbackCareers) {
      global._fallbackCareers = global._fallbackCareers.filter((c) => c._id !== id);
    }

    return NextResponse.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    console.error("Delete career application error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
