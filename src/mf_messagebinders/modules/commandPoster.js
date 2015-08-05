/**
 * Created by reharik on 7/26/15.
 */


module.exports = function(appendToStreamPromise, EventData, uuid){
    return function(command, commandName){
        command.createDate = new Date();
        var appendData = { expectedVersion: -2};
        appendData.events = [new EventData( commandName, { data:command }, {commandTypeName:commandName, continuationId:uuid.v4()})];
        return appendToStreamPromise('commandDispatch', appendData);
    }
};
