import assert from "node:assert/strict";
import fs from "node:fs/promises";

import {
  SUPPORTED_MARKETS,
  TRAVEL_INTELLIGENCE_SOURCES,
} from "./travel-intelligence.sources.mjs";

const generatedPath = new URL("../src/data/live/travel-intelligence.generated.ts", import.meta.url);

const fail = (message) => {
  throw new Error(`Travel intelligence audit failed: ${message}`);
};

const unique = (values) => new Set(values).size === values.length;

assert(TRAVEL_INTELLIGENCE_SOURCES.length > 0, "no destinations configured");
assert(unique(TRAVEL_INTELLIGENCE_SOURCES.map((destination) => destination.slug)), "duplicate destination slug");
assert(unique(SUPPORTED_MARKETS.map((market) => market.code)), "duplicate supported market code");

const configuredSources = new Map();

for (const destination of TRAVEL_INTELLIGENCE_SOURCES) {
  assert(destination.slug.trim(), "destination slug cannot be empty");
  assert(destination.sources.length > 0, `${destination.slug} has no sources`);
  assert(unique(destination.sources.map((source) => source.id)), `${destination.slug} has duplicate source ids`);

  for (const source of destination.sources) {
    assert(source.trust === "official", `${destination.slug}/${source.id} is not marked official`);
    assert(/^https:\/\//i.test(source.url), `${destination.slug}/${source.id} must use HTTPS`);
    configuredSources.set(`${destination.slug}|${source.url}`, source.id);
  }
}

const generatedSource = await fs.readFile(generatedPath, "utf8");
const marker = "export const liveGuideUpdates: Record<string, LiveGuideUpdate> = ";
const start = generatedSource.indexOf(marker);

if (start === -1) fail("generated file is missing liveGuideUpdates export");

const jsonStart = start + marker.length;
const jsonEnd = generatedSource.lastIndexOf(";\n");
if (jsonEnd <= jsonStart) fail("generated liveGuideUpdates payload is malformed");

let liveGuideUpdates;
try {
  liveGuideUpdates = JSON.parse(generatedSource.slice(jsonStart, jsonEnd));
} catch (error) {
  fail(`generated liveGuideUpdates is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
}

assert(liveGuideUpdates && typeof liveGuideUpdates === "object", "generated liveGuideUpdates must be an object");

for (const [slug, update] of Object.entries(liveGuideUpdates)) {
  const destination = TRAVEL_INTELLIGENCE_SOURCES.find((item) => item.slug === slug);
  if (!destination) fail(`generated update exists for unknown destination: ${slug}`);

  assert(typeof update.checkedAt === "string" && update.checkedAt.length > 0, `${slug} is missing checkedAt`);
  assert(update.sourceFingerprints && typeof update.sourceFingerprints === "object", `${slug} is missing sourceFingerprints`);
  assert(Array.isArray(update.alerts), `${slug} alerts must be an array`);

  if (update.sourceAlerts !== undefined) {
    assert(typeof update.sourceAlerts === "object", `${slug} sourceAlerts must be an object`);
  }

  for (const alert of update.alerts) {
    assert(alert.sourceType === "official", `${slug} contains a non-official alert`);
    assert(typeof alert.source === "string" && alert.source.startsWith("https://"), `${slug} contains an invalid alert source`);
    if (!configuredSources.has(`${slug}|${alert.source}`)) {
      fail(`${slug} alert references an unconfigured source: ${alert.source}`);
    }
    assert(typeof alert.description === "string" && alert.description.length >= 45, `${slug} contains an underspecified alert`);
    assert(alert.description.length <= 600, `${slug} contains an oversized alert excerpt`);
  }
}

const alertCount = Object.values(liveGuideUpdates)
  .reduce((total, update) => total + update.alerts.length, 0);

console.log(
  `Travel intelligence audit passed: ${TRAVEL_INTELLIGENCE_SOURCES.length} destinations, ${SUPPORTED_MARKETS.length} markets, ${alertCount} alerts.`,
);
