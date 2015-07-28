/**
 * Created by reharik on 7/25/15.
 */

'use strict';

var container = require('./bootstrap');

var koa = container.getInstanceOf('koa');
var config = container.getInstanceOf('config');
var koapassport = container.getInstanceOf('koapassport');
var passportConfig = container.getInstanceOf('passportConfig');
var koaConfig = container.getInstanceOf('koaConfig');
var routes = container.getInstanceOf('routes');
var containerIPs = container.getInstanceOf('containerIPs');

console.log("approot" + __dirname);
console.log("appTitle" + config.app.title);

var app = module.exports = koa();
containerIPs();
passportConfig(koapassport);
koaConfig(app, koapassport);
routes(app, koapassport);

if (!module.parent) {
  app.listen(config.app.port);
  console.log('Server started, listening on port: ' + config.app.port);
}
console.log('Environment: ' + config.app.env);