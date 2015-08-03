/**
 * Created by parallels on 7/30/15.
 */


module.exports = function(buildPostgresDatabase, createMetadataPromise, appendToStreamPromise, EventData, logger){
    return {
        bootstrap: async function applicationBootstrap(){

            var metaResult = await createMetadataPromise();
            logger.info("metadata sent");
            logger.debug(metaResult);
            var dbResult = await buildPostgresDatabase();
            logger.info("database build");
            logger.debug(dbResult);

            var appendData = { expectedVersion: -2};
            appendData.events = [new EventData( 'bootstrapApplication', { data:'bootstrap please' }, {commandTypeName:'bootstrapApplication'})];
            var response = await appendToStreamPromise('commands',appendData);
            logger.info('bootstrapApplication sent');
            logger.info('response');
            console.log(response);
        }
    };

};