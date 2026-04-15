# inbox-guardian Skill

Use this skill when you need to run or manage the Inbox Guardian email classification agent.

## What It Does
- Scans unread emails for a specified email provider (via `gog`)
- Classifies each email using AI judgment
- Applies Gmail labels/actions based on classification
- Learns from decisions by saving domain rules
- Queues uncertain classifications for human review

## Tables (Supabase)
- `email_labler_labels` — classification categories
- `email_labler_domain_rules` — learned domain → label mappings
- `email_labler_pending_review` — emails needing human review
- `email_labler_session_log` — audit trail of all classification sessions

## Commands

### Run a scan
```bash
SUPABASE_SERVICE_PAT="${SUPABASE_SERVICE_PAT}" node /data/workspace-inbox-guardian/main.js scan [max]
```
Example: `node /data/workspace-inbox-guardian/main.js scan 20` — scans 20 unread emails.

The `main.js` script handles the full flow: fetch → classify → apply actions → learn rules → log.

### Check domain rule
```bash
node /data/.openclaw/skills/inbox-guardian/scripts/check_domain.js <domain> [email_provider]
```

### Insert pending review
```bash
node /data/.openclaw/skills/inbox-guardian/scripts/insert_pending.js '<json_payload>'
```
Payload JSON:
```json
{
  "domain": "example.com",
  "email_provider": "suzzy",
  "from_address": "Name <info@example.com>",
  "subject": "Email subject",
  "body_preview": "First 500 chars...",
  "suggested_label_id": "uuid",
  "suggested_action": "archive",
  "confidence_score": 0.75,
  "ai_reasoning": "Why I chose this label"
}
```

### Upsert domain rule
```bash
node /data/.openclaw/skills/inbox-guardian/scripts/upsert_rule.js '<json_payload>'
```
Payload JSON:
```json
{
  "domain": "example.com",
  "email_provider": "suzzy",
  "display_name": "Example",
  "label_id": "uuid",
  "action": "archive",
  "confidence_score": 0.85,
  "ai_reasoning": "Why I classified this way",
  "sample_subject": "Example email subject"
}
```

### Apply Gmail label/action
```bash
node /data/.openclaw/skills/inbox-guardian/scripts/apply_label.js <message_id> <action> <email_provider>
```
Actions: `keep`, `archive`, `delete`, `unsubscribe`

### Get labels
```bash
node /data/.openclaw/skills/inbox-guardian/scripts/get_labels.js
```

## Classification Labels (from email_labler_labels)
- Personal, Work, Transactional, Financial, Newsletter, Advertisement, Notification, Security, Spam, Unsubscribe

## Confidence Thresholds
| Action | Threshold |
|---|---|
| keep | ≥ 0.75 |
| archive | ≥ 0.80 |
| delete | ≥ 0.90 |
| unsubscribe | ≥ 0.95 |

## Gog CLI Path
**IMPORTANT:** gog is at `/data/gog-v0.12.0` (also at `/data/.cargo/bin/gog`). Always use the full path:
```bash
export PATH="/data/.cargo/bin:$PATH"
/data/gog-v0.12.0 --account suzy gmail search ...
```

## Gog Account Aliases
Use `gog auth alias` to manage provider nicknames:
```bash
/data/npm-global/bin/gog auth alias list
/data/npm-global/bin/gog auth alias set suzy suzzyp178@gmail.com
```

## Output
All scan results and reports go to **#email-labler** channel.
