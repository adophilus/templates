FROM oven/bun:alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache python3 make g++ bash nodejs npm
RUN bun add -g pnpm
RUN npm add -g @infisical/cli@0.41.1

WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile

RUN ./scripts/docker-build-script.sh

ENTRYPOINT ["./scripts/docker-entrypoint.sh"]
