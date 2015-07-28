/**
 * Created by reharik on 7/26/15.
 */

"use strict";

module.exports = function (pgbluebird, config, uuid, logger) {
    return {
        getById: function getById(id, table) {
            var pgb = new pgbluebird();
            var cnn;

            pgb.connect(config.get('postgress')).then(function (connection) {
                cnn = connection;
                return cnn.client.query("SELECT * from " + table + " where Id = " + id);
            }).then(function (result) {
                var row = result.rows;
                cnn.done();
                // lame use async await
                return row.document;
            })["catch"](function (error) {
                logger.error('error received during query for table: ' + table + ' Id: ' + id + " : " + error.message);
                console.log(error);
            });
        },
        query: function query(table, _query, id) {
            var pgb = new pgbluebird();
            var cnn;

            pgb.connect(config.get('postgress')).then(function (connection) {
                cnn = connection;
                var queryId = id ? "id = " + id + " and " : "";
                return cnn.client.query("select * from " + table + " where " + queryId + " document @> $1;", [_query]);
            }).then(function (result) {
                var row = result.rows;
                cnn.done();
                // lame use async await
                return row.document;
            })["catch"](function (error) {
                logger.error('error received during query for table: ' + table + ' : ' + error.message);
                console.log(error);
            });
        }
    };
};