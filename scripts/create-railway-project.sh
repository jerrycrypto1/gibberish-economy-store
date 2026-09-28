#!/usr/bin/env bash
# Creates and links the Railway project for Gibberish Economy.
# Requires: railway CLI + an authenticated account (railway login).
set -euo pipefail
cd "$(dirname "$0")/.."

if ! command -v railway >/dev/null 2>&1; then
  echo "Installing Railway CLI…"
  bash <(curl -fsSL railway.com/install.sh)
  export PATH="$HOME/.railway/bin:$PATH"
fi

echo "Logged in as: $(railway whoami || true)"
if ! railway whoami >/dev/null 2>&1; then
  echo "Not authenticated. Run: railway login"
  echo "Headless: railway login --browserless"
  exit 1
fi

railway init --name gibberish-economy-store
railway add --database postgres || true
railway variable set DATABASE_URL='${{Postgres.DATABASE_URL}}'
railway variable set ADMIN_KEY="$(openssl rand -hex 24)"
railway variable set NEXT_PUBLIC_SITE_URL='https://unused.up.railway.app'
echo "Deploying…"
railway up --detach
echo "Generate a public domain from the canvas (Networking) or:"
echo "  railway domain"
echo "Then set NEXT_PUBLIC_SITE_URL to that https URL and redeploy."
railway status || true
