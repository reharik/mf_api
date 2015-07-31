


module.exports = function(bufferToJson) {
    return class GesEvent {
        constructor(_eventTypeName, _data, _metadata, _originalPosition) {
            this.eventTypeName = Buffer.isBuffer(_eventTypeName) ? bufferToJson(_eventTypeName) : _eventTypeName;
            this.metadata = Buffer.isBuffer(_metadata) ? bufferToJson(_metadata) : _metadata;
            this.data = Buffer.isBuffer(_data) ? bufferToJson(_data) : _data;
            // this is provided by the repository or the distributer
            this.originalPosition = _originalPosition;
        }
        static gesEventFromStream(sd, targetType){
            return new GesEvent(bufferToJson(sd.OriginalEvent.Metadata)[targetType],
                sd.OriginalEvent.Data,
                sd.OriginalEvent.Metadata,
                sd.OriginalPosition
            );
        }

    };
};