import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const layout = read("src/layouts/Layout.astro");
const guidePage = read("src/pages/viajes/[slug].astro");
const guidesIndex = read("src/pages/viajes.astro");
const journeyPage = read("src/pages/cuentatuviaje.astro");
const robots = read("public/robots.txt");
const astroConfig = read("astro.config.mjs");

const failures = [];
const warnings = [];

const requirePattern = (source, pattern, label) => {
  if (!pattern.test(source)) failures.push(label);
};

const warnIfPattern = (source, pattern, label) => {
  if (pattern.test(source)) warnings.push(label);
};

requirePattern(layout, /<html\s+lang="es">/, "Layout must declare the Spanish document language.");
requirePattern(layout, /<title>\{title\}<\/title>/, "Layout must render the page title from props.");
requirePattern(layout, /name="description"\s+content=\{description\}/, "Layout must render the meta description from props.");
requirePattern(layout, /rel="canonical"\s+href=\{canonicalUrl\}/, "Layout must render a canonical URL.");
requirePattern(layout, /name="robots"\s+content=\{noindex \? "noindex, nofollow" : "index, follow"\}/, "Layout must expose an explicit robots directive.");
requirePattern(layout, /property="og:title"\s+content=\{title\}/, "Layout must expose an Open Graph title.");
requirePattern(layout, /property="og:description"\s+content=\{description\}/, "Layout must expose an Open Graph description.");
requirePattern(layout, /property="og:url"\s+content=\{canonicalUrl\}/, "Layout must expose an Open Graph URL.");
requirePattern(layout, /name="twitter:title"\s+content=\{title\}/, "Layout must expose a Twitter title.");
requirePattern(layout, /name="twitter:description"\s+content=\{description\}/, "Layout must expose a Twitter description.");
requirePattern(layout, /type="application\/ld\+json"/, "Layout must emit JSON-LD structured data.");
requirePattern(layout, /"@type": "WebSite"/, "Layout must emit WebSite structured data.");
requirePattern(layout, /"@type": "Organization"/, "Layout must emit Organization structured data.");

requirePattern(guidePage, /const breadcrumbSchema = \{/, "Guide pages must define breadcrumb structured data.");
requirePattern(guidePage, /"@type":\s*"Article"/, "Guide pages must emit Article structured data.");
requirePattern(guidePage, /headline:\s*guide\.title/, "Guide Article schema must use the editorial title as headline.");
requirePattern(guidePage, /description:\s*guide\.subtitle/, "Guide Article schema must use the editorial subtitle as description.");
requirePattern(guidePage, /dateModified:/, "Guide Article schema must expose the editorial update date when available.");
requirePattern(guidePage, /about:\s*\{/, "Guide Article schema must identify the destination entity.");
requirePattern(guidePage, /<h1>\s*\{guide\.title\}\s*<\/h1>/, "Guide pages must have a single primary H1 driven by the guide title.");
requirePattern(guidePage, /canonical=\{`\/viajes\/\$\{destination\.slug\}`\}/, "Guide pages must provide a stable canonical path.");

requirePattern(guidesIndex, /title="Guías de destino \| Cruzando Meridianos"/, "The destination index must use the public " + '"Guías de destino"' + " terminology in its title.");
requirePattern(guidesIndex, /<p class="eyebrow">GUÍAS DE DESTINO<\/p>/, "The destination index must use the public " + '"Guías de destino"' + " terminology in its hero.");
requirePattern(guidesIndex, /canonical="\/viajes"/, "The destination index must keep a stable canonical /viajes path.");

requirePattern(robots, /User-agent:\s*\*/, "robots.txt must define a wildcard crawler policy.");
requirePattern(robots, /Allow:\s*\//, "robots.txt must allow public crawling.");
requirePattern(robots, /Sitemap:\s*https:\/\/www\.cruzandomeridianos\.com\/sitemap-index\.xml/, "robots.txt must point crawlers to the sitemap index.");

requirePattern(astroConfig, /site:\s*'https:\/\/www\.cruzandomeridianos\.com'/, "Astro must declare the production site URL for canonical/sitemap generation.");
requirePattern(astroConfig, /sitemap\(/, "Astro must keep the sitemap integration enabled.");
requirePattern(astroConfig, /customPages:/, "The sitemap must explicitly include server-rendered destination pages.");

warnIfPattern(
  guidePage,
  /name:\s*"Viajes"\s*,\s*item:\s*"https:\/\/www\.cruzandomeridianos\.com\/viajes"/,
  "Guide breadcrumb structured data still uses the legacy public label \"Viajes\"; align it with \"Guías de destino\"."
);
warnIfPattern(
  guidePage,
  /Estado editorial|Última revisión:/,
  "Guide pages still expose internal editorial-status wording; migrate the public copy toward visitor-facing freshness language."
);
warnIfPattern(
  journeyPage,
  /class="privacy-note"/,
  "The journey form has a privacy note but no detected /privacidad link yet."
);

if (failures.length) {
  console.error("SEO audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

if (warnings.length) {
  console.warn("SEO audit warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

console.log("SEO architecture audit passed: metadata, canonical, robots, sitemap, JSON-LD and public destination terminology contracts are present.");
