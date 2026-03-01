#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parse as parseToml } from "toml";

type Dict = Record<string, unknown>;

const THEMES_DIR = path.resolve("themes");
const BASE_PATH = path.join(THEMES_DIR, "_base-aliases.toml");
const REQUIRED_HIGH_KEYS = [
  "plan",
  "validate_check",
  "blocked",
  "risk",
  "completed",
  "delegation_start",
  "parallel_fanout",
  "conflict_detected",
  "evidence_request",
  "final_synthesis"
];

if (!fs.existsSync(BASE_PATH)) {
  console.error("ERROR: themes/_base-aliases.toml not found");
  process.exit(2);
}

const base = parseToml(fs.readFileSync(BASE_PATH, "utf8")) as unknown as Dict;
const baseByTemp = ((base.presentation_aliases_by_temperature as Dict) ?? {}) as Dict;
const baseHigh = ((baseByTemp.high as Dict) ?? {}) as Dict;
const basePhrasePacks = ((base.phrase_packs as Dict) ?? {}) as Dict;
const baseVariants = ((base.alias_variants as Dict) ?? {}) as Dict;

let errors = 0;
let warnings = 0;

for (const key of REQUIRED_HIGH_KEYS) {
  if (!(key in baseHigh)) {
    console.log(`ERROR: base high-temperature alias missing key '${key}'`);
    errors++;
  }
}

for (const key of ["openers", "transitions", "confirmations", "risk_calls"]) {
  const v = basePhrasePacks[key];
  if (!Array.isArray(v) || v.length < 2) {
    console.log(`ERROR: base phrase_packs.${key} must contain at least 2 phrases`);
    errors++;
  }
}

for (const key of ["delegation_start", "parallel_fanout", "conflict_detected", "evidence_request", "final_synthesis"]) {
  const v = baseVariants[key];
  if (!Array.isArray(v) || v.length < 2) {
    console.log(`ERROR: base alias_variants.${key} must contain at least 2 variants`);
    errors++;
  }
}

const themeFiles = fs
  .readdirSync(THEMES_DIR)
  .filter((f) => f.endsWith(".toml") && !f.startsWith("_"))
  .sort();

for (const file of themeFiles) {
  const filePath = path.join(THEMES_DIR, file);
  const doc = parseToml(fs.readFileSync(filePath, "utf8")) as unknown as Dict;
  const theme = ((doc.theme as Dict) ?? {}) as Dict;
  const byTemp = ((doc.presentation_aliases_by_temperature as Dict) ?? {}) as Dict;
  const high = Object.keys(byTemp).length > 0 ? (((byTemp.high as Dict) ?? {}) as Dict) : baseHigh;
  const phrasePacks = Object.keys((doc.phrase_packs as Dict) ?? {}).length > 0 ? ((doc.phrase_packs as Dict) ?? {}) as Dict : basePhrasePacks;

  if (theme.default_temperature !== "high") {
    console.log(`WARN:  ${file} default_temperature is not 'high'`);
    warnings++;
  }

  for (const key of REQUIRED_HIGH_KEYS) {
    if (!(key in high)) {
      console.log(`ERROR: ${file} effective high-temperature aliases missing key '${key}'`);
      errors++;
    }
  }

  for (const key of ["openers", "transitions", "confirmations", "risk_calls"]) {
    const v = phrasePacks[key];
    if (!Array.isArray(v) || v.length < 2) {
      console.log(`ERROR: ${file} effective phrase_packs.${key} must contain at least 2 phrases`);
      errors++;
    }
  }

  const roleVoice = ((doc.role_voice as Dict) ?? {}) as Dict;
  if (Object.keys(roleVoice).length === 0) {
    console.log(`WARN:  ${file} has no [role_voice] table (optional, improves immersion)`);
    warnings++;
  }
}

console.log(`\nChecked ${themeFiles.length} theme files. Errors: ${errors}. Warnings: ${warnings}.`);
process.exit(errors > 0 ? 1 : 0);
