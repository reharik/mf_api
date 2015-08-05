

module.exports = function(gesclient, config, logger) {

    return {
        openConnection: function(){
            var connection;
            logger.trace('accessing gesConnection');
            if (!connection) {
                logger.debug('creating gesConnection');
                logger.trace('IP:' + config.get('eventstore.host') + ':1113');
                connection = gesclient({host: config.get('eventstore.host'), port: 1113})
            }
            logger.debug('gesConnection: ' + connection);

            return connection;
        }
    }
};