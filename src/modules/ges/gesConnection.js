/**
 * Created by reharik on 7/26/15.
 */

module.exports = function(gesclient, config, logger) {
    return {
        openConnection: function(){
            var connection;
            logger.trace('accessing gesConnection');
            if (!connection) {
                logger.debug('creating gesConnection');
                logger.trace('IP:' + config.get('eventstore.ip') + ':1113');
                connection = gesclient({ip: config.get('eventstore.ip'), tcp: 1113})
            }
            logger.debug('gesConnection: ' + connection);

            return connection;
        }
    }
};