
module.exports = function(logger,
                          eventstore,
                          rx,
                          mapAndFilterStream) {

  return continuationId => {
    logger.info('startDispatching | startDispatching called');

    var mAndF  = mapAndFilterStream('notification');
    return rx.Observable.fromEvent(eventstore.subscribeToAllFrom(), 'event')
      .filter(mAndF.isValidStreamType)
      .map(mAndF.transformEvent)
      .first(note => note.metadata.continuationId == continuationId
          && note.data.initialEvent.metadata.streamType == 'command')
      .map(x=> x.data.handlerResult)
      .toPromise();
  }
}
