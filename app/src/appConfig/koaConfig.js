/**
 * Created by reharik on 7/26/15.
 */
"use strict";

module.exports = function(koagenericsession,
                          koaresponsetime,
                          koalogger,
                          coviews,
                          koacompress,
                          koaerror,
                          koabodyparser,
                          config){

    return function (app, passport) {
        if (!config.app.keys) {
            throw new Error("Please add session secret key in the config file!");
        }
        app.keys = config.app.keys;

        if (config.app.env !== "test") {
            app.use(koalogger());
        }

        app.use(koaerror());

        app.use(koagenericsession({
            key: "methodfitness.sid"
        }));

        app.use(koabodyparser());
        //app.use(passport.initialize());
        //app.use(passport.session());

        app.use(function * (next){
            this.render = coviews(config.app.root + "app/src/views", {
                map: {html: "swig"},
                cache: config.app.env === "development" ? "memory" : false
            });
            yield next;
        });

        app.use(koacompress());
        app.use(koaresponsetime());
    };
};