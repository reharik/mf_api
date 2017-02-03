/**
 * Created by reharik on 7/26/15.
 */
"use strict";
module.exports = function(koagenericsession,
                          koa2responsetime,
                          koalogger,
                          coviews,
                          koacompress,
                          koaErrorHandler,
                          koabodyparser,
                          config,
                          koaconvert,
                          koa2cors,
                          swaggerSpec,
                          swagger2,
                          swagger2koa){

    return function (app, papersMiddleware) {

        if (!config.app.keys) {
            throw new Error("Please add session secret key in the config file!");
        }

        var swaggerDocument = swaggerSpec();

        app.keys = config.app.keys;
        if (config.app.env !== "test") {
            app.use(koalogger());
        }
        app.use(koaErrorHandler());

        app.use(koa2cors({origin:'http://localhost:8080', credentials:true}));
       // app.use(koacors({origin:config.app.swagger_ui_url}));

        app.use(koabodyparser());
        app.use(koagenericsession());

       app.use(koaconvert(papersMiddleware));

        var JSONSwaggerDoc = JSON.parse(swaggerDocument);
        // if (!swagger2.validateDocument(JSONSwaggerDoc)) {
        //     throw Error(`./swagger.yml does not conform to the Swagger 2.0 schema`);
        // }
        app.use(swagger2koa.validate(JSONSwaggerDoc));

        app.use(async function (ctx, next){
            ctx.render = coviews(config.app.root + "/app/src/views", {
                map: {html: "swig"}//,
                // cache: config.app.env === "development" ? "memory" : false
            });
            await next();
        });

        app.use(koacompress());
        app.use(koa2responsetime.responseTime());
    };
};
