---
name: driver-mode
description: Driving mode control for voice-first interaction while driving. Use when Seva says "I'm driving", "turn on driving mode", "driver mode on", or needs to toggle TTS/voicemail behavior. Commands: driver_mode on, driver_mode off, driver_mode status.
---

# Driver Mode

Controls TTS/voicemail behavior and driving mode state.

## State File
`/data/workspace-coding/driving_mode.txt` — values: `on` or `off`

## Commands

### driver_mode on
Turn on driving mode. Write `on` to state file. When active:
- Send TTS (voicemail) with every reply
- End every message with "📱 Driving mode on"

### driver_mode off
Turn off driving mode. Write `off` to state file. When off:
- No TTS unless explicitly requested
- To request TTS: say "send voicemail", "respond with voice", or "voice reply"

### driver_mode status
Read state file and report current mode.

## TTS Behavior

| Mode | TTS |
|------|-----|
| Driving mode ON | Always on — prepend voice to every reply |
| Driving mode OFF | Off by default — only use TTS if Seva explicitly asks for voice |

## Implementation

Use the helper script for reliable state changes:
```bash
node /data/.openclaw/skills/driver-mode/scripts/driver_mode.js <on|off|status>
```

The script atomically writes the state file and returns the new value.

## Tagging

When driving mode is ON, always end messages with:
```
📱 Driving mode on
```

## Voice Message Format

When sending TTS, use the `tts` tool:
- Text: the full reply text condensed into a speakable summary (~2-4 sentences max)
- Channel: pass the current channel id
