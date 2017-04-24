"use strict";

module.exports = function(rsRepository, logger) {

    var fetchPurchases = async function (ctx) {
        logger.debug("arrived at sessionsPurchaseList.fetchPurchases");

        try {
            let sql = `SELECT * from "purchase" where "clientId" = ${ctx.params.id};`;
            var query = await rsRepository.query(sql);
        } catch (ex) {
            throw ex;
        }

        ctx.body = {purchases: query};
        ctx.status = 200;
    };

    return {
      fetchPurchases
    };
};

