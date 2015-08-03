/**
 * Created by parallels on 7/22/15.
 */

module.exports = function(pgbluebird, config, uuid, logger){
    return {
        getById(id,table){
            var pgb = new pgbluebird();
            var cnn;

            pgb.connect(config.get('postgres.connectionString') + config.get('postgres.methodFitness'))
                .then(function (connection) {
                    cnn = connection;
                    return cnn.client.query("SELECT * from "+table+" where Id = "+id);
                })
                .then(function (result) {
                    var row = result.rows;
                    cnn.done();
                    // lame use async await
                    return row.document;
                })
                .catch(function (error) {
                    logger.error('error received during query for table: ' + table+' Id: ' + id+" : " +error.message);
                    console.log(error);
                });
        },

        save(table, document, id){
            var pgb = new pgbluebird();
            var cnn;

            pgb.connect(config.get('postgres.connectionString') + config.get('postgres.methodFitness'))
                .then(function (connection) {
                    cnn = connection;
                    if(id){
                        return cnn.client.query("UPDATE "+table+" SET document = "+document+" where Id = "+id);
                    }else{
                        return cnn.client.query("INSERT INTO "+table+" (id, document) VALUES ("+uuid.v4()+","+document+")");
                    }
                })
                .then(function (result) {
                    cnn.done();
                    return result;
                })
                .catch(function (error) {
                    logger.error('error received saving to table: ' + table+" : " +error.message);
                    console.log(error);
                });
        },

        isIdempotent(originalPosition, eventHandlerName){
            var pgb = new pgbluebird();
            var cnn;
            pgb.connect(config.get('postgres.connectionString') + config.get('postgres.methodFitness'))
                .then(function (connection) {
                    cnn = connection;
                    logger.info('getting last processed postion for eventHandler ' + eventHandlerName);
                    return cnn.client.query("SELECT * from lastProcessedPosition where handlerType = eventHandlerName");
                })
                .then(function (result) {
                    var row = result.rows;
                    logger.trace('last process position for eventHandler ' + eventHandlerName +': '+row.commitPosition);
                    cnn.done();
                    // lame use async await
                    var isIdempotent = row && row.CommitPosition < originalPosition.CommitPosition;
                    logger.info('eventHandler ' + eventHandlerName + ' event idempotence is: '+isIdempotent);
                    return isIdempotent;
                })
                .catch(function (error) {
                    logger.error('error received during last process position call for eventHandler ' + eventHandlerName +': '+error.message);
                    console.log(error);
                });
        },

        recordEventProcessed(originalPosition, eventHandlerName){
            var pgb = new pgbluebird();
            var cnn;

            if (!originalPosition.HasValue) {
                throw new Error("ResolvedEvent didn't come off a subscription at all (has no position).");
            }

            pgb.connect(config.get('postgres.connectionString') + config.get('postgres.methodFitness'))
                .then(function (connection) {
                    cnn = connection;
                    logger.trace('setting last process position for eventHandler ' + eventHandlerName +': '+originalPosition.commitPosition);

                    cnn.client.query("UPDATE lastProcessPosition " +
                        "SET commitPosition = "+originalPosition.CommitPosition +
                        ", preparePosition = "+originalPosition.PreparePosition +
                        ", eventHandler = "+eventHandlerName +
                        "WHERE Id = "+row.Id);
                })
                .then(function (result) {
                    cnn.done();
                    return result;
                })
                .catch(function (error) {
                    logger.error('error received during record event processed call for eventHandler ' + eventHandlerName +': '+error.message);
                    console.log(error);
                });

        }
    }
};