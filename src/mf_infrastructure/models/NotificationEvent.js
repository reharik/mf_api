/**
 * Created by rharik on 6/19/15.
 */

module.exports = function(GesEvent) {
    return class Notification extends GesEvent {
        constructor(_result, _message, _initialEvent) {
            super('notification', {
                result: _result,
                message: _message,
                initialEvent: _initialEvent
            });
        }
    };
};