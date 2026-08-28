import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import ContactSubmission from "../../../models/ContactSubmission";
import { DUMMY_CONTACTS } from "../../../data/dummyLeads";
import { sendContactAutoReply } from "../../../lib/email";

if (!global._fallbackContacts) {
  global._fallbackContacts = [...DUMMY_CONTACTS];
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, contact, email, message, sourcePage } = body;

    // Strict Validations
    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    }
    if (/[0-9]/.test(name) || !/^[a-zA-Z\s.-]{2,50}$/.test(name.trim())) {
      return NextResponse.json(
        { success: false, message: "Numbers are not allowed in name (letters only)" },
        { status: 400 }
      );
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

    if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "A valid email is required" }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ success: false, message: "Message is required" }, { status: 400 });
    }

    const contactData = {
      _id: `contact_${Date.now()}`,
      name: name.trim(),
      contact: cleanContact,
      email: email.trim().toLowerCase(),
      message: message.trim(),
      sourcePage: sourcePage || "Contact Us",
      status: "New",
      createdAt: new Date().toISOString(),
    };

    try {
      await connectToDatabase();
      await ContactSubmission.create(contactData);
    } catch {
      // Fallback
    }

    if (!global._fallbackContacts) {
      global._fallbackContacts = [...DUMMY_CONTACTS];
    }
    global._fallbackContacts.unshift(contactData);

    // Dispatch auto-reply email to submitter
    sendContactAutoReply(contactData.name, contactData.email).catch((err) => {
      console.error("[Contact Auto-Reply Error]:", err.message);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been received.",
        data: contactData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit form. Please check your connection and try again.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
