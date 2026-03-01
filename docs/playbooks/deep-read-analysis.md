# Deep-Read Analysis Playbook

Use this playbook when coordinator should delegate interpretation/synthesis to `analyzer`.

## When To Use
- Dense context across multiple files.
- Ambiguous behavior where raw discovery is insufficient.
- Conflicting claims requiring a contradiction map before implementation.

## Routing Pattern
1. `explorer` gathers file/fact map when unknowns are high.
2. `analyzer` performs deep-read synthesis and ambiguity reduction.
3. `verifier` arbitrates only if contradictions remain unresolved.

## Dry Run Example
```bash
Execution mode: dry_run
Goal: Build deep-read synthesis for auth flow behavior.
```

Expected outputs:
- Cross-file intent summary
- Contradiction map (if applicable)
- Explicit assumptions and risks
- No file edits

## Apply Example
```bash
Execution mode: apply
Goal: Analyze current behavior and propose scoped implementation path.
```

Expected outputs:
- Evidence-backed synthesis
- Clear recommended next action for implementation agents
- Confidence level with escalation recommendation if low
