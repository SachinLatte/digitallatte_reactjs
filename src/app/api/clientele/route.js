import { NextResponse } from "next/server";
import {
  getAllCategories,
  getAllClients,
  getClienteleStats,
  ensureClienteleSeeded,
} from "@/lib/clientele";

export async function GET(request) {
  try {
    await ensureClienteleSeeded();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const showOnHomeParam = searchParams.get("showOnHome");

    const filter = {};
    if (category && category !== "all") filter.category = category;
    if (showOnHomeParam === "true") filter.showOnHome = true;
    if (showOnHomeParam === "false") filter.showOnHome = false;

    const [categories, clients, stats] = await Promise.all([
      getAllCategories(),
      getAllClients(filter),
      getClienteleStats(),
    ]);

    return NextResponse.json({
      success: true,
      categories,
      clients,
      stats,
    });
  } catch (error) {
    console.error("[api/clientele] GET error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch clientele data" },
      { status: 500 }
    );
  }
}
