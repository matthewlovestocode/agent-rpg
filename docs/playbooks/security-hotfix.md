# Playbook: Security Hotfix

## Routing
1. security_reviewer
2. worker or senior_dev
3. tester
4. verifier
5. reviewer (optional for risk triage)

## Minimal handoff sequence
1. security_reviewer: identify exploit path + mitigation
2. implementation agent: apply minimal-risk fix
3. tester: run focused regression/security checks
4. verifier: confirm mitigation and acceptance criteria
5. reviewer: triage residual risk (optional)

## Exit gates
- Exploit path mitigated
- Security impact documented
- Follow-up hardening/backport actions listed
