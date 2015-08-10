/**
 * Created by reharik on 7/26/15.
 */


module.exports = function(appendToStreamPromise, EventData, uuid){
    return function(command, commandName){
        // fortify commands with metadata like date and user
        command.createDate = new Date();
        var appendData = { expectedVersion: -2};
        appendData.events = [new EventData( commandName,
                                            { data:command },
                                            {eventName:commandName, continuationId:uuid.v4(), streamType:'command'})];
        return appendToStreamPromise('commands', appendData);
    }
};
