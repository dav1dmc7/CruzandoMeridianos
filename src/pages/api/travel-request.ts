import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

interface TravelRequestData {
  trip: string;
  travellers: string;
  age_range?: string;
  dates: string;
  budget: string;
  budget_flights: string;
  experience: string;
  transport?: string[];
  avoid: string;
  style: string;
  pace: string;
  anything?: string;
  name: string;
  email: string;
  website?: string;
}

interface ResendResponse { id?: string; message?: string; }

const FROM_EMAIL = "Cruzando Meridianos <hola@cruzandomeridianos.com>";
const INTERNAL_EMAIL = "hola@cruzandomeridianos.com";
const WEBSITE_URL = "https://cruzandomeridianos.com";
const LOGO_URL = `${WEBSITE_URL}/email-logo.png`;
const RATE_LIMIT_WINDOW_SECONDS = 15 * 60;
const RATE_LIMIT_MAX_REQUESTS = 3;

const COLORS = {
  background: "#f5f2eb", white: "#ffffff", cream: "#fbf9f4", text: "#292722",
  muted: "#706d66", lightMuted: "#918d84", border: "#e8e3d9", gold: "#b77b17",
  goldDark: "#95620d", goldLight: "#f7eddc",
};

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function getResendApiKey(): string | undefined {
  return (env as { RESEND_API_KEY?: string }).RESEND_API_KEY;
}

function getClientKey(request: Request): string {
  return request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

async function isRateLimited(request: Request): Promise<boolean> {
  const kv = (env as { SESSION?: KVNamespace }).SESSION;
  if (!kv) return false;
  const key = `travel-request:${getClientKey(request)}`;
  const now = Math.floor(Date.now() / 1000);
  const current = await kv.get<{ count: number; resetAt: number }>(key, "json");
  if (!current || current.resetAt <= now) {
    await kv.put(key, JSON.stringify({ count: 1, resetAt: now + RATE_LIMIT_WINDOW_SECONDS }), { expirationTtl: RATE_LIMIT_WINDOW_SECONDS });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) return true;
  await kv.put(key, JSON.stringify({ ...current, count: current.count + 1 }), { expiration: current.resetAt });
  return false;
}

async function sendEmail(apiKey: string, payload: { from: string; to: string[]; subject: string; html: string; reply_to?: string; }): Promise<ResendResponse> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify(payload),
  });
  const result = (await response.json()) as ResendResponse;
  if (!response.ok) throw new Error(`Resend error ${response.status}: ${result.message || "Error enviando el correo"}`);
  return result;
}

