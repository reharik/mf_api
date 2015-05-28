FROM ubuntu

# Maintainer
MAINTAINER Raif Harik <reharik@gmail.com>

# Install your application's dependencies
RUN apt-get -qq update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash - && \
    apt-get -y install python build-essential nodejs


ADD package.json /tmp/package.json
RUN cd /tmp && npm install && mkdir -p /usr/src/app && cp -a /tmp/node_modules /api

COPY /home/rharik/Development/MethodFitness/MF_BuildFiles/Api /
WORKDIR /api

# Expose the node.js port to the Docker host.
EXPOSE 3000

#CMD [ "npm run start" ]

