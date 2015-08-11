/**
 * Created by rharik on 6/18/15.
 */

module.exports = function(invariant,
                          _,
                          rx,
                          GesEvent,
                          gesclient,
                          gesConnection,
                          logger,
                          bufferToJson) {
    return class gesDispatcher {
        constructor(_options) {
            logger.trace('constructing gesDispatcher base version');
            logger.debug('gesDispatcher base options passed in ' + _options);

            this.options = {
                stream: '$all',
                // e.g. event, command, notification
                targetType: 'event'
            };
            _.assign(this.options, _options);
            logger.debug('gesDispatcher base options after merge ' + this.options);
            invariant(
                this.options.handlers,
                "Dispatcher requires at least one handler"
            );
        }

        startDispatching() {
            logger.info('startDispatching called');
            //this.setMetadata();
            var subscription = gesConnection.subscribeToAllFrom();
            //var subscription = this.connection.subscribeToStreamFrom(this.options.stream);

            //Dispatcher gets raw events from ges in the EventData Form

            logger.debug('observable created');
            var relevantEvents = rx.Observable.fromEvent(subscription, 'event')
                .filter(this.filterEvents, this)
                .map(this.createGesEvent, this);
            relevantEvents.forEach(vent => this.serveEventToHandlers(vent,this.options.handlers),
                    error => { throw error; }
            );

        }

        filterEvents(payload) {
            logger.info('event received by dispatcher');
            logger.trace('filtering event for system events ($)');
            if (!payload.Event || !payload.Event.EventType || payload.Event.EventType.startsWith('$')) {
                return false;
            }
            //logger.trace('event passed filter for system events ($)');
            logger.trace('filtering event for empty metadata');
            if (_.isEmpty(payload.OriginalEvent.Metadata)) {
                return false;
            }
            logger.trace('event has metadata');
            logger.trace('filtering event for empty data');
            if (_.isEmpty(payload.OriginalEvent.Data)) {
                return false;
            }
            logger.trace('event has data');
            logger.trace('filtering event for streamType');

            var metadata = bufferToJson(payload.OriginalEvent.Metadata);
            if (!metadata || !metadata.streamType || metadata.streamType != this.options.targetType) {
                return false;
            }

            logger.trace('event is of proper targetType');
            return true;
        }

        createGesEvent(payload) {
            logger.debug('event passed through filter');
            var vent =  new GesEvent(bufferToJson(payload.OriginalEvent.Metadata).eventName,
                payload.OriginalEvent.Data,
                payload.OriginalEvent.Metadata,
                payload.OriginalPosition
            );
            logger.info('event transfered into gesEvent: ' + JSON.stringify(vent));
            return vent;
        }

        serveEventToHandlers(vent, handlers) {
            logger.info('looping through event handlers');

            handlers
                .filter(h=> {
                    logger.info('checking event handler :' + h.eventHandlerName + ' for eventTypeName: ' + vent.eventName);
                    logger.trace(h.eventHandlerName + ' handles these events: '+ h.handlesEvents);
                    return h.handlesEvents.find(he=>he == vent.eventTypeName)
                })
                .forEach(m=> {
                    logger.debug('event handler does handle event type: ' + vent.eventName);
                    m.handleEvent(vent);
                    logger.debug('event handler finished handling event');
                });

            logger.info('event processed by dispatcher');
        }
    }
};