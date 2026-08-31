# syntax=docker/dockerfile:1
FROM oven/bun:1.3.9-alpine AS build

WORKDIR /app

COPY package.json bun.lock tsconfig.base.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages/contracts/package.json packages/contracts/

RUN bun install --frozen-lockfile

COPY packages/contracts packages/contracts
COPY apps/web apps/web

# No VITE_API_URL: the bundle calls /api on its own origin.
RUN cd apps/web && bun run build

FROM nginx:1.27-alpine AS runtime

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80
