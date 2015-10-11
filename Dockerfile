FROM mf_nodebox:latest

MAINTAINER reharik@gmail.com

ENV PLUGIN_HOME /home/current

RUN mkdir -p $PLUGIN_HOME

ADD ./package.json ./package.json
ADD ./config ./config

RUN npm install

WORKDIR $PLUGIN_HOME

ADD ./app $PLUGIN_HOME/app
