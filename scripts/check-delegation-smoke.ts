#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parse as parseToml } from "toml";

type Dict = Record<string, unknown>;

const coordinatorPath = path.resolve("agents/default.toml");
if (!fs.existsSync(coordinatorPath)) {
  console.error("ERROR: agents/default.toml not found");
  process.exit(1);
}

const expectedRoles = [
  "analyzer",
  "explorer",
  "repo_prep",
  "worker",
  "senior_dev",
  "reviewer",
  "verifier",
  "tester",
  "security_reviewer",
  "performance_reviewer",
  "documentation"
];

const coordinatorText = fs.readFileSync(coordinatorPath, "utf8");
let parsed: Dict;
try {
  parsed = parseToml(coordinatorText) as unknown as Dict;
} catch (err) {
  console.error(`ERROR: invalid TOML in agents/default.toml: ${(err as Error).message}`);
  process.exit(1);
}

const instructions = String(parsed.developer_instructions ?? "");
const requiredCoordinatorMarkers = [
  "Delegation payload contract:",
  "Sub-agent return schema:",
  "Risk-tier routing heuristics:",
  "Cross-agent contradiction protocol:",
  "Explorer vs Analyzer routing rubric:",
  "Final quality gates before user delivery:",
  "Conflict-resolution tie-break defaults:"
];

let errors = 0;
for (const marker of requiredCoordinatorMarkers) {
  if (!instructions.includes(marker)) {
    console.log(`ERROR: coordinator missing marker '${marker}'`);
    errors++;
  }
}

const requiredRoutingTriggerPhrases = [
  "Route to `explorer` when the goal is discovery/enumeration",
  "Route to `analyzer` when the goal is interpretation/synthesis",
  "Route `explorer` then `analyzer` when both are needed"
];
for (const phrase of requiredRoutingTriggerPhrases) {
  if (!instructions.includes(phrase)) {
    console.log(`ERROR: coordinator missing explorer/analyzer trigger phrase '${phrase}'`);
    errors++;
  }
}

for (const role of expectedRoles) {
  const agentPath = path.resolve("agents", `${role}.toml`);
  if (!fs.existsSync(agentPath)) {
    console.log(`ERROR: missing agent file agents/${role}.toml`);
    errors++;
    continue;
  }

  const roleMentionToken = `\`${role}\``;
  if (!instructions.includes(roleMentionToken)) {
    console.log(`ERROR: coordinator instructions do not reference role ${roleMentionToken}`);
    errors++;
  }

  const text = fs.readFileSync(agentPath, "utf8");
  const subMarkers = ["Required return schema:", "Output template (example):", "Escalation rules:", "Execution mode protocol:"];
  for (const marker of subMarkers) {
    if (!text.includes(marker)) {
      console.log(`ERROR: agents/${role}.toml missing marker '${marker}'`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.log(`\nDelegation smoke check failed with ${errors} error(s).`);
  process.exit(1);
}

console.log("Delegation smoke check passed.");
