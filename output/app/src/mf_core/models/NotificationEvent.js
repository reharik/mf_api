/**
 * Created by rharik on 6/19/15.
 */

module.exports = function(GesEvent) {
    return class NotificationEvent extends GesEvent {
        constructor(_notificationType, _message, _initialEvent) {
            super('notificationEvent', {
                notificationType: _notificationType,
                message: _message,
                initialEvent: _initialEvent
            });
        }
    };
};