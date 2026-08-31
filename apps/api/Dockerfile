# syntax=docker/dockerfile:1
FROM oven/bun:1.3.9-alpine AS deps

WORKDIR /app

# Workspace manifests only, so the install layer survives source edits.
COPY package.json bun.lock tsconfig.base.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages/contracts/package.json packages/contracts/

RUN bun install --frozen-lockfile

FROM deps AS build

COPY packages/contracts packages/contracts
COPY apps/api apps/api

WORKDIR /app/apps/api
# prisma.config.ts resolves DATABASE_URL eagerly; generate does not connect, so
# a placeholder is enough and never reaches the runtime image.
RUN DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder" \
    bunx prisma generate

FROM oven/bun:1.3.9-alpine AS runtime

WORKDIR /app

RUN addgroup -S app && adduser -S -G app app

COPY --from=build --chown=app:app /app /app

USER app

ENV NODE_ENV=production
EXPOSE 3000

WORKDIR /app/apps/api

# migrate deploy is idempotent and only applies pending migrations.
CMD ["sh", "-c", "bunx prisma migrate deploy && exec bun src/index.ts"]
