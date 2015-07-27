/**
 * Created by reharik on 7/25/15.
 */

var container = require('./bootstrap');

var koa = container.getInstanceOf('koa');
var config = container.getInstanceOf('config');
var passportConfig = container.getInstanceOf('passportConfig');
var koaConfig = container.getInstanceOf('koaConfig');
var firstRoutes = container.getInstanceOf('firstRoutes');
var containerIPs = container.getInstanceOf('containerIPs');

console.log("approot" + __dirname);
console.log("appTitle" + config.app.title);

var app = module.exports = koa();
containerIPs();
passportConfig(passport);
koaConfig(app, passportConfig);
firstRoutes(app, passportConfig);

if (!module.parent) {
    app.listen(config.app.port);
    console.log('Server started, listening on port: ' + config.app.port);
}
console.log('Environment: ' + config.app.env);
