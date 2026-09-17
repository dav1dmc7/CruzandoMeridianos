import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const destinations = read("src/data/destinations.ts");
const registry = read("src/data/guides/index.ts");
const deepDive = read("src/data/guides/destination-deep-dive.ts");

const extractReadySlugs = (source) => {
  const blocks = source.split(/\n\s*\{/).slice(1);
  return blocks.flatMap((block) => {
    if (!/status:\s*"ready"/.test(block)) return [];
    const match = block.match(/slug:\s*"([^"]+)"/);
    return match ? [match[1]] : [];
  });
};

const extractObjectKeys = (source, marker) => {
  const start = source.indexOf(marker);
  if (start === -1) return [];

  const body = source.slice(start, source.indexOf("};", start));
  return [...body.matchAll(/^\s+(?:"([^"]+)"|([a-z0-9-]+)):\s*\{/gm)]
    .map((match) => match[1] ?? match[2]);
};

const readySlugs = extractReadySlugs(destinations);
const utilityFocusSlugs = extractObjectKeys(registry, "const utilityFocusBySlug");
const deepDiveSlugs = extractObjectKeys(deepDive, "const deepDive");
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

if (!/id:\s*"herramientas-y-comprobaciones"/.test(registry)) {
  failures.push("Universal utility section " + '"herramientas-y-comprobaciones"' + " is missing.");
}

if (!/id:\s*"plan-b-y-flexibilidad"/.test(registry)) {
  failures.push("Universal utility section " + '"plan-b-y-flexibilidad"' + " is missing.");
}

if (!/withDestinationDeepDive\(updatedGuide\)/.test(registry)) {
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
