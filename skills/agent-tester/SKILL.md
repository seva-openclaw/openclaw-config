---
name: agent-tester
description: Test a subagent by spawning it, sending it questions directly, evaluating its responses, and iterating until it behaves correctly. Use when asked to "test agent", "verify agent", "validate agent", "QA agent", or "check if agent is working". Tests cover: identity, data sources, CRUD operations, tool usage, and response quality. NOT for Discord channel testing — purely direct subagent interrogation.
---

# Agent Tester

Spawn the target subagent, interrogate it directly, evaluate every response, fix broken code, repeat until clean.

## Core Tools

- `sessions_spawn` — launch isolated subagent session
- `sessions_send` — send a message and get the agent's reply
- `sessions_history` — read full conversation history
- `subagents(action="kill")` — kill session after done
- `exec` — verify actual file/DB state after each test

## Workflow

```
1. Identify target: workspace path, db.js location, data source
2. Spawn: sessions_spawn with label "test-{agent}"
3. Run tests: sessions_send for each test case
4. Evaluate: correct answer + correct data source used + proper tools
5. Fix: patch broken code in workspace
6. Re-spawn: fresh session after each fix
7. Repeat: until all tests pass
8. Kill: subagents(action="kill", target="test-{agent}")
```

## Spawn Template

```javascript
sessions_spawn({
  task: `You are the {AGENT} agent.
Your workspace: /data/workspace-{agent}
Your db.js: /data/workspace-{agent}/db.js
Answer questions directly using your tools. Do not defer to orchestrator.
Do not say "I am an AI" or "I cannot" — actually use your tools.`,
  label: "test-{agent}",
  runtime: "subagent",
  cwd: "/data/workspace-{agent}",
  mode: "session",
})
```

## Test Sequence

Send these messages via `sessions_send` one by one:

1. `"What's your name?"`
2. `"What's your workspace path?"`
3. `"Where does your data come from — Supabase, local files, or something else?"`
4. `"Show me 3 items from your data"`
5. `"Add a test item: name=test_XXX description='testing' location='Northport'"` (adjust per agent)
6. `"Show me the item you just added"`
7. `"Delete the item with name containing test_"`
8. `"Is it gone?"`
9. `"What happens if I give you an invalid time like 'not-a-time'?"`
10. `"What happens with an unknown location like 'Springfield'?"`

## Evaluation Per Response

For each `sessions_send` reply, manually check:

| Check | Pass | Fail |
|-------|------|------|
| Correct answer | Yes | No / hallucinated |
| Correct data source | Claims Supabase → actually uses Supabase | Says DB but uses local file |
| Tool used | exec/read/write called | Just text, no tools |
| Error handling | Clear error message | Silent accept or crash |

## If Test Fails

1. `sessions_history` to see exactly what the agent did
2. `exec` to verify actual DB/file state
3. Fix the broken function in the workspace
4. `subagents(action="kill", target="test-{agent}")`
5. `sessions_spawn` fresh session
6. Re-run from failing test

## Output Log

```
TEST 1: Identity
EXPECTED: "I am the {agent} agent..."
AGENT SAID: ...
RESULT: ✅ PASS | ❌ FAIL
IF FAIL: [what to fix in workspace]

TEST 2: Data source
...
```

## Session Cleanup

Always kill when done:
```
subagents(action="kill", target="test-{agent}")
```

## Known Workspaces

- `/data/workspace-shopping` — shopping agent
- `/data/workspace-overtime-logger` — overtime logger
- `/data/workspace-todos` — todos agent
- `/data/workspace-travel` — travel agent
- `/data/workspace-brief` — morning brief agent
