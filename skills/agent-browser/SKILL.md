---
name: agent-browser
description: Browser automation using agent-browser CLI. Use when you need to browse websites, fill forms, click elements, take screenshots, or extract data from web pages. Works with any AI agent. Installed globally via npm. Triggers on: browse, website, web page, click element, fill form, take screenshot, extract data from page, web scraping, web automation.
---

# Agent Browser

Browser automation via the `agent-browser` CLI daemon. The daemon auto-starts on first command and the browser session persists between commands.

## Quick Start

```bash
# Open a URL
agent-browser open https://example.com

# Take a snapshot to see interactive elements (use refs like @e1 in subsequent commands)
agent-browser snapshot

# Click an element
agent-browser click @e1

# Fill a form field
agent-browser fill @e2 "input text"

# Screenshot
agent-browser screenshot

# Close browser
agent-browser close
```

## Element Selection (Refs)

After running `snapshot`, elements are referenced by shorthand tokens:
- `@e1`, `@e2`, etc. — positional refs from last snapshot
- `@e1` refers to the first interactive element listed

Ref aliases can be used to name elements:
```
agent-browser snapshot --ref e1 "Submit Button"
agent-browser click @e1
```

## Session Isolation

Use `--session <name>` to isolate browser state. Each session has its own cookies, cache, and history.

```bash
# Work in an isolated session
agent-browser --session test-session open https://example.com
agent-browser --session test-session click @e1
agent-browser --session test-session close
```

**Security note**: Without `--session`, commands use a shared default session. Use `--session` when running untrusted automation to prevent state leakage between tasks.

## Common Commands

| Task | Command |
|------|---------|
| Open URL | `agent-browser open <url>` |
| Navigate back | `agent-browser back` |
| Navigate forward | `agent-browser forward` |
| Reload page | `agent-browser reload` |
| See elements | `agent-browser snapshot` |
| Click element | `agent-browser click @<ref>` |
| Type text | `agent-browser type @<ref> "<text>"` |
| Fill input | `agent-browser fill @<ref> "<text>"` |
| Screenshot | `agent-browser screenshot [--annotate]` |
| Close browser | `agent-browser close` |

## Daemon Behavior

- The daemon starts automatically on first command if not running
- Browser state persists until explicitly closed or session ends
- Use `agent-browser --session <name>` for isolation between tasks

## Cloud Browser (Browserbase)

When running in an environment without Chrome dependencies, use Browserbase for cloud-hosted browsers.

```bash
# Set up once
brew install agent-browser
agent-browser install

# Configure Browserbase
# Add to ~/.agent-browser/config.json:
{
  "provider": "browserbase",
  "browserbase": {
    "apiKey": "bb_live_..."
  }
}

# Or use -p flag with env var
export BROWSERBASE_API_KEY="bb_live_..."
agent-browser -p browserbase open https://example.com
agent-browser -p browserbase snapshot
agent-browser -p browserbase click @e1
agent-browser -p browserbase close
```

**Get your API key**: https://www.browserbase.com/settings

## Local Chrome Installation Note

Chrome/Chromium is installed via `agent-browser install --with-deps`. If dependency installation fails (missing apt-get), use Browserbase provider instead.

## Full Command Reference

See [references/commands.md](references/commands.md) for the complete command reference including network routing, batch commands, and state queries.
