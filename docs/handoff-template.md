# Coordinator Handoff Template

Use this payload when delegating tasks to sub-agents.

```text
goal: <clear expected outcome>
scope:
  in: <what is included>
  out: <what is excluded>
files:
  - <path or area>
  - <path or area>
constraints:
  - <safety/style constraint>
  - <non-goal>
execution_mode: dry_run|apply
done_criteria:
  - <objective completion condition>
  - <objective completion condition>
return_format:
  status: completed|blocked|failed
  summary: concise result statement
  changes: files/areas touched or inspected
  evidence: commands, outputs, and references
  risks: residual risks or regressions
  next_action: recommended follow-up
  confidence: high|medium|low
```

## Notes
- Keep handoffs scoped and concrete.
- Prefer one primary owner agent per subtask.
- Add support agents only when they increase confidence.

## Repo Prep Handoff Snippet
Use this when delegating `repo_prep` for ops scaffolding.

```text
goal: Create missing ops scaffolding only.
scope:
  in:
    - ops/agents/**
  out:
    - product source files
files:
  - ops/
  - ops/agents/
  - ops/agents/state/events.jsonl
constraints:
  - create-only-if-missing
  - no overwrite without explicit approval
  - enforce JSONL fields: ts,event,task_id,agent,schema_version,meta
execution_mode: dry_run|apply
done_criteria:
  - required ops scaffold profile exists
  - created vs skipped paths listed
  - conflicts are explicitly listed
return_format:
  status: completed|blocked|failed
  summary: concise result statement
  changes: files/areas touched or inspected
  evidence: commands, outputs, and references
  risks: residual risks or regressions
  next_action: recommended follow-up
  confidence: high|medium|low
  handoff_trace: goal/scope/files/constraints/done_criteria honored or mismatch
```

## Analyzer Handoff Snippet
Use this when delegating deep-read interpretation/synthesis to `analyzer`.

```text
goal: Produce deep-read synthesis and ambiguity reduction before implementation.
scope:
  in:
    - selected code/config/docs paths
  out:
    - implementation changes unless explicitly requested
files:
  - <target files/directories>
constraints:
  - evidence-backed interpretation only
  - no scope expansion without coordinator approval
  - call out contradictions explicitly
execution_mode: dry_run|apply
done_criteria:
  - cross-file intent summary produced
  - contradiction map produced (if conflicts exist)
  - assumptions and risks explicitly listed
return_format:
  status: completed|blocked|failed
  summary: concise result statement
  changes: files/areas touched or inspected
  evidence: commands, outputs, and references
  risks: residual risks or regressions
  next_action: recommended follow-up
  confidence: high|medium|low
```
