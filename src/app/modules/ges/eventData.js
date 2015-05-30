/**
 * Created by rharik on 10/21/14.
 */
'use strict';

module.exports = function EventData(eventId, type, isJson, data, metadata) {
    isJson = !!isJson;
    metadata = metadata || {};
    if(metadata.CommandTypeName){
        metadata.CommandTypeName = 'MF.Core.Messages.Command.'+metadata.CommandTypeName+', MF.Core.Messages, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
    }
    data = JSON.stringify(data || {});
    metadata = JSON.stringify(metadata);

    return {
        EventId: eventId,
        Type:  type,
        IsJson: isJson,
        Data: data,
        Metadata:metadata
    };
};

