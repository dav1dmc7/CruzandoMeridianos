import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { pathToFileURL } from "node:url";

import { TRAVEL_INTELLIGENCE_SOURCES } from "./travel-intelligence.sources.mjs";
import {
  TRAVEL_INTELLIGENCE_RULESET_VERSION,
  TRAVEL_INTELLIGENCE_RULES,
  findRuleMatch,
} from "./travel-intelligence.rules.mjs";

const root = process.cwd();
const generatedPath = path.join(root, "src/data/live/travel-intelligence.generated.ts");
const today = new Date().toISOString().slice(0, 10);
const checkedAt = new Date().toISOString();

const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");

const stripHtml = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&quot;/gi, '"')
  .replace(/&#39;/gi, "'")
  .replace(/\s+/g, " ")
  .trim();

const sentenceCandidates = (text) => text
  .split(/(?<=[.!?])\s+/)
  .map((sentence) => sentence.trim())
  .filter((sentence) => sentence.length >= 45 && sentence.length <= 600);

const classifyText = (text, source) => {
  const sentences = sentenceCandidates(text);
  const alerts = [];

  for (const rule of TRAVEL_INTELLIGENCE_RULES) {
    const hit = sentences.find((sentence) => findRuleMatch(rule, sentence));

    if (!hit) continue;

    alerts.push({
      id: `live-${sha256(`${source.id}|${rule.type}|${hit}`).slice(0, 16)}`,
      date: today,
      type: rule.type,
      severity: rule.severity,
      title: `${rule.type.charAt(0).toUpperCase()}${rule.type.slice(1)} — información detectada`,
      description: hit,
      source: source.url,
      sourceLabel: `${source.label} (${source.audience})`,
      sourceType: "official",
      active: true,
      checkedAt,
      affectedAreas: [],
      travelerAction: "Consulta la fuente oficial y comprueba cómo afecta a tu ruta antes de desplazarte.",
    });
  }

  return alerts;
};

const fetchSource = async (source) => {
  const response = await fetch(source.url, {
    headers: {
      "User-Agent": "CruzandoMeridianos-TravelIntelligence/1.0 (+https://www.cruzandomeridianos.com)",
      Accept: "text/html,application/xhtml+xml,text/plain,application/xml,text/xml",
    },
    signal: AbortSignal.timeout(25_000),
  });

  if (!response.ok) throw new Error(`${source.id}: HTTP ${response.status}`);

  const html = await response.text();
  const text = stripHtml(html).slice(0, 25_000);
  if (text.length < 120) throw new Error(`${source.id}: source returned insufficient text`);

  return { ...source, fingerprint: sha256(text), text };
};

const loadPrevious = async () => {
  try {
    return await import(`${pathToFileURL(generatedPath).href}?cacheBust=${Date.now()}`);
  } catch {
    return { liveGuideUpdates: {} };
  }
};

const dedupeAlerts = (alerts) => {
  const seen = new Set();
  return alerts.filter((alert) => {
    const key = [alert.type, alert.source, alert.description].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const sourceIds = (destination) => new Set(destination.sources.map((source) => source.id));

const previousAlertsBySource = (previousUpdate, source) => {
  if (previousUpdate?.sourceAlerts?.[source.id]) {
    return previousUpdate.sourceAlerts[source.id];
  }

  return (previousUpdate?.alerts ?? []).filter((alert) => alert.source === source.url);
};

const previousFingerprintsFor = (previousUpdate, destination) =>
  Object.fromEntries(
    destination.sources
      .map((source) => [source.id, previousUpdate?.sourceFingerprints?.[source.id]])
      .filter(([, fingerprint]) => Boolean(fingerprint)),
  );

const previousSourceAlertsFor = (previousUpdate, destination) =>
  Object.fromEntries(
    destination.sources
      .map((source) => [source.id, previousAlertsBySource(previousUpdate, source)])
      .filter(([, alerts]) => alerts.length > 0),
  );

const previousModule = await loadPrevious();
const previous = previousModule.liveGuideUpdates ?? {};
const generated = {};

for (const destination of TRAVEL_INTELLIGENCE_SOURCES) {
  const previousUpdate = previous[destination.slug];
  const sourceFingerprints = previousFingerprintsFor(previousUpdate, destination);
  const sourceAlerts = previousSourceAlertsFor(previousUpdate, destination);
  const failures = [];

  for (const source of destination.sources) {
    try {
      const current = await fetchSource(source);
      const previousFingerprint = sourceFingerprints[source.id];

      sourceFingerprints[source.id] = current.fingerprint;

      if (
        current.fingerprint !== previousFingerprint ||
        previousUpdate?.rulesetVersion !== TRAVEL_INTELLIGENCE_RULESET_VERSION
      ) {
        sourceAlerts[source.id] = classifyText(current.text, source);
      }
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    }
  }

  const configuredIds = sourceIds(destination);
  const activeSourceFingerprints = Object.fromEntries(
    Object.entries(sourceFingerprints).filter(([id]) => configuredIds.has(id)),
  );
  const activeSourceAlerts = Object.fromEntries(
    Object.entries(sourceAlerts).filter(([id]) => configuredIds.has(id)),
  );

  generated[destination.slug] = {
    checkedAt,
    rulesetVersion: TRAVEL_INTELLIGENCE_RULESET_VERSION,
    sourceFingerprints: activeSourceFingerprints,
    sourceAlerts: activeSourceAlerts,
    alerts: dedupeAlerts(Object.values(activeSourceAlerts).flat()),
    sourceFailures: failures,
  };

  if (failures.length) {
    console.warn(`[${destination.slug}] source failures: ${failures.join(" | ")}`);
  }
}

const comparable = (value) => {
  const clone = structuredClone(value);
  for (const update of Object.values(clone)) delete update.checkedAt;
  return JSON.stringify(clone);
};

if (comparable(previous) === comparable(generated)) {
  console.log("No meaningful source or alert changes. Keeping generated file untouched.");
  process.exit(0);
}

const file = `/**
 * GENERATED FILE — do not edit by hand.
 * Updated by scripts/monitor-travel-intelligence.mjs.
 */

import type { TravelAlert } from "../guides/types";

export interface LiveGuideUpdate {
  checkedAt: string;
  rulesetVersion: string;
  sourceFingerprints: Record<string, string>;
  sourceAlerts: Record<string, TravelAlert[]>;
  alerts: TravelAlert[];
  sourceFailures?: string[];
}

export const liveGuideUpdates: Record<string, LiveGuideUpdate> = ${JSON.stringify(generated, null, 2)};
`;

await fs.mkdir(path.dirname(generatedPath), { recursive: true });
await fs.writeFile(generatedPath, file, "utf8");
console.log(`Travel intelligence updated for ${Object.keys(generated).length} destinations at ${checkedAt}.`);
