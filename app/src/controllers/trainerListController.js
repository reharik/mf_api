"use strict";

module.exports = function(rsRepository, functionalHelpers, Promise, R){

    var  trainers = function *() {
        console.log("arrived at trainerlist.trainers");
        var query = yield functionalHelpers.futureToPromise(rsRepository.query('SELECT * from "trainerSummary";'));

        if (query) {
            this.body = query;
            this.status = 200;
        } else{
            this.status = 401;
        }
    };

    return {
        trainers
    };

};

