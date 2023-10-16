FROM node:18 AS dependencies

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18 AS build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build
COPY migrate-and-start.sh .
RUN chmod +x migrate-and-start.sh

FROM node:18 AS deploy

WORKDIR /app

ENV NODE_ENV production

COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/migrate-and-start.sh .

EXPOSE 3000

ENV PORT 3000

CMD ["./migrate-and-start.sh"]
