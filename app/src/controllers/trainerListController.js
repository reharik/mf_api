"use strict";

module.exports = function(rsRepository, logger){

    var  fetchTrainers = async function (ctx) {
        logger.debug("arrived at trainerlist.fetchTrainers");

        try {
            var query = await rsRepository.query('SELECT * from "trainer" where not "archived";');
        } catch (ex) {
            throw ex;
        }
        ctx.body = {trainers: query};
        ctx.status = 200;
    };

    var  fetchAllTrainers = async function (ctx) {
        logger.debug("arrived at trainerlist.fetchAllTrainers");

        try {
            var query = await rsRepository.query('SELECT * from "trainer";');
        } catch (ex) {
            throw ex;
        }
        ctx.body = {trainers: query};
        ctx.status = 200;
    };

    return {
        fetchTrainers,
        fetchAllTrainers
    };

};

