/**
 * Created by parallels on 7/30/15.
 */


module.exports = function(gesConnection, gesclient, appendToStreamPromise, EventData, logger){
    return async function(){
        var setData = {
            expectedMetastreamVersion: -1
            , metadata: gesclient.createStreamMetadata({
                acl: {
                    readRoles: gesclient.systemRoles.all
                }
            })
            , auth: {
                username: gesclient.systemUsers.admin
                , password: gesclient.systemUsers.defaultAdminPassword
            }
        };

        gesConnection.setStreamMetadata('$all', setData, function(){console.log('metadata set')});

        var appendData = { expectedVersion: -2};
        appendData.events = [new EventData( 'bootstrapApplication', { data:'bootstrap please' }, {commandTypeName:'bootstrapApplication'})];
        var response = await appendToStreamPromise('commands',appendData);
        logger.info('bootstrapApplication sent');
        logger.info('response');
        console.log(response);

    }

};