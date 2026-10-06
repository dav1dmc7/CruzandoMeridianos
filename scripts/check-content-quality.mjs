import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const publicFiles = [
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
];

const sources = publicFiles.filter((file) => fs.existsSync(path.join(root, file))).map((file) => ({
  file,
  content: read(file),
}));

const failures = [];
const warnings = [];

const placeholderPatterns = [
  /lorem ipsum/iu,
  /\bTODO\b/u,
  /\bFIXME\b/u,
  /\bTBD\b/u,
  /coming soon/iu,
];

const missingSpacePatterns = [
  /tengasel/iu,
  /itinerario\.Es/iu,
  /nosotroses/iu,
  /parte\.Ahora/iu,
  /lugares\.Queremos/iu,
  /nosotroses una/iu,
];

for (const { file, content } of sources) {
  for (const pattern of placeholderPatterns) {
    if (pattern.test(content)) failures.push(`${file}: placeholder-like editorial/code text matches ${pattern}`);
  }

  for (const pattern of missingSpacePatterns) {
    if (pattern.test(content)) failures.push(`${file}: possible missing whitespace around inline copy: ${pattern}`);
  }
}

const legalPlaceholderFiles = sources.filter(({ content }) => /PENDIENTE DE COMPLETAR|Dato legal pendiente/i.test(content)).map(({ file }) => file);
if (legalPlaceholderFiles.length) {
  warnings.push(`Public legal pages still contain explicit pending-legal-data notices: ${legalPlaceholderFiles.join(", ")}`);
}

for (const badPhrase of [
  /\b1 territorios\b/iu,
  /\b1 destinos\b/iu,
  /\b1 regiones\b/iu,
  /\b1 islas\b/iu,
]) {
  for (const { file, content } of sources) {
    if (badPhrase.test(content)) failures.push(`${file}: singular/plural grammar issue detected: ${badPhrase}`);
  }
}

const viajes = read("src/pages/viajes.astro");
const prioritySource = viajes.match(/const prioritySlugs = \[([\s\S]*?)\]\s+as const;/m)?.[1] ?? "";
const prioritySlugs = [...prioritySource.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
const expectedDestinationPriority = [
  "costa-rica",
  "sudafrica",
  "mauricio",
  "grecia",
  "jordania",
  "auroras",
];

if (JSON.stringify(prioritySlugs) !== JSON.stringify(expectedDestinationPriority)) {
  failures.push(
    `Destination explorer priority should be ${expectedDestinationPriority.join(", ")}; found ${prioritySlugs.join(", ")}.`,
  );
}

const explorerSource = viajes.match(/const explorerItems: ExplorerItem\[\] = \[([\s\S]*?)\n\];/m)?.[1] ?? "";
if (!explorerSource.includes('{ type: "destination", destination: getDestination("costa-rica") }')) {
  failures.push('Destination explorer must start with the curated "costa-rica" destination.');
}
if (!explorerSource.includes('{ type: "guide", guide: krugerGuide }')) {
  failures.push('Destination explorer must expose the curated "sudafrica/kruger" guide after Costa Rica.');
}
if (!/\.\.\.prioritySlugs\s*\.slice\(1\)\s*\.map\(\(slug\)\s*=>/.test(explorerSource)) {
  failures.push("Destination explorer must render the remaining curated destinations from prioritySlugs after Kruger.");
}

if (!viajes.includes('destination.region === "Canarias"') || !viajes.includes('href: "/viajes/canarias"')) {
  failures.push("The /viajes explorer must keep the Canary Islands grouped as a regional hub.");
}

const hierarchy = read("src/components/sections/DestinationHierarchy.astro");
if (hierarchy.includes('href={`/viajes/${destination.slug}`}') && hierarchy.includes('region === "Canarias"')) {
  const canaryBranch = hierarchy.slice(hierarchy.indexOf('region === "Canarias"'));
  if (canaryBranch.includes('destination.name')) {
    warnings.push("Review Canary hierarchy rendering if it starts exposing individual island cards again.");
  }
}

const journey = read("src/pages/cuentatuviaje.astro");
if ((journey.match(/\b(?:vuestra|vuestro|vuestros|vuestras|vosotros|vosotras|tenéis|queréis|podéis|debéis|os)\b/giu) ?? []).length > 0) {
  warnings.push("The travel-request form uses plural second-person language; keep it deliberate and consistent with the rest of the brand voice.");
}

const about = read("src/pages/sobre-nosotros.astro");
const working = read("src/pages/como-trabajamos.astro");
const mixedSecondPersonFiles = [about, working, journey]
  .map((content, index) => ({
    file: ["src/pages/sobre-nosotros.astro", "src/pages/como-trabajamos.astro", "src/pages/cuentatuviaje.astro"][index],
    singular: (content.match(/\b(?:tú|tu|te|ti|contigo|quieres|puedes|tienes)\b/giu) ?? []).length,
    plural: (content.match(/\b(?:vosotros|vosotras|os|vuestra|vuestro|vuestras|vuestros|queréis|podéis|tenéis)\b/giu) ?? []).length,
  }))
  .filter((entry) => entry.singular > 0 && entry.plural > 0);

for (const entry of mixedSecondPersonFiles) {
  warnings.push(`${entry.file}: mixes singular and plural second-person copy (singular=${entry.singular}, plural=${entry.plural}).`);
}

const staleEditorialPatterns = [
  /Estado editorial/iu,
  /Última revisión:/u,
];
for (const { file, content } of sources) {
  for (const pattern of staleEditorialPatterns) {
    if (pattern.test(content)) failures.push(`${file}: internal editorial status leaked into public copy.`);
  }
}

if (warnings.length) {
  console.warn("\nContent-quality warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Content-quality audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Content-quality audit passed: no placeholder leaks, known grammar traps, priority-order regressions or internal editorial status leaks.");
