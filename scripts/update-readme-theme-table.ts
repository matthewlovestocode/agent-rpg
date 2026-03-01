#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parse as parseToml } from "toml";

type ThemeRow = {
  key: string;
  name: string;
  displayName: string;
  category: string;
  file: string;
  description: string;
};

const CATEGORY_LABEL: Record<string, string> = {
  core: "Core",
  fantasy: "Fantasy",
  sci_fi: "Sci-Fi",
  superhero: "Superhero",
  action_spy: "Action/Spy",
  anime: "Anime",
  mythology: "Mythology",
  sports: "Sports"
};

const CATEGORY_ORDER = [
  "core",
  "fantasy",
  "sci_fi",
  "superhero",
  "action_spy",
  "anime",
  "mythology",
  "sports"
];

function readThemes(): ThemeRow[] {
  const dir = path.resolve("themes");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".toml") && !f.startsWith("_"))
    .sort()
    .map((f) => {
      const p = path.join(dir, f);
      const parsed = parseToml(fs.readFileSync(p, "utf8")) as Record<string, unknown>;
      const theme = (parsed.theme ?? {}) as Record<string, unknown>;
      const name = String(theme.name ?? f.replace(/\.toml$/, ""));
      const key = f.replace(/\.toml$/, "");
      const category = String(theme.category ?? "core");
      const description = String(theme.description ?? "");
      return {
        key,
        name,
        displayName: String(theme.display_name ?? name),
        category,
        file: `$CODEX_HOME/themes/${f}`,
        description
      };
    });
}

function categoryRank(cat: string): number {
  const idx = CATEGORY_ORDER.indexOf(cat);
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
}

function buildTable(rows: ThemeRow[]): string {
  const sorted = [...rows].sort((a, b) => {
    const byCat = categoryRank(a.category) - categoryRank(b.category);
    if (byCat !== 0) return byCat;
    return a.key.localeCompare(b.key);
  });

  const lines = [
    "| Category | Theme | File | Style |",
    "|---|---|---|---|"
  ];

  for (const row of sorted) {
    const cat = CATEGORY_LABEL[row.category] ?? row.category;
    lines.push(`| ${cat} | \`${row.key}\` | \`${row.file}\` | ${row.description} |`);
  }

  return lines.join("\n");
}

function buildExamples(rows: ThemeRow[]): string {
  const sorted = [...rows].sort((a, b) => {
    const byCat = categoryRank(a.category) - categoryRank(b.category);
    if (byCat !== 0) return byCat;
    return a.key.localeCompare(b.key);
  });

  const lines: string[] = [];
  for (const row of sorted) {
    lines.push(`\`${row.key}\`:`);
    lines.push("```text");
    lines.push(`Theme: ${row.key}`);
    lines.push("Theme temperature: high");
    lines.push("List the agent roster.");
    lines.push("```");
    lines.push("");
  }
  return lines.join("\n").trimEnd();
}

function main() {
  const readmePath = path.resolve("README.md");
  const tableStart = "<!-- THEMES_TABLE_START -->";
  const tableEnd = "<!-- THEMES_TABLE_END -->";
  const examplesStart = "<!-- THEMES_EXAMPLES_START -->";
  const examplesEnd = "<!-- THEMES_EXAMPLES_END -->";
  const readme = fs.readFileSync(readmePath, "utf8");

  const ts = readme.indexOf(tableStart);
  const te = readme.indexOf(tableEnd);
  const es = readme.indexOf(examplesStart);
  const ee = readme.indexOf(examplesEnd);
  if (ts === -1 || te === -1 || te < ts) {
    console.error("README markers not found for themes table block");
    process.exit(1);
  }
  if (es === -1 || ee === -1 || ee < es) {
    console.error("README markers not found for themes examples block");
    process.exit(1);
  }

  const rows = readThemes();
  const table = buildTable(rows);
  const examples = buildExamples(rows);

  let next = `${readme.slice(0, ts + tableStart.length)}\n${table}\n${readme.slice(te)}`;
  const es2 = next.indexOf(examplesStart);
  const ee2 = next.indexOf(examplesEnd);
  next = `${next.slice(0, es2 + examplesStart.length)}\n${examples}\n${next.slice(ee2)}`;
  fs.writeFileSync(readmePath, next);
  console.log("Updated README theme table and activation examples from theme metadata.");
}

main();
