/**
 * Created by parallels on 7/30/15.
 */


module.exports = function(buildPostgresDatabase,
                          createMetadataPromise,
                          appendToStreamPromise,
                          EventData,
                          logger,
                          config,
                          pgbluebird,
                          fs){
    return {
        bootstrap: async function applicationBootstrap() {
            var pgb = new pgbluebird();
            var cnn = await pgb.connect(config.get('postgres.connectionString') + config.get('postgres.postgres'));

            logger.debug('creating connection to master db');

            var checkForDBScript = fs.readFileSync('src/sql/checkIfDBExists.sql');
            var res = await cnn.client.query(checkForDBScript.toString('utf8'));
            logger.debug('checking if db exists');
            if (res.rowCount > 0) {
                cnn.done();
                logger.debug('database already exists');
                return;
            }
            var metaResult = await createMetadataPromise();
            logger.info("metadata sent");
            logger.debug(metaResult);
            var dbResult = await buildPostgresDatabase();
            logger.info("database built");
            logger.debug(dbResult);

            var appendData = {expectedVersion: -2};
            appendData.events = [new EventData('bootstrapApplication', {data: 'bootstrap please'}, {commandTypeName: 'bootstrapApplication'})];
            var response = await appendToStreamPromise('commands', appendData);
            logger.info('bootstrapApplication sent');
            logger.info('response');
        }
    };

};