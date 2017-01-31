"use strict";

module.exports = function(rsRepository, logger){

    var  clients = async function (ctx) {
        logger.debug("arrived at clientlist.clients");

        try {
            var query = await rsRepository.query('SELECT * from "client";');
        } catch (ex) {
            throw ex;
        }
        ctx.body = {clients: query};
        ctx.status = 200;
    };

    return {
        clients
    };

};

