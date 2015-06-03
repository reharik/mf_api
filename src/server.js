'use strict';
var fs = require('fs');
var koa = require('koa');
//var mongoose = require('mongoose');
var monk = require('monk');
var passport = require('koa-passport');
var config = require('./config/config');
var fs = require('fs');
//var Hosts = require('hosts-parser').Hosts;
//var hosts = new Hosts(fs.readFileSync('/etc/hosts', 'utf8'));

//var mongo = hosts._origin.filter(function(i){ return i.hostname === 'mfbuildfiles_mongo_1' });
//var eventstore = hosts._origin.filter(function(i){ return i.hostname === 'mfbuildfiles_eventstore_1' });
//if(mongo.length>0){
//  config.mongo.url =config.mongo.url.replace('localhost',mongo[0].ip);
//    console.log("Mongo IP: "+mongo[0].ip);
//}
//if(eventstore.length>0){
//  config.eventstore.ip = eventstore[0].ip
//    console.log("Eventstore IP: "+eventstore[0].ip);
//}

var db = monk(config.mongo.url);
//mongoose.connect(config.mongo.url);
//mongoose.connection.on('error', function (err) {
//  console.log(err);
//});

/**
 * Load the models
 */
 console.log("approot" + __dirname);
 console.log("approot" + config.app.title);
// this is pretty cool so figure it out and use it for lots of stuff.

//var models_path = config.app.root + '/src/app/models';
//fs.readdirSync(models_path).forEach(function (file) {
//  if (~file.indexOf('js')) {
//    require(models_path + '/' + file);
//  }
//});

/**
 * Server
*/

var app = module.exports = koa();

require('./config/passport')(passport, config);

require('./config/koa')(app, config, passport);

// Routes
require('./app/routes/firstRoutes.js')(app, passport);


if (!module.parent) {
    //app.listen(3003);
    app.listen(config.port);
    console.log('Server started, listening on port: ' + config.port);
}
console.log('Environment: ' + config.app.env);
