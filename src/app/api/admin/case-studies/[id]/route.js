import { NextResponse } from "next/server";
import {
  getCaseStudyBySlug,
  updateCaseStudy,
  deleteCaseStudy,
} from "@/lib/caseStudies";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const study = await getCaseStudyBySlug(id);

    if (!study) {
      return NextResponse.json(
        { success: false, message: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: study, caseStudy: study });
  } catch (err) {
    console.error("GET /api/admin/case-studies/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch case study" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const result = await updateCaseStudy(id, body);
    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json({ ...result, caseStudy: result.data });
  } catch (err) {
    console.error("PUT /api/admin/case-studies/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update case study" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await deleteCaseStudy(id);
    return NextResponse.json(result);
  } catch (err) {
    console.error("DELETE /api/admin/case-studies/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete case study" },
      { status: 500 }
    );
  }
}
