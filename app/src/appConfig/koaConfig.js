/**
 * Created by reharik on 7/26/15.
 */
"use strict";
module.exports = function(koasession,
                          koaresponsetime,
                          koacors,
                          koalogger,
                          coviews,
                          koacompress,
                          koaErrorHandler,
                          koabodyparser,
                          config,
                          koaconvert){

    return function (app, papersMiddleware) {

        if (!config.app.keys) {
            throw new Error("Please add session secret key in the config file!");
        }
        app.keys = config.app.keys;

        if (config.app.env !== "test") {
            app.use(koalogger());
        }

        app.use(koaErrorHandler());
        app.use(koacors({origin:'http://localhost:8080'}));
        app.use(koaconvert(koasession(app)));
        app.use(koabodyparser());

        app.use(koaconvert(papersMiddleware));

        // app.use(async function (next){
        //     this.render = coviews(config.app.root + "/app/src/views", {
        //         map: {html: "swig"},
        //         cache: config.app.env === "development" ? "memory" : false
        //     });
        //     await next;
        // });

        app.use(koacompress());
        app.use(koaresponsetime());
    };
};