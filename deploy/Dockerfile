FROM mf/nodebox

# Maintainer
MAINTAINER Raif Harik <reharik@gmail.com>

# Expose the node.js port to the Docker host.
EXPOSE 3000

# set WORKDIR
WORKDIR /opt/app/current

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ADD /app/package.json /opt/app/current/package.json
RUN  npm install

# Entrypoint to docker shell
ENTRYPOINT ["docker-shell"]

#this is the flag that tells the docker-shell what mode to execute
# Startup commands
CMD ["-r"]


# Add shell script for starting container
ADD ./docker-shell.sh /usr/bin/docker-shell
RUN chmod +x /usr/bin/docker-shell

COPY /app /opt/app/current

