import { NextResponse } from "next/server";
import { addSubService, deleteSubService } from "@/lib/services";

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { success: false, message: "Sub-service title is required" },
        { status: 400 }
      );
    }

    const result = await addSubService(id, body);
    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/services/[id]/sub-services error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to add sub-service" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const subSlug = searchParams.get("subSlug");

    if (!subSlug) {
      return NextResponse.json(
        { success: false, message: "subSlug query parameter is required" },
        { status: 400 }
      );
    }

    const result = await deleteSubService(id, subSlug);
    return NextResponse.json(result);
  } catch (err) {
    console.error("DELETE /api/admin/services/[id]/sub-services error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete sub-service" },
      { status: 500 }
    );
  }
}
