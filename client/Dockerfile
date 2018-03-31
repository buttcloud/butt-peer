FROM node:carbon

MAINTAINER Michael Williams <michael.williams@enspiral.com>

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install
COPY . .

USER node
EXPOSE 8008
ENTRYPOINT [ "/usr/src/app/client/bin.js" ]
