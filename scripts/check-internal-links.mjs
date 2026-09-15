import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourceRoots = [path.join(root, "src")];
const pendingRoutes = new Set(["/privacidad", "/aviso-legal", "/cookies"]);
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
const pending = new Map();

const existsRoute = (route) => route === "/" || routeMatchers.some(({ route: known, dynamicPrefix }) => {
  if (dynamicPrefix) return route.startsWith(dynamicPrefix) && route.slice(dynamicPrefix.length).length > 0 && !route.slice(dynamicPrefix.length).includes("/");
  return route === known;
});

for (const file of sourceFiles) {
  const content = await fs.readFile(file, "utf8");
  let match;
  while ((match = hrefPattern.exec(content))) {
    const href = match[1].trim();
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/api/")) continue;
    if (href.includes("${") || href.includes("{")) continue;

    const route = href.split("?")[0].replace(/\/$/, "") || "/";
    if (existsRoute(route)) continue;

    const relative = path.relative(root, file).replace(/\\/g, "/");
    const line = content.slice(0, match.index).split("\n").length;
    if (pendingRoutes.has(route)) {
      const list = pending.get(route) ?? [];
      list.push(`${relative}:${line}`);
      pending.set(route, list);
    } else {
      problems.push(`${relative}:${line} → ${route}`);
    }
  }
}

if (problems.length) {
  console.error("\nInternal link audit failed. Broken routes found:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log("Internal link audit passed.");
if (pending.size) {
  console.warn("\nKnown pending legal routes (intentionally not failing CI):");
  for (const [route, locations] of pending) {
    console.warn(`- ${route}: ${locations.join(", ")}`);
  }
}
