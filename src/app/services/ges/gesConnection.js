/**
 * Created by Owner on 1/18/15.
 */

var co = require('co');
var Promise = require('blueBird');
var ges = require('ges-client');
var uuid = require('node-uuid');
var gesEvent = require('../GES/eventData.js');
var config = require('../../../../../config/config');

// this is not working it's returning an object and fucking everything up.
Promise.promisifyAll(ges);

var promisifyDispatch = function(connection, data){
  return new Promise(function(resolve,reject){
    connection.appendToStream('CommandDispatch', data, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

var promisifyConnection = function(options){
  return new Promise(function(resolve, reject){
    ges(options,function(err, con) {
      if(err){
        reject(err);
      }else{
        resolve(con);
      }
    });
  })
};

var promisifySubscription = function(subscription, continuationId){
  return new Promise(function(resolve,reject){
    subscription.on('event', function(evt) {
      var meta = JSON.parse(evt.Event.Metadata.toString());
      if (meta.ContinuationId !== continuationId) {
        return;
      }
      var data = JSON.parse(evt.Event.Data.toString());
      if (data.Message === 'Success') {
        resolve(data.Message);
      } else {
        reject(data.Message);
      }
    });
  });
};

var submitCommandAwaitResult = function (vent, cmdName) {
  var metadata = {
    'CommitId': uuid.v1(),
    'CommandTypeName':cmdName,
    'ContinuationId':uuid.v1()
  };
  var appendData = {
    expectedVersion: -2,
    events: [new gesEvent(uuid.v1(), metadata.CommandTypeName, true, vent, metadata)]
  };

  return function *() {
    var connection = yield promisifyConnection({ip:config.eventstore.ip, tcpPort: 1113 });
    yield promisifyDispatch(connection, appendData);
    var subscription = connection.subscribeToStream('UIResponse');

    var result = yield promisifySubscription(subscription,metadata.ContinuationId);
    subscription.unsubscribe();
    return result;
  };
};

module.exports = submitCommandAwaitResult;