import { NextResponse } from "next/server";
import {
  getServiceCategoryBySlug,
  updateServiceCategory,
  deleteServiceCategory,
} from "@/lib/services";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const cat = await getServiceCategoryBySlug(id);

    if (!cat) {
      return NextResponse.json(
        { success: false, message: "Service category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: cat, category: cat });
  } catch (err) {
    console.error("GET /api/admin/services/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch service" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const result = await updateServiceCategory(id, body);
    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json({ ...result, category: result.data });
  } catch (err) {
    console.error("PUT /api/admin/services/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await deleteServiceCategory(id);
    return NextResponse.json(result);
  } catch (err) {
    console.error("DELETE /api/admin/services/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete service" },
      { status: 500 }
    );
  }
}
