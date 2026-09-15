import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { pathToFileURL } from "node:url";

import { TRAVEL_INTELLIGENCE_SOURCES } from "./travel-intelligence.sources.mjs";

const root = process.cwd();
const generatedPath = path.join(root, "src/data/live/travel-intelligence.generated.ts");
const today = new Date().toISOString().slice(0, 10);
const checkedAt = new Date().toISOString();
const openAiModel = process.env.OPENAI_MODEL || "gpt-5.6-luna";

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

const fetchSource = async (source) => {
  const response = await fetch(source.url, {
    headers: {
      "User-Agent": "CruzandoMeridianos-TravelIntelligence/1.0 (+https://www.cruzandomeridianos.com)",
      Accept: "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(25_000),
  });

  if (!response.ok) throw new Error(`${source.id}: HTTP ${response.status}`);

  const html = await response.text();
  const text = stripHtml(html).slice(0, 18_000);
  if (text.length < 120) throw new Error(`${source.id}: source returned insufficient text`);

  return { ...source, fingerprint: sha256(text), text };
};

const outputSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    alerts: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          sourceId: { type: "string" },
          date: { type: "string" },
          type: { type: "string", enum: ["carretera", "clima", "parque", "transporte", "entrada", "seguridad", "salud", "volcan", "otro"] },
          severity: { type: "string", enum: ["critical", "high", "medium", "low"] },
          title: { type: "string" },
          description: { type: "string" },
          travelerAction: { type: "string" },
          affectedAreas: { type: "array", items: { type: "string" } },
          expiresAt: { type: ["string", "null"] },
        },
        required: ["sourceId", "date", "type", "severity", "title", "description", "travelerAction", "affectedAreas", "expiresAt"],
      },
    },
  },
  required: ["alerts"],
};

const extractResponseText = (data) => {
  if (typeof data.output_text === "string") return data.output_text;
  const message = (data.output ?? []).find((item) => item.type === "message");
  const textPart = message?.content?.find((part) => part.type === "output_text");
  if (typeof textPart?.text === "string") return textPart.text;
  throw new Error("OpenAI response did not contain output text");
};

const generateAlerts = async (destination, sources) => {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is required to generate traveler alerts");

  const sourcePack = sources.map((source) =>
    `SOURCE_ID: ${source.id}\nAUDIENCE: ${source.audience}\nSOURCE: ${source.label}\nURL: ${source.url}\nCONTENT:\n${source.text}`,
  ).join("\n\n---\n\n");

  const prompt = `You are the editorial safety layer for Cruzando Meridianos.\nCurrent date: ${today}.\nDestination: ${destination.label}.\n\nRead only the supplied source material. Produce traveler alerts only when the source contains a concrete, current fact that can materially affect a traveler during planning or travel: road closures, severe weather, floods, volcanic activity, airport or border disruption, entry/visa changes, official security warnings, health restrictions, closures, permits, strikes or other operational restrictions.\n\nRules:\n- Never invent facts.\n- Never infer a closure, visa requirement or travel ban from a generic page.\n- Prefer explicit current statements and recent dates.\n- Do not repeat evergreen background information unless it creates a current traveler action.\n- Severity must reflect the explicit source wording. Use critical/high only for urgent or materially restrictive situations.\n- If a source is an official government travel advisory, preserve its recommendation faithfully.\n- Do not merge different nationalities into one requirement. A source tagged ES, UK or US applies primarily to that market.\n- If several sources describe the same event, create one alert and choose the strongest authoritative source as sourceId.\n- If no concrete current traveler-impacting fact is found, return an empty alerts array.\n- The description must be concise and factual. travelerAction must say what a traveler should do.\n\nReturn JSON matching the schema exactly.`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: openAiModel,
      store: false,
      input: [
        { role: "system", content: prompt },
        { role: "user", content: sourcePack.slice(0, 60_000) },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "travel_alerts",
          strict: true,
          schema: outputSchema,
        },
      },
    }),
  });

  if (!response.ok) throw new Error(`OpenAI HTTP ${response.status}: ${await response.text()}`);
  return JSON.parse(extractResponseText(await response.json()));
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
    const key = [alert.type, alert.title.toLowerCase(), alert.source, alert.date].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const normalizeAlert = (alert, source) => ({
  id: `live-${sha256(`${source.id}|${alert.title}|${alert.date}`).slice(0, 16)}`,
  date: alert.date || today,
  type: alert.type,
  severity: alert.severity,
  title: alert.title.trim(),
  description: alert.description.trim(),
  source: source.url,
  sourceLabel: `${source.label} (${source.audience})`,
  sourceType: "official",
  active: true,
  expiresAt: alert.expiresAt || undefined,
  checkedAt,
  affectedAreas: alert.affectedAreas,
  travelerAction: alert.travelerAction.trim(),
});

const previousModule = await loadPrevious();
const previous = previousModule.liveGuideUpdates ?? {};
const generated = {};

for (const destination of TRAVEL_INTELLIGENCE_SOURCES) {
  const fetched = [];
  const fingerprints = {};
  const failures = [];

  for (const source of destination.sources) {
    try {
      const current = await fetchSource(source);
      fetched.push(current);
      fingerprints[source.id] = current.fingerprint;
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    }
  }

  const previousUpdate = previous[destination.slug];
  const changed = fetched.filter((source) => previousUpdate?.sourceFingerprints?.[source.id] !== source.fingerprint);
  let alerts = previousUpdate?.alerts ?? [];

  if (changed.length > 0) {
    const aiResult = await generateAlerts(destination, fetched);
    const validSourceIds = new Set(fetched.map((source) => source.id));
    const newAlerts = (aiResult.alerts ?? [])
      .filter((alert) => validSourceIds.has(alert.sourceId))
      .map((alert) => normalizeAlert(alert, fetched.find((source) => source.id === alert.sourceId)));
    alerts = dedupeAlerts(newAlerts);
  }

  generated[destination.slug] = { checkedAt, sourceFingerprints: fingerprints, alerts, sourceFailures: failures };

  if (failures.length) console.warn(`[${destination.slug}] source failures: ${failures.join(" | ")}`);
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

const file = `/**\n * GENERATED FILE — do not edit by hand.\n * Updated by scripts/monitor-travel-intelligence.mjs.\n */\n\nimport type { TravelAlert } from "../guides/types";\n\nexport interface LiveGuideUpdate {\n  checkedAt: string;\n  sourceFingerprints: Record<string, string>;\n  alerts: TravelAlert[];\n  sourceFailures?: string[];\n}\n\nexport const liveGuideUpdates: Record<string, LiveGuideUpdate> = ${JSON.stringify(generated, null, 2)};\n`;

await fs.mkdir(path.dirname(generatedPath), { recursive: true });
await fs.writeFile(generatedPath, file, "utf8");
console.log(`Travel intelligence updated for ${Object.keys(generated).length} destinations at ${checkedAt}.`);
