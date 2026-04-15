# agent-browser Command Reference

## Core Navigation

| Command | Description |
|---------|-------------|
| `agent-browser open <url>` | Navigate to a URL |
| `agent-browser back` | Navigate back in history |
| `agent-browser forward` | Navigate forward in history |
| `agent-browser reload` | Reload the current page |

## Interaction

| Command | Description |
|---------|-------------|
| `agent-browser click @<ref>` | Click an element |
| `agent-browser dblclick @<ref>` | Double-click an element |
| `agent-browser type @<ref> "<text>"` | Type text character-by-character |
| `agent-browser fill @<ref> "<text>"` | Fill input field (replaces content) |
| `agent-browser press <key>` | Press a keyboard key (e.g., `Enter`, `Escape`) |
| `agent-browser select @<ref> "<value>"` | Select an option by value |
| `agent-browser check @<ref>` | Check a checkbox |
| `agent-browser uncheck @<ref>` | Uncheck a checkbox |
| `agent-browser hover @<ref>` | Hover over an element |

## Snapshot

| Command | Description |
|---------|-------------|
| `agent-browser snapshot` | List all interactive elements with refs |
| `agent-browser snapshot -i` | Show only interactive elements |
| `agent-browser snapshot --compact` | Compact output |
| `agent-browser snapshot --ref <name> "<label>"` | Assign a name to an element |

## Info Extraction

| Command | Description |
|---------|-------------|
| `agent-browser get text @<ref>` | Get element text content |
| `agent-browser get html @<ref>` | Get element HTML |
| `agent-browser get value @<ref>` | Get input value |
| `agent-browser get attr @<ref> <name>` | Get element attribute |
| `agent-browser get title` | Get page title |
| `agent-browser get url` | Get current URL |

## State Checks

| Command | Description |
|---------|-------------|
| `agent-browser is visible @<ref>` | Check if element is visible |
| `agent-browser is enabled @<ref>` | Check if element is enabled |
| `agent-browser is checked @<ref>` | Check if checkbox is checked |

## Find Elements

| Command | Description |
|---------|-------------|
| `agent-browser find role <role>` | Find by ARIA role (button, link, etc.) |
| `agent-browser find text "<text>"` | Find by text content |
| `agent-browser find label "<text>"` | Find by label text |
| `agent-browser find placeholder "<text>"` | Find by placeholder text |

## Screenshot

| Command | Description |
|---------|-------------|
| `agent-browser screenshot` | Capture screenshot |
| `agent-browser screenshot --annotate` | Capture with annotations |

## Network

| Command | Description |
|---------|-------------|
| `agent-browser network route <pattern>` | Route matching URLs through browser |
| `agent-browser network unroute <pattern>` | Remove routing rule |

## Sessions

| Command | Description |
|---------|-------------|
| `agent-browser --session <name> <command>` | Run command in isolated session |
| `agent-browser sessions list` | List active sessions |

## Batch

| Command | Description |
|---------|-------------|
| `agent-browser batch "<commands>"` | Run multiple commands separated by `;;` |

Example:
```bash
agent-browser batch "open https://example.com ;; snapshot ;; click @e1 ;; type @e2 myuser ;; screenshot"
```

## Keyboard Shortcuts for `press`

- `Enter`, `Escape`, `Tab`, `Backspace`
- `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`
- `Home`, `End`, `PageUp`, `PageDown`
- Modifier keys: `Control`, `Alt`, `Shift`, `Meta` (combine with `+`, e.g., `Control+a`)
