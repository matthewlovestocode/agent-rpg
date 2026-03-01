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
  - `ops/agents/logs/`
  - `ops/agents/state/events.jsonl`
  - `ops/agents/logs/default.jsonl`
  - `ops/agents/logs/analyzer.jsonl`
  - `ops/agents/logs/explorer.jsonl`
  - `ops/agents/logs/repo_prep.jsonl`
  - `ops/agents/logs/worker.jsonl`
  - `ops/agents/logs/senior_dev.jsonl`
  - `ops/agents/logs/reviewer.jsonl`
  - `ops/agents/logs/verifier.jsonl`
  - `ops/agents/logs/tester.jsonl`
  - `ops/agents/logs/security_reviewer.jsonl`
  - `ops/agents/logs/performance_reviewer.jsonl`
  - `ops/agents/logs/documentation.jsonl`
- preserves existing files
- validates existing JSONL lines and reports conflicts

## Handoff Trace Example
```text
handoff_trace: goal/scope/files/constraints/done_criteria honored; scaffold profile exists; created/skipped/conflicts reported.
```
