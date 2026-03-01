#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parse as parseToml } from "toml";

type ThemeRow = {
  name: string;
  display_name: string;
  category: string;
  default_temperature: string;
  file: string;
};

const themesDir = path.resolve("themes");

function readTheme(filePath: string): ThemeRow | null {
  const parsed = parseToml(fs.readFileSync(filePath, "utf8")) as Record<string, unknown>;
  const theme = (parsed.theme ?? {}) as Record<string, unknown>;
  if (!theme.name || !theme.display_name) return null;
  return {
    name: String(theme.name),
    display_name: String(theme.display_name),
    category: String(theme.category ?? "unknown"),
    default_temperature: String(theme.default_temperature ?? "unknown"),
    file: path.relative(process.cwd(), filePath)
  };
}

const rows = fs
  .readdirSync(themesDir)
  .filter((f) => f.endsWith(".toml") && !f.startsWith("_"))
  .sort()
  .map((f) => readTheme(path.join(themesDir, f)))
  .filter((v): v is ThemeRow => v !== null);

console.log(JSON.stringify(rows, null, 2));
