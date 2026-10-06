import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const middleware = read("src/middleware.ts");
const config = read("astro.config.mjs");
const layout = read("src/layouts/Layout.astro");

const failures = [];

if (!/requestUrl\.hostname\.toLowerCase\(\) === "cruzandomeridianos\.com"/.test(middleware)) {
  failures.push("Middleware must redirect the bare domain to the canonical www host.");
}

if (!/requestUrl\.hostname = "www\.cruzandomeridianos\.com"/.test(middleware)) {
  failures.push("Middleware must normalize requests to www.cruzandomeridianos.com.");
}

if (!/requestUrl\.pathname\.length > 1 && requestUrl\.pathname\.endsWith\("\/"\)/.test(middleware)) {
  failures.push("Middleware must detect non-root trailing slashes for canonical URL normalization.");
}

if (!/requestUrl\.pathname = requestUrl\.pathname\.replace\(\/\\\+\$\//.test(middleware)) {
  failures.push("Middleware must strip trailing slashes before issuing the canonical redirect.");
}

if (!/site:\s*"https:\/\/www\.cruzandomeridianos\.com"/.test(config)) {
  failures.push("Astro site URL must use the canonical www HTTPS origin.");
}

if (!/<link rel="canonical" href=\{canonicalUrl\} \/>/.test(layout)) {
  failures.push("Layout must emit the canonical URL in the document head.");
}

const customPageMatches = [...config.matchAll(/https:\/\/www\.cruzandomeridianos\.com\/[^'"]+/g)].map((match) => match[0]);
const slashPages = customPageMatches.filter((url) => /[^/]\/$/.test(url));
if (slashPages.length) {
  failures.push(`Sitemap customPages contain trailing-slash URLs: ${slashPages.join(", ")}.`);
}

if (failures.length) {
  console.error("Canonical routing audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Canonical routing audit passed: canonical origin, trailing-slash redirects, head canonical and sitemap URLs are aligned.");
