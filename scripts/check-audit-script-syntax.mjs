import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "scripts");
const scripts = readdirSync(root)
  .filter((file) => file.endsWith(".mjs"))
  .sort();

const failures = [];

for (const script of scripts) {
  const result = spawnSync(process.execPath, ["--check", join(root, script)], {
    encoding: "utf8",
  });

  if (result.status !== 0) {
    failures.push({
      script,
      output: [result.stdout, result.stderr].filter(Boolean).join("\n").trim(),
    });
  }
}

if (failures.length) {
  console.error("Audit script syntax check failed:");
  for (const failure of failures) {
    console.error("- " + failure.script);
    if (failure.output) console.error(failure.output);
  }
  process.exit(1);
}

console.log("Audit script syntax check passed: " + scripts.length + " .mjs files parse successfully.");
