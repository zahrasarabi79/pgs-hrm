FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json .
# COPY .npmrc .

ENV NODE_ENV=development

RUN npm install \
    --ignore-scripts \
    --prefer-offline \
    --frozen-lockfile \
    --non-interactive

COPY . .

ENV NODE_ENV=production

RUN npm run build

RUN rm -rf node_modules && \
    npm install \
    --ignore-scripts \
    --prefer-offline \
    --pure-lockfile \
    --non-interactive \
    --omit=dev && \
    rm -rf .npmrc

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 80

ENV HOST=0.0.0.0
ENV PORT=80

CMD ["yarn", "start"]
