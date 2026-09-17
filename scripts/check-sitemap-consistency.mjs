import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const destinations = read("src/data/destinations.ts");
const astroConfig = read("astro.config.mjs");

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

if (failures.length) {
  console.error("Sitemap consistency audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const readyCount = extractReadySlugs(destinations).length;
console.log(`Sitemap consistency audit passed: ${readyCount} ready destination routes are aligned with astro.config.mjs.`);
