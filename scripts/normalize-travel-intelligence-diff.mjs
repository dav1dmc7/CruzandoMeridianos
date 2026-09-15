import fs from "node:fs/promises";
import { execFileSync } from "node:child_process";

const relativePath = "src/data/live/travel-intelligence.generated.ts";

const normalize = (value) =>
  value.replace(
    /checkedAt:\s*"[^"]+"/g,
    'checkedAt: "__CHECKED_AT__"',
  );

const current = await fs.readFile(relativePath, "utf8");

let head;
try {
  head = execFileSync(
    "git",
    ["show", `HEAD:${relativePath}`],
    { encoding: "utf8" },
  );
} catch {
  process.exit(0);
}

if (normalize(current) === normalize(head)) {
  await fs.writeFile(relativePath, head, "utf8");
  console.log("Only checkedAt changed; keeping the repository clean.");
} else {
  console.log("Traveler intelligence contains a meaningful change.");
}
