#!/usr/bin/env bash

infisical run \
  --projectId $INFISICAL_PROJECT_ID \
  --env $NODE_ENV \
  --domain $INFISICAL_DOMAIN \
  --command "pnpm build:docs && pnpm start:docs"
