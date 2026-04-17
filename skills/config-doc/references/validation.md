# Config Validation Rules

## Strict Schema

OpenClaw uses **strict JSON5 validation**. The gateway **refuses to start** if:
- Unknown keys are present
- Malformed types (string where number expected, etc.)
- Invalid enum values
- Missing required fields

**Only exception at root level:** `$schema` (for JSON Schema metadata from editors).

## If Gateway Won't Start After a Change

1. Run `openclaw doctor` — shows exact issues
2. Run `openclaw doctor --fix` or `openclaw doctor --yes` — auto-repair
3. Check the backup: `/data/.openclaw/openclaw.json.bak`

## Safe Edit Patterns

### Single key change → use `openclaw config set`
```bash
openclaw config set agents.defaults.heartbeat.every "2h"
```
This is safer than direct file edit because it validates before saving.

### Multi-key change → use `config.patch`
```bash
openclaw gateway call config.patch --params '{
  "raw": "{ channels: { discord: { enabled: true } } }",
  "baseHash": "<hash from config.get>"
}'
```

### Direct edit → always back up first
```bash
cp /data/.openclaw/openclaw.json /data/.openclaw/openclaw.json.bak
# then edit
```

## What Requires Restart vs Hot-Apply

Most config changes apply immediately. These require restart:
- `gateway.port`, `gateway.bind`, `gateway.tls`, `gateway.remote`
- `discovery`, `canvasHost`, `plugins` (infrastructure)

Everything else (channels, agents, cron, sessions, tools) hot-applies.

## Invalid Config That Was Applied Previously

This key is **invalid** — Discord channel configs do not have an "agent" field:
```
channels.discord.guilds.1491555663594389575.channels.1492304108869259314.agent
```

## Schema Inspection

```bash
openclaw config schema  # prints JSON Schema
openclaw config get     # shows current config
```

## Restore from Backup

If the config is broken:
```bash
cp /data/.openclaw/openclaw.json.bak /data/.openclaw/openclaw.json
openclaw gateway restart
```
