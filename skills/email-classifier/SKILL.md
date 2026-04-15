# email-classifier Skill

Use this skill when you need to run or manage the AI Email Agent.

## What It Does
- Fetches unread emails via `gog` CLI (Gmail)
- Classifies each email using MiniMax AI (`MiniMax-M2.7-highspeed`)
- Applies Gmail labels and archive/delete actions based on classification
- Learns from user decisions via domain rules (classify once, apply forever)
- Queues low-confidence classifications for human review in Supabase

## Architecture
- **Agent**: `node /data/workspace-coding/ai-assistant-dashboard/email-agent/agent.js`
- **Storage**: Supabase (`pending_review`, `domain_rules`, `labels`, `session_log`)
- **Gmail**: `gog gmail` CLI (account: suzzyp178@gmail.com)
- **AI**: MiniMax API direct call (`https://api.minimax.io/anthropic/v1/messages`)

## Commands

### Run the email agent (full run)
```bash
node /data/workspace-coding/ai-assistant-dashboard/email-agent/agent.js
```

### Dry-run (preview only, no actions applied)
```bash
node /data/workspace-coding/ai-assistant-dashboard/email-agent/agent.js --dry-run
```

### Via command script
```bash
/data/workspace-coding/commands/email_scan.sh        # full run
/data/workspace-coding/commands/email_scan.sh dry-run  # preview
```

## Classification Logic
- Confidence ≥ 0.75 → auto-apply action (keep/archive/delete/unsubscribe)
- Confidence < 0.75 → queue for human review in `pending_review` table
- Domain already in `domain_rules` → skip AI, apply cached action

## Gmail Actions by Label
| Label | Action | Gmail |
|---|---|---|
| Personal | keep | Personal |
| Work | keep | Work |
| Transactional | archive | Transactional |
| Financial | keep | Financial |
| Newsletter | archive | Newsletter |
| Advertisement | delete | TRASH |
| Notification | archive | Notification |
| Security | keep | Security |
| Spam | delete | TRASH |
| Unsubscribe | unsubscribe | TRASH |

## View Pending Reviews
Supabase dashboard → `pending_review` table. Or ask the agent to check.

## Cron
- Job ID: `email-daily-001` in `/data/.openclaw/cron/jobs.json`
- Schedule: Mon–Fri 7:00 AM NY (`0 7 * * 1-5`)
- Announces results to `#coding` Discord channel

## Gog Auth Check
```bash
gog auth list
```
