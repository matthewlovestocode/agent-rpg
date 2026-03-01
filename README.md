# Agent RPG
Codex agents that immerse in live action roleplaying while working.

## Install

## Clone & Open Project
You will need to clone the repo from a location you can find afterwards.  
Example:
```bash
# Change directory to users home directory
cd ~

# Clone the repo
git clone https://github.com/matthewlovestocode/agent-rpg.git

# Open the directory in visual studio code as a project
code ./agent-rpg
```

## Set CODEX_HOME & Launch Control
In MacOS, an environment variable can be set to change the default codex configuration directory, to the project just cloned, in order to use the modified agents.  
The following sets codex to the new agents, until the variable is unset, or the computer restarted.
```bash
launchctl setenv CODEX_HOME /Users/[your username]/agent-rpg
```
If the codex MacOS app is open, close and restart it.
If the codex MacOS app is closed, start it.
You will need to login to chatgpt again, as the new configuration acts as a new codex setup/session.

## Available Themes
| Category | Theme | File | Style |
|---|---|---|---|
| Core | `default-theme` | `$CODEX_HOME/themes/default-theme.toml` | Live-action RPG / fortress-defense phrasing |
| Fantasy | `lotr-theme` | `$CODEX_HOME/themes/lotr-theme.toml` | Lord of the Rings inspired Middle-earth phrasing |
| Fantasy | `harry-potter-theme` | `$CODEX_HOME/themes/harry-potter-theme.toml` | Wizarding-world tactical collaboration phrasing |
| Fantasy | `got-theme` | `$CODEX_HOME/themes/got-theme.toml` | Great-house strategy and battlefield phrasing |
| Sci-Fi | `star-wars-theme` | `$CODEX_HOME/themes/star-wars-theme.toml` | Galactic strategy and Jedi/fleet command phrasing |
| Sci-Fi | `star-trek-theme` | `$CODEX_HOME/themes/star-trek-theme.toml` | Starfleet bridge protocol and exploration phrasing |
| Sci-Fi | `dune-theme` | `$CODEX_HOME/themes/dune-theme.toml` | Imperial-house strategy and Arrakis campaign phrasing |
| Sci-Fi | `matrix-theme` | `$CODEX_HOME/themes/matrix-theme.toml` | Resistance operation and simulation-break phrasing |
| Superhero | `marvel-dc-theme` | `$CODEX_HOME/themes/marvel-dc-theme.toml` | Superhero command-center style phrasing |
| Action/Spy | `james-bond-theme` | `$CODEX_HOME/themes/james-bond-theme.toml` | MI6 mission-control and espionage phrasing |
| Anime | `aot-theme` | `$CODEX_HOME/themes/aot-theme.toml` | Titan-first aliases with human fallback mappings |
| Anime | `one-piece-theme` | `$CODEX_HOME/themes/one-piece-theme.toml` | Pirate-crew strategy phrasing |
| Anime | `death-note-theme` | `$CODEX_HOME/themes/death-note-theme.toml` | Investigation and deduction phrasing |
| Anime | `vinland-theme` | `$CODEX_HOME/themes/vinland-theme.toml` | Campaign and warband phrasing |
| Mythology | `greek-theme` | `$CODEX_HOME/themes/greek-theme.toml` | Olympian council and heroic quest phrasing |
| Mythology | `norse-theme` | `$CODEX_HOME/themes/norse-theme.toml` | Asgard war-council and rune-reading phrasing |
| Mythology | `roman-theme` | `$CODEX_HOME/themes/roman-theme.toml` | Imperial legion and senate strategy phrasing |
| Mythology | `hindu-theme` | `$CODEX_HOME/themes/hindu-theme.toml` | Dharma-centered strategy and cosmic-balance phrasing |
| Mythology | `shinto-theme` | `$CODEX_HOME/themes/shinto-theme.toml` | Kami-guided shrine protocol and harmony phrasing |
| Mythology | `chinese-myth-theme` | `$CODEX_HOME/themes/chinese-myth-theme.toml` | Celestial court strategy and omen phrasing |
| Mythology | `celtic-theme` | `$CODEX_HOME/themes/celtic-theme.toml` | Clan warband and druid-council phrasing |
| Sports | `ncaa-men-basketball-theme` | `$CODEX_HOME/themes/ncaa-men-basketball-theme.toml` | College hoops game-planning and rotation phrasing |
| Sports | `college-football-theme` | `$CODEX_HOME/themes/college-football-theme.toml` | College football drive scripting and sideline command phrasing |
| Sports | `nfl-theme` | `$CODEX_HOME/themes/nfl-theme.toml` | Pro football matchup analytics and play-calling phrasing |
| Sports | `nba-theme` | `$CODEX_HOME/themes/nba-theme.toml` | Pro basketball pace, spacing, and rotation phrasing |
| Sports | `march-madness-theme` | `$CODEX_HOME/themes/march-madness-theme.toml` | Single-elimination urgency and bracket strategy phrasing |
| Sports | `rivalry-week-theme` | `$CODEX_HOME/themes/rivalry-week-theme.toml` | Rivalry intensity, momentum swings, and field-position phrasing |

