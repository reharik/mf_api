module.exports = function(rsRepository,
                          messageBinders,
                          notificationListener,
                          uuid) {

  var scheduleAppointment = async function (ctx) {
    console.log("arrived at appointment.scheduleAppointment");
    await processMessage(ctx, 'scheduleAppointment');
  };

  var updateAppointment = async function (ctx) {
    console.log("arrived at appointment.updateAppointment");
    await processMessage(ctx, 'updateAppointment');
  };

  var processMessage = async function(ctx, commandName) {
    console.log(`api: processing ${commandName}`);
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

  var fetchAppointment = async function (ctx) {
    const appointment = await rsRepository.getById(ctx.params.id, 'appointment');
    ctx.status = 200;
    ctx.body = appointment;
  };

  var fetchAppointments = async function (ctx) {
    console.log("arrived at appointment.fetchAppointments");
    try {
      var query = await rsRepository.query('SELECT * from "appointment";');
    } catch (ex) {
      throw ex;
    }
    ctx.body = {appointment: query};
    ctx.status = 200;
  };

  return {
    scheduleAppointment,
    updateAppointment,
    fetchAppointment,
    fetchAppointments
  };
};

