# Available Agents

These agents can be referenced for specialized tasks:

## @codebase-explorer

**Source:** `.agent/agents/codebase-explorer.md`

Finds files, locates code patterns, and analyzes how existing code works. Use when you need to understand the codebase (find similar implementations, locate files, trace data flow). Do NOT use for external documentation/web research, making code changes, or when you already know the exact file path.

## @debugger

**Source:** `.agent/agents/debugger.md`

Deep error diagnosis and root cause analysis. Use when stuck on complex bugs after 2+ failed attempts, mysterious test failures, or errors requiring systematic investigation. Do NOT use for simple/obvious errors, syntax errors, or as first resort before attempting diagnosis yourself.

## @documenter

**Source:** `.agent/agents/documenter.md`

Writes and updates all types of documentation including READMEs, API docs, user guides, inline comments, and changelogs. Use when you need comprehensive documentation written. Do NOT use for simple inline comments or code review feedback.

## @implementer

**Source:** `.agent/agents/implementer.md`

Makes focused code changes to a single file. Use for parallel edits when changes are repetitive and isolated (e.g., updating imports across 5 files). Do NOT use when changes depend on each other, when editing fewer than 3 files, or for complex logic requiring deep context.

## @orchestrator

**Source:** `.agent/agents/orchestrator.md`

Intelligent agent that understands user intent and chooses the right approach - whether to plan, ask for clarification, or build directly. Use for tasks where the best workflow isn't immediately obvious.

## @researcher

**Source:** `.agent/agents/researcher.md`

Fetches and analyzes web content from URLs. Use for external documentation, best practices, API docs, and online resources. Do NOT use for internal codebase exploration or when you already have the specific URL.

## @reviewer

**Source:** `.agent/agents/reviewer.md`

Reviews code for correctness, maintainability, and best practices. Use proactively for significant code changes (new features, refactors, critical fixes) and always before task completion. Do NOT use for trivial changes (typo fixes, formatting), work-in-progress code, or generated/boilerplate code.

## @tester

**Source:** `.agent/agents/tester.md`

Writes comprehensive test suites in TDD mode (before implementation) or verification mode (after implementation). Use for writing multiple related tests or full test coverage. Do NOT use for adding a single simple test, debugging failing tests, or running existing tests.

