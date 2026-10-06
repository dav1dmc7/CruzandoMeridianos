import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), "utf8");

const globalCss = await read("src/styles/global.css");
const hierarchy = await read("src/components/sections/DestinationHierarchy.astro");

const hex = (value) => {
  const normalized = value.replace("#", "");
  const full = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized;
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ];
};

const luminance = (rgb) => {
  const linear = rgb.map((channel) =>
    channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

const contrast = (foreground, background) => {
  const light = Math.max(foreground, background);
  const dark = Math.min(foreground, background);
  return (light + 0.05) / (dark + 0.05);
};

const readVar = (name) => {
  const line = globalCss.split("\n").find((candidate) => candidate.includes(name + ":"));
  const match = line?.match(/#[0-9A-Fa-f]{6}/);
  if (!match) throw new Error("Missing design token " + name);
  return match[0];
};

const paper = luminance(hex(readVar("--color-papel")));
const arena = luminance(hex(readVar("--color-arena")));
const bosque = luminance(hex(readVar("--color-bosque")));
const copper = luminance(hex(readVar("--color-cobre")));
const copperOnDark = luminance(hex(readVar("--color-cobre-on-dark")));

const failures = [];

if (contrast(copper, paper) < 4.5) failures.push("--color-cobre must meet AA against --color-papel.");
if (contrast(copper, arena) < 4.5) failures.push("--color-cobre must meet AA against --color-arena.");
if (contrast(copperOnDark, bosque) < 4.5) failures.push("--color-cobre-on-dark must meet AA against --color-bosque.");

for (const selector of [
  ".destination-hierarchy .eyebrow",
  ".destination-hierarchy-number",
  ".destination-hierarchy-card-number",
  ".destination-hierarchy-card-arrow",
  ".destination-hierarchy-footer span",
]) {
  if (!hierarchy.includes(selector + "{")) {
    failures.push("Hierarchy accent selector missing: " + selector);
  }
}

console.log("\nVisual accessibility audit");
console.log("===========================");
console.log("- Copper on paper: " + contrast(copper, paper).toFixed(2) + ":1");
console.log("- Copper on arena: " + contrast(copper, arena).toFixed(2) + ":1");
console.log("- Copper-on-dark on bosque: " + contrast(copperOnDark, bosque).toFixed(2) + ":1");

if (failures.length) {
  console.error("\nVisual accessibility audit failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("- Accent palette meets the configured AA text contrast targets.");
