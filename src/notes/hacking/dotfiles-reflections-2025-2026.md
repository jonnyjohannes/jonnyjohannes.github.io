---
publish: true
tags:
  - dotfiles
source: j2
title: 'Dotfiles Repository Evolution Timeline (Continuation: 2025-2026)'
layout: layouts/note.njk
created_at: '2026-08-19T01:30:47.755Z'
updated_at: '2026-08-19T01:30:47.755Z'
---
J2: continuation of the dotfiles reflection. pick up from the August 2025 endpoint and follow the repository through the current `HEAD`, with particular attention to the shift from editor-integrated AI toward agent-oriented terminal workflows.

# Dotfiles Repository Evolution Timeline (Continuation: 2025-2026)

The previous reflection ended with a modern Neovim-centered workstation: LazyVim, Mason, DAP, mise, Alacritty, tmux, and the first signs of AI-assisted development.

The next phase is less about adding another tool and more about making the tools cooperate. The repository gradually moves the center of gravity out of individual applications and into the workflow around them: project sessions, pickers, pane state, keymaps, and eventually agent state.

This continuation covers **119 commits from August 22, 2025 through July 29, 2026**. The repository reaches **386 total commits**. Across the continuation, **35 tracked files changed**, with approximately **1,649 lines added and 619 removed**. The largest changes are not package upgrades; they are reorganizations of Neovim and tmux around a more deliberate interaction model.

## Late 2025: from a configured editor to a composed workflow

### August 2025 — tmux becomes the project switchboard

The period immediately after the previous reflection is dominated by tmux launcher experiments:

- `tmux-layoutizer` is reworked, renamed, and then replaced by a simpler session launcher.
- Session switching becomes more stable and more visually legible through colored session labels.
- The launcher discovers both active tmux sessions and project directories under `$HOME/src`.
- The `tmux-session-launcher.sh` script becomes a more important piece of the workstation than the old collection of one-off helpers.
- The session picker gains cleaner search and copy-mode behavior, while tmux keeps the Vim-like navigation established earlier.

This is an important change in scope. tmux is no longer only a multiplexer configuration; it is becoming a lightweight project operating system.

### September-October 2025 — Neovim modularizes, then negotiates its interfaces

The large Neovim configuration is broken out into individual Lua modules. `nvim/init.lua` drops from roughly **348 lines at the August endpoint to 24 lines at the current `HEAD`**, while behavior moves into `nvim/lua/plugins/` and `nvim/lua/customs/`.

The modularization makes experimentation cheaper, and the commit history shows that experimentation happening in public:

- `fzf-lua` and Snacks picker configurations are tried in both directions.
- The `F` and `S` commands emerge as parallel interfaces for aliases and picker functions.
- Harpoon2 returns as a fast, explicit buffer/file navigation layer.
- vim-slime, DAP, formatting, text objects, scratch buffers, terminals, and Zen mode are each given clearer homes.
- Keybindings are repeatedly negotiated until the same concepts feel similar across tmux, Neovim, and macOS.

The pattern is not "pick one plugin and stay loyal." It is closer to interface design: try a workflow, notice its friction, keep the useful parts, and preserve a recognizable command vocabulary even when the implementation changes.

### October 2025 — AI moves out of the main editor surface

The AI story takes a noticeable turn:

- Avante and Copilot Chat had made Neovim a place to conduct a chat-like coding interaction.
- The October commit says **"opencode adopted farewell avante"**.
- Avante is removed from the active Neovim setup, while Copilot remains as an autocomplete source inside `nvim-cmp`.
- Avante briefly returns in November, is disabled again in April 2026, and is finally removed from the tracked plugin configuration in July.

This is not a rejection of AI. It is a separation of concerns. Neovim keeps low-friction completion; the larger agent interaction moves toward a dedicated process and terminal session rather than occupying the editor's primary interface.

The emerging division of labor looks like this:

```text
Neovim                         terminal / tmux
--------                       --------------
completion                     project session
LSP + DAP                      long-running agent
quick edits                    agent context + output
local navigation               session switching
```

### November-December 2025 — personal commands become workflow APIs

The repository starts encoding domain-specific actions instead of only configuring generic tools.

