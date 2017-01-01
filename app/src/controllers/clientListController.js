"use strict";

module.exports = function(rsRepository){

    var  clients = async function (ctx) {
        console.log("arrived at clientlist.clients");

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

