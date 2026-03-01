#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
import tomllib

CANONICAL_ROLES = [
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
    "documentation",
]

REQUIRED_ALIAS_KEYS = [
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
]

BANNED_PATTERNS = [
    re.compile(r"\bnon[- ]?consen", re.I),
    re.compile(r"\bsexual\b", re.I),
    re.compile(r"\berotic\b", re.I),
    re.compile(r"\bfetish\b", re.I),
]

AMBIGUOUS_PATTERNS = [
    re.compile(r"\bstuff\b", re.I),
    re.compile(r"\bthing\b", re.I),
    re.compile(r"\bsomehow\b", re.I),
]


def parse_alias_block(block: str) -> dict[str, str]:
    out: dict[str, str] = {}
    for raw in block.splitlines():
        line = raw.strip()
        if not line.startswith("- "):
            continue
        m = re.match(r'-\s+"([^"]+)"\s*->\s*"([^"]*)"(?:\s*\|\s*"[^"]*")*\s*$', line)
        if not m:
            continue
        out[m.group(1)] = m.group(2)
    return out


def load_toml(path: Path) -> dict:
    with path.open("rb") as f:
        return tomllib.load(f)


def find_first_key(data: dict, key: str):
    if key in data:
        return data[key]
    for value in data.values():
        if isinstance(value, dict):
            found = find_first_key(value, key)
            if found is not None:
                return found
    return None


def lint_theme(path: Path, base_roles: dict[str, str], base_aliases: dict[str, str], strict: bool) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []

    data = load_toml(path)
    theme = data.get("theme", {})
    roles = data.get("role_aliases", {})
    alias_block = find_first_key(data, "presentation_aliases") or ""
    aliases = parse_alias_block(alias_block)

    for key in ["name", "display_name", "description", "default_temperature"]:
        if key not in theme:
            errors.append(f"missing [theme].{key}")

    if theme.get("default_temperature") != "high":
        warnings.append("default_temperature is not 'high'")

    for role in CANONICAL_ROLES:
        if role not in roles and role not in base_roles:
            errors.append(f"missing role_aliases.{role} (and no base fallback)")

    for key in REQUIRED_ALIAS_KEYS:
        if key not in aliases and key not in base_aliases:
            errors.append(f"missing presentation alias key '{key}' (and no base fallback)")

    # Optional temperature-aware tier validation
    by_temp = data.get("presentation_aliases_by_temperature", {})
    if by_temp:
        for level in ["low", "medium", "high"]:
            if level not in by_temp:
                errors.append(f"missing presentation_aliases_by_temperature.{level}")
                continue
            if not isinstance(by_temp[level], dict):
                errors.append(f"presentation_aliases_by_temperature.{level} must be a table")
                continue
            for key in ["plan", "validate/check", "blocked", "risk", "completed"]:
                if key not in by_temp[level]:
                    warnings.append(f"{level} tier missing key '{key}'")

    alias_text = "\n".join([alias_block] + [str(v) for v in roles.values()])
    for pat in BANNED_PATTERNS:
        if pat.search(alias_text):
            errors.append(f"contains banned phrase matching /{pat.pattern}/")
    for pat in AMBIGUOUS_PATTERNS:
        if pat.search(alias_text):
            warnings.append(f"contains ambiguous phrasing matching /{pat.pattern}/")

    # Optional synonym bundle checks
    variants = data.get("alias_variants", {})
    if variants:
        for key, values in variants.items():
            if not isinstance(values, list) or len(values) < 2:
                warnings.append(f"alias_variants.{key} should contain at least 2 variants")

    if strict and warnings:
        errors.extend([f"(strict) {w}" for w in warnings])

    return errors, warnings


def main() -> int:
    parser = argparse.ArgumentParser(description="Lint theme alias coverage and quality")
    parser.add_argument("--strict", action="store_true", help="Treat warnings as errors")
    parser.add_argument("--themes-dir", default="themes", help="Theme directory")
    args = parser.parse_args()

    themes_dir = Path(args.themes_dir)
    base_path = themes_dir / "_base-aliases.toml"
    if not base_path.exists():
        print("ERROR: themes/_base-aliases.toml is required", file=sys.stderr)
        return 2

    base = load_toml(base_path)
    base_roles = base.get("role_aliases", {})
    base_aliases = parse_alias_block(find_first_key(base, "presentation_aliases") or "")

    theme_files = sorted(p for p in themes_dir.glob("*.toml") if not p.name.startswith("_"))
    total_errors = 0
    total_warnings = 0

    for path in theme_files:
        errors, warnings = lint_theme(path, base_roles, base_aliases, args.strict)
        if errors or warnings:
            print(f"\n{path}:")
        for e in errors:
            print(f"  ERROR: {e}")
        for w in warnings:
            print(f"  WARN:  {w}")
        total_errors += len(errors)
        total_warnings += len(warnings)

    print(f"\nChecked {len(theme_files)} theme files. Errors: {total_errors}. Warnings: {total_warnings}.")
    return 1 if total_errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
