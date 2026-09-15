import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

const ALLOWED_EVENTS = new Set([
  "cta_travel_request",
  "travel_form_start",
  "travel_form_step",
  "travel_form_submit",
  "proof_of_work",
  "costa_rica_decision_nav",
  "interaction",
]);

const MAX_BODY = 5000;
const MAX_VALUE = 500;
const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX_REQUESTS = 60;

function getClientKey(request: Request): string {
  return request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

async function isRateLimited(request: Request): Promise<boolean> {
  const kv = (env as { SESSION?: KVNamespace }).SESSION;
  if (!kv) return false;

  const key = `analytics:${getClientKey(request)}`;
  const now = Math.floor(Date.now() / 1000);
  const current = await kv.get<{ count: number; resetAt: number }>(key, "json");

  if (!current || current.resetAt <= now) {
    await kv.put(key, JSON.stringify({ count: 1, resetAt: now + RATE_LIMIT_WINDOW_SECONDS }), {
      expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
    });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) return true;

  await kv.put(key, JSON.stringify({ ...current, count: current.count + 1 }), {
    expiration: current.resetAt,
  });
  return false;
}

const clean = (value: unknown, max = MAX_VALUE): string | null => {
  if (typeof value !== "string") return null;
  const result = value.trim();
  return result ? result.slice(0, max) : null;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    if (request.method !== "POST") {
      return new Response(null, { status: 405 });
    }

    if (await isRateLimited(request)) {
      return new Response(null, { status: 204 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY) {
      return new Response(null, { status: 413 });
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY) {
      return new Response(null, { status: 413 });
    }

    const body = JSON.parse(rawBody) as Record<string, unknown>;
    const eventName = clean(body.event_name, 80);
    const path = clean(body.path, 500);

    if (!eventName || !ALLOWED_EVENTS.has(eventName) || !path || !path.startsWith("/")) {
      return new Response(null, { status: 204 });
    }

    const stepValue = Number(body.step);
    const step = Number.isInteger(stepValue) && stepValue >= 1 && stepValue <= 12 ? stepValue : null;

    await env.cruzandomeridianos_leads
      .prepare(`
        INSERT INTO analytics_events
          (id, event_name, path, label, href, referrer, utm_source, utm_medium, utm_campaign, step)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        crypto.randomUUID(),
        eventName,
        path,
        clean(body.label),
        clean(body.href),
        clean(body.referrer, 1000),
        clean(body.utm_source),
        clean(body.utm_medium),
        clean(body.utm_campaign),
        step,
      )
      .run();

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Analytics event error", error);
    return new Response(null, { status: 204 });
  }
};
