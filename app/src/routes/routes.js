/**
 * Created by reharik on 7/26/15.
 */

"use strict";

module.exports = function(koarouter, index_controller, trainerListController, auth_controller) {

    var secured = function *(next) {
        if (this.isAuthenticated()) {
            yield next;
        } else {
            this.status = 401;
        }
    };

    return function(app, passport){
//var clientController = require("../controllers/client.server.controller");
//var clientListController = require("../controllers/clientList.server.controller");
//var trainerController = require("../controllers/trainer.server.controller");
//var trainerListController = require("../controllers/trainerList.server.controller");
//    var indexController = require("../controllers/index.controller");
//    var authController = require("../controllers/auth.controller");
        var router = koarouter();
        router.get("/", function *() {
            yield index_controller.index.apply(this);
        });

        router.get("/auth", auth_controller.checkAuth);
        router.post("/auth", auth_controller.signIn);
        router.all("/signout", auth_controller.signOut);

        router.get("/trainers", trainerListController.trainers);
        // router.post("/trainer/create", trainerController.create);

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