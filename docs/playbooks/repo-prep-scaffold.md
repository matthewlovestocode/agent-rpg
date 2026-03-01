# Repo Prep Scaffold Playbook

Use this flow when coordinator delegates idempotent ops scaffolding to `repo_prep`.

## Dry Run
```bash
npm run repo-prep:scaffold:dry-run -- --root .
```

Expected outcome:
- JSON output with `created`, `skipped`, `conflicts`
- no file mutations
- paths reported relative to the selected root

## Apply
```bash
npm run repo-prep:scaffold:apply -- --root .
```

Expected outcome:
- creates only missing scaffold items:
  - `ops/`
  - `ops/agents/`
  - `ops/agents/state/`
  - `ops/agents/state/events.jsonl`
- preserves existing files
- validates existing JSONL lines and reports conflicts

## Handoff Trace Example
```text
handoff_trace: goal/scope/files/constraints/done_criteria honored; scaffold profile exists; created/skipped/conflicts reported.
```
