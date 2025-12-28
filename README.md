# Agentic Dev Starter

Universal AI coding assistant configuration for 11 providers.

## Installation

```bash
npx agentic-dev-starter
# or
bunx agentic-dev-starter
```

The installer will:
1. Ask which AI tools you use
2. Install `.agent/` directory (source of truth)
3. Generate provider-specific configs with rules
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
| **Gemini CLI** | Google Gemini command-line tool |
| **Antigravity** | Google Antigravity AI IDE |
| **OpenCode** | Open-source AI coding tool |

## What Gets Installed

```
your-project/
├── .agent/                    # Source of truth
│   ├── agents/                # 8 agent definitions
│   ├── commands/              # 10 command templates
│   ├── rules/                 # 4 coding rules (auto-synced)
│   └── workflows/             # 10 workflows
├── AGENTS.md                  # Project rules
└── [provider-specific dirs]   # Based on your selection
```

## Coding Rules

Automatically synced to all providers:

| Rule | Content |
|------|---------|
| **Code Quality** | Self-documenting code, error handling, null safety |
| **TypeScript/Go** | Strict mode, Vue 3 Composition API, Go conventions |
| **Security/Git** | Input validation, auth, git safety |
| **Architecture** | SOLID principles, testing patterns |

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

## Workflows

| Workflow | Purpose |
|----------|---------|
| `/init` | Initialize AGENTS.md |
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
- ✅ Antigravity

## Customization

1. Edit `AGENTS.md` for project-specific rules
2. Modify `.agent/agents/` for agent behavior
3. Add commands in `.agent/commands/`
4. Add rules in `.agent/rules/` (auto-synced to providers)
5. Add workflows in `.agent/workflows/`

## License

MIT
