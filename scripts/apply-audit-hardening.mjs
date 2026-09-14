import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = {
  resources: path.join(root, "src/pages/recursos.astro"),
  journey: path.join(root, "src/pages/cuentatuviaje.astro"),
  api: path.join(root, "src/pages/api/travel-request.ts"),
  guide: path.join(root, "src/pages/viajes/[slug].astro"),
};

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, value) {
  fs.writeFileSync(file, value);
}

function replaceOnce(file, source, needle, replacement, label) {
  const before = read(file);
  if (!before.includes(needle)) {
    throw new Error(`No se encontró el bloque esperado para ${label}: ${file}`);
  }
  const after = before.replace(needle, replacement);
  if (after === before) throw new Error(`No se aplicó el cambio de ${label}.`);
  write(file, after);
}

// 1. Fix the undefined canonicalUrl used by /recursos JSON-LD.
replaceOnce(
  files.resources,
  files.resources,
  "url: canonicalUrl,",
  'url: "https://www.cruzandomeridianos.com/recursos",',
  "canonical de recursos"
);

// 2. Give the backend honeypot a real field without changing the visible UX.
replaceOnce(
  files.journey,
  files.journey,
  '        <form\n          id="journey-form"\n          novalidate\n        >',
  '        <form\n          id="journey-form"\n          novalidate\n        >\n\n          <div class="honeypot-field" aria-hidden="true">\n            <label for="website">Website</label>\n            <input\n              id="website"\n              name="website"\n              type="text"\n              tabindex="-1"\n              autocomplete="off"\n            />\n          </div>',
  "honeypot del formulario"
);

// 3. Add lightweight client-side CSS to keep the honeypot out of sight and flow.
replaceOnce(
  files.journey,
  files.journey,
  '  /* =========================================================\n     INTRO\n  ========================================================== */',
  '  .honeypot-field {\n    position: absolute;\n    left: -10000px;\n    width: 1px;\n    height: 1px;\n    overflow: hidden;\n  }\n\n\n  /* =========================================================\n     INTRO\n  ========================================================== */',
  "estilo honeypot"
);

// 4. Enforce sane payload limits before writing user-controlled content to D1/email.
replaceOnce(
  files.api,
  files.api,
  '    const data = (await request.json()) as TravelRequestData;\n    if (data.website?.trim())',
  '    const data = (await request.json()) as TravelRequestData;\n\n    const limits: Record<string, number> = {\n      trip: 5000,\n      travellers: 2500,\n      age_range: 120,\n      dates: 500,\n      budget: 250,\n      budget_flights: 250,\n      experience: 3000,\n      avoid: 3000,\n      style: 3000,\n      pace: 250,\n      anything: 5000,\n      name: 160,\n      email: 320,\n    };\n\n    for (const [field, maxLength] of Object.entries(limits)) {\n      const value = data[field as keyof TravelRequestData];\n      if (typeof value === "string" && value.length > maxLength) {\n        return new Response(JSON.stringify({ success: false, error: "Alguno de los campos supera la longitud permitida." }), {\n          status: 400,\n          headers: { "Content-Type": "application/json" },\n        });\n      }\n    }\n\n    if (Array.isArray(data.transport) && data.transport.length > 10) {\n      return new Response(JSON.stringify({ success: false, error: "La selección de transporte no es válida." }), {\n        status: 400,\n        headers: { "Content-Type": "application/json" },\n      });\n    }\n\n    if (data.website?.trim())',
  "límites de entrada de API"
);

// 5. Add BreadcrumbList JSON-LD to destination guides, matching the visible hierarchy.
replaceOnce(
  files.guide,
  files.guide,
  'const guideSchema = {',
  'const breadcrumbSchema = {\n  "@context": "https://schema.org",\n  "@type": "BreadcrumbList",\n  itemListElement: [\n    {\n      "@type": "ListItem",\n      position: 1,\n      name: "Inicio",\n      item: "https://www.cruzandomeridianos.com/",\n    },\n    {\n      "@type": "ListItem",\n      position: 2,\n      name: "Viajes",\n      item: "https://www.cruzandomeridianos.com/viajes",\n    },\n    {\n      "@type": "ListItem",\n      position: 3,\n      name: destination.name,\n      item: canonicalUrl,\n    },\n  ],\n};\n\nconst guideSchema = {',
  "breadcrumb schema de guías"
);

replaceOnce(
  files.guide,
  files.guide,
  '    set:html={JSON.stringify(guideSchema)}\n  />',
  '    set:html={JSON.stringify([breadcrumbSchema, guideSchema])}\n  />',
  "render del breadcrumb schema"
);

console.log("✓ Auditoría P0/P1 aplicada localmente.");
console.log("✓ recursos: canonical JSON-LD corregido.");
console.log("✓ formulario: honeypot invisible conectado al backend.");
console.log("✓ API: límites de entrada añadidos.");
console.log("✓ guías: BreadcrumbList añadido.");
console.log("→ Ejecuta: npx astro check && npm run build && git diff --check");
