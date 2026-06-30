import React from "react";

/**
 * Reusable utility component to truncate text dynamically.
 * Supports both `text` prop and inline `children`.
 *
 * @param {string} text - Text content to truncate (prop)
 * @param {React.ReactNode} children - Text content to truncate (children)
 * @param {number} limit - The maximum character length before truncating (default: 100)
 * @param {string} suffix - Suffix appended when truncated (default: "...")
 */
export default function TruncateText({ children, text, limit = 100, suffix = "..." }) {
  const content = text || children;
  if (!content) return null;

  const plainText = typeof content === "string" ? content : String(content);

  if (plainText.length <= limit) {
    return <>{plainText}</>;
  }

  return <>{plainText.slice(0, limit)}{suffix}</>;
}
