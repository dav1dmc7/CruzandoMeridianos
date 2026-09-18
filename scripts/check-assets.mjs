import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();

const destinationsSource = await fs.readFile(
  path.join(root, "src", "data", "destinations.ts"),
  "utf8",
);


const destinationCoverInventory = destinationsSource
  .split(/\n\s*\{/)
  .slice(1)
  .flatMap((block) => {
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
    const coverKind = block.match(/coverKind:\s*"([^"]+)"/)?.[1];
    if (!slug || !coverKind) return [];
    return [{ slug, coverKind }];
  });

const coverInventoryByKind = destinationCoverInventory.reduce(
  (counts, destination) => {
    counts[destination.coverKind] = (counts[destination.coverKind] ?? 0) + 1;
    return counts;
  },
  {},
);

const destinationsUsingFallback = destinationsSource
  .split(/\n\s*\{/)
  .slice(1)
  .flatMap((block) => {
    if (!/status:\s*"ready"/.test(block) || !/image:\s*atlasGuideFallback/.test(block)) {
      return [];
    }

    const match = block.match(/slug:\s*"([^"]+)"/);
    return match ? [match[1]] : [];
  });

const costaRicaMediaPage = await fs.readFile(
  path.join(root, "src", "pages", "nuestros-viajes", "[slug].astro"),
  "utf8",
);
const costaRicaGuidePage = await fs.readFile(
  path.join(root, "src", "pages", "viajes", "[slug].astro"),
  "utf8",
);
const destinationsData = await fs.readFile(
  path.join(root, "src", "data", "destinations.ts"),
  "utf8",
);

const costaRicaDirectImageImport = /\.\.\/\.\.\/assets\/images\/costa-rica\//;
if (costaRicaDirectImageImport.test(costaRicaMediaPage) || costaRicaDirectImageImport.test(costaRicaGuidePage)) {
  console.warn("Costa Rica media warning: destination pages should consume the shared first-hand media registry.");
}

if (!/firstHandMediaBySlug\["costa-rica"\]/.test(costaRicaMediaPage)) {
  console.warn("Costa Rica media warning: lived-trip page is not consuming firstHandMediaBySlug.");
}

if (!/firstHandMediaBySlug\[slug\]/.test(costaRicaGuidePage)) {
  console.warn("Costa Rica media warning: guide page is not consuming the shared first-hand media registry.");
}

if (!/firstHandMediaBySlug\["costa-rica"\]/.test(destinationsData)) {
  console.warn("Costa Rica media warning: destination registry is not consuming the shared first-hand media cover.");
}

const assetRoots = [
  path.join(root, "public"),
  path.join(root, "src", "assets"),
];

const WARN_BYTES = 500 * 1024;
const FAIL_BYTES = 5 * 1024 * 1024;
const justifiedLargeAssets = new Set([
  "src/assets/images/costa-rica/arbol.jpg",
]);
const binaryExtensions = new Set([
  ".avif",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
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
const failures = assets.filter(
  ({ file, bytes }) => bytes > FAIL_BYTES && !justifiedLargeAssets.has(file)
);
const justified = assets.filter(
  ({ file, bytes }) => bytes > FAIL_BYTES && justifiedLargeAssets.has(file)
);

const coverKindMismatches = destinationCoverInventory.filter((destination) => {
  const usesFallback = destinationsUsingFallback.includes(destination.slug);
  return usesFallback !== (destination.coverKind === "placeholder");
});

if (coverKindMismatches.length) {
  for (const destination of coverKindMismatches) {
    console.error(
      `Cover metadata mismatch for "${destination.slug}": coverKind=${destination.coverKind}.`,
    );
  }
  process.exit(1);
}

console.log("\nDestination cover inventory:");
console.log(`- First-hand cover: ${coverInventoryByKind["first-hand"] ?? 0}`);
console.log(`- Existing editorial cover: ${coverInventoryByKind["existing-editorial"] ?? 0}`);
console.log(`- Placeholder cover: ${coverInventoryByKind["placeholder"] ?? 0}`);

if (destinationsUsingFallback.length) {
  console.warn("\nEditorial cover warnings:");
  for (const slug of destinationsUsingFallback) {
    console.warn(`- Ready destination "${slug}" still uses atlas-guide-fallback.svg as its cover.`);
  }
}

console.log("Asset weight audit:");
for (const { file, bytes } of warnings.slice(0, 15)) {
  console.log(`- ${(bytes / 1024 / 1024).toFixed(2)} MB  ${file}`);
}

if (warnings.length === 0) {
  console.log("- No assets exceed 500 KB.");
}

if (justified.length) {
  console.log("\nJustified large editorial masters:");
  for (const { file, bytes } of justified) {
    console.log(`- ${(bytes / 1024 / 1024).toFixed(2)} MB  ${file}`);
  }
}

if (failures.length) {
  console.error("\nAsset audit failed: files over 5 MB should be optimized or explicitly justified before production.");
  for (const { file, bytes } of failures) {
    console.error(`- ${(bytes / 1024 / 1024).toFixed(2)} MB  ${file}`);
  }
  process.exit(1);
}

console.log(`Asset audit passed: ${assets.length} binary assets checked.`);
