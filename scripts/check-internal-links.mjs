import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourceRoots = [path.join(root, "src")];
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

const toRoute = (relativePagePath) => {
  const withoutExt = relativePagePath
    .replace(/\\/g, "/")
    .replace(/\.astro$/, "")
    .replace(/\.mdx$/, "");

  if (withoutExt === "index") return "/";
  if (withoutExt.endsWith("/index")) return `/${withoutExt.slice(0, -"/index".length)}`;
  return `/${withoutExt}`;
};

const routeMatcher = (relativePagePath) => {
  const route = toRoute(relativePagePath);
  if (route.includes("/[")) {
    const prefix = route.replace(/\/\[[^/]+\]/g, "");
    return { route, dynamicPrefix: prefix.endsWith("/") ? prefix : `${prefix}/` };
  }
  return { route };
};

const pageFiles = [];
for (const sourceRoot of sourceRoots) {
  const files = await walk(sourceRoot);
  pageFiles.push(...files.filter((file) => {
    const ext = path.extname(file);
    return (ext === ".astro" || ext === ".mdx") && file.includes(`${path.sep}pages${path.sep}`);
  }));
}

const routeMatchers = pageFiles.map((file) => routeMatcher(path.relative(path.join(root, "src", "pages"), file)));

const sourceFiles = [];
for (const sourceRoot of sourceRoots) {
  sourceFiles.push(...(await walk(sourceRoot)).filter((file) => {
    const ext = path.extname(file);
    return [".astro", ".ts", ".tsx", ".js", ".jsx"].includes(ext) && !ignoredExtensions.has(ext);
  }));
}

const hrefPattern = /href\s*=\s*["']([^"'#]+)(?:[#][^"']*)?["']/g;
const problems = [];

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

const existsRoute = async (route) => {
  if (route === "/" || generatedRoutes.has(route)) return true;
  if (routeMatchers.some(({ route: known, dynamicPrefix }) => {
    if (dynamicPrefix) {
      return route.startsWith(dynamicPrefix)
        && route.slice(dynamicPrefix.length).length > 0
        && !route.slice(dynamicPrefix.length).includes("/");
    }
    return route === known;
  })) return true;
  return publicFileExists(route);
};

for (const file of sourceFiles) {
  const content = await fs.readFile(file, "utf8");
  let match;
  while ((match = hrefPattern.exec(content))) {
    const href = match[1].trim();
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/api/")) continue;
    if (href.includes("${") || href.includes("{")) continue;

    const route = href.split("?")[0].replace(/\/$/, "") || "/";
    if (await existsRoute(route)) continue;

    const relative = path.relative(root, file).replace(/\\/g, "/");
    const line = content.slice(0, match.index).split("\n").length;
    problems.push(`${relative}:${line} → ${route}`);
  }
}

if (problems.length) {
  console.error("\nInternal link audit failed. Broken routes found:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log("Internal link audit passed.");
