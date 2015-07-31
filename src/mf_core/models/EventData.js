/**
 * Created by rharik on 6/12/15.
 */

module.exports = function(uuid) {
    return function EventData(eventTypeName, data, metadata) {
        metadata = metadata || {};
        data = JSON.stringify(data || {});
        metadata = metadata||{};
        metadata.eventTypeName = eventTypeName;
        metadata = JSON.stringify(metadata);

        return {
            EventId: uuid.v4(),
            Type: eventTypeName,
            IsJson: true,
            Data: data,
            Metadata: metadata
        };
    };
};