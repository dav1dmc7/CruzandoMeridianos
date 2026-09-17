import { readFile } from "node:fs/promises";

const formPage = await readFile("src/pages/cuentatuviaje.astro", "utf8");
const privacyPage = await readFile("src/pages/privacidad.astro", "utf8");

const failures = [];

if (!/<p class=["']privacy-note["']>[\s\S]*<a href=["']\/privacidad["']>política de privacidad<\/a>[\s\S]*<\/p>/.test(formPage)) {
  failures.push("The travel form must link its privacy notice directly to /privacidad.");
}

if (!/title=["']Política de privacidad \| Cruzando Meridianos["']/.test(privacyPage)) {
  failures.push("The privacy destination page must keep its canonical public title prop.");
}

if (failures.length) {
  console.error("Travel form privacy audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Travel form privacy audit passed: the personal-data notice links directly to the privacy policy.");
