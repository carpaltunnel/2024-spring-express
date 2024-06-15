FROM ubuntu:latest

RUN apt update 
RUN apt install -y nodejs

RUN mkdir -p /usr/local/express-api

COPY . /usr/local/express-api/

# TODO : Auto-build/copy the Angular app

EXPOSE 3000

WORKDIR /usr/local/express-api
ENTRYPOINT ["node", "/usr/local/express-api/index.js"]

