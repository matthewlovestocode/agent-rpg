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

## Delegation Matrix
Use this routing matrix as the coordinator default unless user intent requires otherwise.

| Task pattern | Primary agent | Common supporting agents |
|---|---|---|
| Repo/file discovery, impact mapping, unknowns | `explorer` | `repo_prep` |
| Environment setup, dependency/toolchain readiness | `repo_prep` | `explorer` |
| Scoped implementation | `worker` | `tester`, `verifier` |
| Complex or architecture-sensitive implementation | `senior_dev` | `reviewer`, `tester`, `verifier` |
| Code review and regression risk triage | `reviewer` | `security_reviewer`, `performance_reviewer` |
| Acceptance criteria verification | `verifier` | `tester` |
| Test planning/execution and gap identification | `tester` | `worker`, `senior_dev` |
| Security analysis and mitigation guidance | `security_reviewer` | `reviewer`, `verifier` |
| Performance bottleneck/risk analysis | `performance_reviewer` | `reviewer`, `tester` |
| Documentation and usage updates | `documentation` | `worker`, `reviewer` |

Routing rules:
1. Delegate to one primary agent per subtask.
2. Add support agents only when they materially increase confidence.
3. Prefer parallel delegation for independent subtasks.
4. Keep ownership of final synthesis and user-facing delivery in coordinator.

## Theme And Alias System
Theme files define `presentation_aliases` used only for user-facing narration.

Expected theme keys:
- `[theme]` with `name`, `display_name`, `description`, and optional `default_temperature`.
- `[temperature]` with alias density hints (`low_alias_density`, `medium_alias_density`, `high_alias_density`).
- `[role_aliases]` table for canonical roster IDs (for example, `worker = "Drone"`).
- Optional `[alias_variants]` table where each key maps to a list of alternate phrasings.
- Optional `[presentation_aliases_by_temperature.low|medium|high]` tables for key-specific tone variants.

Required alias keys (directly in theme or inherited fallback):
- `spawn worker agents`
- All agent-role singular/plural keys:
  - `worker agent`, `worker agents`
  - `explorer agent`, `explorer agents`
  - `repo_prep agent`, `repo_prep agents`
  - `senior_dev agent`, `senior_dev agents`
  - `reviewer agent`, `reviewer agents`
  - `verifier agent`, `verifier agents`
  - `tester agent`, `tester agents`
  - `security_reviewer agent`, `security_reviewer agents`
  - `performance_reviewer agent`, `performance_reviewer agents`
  - `documentation agent`, `documentation agents`
- Core narration keys: `coordinator`, `delegate task`, `plan`, `validate/check`, `blocked`, `risk`, `completed`

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
- Alias inheritance order:
  1. Active theme file
  2. Category lexicon in `$CODEX_HOME/themes/_category-lexicons.toml` using `theme.category`
  3. `$CODEX_HOME/themes/_base-aliases.toml`
- Themes should avoid ambiguous filler language and banned sexual/non-consensual phrasing.

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
5. Run `python3 scripts/lint_theme_aliases.py` before finalizing theme changes.

## Safety Constraints
- Do not run destructive commands unless explicitly requested.
- Do not revert unrelated user changes.
- Stay within requested scope.
