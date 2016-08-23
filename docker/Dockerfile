FROM mf_node:latest

MAINTAINER reharik@gmail.com

ADD ./package.json ./package.json

RUN npm install --silent

ADD ./config ./config
ADD ./app /$HOME/app
