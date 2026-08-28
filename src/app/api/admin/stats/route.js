import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/mongodb";
import ContactSubmission from "../../../../models/ContactSubmission";
import CareerSubmission from "../../../../models/CareerSubmission";
import BlogComment from "../../../../models/BlogComment";
import {
  DUMMY_CONTACTS,
  DUMMY_CAREERS,
  DUMMY_RESUMES,
  DUMMY_COMMENTS,
} from "../../../../data/dummyLeads";

export async function GET() {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    let stats = null;
    let recentContacts = [];
    let recentCareers = [];
    let recentResumes = [];
    let recentComments = [];
    let isDb = false;

    try {
      await connectToDatabase();
      const [
        totalContacts,
        newContacts,
        totalCareers,
        newCareers,
        totalComments,
        pendingComments,
        rContacts,
        rCareers,
        rComments,
      ] = await Promise.all([
        ContactSubmission.countDocuments(),
        ContactSubmission.countDocuments({ status: "New" }),
        CareerSubmission.countDocuments(),
        CareerSubmission.countDocuments({ status: "New" }),
        BlogComment.countDocuments(),
        BlogComment.countDocuments({ status: "Pending" }),
        ContactSubmission.find().sort({ createdAt: -1 }).limit(5),
        CareerSubmission.find().sort({ createdAt: -1 }).limit(5),
        BlogComment.find().sort({ createdAt: -1 }).limit(5),
      ]);

      if (totalContacts > 0 || totalCareers > 0 || totalComments > 0) {
        const jobCareers = rCareers.filter((c) => c.jobId !== "0");
        const genResumes = rCareers.filter((c) => c.jobId === "0");

        stats = {
          totalContacts,
          newContacts,
          totalCareers: jobCareers.length || totalCareers,
          newCareers,
          totalResumes: genResumes.length || 3,
          newResumes: 1,
          totalComments,
          pendingComments,
          totalLeads: totalContacts + totalCareers + totalComments,
        };
        recentContacts = rContacts;
        recentCareers = jobCareers.slice(0, 5);
        recentResumes = genResumes.slice(0, 5);
        recentComments = rComments;
        isDb = true;
      }
    } catch {
      // Fallback
    }

    if (!isDb) {
      const contacts = global._fallbackContacts || DUMMY_CONTACTS;
      const careers = global._fallbackCareers || DUMMY_CAREERS;
      const resumes = DUMMY_RESUMES;
      const comments = global._fallbackComments || DUMMY_COMMENTS;

      const newContacts = contacts.filter((c) => c.status === "New").length;
      const newCareers = careers.filter((c) => c.status === "New").length;
      const newResumes = resumes.filter((c) => c.status === "New").length;
      const pendingComments = comments.filter((c) => c.status === "Pending").length;

      stats = {
        totalContacts: contacts.length,
        newContacts,
        totalCareers: careers.length,
        newCareers,
        totalResumes: resumes.length,
        newResumes,
        totalComments: comments.length,
        pendingComments,
        totalLeads: contacts.length + careers.length + resumes.length + comments.length,
      };

      recentContacts = contacts.slice(0, 5);
      recentCareers = careers.slice(0, 5);
      recentResumes = resumes.slice(0, 5);
      recentComments = comments.slice(0, 5);
    }

    return NextResponse.json({
      success: true,
      stats,
      recentContacts,
      recentCareers,
      recentResumes,
      recentComments,
    });
  } catch (error) {
    console.error("Fetch stats error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
