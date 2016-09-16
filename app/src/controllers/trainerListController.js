"use strict";

module.exports = function(rsRepository, functionalHelpers, Promise){

    var  trainers = async function () {
        console.log("arrived at trainerlist.trainers");

        // put this in functional helpers
        var toPromise = (future) => { return new Promise((resolve, reject) =>
            future.fork(reject, (x)=>{resolve(x.value)})) };

        var query = await toPromise(rsRepository.query('SELECT * from "trainerSummary";'));

        if (query) {
            this.body = {trainers: query};
            this.status = 200;
        } else{
            this.status = 401;
        }
    };

    return {
        trainers
    };

};

