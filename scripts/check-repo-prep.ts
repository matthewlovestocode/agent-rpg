#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parse as parseToml } from "toml";

type Dict = Record<string, unknown>;

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
if (fs.existsSync(eventsPath)) {
  const raw = fs.readFileSync(eventsPath, "utf8");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const requiredJsonlKeys = ["ts", "event", "task_id", "agent", "schema_version", "meta"];
  for (let i = 0; i < lines.length; i++) {
    try {
      const row = JSON.parse(lines[i]) as Dict;
      for (const key of requiredJsonlKeys) {
        if (!(key in row)) {
          console.log(`ERROR: ops/agents/state/events.jsonl line ${i + 1} missing key '${key}'`);
          errors++;
        }
      }
    } catch {
      console.log(`ERROR: ops/agents/state/events.jsonl line ${i + 1} is not valid JSON`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.log(`\nRepo prep contract check failed with ${errors} error(s).`);
  process.exit(1);
}

console.log("Repo prep contract check passed.");
