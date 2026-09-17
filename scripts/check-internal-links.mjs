import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const srcRoot = path.join(root, "src");
const publicRoot = path.join(root, "public");
const generatedRoutes = new Set(["/sitemap-index.xml"]);
const ignoredExtensions = new Set([".d.ts", ".map"]);

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

const read = async (relativePath) =>
  fs.readFile(path.join(root, relativePath), "utf8");

const toRoute = (relativePagePath) => {
  const withoutExt = relativePagePath
    .replace(/\\/g, "/")
    .replace(/\.astro$/, "")
    .replace(/\.mdx$/, "");

  if (withoutExt === "index") return "/";
  if (withoutExt.endsWith("/index")) return `/${withoutExt.slice(0, -"/index".length)}`;
  return `/${withoutExt}`;
};

const pageFiles = (await walk(path.join(srcRoot, "pages"))).filter((file) => {
  const ext = path.extname(file);
  return ext === ".astro" || ext === ".mdx";
});

const routeToFile = new Map();
const dynamicPages = [];

for (const file of pageFiles) {
  const relative = path.relative(path.join(root, "src", "pages"), file);
  const route = toRoute(relative);
  if (route.includes("/[")) {
    dynamicPages.push({ route, file });
    continue;
  }
  routeToFile.set(route, file);
}

const destinationSource = await read("src/data/destinations.ts");
const readyDestinationSlugs = new Set();
const destinationBlocks = destinationSource.matchAll(
  /\{[\s\S]*?slug:\s*["']([^"']+)["'][\s\S]*?status:\s*["'](ready|coming-soon)["'][\s\S]*?\}/g,
);
for (const match of destinationBlocks) {
  if (match[2] === "ready") readyDestinationSlugs.add(match[1]);
}

const ourTripsRoot = path.join(root, "src", "data", "our-trips");
const ourTripFiles = (await walk(ourTripsRoot)).filter((file) => file.endsWith(".ts"));
const ourTripSlugs = new Set();
for (const file of ourTripFiles) {
  const content = await fs.readFile(file, "utf8");
  for (const match of content.matchAll(/\bslug:\s*["']([^"']+)["']/g)) {
    ourTripSlugs.add(match[1]);
  }
}

const sourceFiles = (await walk(srcRoot)).filter((file) => {
  const ext = path.extname(file);
  return [".astro", ".ts", ".tsx", ".js", ".jsx", ".mdx"].includes(ext)
    && !ignoredExtensions.has(ext);
});

const staticRouteExists = (route) => routeToFile.has(route) || generatedRoutes.has(route);

const publicFileExists = async (route) => {
  const relativePath = route.replace(/^\//, "");
  if (!relativePath || relativePath.includes("..")) return false;
  try {
    const stat = await fs.stat(path.join(publicRoot, relativePath));
    return stat.isFile();
  } catch {
    return false;
  }
};

const dynamicRouteFile = (route) => {
  if (/^\/viajes\/[^/]+$/.test(route)) {
    return dynamicPages.find((page) => page.route === "/viajes/[slug]")?.file;
  }
  if (/^\/nuestros-viajes\/[^/]+$/.test(route)) {
    return dynamicPages.find((page) => page.route === "/nuestros-viajes/[slug]")?.file;
  }
  return undefined;
};

const existsRoute = async (route) => {
  if (staticRouteExists(route)) return true;

  if (/^\/viajes\/[^/]+$/.test(route)) {
    const slug = route.slice("/viajes/".length);
    return readyDestinationSlugs.has(slug);
  }

  if (/^\/nuestros-viajes\/[^/]+$/.test(route)) {
    const slug = route.slice("/nuestros-viajes/".length);
    return ourTripSlugs.has(slug);
  }

  return publicFileExists(route);
};

const findFragmentTargetFile = (route) =>
  routeToFile.get(route) ?? dynamicRouteFile(route);

const hasFragment = async (file, fragment) => {
  if (!file) return false;
  const content = await fs.readFile(file, "utf8");
  const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:id|name)=["']${escaped}["']`).test(content);
};

const hrefPattern = /href\s*=\s*(?:"([^"]+)"|'([^']+)')/g;
const problems = [];
const warnings = [];

for (const file of sourceFiles) {
  const content = await fs.readFile(file, "utf8");
  let match;

  while ((match = hrefPattern.exec(content))) {
    const href = (match[1] ?? match[2] ?? "").trim();
    if (!href) continue;

    const relative = path.relative(root, file).replace(/\\/g, "/");
    const line = content.slice(0, match.index).split("\n").length;

    if (href.startsWith("#")) {
      if (!(await hasFragment(file, href.slice(1)))) {
        problems.push(`${relative}:${line} → missing fragment ${href}`);
      }
      continue;
    }

    if (/^(mailto|tel):/i.test(href)) continue;

    if (/^https?:\/\//i.test(href)) {
      try {
        new URL(href);
      } catch {
        problems.push(`${relative}:${line} → malformed external URL ${href}`);
      }
      continue;
    }

    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/api/")) continue;
    if (href.includes("${") || href.includes("{")) continue;

    const [rawRoute, rawFragment] = href.split("#", 2);
    const route = (rawRoute.split("?")[0].replace(/\/$/, "") || "/");

    if (!(await existsRoute(route))) {
      problems.push(`${relative}:${line} → ${route}`);
      continue;
    }

    if (rawFragment) {
      const targetFile = findFragmentTargetFile(route);
      if (!(await hasFragment(targetFile, rawFragment))) {
        problems.push(`${relative}:${line} → missing fragment ${href}`);
      }
    }
  }
}

const destinationCard = await read("src/components/sections/DestinationCard.astro");
if (destinationCard.includes("/nuestros-viajes/${destination.slug}")) {
  if (!destinationCard.includes('import { ourTrips } from "../../data/our-trips";')) {
    problems.push("src/components/sections/DestinationCard.astro → dynamic our-trip links need a live-trip data guard");
  }
  if (!destinationCard.includes("ourTrips.some((trip) => trip.slug === destination.slug)")) {
    problems.push("src/components/sections/DestinationCard.astro → dynamic our-trip links must only use known our-trip slugs");
  }
}

if (ourTripSlugs.size === 0) {
  warnings.push("No lived-trip slugs were discovered under src/data/our-trips.");
}

console.log("\nInternal link integrity audit");
console.log("============================");
console.log(`- Static page routes: ${routeToFile.size}`);
console.log(`- Ready destination routes: ${readyDestinationSlugs.size}`);
console.log(`- Lived-trip routes: ${ourTripSlugs.size}`);
console.log("- Same-page and cross-page fragments: checked");
console.log("- External URL syntax: checked");

if (warnings.length) {
  for (const warning of warnings) console.warn(`- WARNING: ${warning}`);
}

if (problems.length) {
  console.error("\nInternal link audit failed:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log("\nInternal link audit passed.");
