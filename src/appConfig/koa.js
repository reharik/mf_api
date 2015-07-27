/**
 * Created by reharik on 7/26/15.
 */
"use strict";
const path = require("path");
const session = require("koa-generic-session");
const responseTime = require("koa-response-time");
const logger = require("koa-logger");
const views = require("co-views");
const compress = require("koa-compress");
const errorHandler = require("koa-error");
const bodyParser = require("koa-bodyparser");
const config = require('config');

module.exports = function(app, passport) {
    if (!config.app.keys) { throw new Error("Please add session secret key in the config file!"); }
    app.keys = config.app.keys;

    if (config.app.env !== "test") {
        app.use(logger());
    }

    app.use(errorHandler());

    app.use(session({
        key: "methodfitness.sid"
    }));

    app.use(bodyParser());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function *(next) {
        this.render = views(config.app.root + "/src/views", {
            map: { html: "swig" },
            cache: config.app.env === "development" ? "memory" : false,
        });
        yield next;
    });

    app.use(compress());
    app.use(responseTime());
};