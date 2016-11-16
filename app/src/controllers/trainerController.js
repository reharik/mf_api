"use strict";

module.exports = function(rsRepository,
                          messageBinders,
                          notificationListener,
                          uuid) {

  var createTrainer = async function (ctx) {
    console.log("arrived at trainer.create");
    const continuationId = uuid.v4();

    let notificationPromise = notificationListener(continuationId)
    await messageBinders.commandPoster(messageBinders.commands.hireTrainerCommand(ctx.request.body), 'hireTrainer', continuationId);
    var notification = await notificationPromise;
    
    console.log('=========="notification received=========');
    console.log(JSON.stringify(notification));
    console.log('==========END "notification received=========');
    
    ctx.body = {succes: true, result: notification};
    ctx.status = 200;
  };

  var getTrainer = async function (ctx) {
    const trainer = await rsRepository.getById(ctx.params.id, 'trainer');
    ctx.status = 200;
    ctx.body = trainer;
  };

  return {
    createTrainer,
    getTrainer
  };
};

