import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const files = [
  "src/components/layout/Header.astro",
  "src/components/layout/Footer.astro",
  "src/pages/como-trabajamos.astro",
  "src/pages/cuentatuviaje.astro",
  "src/pages/contacto.astro",
  "src/pages/nuestros-viajes/index.astro",
  "src/pages/recursos.astro",
  "src/components/sections/Hero.astro",
  "src/components/sections/TravelStory.astro",
  "src/components/sections/WhyUs.astro",
  "src/components/sections/WhatYouGet.astro",
  "src/components/sections/WorkPreview.astro",
  "src/components/sections/ProofOfWork.astro",
  "src/components/sections/HowItWorks.astro",
];

const pluralSecondPerson = /\b(?:vuestra|vuestro|vuestros|vuestras|vosotros|vosotras|tenéis|queréis|podéis|debéis|os)\b/giu;
const publicTerminologyChecks = [
  {
    file: "src/components/layout/Header.astro",
    pattern: /href="\/viajes"[^\n]*label:\s*"Guías de destino"/u,
    label: 'Header: “Guías de destino”',
  },
  {
    file: "src/components/layout/Footer.astro",
    pattern: /href="\/viajes">\s*Guías de destino/u,
    label: 'Footer: “Guías de destino”',
  },
  {
    file: "src/components/analytics/SiteInstrumentation.astro",
    pattern: /guide-hero__status|hideInternalEditorialStatus/u,
    label: "Instrumentation: sin hack de estado editorial",
    expectAbsent: true,
  },
  {
    file: "src/components/sections/TravelStory.astro",
    pattern: /href="\/viajes"[^>]*>\s*Explorar nuestras guías de destino/u,
    label: "Home: el enlace de experiencia apunta a las guías",
  },
];

const warnings = [];
const failures = [];

for (const relativePath of files) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`${relativePath}: archivo no encontrado`);
    continue;
  }

  const source = fs.readFileSync(absolutePath, "utf8");
  const matches = source.match(pluralSecondPerson) ?? [];

  if (matches.length > 0) {
    warnings.push(
      `${relativePath}: ${matches.length} forma(s) de segunda persona plural (${[
        ...new Set(matches.map((match) => match.toLowerCase())),
      ].join(", ")})`,
    );
  }
}

for (const check of publicTerminologyChecks) {
  const absolutePath = path.join(root, check.file);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`${check.file}: archivo no encontrado para la comprobación ${check.label}`);
    continue;
  }

  const source = fs.readFileSync(absolutePath, "utf8");
  const found = check.pattern.test(source);
  const passed = check.expectAbsent ? !found : found;

  if (!passed) {
    failures.push(`${check.file}: ${check.label}`);
  }
}

console.log("\nCopy consistency audit");
console.log("======================");

if (warnings.length > 0) {
  console.warn("\nAdvertencias editoriales:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
  console.warn("\nEstas advertencias no bloquean el build; sirven para mantener una voz editorial consistente.\n");
} else {
  console.log("- No se han detectado formas de segunda persona plural en los archivos auditados.");
}

if (failures.length > 0) {
  console.error("Comprobaciones críticas fallidas:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log("- Terminología pública crítica: OK");
}
