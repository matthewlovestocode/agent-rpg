#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parse as parseToml } from "toml";

type Dict = Record<string, unknown>;

const themesDir = path.resolve("themes");
const lexiconsPath = path.join(themesDir, "_category-lexicons.toml");

if (!fs.existsSync(lexiconsPath)) {
  console.error("ERROR: themes/_category-lexicons.toml not found");
  process.exit(2);
}

const lexicons = parseToml(fs.readFileSync(lexiconsPath, "utf8")) as Dict;
const validCategories = new Set(Object.keys(lexicons));

let errors = 0;
const files = fs.readdirSync(themesDir).filter((f) => f.endsWith(".toml") && !f.startsWith("_")).sort();

for (const file of files) {
  const p = path.join(themesDir, file);
  let parsed: Dict;
  try {
    parsed = parseToml(fs.readFileSync(p, "utf8")) as Dict;
  } catch (err) {
    console.log(`\n${path.relative(process.cwd(), p)}:`);
    console.log(`  ERROR: invalid TOML: ${(err as Error).message}`);
    errors++;
    continue;
  }

  const theme = (parsed.theme ?? {}) as Dict;
  const category = String(theme.category ?? "").trim();
  if (!category) {
    console.log(`\n${path.relative(process.cwd(), p)}:`);
    console.log("  ERROR: missing [theme].category");
    errors++;
    continue;
  }

  if (!validCategories.has(category)) {
    console.log(`\n${path.relative(process.cwd(), p)}:`);
    console.log(`  ERROR: unknown category '${category}' (not in _category-lexicons.toml)`);
    errors++;
  }
}

console.log(`\nChecked ${files.length} theme files. Errors: ${errors}.`);
process.exit(errors > 0 ? 1 : 0);
