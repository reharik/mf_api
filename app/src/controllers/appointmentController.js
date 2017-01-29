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
        AND "date" <= '${ctx.params.endDate}'
        ${ctx.state.user.role !== 'admin' ? ` AND "trainer" = '${ctx.state.user.id}'` : ``}`;
    const appointments = await rsRepository.query(sql);
    ctx.status = 200;
    ctx.body = {appointments};
  };

  var scheduleAppointment = async function (ctx) {
    console.log("arrived at appointment.scheduleAppointment");
    var payload = ctx.request.body;
    payload.commandName = 'scheduleAppointment';
    const notification =await processMessage(payload, 'scheduleAppointmentFactory', 'scheduleAppointment');
    ctx.body = {success: notification.result != 'Failure', result: notification.handlerResult};
    ctx.status = notification.result === 'Success' ? 200 : 500;
  };

  var updateAppointment = async function (ctx) {
    try {
      console.log("arrived at appointment.updateAppointment");
      var body = ctx.request.body;
      let notification;
      let commandName = '';
      const appointment = await rsRepository.getById(body.id, 'appointment');
      let clientsSame = true;
      for (let i = 0; i < body.clients.length; i++) {
        if (body.clients[i] !== appointment.clients[i]) {
          clientsSame = false;
        }
      }

      //TODO need case for update notes, and update trainer

      if (moment(appointment.date).format('YYYYMMDD') !== moment(body.date).format('YYYYMMDD')) {
        commandName += 'rescheduleAppointmentToNewDay';
        body.originalEntityName = appointment.entityName;
      } else if (appointment.startTime !== body.startTime) {
        commandName += 'rescheduleAppointmentTime'
      } else if (appointment.appointmentType !== body.appointmentType) {
        commandName += 'changeAppointmentType'
      } else if (!clientsSame) {
        commandName += 'changeAppointmentClients'
      } else if (appointment.trainer !== body.trainer) {
        commandName += 'changeAppointmentTrainer'
      } else if (appointment.notes !== body.notes) {
        commandName += 'updateNotesForAppointment'
      } else {
        throw new Error('UpdateAppointment called but no change in appointment');
      }

      body.commandName = commandName;
      body.appointmentId = body.id;
      notification = await processMessage(body, 'scheduleAppointmentFactory', commandName);
      ctx.body = {success: true, result: notification.handlerResult};
      ctx.status = 200;
    } catch (ex) {
      ctx.body = {success: false, result: ex};
      ctx.status = 500;
    }
  };
  
  var cancelAppointment = async function (ctx) {
    console.log("arrived at appointment.cancelAppointment");
    var body = ctx.request.body;
    let commandName = 'cancelAppointment';
    
    body.commandName = commandName;
    const notification = await processMessage(body, 'removedAppointmentFactory', commandName);

    ctx.body = {success: true, result: notification.handlerResult};
    ctx.status = 200;
  };

  var processCommandMessage = async function(payload, commandName) {
    return await procesMessage(payload, commandName + 'Command', commandName + 'Command');
  };
  
  var processMessage = async function(payload, commandFactory, commandName) {
    console.log(`api: processing ${commandName}`);
    const continuationId = uuid.v4();
    let notificationPromise = notificationListener(continuationId);
    const command = messageBinders.commands[commandFactory](payload);
    await messageBinders.commandPoster(
        command,
        commandName,
        continuationId);

    return await notificationPromise;
  };

  return {
    scheduleAppointment,
    updateAppointment,
    cancelAppointment,
    fetchAppointment,
    fetchAppointments
  };
};

