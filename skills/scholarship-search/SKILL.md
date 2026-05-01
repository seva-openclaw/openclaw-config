---
name: scholarship-search
description: Search for scholarships on scholibuddy.com using natural language queries. Use when users ask about finding scholarships, scholarship recommendations, or "what scholarships can I get". Triggers on: scholarship search, find scholarships, scholarship for [profile], "am I eligible for", "what scholarships match".
---

# Scholarship Search

Search scholibuddy.com's scholarship database using natural language queries.

## API Details

- **Endpoint:** `POST /api/n8n/search`
- **Header:** `X-API-Key: $SCHOLIBUDDY_API_KEY`
- **Base URL:** `https://api.scholibuddy.ai`

## Usage

Use the bundled script to search:

```bash
python3 /data/workspace-scholibuddy/skills/scholarship-search/scripts/search.py "female undergraduate nursing student in Texas"
```

The script reads `SCHOLIBUDDY_API_KEY` from environment variables.

## Query Tips

- Describe the student profile naturally (e.g., "female undergraduate nursing student in Texas")
- Include: field of study, degree level, demographics, location, GPA, extracurriculars
- More specific queries = better matches
- Query length: 5–2000 characters

## Response

Returns 0–3 results, each with:
- `url` — full scholarship page URL on scholibuddy.com
- `title` — scholarship name
- `description` — brief eligibility summary

## Rate Limits

- 30 requests per 15 minutes per API key
- If rate limited, wait and retry.

## Fetching Scholarship Details

To get full details on a scholarship, fetch the page directly:
```
web_fetch(url)
```
