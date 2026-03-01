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

Numeric temperature example:
```text
Theme: lotr-theme
Theme temperature: 0.80
Plan how you would implement OAuth support.
```
