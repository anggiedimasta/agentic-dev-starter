# Agentic Development Configuration

This directory is the **single source of truth** for AI agent definitions.

## Structure

```
.agent/
├── agents/       # AI agent persona definitions
├── commands/     # Slash-command workflows
├── sync.js       # Cross-platform sync script (Node.js)
└── sync.ps1      # Legacy PowerShell script
```

## Usage

### Interactive Mode
```bash
npm run sync
# or
node .agent/sync.js
```

### Sync All Providers
```bash
npm run sync:all
# or
node .agent/sync.js --all
```

### Sync Specific Providers
```bash
node .agent/sync.js --cursor --claude --cline
```

### With npx/bunx (no install)
```bash
npx agentic-sync --all
bunx agentic-sync --cursor
```

## Generated Directories

| Provider | Location |
|----------|----------|
| Cursor | `.cursor/rules/` |
| Claude Code | `.claude/` + `CLAUDE.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Cline | `.clinerules/` |
| Windsurf | `.windsurf/rules/` |
| Trae | `.trae/` |
| Kiro | `.kiro/agents/` |
| Factory Droid | `.factory/droids/` |
| Antigravity | `.gemini/workflows/` |
| OpenCode | `.opencode/` |

## Agent Reference

| Agent | File | Purpose |
|-------|------|---------|
| `@orchestrator` | `agents/orchestrator.md` | Main intelligent coordinator |
| `@codebase-explorer` | `agents/codebase-explorer.md` | Find files, analyze patterns |
| `@implementer` | `agents/implementer.md` | Make focused code changes |
| `@researcher` | `agents/researcher.md` | External documentation |
| `@reviewer` | `agents/reviewer.md` | Code review |
| `@debugger` | `agents/debugger.md` | Root cause analysis |
| `@tester` | `agents/tester.md` | Write tests |
| `@documenter` | `agents/documenter.md` | Documentation |

## Command Reference

| Command | File | Purpose |
|---------|------|---------|
| `/commit` | `commands/commit.md` | Conventional commits |
| `/debug` | `commands/debug.md` | Systematic debugging |
| `/document` | `commands/document.md` | Generate docs |
| `/refactor` | `commands/refactor.md` | Safe refactoring |
| `/review` | `commands/review.md` | Code review |
| `/test` | `commands/test.md` | Write tests |
| `/research` | `commands/research.md` | Research codebase |

## Subagent Support

Tools that can spawn subagents at runtime:
- ✅ Claude Code SDK
- ✅ OpenCode
- ✅ Factory Droid

Other tools use agent definitions as reference documentation.
