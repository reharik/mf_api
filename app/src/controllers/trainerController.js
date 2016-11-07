"use strict";

module.exports = function(rsRepository, messageBinders, functionalHelpers, Promise){

    var  create = async function (ctx) {
        console.log("arrived at trainer.create");
console.log('==========ctx.request.body=========');
console.log(ctx.request.body);
console.log('==========END ctx.request.body=========');

        await messageBinders.commandPoster(messageBinders.commands.hireTrainerCommand(ctx.request.body), 'hireTrainer');
        // put this in functional helpers
        // var toPromise = (future) => { return new Promise((resolve, reject) =>
        //     future.fork(reject, (x)=>{resolve(x.value)})) };

        ctx.status = 200;
    };

    return {
        create
    };
};

