import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const assetRoots = [
  path.join(root, "public"),
  path.join(root, "src", "assets"),
];

const WARN_BYTES = 500 * 1024;
const FAIL_BYTES = 5 * 1024 * 1024;
const binaryExtensions = new Set([
  ".avif",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
  ".woff",
  ".woff2",
  ".mp3",
  ".mp4",
  ".mov",
]);

const walk = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
};

const files = [];
for (const rootPath of assetRoots) {
  try {
    files.push(...(await walk(rootPath)));
  } catch {
    // A missing optional asset root should not fail the audit.
  }
}

const assets = [];
for (const file of files) {
  if (!binaryExtensions.has(path.extname(file).toLowerCase())) continue;
  const stat = await fs.stat(file);
  assets.push({
    file: path.relative(root, file).replaceAll(path.sep, "/"),
    bytes: stat.size,
  });
}

assets.sort((a, b) => b.bytes - a.bytes);

const warnings = assets.filter(({ bytes }) => bytes > WARN_BYTES);
const failures = assets.filter(({ bytes }) => bytes > FAIL_BYTES);

console.log("Asset weight audit:");
for (const { file, bytes } of warnings.slice(0, 15)) {
  console.log(`- ${(bytes / 1024 / 1024).toFixed(2)} MB  ${file}`);
}

if (warnings.length === 0) {
  console.log("- No assets exceed 500 KB.");
}

if (failures.length) {
  console.error("\nAsset audit failed: files over 5 MB should be optimized or justified before production.");
  for (const { file, bytes } of failures) {
    console.error(`- ${(bytes / 1024 / 1024).toFixed(2)} MB  ${file}`);
  }
  process.exit(1);
}

console.log(`Asset audit passed: ${assets.length} binary assets checked.`);
