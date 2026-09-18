import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const destinations = read("src/data/destinations.ts");
const astroConfig = read("astro.config.mjs");
const ourTripsRoot = path.join(root, "src/data/our-trips");

const extractReadySlugs = (source) => {
  const blocks = source.split(/\n\s*\{/).slice(1);
  return blocks.flatMap((block) => {
    if (!/status:\s*"ready"/.test(block)) return [];
    const match = block.match(/slug:\s*"([^"]+)"/);
    return match ? [match[1]] : [];
  });
};

const destinationSlugsMatch = astroConfig.match(
  /const destinationSlugs = \[([\s\S]*?)\];/m,
);

const livedTripSlugsMatch = astroConfig.match(
  /const livedTripSlugs = \[([\s\S]*?)\];/m,
);

const editorialGuidePagesMatch = astroConfig.match(
  /const editorialGuidePages = \[([\s\S]*?)\];/m,
);

const failures = [];

if (!destinationSlugsMatch) {
  failures.push("Astro config must declare destinationSlugs for the server-rendered guide routes.");
} else {
  const configuredSlugs = [...destinationSlugsMatch[1].matchAll(/'([^']+)'/g)].map(
    (match) => match[1],
  );
  const readySlugs = extractReadySlugs(destinations);

  const missingFromConfig = readySlugs.filter((slug) => !configuredSlugs.includes(slug));
  const staleInConfig = configuredSlugs.filter((slug) => !readySlugs.includes(slug));

  for (const slug of missingFromConfig) {
    failures.push(`Ready destination "${slug}" is missing from astro.config.mjs destinationSlugs.`);
  }

  for (const slug of staleInConfig) {
    failures.push(`astro.config.mjs contains destination "${slug}" which is not marked ready in destinations.ts.`);
  }

  if (configuredSlugs.length !== readySlugs.length) {
    failures.push(
      `Sitemap destination registry mismatch: config has ${configuredSlugs.length}, destinations.ts has ${readySlugs.length} ready destinations.`,
    );
  }
}

if (!/\.\.\.destinationSlugs\.map\(/.test(astroConfig)) {
  failures.push("Sitemap customPages must derive destination guide URLs from destinationSlugs.");
}

if (!editorialGuidePagesMatch) {
  failures.push("Astro config must declare editorialGuidePages for nested editorial guides.");
} else {
  const editorialGuidePages = [...editorialGuidePagesMatch[1].matchAll(/'([^']+)'/g)].map(
    (match) => match[1],
  );

  for (const slug of editorialGuidePages) {
    const routePath = path.join(root, "src", "pages", "viajes", ...slug.split("/")) + ".astro";
    if (!fs.existsSync(routePath)) {
      failures.push(`Editorial guide "${slug}" is declared in sitemap but its Astro route is missing.`);
    }
  }

  if (editorialGuidePages.length > 0 && !/\.\.\.editorialGuidePages\.map\(/.test(astroConfig)) {
    failures.push("Sitemap customPages must derive nested editorial guide URLs from editorialGuidePages.");
  }
}

const walk = (directory) => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else files.push(fullPath);
  }
  return files;
};

const ourTripSlugs = new Set();
for (const file of walk(ourTripsRoot)) {
  if (!file.endsWith(".ts")) continue;
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(/\bslug:\s*["']([^"']+)["']/g)) {
    ourTripSlugs.add(match[1]);
  }
}

if (!livedTripSlugsMatch) {
  failures.push("Astro config must declare livedTripSlugs for published lived-trip routes.");
} else {
  const configuredTrips = [...livedTripSlugsMatch[1].matchAll(/'([^']+)'/g)].map(
    (match) => match[1],
  );

  for (const slug of ourTripSlugs) {
    if (!configuredTrips.includes(slug)) {
      failures.push(`Published lived trip "${slug}" is missing from astro.config.mjs livedTripSlugs.`);
    }
  }

  for (const slug of configuredTrips) {
    if (!ourTripSlugs.has(slug)) {
      failures.push(`astro.config.mjs contains lived trip "${slug}" which is not registered in src/data/our-trips.`);
    }
  }
}

if (failures.length) {
  console.error("Sitemap consistency audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const readyCount = extractReadySlugs(destinations).length;
console.log(`Sitemap consistency audit passed: ${readyCount} ready destination routes are aligned with astro.config.mjs.`);
