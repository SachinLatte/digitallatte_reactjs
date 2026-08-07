"use client";

import React, { useState } from "react";

export default function BlogCommentForm() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveDetails, setSaveDetails] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText || !name || !email) return;

    const newComment = {
      name,
      text: commentText,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    setComments([...comments, newComment]);
    setCommentText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="w-full mt-16 font-sans">
      <div className="border-t border-neutral-200 pt-10">
        <h3 className="text-[20px] font-sans font-bold text-[#16110f] mb-6">
          Leave a Reply
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitted && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded">
              Your comment has been posted successfully!
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
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-4 border border-neutral-200 focus:border-[#ff9000] focus:outline-none transition text-sm rounded"
            />
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
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-neutral-200 focus:border-[#ff9000] focus:outline-none transition text-sm rounded"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-neutral-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-neutral-200 focus:border-[#ff9000] focus:outline-none transition text-sm rounded"
              />
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
              className="px-8 py-3.5 bg-[#ff9000] hover:bg-[#e07f2a] text-white font-sans font-bold text-xs uppercase tracking-[2px] transition duration-300 rounded shadow-sm cursor-pointer"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>

      {/* Render comment list */}
      {comments.length > 0 && (
        <div className="mt-12 space-y-6">
          <h4 className="text-lg font-bold text-[#16110f] border-b border-neutral-100 pb-3">
            Comments ({comments.length})
          </h4>
          {comments.map((c, index) => (
            <div key={index} className="flex gap-4 p-5 bg-neutral-50 border border-neutral-150 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#ff9000]/10 flex items-center justify-center font-bold text-[#ff9000] text-sm shrink-0">
                {c.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h5 className="font-bold text-sm text-[#16110f]">{c.name}</h5>
                  <span className="text-[11px] text-neutral-400">{c.date}</span>
                </div>
                <p className="text-sm text-neutral-600 mt-2 whitespace-pre-wrap leading-relaxed">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
