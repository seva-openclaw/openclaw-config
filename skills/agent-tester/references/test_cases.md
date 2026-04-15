# Agent Test Cases

Standard test catalog for any workspace-based OpenClaw subagent.

---

## 1. Identity
```
SEND: "What's your name? Who built you?"
EXPECT: Agent name, creator reference, workspace hint
FAIL:  Hallucinated name, no reference to workspace
```

## 2. Data Source
```
SEND: "Where does your data come from? What database or files do you use?"
EXPECT: Named source (Supabase, local JSON, SQLite, etc.)
FAIL:  Vague answer, wrong source, or "I don't know"
```

## 3. Tool Inventory
```
SEND: "What tools can you use? List your available commands."
EXPECT: File operations, database operations, Discord, web, etc.
FAIL:  Missing major tools, hallucinated capabilities
```

## 4. List Data
```
SEND: "Show me 3 items from your data"
EXPECT: Actual data from the database/file, properly formatted
FAIL:  Empty response, wrong data, "no items" when items exist
```

## 5. Create
```
SEND: "Add a new item: name=test_item_<unix_timestamp>, description='test'"
EXPECT: Item created, confirmation returned, item is queryable
FAIL:  No confirmation, item not findable afterward
```

## 6. Read After Create
```
SEND: "Show me the item you just created"
EXPECT: The exact item from test #5
FAIL:  Item not found, wrong data returned
```

## 7. Delete
```
SEND: "Delete the item you created (name contains test_item_)"
EXPECT: Deletion confirmed, item no longer queryable
FAIL:  Item still exists after delete
```

## 8. Verify Deletion
```
SEND: "Is the test item still there?"
EXPECT: Confirms item is gone
FAIL:  Reports item still exists
```

## 9. Invalid Input — Bad Time/ID
```
SEND: "Add an entry with start_time='not-a-time', end_time='99:99'"
EXPECT: Clear error message explaining the problem
FAIL:  Silently accepts, crashes, or hallucinated success
```

## 10. Unknown Location/Category
```
SEND: "Add an item with location='Springfield' (or unknown category)"
EXPECT: "Unknown location" or "Location not found" error
FAIL:  Silently accepts with null/wrong location
```

## 11. Empty State
```
SEND: "Show me all items" (on empty database)
EXPECT: Friendly "nothing here yet" message
FAIL:  Error, crash, or hallucinated data
```

## 12. Data Persistence
```
SEND: "Add item X, then ask 'What did I just add?'"
EXPECT: Correctly recalls the item added moments ago
FAIL:  Forgets, returns wrong item
```

## Agent-Specific Tests

### Shopping Agent
```
SEND: "What's on my shopping list?"
SEND: "Add milk and eggs to my shopping list"
SEND: "Mark milk as bought"
SEND: "Show me incomplete items only"
```

### Overtime Logger
```
SEND: "Show me today's overtime entries"
SEND: "Log 6:30 AM to 2:00 PM for Northport"
SEND: "Show me my locations"
SEND: "What's my total hours this week?"
```

### Todos Agent
```
SEND: "What's on my todo list?"
SEND: "Add: 'Update IAC 6.6 template' as high priority"
SEND: "Mark it as complete"
SEND: "Show me incomplete todos"
```

### Travel Agent
```
SEND: "Search flights NYC to LAX next Friday"
SEND: "Show me ITA Matrix results for economy class"
SEND: "What's the cheapest option?"
```

---

## Evaluation Sheet Template

```
| # | Test | Expected | Got | Pass? | Fix |
|---|------|----------|-----|-------|-----|
| 1 | Identity | Agent name + creator | ... | ✅/❌ | ... |
| 2 | Data source | Supabase URL or file path | ... | ✅/❌ | ... |
| 3 | List | 3 real items | ... | ✅/❌ | ... |
| 4 | Create | Item confirmed | ... | ✅/❌ | ... |
| 5 | Delete | Item gone | ... | ✅/❌ | ... |
...|
```
