/**
 * Created by rharik on 6/18/15.
 */

module.exports = function(NotificationEvent,
                          appendToStreamPromise,
                          readModelRepository,
                          EventData,
                          logger) {
    return class gesEventHandler {
        constructor() {
            this.responseMessage;
            this.continuationId;
            this.handlesEvents = [];
            this.result;
            this.eventHandlerName;
        }

        async handleEvent(gesEvent) {
            logger.debug('checking event for idempotence');
            var idempotency = await readModelRepository.checkIdempotency(gesEvent.originalPosition, this.eventHandlerName);
            if (!idempotency.isIdempotent) {
                logger.debug('event is not idempotent');
                return;
            }
            logger.trace('event idempotent');

            try {
                logger.info('calling specific event handler for: ' + gesEvent.eventName + ' on ' + this.eventHandlerName);

                this[gesEvent.eventName](gesEvent.data);

                logger.trace('event Handled by: ' + gesEvent.eventName + ' on ' + this.eventHandlerName);
                readModelRepository.recordEventProcessed(gesEvent.originalPosition, this.eventHandlerName, idempotency.isNewStream);

            } catch (exception) {
                logger.error('event: ' + JSON.stringify(gesEvent) + ' threw exception: ' + exception);
                if (this.responseMessage) {
                    this.responseMessage = new Notification("Failure", exception.message, gesEvent);
                }
            } finally {
                if (this.responseMessage) {
                    logger.trace('beginning to process responseMessage');

                    var responseEvent = new EventData(
                        this.responseMessage.eventName,
                        this.responseMessage.data,
                        {"continuationId": this.continuationId,
                            "eventName":"notification",
                        "streamType":"notification"});

                    logger.debug('response event created: ' + JSON.stringify(responseEvent));

                    var appendData = {
                        expectedVersion: -2,
                        events: [responseEvent]
                    };

                    logger.debug('event data created: ' + JSON.stringify(appendData));
                    logger.trace('publishing notification');

                    this.result = appendToStreamPromise('notification', appendData);
                }
            }
            // largely for testing purposes, sadly
            return this.result;
        }

        createNotification(gesEvent){
            logger.debug('building response notification');

            this.responseMessage = new Notification("Success", "Success", gesEvent);
            this.continuationId = gesEvent.metadata.continuationId;
            logger.trace('getting continuation Id: ' + this.continuationId);
        }
    };
};