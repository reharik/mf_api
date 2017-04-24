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
    let payload = ctx.request.body;
    payload.totalHours = (payload.fullHourTenPack * 10) + payload.fullHour;
    payload.totalHalfHours = (payload.halfHourTenPack * 10) + payload.halfHour;
    payload.totalpairs = (payload.pairTenPack * 10) + payload.pair;
    await processMessage(ctx, 'purchaseSessions', payload);
  };

  var updateSessionPurchase = async function (ctx) {
    // will want logic here for only allowing admin and distinguishing
    // between accident and refund.
    logger.debug("arrived at sessionsPurchase.updateSessionPurchase");
    await processMessage(ctx, 'updateSessionPurchase', ctx.request.body);
  };

  var cancelSessionPurchase = async function (ctx) {
    // will want logic here for only allowing admin and distinguishing
    // between accident and refund.
    logger.debug("arrived at purchaseSessions.cancelSessionPurchase");
    await processMessage(ctx, 'cancelSessionPurchase', ctx.request.body);
  };

  var processMessage = async function(ctx, commandName, payload) {
    logger.debug(`api: processing ${commandName}`);
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

