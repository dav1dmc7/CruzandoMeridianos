import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const destinationsPath = path.join(root, "src/data/destinations.ts");
const guidesPath = path.join(root, "src/data/guides/additional.ts");
const registryPath = path.join(root, "src/data/guides/index.ts");

const read = (file) => fs.readFileSync(file, "utf8");
const destinations = read(destinationsPath);
const guides = read(guidesPath);
const registry = read(registryPath);

const extractReadySlugs = (source) => {
  const blocks = source.split(/\n\s*\{/).slice(1);
  return blocks.flatMap((block) => {
    if (!/status:\s*"ready"/.test(block)) return [];
    const match = block.match(/slug:\s*"([^"]+)"/);
    return match ? [match[1]] : [];
  });
};

const readySlugs = extractReadySlugs(destinations);
const additionalSlugs = [...guides.matchAll(/slug:\s*"([^"]+)"\s*,\s*name:/g)].map((match) => match[1]);
const registryUsesAdditional = /additionalGuides/.test(registry) &&
  ( /\.\.\.Object\.fromEntries\(additionalGuides/.test(registry) || /\.\.\.additionalGuides/.test(registry) );

const failures = [];

if (readySlugs.length < 2) {
  failures.push(`Expected at least 2 ready destinations, found ${readySlugs.length}.`);
}

for (const slug of readySlugs) {
  if (slug === "costa-rica") continue;
  if (!additionalSlugs.includes(slug)) {
    failures.push(`Ready destination "${slug}" has no additional guide entry.`);
  }
}

if (!registryUsesAdditional) {
  failures.push("Guide registry is not consuming additionalGuides.");
}

if (additionalSlugs.length === 0) {
  failures.push("No additional guides found.");
}

const reviewedMatch = guides.match(/const REVIEWED_AT = "(\d{4}-\d{2}-\d{2})";/);
const nextReviewMatch = guides.match(/const NEXT_REVIEW = "(\d{4}-\d{2}-\d{2})";/);
const today = new Date();
today.setHours(0, 0, 0, 0);

const parseIsoDate = (value) => {
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const reviewedAt = reviewedMatch ? parseIsoDate(reviewedMatch[1]) : null;
const nextReview = nextReviewMatch ? parseIsoDate(nextReviewMatch[1]) : null;

if (!reviewedAt || !reviewedMatch) {
  failures.push("Guide dataset is missing a valid REVIEWED_AT date.");
} else if (reviewedAt > today) {
  failures.push(`REVIEWED_AT (${reviewedMatch[1]}) cannot be in the future.`);
}

if (!nextReview || !nextReviewMatch) {
  failures.push("Guide dataset is missing a valid NEXT_REVIEW date.");
} else if (nextReview <= today) {
  failures.push(`NEXT_REVIEW (${nextReviewMatch[1]}) is due or overdue.`);
}

if (reviewedAt && nextReview && nextReview <= reviewedAt) {
  failures.push(`NEXT_REVIEW (${nextReviewMatch[1]}) must be after REVIEWED_AT (${reviewedMatch[1]}).`);
}

if (failures.length) {
  console.error("Guide audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Guide audit passed: ${readySlugs.length} ready destinations, ${additionalSlugs.length} additional guides; reviewed ${reviewedMatch[1]}, next review ${nextReviewMatch[1]}.`);
