"use strict";

module.exports = function(rsRepository){

    var  trainers = async function (ctx) {
        console.log("arrived at trainerlist.trainers");

        try {
            var query = await rsRepository.query('SELECT * from "trainer";');
        } catch (ex) {
            throw ex;
        }
        ctx.body = {trainers: query};
        ctx.status = 200;
    };

    return {
        trainers
    };

};

