/**
 * Created by reharik on 8/2/15.
 */

module.exports = function(pgbluebird,config,logger, path, fs) {
    return function () {
    //TODO need to check if db is there first.

            logger.debug("buildDb called");
            var pgb = new pgbluebird();
            var cnn;
            var _path = 'src/sql/';
            pgb.connect(config.get('postgres.connectionString') + config.get('postgres.postgres'))
                .then(function (connection) {
                    logger.debug('creating connection to master db');
                    cnn = connection;
                    var script = fs.readFileSync(path.join(_path, 'createRole.sql'));
                    return cnn.client.query(script.toString('utf8'));
                })
                .then(function (res) {
                    //create db
                    logger.debug('building mf database');
                    var script = fs.readFileSync(path.join(_path, 'createMethodFitnessDb.sql'));
                    return cnn.client.query(script.toString('utf8'));
                })
                .then(function (res) {
                    logger.debug('closing connection to master db');
                    cnn.done;
                    return pgb.connect(config.get('postgres.connectionString') + config.get('postgres.methodFitness'))
                })
                .then(function (connection) {
                    logger.debug('creating connection to MF db');
                    cnn = connection;
                    var script = fs.readFileSync(path.join(_path, 'buildSchema.sql'));
                    return cnn.client.query(script.toString('utf8'));
                })
                .catch(function (err) {
                    console.log(err)
                })
                .finally(function () {
                    logger.debug('finished with process');
                    cnn.done();
                });


    }
}