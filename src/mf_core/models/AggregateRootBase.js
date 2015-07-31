/**
 * Created by reharik on 6/8/15.
 */


module.exports = function(invariant) {
    return class AggregateRootBase {
        constructor() {
            this._id;
            this._version = 0;
            this.uncommittedEvents = [];

            invariant(
                this.commandHandlers,
                'An aggregateRoot requires commandHandlers'
            );
            invariant(
                this.applyEventHandlers,
                'An aggregateRoot requires applyEventHandlers'
            );

            Object.assign(this, this.commandHandlers());
        }

        applyEvent(event) {
            var key = Object.keys(this.applyEventHandlers()).find(x=>x === event.eventTypeName);
            if (key) {
                this.applyEventHandlers()[key](event);
            }
            this._version++;
        }

        raiseEvent(event) {
            this.applyEvent(event);
            this.uncommittedEvents.push(event);
        }

        getUncommittedEvents() {
            return this.uncommittedEvents;
        }

        clearUncommittedEvents() {
            this.uncommittedEvents = [];
        }

        static isAggregateBase() {
            return true;
        }
        isAggregateBase() {
            return true;
        }
    }
};