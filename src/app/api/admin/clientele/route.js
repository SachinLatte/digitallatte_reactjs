import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ClienteleCategory, ClienteleItem } from "@/models/Clientele";
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
    const category = searchParams.get("category") || "all";
    const showOnHomeParam = searchParams.get("showOnHome");
    const search = searchParams.get("search") || "";

    const filter = {};
    if (category !== "all") filter.category = category;
    if (showOnHomeParam === "true") filter.showOnHome = true;
    if (showOnHomeParam === "false") filter.showOnHome = false;

    let [categories, clients, stats] = await Promise.all([
      getAllCategories(),
      getAllClients(filter),
      getClienteleStats(),
    ]);

    if (search.trim()) {
      const q = search.toLowerCase();
      clients = clients.filter((c) => c.name.toLowerCase().includes(q));
    }

    return NextResponse.json({
      success: true,
      categories,
      clients,
      stats,
    });
  } catch (error) {
    console.error("[api/admin/clientele] GET error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch clientele data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action } = body;

    // 1. ADD NEW CATEGORY
    if (action === "add_category") {
      const { name, id: customId, description } = body;
      if (!name || !name.trim()) {
        return NextResponse.json(
          { success: false, message: "Category name is required" },
          { status: 400 }
        );
      }

      const id = (customId || name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const newCat = {
        id,
        name: name.trim(),
        description: description || "",
        order: (global._fallbackClientCategories?.length || 0) + 1,
      };

      // In-memory fallback
      if (!global._fallbackClientCategories.some((c) => c.id === id)) {
        global._fallbackClientCategories.push(newCat);
      } else {
        return NextResponse.json(
          { success: false, message: `Category with ID '${id}' already exists.` },
          { status: 400 }
        );
      }

      // MongoDB
      try {
        await connectToDatabase();
        await ClienteleCategory.findOneAndUpdate(
          { id },
          { $set: newCat },
          { upsert: true, new: true }
        );
      } catch (dbErr) {
        console.warn("[POST add_category] DB note:", dbErr.message);
      }

      return NextResponse.json({
        success: true,
        message: `Category "${name}" created successfully`,
        category: newCat,
      });
    }

    // 2. ADD NEW CLIENT LOGO
    if (action === "add_client") {
      const { name, logo, category, showOnHome } = body;
      if (!name || !name.trim()) {
        return NextResponse.json(
          { success: false, message: "Client / Brand name is required" },
          { status: 400 }
        );
      }
      if (!logo || !logo.trim()) {
        return NextResponse.json(
          { success: false, message: "Logo image is required" },
          { status: 400 }
        );
      }

      const cat = category || "top-brands";
      const id = `${cat}-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}`;
      const newClient = {
        id,
        _id: id,
        name: name.trim(),
        logo: logo.trim(),
        category: cat,
        showOnHome: Boolean(showOnHome),
        order: (global._fallbackClients?.length || 0) + 1,
      };

      // In-memory fallback
      global._fallbackClients.push(newClient);

      // MongoDB
      try {
        await connectToDatabase();
        const created = await ClienteleItem.create({
          name: newClient.name,
          logo: newClient.logo,
          category: newClient.category,
          showOnHome: newClient.showOnHome,
          order: newClient.order,
        });
        if (created) {
          newClient.id = created._id.toString();
          newClient._id = created._id.toString();
        }
      } catch (dbErr) {
        console.warn("[POST add_client] DB note:", dbErr.message);
      }

      return NextResponse.json({
        success: true,
        message: `Client "${name}" added successfully`,
        client: newClient,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[api/admin/clientele] POST error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { action } = body;

    // 1. REORDER CLIENTS
    if (action === "reorder_clients") {
      const { orderedIds } = body;
      if (!Array.isArray(orderedIds)) {
        return NextResponse.json(
          { success: false, message: "orderedIds array is required" },
          { status: 400 }
        );
      }

      // Update in-memory fallback
      const orderMap = new Map();
      orderedIds.forEach((id, idx) => orderMap.set(String(id), idx + 1));

      global._fallbackClients.forEach((client) => {
        const idKey = String(client.id || client._id);
        if (orderMap.has(idKey)) {
          client.order = orderMap.get(idKey);
        }
      });
      global._fallbackClients.sort((a, b) => (a.order || 0) - (b.order || 0));

      // MongoDB
      try {
        await connectToDatabase();
        const bulkOps = orderedIds.map((id, idx) => ({
          updateOne: {
            filter: { _id: id },
            update: { $set: { order: idx + 1 } },
          },
        }));
        if (bulkOps.length > 0) {
          await ClienteleItem.bulkWrite(bulkOps);
        }
      } catch (dbErr) {
        console.warn("[PUT reorder_clients] DB note:", dbErr.message);
      }

      return NextResponse.json({
        success: true,
        message: "Logos order updated successfully",
      });
    }

    // 2. TOGGLE HOMEPAGE SHOWCASE
    if (action === "toggle_home") {
      const { clientId, showOnHome } = body;
      if (!clientId) {
        return NextResponse.json(
          { success: false, message: "clientId is required" },
          { status: 400 }
        );
      }

      const idKey = String(clientId);
      const target = global._fallbackClients.find(
        (c) => String(c.id || c._id) === idKey
      );
      if (target) {
        target.showOnHome = Boolean(showOnHome);
      }

      // MongoDB
      try {
        await connectToDatabase();
        await ClienteleItem.findByIdAndUpdate(clientId, {
          $set: { showOnHome: Boolean(showOnHome) },
        });
      } catch (dbErr) {
        console.warn("[PUT toggle_home] DB note:", dbErr.message);
      }

      return NextResponse.json({
        success: true,
        message: `Homepage showcase updated`,
        showOnHome: Boolean(showOnHome),
      });
    }

    // 3. UPDATE CLIENT DETAILS
    if (action === "update_client") {
      const { id, name, logo, category, showOnHome } = body;
      if (!id) {
        return NextResponse.json(
          { success: false, message: "Client ID is required" },
          { status: 400 }
        );
      }

      const idKey = String(id);
      const target = global._fallbackClients.find(
        (c) => String(c.id || c._id) === idKey
      );
      if (target) {
        if (name) target.name = name.trim();
        if (logo) target.logo = logo.trim();
        if (category) target.category = category;
        if (showOnHome !== undefined) target.showOnHome = Boolean(showOnHome);
      }

      // MongoDB
      try {
        await connectToDatabase();
        await ClienteleItem.findByIdAndUpdate(id, {
          $set: {
            name: name?.trim(),
            logo: logo?.trim(),
            category,
            showOnHome: Boolean(showOnHome),
          },
        });
      } catch (dbErr) {
        console.warn("[PUT update_client] DB note:", dbErr.message);
      }

      return NextResponse.json({
        success: true,
        message: "Client updated successfully",
      });
    }

    // 4. UPDATE CATEGORY
    if (action === "update_category") {
      const { id, name, order } = body;
      const target = global._fallbackClientCategories.find((c) => c.id === id);
      if (target) {
        if (name) target.name = name.trim();
        if (order !== undefined) target.order = Number(order);
      }

      try {
        await connectToDatabase();
        await ClienteleCategory.findOneAndUpdate(
          { id },
          { $set: { name: name?.trim(), order: Number(order) } }
        );
      } catch (dbErr) {
        console.warn("[PUT update_category] DB note:", dbErr.message);
      }

      return NextResponse.json({
        success: true,
        message: "Category updated successfully",
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[api/admin/clientele] PUT error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    // 1. DELETE CLIENT
    if (action === "delete_client") {
      const idKey = String(id);
      global._fallbackClients = global._fallbackClients.filter(
        (c) => String(c.id || c._id) !== idKey
      );

      try {
        await connectToDatabase();
        await ClienteleItem.findByIdAndDelete(id);
      } catch (dbErr) {
        console.warn("[DELETE delete_client] DB note:", dbErr.message);
      }

      return NextResponse.json({
        success: true,
        message: "Client removed successfully",
      });
    }

    // 2. DELETE CATEGORY
    if (action === "delete_category") {
      global._fallbackClientCategories = global._fallbackClientCategories.filter(
        (c) => c.id !== id
      );

      try {
        await connectToDatabase();
        await ClienteleCategory.findOneAndDelete({ id });
      } catch (dbErr) {
        console.warn("[DELETE delete_category] DB note:", dbErr.message);
      }

      return NextResponse.json({
        success: true,
        message: "Category removed successfully",
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid delete action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[api/admin/clientele] DELETE error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete" },
      { status: 500 }
    );
  }
}
