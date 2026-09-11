import { NextResponse } from "next/server";
import { getCaseStudies, createCaseStudy } from "@/lib/caseStudies";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "0", 10);

    const result = await getCaseStudies({ status, search, page, limit });
    return NextResponse.json(result);
  } catch (err) {
    console.error("GET /api/admin/case-studies error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.title || !body.client) {
      return NextResponse.json(
        { success: false, message: "Client name and title are required" },
        { status: 400 }
      );
    }

    const slug =
      body.slug?.trim() ||
      "digital-marketing-case-study-" +
        body.client
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

    const payload = {
      ...body,
      slug,
      status: body.status || "published",
    };

    const result = await createCaseStudy(payload);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/case-studies error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create case study" },
      { status: 500 }
    );
  }
}
