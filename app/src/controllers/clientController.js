"use strict";

module.exports = function(rsRepository,
                          messageBinders,
                          notificationListener,
                          logger,
                          uuid) {

  var addClient = async function (ctx) {
    logger.debug("arrived at client.addClient");
    await processMessage(ctx, 'addClient');
  };

  var updateClientInfo = async function (ctx) {
    logger.debug("arrived at client.updateClientInfo");
    await processMessage(ctx, 'updateClientInfo');
  };

  var updateClientContact = async function (ctx) {
    logger.debug("arrived at client.updateClientContact");
    await processMessage(ctx, 'updateClientContact');
  };

  var updateClientAddress = async function (ctx) {
    logger.debug("arrived at client.updateClientAddress");
    await processMessage(ctx, 'updateClientAddress');
  };

  var processMessage = async function(ctx, commandName) {
    logger.debug(`api: processing ${commandName}`);
    const payload = ctx.request.body;
    const continuationId = uuid.v4();
    let notificationPromise = notificationListener(continuationId);

    const command = messageBinders.commands[commandName + 'Command'](payload);

    await messageBinders.commandPoster(
      command,
      commandName,
      continuationId);

    var notification = await notificationPromise;

    ctx.body = {success: notification.result && notification.result === 'Success', result: notification};
    ctx.status = 200;
    return ctx;
  };

  var getClient = async function (ctx) {
    const client = await rsRepository.getById(ctx.params.id, 'client');
    ctx.status = 200;
    ctx.body = client;
  };

  return {
    addClient,
    updateClientInfo,
    updateClientContact,
    updateClientAddress,
    getClient
  };
};

