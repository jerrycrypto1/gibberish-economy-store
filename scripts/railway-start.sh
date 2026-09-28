#!/bin/sh
set -e
if [ -n "$DATABASE_URL" ]; then
  echo "Applying Prisma migrations…"
  npx prisma migrate deploy || echo "migrate failed — app will still boot"
fi
export PORT="${PORT:-3000}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"
exec node server.js
