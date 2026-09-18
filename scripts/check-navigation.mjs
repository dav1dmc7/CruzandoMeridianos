import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const header = read("src/components/layout/Header.astro");
const footer = read("src/components/layout/Footer.astro");
const start = read("src/components/sections/TravelStart.astro");
const guidesIndex = read("src/pages/viajes.astro");
const hierarchy = read("src/components/sections/DestinationHierarchy.astro");
const canarias = read("src/pages/viajes/canarias/index.astro");
const astroConfig = read("astro.config.mjs");

const failures = [];
const warnings = [];

const staticRoutes = new Set([
  "/",
  "/como-trabajamos",
  "/viajes",
  "/nuestros-viajes",
  "/recursos",
  "/sobre-nosotros",
  "/contacto",
  "/cuentatuviaje",
  "/privacidad",
  "/aviso-legal",
  "/cookies",
  "/viajes/canarias",
]);

for (const file of ["src/pages/index.astro", "src/pages/como-trabajamos.astro", "src/pages/nuestros-viajes/index.astro", "src/pages/recursos.astro", "src/pages/sobre-nosotros.astro", "src/pages/contacto.astro", "src/pages/cuentatuviaje.astro", "src/pages/privacidad.astro", "src/pages/aviso-legal.astro", "src/pages/cookies.astro"]) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing public route source file: ${file}`);
}

const navItemsMatch = header.match(/const navItems = [([\s\S]*?)\];/m);
if (!navItemsMatch) {
  failures.push("Header navigation registry is missing.");
} else {
  const items = [...navItemsMatch[1].matchAll(/href:\s*"([^"]+)"\s*,\s*label:\s*"([^"]+)"/g)]
    .map((match) => ({ href: match[1], label: match[2] }));
  const hrefs = items.map((item) => item.href);
  const labels = items.map((item) => item.label);

  if (items.length < 6) failures.push("Primary navigation should expose the core site sections.");
  if (new Set(hrefs).size !== hrefs.length) failures.push("Primary navigation contains duplicate hrefs.");
  if (new Set(labels).size !== labels.length) failures.push("Primary navigation contains duplicate labels.");

  for (const item of items) {
    if (!staticRoutes.has(item.href) && !/^\/viajes$/.test(item.href)) {
      failures.push(`Primary navigation target is not part of the known public route set: ${item.href}`);
    }
  }

  const mobileOccurrences = (header.match(/navItems\.map\(/g) ?? []).length;
  if (mobileOccurrences < 2) failures.push("Desktop and mobile navigation must consume the same navItems registry.");
}

for (const expected of [
  'href="/viajes"',
  'href="/nuestros-viajes"',
  'href="/recursos"',
  'href="/como-trabajamos"',
  'href="/sobre-nosotros"',
  'href="/contacto"',
  'href="/privacidad"',
  'href="/aviso-legal"',
  'href="/cookies"',
  'href="/cuentatuviaje"',
]) {
  if (!header.includes(expected) && !footer.includes(expected)) {
    failures.push(`Expected global navigation/CTA route is missing: ${expected}`);
  }
}

if (!start.includes('href="/viajes#explorador"')) failures.push("TravelStart must preserve a direct destination-search entry point.");
if (!start.includes('href="/viajes#radar"')) failures.push("TravelStart must preserve a discovery/radar entry point.");
if (!start.includes('href="/cuentatuviaje"')) failures.push("TravelStart must expose a distinct orientation/contact path.");
if ((start.match(/class="travel-start-card"/g) ?? []).length !== 3) failures.push("TravelStart should expose exactly three distinct starting paths.");

if (!guidesIndex.includes('id="explorador"')) failures.push("Destination explorer anchor #explorador is missing.");
if (!guidesIndex.includes('id="radar"')) failures.push("Destination radar anchor #radar is missing.");
if (!guidesIndex.includes('id="espana"')) warnings.push("The Spain hierarchy section no longer exposes #espana.");
if (!hierarchy.includes('href="/viajes/canarias"')) failures.push("Spain hierarchy must link to the grouped Canary Islands hub.");
if (!canarias.includes('href="/viajes"')) failures.push("Canary Islands hub must link back to the destination atlas.");
if (!canarias.includes('href={`/viajes/${island.slug}`}')) failures.push("Canary Islands hub must link each island to its destination route.");

const configuredEditorial = [...(astroConfig.match(/const editorialGuidePages = \[([\s\S]*?)\];/m)?.[1] ?? "").matchAll(/'([^']+)'/g)].map((match) => match[1]);
if (configuredEditorial.includes("sudafrica/kruger") && !guidesIndex.includes("sudafrica/kruger")) {
  failures.push("The configured Kruger editorial route must be discoverable from /viajes.");
}

if (warnings.length) {
  console.warn("\nNavigation/UX warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Navigation audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Navigation audit passed: global navigation, mobile parity, atlas entry points and regional hub discovery are wired.");
