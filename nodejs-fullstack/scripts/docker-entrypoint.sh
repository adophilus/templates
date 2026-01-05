#!/bin/sh

export INFISICAL_TOKEN=$(infisical login --method=universal-auth --client-id=$INFISICAL_CLIENT_ID --client-secret=$INFISICAL_CLIENT_SECRET --domain $INFISICAL_DOMAIN --silent --plain)

set -e

if [ "$1" = "backend" ]; then
  echo "Starting backend..."
  exec ./apps/backend/scripts/docker-entrypoint.sh
else
  echo "Error: Invalid argument. Use 'backend' or 'docs'." >&2
  exit 1
fi
