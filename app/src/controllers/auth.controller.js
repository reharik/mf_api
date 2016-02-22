/**
 * Created by reharik on 7/26/15.
 */
"use strict";

module.exports = function(messagebinders, authentication){

    var  signIn = function *() {
        console.log("arrived at login");
        var auth = yield authentication.authenticate();
        if (auth.status === 401) {
            this.status = 401;
        } else {
            var cmd = messagebinders.commands.loginTrainerCommand(auth.id, auth.userName);
            yield messagebinders.commandPoster(cmd, 'loginTrainer');
            this.body = { trainer: auth.trainer };
        }
    };

    var  checkAuth = function *() {
        if (this.passport.user) {
            this.body = {user: this.passport.user};
            this.status = 200;
        } else{
            this.status = 401;
        }
    };

    var  signOut = function *() {
        this.logout();
        this.session = null;
        this.status = 204;
    };

    return {
        signIn:signIn,
        signOut:signOut,
        checkAuth:checkAuth
    }

};

