"use strict";

module.exports = function(rsRepository,
                          messageBinders,
                          notificationListener,
                          uuid,
                          logger,
                          authentication) {

  var hireTrainer = async function (ctx) {
    logger.debug("arrived at trainer.hireTrainer");
    const payload = ctx.request.body;
    payload.password = authentication.createPassword(payload.password);
    const notification = await processMessage(payload, 'hireTrainer');
    ctx.body = {success: true, result: notification};
    ctx.status = 200;
  };

  var updateTrainerInfo = async function (ctx) {
    logger.debug("arrived at trainer.updateTrainerInfo");
    const notification = await processMessage(ctx.request.body, 'updateTrainerInfo');
    ctx.body = {success: true, result: notification};
    ctx.status = 200;
  };

  var updateTrainerContact = async function (ctx) {
    logger.debug("arrived at trainer.updateTrainerContact");
    const notification = await processMessage(ctx.request.body, 'updateTrainerContact');
    ctx.body = {success: true, result: notification};
    ctx.status = 200;
  };

  var updateTrainerAddress = async function (ctx) {
    logger.debug("arrived at trainer.updateTrainerAddress");

    const notification = await processMessage(ctx.request.body, 'updateTrainerAddress');
    ctx.body = {success: true, result: notification};
    ctx.status = 200;
  };

  var updateTrainerPassword = async function (ctx) {
    logger.debug("arrived at trainer.updateTrainerPassword");
    const payload = ctx.request.body;
    payload.password = authentication.createPassword(payload.password);
    const notification = await processMessage(payload, 'updateTrainerPassword');
    ctx.body = {success: true, result: notification};
    ctx.status = 200;
  };

  var updateTrainersClients = async function (ctx) {
    logger.debug("arrived at trainer.updateTrainersClients");

    const notification = await processMessage(ctx.request.body, 'updateTrainersClients');
    ctx.body = {success: true, result: notification};
    ctx.status = 200;
  };

  var processMessage = async function(payload, commandName) {
    const continuationId = uuid.v4();
    let notificationPromise = notificationListener(continuationId);

    const command = messageBinders.commands[commandName + 'Command'](payload);

    await messageBinders.commandPoster(
      command,
      commandName,
      continuationId);

    return await notificationPromise;
  };

  var getTrainer = async function (ctx) {
    const trainer = await rsRepository.getById(ctx.params.id, 'trainer');
    ctx.status = 200;
    ctx.body = trainer;
  };

  return {
    hireTrainer,
    updateTrainerInfo,
    updateTrainerContact,
    updateTrainerAddress,
    updateTrainerPassword,
    updateTrainersClients,
    getTrainer
  };
};

