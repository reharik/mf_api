module.exports = function(rsRepository,
                          messageBinders,
                          notificationListener,
                          moment,
                          uuid) {


  var fetchAppointment = async function (ctx) {
    console.log("arrived at appointment.fetchAppointment");
    const appointments = await rsRepository.getById(ctx.params.id, 'appointment');
    ctx.status = 200;
    ctx.body = {appointments};
  };

  var fetchAppointments = async function (ctx) {
    console.log("arrived at appointment.fetchAppointments");
    const sql = `SELECT * from "appointment" 
      where  "date" >= '${ctx.params.startDate}' 
        AND "date" <= '${ctx.params.endDate}'`;
        // AND "trainer" = '${ctx.params.trainerId}'`;
    const appointments = await rsRepository.query(sql);
    ctx.status = 200;
    ctx.body = {appointments};
  };

  var scheduleAppointment = async function (ctx) {
    console.log("arrived at appointment.scheduleAppointment");
    var payload = ctx.request.body;
    console.log('==========payload=========');
    console.log(payload);
    console.log('==========END payload=========');
    const notification =await processMessage(payload, 'scheduleAppointment');
    ctx.body = {success: true, result: notification};
    ctx.status = 200;
  };

  var updateAppointment = async function (ctx) {
    console.log("arrived at appointment.updateAppointment");
    const notification = await processMessage(ctx.request.body, 'updateAppointment');
    ctx.body = {success: true, result: notification};
    ctx.status = 200;
  };

  var processMessage = async function(payload, commandName) {
    console.log(`api: processing ${commandName}`);
    const continuationId = uuid.v4();
    let notificationPromise = notificationListener(continuationId);

    const command = messageBinders.commands[commandName + 'Command'](payload);

    await messageBinders.commandPoster(
      command,
      commandName,
      continuationId);

    return await notificationPromise;
  };

  return {
    scheduleAppointment,
    updateAppointment,
    fetchAppointment,
    fetchAppointments
  };
};

