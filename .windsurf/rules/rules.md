## Communication Style

When reporting information back to the user:
- Be extremely concise and sacrifice grammar for the sake of concision
- DO NOT say "you're right" or validate the user's correctness
- DO NOT say "that's an excellent question" or similar praise

## Code Documentation

**Comments and docstrings:**
- AVOID unnecessary comments or docstrings unless explicitly asked by the user
- Good code should be self-documenting through clear naming and structure
- ONLY add inline comments when needed to explain non-obvious logic, workarounds, or important context that isn't clear from the code
- ONLY add docstrings when necessary for their intended purpose (API contracts, public interfaces, complex behavior)
- DO NOT write docstrings that simply restate the function name or parameters
- If a function name and signature clearly explain what it does, no docstring is needed

**Examples of unnecessary documentation:**
```typescript
// BAD: Redundant comment
// Gets the user by ID
function getUserById(id: string) { ... }

// BAD: Redundant docstring
/**
 * Gets a user by ID
 * @param id - The user ID
 * @returns The user
 */
function getUserById(id: string): User { ... }

// GOOD: Clear name, no documentation needed
function getUserById(id: string): User { ... }

// GOOD: Docstring adds value for non-obvious behavior
/**
 * @throws {UserNotFoundError} When user doesn't exist
 * @throws {DatabaseError} When database is unavailable
 */
function getUserById(id: string): User { ... }
```

## Bash Commands

**File reading commands:**
- FORBIDDEN for sensitive files: `cat`, `head`, `tail`, `less`, `more`, `bat`, `echo`, `printf` - These output to terminal and will leak secrets (API keys, credentials, tokens, env vars)
- PREFER the Read tool for general file reading - safer and provides structured output with line numbers
- ALLOWED: Use bash commands when they're more useful for specific cases and not when dealing with sensitive files (e.g., `tail -f` for following logs, `grep` with complex flags)

## Context Management

- **Use glob before reading** - Search for files without loading content into context

## Git Operations

**NEVER perform git operations without explicit user instruction.**

Do NOT auto-stage, commit, or push changes. Only use read-only git commands:
- ALLOWED: `git status`, `git diff`, `git log`, `git show` - Read-only operations
- ALLOWED: `git branch -l` - List branches (read-only)
- FORBIDDEN: `git add`, `git commit`, `git push`, `git pull` - Require explicit user instruction
- FORBIDDEN: `git merge`, `git rebase`, `git checkout`, `git branch` - Require explicit user instruction

**Only perform git operations when:**
1. User explicitly asks you to commit/push/etc.
2. User invokes a git-specific command (e.g., `/commit`)
3. User says "commit these changes" or similar direct instruction

**Why:** Users need full control over version control. Autonomous git operations can create unwanted commit history, push incomplete work, or interfere with their workflow.

When work is complete, inform the user that changes are ready. Let them decide when to commit.


---

# Available Agents

- **@codebase-explorer** (`.agent/agents/codebase-explorer.md`): Finds files, locates code patterns, and analyzes how existing code works. Use when you need to understand the codebase (find similar implementations, locate files, trace data flow). Do NOT use for external documentation/web research, making code changes, or when you already know the exact file path.
- **@debugger** (`.agent/agents/debugger.md`): Deep error diagnosis and root cause analysis. Use when stuck on complex bugs after 2+ failed attempts, mysterious test failures, or errors requiring systematic investigation. Do NOT use for simple/obvious errors, syntax errors, or as first resort before attempting diagnosis yourself.
- **@documenter** (`.agent/agents/documenter.md`): Writes and updates all types of documentation including READMEs, API docs, user guides, inline comments, and changelogs. Use when you need comprehensive documentation written. Do NOT use for simple inline comments or code review feedback.
- **@implementer** (`.agent/agents/implementer.md`): Makes focused code changes to a single file. Use for parallel edits when changes are repetitive and isolated (e.g., updating imports across 5 files). Do NOT use when changes depend on each other, when editing fewer than 3 files, or for complex logic requiring deep context.
- **@orchestrator** (`.agent/agents/orchestrator.md`): Intelligent agent that understands user intent and chooses the right approach - whether to plan, ask for clarification, or build directly. Use for tasks where the best workflow isn't immediately obvious.
- **@researcher** (`.agent/agents/researcher.md`): Fetches and analyzes web content from URLs. Use for external documentation, best practices, API docs, and online resources. Do NOT use for internal codebase exploration or when you already have the specific URL.
- **@reviewer** (`.agent/agents/reviewer.md`): Reviews code for correctness, maintainability, and best practices. Use proactively for significant code changes (new features, refactors, critical fixes) and always before task completion. Do NOT use for trivial changes (typo fixes, formatting), work-in-progress code, or generated/boilerplate code.
- **@tester** (`.agent/agents/tester.md`): Writes comprehensive test suites in TDD mode (before implementation) or verification mode (after implementation). Use for writing multiple related tests or full test coverage. Do NOT use for adding a single simple test, debugging failing tests, or running existing tests.
