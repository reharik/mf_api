"use strict";

module.exports = function(rsRepository, logger){

    var  fetchAllClients = async function (ctx) {
        logger.debug("arrived at clientlist.fetchAllClients");

        try {
            var query = await rsRepository.query('SELECT * from "client";');
        } catch (ex) {
            throw ex;
        }
        ctx.body = {clients: query};
        ctx.status = 200;
    };

    var  fetchClients = async function (ctx) {
        logger.debug("arrived at clientlist.fetchClients");

        try {
            var query = await rsRepository.query('SELECT * from "client" where not "archived";');
        } catch (ex) {
            throw ex;
        }
        ctx.body = {clients: query};
        ctx.status = 200;
    };

    return {
        fetchClients,
        fetchAllClients
    };

};

