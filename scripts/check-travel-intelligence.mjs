import assert from "node:assert/strict";
import fs from "node:fs/promises";

import {
  SUPPORTED_MARKETS,
  TRAVEL_INTELLIGENCE_SOURCES,
} from "./travel-intelligence.sources.mjs";
import { TRAVEL_INTELLIGENCE_RULESET_VERSION } from "./travel-intelligence.rules.mjs";

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

for (const destination of TRAVEL_INTELLIGENCE_SOURCES) {
  const update = liveGuideUpdates[destination.slug];
  if (!update) continue;

  assert(typeof update.checkedAt === "string" && update.checkedAt.length > 0, `${destination.slug} is missing checkedAt`);
  assert(
    update.rulesetVersion === TRAVEL_INTELLIGENCE_RULESET_VERSION,
    `${destination.slug} was generated with an outdated travel-intelligence ruleset`,
  );
  assert(update.sourceFingerprints && typeof update.sourceFingerprints === "object", `${destination.slug} is missing sourceFingerprints`);
  assert(Array.isArray(update.alerts), `${destination.slug} alerts must be an array`);

  const configuredIds = new Set(destination.sources.map((source) => source.id));

  for (const sourceId of Object.keys(update.sourceFingerprints)) {
    assert(configuredIds.has(sourceId), `${destination.slug} contains an unknown source fingerprint: ${sourceId}`);
  }

  if (update.sourceAlerts !== undefined) {
    assert(typeof update.sourceAlerts === "object", `${destination.slug} sourceAlerts must be an object`);
    for (const sourceId of Object.keys(update.sourceAlerts)) {
      assert(configuredIds.has(sourceId), `${destination.slug} contains unknown sourceAlerts: ${sourceId}`);
      assert(Array.isArray(update.sourceAlerts[sourceId]), `${destination.slug}/${sourceId} sourceAlerts must be an array`);
    }
  }

  if (update.sourceFailures !== undefined) {
    assert(Array.isArray(update.sourceFailures), `${destination.slug} sourceFailures must be an array`);
    for (const failure of update.sourceFailures) {
      assert(typeof failure === "string" && failure.length > 0, `${destination.slug} contains an invalid source failure`);
    }
  }

  for (const alert of update.alerts) {
    assert(alert.sourceType === "official", `${destination.slug} contains a non-official alert`);
    assert(typeof alert.source === "string" && alert.source.startsWith("https://"), `${destination.slug} contains an invalid alert source`);
    if (!configuredSources.has(`${destination.slug}|${alert.source}`)) {
      fail(`${destination.slug} alert references an unconfigured source: ${alert.source}`);
    }
    assert(typeof alert.description === "string" && alert.description.length >= 45, `${destination.slug} contains an underspecified alert`);
    assert(alert.description.length <= 600, `${destination.slug} contains an oversized alert excerpt`);
  }
}

for (const slug of Object.keys(liveGuideUpdates)) {
  assert(TRAVEL_INTELLIGENCE_SOURCES.some((item) => item.slug === slug), `generated update exists for unknown destination: ${slug}`);
}

const alertCount = Object.values(liveGuideUpdates)
  .reduce((total, update) => total + update.alerts.length, 0);

console.log(
  `Travel intelligence audit passed: ${TRAVEL_INTELLIGENCE_SOURCES.length} destinations, ${SUPPORTED_MARKETS.length} markets, ${alertCount} alerts.`,
);
