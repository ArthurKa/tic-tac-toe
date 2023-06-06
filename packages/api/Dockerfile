FROM tic-tac-toe_common

COPY packages/api/package.json packages/api/tsconfig.json packages/api/
COPY packages/api/src packages/api/src/

RUN true && \
  npm run api:build && \
  rm -rf ./node_modules \
    packages/common/tsconfig.base.json \
    packages/api/src \
    packages/api/tsconfig.json && \
  mv ./prod_node_modules ./node_modules


# FROM node:18.13.0-alpine

# WORKDIR /app

# COPY --from=0 /app ./

ENTRYPOINT npm run api:start
