import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const middleware = read("src/middleware.ts");
const securityTxt = read("public/.well-known/security.txt");
const travelRequest = read("src/pages/api/travel-request.ts");
const workflow = read(".github/workflows/security-audit.yml");

const failures = [];

const requirePattern = (source, pattern, label) => {
  if (!pattern.test(source)) failures.push(label);
};

requirePattern(middleware, /X-Content-Type-Options.*nosniff/, "Global middleware must set X-Content-Type-Options.");
requirePattern(middleware, /X-Frame-Options.*(?:DENY|SAMEORIGIN)/, "Global middleware must set X-Frame-Options.");
requirePattern(middleware, /Referrer-Policy.*strict-origin-when-cross-origin/, "Global middleware must set a restrictive Referrer-Policy.");
requirePattern(middleware, /Permissions-Policy/, "Global middleware must set Permissions-Policy.");
requirePattern(middleware, /Strict-Transport-Security.*max-age=31536000/, "Global middleware must set a one-year HSTS policy.");

requirePattern(securityTxt, /^Contact:\s*mailto:hola@cruzandomeridianos\.com$/m, "security.txt must publish the site's security contact.");
requirePattern(securityTxt, /^Canonical:\s*https:\/\/www\.cruzandomeridianos\.com\/\.well-known\/security\.txt$/m, "security.txt must publish its canonical URL.");

const expiresMatch = securityTxt.match(/^Expires:\s*(\S+)$/m);
if (!expiresMatch) {
  failures.push("security.txt must publish an Expires value.");
} else {
  const expiresAt = new Date(expiresMatch[1]);
  if (Number.isNaN(expiresAt.getTime())) {
    failures.push("security.txt Expires must be a valid ISO timestamp.");
  } else if (expiresAt.getTime() <= Date.now()) {
    failures.push("security.txt Expires must be in the future.");
  }
}

requirePattern(travelRequest, /RATE_LIMIT_MAX_REQUESTS\s*=\s*3/, "Travel requests must keep a server-side request limit.");
requirePattern(travelRequest, /RATE_LIMIT_WINDOW_SECONDS\s*=\s*15\s*\*\s*60/, "Travel request rate limiting must use a finite window.");
requirePattern(travelRequest, /CF-Connecting-IP/, "Travel request rate limiting must use the Cloudflare client IP when available.");
requirePattern(travelRequest, /MAX_BODY_BYTES\s*=\s*64\s*\*\s*1024/, "Travel requests must cap the request body size.");
requirePattern(travelRequest, /RESEND_TIMEOUT_MS\s*=\s*8000/, "Outbound travel-request email calls must have a finite timeout.");
requirePattern(travelRequest, /new AbortController\(\)[\s\S]*RESEND_TIMEOUT_MS[\s\S]*signal:\s*controller\.signal/, "Outbound travel-request email calls must be abortable.");
requirePattern(travelRequest, /request\.headers\.get\("content-type"\)[\s\S]*application\/json/, "Travel requests must require application/json payloads.");
requirePattern(travelRequest, /content-length[\s\S]*MAX_BODY_BYTES/, "Travel requests must reject oversized Content-Length values before parsing the body.");
requirePattern(travelRequest, /try\s*\{\s*data\s*=\s*\(await request\.json\(\)\)/, "Travel requests must convert malformed JSON into a client error instead of a server error.");
requirePattern(travelRequest, /!data \|\| typeof data !== "object" \|\| Array\.isArray\(data\)/, "Travel requests must validate that the JSON body is an object.");
requirePattern(travelRequest, /data\.website\?\.trim\(\)/, "Travel requests must keep the honeypot spam control.");
requirePattern(travelRequest, /escapeHtml\(/, "Travel request emails must HTML-escape user-controlled values.");
requirePattern(travelRequest, /INSERT INTO travel_requests/, "Travel requests must persist leads before sending email.");

requirePattern(workflow, /npm audit --omit=dev --json/, "Security workflow must audit production dependencies.");
requirePattern(workflow, /production dependencies contain/, "Security workflow must enforce the production dependency gate.");

if (failures.length) {
  console.error("Security architecture audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Security architecture audit passed: global headers, security contact, request payload limits, malformed-input handling, form rate limiting, outbound email timeout, escaping and dependency gate are present.");
