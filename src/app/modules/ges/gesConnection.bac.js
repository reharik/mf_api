/**
 * Created by Owner on 1/18/15.
 */
//var ges = require('ges-client')
//
//module.exports = ges();


var ges = require('ges-client'),
    uuid = require('node-uuid'),
    gesEvent = require('../GES/eventData.js')
    , queue = []
    , connection;


var getConnection = function (cb) {
    queue.push(cb);
    if(!connection) {
        connection = ges({ tcpPort: 1113 },function(err, con) {
            if(err) {
                queue.forEach(function(queuedCallback) {
                    queuedCallback(err)
                });
            } else {
                connection = con
            }
            queue.forEach(function(queuedCallback) {
                queuedCallback(null, connection)
            })
        })
    }else{
        queue.forEach(function(queuedCallback) {
            console.log("made it here4");
            queuedCallback(null, connection)
        })
    }
};

var submitCommandAwaitResult = function (vent, cmdName, cb){
    var metadata = {
        'CommitId': uuid.v1(),
        'CommandTypeName':cmdName,
        'ContinuationId':uuid.v1()
    };
    var appendData = {
        expectedVersion: -2,
        events: [new gesEvent(uuid.v1(), metadata.CommandTypeName, true, vent, metadata)]
    }

    getConnection(function(err,conn){
        if(err){ return cb(err); }

        conn.appendToStream('CommandDispatch', appendData, function(err, appendResult) {
            if(err){ return cb(err); }
        });
        console.log("ContinuationId: "+metadata.ContinuationId);
        var responseReceived = false;
        var subscription = conn.subscribeToStream('UIResponse');
        subscription.on('event', function(evt) {
            var meta = JSON.parse(evt.Event.Metadata.toString());
            if(meta.ContinuationId !== metadata.ContinuationId){ return; }
            responseReceived=true;
            var data = JSON.parse(evt.Event.Data.toString());
            this.unsubscribe();
            if(data.Message==='Success'){
                cb(null,data.Message);
            }else{
                cb(data.Message);
            }
        });
    });
};


module.exports = submitCommandAwaitResult;