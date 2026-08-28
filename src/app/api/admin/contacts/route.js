import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/mongodb";
import ContactSubmission from "../../../../models/ContactSubmission";
import { DUMMY_CONTACTS } from "../../../../data/dummyLeads";

if (!global._fallbackContacts) {
  global._fallbackContacts = [...DUMMY_CONTACTS];
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
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    let isDb = false;
    let contacts = [];
    let total = 0;

    try {
      await connectToDatabase();
      const count = await ContactSubmission.countDocuments();
      if (count === 0) {
        await ContactSubmission.insertMany(DUMMY_CONTACTS);
      }

      const query = {};
      if (status && status !== "All") {
        query.status = status;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { contact: { $regex: search, $options: "i" } },
          { message: { $regex: search, $options: "i" } },
        ];
      }

      total = await ContactSubmission.countDocuments(query);
      contacts = await ContactSubmission.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      isDb = true;
    } catch (dbErr) {
      console.warn("[Admin Contacts] Using fallback data:", dbErr.message);
    }

    if (!isDb) {
      let filtered = [...global._fallbackContacts];
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
            c.message.toLowerCase().includes(s)
        );
      }
      total = filtered.length;
      contacts = filtered.slice(skip, skip + limit);
    }

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch contacts error:", error);
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

      updated = await ContactSubmission.findByIdAndUpdate(id, updateData, { new: true });
    } catch {
      // Fallback update
    }

    if (!updated) {
      const idx = global._fallbackContacts.findIndex((c) => c._id === id);
      if (idx !== -1) {
        if (status) global._fallbackContacts[idx].status = status;
        if (typeof notes === "string") global._fallbackContacts[idx].notes = notes;
        updated = global._fallbackContacts[idx];
      }
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update contact error:", error);
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
      await ContactSubmission.findByIdAndDelete(id);
    } catch {
      // Fallback
    }

    global._fallbackContacts = global._fallbackContacts.filter((c) => c._id !== id);

    return NextResponse.json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Delete contact error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
