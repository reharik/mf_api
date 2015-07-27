/**
 * Created by reharik on 7/25/15.
 */
var koa = require('koa');
var config = require('config');
var passportConfig = require('./src/appConfig/passport');
var koaConfig = require('./src/appConfig/koa');
var routes = require('./app/routes/firstRoutes.js');
var containerIPs = require('./src/appConfig/containerIPs');

console.log("approot" + __dirname);
console.log("appTitle" + config.app.title);

var app = module.exports = koa();
containerIPs();
passportConfig(passport);
koaConfig(app, passportConfig);
routes(app, passportConfig);

if (!module.parent) {
    app.listen(config.app.port);
    console.log('Server started, listening on port: ' + config.app.port);
}
console.log('Environment: ' + config.app.env);