## Activate A Theme
Themes are activated per prompt by adding `Theme` (and optional `Theme temperature`) at the top of your request.

`default-theme`:
```text
Theme: default-theme
Theme temperature: high
List the agent roster.
```

`lotr-theme`:
```text
Theme: lotr-theme
Theme temperature: high
Review this PR for security issues.
```

`aot-theme`:
```text
Theme: aot-theme
Theme temperature: high
List the agent roster.
```

`one-piece-theme`:
```text
Theme: one-piece-theme
Theme temperature: high
Plan the implementation as a phased rollout.
```

`death-note-theme`:
```text
Theme: death-note-theme
Theme temperature: high
Review this PR for security issues.
```

`vinland-theme`:
```text
Theme: vinland-theme
Theme temperature: high
Propose a step-by-step migration strategy.
```

`greek-theme`:
```text
Theme: greek-theme
Theme temperature: high
List the agent roster.
```

`norse-theme`:
```text
Theme: norse-theme
Theme temperature: high
Plan a rollout with fallback checkpoints.
```

`roman-theme`:
```text
Theme: roman-theme
Theme temperature: high
Create a phased migration plan.
```

`hindu-theme`:
```text
Theme: hindu-theme
Theme temperature: high
Review this architecture for risks.
```

`shinto-theme`:
```text
Theme: shinto-theme
Theme temperature: high
Summarize next steps and blockers.
```

`chinese-myth-theme`:
```text
Theme: chinese-myth-theme
Theme temperature: high
Draft a validation checklist.
```

`celtic-theme`:
```text
Theme: celtic-theme
Theme temperature: high
Break this project into parallel workstreams.
```

`ncaa-men-basketball-theme`:
```text
Theme: ncaa-men-basketball-theme
Theme temperature: high
List the agent roster.
```

`college-football-theme`:
```text
Theme: college-football-theme
Theme temperature: high
Build a phased execution game plan.
```

`nfl-theme`:
```text
Theme: nfl-theme
Theme temperature: high
Review this implementation for execution risk.
```

`nba-theme`:
```text
Theme: nba-theme
Theme temperature: high
Suggest rotation-style parallel workstreams.
```

`march-madness-theme`:
```text
Theme: march-madness-theme
Theme temperature: high
Prioritize tasks for survive-and-advance delivery.
```

`rivalry-week-theme`:
```text
Theme: rivalry-week-theme
Theme temperature: high
Summarize blockers and momentum shifts.
```

Numeric temperature example:
```text
Theme: lotr-theme
Theme temperature: 0.80
Plan how you would implement OAuth support.
```

## Coordinator And Delegation
Use these docs to keep multi-agent handoffs consistent:

- Handoff template: `docs/handoff-template.md`
- Playbooks:
  - `docs/playbooks/feature-delivery.md`
  - `docs/playbooks/bugfix.md`
  - `docs/playbooks/refactor.md`
  - `docs/playbooks/docs-only.md`
  - `docs/playbooks/security-hotfix.md`

## Alias Framework (All Themes)
Presentation aliases now follow a shared contract across all themes:

- Canonical coverage:
  - Each theme should support the same core alias keys and role keys (including singular/plural role variants).
- Synonym bundles:
  - Optional `[alias_variants]` can provide multiple alternatives for the same concept.
- Temperature-aware alias tiers:
  - Optional `[presentation_aliases_by_temperature.low|medium|high]` can override key phrases by intensity.
- Roster contract:
  - Use `[role_aliases]` so roster output can consistently render as `canonical_id (alias)`.
- Fallback inheritance:
  - `active theme` -> `themes/_category-lexicons.toml` -> `themes/_base-aliases.toml`
- Guardrails:
  - Avoid ambiguous filler wording and banned sexual/non-consensual phrasing in aliases.

Lint command:
```bash
npm run lint:themes
```

Strict mode (warnings fail the check):
```bash
npm run lint:themes:strict
```
