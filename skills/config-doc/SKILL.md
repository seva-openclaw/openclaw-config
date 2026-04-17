---
name: config-doc
description: OpenClaw configuration reference skill. Use whenever modifying openclaw.json, when encountering config errors, or when asked to change any setting in the OpenClaw gateway config. Triggers on: "change config", "set up cron", "configure channel", "fix config", "openclaw.json", "config error", "add agent", "modify config", "config validation".
---

# Config Doc — OpenClaw Configuration Reference

## Purpose

This skill prevents config file breakage by requiring documentation lookup before any modification. Seva has to manually fix the config when I get it wrong — this skill fixes that.

## Workflow — Always Follow This Order

**Before making ANY config change:**

1. **Read the relevant reference doc** — load from `references/config-sections.md`, find the section, read the linked doc
2. **Check validation rules** — load `references/validation.md` for strict schema rules
3. **Search the web** if the doc doesn't have the answer: `site:docs.openclaw.ai <query>`
4. **Ask Seva** if still not 100% confident

## Config File Location

```
~/.openclaw/openclaw.json  →  /data/.openclaw/openclaw.json
```

## Key Docs

- **Overview**: `/opt/openclaw/app/docs/gateway/configuration.md`
- **Full Reference**: `/opt/openclaw/app/docs/gateway/configuration-reference.md`
- **Examples**: `/opt/openclaw/app/docs/gateway/configuration-examples.md`
- **Online**: `https://docs.openclaw.ai/gateway/configuration`

## Config Sections Quick Map

See `references/config-sections.md` for the full section-to-URL map.

## Critical Rules

- OpenClaw uses **strict JSON5 validation** — unknown keys or bad types = complete boot failure
- If the gateway won't start after a change → run `openclaw doctor`
- **Always show Seva** the exact change before applying it
- Use `openclaw config set` for single-key changes (safer than direct edit)
- Back up before changes: `cp /data/.openclaw/openclaw.json /data/.openclaw/openclaw.json.bak`

## Common Seva-Specific Values

- Discord guild: `1491555663594389575`
- Channel IDs: see `references/channel-ids.md`
- Gog account: `suzzy` → `suzzyp178@gmail.com`
- Supabase project: `tvhvpwcbpntlsthgyyod`

## When in Doubt

Ask before touching anything. Seva would rather be asked than fix a broken gateway.
