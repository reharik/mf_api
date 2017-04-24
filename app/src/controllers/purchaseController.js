"use strict";

module.exports = function(rsRepository,
                          notificationListener,
                          notificationParser,
                          eventstore,
                          commands,
                          logger,
                          uuid) {

  var purchases = async function (ctx) {
    logger.debug("arrived at sessionsPurchase.purchases");
    let payload = ctx.request.body;
    payload.totalHours = (payload.fullHourTenPack * 10) + payload.fullHour;
    payload.totalHalfHours = (payload.halfHourTenPack * 10) + payload.halfHour;
    payload.totalpairs = (payload.pairTenPack * 10) + payload.pair;
    await processMessage(ctx, 'purchases', payload);
  };

  var updatePurchase = async function (ctx) {
    // will want logic here for only allowing admin and distinguishing
    // between accident and refund.
    logger.debug("arrived at sessionsPurchase.updatePurchase");
    await processMessage(ctx, 'updatePurchase', ctx.request.body);
  };

  var cancelPurchase = async function (ctx) {
    // will want logic here for only allowing admin and distinguishing
    // between accident and refund.
    logger.debug("arrived at purchases.cancelPurchase");
    await processMessage(ctx, 'cancelPurchase', ctx.request.body);
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

  var fetchPurchase = async function (ctx) {
    let purchase = await rsRepository.getById(ctx.params.id, 'purchase');

    ctx.status = 200;
    ctx.body = purchase;
  };

  return {
    purchases,
    updatePurchase,
    cancelPurchase,
    fetchPurchase
  };
};

