"use strict";

module.exports = function(rsRepository, functionalHelpers, Promise){

    var  trainers = async function (ctx) {
        console.log("arrived at trainerlist.trainers");

        // put this in functional helpers
        // var toPromise = (future) => { return new Promise((resolve, reject) =>
        //     future.fork(reject, (x)=>{resolve(x.value)})) };

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

