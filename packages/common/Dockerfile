FROM node:18.13.0-alpine AS base

WORKDIR /app

COPY package-docker-prod.json package.json
COPY package-lock.json ./
COPY packages/common/package-docker-prod.json packages/common/package.json
COPY packages/api/package-docker-prod.json packages/api/package.json
COPY packages/website/package-docker-prod.json packages/website/package.json

RUN npm ci --prod && mv ./node_modules ./prod_node_modules

COPY package-docker.json package.json
COPY packages/common/package-docker.json packages/common/package.json
COPY packages/api/package-docker.json packages/api/package.json
COPY packages/website/package-docker.json packages/website/package.json

RUN npm ci

COPY package.json .nvmrc ./
COPY helpers helpers/
COPY .vscode .vscode/
COPY packages/common/package.json packages/common/tsconfig.json packages/common/tsconfig.base.json packages/common/
COPY packages/common/src packages/common/src/

RUN true && \
  npm run common:build && \
  rm -rf package-lock.json \
    packages/common/src \
    packages/common/tsconfig.json \
    packages/api \
    packages/website


FROM node:18.13.0-alpine

WORKDIR /app

COPY --from=base /app ./

# ENTRYPOINT tail -f /dev/null
# ENTRYPOINT sleep 60