function emailLayout(content: string, preheader = ""): string {
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="x-apple-disable-message-reformatting"><meta name="format-detection" content="telephone=no,date=no,address=no,email=no"><title>Cruzando Meridianos</title></head><body style="margin:0;padding:0;background:${COLORS.background};font-family:Arial,Helvetica,sans-serif;color:${COLORS.text};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;"><div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;visibility:hidden;">${escapeHtml(preheader)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:${COLORS.background};"><tr><td align="center" style="padding:36px 16px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;background:${COLORS.white};border-radius:16px;overflow:hidden;"><tr><td align="center" style="padding:34px 36px 30px;border-bottom:1px solid ${COLORS.border};"><a href="${WEBSITE_URL}" target="_blank" style="text-decoration:none;display:inline-block;"><img src="${LOGO_URL}" width="180" alt="Cruzando Meridianos" style="display:block;width:180px;max-width:180px;height:auto;border:0;outline:none;text-decoration:none;"></a></td></tr><tr><td style="padding:38px 40px 40px;font-size:16px;line-height:1.65;">${content}</td></tr><tr><td align="center" style="padding:28px 36px 32px;border-top:1px solid ${COLORS.border};background:${COLORS.cream};"><div style="font-size:15px;line-height:1.5;font-weight:bold;color:${COLORS.text};">Cruzando Meridianos</div><div style="margin-top:4px;font-size:13px;line-height:1.5;color:${COLORS.muted};">Viajar con criterio.</div><div style="margin-top:12px;font-size:13px;line-height:1.5;"><a href="${WEBSITE_URL}" target="_blank" style="color:${COLORS.goldDark};text-decoration:none;">cruzandomeridianos.com</a></div></td></tr></table><div style="max-width:640px;margin:16px auto 0;padding:0 16px;text-align:center;font-size:11px;line-height:1.5;color:${COLORS.lightMuted};">Este correo ha sido enviado desde Cruzando Meridianos porque has enviado una solicitud de viaje a través de nuestra web.</div></td></tr></table></body></html>`;
}

function badge(text: string): string { return `<span style="display:inline-block;padding:6px 10px;border-radius:999px;background:${COLORS.goldLight};color:${COLORS.goldDark};font-size:11px;line-height:1;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">${escapeHtml(text)}</span>`; }
function infoBlock(label: string, value: string, options?: { last?: boolean; highlight?: boolean }): string {
  const last = options?.last ?? false, highlight = options?.highlight ?? false;
  return `<div style="${last ? "" : `border-bottom:1px solid ${COLORS.border};`}padding:${last ? "0" : "0 0 16px"};margin:${last ? "0" : "0 0 16px"};"><div style="margin-bottom:5px;font-size:11px;line-height:1.4;font-weight:bold;letter-spacing:.7px;text-transform:uppercase;color:${COLORS.lightMuted};">${escapeHtml(label)}</div><div style="font-size:${highlight ? "18px" : "15px"};line-height:1.5;font-weight:${highlight ? "bold" : "normal"};color:${COLORS.text};">${value}</div></div>`;
}
function internalSection(title: string, content: string, accent = false): string { return `<div style="margin:0 0 24px;padding:22px;background:${accent ? COLORS.goldLight : COLORS.cream};border:1px solid ${accent ? "#ead5ad" : COLORS.border};border-radius:12px;"><div style="margin:0 0 18px;font-size:13px;line-height:1.4;font-weight:bold;letter-spacing:.8px;text-transform:uppercase;color:${accent ? COLORS.goldDark : COLORS.text};">${escapeHtml(title)}</div>${content}</div>`; }
function button(text: string, href: string): string { return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="border-radius:8px;background:${COLORS.gold};"><a href="${escapeHtml(href)}" target="_blank" style="display:inline-block;padding:13px 20px;font-size:14px;line-height:1.2;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:8px;">${escapeHtml(text)}</a></td></tr></table>`; }

export const POST: APIRoute = async ({ request }) => {
  try {
    if (request.method !== "POST") return new Response(JSON.stringify({ success: false, error: "Método no permitido." }), { status: 405, headers: { "Content-Type": "application/json" } });
    if (await isRateLimited(request)) return new Response(JSON.stringify({ success: false, error: "Has enviado varias solicitudes seguidas. Espera unos minutos antes de intentarlo de nuevo." }), { status: 429, headers: { "Content-Type": "application/json", "Retry-After": String(RATE_LIMIT_WINDOW_SECONDS) } });

    const data = (await request.json()) as TravelRequestData;
    if (data.website?.trim()) return new Response(JSON.stringify({ success: true }), { status: 201, headers: { "Content-Type": "application/json" } });

    const { trip, travellers, age_range, dates, budget, budget_flights, experience, transport, avoid, style, pace, anything, name, email } = data;
    if (!trip || !travellers || !dates || !budget || !budget_flights || !experience || !avoid || !style || !pace || !name || !email) return new Response(JSON.stringify({ success: false, error: "Faltan campos obligatorios." }), { status: 400, headers: { "Content-Type": "application/json" } });

    const cleanName = String(name).trim(), cleanEmail = String(email).trim().toLowerCase(), cleanAgeRange = age_range ? String(age_range).trim() : null;
    if (!cleanName || !cleanEmail) return new Response(JSON.stringify({ success: false, error: "Faltan datos de contacto." }), { status: 400, headers: { "Content-Type": "application/json" } });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return new Response(JSON.stringify({ success: false, error: "El email no es válido." }), { status: 400, headers: { "Content-Type": "application/json" } });

    const db = env.cruzandomeridianos_leads, id = crypto.randomUUID();
    await db.prepare(`INSERT INTO travel_requests (id, trip, travellers, age_range, dates, budget, budget_flights, experience, transport, avoid, style, pace, anything, name, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(id, String(trip).trim(), String(travellers).trim(), cleanAgeRange, String(dates).trim(), String(budget), String(budget_flights), String(experience).trim(), JSON.stringify(transport || []), String(avoid).trim(), String(style).trim(), String(pace), anything ? String(anything).trim() : null, cleanName, cleanEmail).run();

    const resendApiKey = getResendApiKey();
    if (!resendApiKey) {
      console.error("RESEND_API_KEY no está configurada. El lead se ha guardado correctamente en D1.");
      return new Response(JSON.stringify({ success: true, id, emailSent: false }), { status: 201, headers: { "Content-Type": "application/json" } });
    }

    const transportText = Array.isArray(transport) && transport.length > 0 ? transport.join(", ") : "No especificado";
    const safeTransport = escapeHtml(transportText), safeTrip = escapeHtml(trip), safeTravellers = escapeHtml(travellers), safeAgeRange = escapeHtml(age_range || "No especificado"), safeDates = escapeHtml(dates), safeBudget = escapeHtml(budget), safeBudgetFlights = escapeHtml(budget_flights), safeExperience = escapeHtml(experience), safeAvoid = escapeHtml(avoid), safeStyle = escapeHtml(style), safePace = escapeHtml(pace), safeAnything = escapeHtml(anything || "No ha indicado nada más.");
    const replyUrl = `mailto:${encodeURIComponent(cleanEmail)}?subject=${encodeURIComponent("Tu viaje con Cruzando Meridianos")}`;

    const internalEmailHtml = emailLayout(`${badge("Nuevo lead")}<h1 style="margin:16px 0 10px;font-size:30px;line-height:1.2;letter-spacing:-.5px;color:${COLORS.text};">Nueva solicitud de viaje</h1><p style="margin:0 0 28px;font-size:16px;line-height:1.6;color:${COLORS.muted};">Alguien acaba de contarnos cómo le gustaría viajar. Aquí tienes toda la información de la solicitud.</p>${internalSection("Viajero", `${infoBlock("Nombre", escapeHtml(cleanName))}${infoBlock("Email", `<a href="mailto:${escapeHtml(cleanEmail)}" style="color:${COLORS.goldDark};text-decoration:none;">${escapeHtml(cleanEmail)}</a>`)}${infoBlock("Edad", safeAgeRange, { last: true })}`, true)}${internalSection("El viaje", `${infoBlock("Viaje que tiene en mente", safeTrip, { highlight: true })}${infoBlock("Viajeros", safeTravellers)}${infoBlock("Fechas", safeDates)}${infoBlock("Presupuesto total", safeBudget)}${infoBlock("Presupuesto para vuelos", safeBudgetFlights, { last: true })}`)}${internalSection("Cómo quiere viajar", `${infoBlock("Experiencia que busca", safeExperience)}${infoBlock("Transporte", safeTransport)}${infoBlock("Estilo de viaje", safeStyle)}${infoBlock("Ritmo", safePace, { last: true })}`)}${internalSection("Preferencias", infoBlock("Qué quiere evitar", safeAvoid, { last: true }))}${internalSection("Algo más que quiera contarnos", `<div style="font-size:15px;line-height:1.65;color:${COLORS.text};">${safeAnything}</div>`)}<div style="margin:28px 0 0;padding-top:24px;border-top:1px solid ${COLORS.border};">${button("Responder al viajero", replyUrl)}<p style="margin:14px 0 0;font-size:12px;line-height:1.5;color:${COLORS.lightMuted};">Al responder desde tu correo, la respuesta se enviará directamente a ${escapeHtml(cleanEmail)}.</p></div><div style="margin-top:28px;padding-top:18px;border-top:1px solid ${COLORS.border};font-size:11px;line-height:1.5;color:${COLORS.lightMuted};">ID de solicitud: ${escapeHtml(id)}</div>`, `Nueva solicitud de viaje de ${cleanName}`);
    const customerEmailHtml = emailLayout(`${badge("Solicitud recibida")}<h1 style="margin:18px 0 18px;font-size:30px;line-height:1.2;letter-spacing:-.5px;color:${COLORS.text};">Hola ${escapeHtml(cleanName)},</h1><p style="margin:0 0 22px;font-size:19px;line-height:1.55;color:${COLORS.text};">Hemos recibido tu solicitud.</p><p>Gracias por contarnos cómo te gustaría viajar. Hemos recibido correctamente toda la información que nos has enviado.</p><p>Ahora vamos a leerla con calma para entender qué buscas, qué es importante para ti y qué tipo de viaje puede encajar realmente contigo.</p><div style="margin:30px 0;padding:24px;background:${COLORS.cream};border:1px solid ${COLORS.border};border-radius:12px;"><div style="margin-bottom:20px;font-size:13px;line-height:1.4;font-weight:bold;letter-spacing:.8px;text-transform:uppercase;color:${COLORS.goldDark};">¿Qué ocurre ahora?</div><p><strong>01 · Revisamos tu solicitud.</strong><br>Leemos lo que nos has contado y ponemos en contexto tus preferencias, fechas y forma de viajar.</p><p><strong>02 · Nos ponemos en contacto contigo.</strong><br>Hablaremos contigo para terminar de entender qué quieres conseguir con este viaje.</p><p style="margin-bottom:0;"><strong>03 · Hablamos de los siguientes pasos.</strong><br>Si vemos que podemos ayudarte, te explicaremos cómo podemos trabajar juntos en tu viaje.</p></div><p style="margin:0 0 22px;padding:18px 20px;background:${COLORS.goldLight};border-radius:10px;font-size:14px;line-height:1.6;color:${COLORS.text};"><strong>Mientras tanto, no tienes que hacer nada.</strong><br>Nosotros nos pondremos en contacto contigo.</p><div style="margin:26px 0 30px;">${button("Conocer Cruzando Meridianos", WEBSITE_URL)}</div><p style="margin:0;color:${COLORS.muted};">Un saludo,<br><br><strong style="color:${COLORS.text};">El equipo de Cruzando Meridianos</strong></p>`, "Hemos recibido tu solicitud de viaje. Gracias por confiar en Cruzando Meridianos.");

    const [internalResult, customerResult] = await Promise.allSettled([
      sendEmail(resendApiKey, { from: FROM_EMAIL, to: [INTERNAL_EMAIL], reply_to: cleanEmail, subject: `Nueva solicitud de viaje — ${cleanName}`, html: internalEmailHtml }),
      sendEmail(resendApiKey, { from: FROM_EMAIL, to: [cleanEmail], subject: "Hemos recibido tu solicitud — Cruzando Meridianos", html: customerEmailHtml }),
    ]);
    if (internalResult.status === "rejected") console.error("No se pudo enviar el email interno:", internalResult.reason);
    if (customerResult.status === "rejected") console.error("No se pudo enviar el email de confirmación al cliente:", customerResult.reason);

    return new Response(JSON.stringify({ success: true, id, emailSent: internalResult.status === "fulfilled" && customerResult.status === "fulfilled" }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error procesando solicitud de viaje:", error);
    return new Response(JSON.stringify({ success: false, error: "No se ha podido procesar la solicitud." }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};