- DAP gets a dedicated view and more ergonomic continue/step/terminate mappings.
- Diagnostics and formatting become explicit, including `conform.nvim` and a format alias.
- Molten is added for Jupyter notebook work, then later disabled during cleanup.
- A commit titled **"thanks :robot:, gbq `bq` wrapper"** adds an asynchronous BigQuery workflow to Neovim.
- The GBQ helper can preview the current SQL or count its rows, display animated progress, surface stderr, and distinguish an empty result as `NO DATA`.
- The helper is later localized into `nvim/lua/customs/gbq.lua`, with a small alias registry in `nvim/lua/customs/aliases.lua`.
- A standalone `KEYMAPS.md` is created, making the interaction model explicit rather than leaving it discoverable only through config files.

The important evolution is that the editor begins to expose small, composable commands for real work. These commands are not just plugin toggles; they are personal workflow primitives.

## 2026: cleanup, consolidation, and agent orchestration

### February-March 2026 — custom behavior is separated from plugin configuration

The winter cleanup removes several experiments and clarifies ownership:

- vim-slime is removed.
- BigQuery behavior is separated from the generic alias configuration.
- Formatting is exposed as a command-like alias rather than being buried in plugin setup.
- Markdown fenced-code-block behavior is repaired and moved into a more appropriate visual-mode configuration.
- mise globals are updated, including Python 3.14.
- A few commands are moved out of Neovim because they belong elsewhere, including the Buildkite-related alias cleanup.

This is a recurring dotfiles cycle: add behavior quickly, live with it, then move it to the smallest place that explains why it exists.

### April 2026 — the documentation and picker surfaces consolidate

April contains a second major Neovim simplification:

- Picker keymaps move toward Snacks while fzf-lua remains available for the workflows that still feel better there.
- The `F` and `S` command surfaces preserve parity between the two picker implementations.
- Harpoon gets explicit `replace_at` mappings, making its four slots easier to manage deliberately.
- LSP setup moves toward wildcard configuration plus an `LspAttach` autocmd.
- Avante is disabled and its lock entry is removed.
- `KEYMAPS.md` is folded into `README.md`, which becomes both the installation guide and the unified keymap reference.
- The README is rewritten around the actual structure of the repository rather than its historical accumulation.

The result is a thinner bootstrap and a more legible system. The README becomes part of the user interface: it explains the layers, the installation links, and the keymap contract.

### May-July 2026 — maintenance becomes the background, agents become the foreground

May and early July are mostly refinement: plugin locks, tmux predicate cleanup, terminal key reporting, Node 26, pane workflow improvements, and small aesthetic adjustments.

Then July changes the character of the repository.

#### The Herdr agent-picker experiment

On July 18, a separate agent picker is added to tmux. It initially uses Herdr as the agent backend and provides:

- a list of active agents;
- status labels for `blocked`, `done`, `working`, and `idle`;
- colored status indicators;
- a jump to the agent's tmux session, historically using window 3;
- a way to close an agent workspace.

The first implementation creates separate launcher scripts and a small Herdr configuration. Almost immediately, the design is folded into the existing session picker.

The unified picker joins two previously separate lists:

```text
active tmux sessions + project directories
                    │
                    ├─ normalize project → session name
                    │
                    ├─ attach agent status when present
                    │
                    └─ one fzf picker
                         ├─ Return → ordinary session switch
                         └─ F1/F2/F3 → jump to a selected window
```

The repository does not end up with an "agent picker beside the session picker." It ends up with a session picker that knows agents exist. That distinction matters: the project remains the primary unit, while the agent becomes state attached to the project.

#### Herdr gives way to native Pi state

The Herdr-specific path is short-lived. Within the same July burst:

- Herdr launchers and UI overrides are removed.
- A native Pi/tmux state model replaces the external agent-state dependency.
- Agent panes are marked with tmux user options such as `@pi-agent` and `@pi-state`.
- The session launcher reads those pane options and renders `working`, `done`, or `idle` state directly in the session list.
- Tmux hooks call `tmux-session-agent-seen.sh` when a pane, window, or client session becomes active, turning a viewed `done` state back into `idle`.
- Alacritty maps Ctrl-1, Ctrl-2, and Ctrl-3 to F1/F2/F3 sequences so fzf can use them for window jumps.
- The old separate agent binding disappears; `prefix+s` becomes the canonical session-and-agent picker.

