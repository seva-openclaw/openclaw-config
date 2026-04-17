# Config Sections Map

## Root-Level Sections

| Section | Doc Path | Online URL |
|---------|----------|------------|
| `agents` | `gateway/configuration-reference.md#agent-defaults` | `/gateway/configuration-reference#agent-defaults` |
| `agents.defaults` | `gateway/configuration-reference.md#agent-defaults` | `/gateway/configuration-reference#agent-defaults` |
| `agents.list` | `gateway/configuration-reference.md#agents-list-per-agent-overrides` | `/gateway/configuration-reference#agents-list-per-agent-overrides` |
| `bindings` | `gateway/configuration-reference.md#multi-agent-routing` | `/gateway/configuration-reference#multi-agent-routing` |
| `broadcast` | `channels/broadcast-groups.md` | `/channels/broadcast-groups` |
| `channels` | `gateway/configuration.md#channels` | `/gateway/configuration#channels` |
| `channels.discord` | `channels/discord.md` | `/channels/discord` |
| `channels.telegram` | `channels/telegram.md` | `/channels/telegram` |
| `channels.whatsapp` | `channels/whatsapp.md` | `/channels/whatsapp` |
| `cron` | `automation/cron-jobs.md` | `/automation/cron-jobs` |
| `discovery` | `gateway/configuration-reference.md#discovery` | `/gateway/configuration-reference#discovery` |
| `gateway` | `gateway/configuration-reference.md#gateway` | `/gateway/configuration-reference#gateway` |
| `gateway.reload` | `gateway/configuration.md#config-hot-reload` | `/gateway/configuration#config-hot-reload` |
| `hooks` | `gateway/configuration-reference.md#hooks` | `/gateway/configuration-reference#hooks` |
| `models` | `gateway/configuration-reference.md#models` | `/gateway/configuration-reference#models` |
| `plugins` | `gateway/configuration-reference.md#plugins` | `/gateway/configuration-reference#plugins` |
| `session` | `gateway/configuration-reference.md#session` | `/gateway/configuration-reference#session` |
| `skills` | `tools/skills-config.md` | `/tools/skills-config` |
| `tools` | `gateway/configuration-reference.md#tools` | `/gateway/configuration-reference#tools` |

## Channel-Specific

| Channel | Config Path | Doc |
|---------|-------------|-----|
| Discord | `channels.discord` | `/channels/discord` |
| Telegram | `channels.telegram` | `/channels/telegram` |
| WhatsApp | `channels.whatsapp` | `/channels/whatsapp` |
| Signal | `channels.signal` | `/channels/signal` |
| iMessage | `channels/imessage` | `/channels/imessage` |
| Slack | `channels/slack.md` | `/channels/slack` |
| Microsoft Teams | `channels/msteams.md` | `/channels/msteams` |
| Google Chat | `channels/googlechat.md` | `/channels/googlechat` |
| Mattermost | `channels/mattermost.md` | `/channels/mattermost` |
| Matrix | `channels/matrix.md` | `/channels/matrix` |

## Automation

| Topic | Doc |
|-------|-----|
| Cron Jobs | `/automation/cron-jobs` |
| Heartbeat | `/gateway/heartbeat` |
| Cron vs Heartbeat | `/automation/cron-vs-heartbeat` |
| Tasks | `/automation/tasks` |
| Clawflow | `/automation/clawflow` |
| Webhooks | `/automation/webhook` |

## Model Config

| Topic | Doc |
|-------|-----|
| Model selection | `/concepts/models` |
| Model failover | `/concepts/model-failover` |
| Custom providers | `/gateway/configuration-reference#custom-providers-and-base-urls` |
| Local models | `/gateway/local-models` |

## Online Docs Base URL

```
https://docs.openclaw.ai
```

Full path = base + doc path from column 3.
