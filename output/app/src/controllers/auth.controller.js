/**
 * Created by reharik on 7/26/15.
 */

"use strict";

module.exports = function (loginTrainerCommand, commandPoster, authentication) {

    var signIn = regeneratorRuntime.mark(function signIn() {
        var cmd;
        return regeneratorRuntime.wrap(function signIn$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    console.log("arrived at login");
                    context$2$0.next = 3;
                    return auth = authentication.authenticate();

                case 3:
                    if (!(auth.status === 401)) {
                        context$2$0.next = 7;
                        break;
                    }

                    this.status = 401;
                    context$2$0.next = 11;
                    break;

                case 7:
                    cmd = loginTrainerCommand(auth.trainer.id, auth.trainer.credentials.userName);
                    context$2$0.next = 10;
                    return commandPoster(cmd, 'loginTrainer');

                case 10:
                    this.body = { trainer: auth.trainer };

                case 11:
                case "end":
                    return context$2$0.stop();
            }
        }, signIn, this);
    });

    var checkAuth = regeneratorRuntime.mark(function checkAuth() {
        return regeneratorRuntime.wrap(function checkAuth$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    if (this.passport.user) {
                        this.body = { user: this.passport.user };
                        this.status = 200;
                    } else {
                        this.status = 401;
                    }

                case 1:
                case "end":
                    return context$2$0.stop();
            }
        }, checkAuth, this);
    });

    var signOut = regeneratorRuntime.mark(function signOut() {
        return regeneratorRuntime.wrap(function signOut$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    this.logout();
                    this.session = null;
                    this.status = 204;

                case 3:
                case "end":
                    return context$2$0.stop();
            }
        }, signOut, this);
    });

    return {
        signIn: signIn,
        signOut: signOut,
        checkAuth: checkAuth
    };
};