# Playbook: Bugfix

## Routing
1. explorer
2. worker
3. tester
4. verifier

## Minimal handoff sequence
1. explorer: isolate repro and impacted surface
2. worker: implement minimal fix
3. tester: run focused repro + regression checks
4. verifier: confirm fix and no obvious regressions

## Exit gates
- Repro is resolved
- Regression risk acknowledged
- Follow-up hardening tasks noted (if needed)
