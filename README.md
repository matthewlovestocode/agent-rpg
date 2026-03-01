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
<!-- THEMES_TABLE_START -->
| Category | Theme | File | Style |
|---|---|---|---|
| Core | `live-action-rpg` | `$CODEX_HOME/themes/default-theme.toml` | Fortress-defense flavored narration for coordinator status updates and summaries. |
| Fantasy | `got-theme` | `$CODEX_HOME/themes/got-theme.toml` | Great-house strategy narration mixing battlefield readiness with political caution. |
| Fantasy | `harry-potter-theme` | `$CODEX_HOME/themes/harry-potter-theme.toml` | Wizarding-world narration with house teamwork and magical problem-solving language. |
| Fantasy | `lotr-theme` | `$CODEX_HOME/themes/lotr-theme.toml` | Middle-earth narration style with fellowship and strategy flavored aliases. |
| Sci-Fi | `dune-theme` | `$CODEX_HOME/themes/dune-theme.toml` | Imperial-house strategy narration focused on foresight, discipline, and political maneuvering. |
| Sci-Fi | `matrix-theme` | `$CODEX_HOME/themes/matrix-theme.toml` | Simulation-break narration with operator guidance and resistance mission language. |
| Sci-Fi | `star-trek-theme` | `$CODEX_HOME/themes/star-trek-theme.toml` | Starfleet bridge narration emphasizing protocol, analysis, and exploration. |
| Sci-Fi | `star-wars-theme` | `$CODEX_HOME/themes/star-wars-theme.toml` | Galactic operations narration with Jedi strategy and fleet command phrasing. |
| Superhero | `marvel-dc-theme` | `$CODEX_HOME/themes/marvel-dc-theme.toml` | Superhero command-center narration with league-style coordination and mission framing. |
| Action/Spy | `james-bond-theme` | `$CODEX_HOME/themes/james-bond-theme.toml` | MI6 mission-control narration with espionage, precision, and field-operation terminology. |
| Anime | `aot-theme` | `$CODEX_HOME/themes/aot-theme.toml` | Titan-forward narration style with human fallback roles once titan slots are exhausted. |
| Anime | `death-note-theme` | `$CODEX_HOME/themes/death-note-theme.toml` | Investigation-and-countermove narration style centered on deduction, surveillance, and strategic pressure. |
| Anime | `one-piece-theme` | `$CODEX_HOME/themes/one-piece-theme.toml` | Grand Line adventure narration with crew-based role aliases and tactical pirate phrasing. |
| Anime | `vinland-theme` | `$CODEX_HOME/themes/vinland-theme.toml` | Norse campaign narration balancing warfare, discipline, and long-term strategy. |
| Mythology | `celtic-theme` | `$CODEX_HOME/themes/celtic-theme.toml` | Clan-warband narration with druid counsel, omen reading, and frontier strategy. |
| Mythology | `chinese-myth-theme` | `$CODEX_HOME/themes/chinese-myth-theme.toml` | Celestial-court narration blending strategic discipline, omens, and martial resolve. |
| Mythology | `greek-theme` | `$CODEX_HOME/themes/greek-theme.toml` | Olympian council narration with heroic quest framing and tactical omens. |
| Mythology | `hindu-theme` | `$CODEX_HOME/themes/hindu-theme.toml` | Dharma-centered narration with disciplined strategy and cosmic-balance framing. |
| Mythology | `norse-theme` | `$CODEX_HOME/themes/norse-theme.toml` | Asgard war-council narration with runic signals and battlefield resolve. |
| Mythology | `roman-theme` | `$CODEX_HOME/themes/roman-theme.toml` | Imperial-legion narration with senate-level review and disciplined execution. |
| Mythology | `shinto-theme` | `$CODEX_HOME/themes/shinto-theme.toml` | Kami-guided narration with shrine protocol, harmony, and purification language. |
| Sports | `college-football-theme` | `$CODEX_HOME/themes/college-football-theme.toml` | Sideline command narration with drive planning, personnel packages, and field-position strategy. |
| Sports | `march-madness-theme` | `$CODEX_HOME/themes/march-madness-theme.toml` | Single-elimination tournament narration with upset awareness and survive-and-advance urgency. |
| Sports | `nba-theme` | `$CODEX_HOME/themes/nba-theme.toml` | Pro basketball operations narration with pace, spacing, and rotation optimization language. |
| Sports | `ncaa-men-basketball-theme` | `$CODEX_HOME/themes/ncaa-men-basketball-theme.toml` | College hoops game-plan narration with scouting, rotations, and tournament urgency. |
| Sports | `nfl-theme` | `$CODEX_HOME/themes/nfl-theme.toml` | Pro football operations narration with matchup analytics and situational play-calling. |
| Sports | `rivalry-week-theme` | `$CODEX_HOME/themes/rivalry-week-theme.toml` | High-intensity rivalry narration with momentum swings, field-position battles, and decisive execution. |
<!-- THEMES_TABLE_END -->

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
