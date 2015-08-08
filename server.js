/**
 * Created by reharik on 7/25/15.
 */

process.env['ALLOW_CONFIG_MUTATIONS']=true;
var container = require('./bootstrap');

var containerIPs = container.getInstanceOf('containerIPs')();
var koa = container.getInstanceOf('koa');
var config = container.getInstanceOf('config');
var koapassport = container.getInstanceOf('koapassport');
var passportConfig = container.getInstanceOf('passportConfig');
var koaConfig = container.getInstanceOf('koaConfig');
var routes = container.getInstanceOf('routes');
var applicationBootstrap = container.getInstanceOf('applicationBootstrap');
var logger = container.getInstanceOf('logger');


logger.info("approot" + __dirname);
logger.info("appTitle" + config.app.title);

var app = module.exports = koa();
passportConfig(koapassport);
koaConfig(app, koapassport);
routes(app, koapassport);

if (!module.parent) {
    app.listen(config.app.port);
    logger.info('Server started, listening on port: ' + config.app.port);
}
logger.info('Environment: ' + config.app.env);
setTimeout(function(){
    console.log("application bootstrap");
    applicationBootstrap.bootstrap();
}, 2000);
