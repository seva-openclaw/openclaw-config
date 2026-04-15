#!/bin/bash
# Instructions for setting up Gmail OAuth
# This is informational — actual OAuth needs browser

echo "=== Gmail OAuth Setup ==="
echo ""
echo "1. Go to https://console.cloud.google.com/apis/credentials"
echo "2. Create OAuth 2.0 Client ID (Desktop app)"
echo "3. Download the JSON file"
echo "4. Save it as: ~/workspace-coding/gmail-oauth/credentials.json"
echo ""
echo "Required scopes:"
echo "  https://www.googleapis.com/auth/gmail.modify"
echo "  https://www.googleapis.com/auth/gmail.labels"
echo ""
echo "On first run, the agent will open a browser for OAuth."
echo "Token will be saved to: ~/workspace-coding/gmail-oauth/token.json"
