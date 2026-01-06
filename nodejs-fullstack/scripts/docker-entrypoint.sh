#!/bin/sh

echo "INFISICAL_CLIENT_ID=$INFISICAL_CLIENT_ID<---"
export INFISICAL_TOKEN=$(infisical login --method=universal-auth --client-id=$INFISICAL_CLIENT_ID --client-secret=$INFISICAL_CLIENT_SECRET --domain $INFISICAL_DOMAIN --silent --plain)

set -e

cd build

cd docs
bun x serve --port $DOCS_PORT &

cd ../frontend
bun x serve --port $FRONTEND_PORT &

cd ../backend 
infisical run \
  --projectId $INFISICAL_PROJECT_ID \
  --env $NODE_ENV \
  --domain $INFISICAL_DOMAIN \
  --command "node ./server.mjs" &