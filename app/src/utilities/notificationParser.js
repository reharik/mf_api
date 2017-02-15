module.exports = function() {
  return notification => {
    const status = notification.success ? 200 : 422;
    let body = {};
    if(!notification.success) {
      body.success = false;
      body.exception = notification.exception;
      body.errors = notification.errors
    }else{
      body.success = notification.success;
      body.payload = notification.handlerResult;
    }

    return {
      body,
      status
    }
  }
};