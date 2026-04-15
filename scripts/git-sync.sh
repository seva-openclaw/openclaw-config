#!/bin/bash
cd /data/.openclaw
git add -A
if git diff --staged --quiet; then
    echo "No changes"
else
    git commit -m "Auto-sync: $(date -u '+%Y-%m-%d %H:%M UTC')"
    git push origin main
fi
