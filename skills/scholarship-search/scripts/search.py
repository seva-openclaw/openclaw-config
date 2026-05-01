#!/usr/bin/env python3
"""Search scholarships on scholibuddy.com via natural language query."""

import json
import os
import sys
import urllib.request
import urllib.error

# TODO: Update to final URL once deployed
BASE_URL = "https://api.scholibuddy.ai"
ENDPOINT = f"{BASE_URL}/api/n8n/search"


def search(query: str) -> list[dict]:
    api_key = os.environ.get("SCHOLIBUDDY_API_KEY")
    if not api_key:
        print("Error: SCHOLIBUDDY_API_KEY environment variable not set.")
        sys.exit(1)

    payload = json.dumps({"query": query}).encode("utf-8")

    req = urllib.request.Request(
        ENDPOINT,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "X-API-Key": api_key,
        },
        method="POST",
    )
    # Force HTTP/1.1 to avoid HTTP/2 protocol errors with some servers
    req.add_header("Connection", "close")

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.reason}")
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"Network Error: {e.reason}")
        sys.exit(1)

    if not data.get("success"):
        print("API returned success=false")
        sys.exit(1)

    results = data.get("data", [])
    return results


def main():
    if len(sys.argv) < 2:
        print("Usage: search.py <query>")
        sys.exit(1)

    query = " ".join(sys.argv[1:])
    if len(query) < 5:
        print("Query must be at least 5 characters.")
        sys.exit(1)

    results = search(query)

    if not results:
        print("No scholarships found matching that profile.")
    else:
        print(f"Found {len(results)} scholarship(s):\n")
        for r in results:
            print(f"  Title: {r['title']}")
            print(f"  URL:   {r['url']}")
            print(f"  Desc:  {r['description']}")
            print()

    # Also output raw JSON for programmatic use
    print("---RAW---")
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
