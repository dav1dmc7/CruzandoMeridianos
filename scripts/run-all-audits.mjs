import { spawnSync } from "node:child_process";

const auditScripts = [
  "check-audit-script-syntax.mjs",
  "check-seo.mjs",
  "check-security.mjs",
  "check-sitemap-consistency.mjs",
  "check-accessibility.mjs",
  "check-layout-contracts.mjs",
  "check-form-privacy.mjs",
  "check-motion.mjs",
  "check-navigation.mjs",
  "check-content-quality.mjs",
  "check-page-quality.mjs",
  "check-canonical-routing.mjs",
  "check-visual-accessibility.mjs",
  "check-travel-intelligence-rules.mjs",
  "check-internal-links.mjs",
  "check-external-links.mjs",
  "check-route-contracts.mjs",
  "check-analytics-events.mjs",
  "check-guides.mjs",
  "check-destination-depth.mjs",
  "check-travel-resources.mjs",
  "check-copy-consistency.mjs",
  "check-assets.mjs",
  "check-travel-intelligence.mjs",
];

console.log("Running " + auditScripts.length + " project audits...\n");

for (const script of auditScripts) {
  console.log("\n>>> " + script);
  const result = spawnSync(process.execPath, ["scripts/" + script], { stdio: "inherit" });

  if (result.error) {
    console.error("Failed to start " + script + ": " + result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error("\nAudit suite stopped at " + script + ".");
    process.exit(result.status ?? 1);
  }
}

console.log("\nAll " + auditScripts.length + " project audits passed.");
