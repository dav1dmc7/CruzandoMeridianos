import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { pathToFileURL } from "node:url";

import { TRAVEL_INTELLIGENCE_SOURCES } from "./travel-intelligence.sources.mjs";

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

const RULES = [
  {
    type: "carretera",
    severity: "high",
    patterns: [
      /road\s+(is\s+)?closed/i,
      /road\s+closure/i,
      /carretera[s]?\s+(cerrada|cerrado|cerradas|cerrados)/i,
      /via[s]?\s+(cerrada|cerrado|cerradas|cerrados)/i,
      /deslizamiento[s]?/i,
      /landslide[s]?/i,
      /bridge\s+(is\s+)?closed/i,
      /puente\s+(cerrad|afectad)/i,
    ],
  },
  {
    type: "clima",
    severity: "high",
    patterns: [
      /flooding/i,
      /flood\s+warning/i,
      /inundacion(?:es)?/i,
      /inundación(?:es)?/i,
      /tormenta[s]?\s+(severa|fuerte|tropical)/i,
      /severe\s+(weather|storm|rain)/i,
      /tropical\s+storm/i,
      /hurricane/i,
      /cicl[oó]n/i,
      /huracan/i,
      /huracán/i,
      /aviso\s+meteorologic/i,
      /weather\s+warning/i,
    ],
  },
  {
    type: "parque",
    severity: "medium",
    patterns: [
      /park\s+(is\s+)?closed/i,
      /national\s+park\s+closed/i,
      /parque\s+nacional.*cerrad/i,
      /cerrad[oa].*parque/i,
      /trail\s+(is\s+)?closed/i,
      /sendero.*cerrad/i,
    ],
  },
  {
    type: "transporte",
    severity: "high",
    patterns: [
      /airport\s+(is\s+)?closed/i,
      /airport\s+disruption/i,
      /flight\s+disruption/i,
      /ferry\s+(is\s+)?cancelled/i,
      /strike\s+(will\s+)?affect/i,
      /huelga/i,
      /cancelaciones?/i,
      /cancelled\s+services?/i,
      /transport\s+disruption/i,
    ],
  },
  {
    type: "entrada",
    severity: "high",
    patterns: [
      /entry\s+requirements?\s+(have\s+)?changed/i,
      /visa\s+requirements?.*(change|new|introduced|updated)/i,
      /entry\s+permit/i,
      /visado.*(cambio|nuevo|obligatorio)/i,
      /visado.*(cambiado|actualizado)/i,
      /permiso.*entrada/i,
      /permit.*entry/i,
    ],
  },
  {
    type: "seguridad",
    severity: "high",
    patterns: [
      /do\s+not\s+travel/i,
      /avoid\s+all\s+travel/i,
      /avoid\s+travel/i,
      /reconsider\s+travel/i,
      /travel\s+advisory/i,
      /no\s+se\s+recomienda\s+viajar/i,
      /se\s+desaconseja\s+el\s+viaje/i,
      /aplazar\s+el\s+viaje/i,
      /evitar\s+viajes?/i,
      /estado\s+de\s+emergencia/i,
      /emergency\s+state/i,
    ],
  },
  {
    type: "salud",
    severity: "medium",
    patterns: [
      /health\s+alert/i,
      /health\s+restriction/i,
      /outbreak/i,
      /epidemic/i,
      /sanitary\s+measures?/i,
      /alerta\s+sanitaria/i,
      /brote/i,
      /medidas\s+sanitarias?/i,
    ],
  },
  {
    type: "volcan",
    severity: "high",
    patterns: [
      /volcanic\s+activity/i,
      /volcano\s+alert/i,
      /erupcion/i,
      /erupción/i,
      /actividad\s+volcanica/i,
      /actividad\s+volcánica/i,
    ],
  },
];

const sentenceCandidates = (text) => text
  .split(/(?<=[.!?])\s+/)
  .map((sentence) => sentence.trim())
  .filter((sentence) => sentence.length >= 45 && sentence.length <= 600);

const classifyText = (text, source) => {
  const sentences = sentenceCandidates(text);
  const alerts = [];

  for (const rule of RULES) {
    const hit = sentences.find((sentence) =>
      rule.patterns.some((pattern) => pattern.test(sentence)),
    );

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
  const changed = fetched.filter(
    (source) => previousUpdate?.sourceFingerprints?.[source.id] !== source.fingerprint,
  );

  let alerts = previousUpdate?.alerts ?? [];

  if (changed.length > 0) {
    alerts = dedupeAlerts(changed.flatMap((source) => classifyText(source.text, source)));
  }

  generated[destination.slug] = {
    checkedAt,
    sourceFingerprints: fingerprints,
    alerts,
    sourceFailures: failures,
  };

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
