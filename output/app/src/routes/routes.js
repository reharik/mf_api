/**
 * Created by reharik on 7/26/15.
 */

"use strict";

module.exports = function (koarouter, index_controller, auth_controller) {

    var secured = regeneratorRuntime.mark(function secured(next) {
        return regeneratorRuntime.wrap(function secured$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    if (!this.isAuthenticated()) {
                        context$2$0.next = 5;
                        break;
                    }

                    context$2$0.next = 3;
                    return next;

                case 3:
                    context$2$0.next = 6;
                    break;

                case 5:
                    this.status = 401;

                case 6:
                case "end":
                    return context$2$0.stop();
            }
        }, secured, this);
    });

    return function (app, passport) {
        //var clientController = require("../controllers/client.server.controller");
        //var clientListController = require("../controllers/clientList.server.controller");
        //var trainerController = require("../controllers/trainer.server.controller");
        //var trainerListController = require("../controllers/trainerList.server.controller");
        //    var indexController = require("../controllers/index.controller");
        //    var authController = require("../controllers/auth.controller");
        var router = koarouter();
        router.get("/", regeneratorRuntime.mark(function callee$2$0() {
            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        context$3$0.next = 2;
                        return index_controller.index.apply(this);

                    case 2:
                    case "end":
                        return context$3$0.stop();
                }
            }, callee$2$0, this);
        }));

        router.get("/auth", auth_controller.checkAuth);
        router.post("/auth", auth_controller.signIn);

        router.all("/signout", auth_controller.signOut);

        app.use(router.routes());
        app.use(router.allowedMethods());

        // secured routes
        //this is one way of doing it.  You could also create a new router "var securedRouter = new Router();
        //that handles all routes in say /app which has the secured middleware
        //then all routes registered in securedRouter will be secured
        //app.get("/clients", secured, clientListController.clients);
        //app.post("/client/create", secured, clientController.create);
        //  app.get("/trainers", secured, trainerListController.trainers);
        //  app.post("/trainer/create", secured, trainerController.create);
    };
};