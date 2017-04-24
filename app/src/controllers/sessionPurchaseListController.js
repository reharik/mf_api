"use strict";

module.exports = function(rsRepository, logger) {

    var fetchSessionPurchases = async function (ctx) {
        logger.debug("arrived at sessionsPurchaseList.fetchSessionPurchases");

        try {
            let sql = `SELECT * from "sessionPurchase" where "clientId" = ${ctx.params.id};`;
            var query = await rsRepository.query(sql);
        } catch (ex) {
            throw ex;
        }

        ctx.body = {sessionPurchases: query};
        ctx.status = 200;
    };

    return {
      fetchSessionPurchases
    };
};

