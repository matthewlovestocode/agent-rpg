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
