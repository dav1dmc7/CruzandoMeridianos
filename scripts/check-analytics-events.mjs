import { readFile } from "node:fs/promises";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const sourceRoot = join(process.cwd(), "src");
const endpointPath = join(sourceRoot, "pages/api/analytics/events.ts");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name !== "api") files.push(...(await walk(fullPath)));
      continue;
    }

    if (/\.(astro|ts|tsx)$/.test(entry.name)) files.push(fullPath);
  }

  return files;
}

const files = await walk(sourceRoot);
const eventUsage = new Map();

function recordEvent(name, file) {
  if (!eventUsage.has(name)) eventUsage.set(name, new Set());
  eventUsage.get(name).add(relative(process.cwd(), file));
}

for (const file of files) {
  const source = await readFile(file, "utf8");

  for (const match of source.matchAll(/data-track=["']([^"']+)["']/g)) {
    recordEvent(match[1], file);
  }

  for (const match of source.matchAll(/sendEvent\(\s*["']([^"']+)["']/g)) {
    recordEvent(match[1], file);
  }
}

const endpoint = await readFile(endpointPath, "utf8");
const allowlistMatch = endpoint.match(/const ALLOWED_EVENTS = new Set\(\[([\s\S]*?)\]\);/);

if (!allowlistMatch) {
  console.error("Analytics allowlist not found in src/pages/api/analytics/events.ts");
  process.exit(1);
}

const allowedEvents = new Set(
  [...allowlistMatch[1].matchAll(/["']([^"']+)["']/g)].map((match) => match[1]),
);

const missing = [...eventUsage.entries()]
  .filter(([name]) => !allowedEvents.has(name))
  .map(([name, filesForEvent]) => ({
    name,
    files: [...filesForEvent],
  }));

if (missing.length > 0) {
  console.error("Analytics events used by the frontend but rejected by the API:");
  for (const item of missing) {
    console.error(`- ${item.name}: ${item.files.join(", ")}`);
  }
  process.exit(1);
}

const requiredTravelFormEvents = [
  "travel_form_start",
  "travel_form_step",
  "travel_form_back",
  "travel_form_error",
  "travel_form_submit",
];

const missingTravelFormEvents = requiredTravelFormEvents.filter(
  (name) => !eventUsage.has(name) || !allowedEvents.has(name),
);

if (missingTravelFormEvents.length > 0) {
  console.error("Travel form funnel instrumentation is incomplete:");
  for (const event of missingTravelFormEvents) console.error(`- ${event}`);
  process.exit(1);
}

console.log(`Analytics event contract OK: ${eventUsage.size} frontend event names are allowlisted by the API.`);
