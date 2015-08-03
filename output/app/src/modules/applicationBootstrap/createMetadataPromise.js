/**
 * Created by rharik on 6/12/15.
 */

module.exports = function setMetadataPromise(Promise, gesclient, invariant, config, logger, gesConnection) {
    return function () {
        logger.trace('wrapping setMetadata in Promise');
        var setData = {
            expectedMetastreamVersion: -1
            , metadata: gesclient.createStreamMetadata({
                acl: {
                    readRoles: gesclient.systemRoles.all
                }
            })
            , auth: {
                username: config.get('eventstore.systemUsers.admin')
                , password: config.get('eventstore.adminPassword')
            }
        };

        return new Promise(function (resolve, reject) {
            gesConnection.setStreamMetadata('$all', setData, function (err, result) {
                logger.trace('setMetadata callback');
                if (err) {
                    logger.debug('rejecting setMetadata Promise with error message: ' + err);
                    reject(err);
                } else {
                    logger.debug('resolving setMetadata Promise with response: ' + result);
                    resolve(result);
                }
            });
        });
    };
};

