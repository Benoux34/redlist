#!/usr/bin/env bash
# Deploys whatever is on origin/main. Run it on the VPS, or from a workstation
# with: bun run deploy
#
# --build runs every time on purpose: unchanged layers are served from the
# cache in seconds, and that removes the one judgement call this script exists
# to eliminate -- "does this change need a rebuild?". Getting it wrong ships a
# stale bundle that looks deployed.
set -euo pipefail

cd "$(dirname "$0")/.."

COMPOSE=(docker compose -f docker-compose.prod.yml --env-file .env.prod)

echo "==> Pulling"
git pull --ff-only

echo "==> Building and starting"
"${COMPOSE[@]}" up -d --build

echo "==> Waiting for health"
for _ in $(seq 1 30); do
  if curl -fsS -m 5 http://127.0.0.1:8080/health | grep -q '"status":"ok"'; then
    echo "==> Healthy. Deployed $(git rev-parse --short HEAD)."
    exit 0
  fi
  sleep 2
done

echo "!! Still unhealthy after 60s. Last API logs:" >&2
"${COMPOSE[@]}" logs --tail 40 api >&2
exit 1
