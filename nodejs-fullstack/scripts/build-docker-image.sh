#!/bin/sh

docker build -t nodejs-fullstack-template \
  --file ./Dockerfile \
  --progress plain \
  --secret id=NODE_ENV,env=NODE_ENV \
  --secret id=INFISICAL_CLIENT_ID,env=INFISICAL_CLIENT_ID \
  --secret id=INFISICAL_CLIENT_SECRET,env=INFISICAL_CLIENT_SECRET \
  --secret id=INFISICAL_PROJECT_ID,env=INFISICAL_PROJECT_ID \
  --secret id=INFISICAL_DOMAIN,env=INFISICAL_DOMAIN \
  .
