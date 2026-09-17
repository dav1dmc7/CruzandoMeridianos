import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const srcRoot = path.join(root, "src");
const ignoredDirectories = new Set(["node_modules", ".astro", "dist"]);
const sourceExtensions = new Set([".astro", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".md", ".mdx"]);
const ownHosts = new Set(["cruzandomeridianos.com", "www.cruzandomeridianos.com"]);
const preconnectOrigins = new Set(["fonts.googleapis.com", "fonts.gstatic.com"]);
const requestTimeoutMs = 8000;
const concurrency = 5;

const walk = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;

    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (sourceExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
};

const sourceFiles = await walk(srcRoot);
const urlLocations = new Map();
const urlPattern = /https?:\/\/[^\s"'<>`]+/g;
const trailingPunctuation = /[),.;:!?]}]+$/;

for (const file of sourceFiles) {
  const content = await fs.readFile(file, "utf8");
  let match;

  while ((match = urlPattern.exec(content))) {
    const candidate = match[0].replace(trailingPunctuation, "");

    if (candidate.includes("${") || candidate.includes("{{")) continue;

    let parsed;
    try {
      parsed = new URL(candidate);
    } catch {
      continue;
    }

    if (!/^https?:$/.test(parsed.protocol)) continue;
    if (ownHosts.has(parsed.hostname.toLowerCase())) continue;
    if (preconnectOrigins.has(parsed.hostname.toLowerCase()) && parsed.pathname === "/" && !parsed.search && !parsed.hash) continue;

    const relative = path.relative(root, file).replace(/\\/g, "/");
    const line = content.slice(0, match.index).split("\n").length;

    if (!urlLocations.has(candidate)) urlLocations.set(candidate, []);
    urlLocations.get(candidate).push(`${relative}:${line}`);
  }
}

const urls = [...urlLocations.keys()].sort();
const failures = [];
const warnings = [];

const checkUrl = async (url) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "CruzandoMeridianos-link-audit/1.0",
      },
    });

    if ([405, 501].includes(response.status)) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "user-agent": "CruzandoMeridianos-link-audit/1.0",
          range: "bytes=0-0",
        },
      });
    }

    return {
      status: response.status,
      finalUrl: response.url,
    };
  } finally {
    clearTimeout(timeout);
  }
};

const queue = [...urls];
const results = [];

const worker = async () => {
  while (queue.length > 0) {
    const url = queue.shift();
    if (!url) return;

    try {
      const result = await checkUrl(url);
      results.push({ url, ...result });
    } catch (error) {
      results.push({
        url,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
};

await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker));

for (const result of results.sort((a, b) => a.url.localeCompare(b.url))) {
  const locations = urlLocations.get(result.url) ?? [];

  if (result.error) {
    warnings.push(`${result.url} → request failed (${result.error}); ${locations.join(", ")}`);
    continue;
  }

  if ([404, 410].includes(result.status)) {
    failures.push(`${result.url} → HTTP ${result.status}; ${locations.join(", ")}`);
    continue;
  }

  if (result.status >= 500 || result.status === 429) {
    warnings.push(`${result.url} → HTTP ${result.status}; ${locations.join(", ")}`);
  }

  if ([401, 403].includes(result.status)) {
    warnings.push(`${result.url} → HTTP ${result.status} (reachable but restricted to automated checks); ${locations.join(", ")}`);
  }
}

console.log("\nExternal link health audit");
console.log("==========================");
console.log(`- Unique external URLs checked: ${urls.length}`);
console.log("- Redirects followed: yes");
console.log("- 404/410 responses: blocking");
console.log("- 429/5xx/network restrictions: warnings");
console.log("- Template URLs and font preconnect origins: excluded from live checks");

if (warnings.length) {
  console.warn("\nExternal link warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("\nExternal link audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nExternal link health audit passed.");
