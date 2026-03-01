# Contributing Guide

## Prerequisites
- Node.js 20+
- npm

Install tooling:
```bash
npm ci
```

## Core Checks
- Theme lint (strict):
```bash
npm run lint:themes:strict
```
- Agent contract checks:
```bash
npm run agents:check
```
- README theme metadata sync:
```bash
npm run readme:check
```
- Full local gate:
```bash
npm run ops:check
```

## Adding A Theme
1. Create a new file in `themes/<key>.toml`.
2. Include required keys:
   - `[theme]`: `name`, `display_name`, `description`, `default_temperature`, `category`
   - `[temperature]`: alias density hints
   - `[role_aliases]`
   - `presentation_aliases`
3. Keep `default_temperature = "high"` unless explicitly justified.
4. Run:
```bash
npm run lint:themes:strict
```
5. Regenerate README metadata sections:
```bash
npm run readme:themes
```
6. Verify sync:
```bash
npm run readme:check
```

## Updating Agents
1. Update the target `agents/*.toml` file(s).
2. Ensure each sub-agent includes:
   - `Required return schema`
   - `Execution mode protocol`
   - confidence escalation guidance
3. Ensure `agents/default.toml` remains the source of coordinator contracts.
4. Run:
```bash
npm run agents:check
```

## Documentation Updates
- Keep references aligned with `docs/handoff-template.md` and `docs/playbooks/*`.
- When theme metadata changes, regenerate README sections with `npm run readme:themes`.

## Pull Request Checklist
- [ ] `npm run ops:check` passes locally
- [ ] New/updated themes include required keys and category
- [ ] README theme table/examples are generated (not hand-edited)
- [ ] Agent contracts remain consistent
