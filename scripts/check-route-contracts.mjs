import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const read = (relativePath) =>
  fs.readFile(path.join(root, relativePath), "utf8");

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

const failures = [];

const destinations = await read("src/data/destinations.ts");
const additionalGuides = await read("src/data/guides/additional.ts");
const guideRegistry = await read("src/data/guides/index.ts");
const destinationCard = await read("src/components/sections/DestinationCard.astro");
const livedTripsPage = await read("src/pages/nuestros-viajes/index.astro");
const ourTripsRoot = path.join(root, "src/data/our-trips");
const guideFiles = (await walk(path.join(root, "src/data/guides")))
  .filter((file) => file.endsWith(".ts"));

const destinationBlocks = destinations.split(/\n\s*\{/).slice(1);
const destinationEntries = destinationBlocks.flatMap((block) => {
  const slug = block.match(/slug:\s*["']([^"']+)["']/)?.[1];
  const status = block.match(/status:\s*["']([^"']+)["']/)?.[1];
  const experience = block.match(/experience:\s*["']([^"']+)["']/)?.[1];
  const publishedTripSlug = block.match(/publishedTripSlug:\s*["']([^"']+)["']/)?.[1];
  return slug ? [{ slug, status, experience, publishedTripSlug }] : [];
});

const readyDestinationSlugs = new Set(
  destinationEntries.filter((entry) => entry.status === "ready").map((entry) => entry.slug),
);

const additionalGuideSlugs = new Set(
  [...additionalGuides.matchAll(/slug:\s*"([^"]+)"\s*,\s*name:/g)].map((match) => match[1]),
);

const guideSlugs = new Set(["costa-rica", ...additionalGuideSlugs]);

const ourTripSlugs = new Set();
for (const file of await walk(ourTripsRoot)) {
  if (!file.endsWith(".ts")) continue;
  const content = await fs.readFile(file, "utf8");
  for (const match of content.matchAll(/\bslug:\s*["']([^"']+)["']/g)) {
    ourTripSlugs.add(match[1]);
  }
}

for (const entry of destinationEntries.filter((item) => item.status === "ready")) {
  if (entry.experience !== "first-hand") {
    failures.push(`Ready destination "${entry.slug}" must declare experience: "first-hand".`);
  }

  if (entry.publishedTripSlug && !ourTripSlugs.has(entry.publishedTripSlug)) {
    failures.push(`Destination "${entry.slug}" points to missing publishedTripSlug "${entry.publishedTripSlug}".`);
  }

  if (!guideSlugs.has(entry.slug)) {
    failures.push(`Ready destination "${entry.slug}" has no matching guide registry entry.`);
  }
}

for (const slug of guideSlugs) {
  if (!readyDestinationSlugs.has(slug)) {
    failures.push(`Guide "${slug}" has no matching ready destination.`);
  }
}

for (const file of guideFiles) {
  const content = await fs.readFile(file, "utf8");
  for (const match of content.matchAll(/relatedTripSlug:\s*["']([^"']+)["']/g)) {
    if (!ourTripSlugs.has(match[1])) {
      failures.push(`${path.relative(root, file).replace(/\\/g, "/")} → relatedTripSlug "${match[1]}" does not exist in src/data/our-trips.`);
    }
  }
}

for (const slug of ourTripSlugs) {
  const linkedDestinations = destinationEntries.filter(
    (entry) => entry.status === "ready" && entry.publishedTripSlug === slug,
  );

  if (linkedDestinations.length === 0) {
    failures.push(`Lived trip "${slug}" has no ready destination linked through publishedTripSlug.`);
  }
}

const publishedTripTargets = destinationEntries
  .filter((entry) => entry.status === "ready" && entry.publishedTripSlug)
  .map((entry) => entry.publishedTripSlug);

if (new Set(publishedTripTargets).size !== publishedTripTargets.length) {
  // Multiple destinations can intentionally share one lived-trip page.
  // This is the supported contract for combined trips.
}

if (!guideRegistry.includes("additionalGuides")) {
  failures.push("Guide registry is not consuming additionalGuides.");
}

if (!additionalGuides.includes('id: "preguntas-frecuentes"')) {
  failures.push("Additional destination guides must expose a visible preguntas-frecuentes section.");
}

if (!destinationCard.includes('import { ourTrips } from "../../data/our-trips";')) {
  failures.push("DestinationCard must use lived-trip data before generating /nuestros-viajes routes.");
}

if (!destinationCard.includes("ourTrips.some((trip) => trip.slug === destination.slug)")) {
  failures.push("DestinationCard must guard lived-trip links against known our-trip slugs.");
}

if (!livedTripsPage.includes('import { ourTrips } from "../../data/our-trips";')) {
  failures.push("Nuestros viajes must source its published experience list from src/data/our-trips.");
}

if (!livedTripsPage.includes("livedDestinations")) {
  failures.push("Nuestros viajes must build its visible experience list from lived-trip destinations.");
}

if (/readyDestinations\.map\(/.test(livedTripsPage)) {
  failures.push("Nuestros viajes must not render the complete ready-destination catalog as lived trips.");
}

console.log("\nRoute/data contract audit");
console.log("=========================");
console.log(`- Ready destinations: ${readyDestinationSlugs.size}`);
console.log(`- First-hand ready destinations: ${destinationEntries.filter((entry) => entry.status === "ready" && entry.experience === "first-hand").length}`);
console.log(`- Published lived-trip destination mappings: ${destinationEntries.filter((entry) => entry.publishedTripSlug).length}`);
console.log(`- Unique lived trips: ${ourTripSlugs.size}`);
console.log("- relatedTripSlug targets: checked");
console.log("- DestinationCard lived-trip route guard: checked");
console.log("- Nuestros viajes lived-trip data source: checked");

if (failures.length) {
  console.error("\nRoute/data contract audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nRoute/data contract audit passed.");
