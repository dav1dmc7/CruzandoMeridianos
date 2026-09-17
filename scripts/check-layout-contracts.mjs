import { readFile } from "node:fs/promises";

const files = {
  layout: "src/layouts/Layout.astro",
  footer: "src/components/layout/Footer.astro",
};

const [layout, footer] = await Promise.all(
  Object.values(files).map((file) => readFile(file, "utf8")),
);

const failures = [];

if (/import\s+RelatedGuides\s+from/.test(layout)) {
  failures.push("Layout must not import RelatedGuides directly.");
}

if (/<RelatedGuides\s*\/>/.test(layout)) {
  failures.push("Layout must not render RelatedGuides directly.");
}

if (!/import\s+RelatedGuides\s+from\s+["']\.\.\/sections\/RelatedGuides\.astro["']/.test(footer)) {
  failures.push("Footer must own the RelatedGuides composition.");
}

if (!/<RelatedGuides\s*\/>\s*<footer\s+class=["']site-footer["']/.test(footer)) {
  failures.push("RelatedGuides must render immediately before the site footer.");
}

if (failures.length) {
  console.error("Layout composition audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Layout composition audit passed: related guides are owned by Footer and render before it.");
