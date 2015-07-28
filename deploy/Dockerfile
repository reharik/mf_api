FROM mf/nodebox

# Maintainer
MAINTAINER Raif Harik <reharik@gmail.com>

# Expose the node.js port to the Docker host.
EXPOSE 3000

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Entrypoint to docker shell
ENTRYPOINT ["docker-shell"]

# Startup commands
CMD ["-r"]

# set WORKDIR
WORKDIR /opt/app/current

# Add shell script for starting container
ADD ./docker-shell.sh /usr/bin/docker-shell
RUN chmod +x /usr/bin/docker-shell

ADD /app/package.json /tmp/package.json
RUN /bin/bash -c "cd /tmp && npm install && npm install -g babel  && cp -a /tmp/node_modules /opt/app/current/node_modules"

COPY /app /opt/app/current

