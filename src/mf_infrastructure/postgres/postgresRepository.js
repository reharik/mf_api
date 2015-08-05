/**
 * Created by parallels on 7/22/15.
 */

module.exports = function(pgbluebird, Promise, config, uuid, logger, JSON){
    return {
        async getById(id, table){
            var pgb = new pgbluebird();
            try {
                var cnn = pgb.connect(config.get('postgres.connectionString') + config.get('postgres.methodFitness'));
                var result = await cnn.client.query('SELECT * from "' + table + '" where "Id" = \'' + id + '\'');
                var row = result.rows;
                cnn.done();
                return row.document;
            } catch (error) {
                logger.error('error received during query for table: ' + table + ' Id: ' + id + " : " + error.message);
                console.log(error);
            }
        },

        async save(table, document, id){
            console.log("document");
            console.log(document);
            var pgb = new pgbluebird();
            var result;
            try {
                var cnn = await pgb.connect(config.get('postgres.connectionString') + config.get('postgres.methodFitness'));
                if (id) {
                    result = await cnn.client.query('UPDATE "' + table + '" SET document = \'' + document + '\' where Id = \'' + id + '\'');
                } else {
                    var statement = 'INSERT INTO "' + table + '" ("id", "document") VALUES (\'' + uuid.v4() + '\',\'' + JSON.stringify(document) + '\')';
                    logger.info(statement);
                    result = await cnn.client.query(statement);
                }
                cnn.done();
                return 'success';
            } catch (error) {
                logger.error('error received saving to table: ' + table + ". msg: " + error.message);
                console.log(error);
            }
        },

        async checkIdempotency(originalPosition, eventHandlerName){
            var pgb = new pgbluebird();
            try {
                var cnn = await pgb.connect(config.get('postgres.connectionString') + config.get('postgres.methodFitness'));
                logger.info('getting last processed postion for eventHandler ' + eventHandlerName);

                var result = await cnn.client.query('SELECT * from "lastProcessedPosition" where "handlerType" = \'' + eventHandlerName + '\'');
                var row = result.rows;
                logger.trace('last process position for eventHandler ' + eventHandlerName + ': ' + row.commitPosition);
                cnn.done();

                var isNewStream = !row || row.length <= 0;
                var isIdempotent = isNewStream || row.CommitPosition < originalPosition.CommitPosition;
                logger.info('eventHandler ' + eventHandlerName + ' event idempotence is: ' + isIdempotent);
                return {isIdempotent: isIdempotent, isNewStream: isNewStream};
            } catch (error) {
                logger.error('error received during last process position call for eventHandler ' + eventHandlerName + ': ' + error.message);
                console.log(error);
            }
        },

        async recordEventProcessed(originalPosition, eventHandlerName, isNewSteam){
            var pgb = new pgbluebird();
            var result;
            if (!isNewSteam && !originalPosition.HasValue) {
                throw new Error("ResolvedEvent didn't come off a subscription at all (has no position).");
            }
            try {
                var cnn = await pgb.connect(config.get('postgres.connectionString') + config.get('postgres.methodFitness'));
                logger.trace('setting last process position for eventHandler ' + eventHandlerName + ': ' + originalPosition.commitPosition);
                if(isNewSteam) {
                    logger.info("creating first position for handler: " + eventHandlerName );
                    result = await cnn.client.query('INSERT INTO "lastProcessedPosition" ' +
                        ' ("id", "commitPosition", "preparePosition", "handlerType")' +
                        ' VALUES (\'' + uuid.v4() + '\', ' + originalPosition.CommitPosition + ', ' + originalPosition.PreparePosition + ', \'' + eventHandlerName + '\') ');
                }else {
                    logger.info("updating position for handler: " + eventHandlerName );
                    result = await cnn.client.query('UPDATE "lastProcessedPosition"' +
                        'SET "commitPosition" = ' + originalPosition.CommitPosition +
                        ', "preparePosition" = ' + originalPosition.PreparePosition +
                        ', "handlerType" = \'' + eventHandlerName +
                        '\' WHERE Id = \'' + row.Id + '\'');
                }
                cnn.done();
                return result;
            } catch (error) {
                logger.error('error received during record event processed call for eventHandler ' + eventHandlerName + ': ' + error.message);
                console.log(error);
            }
        }
    }
};