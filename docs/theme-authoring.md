# Theme Authoring Guide

This guide defines how to add or update themes safely and consistently.

## Required Theme Structure
Every `themes/<key>.toml` should include:

- `[theme]`
  - `name`
  - `display_name`
  - `description`
  - `default_temperature` (default convention: `"high"`)
  - `category` (must map to `_category-lexicons.toml`)
- `[temperature]`
  - `low_alias_density`
  - `medium_alias_density`
  - `high_alias_density`
- `[role_aliases]`
  - Must cover canonical roster roles
- `presentation_aliases`
  - Required canonical alias keys (directly or via fallback)

## Canonical Coverage Expectations
Keep these alias concepts available (theme or fallback):

- Spawn/delegation lifecycle: `spawn worker agents`, `delegate task`, `plan`, `validate/check`, `blocked`, `risk`, `completed`
- Role phrases for singular/plural variants:
  - worker, explorer, repo_prep, senior_dev, reviewer, verifier, tester, security_reviewer, performance_reviewer, documentation

## Category Mapping
Set `theme.category` to one of the supported categories:

- `core`
- `fantasy`
- `sci_fi`
- `superhero`
- `action_spy`
- `anime`
- `mythology`
- `sports`

Category lexicon fallback is sourced from:
- `themes/_category-lexicons.toml`

## Safety And Quality
Avoid:
- ambiguous filler language (for example: “thing”, “stuff”, “somehow”)
- sexual/non-consensual phrasing

Keep aliases:
- presentation-only (never execution semantics)
- consistent with the theme voice
- concise and understandable

## Authoring Workflow
1. Create or edit a theme file in `themes/`.
2. Run strict lint:
```bash
npm run lint:themes:strict
```
3. Regenerate README theme sections:
```bash
npm run readme:themes
```
4. Verify README is synced:
```bash
npm run readme:check
```
5. Run full checks:
```bash
npm run ops:check
```

## Useful Commands
- List theme metadata:
```bash
npm run list:themes
```
- Local autofix baseline (non-strict):
```bash
npm run ops:fix
```
