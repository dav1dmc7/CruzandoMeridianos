import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const registryPath = path.join(root, "src/data/resources/index.ts");
const landingPath = path.join(root, "src/pages/recursos/[slug].astro");
const hubPath = path.join(root, "src/components/sections/ResourceHubLinks.astro");

const read = (filePath) => fs.readFileSync(filePath, "utf8");

const fail = (message) => {
  console.error(`Travel resource audit failed: ${message}`);
  process.exitCode = 1;
};

if (!fs.existsSync(registryPath)) {
  fail("the resource registry is missing");
  process.exit();
}

if (!fs.existsSync(landingPath)) {
  fail("the dynamic resource landing page is missing");
  process.exit();
}

if (!fs.existsSync(hubPath)) {
  fail("the internal resource hub component is missing");
  process.exit();
}

const registry = read(registryPath);
const landing = read(landingPath);
const hub = read(hubPath);

const resourceBlocks = [...registry.matchAll(/const\s+\w+\s*:\s*TravelResource\s*=\s*\{([\s\S]*?)\n\};/g)]
  .map((match) => match[1]);

if (resourceBlocks.length === 0) {
  fail("no TravelResource records were found");
  process.exit();
}

const sharedReviewDate = registry.match(/const\s+LAST_REVIEWED\s*=\s*["'](\d{4}-\d{2}-\d{2})["']/)?.[1] ?? null;

if (!sharedReviewDate) {
  fail("the resource registry is missing an ISO LAST_REVIEWED date");
}

const resources = resourceBlocks.map((block) => ({
  id: block.match(/\bid:\s*["']([^"']+)["']/)?.[1] ?? null,
  status: block.match(/\bstatus:\s*["']([^"']+)["']/)?.[1] ?? null,
  relationship: block.match(/\brelationship:\s*["']([^"']+)["']/)?.[1] ?? null,
  trackingUrl: Boolean(block.match(/\btrackingUrl:\s*["'][^"']+["']/)),
  disclosure: Boolean(block.match(/\bdisclosure:\s*["'][^"']+["']/)),
  reviewedAt: block.match(/\breviewedAt:\s*["'](\d{4}-\d{2}-\d{2})["']/)?.[1]
    ?? (block.match(/\breviewedAt:\s*LAST_REVIEWED\b/) ? sharedReviewDate : null),
}));

const seenIds = new Set();
for (const resource of resources) {
  if (!resource.id) fail("a resource is missing its stable id");
  if (seenIds.has(resource.id)) fail(`duplicate resource id: ${resource.id}`);
  seenIds.add(resource.id);

  if (!resource.reviewedAt) {
    fail(`${resource.id} is missing an ISO reviewedAt date`);
  }

  if (resource.status === "active" && !resource.id) {
    fail("an active resource is missing its id");
  }

  const isCommercial = ["affiliate", "referral", "sponsor"].includes(resource.relationship);
  if (isCommercial && !resource.trackingUrl) {
    fail(`${resource.id} is commercial but has no trackingUrl`);
  }
  if (isCommercial && !resource.disclosure) {
    fail(`${resource.id} is commercial but has no disclosure`);
  }
}

if (!landing.includes("getAllTravelResources") || !landing.includes("getStaticPaths")) {
  fail("resource landing pages are not driven by the central resource registry");
}

if (!landing.includes('data-track="interaction"')) {
  fail("resource provider links are not instrumented");
}

if (!landing.includes("sponsored noopener noreferrer")) {
  fail("commercial resource links are not marked as sponsored");
}

if (!hub.includes("/recursos/${resource.id}")) {
  fail("the resource hub does not expose internal links to resource landing pages");
}

const activeCount = resources.filter((resource) => resource.status === "active").length;

if (activeCount === 0) {
  fail("the registry has no active resources");
}

if (process.exitCode !== 1) {
  console.log(`Travel resource audit passed: ${activeCount} active resource(s) checked.`);
}
