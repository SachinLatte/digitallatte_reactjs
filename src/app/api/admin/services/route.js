import { NextResponse } from "next/server";
import { getServiceCategories, createServiceCategory } from "@/lib/services";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    const result = await getServiceCategories({ search });
    return NextResponse.json(result);
  } catch (err) {
    console.error("GET /api/admin/services/ error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, message: "Main service name is required" },
        { status: 400 }
      );
    }

    const result = await createServiceCategory(body);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/services/ error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create service" },
      { status: 500 }
    );
  }
}
