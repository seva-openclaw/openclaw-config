---
name: interview
description: Conduct structured interviews using Discord interactive components (dropdowns, buttons). Use whenever you need to gather project requirements, clarify ambiguity, probe edge cases, or extract detailed specifications from the user. Triggers on: "interview me", "start interview", "be interviewed", "I want to be interviewed", or when you need to ask clarifying questions about a project, feature, or task. Presents multi-choice options via Discord select/dropdown components, yes-no via button rows, and A/B/C via select components.
---

# Interview Skill

Use Discord interactive components to conduct structured interviews when you need to gather requirements, clarify project details, or probe edge cases.

## When to Use This Skill

- User asks to be "interviewed" about a project, spec, or feature
- You need to ask clarifying questions about an ambiguous request
- Gathering requirements for a new project or feature
- Probing edge cases, tradeoffs, or second-order effects
- Extracting detailed specifications from the user

## Interaction Components

### Multi-Choice (3+ Options) → `select` Component

```javascript
{
  "type": "select",
  "placeholder": "Choose an option...",
  "options": [
    { "label": "A) Grid layout", "value": "grid" },
    { "label": "B) List layout", "value": "list" },
    { "label": "C) Masonry layout", "value": "masonry" }
  ]
}
```

### Yes/No → `buttons` Component

```javascript
{
  "type": "buttons",
  "buttons": [
    { "label": "✅ Yes", "value": "yes", "style": "primary" },
    { "label": "❌ No", "value": "no", "style": "secondary" }
  ]
}
```

### A/B Choice → `select` Component

```javascript
{
  "type": "select",
  "placeholder": "Select A or B...",
  "options": [
    { "label": "A) Fast deployment", "value": "a" },
    { "label": "B) Full testing", "value": "b" }
  ]
}
```

## Interview Flow

### 1. Opening

Acknowledge the topic and dive straight into questions. No brain-dump or preamble.

**Example:** "I'll interview you about the new dashboard. Let's start."

### 2. One Question Per Message

Ask only one question at a time using interactive components. Wait for the user's selection before proceeding.

### 3. Track Coverage

Build a mental model as you go. Note:
- Topics covered
- Edge cases mentioned
- Gaps identified (e.g., "mentioned UI but nothing about error handling")

### 4. Probing Strategy

- **Surface-level answer** → Follow up with specific tradeoffs
- **"I don't know"** → Offer 2-3 concrete options with tradeoffs
- **Contradiction detected** → Call it out immediately
- **Gap identified** → Probe before moving on

### 5. Completion

**Soft cap: 15-20 questions.** Wrap up when:
- Core functionality is defined
- Key edge cases addressed
- No obvious gaps remain

If major gaps exist: "You haven't mentioned authentication—should I probe that before we wrap?"

## Spec Output

When ready to write the spec:

1. **Announce sections first:** "Based on our conversation, I'll structure the spec with: Overview, Requirements, Technical Details, Edge Cases, Open Questions."

2. **Ask where to save:** Use a select with common locations or let user specify.

3. **Write to file** using the `write` tool.

## Question Examples

### Layout Question
```javascript
// Select component
{
  "type": "select",
  "placeholder": "What layout for the main page?",
  "options": [
    { "label": "A) Grid", "value": "grid" },
    { "label": "B) List", "value": "list" },
    { "label": "C) Masonry", "value": "masonry" }
  ]
}
```

### Error Handling
```javascript
// Select component
{
  "type": "select",
  "placeholder": "How should failures be handled?",
  "options": [
    { "label": "A) Silent retry", "value": "silent_retry" },
    { "label": "B) User notification", "value": "notify" },
    { "label": "C) Fail fast with error", "value": "fail_fast" }
  ]
}
```

### Yes/No Confirmation
```javascript
// Buttons
{
  "type": "buttons",
  "buttons": [
    { "label": "✅ Continue", "value": "yes", "style": "primary" },
    { "label": "❌ Stop", "value": "no", "style": "secondary" }
  ]
}
```

## Tone

- Stay neutral and clinical
- Pure information extraction—no conversational filler
- Be direct: get to the point, don't hedge
- Push back on contradictions, probe gaps
