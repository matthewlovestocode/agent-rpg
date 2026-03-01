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
- `default-theme` (`$CODEX_HOME/themes/default-theme.toml`)
  - Live-action RPG / fortress-defense style phrasing.
- `lotr-theme` (`$CODEX_HOME/themes/lotr-theme.toml`)
  - Lord of the Rings inspired Middle-earth phrasing.
- `aot-theme` (`$CODEX_HOME/themes/aot-theme.toml`)
  - Attack on Titan inspired style with Titan-first aliases and human fallback mappings.
- `one-piece-theme` (`$CODEX_HOME/themes/one-piece-theme.toml`)
  - One Piece inspired pirate-crew strategy phrasing.
- `death-note-theme` (`$CODEX_HOME/themes/death-note-theme.toml`)
  - Death Note inspired investigation and deduction phrasing.
- `vinland-theme` (`$CODEX_HOME/themes/vinland-theme.toml`)
  - Vinland Saga inspired campaign and warband phrasing.

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
