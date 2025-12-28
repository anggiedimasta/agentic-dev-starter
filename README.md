# Agentic Dev Starter

Universal AI coding assistant configuration for 10+ providers.

## Installation

```bash
npx agentic-dev-starter
# or
bunx agentic-dev-starter
```

The installer will:
1. Ask which AI tools you use
2. Install `.agent/` directory (source of truth)
3. Generate provider-specific configs
4. Handle file conflicts gracefully

## Supported Providers

| Provider | Description |
|----------|-------------|
| **Cursor** | AI-powered IDE with rules system |
| **Claude Code** | Anthropic Claude CLI agent |
| **GitHub Copilot** | Copilot Chat instructions |
| **Cline** | VS Code extension with rules |
| **Windsurf** | Codeium Cascade agent |
| **Trae** | ByteDance AI coding assistant |
| **Kiro** | AWS AI coding IDE |
| **Factory Droid** | Factory.ai coding agent |
| **Antigravity** | Google Gemini AI IDE |
| **OpenCode** | Open-source AI coding tool |

## What Gets Installed

```
your-project/
├── .agent/                    # Source of truth
│   ├── agents/                # 8 agent definitions
│   │   ├── orchestrator.md
│   │   ├── codebase-explorer.md
│   │   ├── debugger.md
│   │   └── ...
│   └── commands/              # 10 workflow commands
│       ├── commit.md
│       ├── debug.md
│       └── ...
├── AGENTS.md                  # Project rules
└── [provider-specific dirs]   # Based on your selection
```

## File Conflict Handling

If files already exist, you can choose to:
- **Skip** - Keep your existing file
- **Merge** - Prepend our rules to your file
- **Overwrite** - Replace with our template
- **Backup** - Rename existing to `.backup`

## Agents

| Agent | Purpose |
|-------|---------|
| `@orchestrator` | Main intelligent coordinator |
| `@codebase-explorer` | Find files, analyze code |
| `@debugger` | Root cause analysis |
| `@documenter` | Write documentation |
| `@implementer` | Make code changes |
| `@researcher` | External docs research |
| `@reviewer` | Code review |
| `@tester` | Write tests |

## Commands

| Command | Purpose |
|---------|---------|
| `/commit` | Conventional commits |
| `/debug` | Systematic debugging |
| `/refactor` | Safe refactoring |
| `/review` | Code review |
| `/test` | Write tests |

## Subagent Support

These tools can spawn subagents at runtime:
- ✅ Claude Code SDK
- ✅ OpenCode
- ✅ Factory Droid

Other tools use agent definitions as reference documentation.

## Customization

1. Edit `AGENTS.md` for project-specific rules
2. Modify `.agent/agents/` for agent behavior
3. Add commands in `.agent/commands/`

## License

MIT
