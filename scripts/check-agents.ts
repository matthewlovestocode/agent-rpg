#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parse as parseToml } from "toml";

type Dict = Record<string, unknown>;

const strict = process.argv.includes("--strict");
const agentsDir = path.resolve("agents");
const requiredTopLevel = ["model", "model_reasoning_effort", "sandbox_mode", "theme_file", "developer_instructions"];

const requiredMarkersBase: Record<"default" | "subagent", string[]> = {
  default: [
    "Execution mode protocol:",
    "Conflict-resolution tie-break defaults:",
    "Final quality gates before user delivery:"
  ],
  subagent: ["Required return schema:", "Execution mode protocol:", "confidence"]
};

const requiredMarkersStrict: Record<"default" | "subagent", string[]> = {
  default: [
    "Delegation payload contract:",
    "Sub-agent return schema:",
    "Runtime alias resolution sequence:",
    "Execution mode protocol:",
    "Final quality gates before user delivery:",
    "Conflict-resolution tie-break defaults:"
  ],
  subagent: [
    "Required return schema:",
    "Execution mode protocol:",
    "confidence",
    "If `confidence` is `low`"
  ]
};

let totalErrors = 0;
const files = fs.readdirSync(agentsDir).filter((f) => f.endsWith(".toml")).sort();

for (const file of files) {
  const p = path.join(agentsDir, file);
  const text = fs.readFileSync(p, "utf8");
  let parsed: Dict;
  try {
    parsed = parseToml(text) as unknown as Dict;
  } catch (err) {
    console.log(`\n${path.relative(process.cwd(), p)}:`);
    console.log(`  ERROR: invalid TOML: ${(err as Error).message}`);
    totalErrors++;
    continue;
  }

  const errors: string[] = [];
  for (const k of requiredTopLevel) {
    if (!(k in parsed)) errors.push(`missing top-level key '${k}'`);
  }

  const instructions = String(parsed.developer_instructions ?? "");
  const agentType: "default" | "subagent" = path.basename(file, ".toml") === "default" ? "default" : "subagent";
  const required = strict ? requiredMarkersStrict[agentType] : requiredMarkersBase[agentType];

  for (const marker of required) {
    if (!instructions.includes(marker)) errors.push(`missing developer_instructions marker '${marker}'`);
  }

  if (errors.length) {
    console.log(`\n${path.relative(process.cwd(), p)}:`);
    for (const e of errors) console.log(`  ERROR: ${e}`);
    totalErrors += errors.length;
  }
}

console.log(`\nChecked ${files.length} agent files. Errors: ${totalErrors}. Mode: ${strict ? "strict" : "standard"}.`);
process.exit(totalErrors > 0 ? 1 : 0);
