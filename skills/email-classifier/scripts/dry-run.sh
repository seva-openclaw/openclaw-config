#!/bin/bash
# Run email agent in dry-run mode (classify only, don't act)
cd /data/workspace-coding/ai-assistant-dashboard/email-agent
DRY_RUN=true python main.py
