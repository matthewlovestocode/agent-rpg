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
