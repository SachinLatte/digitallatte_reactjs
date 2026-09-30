const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const nextServerAppDir = path.join(rootDir, ".next", "server", "app");
const nextStaticDir = path.join(rootDir, ".next", "static");
const publicDir = path.join(rootDir, "public");
const outDir = path.join(rootDir, "out");

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function processHtmlFiles(dir, relativeDir = "") {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Ignore internal next directories or segments
      if (entry.name.startsWith("[") || entry.name.endsWith(".segments") || entry.name === "api") {
        // still process dynamic folders if they have static children
        if (!entry.name.endsWith(".segments") && entry.name !== "api") {
          processHtmlFiles(fullPath, path.join(relativeDir, entry.name));
        }
        continue;
      }
      processHtmlFiles(fullPath, path.join(relativeDir, entry.name));
    } else if (entry.name.endsWith(".html")) {
      const baseName = entry.name.replace(/\.html$/, "");
      let targetPath;

      if (baseName === "index") {
        targetPath = path.join(outDir, relativeDir, "index.html");
      } else if (baseName === "404" || baseName === "_not-found") {
        targetPath = path.join(outDir, "404.html");
      } else {
        // Create folder structure for clean Apache directory routing
        const pageFolder = path.join(outDir, relativeDir, baseName);
        if (!fs.existsSync(pageFolder)) {
          fs.mkdirSync(pageFolder, { recursive: true });
        }
        targetPath = path.join(pageFolder, "index.html");
        // Also copy as baseName.html for direct fallback
        fs.copyFileSync(fullPath, path.join(outDir, relativeDir, `${baseName}.html`));
      }

      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      fs.copyFileSync(fullPath, targetPath);
      console.log(`Exported: ${path.relative(outDir, targetPath)}`);
    }
  }
}

console.log("--- Starting Static Export to out/ ---");

// 1. Ensure out directory exists
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 2. Copy public directory assets to out/
console.log("Copying public assets...");
copyDirRecursive(publicDir, outDir);

// 3. Copy .next/static to out/_next/static
console.log("Copying Next.js static assets (_next/static)...");
const outNextStatic = path.join(outDir, "_next", "static");
copyDirRecursive(nextStaticDir, outNextStatic);

// 4. Process all generated HTML pages from .next/server/app
console.log("Processing HTML pages...");
processHtmlFiles(nextServerAppDir);

console.log("\n✅ Static Export Complete! All updated files are in the 'out/' folder.");
