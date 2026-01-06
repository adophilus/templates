#!/bin/sh

set -e

export INFISICAL_TOKEN=$(infisical login --method=universal-auth --client-id=$INFISICAL_CLIENT_ID --client-secret=$INFISICAL_CLIENT_SECRET --domain $INFISICAL_DOMAIN --silent --plain)

eval "$(infisical export --projectId $INFISICAL_PROJECT_ID --env $NODE_ENV --domain $INFISICAL_DOMAIN --format=dotenv-export)"

echo "DOCS_PORT=$DOCS_PORT"
echo "FRONTEND_PORT=$FRONTEND_PORT"

cd build

cd docs
echo "Serving static docs..."
serve -p $DOCS_PORT &

cd ../frontend
echo "Serving static frontend..."
serve -p $FRONTEND_PORT &

cd ../backend 
echo "Starting backend..."
node ./server.mjs &

wait
