/**
 * Created by reharik on 7/26/15.
 */
"use strict";

module.exports = function(commands, commandPoster){

    var  signIn = function (ctx) {
        console.log("arrived at login");
        console.log('==========ctx=========');
        console.log(ctx.state.user);
        console.log('==========END ctx=========');

        if (ctx.status == 401) {
            ctx.body = { "success": false };
        } else {
            let user = ctx.state.user;
            var cmd = commands.loginTrainerCommand(user.id, user.userName);
            commandPoster(cmd, 'loginTrainer');
            ctx.body = {success: true, user };

        }
    };

    var  checkAuth = async function () {
        if (this.passport.user) {
            this.body = {user: this.passport.user};
            this.status = 200;
        } else{
            this.status = 401;
        }
    };

    var  signOut = async function () {
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

