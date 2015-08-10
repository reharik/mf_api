


module.exports = function(bufferToJson) {
    return class GesEvent {
        constructor(_eventName, _data, _metadata, _originalPosition) {
            this.eventName = Buffer.isBuffer(_eventName) ? bufferToJson(_eventName) : _eventName;
            this.metadata = Buffer.isBuffer(_metadata) ? bufferToJson(_metadata) : _metadata;
            this.data = Buffer.isBuffer(_data) ? bufferToJson(_data) : _data;
            // this is provided by the repository or the distributer
            this.originalPosition = _originalPosition;
        }
        static gesEventFromStream(sd, eventName){
            return new GesEvent(bufferToJson(sd.OriginalEvent.Metadata)[eventName],
                sd.OriginalEvent.Data,
                sd.OriginalEvent.Metadata,
                sd.OriginalPosition
            );
        }

    };
};