import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const layout = read("src/layouts/Layout.astro");
const header = read("src/components/layout/Header.astro");
const formPage = read("src/pages/cuentatuviaje.astro");

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

if (failures.length) {
  console.error("Accessibility architecture audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Accessibility architecture audit passed: language, skip link, navigation, mobile menu and travel-form accessibility contracts are present.");
