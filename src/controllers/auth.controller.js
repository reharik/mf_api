/**
 * Created by reharik on 7/26/15.
 */

var loginTrainerCommand = require('../commands/loginTrainerCommand');
var commandPoster = require('../modules/commandPoster');
var authentication = require('../modules/authentication');

exports.signIn = function *() {
    console.log("arrived at login");
    yield auth = authentication.authenticate();
    if (auth.status === 401) {
        this.status = 401;
    } else {
        var cmd = loginTrainerCommand(auth.trainer.id, auth.trainer.credentials.userName);
        yield commandPoster(cmd, 'loginTrainer');
        this.body = { trainer: auth.trainer };
    }
};

exports.checkAuth = function *() {
    if (this.passport.user) {
        this.body = {user: this.passport.user};
        this.status = 200;
    } else{
        this.status = 401;
    }
};

exports.signOut = function *() {
    this.logout();
    this.session = null;
    this.status = 204;
};

