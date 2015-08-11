/**
 * Created by rharik on 6/12/15.
 */

module.exports = function(uuid, JSON) {
    return function EventData(eventName, data, metadata) {
        metadata = metadata || {};
        data = JSON.stringify(data || {});
        metadata = metadata||{};
        metadata.eventName = eventName;
        metadata = JSON.stringify(metadata);

        return {
            EventId: uuid.v4(),
            Type: eventName,
            IsJson: true,
            Data: data,
            Metadata: metadata
        };
    };
};