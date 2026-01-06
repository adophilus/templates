#!/bin/sh

export INFISICAL_TOKEN=$(infisical login --method=universal-auth --client-id=$INFISICAL_CLIENT_ID --client-secret=$INFISICAL_CLIENT_SECRET --domain $INFISICAL_DOMAIN --silent --plain)

set -e

infisical run \
  --projectId $INFISICAL_PROJECT_ID \
  --env $NODE_ENV \
  --domain $INFISICAL_DOMAIN \
  --command "pnpm build"

pnpm typecheck
pnpm lint
pnpm audit --audit-level high
# pnpm test

mkdir build

cp -r ./apps/backend/build ./build/backend
cp -r ./apps/docs/docs/.vitepress/dist ./build/docs
cp -r ./apps/frontend/dist ./build/frontend
echo '{"type": "module"}' > ./build/backend/package.json