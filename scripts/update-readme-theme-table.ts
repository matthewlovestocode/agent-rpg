#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parse as parseToml } from "toml";

type ThemeRow = {
  theme: string;
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
      const category = String(theme.category ?? "core");
      const description = String(theme.description ?? "");
      return {
        theme: name,
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
    return a.theme.localeCompare(b.theme);
  });

  const lines = [
    "| Category | Theme | File | Style |",
    "|---|---|---|---|"
  ];

  for (const row of sorted) {
    const cat = CATEGORY_LABEL[row.category] ?? row.category;
    lines.push(`| ${cat} | \`${row.theme}\` | \`${row.file}\` | ${row.description} |`);
  }

  return lines.join("\n");
}

function main() {
  const readmePath = path.resolve("README.md");
  const start = "<!-- THEMES_TABLE_START -->";
  const end = "<!-- THEMES_TABLE_END -->";
  const readme = fs.readFileSync(readmePath, "utf8");

  const s = readme.indexOf(start);
  const e = readme.indexOf(end);
  if (s === -1 || e === -1 || e < s) {
    console.error("README markers not found for theme table block");
    process.exit(1);
  }

  const table = buildTable(readThemes());
  const next = `${readme.slice(0, s + start.length)}\n${table}\n${readme.slice(e)}`;
  fs.writeFileSync(readmePath, next);
  console.log("Updated README theme table from theme metadata.");
}

main();
