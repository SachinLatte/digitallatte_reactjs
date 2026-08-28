"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function BlogCommentForm({ blogSlug, blogTitle }) {
  const pathname = usePathname();
  const derivedSlug = blogSlug || pathname?.split("/").pop() || "general";
  const [commentText, setCommentText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveDetails, setSaveDetails] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleNameChange = (e) => {
    // Numbers not allowed in text/name field
    const sanitized = e.target.value.replace(/[^a-zA-Z\s.-]/g, "");
    setName(sanitized);
    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
    if (errors.comment) setErrors((prev) => ({ ...prev, comment: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!commentText.trim()) {
      errs.comment = "Comment is required";
    }

    if (!name.trim()) {
      errs.name = "Name is required";
    } else if (/[0-9]/.test(name) || !/^[a-zA-Z\s.-]{2,50}$/.test(name.trim())) {
      errs.name = "Numbers are not allowed in name (letters only)";
    }

    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/blog/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          comment: commentText.trim(),
          blogSlug: derivedSlug,
          blogTitle: blogTitle || derivedSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCommentText("");
        setName("");
        setEmail("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-16 font-sans">
      <div className="border-t border-neutral-200 pt-10">
        <h3 className="text-[20px] font-sans font-bold text-[#16110f] mb-6">
          Leave a Reply
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {submitted && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-center gap-2">
              <span>✓</span> Your comment has been posted successfully!
            </div>
          )}

          {/* Comment Field */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-neutral-700 mb-2">
              Comment *
            </label>
            <textarea
              required
              rows={6}
              value={commentText}
              onChange={handleCommentChange}
              className={`w-full p-4 border rounded-lg focus:outline-none transition text-sm ${
                errors.comment
                  ? "border-red-500 bg-red-50/20"
                  : "border-neutral-200 focus:border-[#ff9000]"
              }`}
              placeholder="Share your thoughts..."
            />
            {errors.comment && (
              <span className="text-xs text-red-500 mt-1">{errors.comment}</span>
            )}
          </div>

          {/* Name & Email Grid */}
          <div className="grid grid-cols-2 w769:grid-cols-1 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-neutral-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={handleNameChange}
                placeholder="Your Name (letters only)"
                className={`w-full p-3 border rounded-lg focus:outline-none transition text-sm ${
                  errors.name
                    ? "border-red-500 bg-red-50/20"
                    : "border-neutral-200 focus:border-[#ff9000]"
                }`}
              />
              {errors.name && (
                <span className="text-xs text-red-500 mt-1">{errors.name}</span>
              )}
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-neutral-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                placeholder="your.email@example.com"
                className={`w-full p-3 border rounded-lg focus:outline-none transition text-sm ${
                  errors.email
                    ? "border-red-500 bg-red-50/20"
                    : "border-neutral-200 focus:border-[#ff9000]"
                }`}
              />
              {errors.email && (
                <span className="text-xs text-red-500 mt-1">{errors.email}</span>
              )}
            </div>
          </div>

          {/* Save details checkbox */}
          <div className="flex items-start gap-3 select-none">
            <input
              type="checkbox"
              id="save-checkbox"
              checked={saveDetails}
              onChange={(e) => setSaveDetails(e.target.checked)}
              className="mt-1 accent-[#ff9000]"
            />
            <label htmlFor="save-checkbox" className="text-xs text-neutral-500 cursor-pointer">
              Save my name, email, and website in this browser for the next time I comment.
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-[#ff9000] hover:bg-[#e07f2a] disabled:opacity-50 text-white font-sans font-bold text-xs uppercase tracking-[2px] transition duration-300 rounded shadow-sm cursor-pointer"
            >
              {loading ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
