FROM node:carbon

MAINTAINER Michael Williams <michael.williams@enspiral.com>

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install
COPY . .

HEALTHCHECK --interval=30s --timeout=30s --start-period=10s --retries=10 \
  CMD /usr/src/app/client/bin.js whoami || exit 1

USER node
EXPOSE 8008
ENTRYPOINT [ "/usr/src/app/server/bin.js" ]
