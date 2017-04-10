"use strict";

module.exports = function(rsRepository,
                          notificationListener,
                          notificationParser,
                          eventstore,
                          commands,
                          logger,
                          uuid) {

  var purchaseSessions = async function (ctx) {
    logger.debug("arrived at sessionsPurchase.purchaseSessions");
    await processMessage(ctx, 'purchaseSessions');
  };

  var updateSessionPurchase = async function (ctx) {
    // will want logic here for only allowing admin and distinguishing
    // between accident and refund.
    logger.debug("arrived at sessionsPurchase.updateSessionPurchase");
    await processMessage(ctx, 'updateSessionPurchase');
  };

  var cancelSessionPurchase = async function (ctx) {
    // will want logic here for only allowing admin and distinguishing
    // between accident and refund.
    logger.debug("arrived at sessionsPurchase.cancelSessionPurchase");
    await processMessage(ctx, 'cancelSessionPurchaseDueToError');
  };

  var processMessage = async function(ctx, commandName) {
    logger.debug(`api: processing ${commandName}`);
    const payload = ctx.request.body;
    const continuationId = uuid.v4();
    let notificationPromise = notificationListener(continuationId);

    const command = commands[commandName + 'Command'](payload);
    await eventstore.commandPoster(
      command,
      commandName,
      continuationId);

    var notification = await notificationPromise;

    const result = notificationParser(notification);

    ctx.body = result.body;
    ctx.status = result.status;
    return ctx;
  };

  var fetchSessionPurchase = async function (ctx) {
    let sessionPurchase = await rsRepository.getById(ctx.params.id, 'sessionPurchase');

    ctx.status = 200;
    ctx.body = sessionPurchase;
  };

  return {
    purchaseSessions,
    updateSessionPurchase,
    cancelSessionPurchase,
    fetchSessionPurchase
  };
};

