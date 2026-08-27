export function getAssetPath(src) {
  if (!src) return "";
  if (typeof src !== "string") return src;
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!basePath) return src;
  if (src.startsWith(basePath)) return src;
  const cleanSrc = src.startsWith("/") ? src : `/${src}`;
  return `${basePath}${cleanSrc}`;
}

export default getAssetPath;