The implementation is revealing. The system no longer needs to ask a separate agent service to tell the terminal what is happening. The agent reports its lifecycle into tmux, and tmux makes that lifecycle visible where project navigation already happens.

The final architecture is roughly:

```text
Pi agent process
      │
      │ writes pane-local state
      ▼
tmux pane options: @pi-agent / @pi-state
      │
      ├─ tmux hooks mark completed work as seen
      ├─ session picker renders status
      └─ fzf selects project/session/window
            ▲
            │
     Alacritty + skhd key translation
```

This is the clearest sign of the new era: the agent is treated as a participant in the workstation, not as a feature embedded in the editor.

## Agent-use evolution

Across the continuation, the AI/agent workflow passes through several distinct shapes:

1. **Chat inside Neovim** — Avante and Copilot Chat experiment with making the editor itself the agent surface.
2. **Autocomplete inside Neovim** — Copilot is retained as a lightweight completion source, while the larger conversation is removed from the main editing UI.
3. **Dedicated terminal agent** — the agent gets a long-lived process, a tmux pane, and a project session rather than a transient editor panel.
4. **Agent-aware navigation** — the session picker displays whether an agent is working, done, or idle.
5. **Agent lifecycle as local state** — Pi writes state to tmux; tmux owns visibility, focus, and navigation.

The trajectory is therefore not simply "more AI." It is a move toward **agent ergonomics**:

- Where does the agent live?
- How do I find the project it belongs to?
- How do I know whether it needs attention?
- What happens when I focus its pane?
- Can the agent state be understood without opening another dashboard?

The answer encoded by the current dotfiles is: put the agent beside the project, give it a visible lifecycle, and make the existing session switcher the control surface.

## Key evolution themes

1. **Editor configuration → workflow composition**  
   Neovim remains important, but tmux, Alacritty, skhd, and project launchers now form one system.

2. **AI panel → autonomous session**  
   The editor keeps completion. Longer-running agent work moves into a process that can persist in tmux.

3. **Separate tools → shared interaction language**  
   Picker commands, navigation keys, window jumps, and status indicators are repeatedly aligned across layers.

4. **External status service → local terminal state**  
   The Herdr experiment demonstrates the desired behavior, then native Pi/tmux state removes the extra dependency.

5. **Configuration sprawl → modular ownership**  
   The Neovim bootstrap gets smaller while plugin behavior, domain helpers, aliases, and keymaps gain clearer boundaries.

6. **Keymaps as implementation detail → keymaps as product surface**  
   The keymap reference is created, revised, and finally consolidated into the README because the interaction model is now part of the system's design.

7. **Experimentation remains a feature**  
   fzf-lua versus Snacks, Avante on and off, layoutizer versus session launchers, and Herdr versus native Pi state all show a willingness to reverse course when the workflow becomes simpler.

## Current state (July 2026)

The dotfiles now describe a workstation organized around project sessions and agent-aware navigation:

- **Neovim** has a 24-line bootstrap and modular Lua plugin configuration.
- **Copilot** remains in the completion pipeline, but Avante is no longer part of the active configuration.
- **LSP/DAP** support remains strong, with Mason, nvim-dap-view, project-level overrides, and Conform formatting.
- **Snacks and fzf-lua** coexist behind recognizable `S` and `F` command surfaces.
- **Harpoon2** provides explicit four-slot navigation and replacement mappings.
- **tmux** is the primary project/session switchboard.
- **`tmux-session-agent-launcher.sh`** is the canonical picker for sessions, projects, and Pi status.
- **Pi agent state** is surfaced through tmux pane metadata instead of a separate agent UI.
- **Alacritty and skhd** translate the physical keyboard into the control vocabulary expected by tmux and fzf.
- **mise** manages global language/runtime versions, currently including Node 26 and Python 3.14.
- **README.md** documents both installation and the layered keymap system.

The repository has moved a long way from a 2013 collection of shell and Vim files. The latest evolution is not another migration from one tool to another. It is the emergence of a small personal operating environment in which projects, panes, editors, and agents share state.

The next likely frontier is not obvious from the history. The system has reached the point where the interesting questions are behavioral: how agent state should notify, how sessions should be resumed, how context should persist, and how much orchestration belongs in tmux versus Pi itself.

— <|°_°|>
