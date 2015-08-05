/**
 * Created by reharik on 8/2/15.
 */

module.exports = function(pgbluebird,config,logger, path, fs) {
    return async function () {
        //TODO need to check if db is there first.

        logger.debug("buildDb called");
        var pgb = new pgbluebird();
        var _path = 'src/sql/';
        var cnn;
        try {
            cnn = await pgb.connect(config.get('postgres.connectionString') + config.get('postgres.postgres'));

            logger.debug('creating connection to master db');

            var checkForDBScript = fs.readFileSync(path.join(_path, 'checkIfDBExists.sql'));
            var res = await cnn.client.query(checkForDBScript.toString('utf8'));
            logger.debug('checking if db exists');
            console.log(res);
            if(res.rowCount>0){
                cnn.done();
                return;
            }
            var createRoleScript = fs.readFileSync(path.join(_path, 'createRole.sql'));
            await cnn.client.query(createRoleScript.toString('utf8'));

            //create db
            logger.debug('building mf database');

            var createDbScript = fs.readFileSync(path.join(_path, 'createMethodFitnessDb.sql'));
            await cnn.client.query(createDbScript.toString('utf8'));

            logger.debug('closing connection to master db');

            cnn.done();

            cnn = await pgb.connect(config.get('postgres.connectionString') + config.get('postgres.methodFitness'));

            logger.debug('creating connection to MF db');

            var buildSchemaScript = fs.readFileSync(path.join(_path, 'buildSchema.sql'));
            await cnn.client.query(buildSchemaScript.toString('utf8'));

        } catch (err) {
            console.log(err)
        } finally {
            logger.debug('finished with process');
            cnn.done();
        }
    }
};