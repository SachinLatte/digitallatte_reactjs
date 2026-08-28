import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";
import CareerSubmission from "../../../../models/CareerSubmission";
import { DUMMY_CAREERS } from "../../../../data/dummyLeads";
import { sendCareerAutoReply } from "../../../../lib/email";

if (!global._fallbackCareers) {
  global._fallbackCareers = [...DUMMY_CAREERS];
}

export async function POST(req) {
  try {
    let body;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const name = formData.get("name")?.toString() || "";
      const email = formData.get("email")?.toString() || "";
      const contact = formData.get("contact")?.toString() || "";
      const jobId = formData.get("jobId")?.toString() || "general";
      const jobTitle = formData.get("jobTitle")?.toString() || "General Application";
      const coverNote = (formData.get("coverNote") || formData.get("message") || "").toString();

      // Handle photo file if present
      let photoData = null;
      const photoFile = formData.get("photo");
      if (photoFile && typeof photoFile === "object" && photoFile.size > 0) {
        if (photoFile.size > 1024 * 1024) {
          return NextResponse.json({ success: false, message: "Photo file size must be below 1 MB" }, { status: 400 });
        }
        const isJpg =
          (photoFile.type && photoFile.type.includes("jpeg")) ||
          (photoFile.name && (photoFile.name.toLowerCase().endsWith(".jpg") || photoFile.name.toLowerCase().endsWith(".jpeg")));
        if (!isJpg) {
          return NextResponse.json({ success: false, message: "Photo attachment must be in JPG format" }, { status: 400 });
        }
        const bytes = await photoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        photoData = `data:${photoFile.type || "image/jpeg"};base64,${buffer.toString("base64")}`;
      }

      // Handle CV/resume file if present
      let resumeData = null;
      let resumeName = "";
      const resumeFile = formData.get("resume") || formData.get("cv");
      if (resumeFile && typeof resumeFile === "object" && resumeFile.size > 0) {
        if (resumeFile.size > 5 * 1024 * 1024) {
          return NextResponse.json({ success: false, message: "Resume file size must be below 5 MB" }, { status: 400 });
        }
        const isPdf =
          (resumeFile.type && resumeFile.type.includes("pdf")) ||
          (resumeFile.name && resumeFile.name.toLowerCase().endsWith(".pdf"));
        if (!isPdf) {
          return NextResponse.json({ success: false, message: "Resume attachment must be in PDF format" }, { status: 400 });
        }
        resumeName = resumeFile.name || "resume.pdf";
        const bytes = await resumeFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        resumeData = `data:${resumeFile.type || "application/pdf"};base64,${buffer.toString("base64")}`;
      }

      body = {
        name,
        email,
        contact,
        jobId,
        jobTitle,
        coverNote,
        photoData,
        resumeName,
        resumeData,
      };
    } else {
      body = await req.json();
    }

    const { name, email, contact, jobId, jobTitle, coverNote, photoData, resumeName, resumeData } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, message: "Applicant name is required" }, { status: 400 });
    }
    if (/[0-9]/.test(name) || !/^[a-zA-Z\s.-]{2,50}$/.test(name.trim())) {
      return NextResponse.json(
        { success: false, message: "Numbers are not allowed in name (letters only)" },
        { status: 400 }
      );
    }

    if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "A valid email is required" }, { status: 400 });
    }

    if (!contact || !contact.trim()) {
      return NextResponse.json({ success: false, message: "Contact number is required" }, { status: 400 });
    }
    const cleanContact = contact.trim().replace(/\D/g, "");
    if (cleanContact.length !== 10) {
      return NextResponse.json(
        { success: false, message: "Mobile number must be exactly 10 digits" },
        { status: 400 }
      );
    }

    const submissionData = {
      _id: `app_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      contact: cleanContact,
      jobId: jobId || "general",
      jobTitle: jobTitle || "General Application",
      coverNote: coverNote ? coverNote.trim() : "",
      photoData: photoData || null,
      resumeName: resumeName || "",
      resumeData: resumeData || null,
      status: "New",
      createdAt: new Date().toISOString(),
    };

    try {
      await connectToDatabase();
      await CareerSubmission.create(submissionData);
    } catch {
      // Fallback
    }

    if (!global._fallbackCareers) {
      global._fallbackCareers = [...DUMMY_CAREERS];
    }
    global._fallbackCareers.unshift(submissionData);

    // Dispatch auto-reply email to applicant
    sendCareerAutoReply(submissionData.name, submissionData.email, submissionData.jobTitle).catch((err) => {
      console.error("[Career Auto-Reply Error]:", err.message);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully! Our team will get back to you.",
        data: submissionData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting career application:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application. Please check your connection and try again.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
