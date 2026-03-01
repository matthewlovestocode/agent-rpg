#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parse as parseToml } from "toml";

type Dict = Record<string, unknown>;
const AGENT_ROLES = [
  "default",
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
] as const;

const filePath = path.resolve("agents/repo_prep.toml");

if (!fs.existsSync(filePath)) {
  console.error("ERROR: agents/repo_prep.toml not found");
  process.exit(2);
}

const text = fs.readFileSync(filePath, "utf8");
let parsed: Dict;
try {
  parsed = parseToml(text) as unknown as Dict;
} catch (err) {
  console.error(`ERROR: invalid TOML in agents/repo_prep.toml: ${(err as Error).message}`);
  process.exit(2);
}

const instructions = String(parsed.developer_instructions ?? "");
const requiredMarkers = [
  "Ops scaffold profile (source of truth):",
  "`ops/agents/state/events.jsonl`",
  "`ops/agents/logs/default.jsonl`",
  "Required JSONL fields per line:",
  "`ts`, `event`, `task_id`, `agent`, `schema_version`, `meta`",
  "`handoff_trace`",
  "Execution mode protocol:",
  "create only-if-missing; if file exists, compare checksum/content and skip unless coordinator explicitly requests overwrite."
];

let errors = 0;
for (const marker of requiredMarkers) {
  if (!instructions.includes(marker)) {
    console.log(`ERROR: missing repo_prep marker '${marker}'`);
    errors++;
  }
}

const eventsPath = path.resolve("ops/agents/state/events.jsonl");
const perAgentLogPaths = AGENT_ROLES.map((role) => path.resolve(`ops/agents/logs/${role}.jsonl`));
const jsonlPaths = [eventsPath, ...perAgentLogPaths];
for (const jsonlPath of jsonlPaths) {
  if (!fs.existsSync(jsonlPath)) continue;
  const raw = fs.readFileSync(jsonlPath, "utf8");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const requiredJsonlKeys = ["ts", "event", "task_id", "agent", "schema_version", "meta"];
  for (let i = 0; i < lines.length; i++) {
    try {
      const row = JSON.parse(lines[i]) as Dict;
      for (const key of requiredJsonlKeys) {
        if (!(key in row)) {
          console.log(`ERROR: ${path.relative(process.cwd(), jsonlPath)} line ${i + 1} missing key '${key}'`);
          errors++;
        }
      }
    } catch {
      console.log(`ERROR: ${path.relative(process.cwd(), jsonlPath)} line ${i + 1} is not valid JSON`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.log(`\nRepo prep contract check failed with ${errors} error(s).`);
  process.exit(1);
}

console.log("Repo prep contract check passed.");
