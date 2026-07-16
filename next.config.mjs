const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // Generate static files
  output: "export",

  // Required for static export
  images: {
    unoptimized: true,
  },

  // Optional: avoids trailing slash issues on Apache
  trailingSlash: true,

  // Expose the base path to the client code
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/test_link" : "",
  },

  // Since the app is hosted in a subdirectory in production
  ...(isProd
    ? {
        basePath: "/test_link",
        assetPrefix: "/test_link",
      }
    : {}),
};

export default nextConfig;
