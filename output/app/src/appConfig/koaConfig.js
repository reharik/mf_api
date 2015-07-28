/**
 * Created by reharik on 7/26/15.
 */
"use strict";

module.exports = function (koagenericsession, koaresponsetime, koalogger, coviews, koacompress, koaerror, koabodyparser, config) {

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
        app.use(passport.initialize());
        app.use(passport.session());

        app.use(regeneratorRuntime.mark(function callee$2$0(next) {
            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        this.render = coviews(config.app.root + "/src/views", {
                            map: { html: "swig" },
                            cache: config.app.env === "development" ? "memory" : false
                        });
                        context$3$0.next = 3;
                        return next;

                    case 3:
                    case "end":
                        return context$3$0.stop();
                }
            }, callee$2$0, this);
        }));

        app.use(koacompress());
        app.use(koaresponsetime());
    };
};