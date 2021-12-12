FROM node:16 AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock
RUN yarn install --frozen-lockfile

FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./
COPY ./src /src/
COPY --from=deps /app/node_modules ./node_modules
RUN yarn run build

FROM node:16-alpine AS main
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S turbocache -u 1001

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules ./node_modules

USER turbocache

CMD ["node" "dist/index.js"]
