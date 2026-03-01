#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { parse as parseToml } from "toml";

type Dict = Record<string, unknown>;

const CANONICAL_ROLES = [
  "default",
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

const REQUIRED_ALIAS_KEYS = [
  "spawn worker agents",
  "worker agent",
  "worker agents",
  "explorer agent",
  "explorer agents",
  "repo_prep agent",
  "repo_prep agents",
  "senior_dev agent",
  "senior_dev agents",
  "reviewer agent",
  "reviewer agents",
  "verifier agent",
  "verifier agents",
  "tester agent",
  "tester agents",
  "security_reviewer agent",
  "security_reviewer agents",
  "performance_reviewer agent",
  "performance_reviewer agents",
  "documentation agent",
  "documentation agents",
  "coordinator",
  "delegate task",
  "plan",
  "validate/check",
  "blocked",
  "risk",
  "completed",
  "delegation_start",
  "parallel_fanout",
  "conflict_detected",
  "evidence_request",
  "final_synthesis"
];

const BANNED_PATTERNS = [/\bnon[- ]?consen/i, /\bsexual\b/i, /\berotic\b/i, /\bfetish\b/i];
const AMBIGUOUS_PATTERNS = [/\bstuff\b/i, /\bthing\b/i, /\bsomehow\b/i];

function parseArgs(argv: string[]) {
  const strict = argv.includes("--strict");
  const themesDirIndex = argv.findIndex((a) => a === "--themes-dir");
  const themesDir = themesDirIndex >= 0 ? argv[themesDirIndex + 1] : "themes";
  return { strict, themesDir };
}

function loadToml(filePath: string): Dict {
  return parseToml(fs.readFileSync(filePath, "utf8")) as unknown as Dict;
}

function findFirstKey(data: unknown, key: string): unknown {
  if (!data || typeof data !== "object") return undefined;
  const obj = data as Dict;
  if (key in obj) return obj[key];
  for (const value of Object.values(obj)) {
    if (value && typeof value === "object") {
      const found = findFirstKey(value, key);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}

function parseAliasBlock(block: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const raw of block.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line.startsWith("- ")) continue;
    const m = line.match(/^\-\s+"([^"]+)"\s*->\s*"([^"]*)"(?:\s*\|\s*"[^"]*")*\s*$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

function lintTheme(
  filePath: string,
  baseRoles: Dict,
  baseAliases: Record<string, string>,
  baseByTemp: Dict,
  baseVariants: Dict,
  basePhrasePacks: Dict,
  strict: boolean
) {
  const errors: string[] = [];
  const warnings: string[] = [];

  const data = loadToml(filePath);
  const theme = ((data.theme as Dict) ?? {}) as Dict;
  const roles = ((data.role_aliases as Dict) ?? {}) as Dict;
  const aliasBlock = String(findFirstKey(data, "presentation_aliases") ?? "");
  const aliases = parseAliasBlock(aliasBlock);

  for (const key of ["name", "display_name", "description", "default_temperature", "category"]) {
    if (!(key in theme)) errors.push(`missing [theme].${key}`);
  }

  if (theme.default_temperature !== "high") {
    warnings.push("default_temperature is not 'high'");
  }

  for (const role of CANONICAL_ROLES) {
    if (!(role in roles) && !(role in baseRoles)) {
      errors.push(`missing role_aliases.${role} (and no base fallback)`);
    }
  }

  for (const key of REQUIRED_ALIAS_KEYS) {
    if (!(key in aliases) && !(key in baseAliases)) {
      errors.push(`missing presentation alias key '${key}' (and no base fallback)`);
    }
  }

  const byTemp = (data.presentation_aliases_by_temperature as Dict) ?? {};
  const effectiveByTemp = Object.keys(byTemp).length > 0 ? byTemp : baseByTemp;
  if (Object.keys(effectiveByTemp).length > 0) {
    for (const level of ["low", "medium", "high"]) {
      if (!(level in effectiveByTemp)) {
        errors.push(`missing effective presentation_aliases_by_temperature.${level}`);
        continue;
      }
      const levelObj = effectiveByTemp[level];
      if (!levelObj || typeof levelObj !== "object") {
        errors.push(`effective presentation_aliases_by_temperature.${level} must be a table`);
        continue;
      }
      const table = levelObj as Dict;
      for (const key of [
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
      ]) {
        if (!(key in table)) warnings.push(`${level} tier missing key '${key}'`);
      }
    }
  }

  const aliasText = `${aliasBlock}\n${Object.values(roles).join("\n")}`;
  for (const pat of BANNED_PATTERNS) {
    if (pat.test(aliasText)) errors.push(`contains banned phrase matching /${pat.source}/`);
  }
  for (const pat of AMBIGUOUS_PATTERNS) {
    if (pat.test(aliasText)) warnings.push(`contains ambiguous phrasing matching /${pat.source}/`);
  }

  const variants = (data.alias_variants as Dict) ?? {};
  const effectiveVariants = Object.keys(variants).length > 0 ? variants : baseVariants;
  if (Object.keys(effectiveVariants).length > 0) {
    for (const key of ["delegation_start", "parallel_fanout", "conflict_detected", "evidence_request", "final_synthesis"]) {
      if (!(key in effectiveVariants)) warnings.push(`alias_variants.${key} is recommended for immersion diversity`);
    }
  }

  if (Object.keys(variants).length > 0) {
    for (const [key, values] of Object.entries(variants)) {
      if (!Array.isArray(values) || values.length < 2) {
        warnings.push(`alias_variants.${key} should contain at least 2 variants`);
      }
    }
  }

  const phrasePacks = (data.phrase_packs as Dict) ?? {};
  const effectivePhrasePacks = Object.keys(phrasePacks).length > 0 ? phrasePacks : basePhrasePacks;
  if (Object.keys(effectivePhrasePacks).length > 0) {
    for (const key of ["openers", "transitions", "confirmations", "risk_calls"]) {
      const v = effectivePhrasePacks[key];
      if (!Array.isArray(v) || v.length < 2) {
        warnings.push(`effective phrase_packs.${key} should contain at least 2 phrases`);
      }
    }
  } else {
    warnings.push("phrase_packs missing in both theme and base aliases (recommended for immersion)");
  }

  if (strict && warnings.length > 0) {
    for (const warning of warnings) errors.push(`(strict) ${warning}`);
  }

  return { errors, warnings };
}

function main() {
  const { strict, themesDir } = parseArgs(process.argv.slice(2));
  const themesPath = path.resolve(themesDir);
  const basePath = path.join(themesPath, "_base-aliases.toml");

  if (!fs.existsSync(basePath)) {
    console.error("ERROR: themes/_base-aliases.toml is required");
    process.exit(2);
  }

  const base = loadToml(basePath);
  const baseRoles = ((base.role_aliases as Dict) ?? {}) as Dict;
  const baseAliases = parseAliasBlock(String(findFirstKey(base, "presentation_aliases") ?? ""));
  const baseByTemp = ((base.presentation_aliases_by_temperature as Dict) ?? {}) as Dict;
  const baseVariants = ((base.alias_variants as Dict) ?? {}) as Dict;
  const basePhrasePacks = ((base.phrase_packs as Dict) ?? {}) as Dict;

  const themeFiles = fs
    .readdirSync(themesPath)
    .filter((f) => f.endsWith(".toml") && !f.startsWith("_"))
    .sort()
    .map((f) => path.join(themesPath, f));

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const filePath of themeFiles) {
    const { errors, warnings } = lintTheme(filePath, baseRoles, baseAliases, baseByTemp, baseVariants, basePhrasePacks, strict);
    if (errors.length || warnings.length) {
      console.log(`\n${path.relative(process.cwd(), filePath)}:`);
    }
    for (const e of errors) console.log(`  ERROR: ${e}`);
    for (const w of warnings) console.log(`  WARN:  ${w}`);
    totalErrors += errors.length;
    totalWarnings += warnings.length;
  }

  console.log(`\nChecked ${themeFiles.length} theme files. Errors: ${totalErrors}. Warnings: ${totalWarnings}.`);
  process.exit(totalErrors > 0 ? 1 : 0);
}

main();
