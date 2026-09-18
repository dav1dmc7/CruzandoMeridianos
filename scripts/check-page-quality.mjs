import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();

const pageFiles = [
  "src/pages/index.astro",
  "src/pages/viajes.astro",
  "src/pages/nuestros-viajes/index.astro",
  "src/pages/cuentatuviaje.astro",
  "src/pages/como-trabajamos.astro",
  "src/pages/sobre-nosotros.astro",
  "src/pages/contacto.astro",
  "src/pages/recursos.astro",
  "src/pages/privacidad.astro",
  "src/pages/aviso-legal.astro",
  "src/pages/cookies.astro",
  "src/pages/viajes/canarias/index.astro",
  "src/pages/viajes/sudafrica/kruger.astro",
  "src/pages/viajes/[slug].astro",
  "src/pages/nuestros-viajes/[slug].astro",
];

const warnings = [];
const failures = [];

const read = async (file) => fs.readFile(path.join(root, file), "utf8");

for (const file of pageFiles) {
  const source = await read(file);
  const titleMatch = source.match(/<Layout[\s\S]*?\btitle=(?:"([^"]*)"|\{([^}]+)\})/m);
  const descriptionMatch = source.match(/<Layout[\s\S]*?\bdescription=(?:"([^"]*)"|\{([^}]+)\})/m);
  const h1Count = (source.match(/<h1\b/g) ?? []).length;

  if (!titleMatch) failures.push(`${file}: no detectable Layout title prop.`);
  if (!descriptionMatch) failures.push(`${file}: no detectable Layout description prop.`);

  const literalTitle = titleMatch?.[1];
  const literalDescription = descriptionMatch?.[1];

  if (literalTitle && (literalTitle.length < 30 || literalTitle.length > 65)) {
    warnings.push(`${file}: title length ${literalTitle.length} (target 30–65).`);
  }

  if (literalDescription && (literalDescription.length < 110 || literalDescription.length > 170)) {
    warnings.push(`${file}: meta description length ${literalDescription.length} (target 110–170).`);
  }

  if (file !== "src/pages/viajes/[slug].astro" && file !== "src/pages/nuestros-viajes/[slug].astro" && h1Count !== 1) {
    failures.push(`${file}: expected exactly one H1 in page source, found ${h1Count}.`);
  }

  if (/target="_blank"/.test(source) && !/rel="[^"]*noopener/.test(source)) {
    failures.push(`${file}: target="_blank" link without rel="noopener".`);
  }

  if (/<a\b[^>]*>\s*<(?:span|strong|em|svg)\b[^>]*>\s*<\/a>/i.test(source)) {
    warnings.push(`${file}: possible icon-only link without an explicit text/aria label; review manually.`);
  }
}

const guidePage = await read("src/pages/viajes/[slug].astro");
if (!/ogImage=\{destination\.image\.src\}/.test(guidePage)) {
  failures.push("Destination guide pages must use destination imagery for social sharing.");
}

const livedTripsPage = await read("src/pages/nuestros-viajes/[slug].astro");
if (!/ogImage=\{trip\.slug === "costa-rica"/.test(livedTripsPage)) {
  failures.push("Lived-trip pages must provide a route-specific social image.");
}

const canarias = await read("src/pages/viajes/canarias/index.astro");
if (!/"@type": "BreadcrumbList"/.test(canarias)) {
  failures.push("Canary Islands hub must expose BreadcrumbList structured data.");
}

console.log("\nPage SEO/quality audit");
console.log("======================");

if (warnings.length) {
  for (const warning of warnings) console.warn(`- WARNING: ${warning}`);
} else {
  console.log("- Metadata lengths and public page patterns are within the target envelope.");
}

if (failures.length) {
  console.error("\nPage SEO/quality audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("- Title/description presence: checked");
console.log("- H1 uniqueness on static public pages: checked");
console.log("- External-link safety attributes: checked");
console.log("- Social imagery on destination/lived-trip pages: checked");
console.log("- Breadcrumb data on Canary hub: checked");
