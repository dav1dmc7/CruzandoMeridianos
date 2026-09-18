import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const layout = read("src/layouts/Layout.astro");
const header = read("src/components/layout/Header.astro");
const formPage = read("src/pages/cuentatuviaje.astro");
const guideMap = read("src/components/guides/GuidePlacesMap.astro");
const firstHandGallery = read("src/components/guides/GuideFirstHandGallery.astro");
const livedTripPage = read("src/pages/nuestros-viajes/[slug].astro");

const failures = [];

const requirePattern = (source, pattern, label) => {
  if (!pattern.test(source)) failures.push(label);
};

requirePattern(layout, /<html\s+lang="es">/, "The document must declare its language.");
requirePattern(layout, /class="skip-link"\s+href="#main-content"/, "Layout must expose a skip link to the main content.");
requirePattern(layout, /id="main-content"/, "Layout must expose the skip-link target.");

requirePattern(header, /<nav class="main-nav" aria-label="Navegación principal">/, "Desktop navigation must have an accessible label.");
requirePattern(header, /class="menu-toggle"[\s\S]*aria-label="Abrir menú"[\s\S]*aria-expanded="false"[\s\S]*aria-controls="mobile-menu"/, "Mobile menu toggle must expose its state and controlled region.");
requirePattern(header, /id="mobile-menu"[\s\S]*aria-label="Navegación móvil"[\s\S]*aria-hidden="true"[\s\S]*inert/, "The closed mobile menu must be hidden from assistive technology and keyboard navigation.");
requirePattern(header, /mobileMenu\.setAttribute\("inert", ""\)/, "Closing the mobile menu must restore inert state.");
requirePattern(header, /mobileMenu\.removeAttribute\("inert"\)/, "Opening the mobile menu must remove inert state.");
requirePattern(header, /event\.key === "Escape"/, "The mobile menu must support Escape to close.");
requirePattern(header, /:focus-visible/, "The header must define a visible keyboard focus treatment.");

requirePattern(formPage, /<form\s+id="journey-form"/, "The travel request page must expose a stable form landmark.");
requirePattern(formPage, /aria-live="polite"\s+id="progress-message"/, "Travel form progress must be announced politely to assistive technology.");
requirePattern(formPage, /<label\s+for="trip">/, "The first travel-form field must use an explicit label association.");
requirePattern(formPage, /<label\s+for="website">/, "The honeypot field must remain correctly labelled for markup validity.");
requirePattern(formPage, /class="sub-question age-range-question"[\s\S]*16–17 años[\s\S]*65\+ años/, "Travel form must expose the optional traveler age bands.");
requirePattern(formPage, /age_range:[\s\S]*formData/, "Travel form must collect the optional age range in its request payload.");
requirePattern(guideMap, /aria-pressed="false"/, "Guide place controls must expose an initial pressed state.");
requirePattern(guideMap, /setAttribute\("aria-pressed", String\(isActive\)\)/, "Guide place controls must update their pressed state when selection changes.");

requirePattern(firstHandGallery, /titleId\?: string/, "First-hand galleries must support caller-defined heading ids.");
requirePattern(firstHandGallery, /aria-labelledby=\{titleId\}/, "First-hand galleries must connect their region label to the visible heading id.");
requirePattern(firstHandGallery, /<h2 id=\{titleId\}>/, "First-hand galleries must use the configured heading id on the visible h2.");

const livedGalleryOccurrences = [...livedTripPage.matchAll(/<GuideFirstHandGallery\b/g)].length;
const livedGalleryTitleIdOccurrences = [...livedTripPage.matchAll(/titleId="/g)].length;
if (livedGalleryOccurrences > 1 && livedGalleryTitleIdOccurrences < livedGalleryOccurrences) {
  failures.push("Pages with multiple first-hand galleries must provide a unique titleId for each gallery.");
}

const formIds = new Set(
  [...formPage.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
);
const labelPattern = /<label\b([^>]*)>([\s\S]*?)<\/label>/gi;

let labelMatch;
while ((labelMatch = labelPattern.exec(formPage))) {
  const attributes = labelMatch[1] ?? "";
  const content = labelMatch[2] ?? "";
  const forMatch = attributes.match(/\bfor="([^"]+)"/i);
  const wrapsControl = /<(?:input|select|textarea)\b/i.test(content);

  if (!forMatch && !wrapsControl) {
    failures.push("Every form label must target a control with `for` or wrap a form control.");
    break;
  }

  if (forMatch && !formIds.has(forMatch[1])) {
    failures.push(`Form label target "${forMatch[1]}" does not match an element id.`);
    break;
  }
}

const duplicatedIds = new Set();
const seenIds = new Set();
for (const match of formPage.matchAll(/\bid="([^"]+)"/g)) {
  const id = match[1];
  if (seenIds.has(id)) duplicatedIds.add(id);
  seenIds.add(id);
}
if (duplicatedIds.size) {
  failures.push(`The travel form contains duplicated ids: ${[...duplicatedIds].join(", ")}.`);
}

if (failures.length) {
  console.error("Accessibility architecture audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Accessibility architecture audit passed: language, skip link, navigation, mobile menu, form labels and travel-form accessibility contracts are present.");
