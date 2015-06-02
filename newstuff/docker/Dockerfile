# Dockerfile for a Node application using pm2
FROM xolocalvendors/nodebox:latest

MAINTAINER Local Services <LocalServices@xogrp.com>

# Publish port 8000
EXPOSE 8000

# Entrypoint to docker shell
ENTRYPOINT ["docker-shell"]
  
# Startup commands
CMD ["-r"]

# set WORKDIR
WORKDIR /opt/app/current

# Add shell script for starting container
ADD ./docker/docker-shell.sh /usr/bin/docker-shell
RUN chmod +x /usr/bin/docker-shell

# Add files for caching purposes
ADD .nvmrc .nvmrc
ADD .npmrc .npmrc
ADD npm-shrinkwrap.json npm-shrinkwrap.json
ADD package.json package.json

# Install the right node version
RUN /bin/bash -c "source /root/.nvm/nvm.sh && nvm install `cat .nvmrc` 2> /dev/null || nvm install 0.12.2"

# Install node_modules
RUN /bin/bash -c "source /root/.nvm/nvm.sh && nvm use && npm install"

# Add project to project directory
ADD . /opt/app/current