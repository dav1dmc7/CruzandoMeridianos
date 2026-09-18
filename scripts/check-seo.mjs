import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const layout = read("src/layouts/Layout.astro");
const guidePage = read("src/pages/viajes/[slug].astro");
const guidesIndex = read("src/pages/viajes.astro");
const guidesData = read("src/data/guides/index.ts");
const journeyPage = read("src/pages/cuentatuviaje.astro");
const robots = read("public/robots.txt");
const astroConfig = read("astro.config.mjs");

const failures = [];
const requirePattern = (source, pattern, label) => {
  if (!pattern.test(source)) failures.push(label);
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
requirePattern(
  layout,
  /costaRicaBreadcrumbLabel\s*&&\s*currentPath\s*!==\s*"\/viajes\/costa-rica"/,
  "Layout must not emit the secondary Costa Rica breadcrumb schema on the guide root, where the guide page already provides its own breadcrumb.",
);

requirePattern(guidePage, /const breadcrumbSchema = \{/, "Guide pages must define breadcrumb structured data.");
requirePattern(guidePage, /"@type":\s*"Article"/, "Guide pages must emit Article structured data.");
requirePattern(guidePage, /headline:\s*publicGuideTitle/, "Guide Article schema must use the public guide title as headline.");
requirePattern(guidePage, /description:\s*guide\.subtitle/, "Guide Article schema must use the editorial subtitle as description.");
requirePattern(guidePage, /guide\.publicFreshness\?\.updatedAt/, "Guide Article schema must derive dateModified from public guide freshness metadata.");
requirePattern(guidePage, /about:\s*\{/, "Guide Article schema must identify the destination entity.");
requirePattern(guidePage, /<h1>\s*\{publicGuideTitle\}\s*<\/h1>/, "Guide pages must have a single primary H1 driven by the public guide title.");
requirePattern(guidePage, /canonical=\{`\/viajes\/\$\{destination\.slug\}`\}/, "Guide pages must provide a stable canonical path.");
requirePattern(guidePage, /section\.id ===\s*faqSectionId/, "Guide pages must render a visible FAQ section when FAQ data is available.");
requirePattern(guidePage, /guide\.faq\.map/, "Guide pages must render the guide FAQ items in the page content.");

requirePattern(guidesIndex, /title="Guías de destino \| Cruzando Meridianos"/, "The destination index must use the public " + '"Guías de destino"' + " terminology in its title.");
requirePattern(guidesIndex, /<p class="eyebrow">GUÍAS DE DESTINO<\/p>/, "The destination index must use the public " + '"Guías de destino"' + " terminology in its hero.");
requirePattern(guidesIndex, /canonical="\/viajes"/, "The destination index must keep a stable canonical /viajes path.");

requirePattern(robots, /User-agent:\s*\*/, "robots.txt must define a wildcard crawler policy.");
requirePattern(robots, /Allow:\s*\//, "robots.txt must allow public crawling.");
requirePattern(robots, /Sitemap:\s*https:\/\/www\.cruzandomeridianos\.com\/sitemap-index\.xml/, "robots.txt must point crawlers to the sitemap index.");

requirePattern(astroConfig, /site:\s*'https:\/\/www\.cruzandomeridianos\.com'/, "Astro must declare the production site URL for canonical/sitemap generation.");
requirePattern(astroConfig, /sitemap\(/, "Astro must keep the sitemap integration enabled.");
requirePattern(astroConfig, /customPages:/, "The sitemap must explicitly include server-rendered destination pages.");

requirePattern(
  journeyPage,
  /class="privacy-note"[\s\S]*href="\/privacidad"/,
  "The journey form privacy note must link directly to /privacidad."
);

requirePattern(
  guidePage,
  /name:\s*"Guías de destino"\s*,\s*item:\s*"https:\/\/www\.cruzandomeridianos\.com\/viajes"/,
  "Guide breadcrumb structured data must use the public \"Guías de destino\" label."
);
if (/Estado editorial|Última revisión:/.test(guidePage)) {
  failures.push("Guide pages must not expose internal editorial-status wording.");
}
if (/data-section-status=|section\.status/.test(guidePage)) {
  failures.push("Guide pages must not expose or depend on internal section editorial-status implementation.");
}
if (!/sections:\s*renumberSections\([\s\S]*?guide\.sections\s*\.filter\(\(section\)\s*=>\s*section\.status\s*!==\s*"draft"/.test(guidesData)) {
  failures.push("Public guide data must filter and renumber sections before removing internal editorial metadata.");
}
if (!/monitoring:\s*undefined/.test(guidesData) || !/commercial:\s*undefined/.test(guidesData)) {
  failures.push("Public guide data must strip internal monitoring and commercial metadata.");
}
if (!/const publicSections\s*=\s*guide\.sections/.test(guidePage) || !/publicSections\.map\(/.test(guidePage)) {
  failures.push("Guide pages must render the public guide section collection.");
}

if (failures.length) {
  console.error("SEO audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}


console.log("SEO architecture audit passed: metadata, canonical, robots, sitemap, JSON-LD, public guide freshness and destination terminology contracts are present.");