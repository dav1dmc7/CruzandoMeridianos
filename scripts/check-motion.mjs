import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const transitionPath = path.join(root, "src/components/interaction/GeoTransition.astro");
const heroPath = path.join(root, "src/components/sections/Hero.astro");
const destinationsPath = path.join(root, "src/components/sections/DestinationCard.astro");

const transition = fs.readFileSync(transitionPath, "utf8");
const hero = fs.readFileSync(heroPath, "utf8");
const destinations = fs.readFileSync(destinationsPath, "utf8");
const failures = [];

const requirePattern = (source, pattern, label) => {
  if (!pattern.test(source)) failures.push(label);
};

requirePattern(
  transition,
  /@media\s*\(prefers-reduced-motion:\s*reduce\)/,
  "GeoTransition must disable motion for reduced-motion users.",
);
requirePattern(
  transition,
  /geo-transition\.is-visible \.geo-transition-globe[^{}]*\{[^}]*animation:/,
  "GeoTransition must keep its destination effect scoped to the visible state.",
);
requirePattern(
  transition,
  /360ms/,
  "GeoTransition must remain a short navigation effect rather than a persistent animation.",
);
requirePattern(
  hero,
  /@media\s*\(prefers-reduced-motion:\s*no-preference\)/,
  "Hero decorative animation must be opt-in for users without reduced-motion preference.",
);
requirePattern(
  hero,
  /@media\s*\(prefers-reduced-motion:\s*reduce\)/,
  "Hero must define a reduced-motion fallback.",
);
requirePattern(
  destinations,
  /@media\s*\(prefers-reduced-motion:\s*reduce\)/,
  "Destination cards must define a reduced-motion fallback.",
);

if (failures.length) {
  console.error("Motion architecture audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Motion architecture audit passed: decorative movement is scoped, brief and respects reduced-motion preferences.");
