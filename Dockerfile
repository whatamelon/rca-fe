# This template uses Automatically Copying Traced Files feature
# so you need to setup your Next Config file to use `output: 'standalone'`
# Please read this for more information https://nextjs.org/docs/pages/api-reference/next-config-js/output

# Production image, copy all the files and run next
FROM docker.io/node:lts-alpine AS runner
RUN apk add --no-cache dumb-init

ARG BUILD_ENV=${BUILD_ENV}
ENV NODE_ENV=${BUILD_ENV}

RUN echo "SET NODE_ENV: ${NODE_ENV}"
RUN echo "SET BUILD_ENV: ${BUILD_ENV}"
ENV PORT=8010
WORKDIR /usr/src/app

COPY .env.${BUILD_ENV} ./
COPY next.config.ts ./
COPY public ./public

COPY .next/standalone ./
COPY .next/standalone/package.json ./
COPY .next/standalone/node_modules ./node_modules
COPY .next/static ./.next/static
# RUN npm i sharp
RUN chown -R node:node .
USER node
EXPOSE 8010
# COPY --chown=node:node ./tools/scripts/entrypoints/api.sh /usr/local/bin/docker-entrypoint.sh
# ENTRYPOINT [ "docker-entrypoint.sh" ]
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["dumb-init", "node", "server.js"]