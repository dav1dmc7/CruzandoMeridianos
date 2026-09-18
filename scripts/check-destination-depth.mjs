import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const destinations = read("src/data/destinations.ts");
const registry = read("src/data/guides/index.ts");
const deepDive = read("src/data/guides/destination-deep-dive.ts");
const placeCatalog = read("src/data/guides/key-places.ts");

const extractReadySlugs = (source) => {
  const blocks = source.split(/\n\s*\{/).slice(1);
  return blocks.flatMap((block) => {
    if (!/status:\s*"ready"/.test(block)) return [];
    const match = block.match(/slug:\s*"([^"]+)"/);
    return match ? [match[1]] : [];
  });
};

const extractMapKeys = (source, marker) => {
  const start = source.indexOf(marker);
  if (start === -1) return [];

  const end = source.indexOf("};", start);
  const body = source.slice(start, end === -1 ? source.length : end);

  return [...body.matchAll(/^  (?:"([^"]+)"|([a-z0-9-]+)):\s*(?:"|\{)/gm)]
    .map((match) => match[1] ?? match[2]);
};

const readySlugs = extractReadySlugs(destinations);
const utilityFocusSlugs = extractMapKeys(registry, "const utilityFocusBySlug");
const deepDiveSlugs = extractMapKeys(deepDive, "const deepDive");
const specializedSlugs = [
  "costa-rica",
  "sudafrica",
  "jordania",
  "grecia",
  "auroras",
  "tenerife",
];

const failures = [];

for (const slug of readySlugs) {
  if (!utilityFocusSlugs.includes(slug)) {
    failures.push(`Ready destination "${slug}" has no destination-specific utility focus.`);
  }

  const isCovered = specializedSlugs.includes(slug) || deepDiveSlugs.includes(slug);
  if (!isCovered) {
    failures.push(`Ready destination "${slug}" has no deep editorial coverage layer.`);
  }
}

for (const slug of deepDiveSlugs) {
  if (!readySlugs.includes(slug)) {
    failures.push(`Deep-dive destination "${slug}" is not marked ready in destinations.ts.`);
  }
}

if (!/GuidePlacesMap/.test(read("src/pages/viajes/[slug].astro"))) {
  failures.push("Destination guide pages must render the key places map.");
}

if (!/GuidePlaceDecisions/.test(read("src/pages/viajes/[slug].astro"))) {
  failures.push("Destination guide pages must render the reusable place-decision framework.");
}

if (!/places\?: GuidePlace\[\]/.test(read("src/data/guides/types.ts"))) {
  failures.push("Destination guide contract must expose key places.");
}

if (!/export const keyPlacesBySlug/.test(placeCatalog)) {
  failures.push("Key places catalog is missing.");
}

const placeEntries = [...placeCatalog.matchAll(
  /^\s*(?:"([^"]+)"|([a-z0-9-]+)):\s*\[([\s\S]*?)^\s*\],/gm,
)];

const placeCounts = new Map(
  placeEntries.map((match) => [
    match[1] ?? match[2],
    (match[3].match(/\bp\(/g) ?? []).length,
  ]),
);

for (const slug of readySlugs) {
  const placeCount = placeCounts.get(slug) ?? 0;
  if (placeCount < 5) {
    failures.push(
      'Ready destination "' + slug + '" must have at least five curated key places.',
    );
  }
}

if (!/id:\s*"herramientas-y-comprobaciones"/.test(registry)) {
  failures.push("Universal utility section " + '"herramientas-y-comprobaciones"' + " is missing.");
}

if (!/id:\s*"plan-b-y-flexibilidad"/.test(registry)) {
  failures.push("Universal utility section " + '"plan-b-y-flexibilidad"' + " is missing.");
}

if (!/withDestinationDeepDive\(/.test(registry)) {
  failures.push("Deep-dive editorial layer is not applied to live guides.");
}

if (failures.length) {
  console.error("Destination depth audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Destination depth audit passed: ${readySlugs.length} ready destinations covered by universal utility and deep editorial layers.`,
);
