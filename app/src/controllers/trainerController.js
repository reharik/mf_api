"use strict";

module.exports = function(rsRepository,
                          messageBinders,
                          notificationListener,
                          uuid) {

  var upsertTrainer = async function (ctx) {
    console.log("arrived at trainer.create");

    const payload = ctx.request.body;
    const continuationId = uuid.v4();
    let notificationPromise = notificationListener(continuationId);

    const command = payload.id
      ? messageBinders.commands.updateTrainerInfoCommand(payload)
      : messageBinders.commands.hireTrainerCommand(payload);

    await messageBinders.commandPoster(
      command,
      payload.id ? 'updateTrainerInfo' : 'hireTrainer',
      continuationId);

    var notification = await notificationPromise;

    ctx.body = {success: true, result: notification};
    ctx.status = 200;

  };

  var getTrainer = async function (ctx) {
    const trainer = await rsRepository.getById(ctx.params.id, 'trainer');
    ctx.status = 200;
    ctx.body = trainer;
  };

  return {
    upsertTrainer,
    getTrainer
  };
};

