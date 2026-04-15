#!/bin/bash
# Check if all required tokens/env vars are set

echo "=== Email Agent Token Check ==="

echo -n "ANTHROPIC_API_KEY: "
[ -n "$ANTHROPIC_API_KEY" ] && echo "✓ SET" || echo "✗ MISSING"

echo -n "SUPABASE_SERVICE_KEY: "
[ -n "$SUPABASE_SERVICE_KEY" ] && echo "✓ SET" || echo "✗ MISSING"

echo -n "SUPABASE_URL: "
[ -n "$SUPABASE_URL" ] && echo "✓ SET ($SUPABASE_URL)" || echo "✗ MISSING"

echo -n "Gmail credentials: "
[ -f "~/workspace-coding/gmail-oauth/credentials.json" ] && echo "✓ EXISTS" || echo "✗ MISSING"

echo -n "Gmail token: "
[ -f "~/workspace-coding/gmail-oauth/token.json" ] && echo "✓ EXISTS" || echo "✗ MISSING (run OAuth flow first)"
