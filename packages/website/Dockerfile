FROM tic-tac-toe_common

COPY packages/website/package.json \
  packages/website/tsconfig.json \
  packages/website/webpack.config.js \
  packages/website/.env \
  packages/website/
COPY packages/website/src packages/website/src/
COPY packages/website/public packages/website/public/

RUN true && \
  npm run website:build && \
  rm -rf ./node_modules \
    packages/common \
    packages/website/.env \
    packages/website/src \
    packages/website/public/main.js.map \
    packages/website/tsconfig.json \
    packages/website/webpack.config.js && \
  mv ./prod_node_modules ./node_modules


# FROM node:18.13.0-alpine

# WORKDIR /app

# COPY --from=0 /app ./

ENTRYPOINT npm run website:start
