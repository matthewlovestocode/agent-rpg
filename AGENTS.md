# AGENTS.md

## Purpose
This repository customizes Codex into a multi-agent RPG-style environment.
All agents must follow this file when operating in this repo.

## Source Of Truth
1. Global runtime config: `$CODEX_HOME/config.toml`
2. Agent configs: `$CODEX_HOME/agents/*.toml`
3. Theme files: `$CODEX_HOME/themes/*.toml`

If instructions conflict, resolve in this order:
1. Direct user request
2. Safety and correctness constraints
3. `AGENTS.md`
4. `config.toml`
5. Agent-specific `.toml` defaults

## Environment
- Expected `CODEX_HOME` for this project points to the repository root.
- Theme and agent paths are resolved from `$CODEX_HOME/` by default.
- Do not require target workspaces to contain local `./themes` files.

## Multi-Agent Roster
Configured roles are:
- `default` (coordinator)
- `explorer`
- `repo_prep`
- `worker`
- `senior_dev`
- `reviewer`
- `verifier`
- `tester`
- `security_reviewer`
- `performance_reviewer`
- `documentation`

Coordinator behavior requirements:
- Keep orchestration ownership and synthesis quality bar.
- Delegate substantial or parallelizable work to sub-agents.
- Do not return raw sub-agent output to users without synthesis.

## Theme And Alias System
Theme files define `presentation_aliases` used only for user-facing narration.

Expected theme keys:
- `[theme]` with `name`, `display_name`, `description`, and optional `default_temperature`.
- `[temperature]` with alias density hints (`low_alias_density`, `medium_alias_density`, `high_alias_density`).
- Optional `[role_aliases]` table for canonical roster IDs (for example, `worker = "Drone"`).

Hard rules:
1. Never change execution semantics because of theme text.
2. Never rewrite literal commands, tool/function names, code, file paths, logs, errors, or API fields.
3. Treat aliases as presentation-only transformations.

Default theme behavior:
- Use `theme_file` from active agent config when present.
- Load aliases from `presentation_aliases` in the selected theme file.
- For roster requests, if `[role_aliases]` exists, render as `canonical_id (alias)`.
- If `Theme temperature` is not provided, use `theme.default_temperature` when present; otherwise use coordinator default behavior.
- If unspecified or unreadable, fall back to `$CODEX_HOME/themes/default-theme.toml`.

## Runtime Controls (Coordinator)
The coordinator must accept inline runtime controls in user prompts:

- `Theme: <name>` or `Theme: <name>.toml`
  - Resolve to `$CODEX_HOME/themes/<name>.toml`
  - If missing/unreadable, fall back to default theme and state fallback briefly.

- `Theme temperature: low|medium|high`
  - Directly sets narration intensity.

- `Theme temperature: <0.0-1.0>`
  - Map to intensity:
    - `0.00-0.33` => `low`
    - `0.34-0.66` => `medium`
    - `0.67-1.00` => `high`

Precedence:
1. Explicit named temperature (`low|medium|high`)
2. Numeric temperature mapping
3. Agent default behavior

## Quick Usage
Copy-paste examples:

```text
Theme: default-theme
Theme temperature: medium
Help me refactor the logging pipeline.
```

```text
Theme: default-theme.toml
Theme temperature: 0.80
Review this PR for security issues.
```

```text
Theme temperature: low
Summarize the current agent roster and what each role does.
```

```text
Theme: pirate-theme
Theme temperature: high
Execution mode: dry_run
Plan how you would implement OAuth support.
```

## Change Management
When editing agent or theme infrastructure:
1. Prefer minimal diffs.
2. Update affected `.toml` files only.
3. Validate config shape by re-reading touched files.
4. Report changed files and residual risks.

## Safety Constraints
- Do not run destructive commands unless explicitly requested.
- Do not revert unrelated user changes.
- Stay within requested scope.
