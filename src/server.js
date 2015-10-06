/**
 * Created by reharik on 10/5/15.
 */

module.exports = function(containerIPs,
                          koa,
                          config,
                          koapassport,
                          passportConfig,
                          koaConfig,
                          routes,
                          logger){
    return function(){
        logger.info("approot" + __dirname);
        logger.info("appTitle" + config.app.title);

        var app = koa();
        passportConfig(koapassport);
        koaConfig(app, koapassport);
        routes(app, koapassport);

        if (!module.parent) {
            app.listen(config.app.port);
            logger.info('Server started, listening on port: ' + config.app.port);
        }
        logger.info('Environment: ' + config.app.env);
        return app;
    }
};