#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

type Mode = "dry_run" | "apply";

function parseArgs(argv: string[]) {
  let mode: Mode = "dry_run";
  let root = process.cwd();
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--mode") {
      const v = argv[i + 1];
      if (v === "dry_run" || v === "apply") {
        mode = v;
        i++;
      } else {
        throw new Error("Invalid --mode. Use dry_run|apply.");
      }
      continue;
    }
    if (a === "--root") {
      const v = argv[i + 1];
      if (!v) throw new Error("Missing value for --root.");
      root = path.resolve(v);
      i++;
      continue;
    }
  }
  return { mode, root };
}

function ensureDir(target: string, mode: Mode, created: string[], skipped: string[]) {
  if (fs.existsSync(target)) {
    skipped.push(target);
    return;
  }
  if (mode === "apply") fs.mkdirSync(target, { recursive: true });
  created.push(target);
}

function readJsonlConflicts(file: string): string[] {
  const conflicts: string[] = [];
  if (!fs.existsSync(file)) return conflicts;
  const raw = fs.readFileSync(file, "utf8");
  if (raw.trim() === "") return conflicts;
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const required = ["ts", "event", "task_id", "agent", "schema_version", "meta"];
  for (let i = 0; i < lines.length; i++) {
    try {
      const row = JSON.parse(lines[i]) as Record<string, unknown>;
      for (const key of required) {
        if (!(key in row)) conflicts.push(`events.jsonl line ${i + 1} missing required key '${key}'`);
      }
    } catch {
      conflicts.push(`events.jsonl line ${i + 1} is not valid JSON`);
    }
  }
  return conflicts;
}

function main() {
  const { mode, root } = parseArgs(process.argv.slice(2));
  const created: string[] = [];
  const skipped: string[] = [];
  const conflicts: string[] = [];

  const opsDir = path.join(root, "ops");
  const agentsDir = path.join(opsDir, "agents");
  const stateDir = path.join(agentsDir, "state");
  const eventsFile = path.join(stateDir, "events.jsonl");

  ensureDir(opsDir, mode, created, skipped);
  ensureDir(agentsDir, mode, created, skipped);
  ensureDir(stateDir, mode, created, skipped);

  if (fs.existsSync(eventsFile)) {
    skipped.push(eventsFile);
    conflicts.push(...readJsonlConflicts(eventsFile));
  } else {
    if (mode === "apply") fs.writeFileSync(eventsFile, "");
    created.push(eventsFile);
  }

  const result = {
    mode,
    root,
    profile: {
      required_directories: ["ops/", "ops/agents/", "ops/agents/state/"],
      required_file: "ops/agents/state/events.jsonl",
      policy: "append-only events log; never rewrite existing history unless explicitly requested"
    },
    created: created.map((p) => path.relative(root, p)),
    skipped: skipped.map((p) => path.relative(root, p)),
    conflicts
  };

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main();
